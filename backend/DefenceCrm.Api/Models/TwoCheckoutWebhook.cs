namespace DefenceCrm.Api.Models;

public class TwoCheckoutWebhook
{
    public string EventType { get; set; }          // PAYMENT_COMPLETED
    public string OrderReference { get; set; }     // 2Checkout order ref
    public string EntityId { get; set; }    // Your orderId
    public string Status { get; set; }              // COMPLETED / FAILED
    public decimal Total { get; set; }
    public string Currency { get; set; }
    public string Signature { get; set; }           // Webhook signature
}
