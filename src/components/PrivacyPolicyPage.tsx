import { Header } from './Header';
import { Footer } from './Footer';
import { Shield, MapPin, Mail, WholeWordIcon } from 'lucide-react';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#080d1a]">
      <Header />
      
      <main className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f1824]/80 backdrop-blur-sm border border-[#3dd68c]/40 clip-corner-sm mb-6">
              <Shield className="w-4 h-4 text-[#3dd68c]" />
              <span className="text-[#3dd68c]">Privacy Policy</span>
            </div>
            <p className="text-[#94a3b8] max-w-3xl mx-auto">
              Fourtify Defence Pty Ltd (“Fourtify Defence”, “we”, “our”, “us”) is committed to protecting the privacy of individuals and organisations who interact with us. This Privacy Policy outlines how we collect, use, store and disclose personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
            </p>
          </div>

          {/* Policy Content */}
          <section className="mb-20">
            
            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">1. What Information We Collect</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  We may collect personal information including, but not limited to:
                </p>
                
                <div className="grid md:grid-cols-1 gap-x-12 gap-y-4">
                {[
                  'Name, job title and organisation name',
                  'Email address and phone number',
                  'Business contact details',
                  'Information provided via enquiry forms, demonstrations or subscriptions',
                  'Payment-related information (processed securely via third-party payment providers)',
                  'Technical information such as IP address, browser type and access logs'
                ].map((subpoints, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#3dd68c] clip-corner-sm mt-2 flex-shrink-0"></div>
                    <span className="text-[#94a3b8]">{subpoints}</span>
                  </div>
                ))}
              </div>
                
                <p>
                  We only collect personal information that is reasonably necessary for our business activities.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">2. How We Collect Information</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  Personal information may be collected when you:
                </p>

                <div className="grid md:grid-cols-1 gap-x-12 gap-y-4">
                {[
                  'Visit our website',
                  'Submit an enquiry or request a demonstration',
                  'Subscribe to our services',
                  'Make a payment via our secure payment gateway',
                  'Communicate with us by email, phone or online forms'
                ].map((subpoints, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#3dd68c] clip-corner-sm mt-2 flex-shrink-0"></div>
                    <span className="text-[#94a3b8]">{subpoints}</span>
                  </div>
                ))}
              </div>
                
                <p>
                  We may also collect information automatically through cookies and similar technologies to improve website functionality and user experience.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">3. Use of Personal Information</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  We use personal information to:
                </p>

                <div className="grid md:grid-cols-1 gap-x-12 gap-y-4">
                {[
                  'Respond to enquiries and provide requested services',
                  'Verify identity and contact details',
                  'Provide access to the Fourtify platform and associated services',
                  'Process payments and manage subscriptions',
                  'Communicate updates, onboarding information and support',
                  'Meet legal, regulatory and contractual obligations',
                  'Improve our products, services and website'
                ].map((subpoints, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#3dd68c] clip-corner-sm mt-2 flex-shrink-0"></div>
                    <span className="text-[#94a3b8]">{subpoints}</span>
                  </div>
                ))}
              </div>
                
                <p>
                  We do not use personal information for purposes unrelated to our services without consent.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">4. Disclosure of Personal Information</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  We may disclose personal information to:
                </p>

                <div className="grid md:grid-cols-1 gap-x-12 gap-y-4">
                {[
                  'Our employees, contractors and trusted service providers (on a need-to-know basis)',
                  'Third-party service providers, including payment processors (such as NAB eCommerce), cloud hosting providers and IT support services',
                  'Government agencies or regulators where required by law'
                ].map((subpoints, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#3dd68c] clip-corner-sm mt-2 flex-shrink-0"></div>
                    <span className="text-[#94a3b8]">{subpoints}</span>
                  </div>
                ))}
              </div>
                
                <p>
                  All third parties engaged by Fourtify Defence are required to maintain appropriate confidentiality and security standards.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">5. Payment Security</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  Payments made via the Fourtify Defence website are processed securely through third-party payment providers.
                </p>
                <p>
                  Fourtify Defence does not store full credit card details on its systems.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">6. Data Storage & Security</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  We take reasonable steps to protect personal information from misuse, interference, loss, unauthorised access, modification or disclosure.
                </p>
                <p>
                  This includes:
                </p>

                <div className="grid md:grid-cols-1 gap-x-12 gap-y-4">
                {[
                  'Secure, Australian-hosted infrastructure',
                  'Access controls and authentication measures',
                  'Encryption and security monitoring',
                  'Policies and procedures aligned with Defence and cyber security best practices'
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
              <h3 className="text-[#e2e8f0] mb-6">7. Overseas Disclosure</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  Where possible, personal information is stored and processed within Australia.
                </p>
                <p>
                  If personal information is disclosed overseas, we take reasonable steps to ensure appropriate data protection safeguards are in place.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">8. Access & Correction</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  You may request access to, or correction of, personal information we hold about you by contacting us using the details below.
                </p>
                <p>
                  We will respond to requests within a reasonable timeframe.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">9. Cookies & Website Analytics</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  Our website may use cookies and analytics tools to collect non-identifying information about how visitors use our site. This helps us improve functionality and user experience.
                </p>
                <p>
                  You may disable cookies through your browser settings if you prefer.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">10. Complaints</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  If you believe we have breached your privacy or mishandled personal information, please contact us. We will investigate and respond promptly.
                </p>
                <p>
                  If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC).
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#e2e8f0] mb-6">11. Contact Us</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  For privacy enquiries or requests, please contact:
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
              <h3 className="text-[#e2e8f0] mb-6">12. Changes to This Policy</h3>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time. The most current version will always be published on our website.
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
