import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import bgImage from 'figma:asset/2135485e1d21f7ff57b035a705371c25d20cb5d2.png';

export function ContactPage() {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  if (showThankYou) {
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
            <div className="max-w-[800px] mx-auto">
              <div className="bg-[#0f1419] p-8 lg:p-12 clip-corner border border-[#3dd68c] text-center">
                <div className="w-20 h-20 bg-[#3dd68c]/10 clip-corner mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-[#3dd68c]" />
                </div>
                
                <h2 className="text-[#e2e8f0] mb-4">Thank You for Your Enquiry</h2>
                
                <p className="text-[#94a3b8] text-lg mb-8 max-w-[600px] mx-auto">
                  A Fourtify Defence specialist will be in contact shortly to discuss your needs and schedule a platform demonstration or onboarding session.
                </p>
                
                <p className="text-[#3dd68c] mb-8">
                  We appreciate the opportunity to support your organisation.
                </p>
                
                <Link to="/">
                  <Button variant="primary" size="lg">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <Footer />
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
            <Link to="/" className="inline-flex items-center gap-2 text-[#3dd68c] hover:text-[#2ab872] mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Contact Info */}
              <div>
                <h2 className="text-[#e2e8f0] mb-4">Get in Touch</h2>
                <p className="text-[#94a3b8] mb-8">
                  Tell us about your organization's DISP compliance needs and we'll create a tailored solution for you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#3dd68c]" />
                    </div>
                    <div>
                      <h5 className="text-[#e2e8f0] mb-1">Email</h5>
                      <p className="text-[#94a3b8]">dani@fourd.com.au</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#3dd68c]" />
                    </div>
                    <div>
                      <h5 className="text-[#e2e8f0] mb-1">Phone</h5>
                      <p className="text-[#94a3b8]">+61 419 352 820</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#3dd68c]" />
                    </div>
                    <div>
                      <h5 className="text-[#e2e8f0] mb-1">Location</h5>
                      <p className="text-[#94a3b8]">301/21 University Ave<br />Canberra ACT 2601</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 p-6 bg-[#2a2f38] clip-corner border border-[#3a3f48]">
                  <h5 className="text-[#e2e8f0] mb-3">Why Choose SME Custom?</h5>
                  <ul className="space-y-2 text-[#94a3b8]">
                    <li>• Tailored to your organization size</li>
                    <li>• Flexible module selection</li>
                    <li>• Scalable pricing model</li>
                    <li>• Dedicated implementation support</li>
                  </ul>
                </div>
              </div>
              
              {/* Right Column - Contact Form */}
              <div className="bg-[#0f1419] p-8 lg:p-10 clip-corner border border-[#2a2f38]">
                <h3 className="text-[#e2e8f0] mb-2">Contact Us</h3>
                <p className="text-[#94a3b8] mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
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
                    <label className="block text-[#e2e8f0] mb-2">Company Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                      required
                    />
                  </div>
                  
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
                  
                  <div>
                    <label className="block text-[#e2e8f0] mb-2">Number of Employees</label>
                    <select className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors">
                      <option>Select range</option>
                      <option>1-10</option>
                      <option>11-50</option>
                      <option>51-100</option>
                      <option>100+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[#e2e8f0] mb-2">Your Requirements *</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors resize-none"
                      placeholder="Tell us about your DISP compliance needs, timeline, and any specific requirements..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 w-4 h-4 accent-[#3dd68c]"
                      required
                    />
                    <label htmlFor="consent" className="text-[#94a3b8]">
                      I agree to Fourtify Defence contacting me about their products and services. I understand my data will be handled in accordance with their Privacy Policy.
                    </label>
                  </div>
                  
                  <Button variant="primary" size="lg" className="w-full">
                    Submit Inquiry
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}