import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Shield, Lock } from 'lucide-react';
import { useState } from 'react';
import bgImage from 'figma:asset/2135485e1d21f7ff57b035a705371c25d20cb5d2.png';

export function SubscribePage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Store billing cycle for payment page
    sessionStorage.setItem('billingCycle', billingCycle);
    navigate('/payment');
  };

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
            <Link to="/" className="inline-flex items-center gap-2 text-[#3dd68c] hover:text-[#2ab872] mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Plan Summary */}
              <div className="lg:col-span-1">
                <div className="bg-[#0f1419] p-6 clip-corner border border-[#3dd68c] sticky top-24">
                  <div className="mb-6">
                    <span className="px-3 py-1 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny text-sm">
                      Most Popular
                    </span>
                  </div>
                  
                  <h4 className="text-[#e2e8f0] mb-4">Fourtify Professional</h4>
                  
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl text-[#3dd68c]">$25,000</span>
                    <span className="text-[#94a3b8]">/year</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {[
                      'Up to 100 personnel',
                      'All DISP modules included',
                      'Document storage (100GB)',
                      'Priority support',
                      'Advanced reporting',
                      'Custom workflows',
                      'API access',
                      'Dedicated account manager'
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3dd68c] flex-shrink-0 mt-0.5" />
                        <span className="text-[#94a3b8] text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-[#2a2f38] space-y-3">
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <Shield className="w-4 h-4 text-[#3dd68c]" />
                      <span>14-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <Lock className="w-4 h-4 text-[#3dd68c]" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Subscription Form */}
              <div className="lg:col-span-2">
                <div className="bg-[#0f1419] p-8 lg:p-10 clip-corner border border-[#2a2f38]">
                  <h3 className="text-[#e2e8f0] mb-2">Complete Your Subscription</h3>
                  <p className="text-[#94a3b8] mb-8">Fill in your details to get started with Fourtify Professional</p>
                  
                  <form className="space-y-8" onSubmit={handleContinueToPayment}>
                    {/* Company Information */}
                    <div>
                      <h5 className="text-[#e2e8f0] mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny flex items-center justify-center">1</span>
                        Company Information
                      </h5>
                      
                      <div className="space-y-4 pl-10">
                        <div>
                          <label className="block text-[#e2e8f0] mb-2">Company Name *</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                            required
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">ABN *</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">Industry Sector *</label>
                            <select className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors">
                              <option>Select sector</option>
                              <option>Aerospace & Aviation</option>
                              <option>Maritime Defence</option>
                              <option>Land Systems</option>
                              <option>Electronics & Communications</option>
                              <option>Cybersecurity Services</option>
                              <option>Defence Consulting</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-[#e2e8f0] mb-2">Company Address *</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                            placeholder="Street address"
                            required
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              placeholder="City"
                              required
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              placeholder="State"
                              required
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              placeholder="Postcode"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Primary Contact */}
                    <div>
                      <h5 className="text-[#e2e8f0] mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny flex items-center justify-center">2</span>
                        Primary Contact Details
                      </h5>
                      
                      <div className="space-y-4 pl-10">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">First Name *</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">Last Name *</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-[#e2e8f0] mb-2">Job Title *</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                            required
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">Work Email *</label>
                            <input
                              type="email"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">Phone Number *</label>
                            <input
                              type="tel"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Usage Details */}
                    <div>
                      <h5 className="text-[#e2e8f0] mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny flex items-center justify-center">3</span>
                        Usage Requirements
                      </h5>
                      
                      <div className="space-y-4 pl-10">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">Number of Personnel *</label>
                            <select className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors">
                              <option>Select range</option>
                              <option>1-25</option>
                              <option>26-50</option>
                              <option>51-75</option>
                              <option>76-100</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[#e2e8f0] mb-2">Preferred Start Date *</label>
                            <input
                              type="date"
                              className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-[#e2e8f0] mb-2">Current DISP Status *</label>
                          <select className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors">
                            <option>Select status</option>
                            <option>Not yet started</option>
                            <option>In progress</option>
                            <option>Certified - renewal due</option>
                            <option>Currently certified</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-[#e2e8f0] mb-2">Additional Requirements (Optional)</label>
                          <textarea
                            rows={3}
                            className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors resize-none"
                            placeholder="Any specific modules or customizations you need..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    
                    {/* Billing Cycle Selection */}
                    <div>
                      <h5 className="text-[#e2e8f0] mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny flex items-center justify-center">4</span>
                        Billing Cycle
                      </h5>
                      
                      <div className="pl-10">
                        <div className="grid md:grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setBillingCycle('annual')}
                            className={`p-4 clip-corner-sm border transition-all ${
                              billingCycle === 'annual' 
                                ? 'bg-[#3dd68c]/10 border-[#3dd68c]' 
                                : 'bg-[#1a1f2e] border-[#2a2f38] hover:border-[#3dd68c]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[#e2e8f0]">Annual</span>
                              {billingCycle === 'annual' && (
                                <CheckCircle2 className="w-5 h-5 text-[#3dd68c]" />
                              )}
                            </div>
                            <div className="text-[#3dd68c] mb-1">$25,000</div>
                            <div className="text-sm text-[#94a3b8]">Save 15% vs monthly</div>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setBillingCycle('monthly')}
                            className={`p-4 clip-corner-sm border transition-all ${
                              billingCycle === 'monthly' 
                                ? 'bg-[#3dd68c]/10 border-[#3dd68c]' 
                                : 'bg-[#1a1f2e] border-[#2a2f38] hover:border-[#3dd68c]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[#e2e8f0]">Monthly</span>
                              {billingCycle === 'monthly' && (
                                <CheckCircle2 className="w-5 h-5 text-[#3dd68c]" />
                              )}
                            </div>
                            <div className="text-[#3dd68c] mb-1">$2,450</div>
                            <div className="text-sm text-[#94a3b8]">Billed monthly</div>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Terms & Conditions */}
                    <div className="pl-10">
                      <div className="flex items-start gap-3 mb-6">
                        <input
                          type="checkbox"
                          id="terms"
                          className="mt-1 w-4 h-4 accent-[#3dd68c]"
                          required
                        />
                        <label htmlFor="terms" className="text-[#94a3b8]">
                          I agree to the <span className="text-[#3dd68c] hover:underline cursor-pointer">Terms of Service</span> and <span className="text-[#3dd68c] hover:underline cursor-pointer">Privacy Policy</span>. I understand that my subscription will automatically renew unless cancelled.
                        </label>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="marketing"
                          className="mt-1 w-4 h-4 accent-[#3dd68c]"
                        />
                        <label htmlFor="marketing" className="text-[#94a3b8]">
                          I'd like to receive product updates, security alerts, and DISP compliance news via email.
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-[#2a2f38]">
                      <Button variant="primary" size="lg" className="w-full mb-4" type="submit">
                        Continue to Payment
                      </Button>
                      <p className="text-center text-sm text-[#94a3b8]">
                        You'll be redirected to our secure payment processor to complete your purchase
                      </p>
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