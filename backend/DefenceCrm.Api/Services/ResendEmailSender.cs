using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;

namespace DefenceCrm.Api.Services;

public class ResendEmailSender(HttpClient httpClient, IOptions<ResendOptions> optionsAccessor, ILogger<ResendEmailSender> logger) : IEmailSender
{
  private readonly HttpClient _client = httpClient;
  private readonly ResendOptions _options = optionsAccessor.Value;

  public async Task SendEmailAsync(string to, string subject, string htmlBody)
  {
    if (string.IsNullOrWhiteSpace(_options.ApiKey) || string.IsNullOrWhiteSpace(_options.From))
    {
      throw new InvalidOperationException("Resend settings are not configured.");
    }

    using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.resend.com/emails");
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _options.ApiKey);

    var payload = new
    {
      from = _options.From,
      to = new[] { to },
      subject,
      html = htmlBody
    };

    var json = JsonSerializer.Serialize(payload);
    request.Content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await _client.SendAsync(request);
    if (!response.IsSuccessStatusCode)
    {
      var body = await response.Content.ReadAsStringAsync();
      logger.LogError("Resend email failed with status {StatusCode}: {Body}", response.StatusCode, body);
      throw new InvalidOperationException($"Failed to send email via Resend. Status {(int)response.StatusCode}.");
    }
  }
}
