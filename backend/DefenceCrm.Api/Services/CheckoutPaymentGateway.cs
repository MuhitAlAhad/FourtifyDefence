using Microsoft.Extensions.Options;
using System.Globalization;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace DefenceCrm.Api.Services;

public class Checkout2PaymentGateway(ILogger<Checkout2PaymentGateway> logger, IHttpContextAccessor httpContextAccessor, IConfiguration config, IWebHostEnvironment env) : ICheckout2PaymentGateway
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
    private readonly IConfiguration _config = config;
    private readonly IWebHostEnvironment _env = env;

    public string SendPaymentAsync(string entityId, string amount)
    {
        var merchantCode = _config["TwoCheckout:MerchantCode"];
        var currency = _config["TwoCheckout:Currency"];

        if (string.IsNullOrWhiteSpace(merchantCode) || string.IsNullOrWhiteSpace(currency))
        {
            throw new InvalidOperationException("TwoCheckout settings are not configured.");
        }

        var request = _httpContextAccessor.HttpContext?.Request;
        
        if (request == null) throw new InvalidOperationException("Invalid application URL .");

        var uriBuilder = new UriBuilder(request.Scheme, request.Host.Host);

        if (_env.IsDevelopment())
        {
            // Use Sandbox Credentials or Log extra details
            uriBuilder.Port = 3000;
            uriBuilder.Host = "virtualproweb.wordpress.com";
        }
        else if (_env.IsStaging())
        {
            // Staging logic
            uriBuilder.Port = (int)request.Host.Port;
        }
        else
        {
            // Production logic
            uriBuilder.Port = (int)request.Host.Port;
        }

        decimal amountDecimal = decimal.Parse(amount, CultureInfo.InvariantCulture);
        string formattedAmount = amountDecimal.ToString("F2", CultureInfo.InvariantCulture);

        var hostAddress = uriBuilder.Uri.ToString().TrimEnd('/');

        //return "https://secure.2checkout.com/checkout/buy?" +
        //       $"sid={merchantcode}" +
        //       $"&mode=2co" +
        //       $"&li_0_name=52779606" +
        //       $"&li_0_price={formattedamount}" +
        //       $"&li_0_quantity=1" +
        //       $"&currency={currency}" +
        //       $"&return_url={hostaddress}{request.pathbase}/checkout2paymentreturn?entityid={entityid}";

        return "https://secure.2checkout.com/checkout/buy?" +
               $"sid={merchantCode}" +
               $"&mode=2CO" +
               $"&li_0_name=Order+{entityId}" +
               $"&li_0_price={formattedAmount}" +
               $"&li_0_quantity=1" +
               $"&currency={currency}" +
               $"&return_url={hostAddress}{request.PathBase}/checkout2PaymentReturn?entityId={entityId}";

    }

    private string GetFullBackendUrl()
    {
        var request = _httpContextAccessor.HttpContext?.Request;
        if (request == null) return "No active request";

        // Returns something like "https://api.yourdomain.com"
        return $"{request.Scheme}://{request.Host}{request.PathBase}";
    }
}
