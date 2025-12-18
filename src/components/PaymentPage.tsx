import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Building2, CheckCircle2, Lock, Shield } from 'lucide-react';
import { useState } from 'react';
import bgImage from 'figma:asset/2135485e1d21f7ff57b035a705371c25d20cb5d2.png';

export function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'invoice'>('card');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Get subscription details from sessionStorage (set from SubscribePage)
  const billingCycle = sessionStorage.getItem('billingCycle') || 'annual';
  const amount = billingCycle === 'annual' ? 25000 : 2450;
  const gst = amount * 0.1;
  const total = amount + gst;

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
    
    // Simulate payment processing
    setTimeout(() => {
      localStorage.setItem('hasActiveSubscription', 'true');
      navigate('/dashboard');
    }, 3000);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-[#080d1a] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-[#0f1419] p-8 clip-corner border border-[#3dd68c] text-center">
          <div className="w-20 h-20 bg-[#3dd68c]/10 clip-corner flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-[#3dd68c]" />
          </div>
          
          <h3 className="text-[#e2e8f0] mb-4">Payment Processing</h3>
          <p className="text-[#94a3b8] mb-6">
            Your payment is being processed securely. You'll be redirected to your dashboard shortly.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-[#94a3b8]">
            <div className="w-2 h-2 bg-[#3dd68c] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[#3dd68c] rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-[#3dd68c] rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] relative">
      {/* Background Image with Overlay */}
      <div 
        className="fixed top-0 left-0 right-0 bottom-0 z-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center 60%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4
        }}
      ></div>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[1] bg-gradient-to-b from-[#080d1a]/20 via-transparent to-[#080d1a]/20"></div>
      
      <div className="relative z-10">
        <Header />
        
        <div className="pt-32 pb-20 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            {/* Back Button */}
            <Link to="/subscribe" className="inline-flex items-center gap-2 text-[#3dd68c] hover:text-[#2ab872] mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Subscription Details</span>
            </Link>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="bg-[#0f1419] p-6 clip-corner border border-[#3dd68c] sticky top-24">
                  <h5 className="text-[#e2e8f0] mb-4">Order Summary</h5>
                  
                  <div className="space-y-4 mb-6 pb-6 border-b border-[#2a2f38]">
                    <div className="flex justify-between">
                      <span className="text-[#94a3b8]">Fourtify Professional</span>
                      <span className="text-[#e2e8f0]">${amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94a3b8]">Billing Cycle</span>
                      <span className="text-[#e2e8f0] capitalize">{billingCycle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94a3b8]">GST (10%)</span>
                      <span className="text-[#e2e8f0]">${gst.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mb-6">
                    <span className="text-[#e2e8f0]">Total Due Today</span>
                    <span className="text-[#3dd68c]">${total.toLocaleString()}</span>
                  </div>
                  
                  <div className="space-y-3 pt-6 border-t border-[#2a2f38]">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-[#3dd68c] flex-shrink-0 mt-0.5" />
                      <span className="text-[#94a3b8] text-sm">14-day money-back guarantee</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-[#3dd68c] flex-shrink-0 mt-0.5" />
                      <span className="text-[#94a3b8] text-sm">256-bit SSL encrypted payment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3dd68c] flex-shrink-0 mt-0.5" />
                      <span className="text-[#94a3b8] text-sm">PCI DSS compliant</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-[#3dd68c]/5 clip-corner-sm border border-[#3dd68c]/20">
                    <p className="text-[#94a3b8] text-sm">
                      By completing this purchase, you agree to our Terms of Service and Privacy Policy. Your subscription will automatically renew.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Left Column - Payment Form */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="bg-[#0f1419] p-8 lg:p-10 clip-corner border border-[#2a2f38]">
                  <h3 className="text-[#e2e8f0] mb-2">Payment Details</h3>
                  <p className="text-[#94a3b8] mb-8">Choose your preferred payment method</p>
                  
                  <form onSubmit={handleSubmitPayment} className="space-y-8">
                    {/* Payment Method Selection */}
                    <div>
                      <h5 className="text-[#e2e8f0] mb-4">Payment Method</h5>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-4 clip-corner-sm border transition-all ${
                            paymentMethod === 'card' 
                              ? 'bg-[#3dd68c]/10 border-[#3dd68c]' 
                              : 'bg-[#1a1f2e] border-[#2a2f38] hover:border-[#3dd68c]/50'
                          }`}
                        >
                          <CreditCard className={`w-6 h-6 mb-2 mx-auto ${paymentMethod === 'card' ? 'text-[#3dd68c]' : 'text-[#94a3b8]'}`} />
                          <div className="text-[#e2e8f0]">Credit Card</div>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bank')}
                          className={`p-4 clip-corner-sm border transition-all ${
                            paymentMethod === 'bank' 
                              ? 'bg-[#3dd68c]/10 border-[#3dd68c]' 
                              : 'bg-[#1a1f2e] border-[#2a2f38] hover:border-[#3dd68c]/50'
                          }`}
                        >
                          <Building2 className={`w-6 h-6 mb-2 mx-auto ${paymentMethod === 'bank' ? 'text-[#3dd68c]' : 'text-[#94a3b8]'}`} />
                          <div className="text-[#e2e8f0]">Bank Transfer</div>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('invoice')}
                          className={`p-4 clip-corner-sm border transition-all ${
                            paymentMethod === 'invoice' 
                              ? 'bg-[#3dd68c]/10 border-[#3dd68c]' 
                              : 'bg-[#1a1f2e] border-[#2a2f38] hover:border-[#3dd68c]/50'
                          }`}
                        >
                          <Shield className={`w-6 h-6 mb-2 mx-auto ${paymentMethod === 'invoice' ? 'text-[#3dd68c]' : 'text-[#94a3b8]'}`} />
                          <div className="text-[#e2e8f0]">Invoice</div>
                        </button>
                      </div>
                    </div>
                    
                    {/* Credit Card Form */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[#e2e8f0] mb-2">Cardholder Name *</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                            placeholder="John Smith"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[#e2e8f0] mb-2">Card Number *</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">Expiry Date *</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              placeholder="MM/YY"
                              maxLength={5}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">CVV *</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              placeholder="123"
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-4 bg-[#3dd68c]/5 clip-corner-sm border border-[#3dd68c]/20">
                          <input
                            type="checkbox"
                            id="save-card"
                            className="mt-1 w-4 h-4 accent-[#3dd68c]"
                            defaultChecked
                          />
                          <label htmlFor="save-card" className="text-[#94a3b8] text-sm">
                            <span className="text-[#e2e8f0]">Securely save this card for automatic {billingCycle} renewals</span>
                            <br />
                            Your card details will be encrypted and stored securely. You can remove it anytime from your account settings.
                          </label>
                        </div>
                      </div>
                    )}
                    
                    {/* Bank Transfer Details */}
                    {paymentMethod === 'bank' && (
                      <div className="p-6 bg-[#2a2f38] clip-corner border border-[#3a3f48]">
                        <h5 className="text-[#e2e8f0] mb-4">Bank Transfer Instructions</h5>
                        <div className="space-y-3 text-[#94a3b8]">
                          <div>
                            <span className="text-[#e2e8f0]">Account Name:</span> Fourtify Defence Pty Ltd
                          </div>
                          <div>
                            <span className="text-[#e2e8f0]">BSB:</span> 123-456
                          </div>
                          <div>
                            <span className="text-[#e2e8f0]">Account Number:</span> 12345678
                          </div>
                          <div>
                            <span className="text-[#e2e8f0]">Reference:</span> [Will be provided after submission]
                          </div>
                          <div className="pt-4 border-t border-[#3a3f48] text-sm">
                            Please allow 2-3 business days for bank transfers to be processed. Your account will be activated once payment is confirmed.
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Invoice Details */}
                    {paymentMethod === 'invoice' && (
                      <div className="p-6 bg-[#2a2f38] clip-corner border border-[#3a3f48]">
                        <h5 className="text-[#e2e8f0] mb-4">Invoice Payment</h5>
                        <div className="space-y-4">
                          <p className="text-[#94a3b8]">
                            We'll send you an invoice to the email address associated with your account. Payment terms are Net 30 days.
                          </p>
                          
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">Purchase Order Number (Optional)</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              placeholder="PO-2024-001"
                            />
                          </div>
                          
                          <div className="pt-4 border-t border-[#3a3f48] text-sm text-[#94a3b8]">
                            Note: Invoice payment requires credit approval. Your account will be activated upon invoice generation.
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Billing Address */}
                    <div>
                      <h5 className="text-[#e2e8f0] mb-4">Billing Address</h5>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[#e2e8f0] mb-2">Street Address *</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                            required
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">City *</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">State *</label>
                            <select className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors">
                              <option>Select</option>
                              <option>NSW</option>
                              <option>VIC</option>
                              <option>QLD</option>
                              <option>WA</option>
                              <option>SA</option>
                              <option>TAS</option>
                              <option>ACT</option>
                              <option>NT</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">Postcode *</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Final Confirmation */}
                    <div className="pt-6 border-t border-[#2a2f38]">
                      <div className="flex items-start gap-3 mb-6">
                        <input
                          type="checkbox"
                          id="final-terms"
                          className="mt-1 w-4 h-4 accent-[#3dd68c]"
                          required
                        />
                        <label htmlFor="final-terms" className="text-[#94a3b8]">
                          I authorize Fourtify Defence to charge my {paymentMethod === 'card' ? 'credit card' : 'account'} for ${total.toLocaleString()} AUD today, and for subsequent {billingCycle} billing cycles until I cancel my subscription.
                        </label>
                      </div>
                      
                      <Button variant="primary" size="lg" className="w-full">
                        {paymentMethod === 'invoice' ? 'Request Invoice' : 'Complete Payment'}
                      </Button>
                      
                      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#94a3b8]">
                        <Lock className="w-4 h-4" />
                        <span>Secure encrypted payment via Stripe</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
