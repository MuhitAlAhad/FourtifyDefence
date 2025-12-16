using DefenceCrm.Api.Contracts.Requests;
using DefenceCrm.Api.Contracts.Responses;
using DefenceCrm.Api.Models;
using DefenceCrm.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text;

namespace DefenceCrm.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(
  UserManager<ApplicationUser> userManager,
  SignInManager<ApplicationUser> signInManager,
  ILogger<AuthController> logger,
  IEmailSender emailSender,
  IConfiguration configuration) : ControllerBase
{
  [AllowAnonymous]
  [HttpPost("signup")]
  [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status201Created)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status409Conflict)]
  public async Task<IActionResult> Signup([FromBody] SignupRequest request)
  {
    var existingUser = await userManager.FindByEmailAsync(request.Email);
    if (existingUser is not null)
    {
      return Conflict(new { message = "Email already registered." });
    }

    var user = new ApplicationUser
    {
      UserName = request.Email,
      Email = request.Email,
      FullName = request.FullName
    };

    var result = await userManager.CreateAsync(user, request.Password);
    if (!result.Succeeded)
    {
      var errors = result.Errors.Select(e => e.Description).ToArray();
      return BadRequest(new { message = "Signup failed.", errors });
    }

    logger.LogInformation("User {UserId} created with email {Email}", user.Id, user.Email);

    var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
    var confirmationLink = BuildConfirmationLink(user.Id, token);

    try
    {
      await emailSender.SendEmailAsync(
        user.Email!,
        "Confirm your Fourtify Defence account",
        $"<p>Please confirm your email to activate your account.</p><p><a href=\"{confirmationLink}\">Confirm Email</a></p><p>If you did not request this, you can ignore this email.</p>");
    }
    catch (Exception ex)
    {
      logger.LogError(ex, "Failed to send confirmation email to {Email}", user.Email);
      return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Signup succeeded but failed to send confirmation email. Please try again later." });
    }

    var response = new AuthResponse
    {
      UserId = user.Id,
      Email = user.Email!,
      FullName = user.FullName
    };

    _ = NotifyAdminsAsync(user);

    return CreatedAtAction(nameof(Signup), response);
  }

  [AllowAnonymous]
  [HttpPost("signin")]
  [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  [ProducesResponseType(StatusCodes.Status403Forbidden)]
  public async Task<IActionResult> Signin([FromBody] SigninRequest request)
  {
    var user = await userManager.FindByEmailAsync(request.Email);
    if (user is null)
    {
      return Unauthorized(new { message = "Invalid credentials." });
    }

    var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: false);
    if (!result.Succeeded)
    {
      return Unauthorized(new { message = "Invalid credentials." });
    }

    if (!user.EmailConfirmed)
    {
      return StatusCode(StatusCodes.Status403Forbidden, new { message = "Email not confirmed. Please check your inbox for the confirmation link." });
    }

    var response = new AuthResponse
    {
      UserId = user.Id,
      Email = user.Email!,
      FullName = user.FullName
    };

    logger.LogInformation("User {UserId} signed in", user.Id);

    return Ok(response);
  }

  [AllowAnonymous]
  [HttpGet("confirm-email")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string token)
  {
    var user = await userManager.FindByIdAsync(userId);
    if (user is null)
    {
      return BadRequest(new { message = "Invalid confirmation link." });
    }

    var result = await userManager.ConfirmEmailAsync(user, token);
    if (!result.Succeeded)
    {
      var errors = result.Errors.Select(e => e.Description).ToArray();
      return BadRequest(new { message = "Email confirmation failed.", errors });
    }

    logger.LogInformation("User {UserId} confirmed email", user.Id);

    _ = SendVerifiedEmailAsync(user);

    var redirectUrl = configuration["Resend:ConfirmationRedirectUrl"] ?? configuration["Email:ConfirmationRedirectUrl"];
    if (!string.IsNullOrWhiteSpace(redirectUrl) && Uri.IsWellFormedUriString(redirectUrl, UriKind.Absolute))
    {
      return Redirect(redirectUrl);
    }

    return Ok(new { message = "Email confirmed. You can now sign in." });
  }

  private string BuildConfirmationLink(string userId, string token)
  {
    var baseUrl = configuration["Resend:ConfirmationLinkBaseUrl"] ?? configuration["Email:ConfirmationLinkBaseUrl"];
    var safeBase = !string.IsNullOrWhiteSpace(baseUrl)
      ? baseUrl.TrimEnd('/')
      : $"{Request.Scheme}://{Request.Host}";

    return $"{safeBase}/api/auth/confirm-email?userId={WebUtility.UrlEncode(userId)}&token={WebUtility.UrlEncode(token)}";
  }

  private async Task NotifyAdminsAsync(ApplicationUser user)
  {
    var recipients = configuration["Notifications:NewSignupRecipients"];
    if (string.IsNullOrWhiteSpace(recipients))
    {
      return;
    }

    var subject = "New Fourtify Defence signup";
    var body = new StringBuilder()
      .AppendLine("<p>A new user has signed up.</p>")
      .AppendLine($"<p><strong>Email:</strong> {WebUtility.HtmlEncode(user.Email)}</p>");

    if (!string.IsNullOrWhiteSpace(user.FullName))
    {
      body.AppendLine($"<p><strong>Name:</strong> {WebUtility.HtmlEncode(user.FullName)}</p>");
    }

    var addresses = recipients
      .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
      .Distinct(StringComparer.OrdinalIgnoreCase);

    foreach (var address in addresses)
    {
      try
      {
        await emailSender.SendEmailAsync(address, subject, body.ToString());
      }
      catch (Exception ex)
      {
        logger.LogWarning(ex, "Failed to send signup notification to {AdminEmail}", address);
      }
    }
  }

  private async Task SendVerifiedEmailAsync(ApplicationUser user)
  {
    try
    {
      var websiteLink = configuration["Notifications:WebsiteLink"] ?? "https://fourd.com.au";
      var demoLink = configuration["Notifications:DemoLink"] ?? "https://fourd.com.au/demo";

      var subject = "Your Fourtify Defence account is verified";
      var body = $"""
        <p>Your email has been confirmed successfully. You can now sign in.</p>
        <p><a href="{WebUtility.HtmlEncode(websiteLink)}" target="_blank" rel="noreferrer">Visit our website</a></p>
        <p><a href="{WebUtility.HtmlEncode(demoLink)}" target="_blank" rel="noreferrer">Watch a demo</a></p>
        """;

      await emailSender.SendEmailAsync(user.Email!, subject, body);
    }
    catch (Exception ex)
    {
      logger.LogWarning(ex, "Failed to send post-verification email to {Email}", user.Email);
    }
  }
}
