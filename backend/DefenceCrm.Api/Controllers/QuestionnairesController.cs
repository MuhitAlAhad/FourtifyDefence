using DefenceCrm.Api.Contracts.Requests;
using DefenceCrm.Api.Data;
using DefenceCrm.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefenceCrm.Api.Controllers;

[ApiController]
[Route("api/questionnaires")]
public class QuestionnairesController(ApplicationDbContext dbContext, ILogger<QuestionnairesController> logger) : ControllerBase
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

    return CreatedAtAction(nameof(Submit), new { id = entity.Id }, null);
  }
}
