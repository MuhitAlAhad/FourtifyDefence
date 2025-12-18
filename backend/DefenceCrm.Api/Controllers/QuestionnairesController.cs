using DefenceCrm.Api.Contracts.Requests;
using DefenceCrm.Api.Data;
using DefenceCrm.Api.Models;
using DefenceCrm.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace DefenceCrm.Api.Controllers;

[ApiController]
[Route("api/questionnaires")]
public class QuestionnairesController(
  ApplicationDbContext dbContext,
  IEmailSender emailSender,
  IConfiguration configuration,
  ILogger<QuestionnairesController> logger) : ControllerBase
{
  [AllowAnonymous]
  [HttpPost]
  [ProducesResponseType(StatusCodes.Status201Created)]
  public async Task<IActionResult> Submit([FromBody] QuestionnaireSubmissionRequest request)
  {
    var entity = new QuestionnaireSubmission
    {
      CompanyName = request.CompanyName,
      Abn = request.Abn,
      CompanySize = request.CompanySize,
      Industry = request.Industry,
      ContactName = request.ContactName,
      ContactEmail = request.ContactEmail,
      ContactPhone = request.ContactPhone,
      DefenceIndustry = request.DefenceIndustry,
      DispMember = request.DispMember,
      GovernmentPanels = request.GovernmentPanels,
      NominatedCso = request.NominatedCso,
      NominatedSo = request.NominatedSo,
      CsoNotSure = request.CsoNotSure,
      SoNotSure = request.SoNotSure,
      Plan = request.Plan,
      AdminFirstName = request.AdminFirstName,
      AdminLastName = request.AdminLastName,
      AdminEmail = request.AdminEmail,
      AdminPhone = request.AdminPhone
    };

    dbContext.QuestionnaireSubmissions.Add(entity);
    await dbContext.SaveChangesAsync();

    logger.LogInformation("Questionnaire submitted for {Email} ({Company})", entity.AdminEmail, entity.CompanyName);
    _ = NotifyAdminsAsync("New questionnaire submission", entity);

    return CreatedAtAction(nameof(Submit), new { id = entity.Id }, new { id = entity.Id });
  }

  [AllowAnonymous]
  [HttpPost("qualification")]
  [ProducesResponseType(StatusCodes.Status201Created)]
  public async Task<IActionResult> SubmitQualification([FromBody] QualificationSubmissionRequest request)
  {
    var nameParts = (request.ContactName ?? string.Empty).Split(' ', StringSplitOptions.RemoveEmptyEntries);
    var firstName = nameParts.Length > 0 ? nameParts[0] : string.Empty;
    var lastName = nameParts.Length > 1 ? string.Join(' ', nameParts.Skip(1)) : string.Empty;

    var entity = new QuestionnaireSubmission
    {
      CompanyName = request.CompanyName,
      Abn = request.Abn,
      CompanySize = request.CompanySize,
      Industry = request.Industry,
      ContactName = request.ContactName,
      ContactEmail = request.ContactEmail,
      ContactPhone = request.ContactPhone,
      DefenceIndustry = request.DefenceIndustry,
      DispMember = request.DispMember,
      GovernmentPanels = request.GovernmentPanels,
      NominatedCso = request.NominatedCso,
      NominatedSo = request.NominatedSo,
      CsoNotSure = request.CsoNotSure,
      SoNotSure = request.SoNotSure,
      Plan = "qualification",
      AdminFirstName = firstName,
      AdminLastName = lastName,
      AdminEmail = request.ContactEmail,
      AdminPhone = request.ContactPhone
    };

    dbContext.QuestionnaireSubmissions.Add(entity);
    await dbContext.SaveChangesAsync();

    logger.LogInformation("Qualification submitted for {Email} ({Company})", entity.ContactEmail, entity.CompanyName);
    _ = NotifyAdminsAsync("New qualification submission", entity);

    return CreatedAtAction(nameof(SubmitQualification), new { id = entity.Id }, new { id = entity.Id });
  }

  private async Task NotifyAdminsAsync(string subject, QuestionnaireSubmission entity)
  {
    var recipients = configuration["Notifications:NewSignupRecipients"];
    if (string.IsNullOrWhiteSpace(recipients))
    {
      return;
    }

    var body = $"""
      <p>{WebUtility.HtmlEncode(subject)}.</p>
      <p><strong>Company:</strong> {WebUtility.HtmlEncode(entity.CompanyName)}</p>
      <p><strong>ABN:</strong> {WebUtility.HtmlEncode(entity.Abn)}</p>
      <p><strong>Company Size:</strong> {WebUtility.HtmlEncode(entity.CompanySize)}</p>
      <p><strong>Industry:</strong> {WebUtility.HtmlEncode(entity.Industry)}</p>
      <p><strong>Contact:</strong> {WebUtility.HtmlEncode(entity.ContactName)} ({WebUtility.HtmlEncode(entity.ContactEmail)})</p>
      <p><strong>Phone:</strong> {WebUtility.HtmlEncode(entity.ContactPhone)}</p>
      <p><strong>DISP Member:</strong> {WebUtility.HtmlEncode(entity.DispMember)}</p>
      <p><strong>Defence Industry:</strong><br/>{WebUtility.HtmlEncode(entity.DefenceIndustry)}</p>
      {(!string.IsNullOrWhiteSpace(entity.GovernmentPanels) ? $"<p><strong>Government Panels:</strong> {WebUtility.HtmlEncode(entity.GovernmentPanels)}</p>" : string.Empty)}
      {(!string.IsNullOrWhiteSpace(entity.NominatedCso) ? $"<p><strong>CSO:</strong> {WebUtility.HtmlEncode(entity.NominatedCso)}</p>" : string.Empty)}
      {(!string.IsNullOrWhiteSpace(entity.NominatedSo) ? $"<p><strong>SO:</strong> {WebUtility.HtmlEncode(entity.NominatedSo)}</p>" : string.Empty)}
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
        logger.LogWarning(ex, "Failed to send questionnaire notification to {AdminEmail}", address);
      }
    }
  }
}
