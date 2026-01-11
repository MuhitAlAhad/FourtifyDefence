namespace DefenceCrm.Api.Models;

public class QuestionnaireSubmission
{
  public Guid Id { get; set; }
  public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

  public string CompanyName { get; set; } = string.Empty;
  public string Abn { get; set; } = string.Empty;
  public string CompanySize { get; set; } = string.Empty;
  public string Industry { get; set; } = string.Empty;

  public string ContactName { get; set; } = string.Empty;
  public string ContactEmail { get; set; } = string.Empty;
  public string ContactPhone { get; set; } = string.Empty;

  public string DefenceIndustry { get; set; } = string.Empty;
  public string DispMember { get; set; } = string.Empty;
  public string? GovernmentPanels { get; set; }

  public string? NominatedCso { get; set; }
  public string? NominatedSo { get; set; }
  public bool CsoNotSure { get; set; }
  public bool SoNotSure { get; set; }

  public string Plan { get; set; } = string.Empty;
  public string? SubmittedVia { get; set; } = string.Empty;
  public string? Status { get; set; } = string.Empty;
  public string AdminFirstName { get; set; } = string.Empty;
  public string AdminLastName { get; set; } = string.Empty;
  public string AdminEmail { get; set; } = string.Empty;
  public string AdminPhone { get; set; } = string.Empty;
}
