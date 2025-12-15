namespace DefenceCrm.Api.Contracts.Requests;

public class SignupRequest
{
  public required string Email { get; init; }
  public required string Password { get; init; }
  public string? FullName { get; init; }
}
