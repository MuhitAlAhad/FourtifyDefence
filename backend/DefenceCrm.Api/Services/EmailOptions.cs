namespace DefenceCrm.Api.Services;

public class EmailOptions
{
  public string Host { get; set; } = string.Empty;
  public int Port { get; set; } = 587;
  public bool EnableSsl { get; set; } = true;
  public string Username { get; set; } = string.Empty;
  public string Password { get; set; } = string.Empty;
  public string From { get; set; } = string.Empty;
  // Optional override to send links via a specific domain (e.g., frontend).
  public string? ConfirmationLinkBaseUrl { get; set; }
}
