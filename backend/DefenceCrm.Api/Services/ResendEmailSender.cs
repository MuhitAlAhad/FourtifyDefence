using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Text;
using System.Text.Json;

namespace DefenceCrm.Api.Services;

public class ResendEmailSender(HttpClient httpClient, IOptions<ResendOptions> optionsAccessor, ILogger<ResendEmailSender> logger) : IEmailSender
{
  private readonly HttpClient _client = httpClient;
  private readonly ResendOptions _options = optionsAccessor.Value;

  public async Task SendEmailAsync(string to, string subject, string htmlBody, List<object>? attachments = null)
  {
    if (string.IsNullOrWhiteSpace(_options.ApiKey) || string.IsNullOrWhiteSpace(_options.From))
    {
      throw new InvalidOperationException("Resend settings are not configured.");
    }

    using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.resend.com/emails");
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _options.ApiKey);

    if (attachments == null)
    {
        attachments = new List<object>();
    }

    //var attachments = new List<object>();

    //if (!string.IsNullOrEmpty(attachmentPath))
    //{
    //    var fileBytes = await File.ReadAllBytesAsync(attachmentPath);
    //    var base64File = Convert.ToBase64String(fileBytes);

    //    attachments.Add(new
    //    {
    //        filename = Path.GetFileName(attachmentPath),
    //        content = base64File,
    //        contentType = "application/pdf" // or video/mp4, image/png, etc.
    //    });
    //}

    var payload = new
    {
      from = _options.From,
      to = new[] { to },
      subject,
      html = htmlBody,
      attachments = attachments
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
