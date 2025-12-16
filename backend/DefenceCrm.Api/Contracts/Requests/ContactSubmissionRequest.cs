namespace DefenceCrm.Api.Contracts.Requests;

public class ContactSubmissionRequest
{
  public required string FirstName { get; init; }
  public required string LastName { get; init; }
  public required string CompanyName { get; init; }
  public required string Email { get; init; }
  public required string Phone { get; init; }
  public string? EmployeeRange { get; init; }
  public required string Requirements { get; init; }
  public bool Consent { get; init; }
}
