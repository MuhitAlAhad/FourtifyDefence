using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;

namespace DefenceCrm.Api.Services;

public class SmtpEmailSender(IOptions<EmailOptions> optionsAccessor, ILogger<SmtpEmailSender> logger) : IEmailSender
{
  private readonly EmailOptions _options = optionsAccessor.Value;

  public async Task SendEmailAsync(string to, string subject, string htmlBody)
  {
    if (string.IsNullOrWhiteSpace(_options.Host) ||
        string.IsNullOrWhiteSpace(_options.From) ||
        string.IsNullOrWhiteSpace(_options.Username) ||
        string.IsNullOrWhiteSpace(_options.Password))
    {
      throw new InvalidOperationException("Email settings are not configured.");
    }

    using var client = new SmtpClient(_options.Host, _options.Port)
    {
      EnableSsl = _options.EnableSsl,
      Credentials = new NetworkCredential(_options.Username, _options.Password)
    };

    var message = new MailMessage
    {
      From = new MailAddress(_options.From),
      Subject = subject,
      Body = htmlBody,
      IsBodyHtml = true
    };
    message.To.Add(new MailAddress(to));

    try
    {
      await client.SendMailAsync(message);
    }
    catch (Exception ex)
    {
      logger.LogError(ex, "Failed to send email to {Recipient}", to);
      throw;
    }
  }
}
