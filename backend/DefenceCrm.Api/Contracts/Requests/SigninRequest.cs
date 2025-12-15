namespace DefenceCrm.Api.Contracts.Requests;

public class SigninRequest
{
  public required string Email { get; init; }
  public required string Password { get; init; }
}
