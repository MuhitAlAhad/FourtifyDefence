using DefenceCrm.Api.Contracts.Requests;
using DefenceCrm.Api.Data;
using DefenceCrm.Api.Models;
using DefenceCrm.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace DefenceCrm.Api.Controllers;

[ApiController]
[Route("api/contact")]
public class ContactController(ApplicationDbContext dbContext, IEmailSender emailSender, IConfiguration configuration, ILogger<ContactController> logger) : ControllerBase
{
  [AllowAnonymous]
  [HttpPost]
  [ProducesResponseType(StatusCodes.Status201Created)]
  public async Task<IActionResult> Submit([FromBody] ContactSubmissionRequest request)
  {
    var entity = new ContactSubmission
    {
      FirstName = request.FirstName,
      LastName = request.LastName,
      CompanyName = request.CompanyName,
      Email = request.Email,
      Phone = request.Phone,
      EmployeeRange = request.EmployeeRange,
      Requirements = request.Requirements,
      Consent = request.Consent
    };

    dbContext.ContactSubmissions.Add(entity);
    await dbContext.SaveChangesAsync();

    _ = NotifyAdminsAsync(entity);

    return CreatedAtAction(nameof(Submit), new { id = entity.Id }, new { id = entity.Id });
  }

  private async Task NotifyAdminsAsync(ContactSubmission submission)
  {
    var recipients = configuration["Notifications:NewSignupRecipients"];
    if (string.IsNullOrWhiteSpace(recipients))
    {
      return;
    }

    var subject = "New contact enquiry";
    var body = $"""
      <p>A new contact enquiry was submitted.</p>
      <p><strong>Name:</strong> {WebUtility.HtmlEncode($"{submission.FirstName} {submission.LastName}".Trim())}</p>
      <p><strong>Email:</strong> {WebUtility.HtmlEncode(submission.Email)}</p>
      <p><strong>Phone:</strong> {WebUtility.HtmlEncode(submission.Phone)}</p>
      <p><strong>Company:</strong> {WebUtility.HtmlEncode(submission.CompanyName)}</p>
      {(!string.IsNullOrWhiteSpace(submission.EmployeeRange) ? $"<p><strong>Employees:</strong> {WebUtility.HtmlEncode(submission.EmployeeRange)}</p>" : string.Empty)}
      <p><strong>Requirements:</strong><br/>{WebUtility.HtmlEncode(submission.Requirements)}</p>
      """;

    var addresses = recipients
      .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
      .Distinct(StringComparer.OrdinalIgnoreCase);

    foreach (var address in addresses)
    {
      try
      {
        await emailSender.SendEmailAsync(address, subject, body);
      }
      catch (Exception ex)
      {
        logger.LogWarning(ex, "Failed to send contact submission notification to {AdminEmail}", address);
      }
    }
  }
}
