namespace DefenceCrm.Api.Services;

public interface ICheckout2PaymentGateway
{
  string SendPaymentAsync(string entityId, string amount);
}
