import { Header } from './Header';
import { Footer } from './Footer';
import { Shield, MapPin, Mail, WholeWordIcon } from 'lucide-react';

export function RefundCancellationExchangePolicyPage() {
  return (
    <div className="min-h-screen bg-[#080d1a]">
      <Header />
      
      <main className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f1824]/80 backdrop-blur-sm border border-[#3dd68c]/40 clip-corner-sm mb-6">
              <Shield className="w-4 h-4 text-[#3dd68c]" />
              <span className="text-[#3dd68c]">Refund, Cancellation & Exchange Policy</span>
            </div>
            <p className="text-[#94a3b8] max-w-3xl mx-auto">
              Fourtify Defence Pty Ltd (“Fourtify Defence”, “we”, “our”, “us”) is committed to providing transparent and fair processes for payments, cancellations and refunds in accordance with Australian Consumer Law and card-scheme requirements.
            </p>
          </div>

          {/* Policy Content */}
          <section className="mb-20">
            
            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">1. Payments</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  All payments made via the Fourtify Defence website are processed securely through the NAB eCommerce payment gateway. We do not store full credit card details on our systems.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">2. Subscription Services & Digital Products</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  Fourtify Defence provides digital subscription services, including access to software platforms, dashboards and associated onboarding services.
                </p>
                <p>
                  Once access to the Fourtify platform has been provisioned, the service is considered to have commenced.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">3. Cancellation by Cardholder</h3>
              
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <h5 className="text-[#e2e8f0] mb-6">
                  3.1 Prior to Service Commencement
                </h5>
                <p>
                  A cardholder may request cancellation of a transaction before platform access is provisioned by contacting us promptly at:
                </p>
                <p>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-8 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#3dd68c]" />
                    </div>
                    <div>
                      <p className="text-[#94a3b8]">info@fourd.com.au</p>
                    </div>
                  </div>

                </p>
                <p>
                  If cancellation is approved prior to service commencement, a full refund will be processed to the original payment method.
                </p>
              </div>

              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <h5 className="text-[#e2e8f0] mb-6">
                  3.2 After Service Commencement
                </h5>
                <p>
                  Once access to the Fourtify platform, dashboard, or onboarding materials has been provided, cancellations are not eligible for a refund, unless required under Australian Consumer Law.
                </p>
                <p>
                  This includes (but is not limited to):
                </p>

                <div className="grid md:grid-cols-1 gap-x-12 gap-y-4">
                {[
                  'Provisioning of a Fourtify dashboard',
                  'Issuance of access credentials',
                  'Commencement of onboarding or configuration activities'
                ].map((subpoints, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#3dd68c] clip-corner-sm mt-2 flex-shrink-0"></div>
                    <span className="text-[#94a3b8]">{subpoints}</span>
                  </div>
                ))}
              </div>
                  
              </div>

            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">4. Refunds</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  Refunds will only be provided where:
                </p>

                <div className="grid md:grid-cols-1 gap-x-12 gap-y-4">
                {[
                  'A payment was made in error; or',
                  'A service cannot be delivered as agreed; or',
                  'A refund is required under Australian Consumer Law.'
                ].map((subpoints, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#3dd68c] clip-corner-sm mt-2 flex-shrink-0"></div>
                    <span className="text-[#94a3b8]">{subpoints}</span>
                  </div>
                ))}
              </div>
                
                <p>
                  Approved refunds will be processed via the original payment method used at the time of purchase. Please allow 5–10 business days for the refund to appear, depending on your financial institution.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">5. Exchanges</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  As Fourtify Defence provides digital services and subscriptions, exchanges are not applicable.
                </p>
                <p>
                  If a client wishes to change their subscription tier or service level, this will be handled as a subscription amendment and may involve additional charges or credits, subject to agreement.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">6. Disputed Transactions</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  If a cardholder believes a transaction is unauthorised or incorrect, they should first contact Fourtify Defence directly to allow us the opportunity to resolve the issue.
                </p>
                <p>
                  If the matter cannot be resolved, the cardholder may raise a dispute with their card issuer in accordance with card-scheme rules.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">7. Contact Us</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  For all cancellation, refund or billing enquiries, please contact:
                </p>
                <p>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-8 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#3dd68c]" />
                    </div>
                    <div>
                      <p className="text-[#94a3b8]">info@fourd.com.au</p>
                    </div>
                  </div>

                </p>
                <p>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-8 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#3dd68c]" />
                    </div>
                    <div>
                      <p className="text-[#94a3b8]">Fourtify Defence Pty Ltd</p>
                    </div>
                  </div>

                </p>
                <p>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-8 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center flex-shrink-0">
                      <WholeWordIcon className="w-5 h-5 text-[#3dd68c]" />
                    </div>
                    <div>
                      <p className="text-[#94a3b8]">www.fourd.com.au</p>
                    </div>
                  </div>

                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">8. Australian Consumer Law</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  Nothing in this policy limits your rights under the Australian Consumer Law. Where services are not provided with due care and skill, or do not meet consumer guarantees, you may be entitled to a remedy as required by law.
                </p>
              </div>
            </div>

          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
