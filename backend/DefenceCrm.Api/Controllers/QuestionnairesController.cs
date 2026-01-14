using DefenceCrm.Api.Contracts.Requests;
using DefenceCrm.Api.Data;
using DefenceCrm.Api.Models;
using DefenceCrm.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace DefenceCrm.Api.Controllers;

[ApiController]
[Route("api/questionnaires")]
public class QuestionnairesController(
  ApplicationDbContext dbContext,
  IEmailSender emailSender,
  IConfiguration configuration,
  ILogger<QuestionnairesController> logger, 
  IWebHostEnvironment env, 
  ICheckout2PaymentGateway checkout2PaymentGateway,
  IConfiguration config) : ControllerBase
{
  [AllowAnonymous]
  [HttpPost]
  [ProducesResponseType(StatusCodes.Status201Created)]
  public async Task<IActionResult> Submit([FromBody] QuestionnaireSubmissionRequest request)
  {
    QuestionnaireSubmission entity;

    if (!string.IsNullOrEmpty(request.id))
    {
        entity = await dbContext.QuestionnaireSubmissions.FindAsync(request.id);

        if (entity != null)
        {
            // Update existing entity properties
            entity.Plan = request.Plan;
            entity.AdminFirstName = request.AdminFirstName;
            entity.AdminLastName = request.AdminLastName;
            entity.AdminEmail = request.AdminEmail;
            entity.AdminPhone = request.AdminPhone;
        }
        else
        {
            entity = CreateNewEntity(request);
            dbContext.QuestionnaireSubmissions.Add(entity);
        }
    }
    else
    {
        entity = CreateNewEntity(request);
        dbContext.QuestionnaireSubmissions.Add(entity);
    }

    await dbContext.SaveChangesAsync();

    logger.LogInformation("Questionnaire submitted for {Email} ({Company})", entity.AdminEmail, entity.CompanyName);
    _ = NotifyAdminsAsync("New questionnaire submission", entity);
    var paymentUrl = checkout2PaymentGateway.SendPaymentAsync(entity.Id.ToString(), "2099.00");

    return CreatedAtAction(nameof(Submit), new { id = entity.Id }, new { id = entity.Id, paymentUrl });
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
      AdminPhone = request.ContactPhone,
      SubmittedVia = request.qualifyLocation
    };

    dbContext.QuestionnaireSubmissions.Add(entity);
    await dbContext.SaveChangesAsync();

    var attachments = new List<object>();
    var configFileName = configuration["EmailDemoVideoAttachment:FileName"] ?? "";
    var configFileNameFormat = configuration["EmailDemoVideoAttachment:VideoFormat"] ?? "";

    if (!string.IsNullOrEmpty(configFileName) && !string.IsNullOrEmpty(configFileNameFormat)) {

        var filePath = Path.Combine(env.ContentRootPath, configFileName);

        if (System.IO.File.Exists(filePath))
        {
            var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            var base64File = Convert.ToBase64String(fileBytes);
            
            attachments.Add(new
            {
                filename = Path.GetFileName(filePath),
                content = base64File,
                contentType = configFileNameFormat // or video/mp4, image/png, etc.
            });
        }

    }

    logger.LogInformation("Qualification submitted for {Email} ({Company})", entity.ContactEmail, entity.CompanyName);

    if (request.qualifyLocation == "InterestedSignMeUp")
    {
        var websiteLink = configuration["Notifications:WebsiteLink"] ?? "https://fourd.com.au";
        var baseUrl = configuration["AppConfig:FrontendUrl"] ?? "http://localhost:3000"; //configuration["Resend:ConfirmationRedirectUrl"] ?? configuration["Email:ConfirmationRedirectUrl"];
        var redirectUrl = $"{websiteLink}/register?rid={entity.Id}";
        var emailMessage = $@"
        <div style=""font-family: Arial, sans-serif; line-height: 1.6; color: #333;"">
            <p>Dear {firstName},</p>
            <p>Thank you for confirming your email address.</p>
            <p>Your email has been successfully verified, and your subscription request with <strong>Fourtify Defence</strong> is now validated.</p>
            <p>To complete your subscription and gain secure access to the Fourtify platform, please proceed to our secure payment gateway using the link below:</p>
            <p style=""margin: 25px 0;"">
                <a href=""{redirectUrl}"" style=""background-color: #0056b3; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;"">
                    Complete Subscription & Secure Payment
                </a>
            </p>
            <p>Once payment is confirmed, a member of our team will be in contact shortly to finalise onboarding and discuss next steps, including platform access and support options.</p>
            <p>Your interest in Fourtify Defence is important to us, and we look forward to supporting your organisation’s DISP membership and security obligations.</p>
            <p>If you have any questions in the meantime, please contact us at <a href=""mailto:support@fourtify.com.au"">support@fourtify.com.au</a>.</p>
            <br/>
            <p>Best Regards,<br /><strong>The Fourtify Defence Team</strong></p>
        </div>";
        _ = NotifyAdminsAsync("Email Verified – Complete Your Fourtify Defence Subscription", entity);
        _ = SendCompleteQualificationEmailAsync("Email Verified – Complete Your Fourtify Defence Subscription", emailMessage, entity);
    }
    else
    {
       _  = NotifyAdminsAsync("Email Verification Confirmed – Fourtify Defence", entity, attachments);
    }

    //var paymentUrl = checkout2PaymentGateway.SendPaymentAsync(entity.Id.ToString(), "2099.00");
    //return CreatedAtAction(nameof(SubmitQualification), new { id = entity.Id }, new { id = entity.Id, paymentUrl });

    return CreatedAtAction(nameof(SubmitQualification), new { id = entity.Id }, new { id = entity.Id });
  }

  [AllowAnonymous]
  [HttpGet("complete-qualification")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<IActionResult> CompleteQualification([FromQuery] string entityId)
  {

    if (!Guid.TryParse(entityId, out var guid))
    return BadRequest("Invalid complete subscription and secured payment link");

    var questionnaire = await dbContext.QuestionnaireSubmissions.FindAsync(guid);

    if (questionnaire is null)
    {
        return BadRequest(new { message = "Invalid complete subscription and secured payment link." });
    }

    if (questionnaire.SubmittedVia != "InterestedSignMeUp")
    {
        return BadRequest(new { message = "Submission is not made via subscription form." });
    }

    logger.LogInformation("Questionnaire {entityId} confirmed email", questionnaire.Id);

    return Ok(questionnaire);
  }

  private async Task NotifyAdminsAsync(string subject, QuestionnaireSubmission entity, List<object>? attachmentPath = null)
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
        await emailSender.SendEmailAsync(address, subject, body, attachmentPath);
      }
      catch (Exception ex)
      {
        logger.LogWarning(ex, "Failed to send questionnaire notification to {AdminEmail}", address);
      }
    }
  }

  //[AllowAnonymous]
  //[HttpGet("checkout2PaymentReturn")]
  //public string Checkout2PaymentReturn()
  //{
  //      return Redirect($"https://frontend.com/payment-return?orderId={orderId}");
  //      return "processing";
  //}

  [AllowAnonymous]
  [HttpPost("webhook/2checkout")]
  public async Task<IActionResult> Webhook([FromBody] TwoCheckoutWebhook payload)
  {
    if (!IsValidWebhook(payload))
        return Unauthorized();

    var questionnaireSubmission = await dbContext.QuestionnaireSubmissions
        .FirstOrDefaultAsync(o => o.Id.ToString() == payload.EntityId);

    if (questionnaireSubmission == null)
        return NotFound();

    if (payload.Status == "PAYMENT_COMPLETED")
        questionnaireSubmission.Status = "Paid";

    if (payload.Status == "PAYMENT_FAILED")
        questionnaireSubmission.Status = "Failed";

    await dbContext.SaveChangesAsync();

    return Ok();
  }

  private bool IsValidWebhook(TwoCheckoutWebhook payload)
  {
    var raw = payload.EntityId + payload.Status;
    var secret = config["TwoCheckout:WebhookSecret"];

    if (secret == null)
    {
        throw new InvalidOperationException("TwoCheckout settings are not configured.");
    }

    using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
    var hash = BitConverter.ToString(
        hmac.ComputeHash(Encoding.UTF8.GetBytes(raw))
    ).Replace("-", "").ToLower();

    return hash == payload.Signature;
  }

  private async Task SendCompleteQualificationEmailAsync(string subject, string body, QuestionnaireSubmission entity)
  {
    try
    {
        var websiteLink = configuration["Notifications:WebsiteLink"] ?? "https://fourd.com.au";
        var demoLink = configuration["Notifications:DemoLink"] ?? "https://fourd.com.au/demo";

        subject = string.IsNullOrEmpty(subject) ? "Fourtify Defence Updates" : subject;
        body = string.IsNullOrEmpty(body) ? 
                $"""
                <p>Your email has been confirmed successfully. You can now sign in.</p>
                <p><a href="{WebUtility.HtmlEncode(websiteLink)}" target="_blank" rel="noreferrer">Visit our website</a></p>
                <p><a href="{WebUtility.HtmlEncode(demoLink)}" target="_blank" rel="noreferrer">Watch a demo</a></p>
                """ 
                : body;

        await emailSender.SendEmailAsync(entity.ContactEmail!, subject, body);
    }
    catch (Exception ex)
    {
        logger.LogWarning(ex, "Failed to send post-verification email to {Email}", entity.ContactEmail);
    }
  }

  QuestionnaireSubmission CreateNewEntity(dynamic req) => new QuestionnaireSubmission
  {
    CompanyName = req.CompanyName,
    Abn = req.Abn,
    CompanySize = req.CompanySize,
    Industry = req.Industry,
    ContactName = req.ContactName,
    ContactEmail = req.ContactEmail,
    ContactPhone = req.ContactPhone,
    DefenceIndustry = req.DefenceIndustry,
    DispMember = req.DispMember,
    GovernmentPanels = req.GovernmentPanels,
    NominatedCso = req.NominatedCso,
    NominatedSo = req.NominatedSo,
    CsoNotSure = req.CsoNotSure,
    SoNotSure = req.SoNotSure,
    Plan = req.Plan,
    AdminFirstName = req.AdminFirstName,
    AdminLastName = req.AdminLastName,
    AdminEmail = req.AdminEmail,
    AdminPhone = req.AdminPhone,
    SubmittedVia = "Signup"
  };

}
