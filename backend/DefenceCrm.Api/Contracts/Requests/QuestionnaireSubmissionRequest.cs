namespace DefenceCrm.Api.Contracts.Requests;

public class QuestionnaireSubmissionRequest
{
  public required string CompanyName { get; init; }
  public required string Abn { get; init; }
  public required string CompanySize { get; init; }
  public required string Industry { get; init; }

  public required string ContactName { get; init; }
  public required string ContactEmail { get; init; }
  public required string ContactPhone { get; init; }

  public required string DefenceIndustry { get; init; }
  public required string DispMember { get; init; }
  public string? GovernmentPanels { get; init; }

  public string? NominatedCso { get; init; }
  public string? NominatedSo { get; init; }
  public bool CsoNotSure { get; init; }
  public bool SoNotSure { get; init; }

  public required string Plan { get; init; }

  public required string AdminFirstName { get; init; }
  public required string AdminLastName { get; init; }
  public required string AdminEmail { get; init; }
  public required string AdminPhone { get; init; }
}
