using DefenceCrm.Api.Contracts.Requests;
using DefenceCrm.Api.Contracts.Responses;
using DefenceCrm.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DefenceCrm.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(
  UserManager<ApplicationUser> userManager,
  SignInManager<ApplicationUser> signInManager,
  ILogger<AuthController> logger) : ControllerBase
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

    var response = new AuthResponse
    {
      UserId = user.Id,
      Email = user.Email!,
      FullName = user.FullName
    };

    return CreatedAtAction(nameof(Signup), response);
  }

  [AllowAnonymous]
  [HttpPost("signin")]
  [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
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

    var response = new AuthResponse
    {
      UserId = user.Id,
      Email = user.Email!,
      FullName = user.FullName
    };

    logger.LogInformation("User {UserId} signed in", user.Id);

    return Ok(response);
  }
}
