import { Header } from './Header';
import { Footer } from './Footer';
import { Shield, Users, Target, Award, Briefcase, Lock, Cpu, FileCheck } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="min-h-screen bg-[#080d1a]">
      <Header />
      
      <main className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f1824]/80 backdrop-blur-sm border border-[#3dd68c]/40 clip-corner-sm mb-6">
              <Shield className="w-4 h-4 text-[#3dd68c]" />
              <span className="text-[#3dd68c]">Australian Veteran-Owned</span>
            </div>
            
            <h1 className="text-[#e2e8f0] mb-6 text-3xl lg:text-4xl">About Fourtify Defence</h1>
            <p className="text-[#94a3b8] max-w-3xl mx-auto">
              Strengthening Australia's Defence industrial base through sovereign, secure, and intelligent software solutions.
            </p>
          </div>

          {/* Our Mission Section */}
          <section className="mb-20">
            <div className="bg-[#0f1419] border border-[#2a2f38] p-8 lg:p-12 clip-corner">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#3dd68c]" />
                </div>
                <div>
                  <h2 className="text-[#e2e8f0] mb-4">Our Mission</h2>
                  <p className="text-[#94a3b8] leading-relaxed">
                    To strengthen Australia's Defence industrial base by delivering sovereign, secure, and intelligent software that simplifies compliance, builds resilience, and empowers organisations to confidently participate in Defence programs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Who We Are Section */}
          <section className="mb-20">
            <div className="mb-12">
              <h2 className="text-[#e2e8f0] mb-6">Who We Are</h2>
              <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                <p>
                  Fourtify Defence Pty Ltd is an Australian Veteran-owned Defence technology company specialising in DISP compliance automation and Defence-grade ICT solutions.
                </p>
                <p>
                  Founded in Canberra — the heart of Australia's Defence ecosystem — we combine decades of operational, security, ICT and Defence industry experience to deliver tools that support national resilience and industry readiness.
                </p>
                <p>
                  We are proud to be a sovereign company supporting Defence priorities outlined in the Defence Strategic Review, AUKUS capability pathways, and Australia's push for resilient and secure industry partners.
                </p>
              </div>
            </div>

            {/* Expertise Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Defence Security & DISP Membership'
                },
                {
                  icon: Lock,
                  title: 'Cyber Security Uplift and ICT Architecture'
                },
                {
                  icon: Briefcase,
                  title: 'Defence Acquisition and Sustainment'
                },
                {
                  icon: FileCheck,
                  title: 'Regulatory Compliance'
                },
                {
                  icon: Award,
                  title: 'Risk, Quality and Safety Management'
                },
                {
                  icon: Cpu,
                  title: 'Software Design and Development'
                },
                {
                  icon: Target,
                  title: 'Capability Lifecycle Management (CLC)'
                },
                {
                  icon: Users,
                  title: 'Operational Excellence'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-[#2a2f38] p-6 clip-corner border border-[#3a3f48] hover:border-[#3dd68c]/50 transition-all"
                >
                  <div className="w-12 h-12 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-[#3dd68c]" />
                  </div>
                  <p className="text-[#e2e8f0]">{item.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Leadership Expertise Section */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-[#0f1419] to-[#1a1d23] border border-[#2a2f38] p-8 lg:p-12 clip-corner">
              <h3 className="text-[#e2e8f0] mb-6">Our Leadership Team Brings Deep Expertise Across:</h3>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                {[
                  'Defence security & DISP membership',
                  'Cyber security uplift and ICT architecture',
                  'Defence acquisition and sustainment',
                  'Regulatory compliance',
                  'Risk, quality and safety management',
                  'Software design and development',
                  'Capability lifecycle management (CLC)'
                ].map((expertise, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#3dd68c] clip-corner-sm mt-2 flex-shrink-0"></div>
                    <span className="text-[#94a3b8]">{expertise}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Commitment Section */}
          <section>
            <div className="bg-[#2a2f38] border border-[#3dd68c]/30 p-8 lg:p-12 clip-corner text-center">
              <Shield className="w-16 h-16 text-[#3dd68c] mx-auto mb-6" />
              <h3 className="text-[#e2e8f0] mb-4">Sovereign. Secure. Defence-Ready.</h3>
              <p className="text-[#94a3b8] max-w-2xl mx-auto">
                Supporting Australia's Defence priorities through the Defence Strategic Review, AUKUS capability pathways, and building a resilient, secure Defence industrial base.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
