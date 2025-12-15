namespace DefenceCrm.Api.Contracts.Responses;

public class AbnLookupResponse
{
  public required string Abn { get; init; }
  public required string EntityName { get; init; }
  public string Status { get; init; } = "Active";
}
