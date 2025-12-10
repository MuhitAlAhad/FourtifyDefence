import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { Shield, Users, Lock, Building2, FileText, BarChart3, CheckCircle2, ArrowRight, ChevronRight, FileCheck, Database } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import bgImage from 'figma:asset/2135485e1d21f7ff57b035a705371c25d20cb5d2.png';

export function HomePage() {
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
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12 relative overflow-hidden">
          {/* Diagonal accent with cyan hint */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-[#3dd68c]/5 via-[#22d3ee]/3 to-transparent transform skew-x-12 translate-x-1/4"></div>
          
          <div className="max-w-[1440px] mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f1824]/80 backdrop-blur-sm border border-[#3dd68c]/40 clip-corner-sm mb-6">
                  <Shield className="w-4 h-4 text-[#3dd68c]" />
                  <span className="text-[#3dd68c]">DISP Compliant CRM</span>
                </div>
                
                <h1 className="text-[#e2e8f0] mb-6 text-3xl lg:text-4xl leading-tight">
                  DISP READY. SOVEREIGN. SECURE.
                </h1>
                
                <p className="text-[#94a3b8] mb-4">
                  Australian-owned, security-cleared Fourtify Defence provides sovereign software solutions that automate and simplify Defence Industry Security Program (DISP) compliance. Governance, risk, cyber, people vetting, facilities, documentation, and evidence gathering are automated by our platform. Your company can prioritize capabilities above bureaucracy.
                </p>
                
                <p className="text-[#94a3b8] mb-4">
                  Fourtify Defence provides a safe, dependable, and scalable environment for managing sensitive information at Defence-grade responsibilities with an Australian workforce and a commitment to assisting Defence-ready SMEs.
                </p>
                
                <p className="text-[#94a3b8] mb-8">
                  Fourtify provides clarity, assurance, and control for DISP membership and Defence contract compliance. <span className="text-[#3dd68c]">Total compliance.</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Watch Demo
                  </Button>
                </div>
                
                <div className="flex items-center gap-6 mt-8 text-sm">
                  <div className="flex items-center gap-2 text-[#94a3b8]">
                    <CheckCircle2 className="w-5 h-5 text-[#3dd68c]" />
                    <span>Australian Sovereign Solution</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#94a3b8]">
                    <CheckCircle2 className="w-5 h-5 text-[#3dd68c]" />
                    <span>Defence-Grade Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 px-6 lg:px-12 bg-[#0a0f1a]/95">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[#e2e8f0] mb-4">DISP IN A BOX. TOTAL COMPLIANCE</h2>
              <p className="text-[#94a3b8] max-w-2xl mx-auto">
                Everything you need to achieve and maintain DISP certification for your defence contracts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Governance Framework',
                  description: 'Manage policies, procedures, and organizational structure with automated compliance tracking.'
                },
                {
                  icon: Users,
                  title: 'Personnel Security',
                  description: 'Track security clearances, background checks, and training certifications in real-time.'
                },
                {
                  icon: Lock,
                  title: 'Cyber Security Controls',
                  description: 'Monitor cyber defenses, vulnerability assessments, and incident response protocols.'
                },
                {
                  icon: Building2,
                  title: 'Physical Security',
                  description: 'Manage facility access, surveillance systems, and physical asset protection measures.'
                },
                {
                  icon: FileText,
                  title: 'Document Management',
                  description: 'Centralized, encrypted storage for all compliance documentation with version control.'
                },
                {
                  icon: BarChart3,
                  title: 'Compliance Reporting',
                  description: 'Generate audit-ready reports with one click. Export to PDF or share securely with auditors.'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-[#2a2f38] p-6 clip-corner border border-[#3a3f48] hover:border-[#3dd68c]/50 transition-all group"
                >
                  <div className="w-12 h-12 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center mb-4 group-hover:bg-[#3dd68c]/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-[#3dd68c]" />
                  </div>
                  <h4 className="text-[#e2e8f0] mb-3">{feature.title}</h4>
                  <p className="text-[#94a3b8]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[#e2e8f0] mb-4">How It Works</h2>
              <p className="text-[#94a3b8] max-w-2xl mx-auto">
                Get DISP compliant in four simple steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Initial Assessment',
                  description: 'Complete our guided questionnaire to establish your current compliance baseline.'
                },
                {
                  step: '02',
                  title: 'Build Your Framework',
                  description: 'Set up governance structure, assign roles, and configure security policies.'
                },
                {
                  step: '03',
                  title: 'Implement Controls',
                  description: 'Deploy personnel, cyber, and physical security measures with our task management system.'
                },
                {
                  step: '04',
                  title: 'Maintain & Report',
                  description: 'Continuously monitor compliance and generate audit reports with automated alerts.'
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-[#3dd68c] to-transparent"></div>
                  )}
                  <div className="bg-[#0f1419] border border-[#2a2f38] p-6 clip-corner">
                    <div className="text-5xl text-[#3dd68c]/20 mb-4">{item.step}</div>
                    <h4 className="text-[#e2e8f0] mb-3">{item.title}</h4>
                    <p className="text-[#94a3b8]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Industries Section */}
        <section id="industries" className="py-20 px-6 lg:px-12 bg-[#0f1419]">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[#e2e8f0] mb-4">Trusted by Defence Contractors</h2>
              <p className="text-[#94a3b8] max-w-2xl mx-auto">
                Serving companies across the defence supply chain
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Aerospace & Aviation',
                'Maritime Defence',
                'Land Systems',
                'Electronics & Communications',
                'Cybersecurity Services',
                'Defence Consulting'
              ].map((industry, index) => (
                <div 
                  key={index}
                  className="bg-[#2a2f38] p-6 clip-corner-sm border border-[#3a3f48] hover:border-[#3dd68c] transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#e2e8f0]">{industry}</span>
                    <ChevronRight className="w-5 h-5 text-[#3dd68c] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[#e2e8f0] mb-4">Simple, Transparent Pricing</h2>
              <p className="text-[#94a3b8] max-w-2xl mx-auto">
                Choose the plan that fits your organization's size and needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: 'Fourtify Professional',
                  price: '$25,000',
                  period: '/year',
                  description: 'Complete DISP compliance solution for growing organizations',
                  features: [
                    'Up to 100 personnel',
                    'All DISP modules included',
                    'Document storage (100GB)',
                    'Priority support',
                    'Advanced reporting & analytics',
                    'Custom workflows',
                    'API access',
                    'Dedicated account manager'
                  ],
                  highlighted: true
                },
                {
                  name: 'SME Custom',
                  price: 'Custom',
                  period: '',
                  description: 'Tailored solutions for small and medium enterprises',
                  features: [
                    'Customized user capacity',
                    'Flexible DISP modules',
                    'Scalable document storage',
                    'Email & phone support',
                    'Standard reporting',
                    'Deployment options'
                  ]
                }
              ].map((plan, index) => (
                <div 
                  key={index}
                  className={`bg-[#2a2f38] p-8 clip-corner border relative transition-all duration-300 cursor-pointer ${
                    plan.highlighted 
                      ? 'border-[#3dd68c] hover:border-[#3dd68c] hover:shadow-[0_0_30px_rgba(61,214,140,0.2)]' 
                      : 'border-[#3a3f48] hover:border-[#3dd68c]/60 hover:shadow-[0_0_20px_rgba(61,214,140,0.1)]'
                  }`}
                >
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[#e2e8f0]">{plan.name}</h4>
                      {plan.highlighted && (
                        <span className="px-3 py-1 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny text-sm">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-4xl text-[#3dd68c]">{plan.price}</span>
                      <span className="text-[#94a3b8]">{plan.period}</span>
                    </div>
                    <p className="text-[#94a3b8]">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3dd68c] flex-shrink-0 mt-0.5" />
                        <span className="text-[#e2e8f0]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to={plan.name === 'SME Custom' ? '/contact' : '/qualify'} className="flex-1">
                      <Button 
                        variant={plan.highlighted ? 'primary' : 'outline'} 
                        size="lg"
                        className="w-full"
                      >
                        {plan.name === 'SME Custom' ? 'Get Started' : 'Subscribe Now'}
                      </Button>
                    </Link>
                    <Link to="/register" className="flex-1">
                      <Button 
                        variant="secondary" 
                        size="lg"
                        className="w-full"
                      >
                        Get Demo
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Security Trust Section */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[#e2e8f0] mb-4">Enterprise-Grade Security</h2>
              <p className="text-[#94a3b8] max-w-2xl mx-auto">
                Your data is protected by military-grade security standards
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Lock,
                  title: 'AES-256 Encryption',
                  description: 'End-to-end encryption for all data in transit and at rest'
                },
                {
                  icon: Shield,
                  title: 'ISO 27001 Certified',
                  description: 'International standard for information security management'
                },
                {
                  icon: FileCheck,
                  title: 'SOC 2 Type II',
                  description: 'Audited security, availability, and confidentiality controls'
                },
                {
                  icon: Database,
                  title: 'Secure Cloud Infrastructure',
                  description: 'Hosted on government-approved cloud providers with redundancy'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-[#3dd68c]" />
                  </div>
                  <h5 className="text-[#e2e8f0] mb-2">{item.title}</h5>
                  <p className="text-[#94a3b8]">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1667372283496-893f0b1e7c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cmUlMjBkYXRhJTIwY2VudGVyfGVufDF8fHx8MTc2NDUxODM1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Secure data center"
                className="w-full max-w-4xl mx-auto rounded-lg opacity-50"
              />
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  );
}