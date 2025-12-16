namespace DefenceCrm.Api.Models;

public class ContactSubmission
{
  public Guid Id { get; set; }
  public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public string CompanyName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string Phone { get; set; } = string.Empty;
  public string? EmployeeRange { get; set; }
  public string Requirements { get; set; } = string.Empty;
  public bool Consent { get; set; }
}
