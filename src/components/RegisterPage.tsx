import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, ArrowRight, Building2, User, CreditCard, FileCheck, Search, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import logoImage from 'figma:asset/35f931b802bf39733103d00f96fb6f9c21293f6e.png';

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [abn, setAbn] = useState('');
  const [isLoadingABN, setIsLoadingABN] = useState(false);
  const [csoNotSure, setCsoNotSure] = useState(false);
  const [soNotSure, setSoNotSure] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Company Info & ABN
    companyName: '',
    abn: '',
    companySize: '',
    industry: '',
    // Step 2: Contact Details
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    // Step 3: Defence & DISP Info
    defenceIndustry: '',
    dispMember: '',
    governmentPanels: '',
    nominatedCSO: '',
    nominatedSO: '',
    // Step 4: Plan Selection
    plan: 'professional',
    // Step 5: Admin Account
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });
  
  // Mock ABN lookup - in production, this would call the actual ABN Lookup API
  const handleABNLookup = async () => {
    if (abn.length === 11) {
      setIsLoadingABN(true);
      setTimeout(() => {
        updateFormData('companyName', 'Example Defence Solutions Pty Ltd');
        setIsLoadingABN(false);
      }, 500);
    }
  };
  
  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };
  
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show thank you message
    setShowThankYou(true);
  };

  const handleContinueToDashboard = () => {
    // Navigate to dashboard after registration
    navigate('/dashboard');
  };
  
  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-[#1a1d23] flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#3dd68c]/5 blur-3xl"></div>
        
        <div className="w-full max-w-2xl relative z-10">
          <div className="bg-[#2a2f38] border border-[#3dd68c] clip-corner p-8 lg:p-12 text-center">
            <div className="w-20 h-20 bg-[#3dd68c]/10 clip-corner mx-auto mb-6 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#3dd68c]" />
            </div>
            
            <h2 className="text-[#e2e8f0] mb-4">Thank You for Your Registration</h2>
            
            <p className="text-[#94a3b8] text-lg mb-8 max-w-[600px] mx-auto">
              A Fourtify Defence specialist will be in contact shortly to discuss your needs and schedule a platform demonstration or onboarding session.
            </p>
            
            <p className="text-[#3dd68c] mb-8">
              We appreciate the opportunity to support your organisation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={handleContinueToDashboard}>
                Continue to Dashboard
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#1a1d23] py-12 px-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#3dd68c]/5 blur-3xl"></div>
      
      <div className="w-full max-w-3xl mx-auto relative z-10">
        {/* Back to home */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-[#3dd68c] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 overflow-x-auto pb-2">
            {[
              { num: 1, label: 'Company & ABN', icon: Building2 },
              { num: 2, label: 'Contact Details', icon: User },
              { num: 3, label: 'DISP & Defence', icon: FileCheck },
              { num: 4, label: 'Choose Plan', icon: CreditCard },
              { num: 5, label: 'Create Account', icon: Shield }
            ].map((stepItem, index) => (
              <div key={stepItem.num} className="flex items-center min-w-fit">
                <div className={`flex items-center gap-2 ${step >= stepItem.num ? 'text-[#3dd68c]' : 'text-[#64748b]'}`}>
                  <div className={`w-10 h-10 clip-corner-sm flex items-center justify-center flex-shrink-0 ${ 
                    step >= stepItem.num ? 'bg-[#3dd68c] text-[#0f1419]' : 'bg-[#2a2f38] text-[#64748b]'
                  }`}>
                    <stepItem.icon className="w-5 h-5" />
                  </div>
                  <div className="hidden md:block">
                    <div className="text-xs text-[#64748b] whitespace-nowrap">Step {stepItem.num}</div>
                    <div className={`text-sm whitespace-nowrap ${step >= stepItem.num ? 'text-[#e2e8f0]' : 'text-[#64748b]'}`}>{stepItem.label}</div>
                  </div>
                </div>
                {index < 4 && (
                  <div className={`w-8 md:w-16 h-px mx-2 ${step > stepItem.num ? 'bg-[#3dd68c]' : 'bg-[#2a2f38]'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Registration Card */}
        <div className="bg-[#2a2f38] border border-[#3a3f48] clip-corner p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <img src={logoImage} alt="Fourtify" className="h-12 mx-auto mb-4" />
            <h3 className="text-[#e2e8f0] mb-2">
              {step <= 3 ? 'Qualification Questionnaire' : step === 4 ? 'Choose Your Plan' : 'Create Your Account'}
            </h3>
            <p className="text-[#94a3b8]">
              {step <= 3 ? 'Help us understand your organisation' : step === 4 ? 'Select the plan that fits your needs' : 'Set up your admin account'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Company Info & ABN */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="text-[#e2e8f0] mb-2 block">
                    Australian Business Number (ABN) <span className="text-[#3dd68c]">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={abn}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                        setAbn(value);
                      }}
                      className="flex-1 bg-[#1a1d23] border border-[#3a3f48] px-4 py-3 text-[#e2e8f0] focus:outline-none focus:border-[#3dd68c] transition-colors clip-corner-sm"
                      placeholder="Enter 11-digit ABN"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleABNLookup}
                      disabled={abn.length !== 11 || isLoadingABN}
                      className="px-6 py-3 bg-[#3dd68c] text-[#0f1419] clip-corner-sm hover:bg-[#2ab872] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      {isLoadingABN ? 'Looking up...' : 'Lookup'}
                    </button>
                  </div>
                  <p className="text-sm text-[#94a3b8] mt-1">Format: 12345678901 (11 digits)</p>
                </div>
                
                <Input 
                  label="Company Name"
                  placeholder="Auto-filled from ABN lookup or enter manually"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  required
                />
                
                <div>
                  <label className="text-[#e2e8f0] mb-2 block">
                    Company Size <span className="text-[#3dd68c]">*</span>
                  </label>
                  <select 
                    value={formData.companySize}
                    onChange={(e) => updateFormData('companySize', e.target.value)}
                    required
                    className="w-full bg-[#1a1d23] border border-[#3a3f48] px-4 py-3 text-[#e2e8f0] focus:outline-none focus:border-[#3dd68c] transition-colors clip-corner-sm"
                  >
                    <option value="">Select company size</option>
                    <option value="1-25">1-25 employees</option>
                    <option value="26-100">26-100 employees</option>
                    <option value="101-500">101-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#e2e8f0] mb-2 block">
                    Industry Sector <span className="text-[#3dd68c]">*</span>
                  </label>
                  <select 
                    value={formData.industry}
                    onChange={(e) => updateFormData('industry', e.target.value)}
                    required
                    className="w-full bg-[#1a1d23] border border-[#3a3f48] px-4 py-3 text-[#e2e8f0] focus:outline-none focus:border-[#3dd68c] transition-colors clip-corner-sm"
                  >
                    <option value="">Select industry</option>
                    <option value="aerospace">Aerospace & Aviation</option>
                    <option value="maritime">Maritime Defence</option>
                    <option value="land">Land Systems</option>
                    <option value="electronics">Electronics & Communications</option>
                    <option value="cyber">Cybersecurity Services</option>
                    <option value="consulting">Defence Consulting</option>
                  </select>
                </div>
                
                <Button type="button" variant="primary" size="lg" className="w-full" onClick={handleNext}>
                  Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
            
            {/* Step 2: Contact Details */}
            {step === 2 && (
              <div className="space-y-6">
                <Input 
                  label="Point of Contact Name"
                  placeholder="John Smith"
                  value={formData.contactName}
                  onChange={(e) => updateFormData('contactName', e.target.value)}
                  required
                />
                
                <Input 
                  label="Contact Email"
                  type="email"
                  placeholder="john.smith@company.com.au"
                  value={formData.contactEmail}
                  onChange={(e) => updateFormData('contactEmail', e.target.value)}
                  required
                />
                
                <Input 
                  label="Contact Phone"
                  type="tel"
                  placeholder="+61 400 000 000"
                  value={formData.contactPhone}
                  onChange={(e) => updateFormData('contactPhone', e.target.value)}
                  required
                />
                
                <div className="flex gap-4">
                  <Button type="button" variant="secondary" size="lg" onClick={handleBack} className="flex-1">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  <Button type="button" variant="primary" size="lg" onClick={handleNext} className="flex-1">
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Defence & DISP Info */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="text-[#e2e8f0] mb-2 block">
                    Defence Industry Involvement <span className="text-[#3dd68c]">*</span>
                  </label>
                  <textarea
                    value={formData.defenceIndustry}
                    onChange={(e) => updateFormData('defenceIndustry', e.target.value)}
                    rows={4}
                    required
                    className="w-full bg-[#1a1d23] border border-[#3a3f48] px-4 py-3 text-[#e2e8f0] focus:outline-none focus:border-[#3dd68c] transition-colors clip-corner-sm resize-none"
                    placeholder="Describe your organisation's involvement in the Defence Industry (e.g., We provide cybersecurity services to defence contractors...)"
                  ></textarea>
                  <p className="text-sm text-[#94a3b8] mt-1">AI-powered classification coming soon</p>
                </div>
                
                <div>
                  <label className="text-[#e2e8f0] mb-2 block">
                    Are you currently a DISP member? <span className="text-[#3dd68c]">*</span>
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dispMember"
                        value="yes"
                        checked={formData.dispMember === 'yes'}
                        onChange={(e) => updateFormData('dispMember', e.target.value)}
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
                        checked={formData.dispMember === 'no'}
                        onChange={(e) => updateFormData('dispMember', e.target.value)}
                        className="w-4 h-4 accent-[#3dd68c]"
                        required
                      />
                      <span className="text-[#94a3b8]">No</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="text-[#e2e8f0] mb-2 block">
                    Are you on any government panels?
                  </label>
                  <textarea
                    value={formData.governmentPanels}
                    onChange={(e) => updateFormData('governmentPanels', e.target.value)}
                    rows={3}
                    className="w-full bg-[#1a1d23] border border-[#3a3f48] px-4 py-3 text-[#e2e8f0] focus:outline-none focus:border-[#3dd68c] transition-colors clip-corner-sm resize-none"
                    placeholder="List any government panels or type 'None'"
                  ></textarea>
                </div>
                
                <div>
                  <label className="text-[#e2e8f0] mb-2 block">
                    Nominated Chief Security Officer (CSO)
                  </label>
                  <input
                    type="text"
                    value={formData.nominatedCSO}
                    onChange={(e) => updateFormData('nominatedCSO', e.target.value)}
                    disabled={csoNotSure}
                    className="w-full bg-[#1a1d23] border border-[#3a3f48] px-4 py-3 text-[#e2e8f0] focus:outline-none focus:border-[#3dd68c] transition-colors clip-corner-sm disabled:opacity-50"
                    placeholder="Full name of CSO"
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={csoNotSure}
                      onChange={(e) => setCsoNotSure(e.target.checked)}
                      className="w-4 h-4 accent-[#3dd68c]"
                    />
                    <span className="text-[#94a3b8]">Not sure / Not yet appointed</span>
                  </label>
                </div>
                
                <div>
                  <label className="text-[#e2e8f0] mb-2 block">
                    Nominated Security Officer (SO)
                  </label>
                  <input
                    type="text"
                    value={formData.nominatedSO}
                    onChange={(e) => updateFormData('nominatedSO', e.target.value)}
                    disabled={soNotSure}
                    className="w-full bg-[#1a1d23] border border-[#3a3f48] px-4 py-3 text-[#e2e8f0] focus:outline-none focus:border-[#3dd68c] transition-colors clip-corner-sm disabled:opacity-50"
                    placeholder="Full name of SO"
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={soNotSure}
                      onChange={(e) => setSoNotSure(e.target.checked)}
                      className="w-4 h-4 accent-[#3dd68c]"
                    />
                    <span className="text-[#94a3b8]">Not sure / Not yet appointed</span>
                  </label>
                </div>
                
                <div className="flex gap-4">
                  <Button type="button" variant="secondary" size="lg" onClick={handleBack} className="flex-1">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  <Button type="button" variant="primary" size="lg" onClick={handleNext} className="flex-1">
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 4: Choose Plan */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      id: 'professional',
                      name: 'Fourtify Professional',
                      price: '$25,000/year',
                      features: ['Up to 100 personnel', 'All DISP modules', '100GB storage', 'Priority support', 'Dedicated account manager'],
                      recommended: true
                    },
                    {
                      id: 'enterprise',
                      name: 'SME Custom',
                      price: 'Custom pricing',
                      features: ['Unlimited personnel', 'All features + custom modules', 'Unlimited storage', '24/7 support', 'Custom workflows']
                    }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => updateFormData('plan', plan.id)}
                      className={`p-6 border-2 clip-corner cursor-pointer transition-all ${
                        formData.plan === plan.id 
                          ? 'border-[#3dd68c] bg-[#3dd68c]/5' 
                          : 'border-[#3a3f48] hover:border-[#3dd68c]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[#e2e8f0]">{plan.name}</h4>
                            {plan.recommended && (
                              <span className="px-2 py-1 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny text-xs">
                                Recommended
                              </span>
                            )}
                          </div>
                          <div className="text-[#3dd68c]">{plan.price}</div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          formData.plan === plan.id ? 'border-[#3dd68c]' : 'border-[#64748b]'
                        }`}>
                          {formData.plan === plan.id && (
                            <div className="w-3 h-3 rounded-full bg-[#3dd68c]"></div>
                          )}
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="text-[#94a3b8] text-sm">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button type="button" variant="secondary" size="lg" onClick={handleBack} className="flex-1">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  <Button type="button" variant="primary" size="lg" onClick={handleNext} className="flex-1">
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 5: Admin Account */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="First Name"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    required
                  />
                  <Input 
                    label="Last Name"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    required
                  />
                </div>
                
                <Input 
                  label="Work Email"
                  type="email"
                  placeholder="john.smith@company.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  required
                />
                
                <Input 
                  label="Phone Number"
                  type="tel"
                  placeholder="+61 400 000 000"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  required
                />
                
                <Input 
                  label="Password"
                  type="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  required
                />
                
                <div className="bg-[#1a1d23] p-4 clip-corner-sm border border-[#3a3f48]">
                  <div className="flex items-start gap-3 mb-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 w-4 h-4 accent-[#3dd68c]"
                      required
                    />
                    <label htmlFor="terms" className="text-[#94a3b8] text-sm">
                      I agree to the <span className="text-[#3dd68c] cursor-pointer hover:underline">Terms of Service</span> and <span className="text-[#3dd68c] cursor-pointer hover:underline">Privacy Policy</span>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 w-4 h-4 accent-[#3dd68c]"
                      required
                    />
                    <label htmlFor="consent" className="text-[#94a3b8] text-sm">
                      I consent to Fourtify Defence processing this information and contacting me. I understand my data will be handled in accordance with the Privacy Policy.
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button type="button" variant="secondary" size="lg" onClick={handleBack} className="flex-1">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1">
                    Create Account
                  </Button>
                </div>
              </div>
            )}
          </form>
          
          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-[#94a3b8]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#3dd68c] hover:text-[#2ab872] transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}