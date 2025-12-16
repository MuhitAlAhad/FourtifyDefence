namespace DefenceCrm.Api.Services;

public class ResendOptions
{
  public string ApiKey { get; set; } = string.Empty;
  public string From { get; set; } = string.Empty;
  public string? ConfirmationLinkBaseUrl { get; set; }
}
