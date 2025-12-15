namespace DefenceCrm.Api.Contracts.Responses;

public class AuthResponse
{
  public required string UserId { get; init; }
  public required string Email { get; init; }
  public string? FullName { get; init; }
}
