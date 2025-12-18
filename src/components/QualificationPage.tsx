import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import bgImage from 'figma:asset/2135485e1d21f7ff57b035a705371c25d20cb5d2.png';
import { submitQualification } from '../services/questionnaire';

export function QualificationPage() {
  const navigate = useNavigate();
  const [showThankYou, setShowThankYou] = useState(false);
  const [abn, setAbn] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [csoNotSure, setCsoNotSure] = useState(false);
  const [soNotSure, setSoNotSure] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ABN lookup removed until integration is available.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const qualificationData = {
      abn,
      companyName,
      contactName: formData.get('contactName'),
      contactEmail: formData.get('contactEmail'),
      contactPhone: formData.get('contactPhone'),
      defenceIndustry: formData.get('defenceIndustry'),
      dispMember: formData.get('dispMember'),
      governmentPanels: formData.get('governmentPanels'),
      nominatedCso: csoNotSure ? undefined : formData.get('nominatedCSO'),
      nominatedSo: soNotSure ? undefined : formData.get('nominatedSO'),
      csoNotSure,
      soNotSure
    };

    try {
      await submitQualification({
        abn: String(qualificationData.abn ?? ''),
        companyName: String(qualificationData.companyName ?? ''),
        contactName: String(qualificationData.contactName ?? ''),
        contactEmail: String(qualificationData.contactEmail ?? ''),
        contactPhone: String(qualificationData.contactPhone ?? ''),
        defenceIndustry: String(qualificationData.defenceIndustry ?? ''),
        dispMember: String(qualificationData.dispMember ?? ''),
        governmentPanels: qualificationData.governmentPanels ? String(qualificationData.governmentPanels) : undefined,
        nominatedCso: qualificationData.nominatedCso ? String(qualificationData.nominatedCso) : undefined,
        nominatedSo: qualificationData.nominatedSo ? String(qualificationData.nominatedSo) : undefined,
        csoNotSure,
        soNotSure
      });
      setShowThankYou(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not submit your enquiry. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    // Navigate to subscribe page after qualification
    navigate('/subscribe');
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
                  Thank you. Someone will be in touch shortly.
                </p>
                
                <div className="flex justify-center">
                  <Link to="/">
                    <Button variant="primary" size="lg">
                      Go to Home
                    </Button>
                  </Link>
                </div>
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
          <div className="max-w-[900px] mx-auto">
            {/* Back Button */}
            <Link to="/" className="inline-flex items-center gap-2 text-[#3dd68c] hover:text-[#2ab872] mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            
            <div className="bg-[#0f1419] p-8 lg:p-10 clip-corner border border-[#2a2f38]">
              <div className="mb-8">
                <h2 className="text-[#e2e8f0] mb-2">Qualification Questionnaire</h2>
                <p className="text-[#94a3b8]">
                  Please complete this questionnaire to help us understand your organisation's needs and ensure our services are the right fit for you.
                </p>
              </div>
              
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* ABN and Company Name */}
                <div>
                  <h5 className="text-[#e2e8f0] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny flex items-center justify-center">1</span>
                    Company Information
                  </h5>
                  
                  <div className="space-y-4 pl-10">
                    <div>
                      <label className="block text-[#e2e8f0] mb-2">Australian Business Number (ABN) *</label>
                      <input
                        type="text"
                        value={abn}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                          setAbn(value);
                        }}
                        className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                        placeholder="Enter 11-digit ABN"
                        required
                      />
                      <p className="text-sm text-[#94a3b8] mt-1">Format: 12345678901 (11 digits)</p>
                    </div>
                    
                    <div>
                      <label className="block text-[#e2e8f0] mb-2">Company Name *</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                        placeholder="Auto-filled from ABN lookup or enter manually"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Point of Contact */}
                <div>
                  <h5 className="text-[#e2e8f0] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny flex items-center justify-center">2</span>
                    Point of Contact
                  </h5>
                  
                  <div className="space-y-4 pl-10">
                    <div>
                      <label className="block text-[#e2e8f0] mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="contactName"
                        className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#e2e8f0] mb-2">Email *</label>
                        <input
                          type="email"
                          name="contactEmail"
                          className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                          placeholder="john.smith@company.com.au"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[#e2e8f0] mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="contactPhone"
                          className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors"
                          placeholder="+61 400 000 000"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Defence Industry Involvement */}
                <div>
                  <h5 className="text-[#e2e8f0] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny flex items-center justify-center">3</span>
                    Defence Industry Involvement
                  </h5>
                  
                  <div className="pl-10">
                    <label className="block text-[#e2e8f0] mb-2">
                      Describe your organisation's involvement in the Defence Industry *
                    </label>
                    <textarea
                      name="defenceIndustry"
                      rows={4}
                      className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors resize-none"
                      placeholder="E.g., We provide cybersecurity services to defence contractors, manufacture electronic components for defence systems, etc."
                      required
                    ></textarea>
                    <p className="text-sm text-[#94a3b8] mt-1">
                      AI-powered industry classification coming soon - this will help us pre-populate relevant information
                    </p>
                  </div>
                </div>
                
                {/* DISP Membership */}
                <div>
                  <h5 className="text-[#e2e8f0] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny flex items-center justify-center">4</span>
                    DISP Membership Status
                  </h5>
                  
                  <div className="pl-10">
                    <label className="block text-[#e2e8f0] mb-3">
                      Are you currently a DISP member? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="dispMember"
                          value="yes"
                          className="w-4 h-4 accent-[#3dd68c]"
                          required
                        />
                        <span className="text-[#94a3b8]">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="dispMember"
                          value="no"
                          className="w-4 h-4 accent-[#3dd68c]"
                          required
                        />
                        <span className="text-[#94a3b8]">No</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Government Panels */}
                <div>
                  <h5 className="text-[#e2e8f0] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny flex items-center justify-center">5</span>
                    Government Panel Membership
                  </h5>
                  
                  <div className="pl-10">
                    <label className="block text-[#e2e8f0] mb-2">
                      Are you on any government panels?
                    </label>
                    <textarea
                      name="governmentPanels"
                      rows={3}
                      className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors resize-none"
                      placeholder="List any government panels your organisation is part of, or type 'None' if not applicable"
                    ></textarea>
                  </div>
                </div>
                
                {/* Nominated CSO */}
                <div>
                  <h5 className="text-[#e2e8f0] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny flex items-center justify-center">6</span>
                    Nominated Chief Security Officer (CSO)
                  </h5>
                  
                  <div className="space-y-3 pl-10">
                    <div>
                      <label className="block text-[#e2e8f0] mb-2">Name of nominated CSO</label>
                      <input
                        type="text"
                        name="nominatedCSO"
                        disabled={csoNotSure}
                        className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Full name of CSO"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={csoNotSure}
                        onChange={(e) => setCsoNotSure(e.target.checked)}
                        className="w-4 h-4 accent-[#3dd68c]"
                      />
                      <span className="text-[#94a3b8]">Not sure / Not yet appointed</span>
                    </label>
                  </div>
                </div>
                
                {/* Nominated SO */}
                <div>
                  <h5 className="text-[#e2e8f0] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny flex items-center justify-center">7</span>
                    Nominated Security Officer (SO)
                  </h5>
                  
                  <div className="space-y-3 pl-10">
                    <div>
                      <label className="block text-[#e2e8f0] mb-2">Name of nominated SO</label>
                      <input
                        type="text"
                        name="nominatedSO"
                        disabled={soNotSure}
                        className="w-full px-4 py-3 bg-[#1a1f2e] border border-[#2a2f38] text-[#e2e8f0] clip-corner-sm focus:outline-none focus:border-[#3dd68c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Full name of SO"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={soNotSure}
                        onChange={(e) => setSoNotSure(e.target.checked)}
                        className="w-4 h-4 accent-[#3dd68c]"
                      />
                      <span className="text-[#94a3b8]">Not sure / Not yet appointed</span>
                    </label>
                  </div>
                </div>
                
                {/* Submit */}
                <div className="pt-6 border-t border-[#2a2f38]">
                  <div className="flex items-start gap-3 mb-6">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 w-4 h-4 accent-[#3dd68c]"
                      required
                    />
                    <label htmlFor="consent" className="text-[#94a3b8]">
                      I consent to Fourtify Defence processing this information and contacting me regarding my enquiry. I understand my data will be handled in accordance with their Privacy Policy.
                    </label>
                  </div>
                  
                  <Button variant="primary" size="lg" className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Qualification'}
                  </Button>
                  {error && <div className="text-[#ef4444] text-sm mt-3">{error}</div>}
                  <p className="text-center text-sm text-[#94a3b8] mt-4">
                    All fields marked with * are required
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
