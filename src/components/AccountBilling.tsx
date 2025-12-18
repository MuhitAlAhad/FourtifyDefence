import { Sidebar } from './Sidebar';
import { 
  CreditCard, 
  Download, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  LogOut,
  User,
  Mail,
  Building2,
  Shield
} from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AccountBilling() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'account' | 'billing'>('account');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };
  
  const billingHistory = [
    { id: 1, date: '2025-11-01', amount: '$799.00', status: 'Paid', invoice: 'INV-2025-11' },
    { id: 2, date: '2025-10-01', amount: '$799.00', status: 'Paid', invoice: 'INV-2025-10' },
    { id: 3, date: '2025-09-01', amount: '$799.00', status: 'Paid', invoice: 'INV-2025-09' },
    { id: 4, date: '2025-08-01', amount: '$799.00', status: 'Paid', invoice: 'INV-2025-08' }
  ];
  
  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-[#0f1419] border-b border-[#2a2f38] px-8 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#e2e8f0]">Account & Billing</h3>
              <p className="text-[#64748b]">Manage your account settings and subscription</p>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-[#2a2f38]">
            <button
              onClick={() => setActiveTab('account')}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === 'account'
                  ? 'border-[#3dd68c] text-[#3dd68c]'
                  : 'border-transparent text-[#94a3b8] hover:text-[#e2e8f0]'
              }`}
            >
              Account Settings
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === 'billing'
                  ? 'border-[#3dd68c] text-[#3dd68c]'
                  : 'border-transparent text-[#94a3b8] hover:text-[#e2e8f0]'
              }`}
            >
              Billing & Plans
            </button>
          </div>
          
          {/* Account Settings Tab */}
          {activeTab === 'account' && (
            <div className="max-w-3xl space-y-8">
              {/* Company Information */}
              <div className="bg-[#2a2f38] border border-[#3a3f48] clip-corner p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-6 h-6 text-[#3dd68c]" />
                  <h4 className="text-[#e2e8f0]">Company Information</h4>
                </div>
                
                <div className="space-y-4">
                  <Input 
                    label="Company Name"
                    value="Acme Defence Systems Ltd"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#e2e8f0] mb-2 block">Company Size</label>
                      <div className="bg-[#1a1d23] border border-[#3a3f48] px-4 py-3 text-[#94a3b8] clip-corner-sm">
                        26-100 employees
                      </div>
                    </div>
                    <div>
                      <label className="text-[#e2e8f0] mb-2 block">Industry</label>
                      <div className="bg-[#1a1d23] border border-[#3a3f48] px-4 py-3 text-[#94a3b8] clip-corner-sm">
                        Aerospace & Aviation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Personal Information */}
              <div className="bg-[#2a2f38] border border-[#3a3f48] clip-corner p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-[#3dd68c]" />
                  <h4 className="text-[#e2e8f0]">Personal Information</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="First Name"
                      value="John"
                    />
                    <Input 
                      label="Last Name"
                      value="Smith"
                    />
                  </div>
                  <Input 
                    label="Email Address"
                    type="email"
                    value="john.smith@acmedefence.com"
                  />
                  <Input 
                    label="Phone Number"
                    type="tel"
                    value="+44 20 1234 5678"
                  />
                  
                  <div className="flex justify-end pt-4">
                    <Button variant="primary">Save Changes</Button>
                  </div>
                </div>
              </div>
              
              {/* Security */}
              <div className="bg-[#2a2f38] border border-[#3a3f48] clip-corner p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-[#3dd68c]" />
                  <h4 className="text-[#e2e8f0]">Security</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#1a1d23] clip-corner-sm">
                    <div>
                      <div className="text-[#e2e8f0] mb-1">Password</div>
                      <div className="text-[#64748b]">Last changed 45 days ago</div>
                    </div>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-[#1a1d23] clip-corner-sm">
                    <div>
                      <div className="text-[#e2e8f0] mb-1">Two-Factor Authentication</div>
                      <div className="text-[#64748b]">Add an extra layer of security</div>
                    </div>
                    <Button variant="outline" size="sm">Enable 2FA</Button>
                  </div>
                </div>
              </div>
              
              {/* Danger Zone */}
              <div className="bg-[#2a2f38] border-2 border-[#ef4444]/30 clip-corner p-6">
                <h4 className="text-[#ef4444] mb-4">Danger Zone</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#e2e8f0] mb-1">Log Out</div>
                    <div className="text-[#64748b]">Sign out of your account</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white">
                    <LogOut className="w-4 h-4 mr-2" /> Log Out
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="max-w-4xl space-y-8">
              {/* Current Plan */}
              <div className="bg-[#2a2f38] border border-[#3dd68c] clip-corner p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-[#e2e8f0]">Professional Plan</h4>
                      <span className="px-3 py-1 bg-[#3dd68c] text-[#0f1419] clip-corner-tiny text-xs">
                        Active
                      </span>
                    </div>
                    <div className="text-3xl text-[#3dd68c] mb-2">$799<span className="text-lg text-[#94a3b8]">/month</span></div>
                    <p className="text-[#94a3b8]">Up to 100 personnel • All DISP modules • 50GB storage</p>
                  </div>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-[#3a3f48]">
                  <div>
                    <div className="flex items-center gap-2 text-[#64748b] mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Next Billing Date</span>
                    </div>
                    <div className="text-[#e2e8f0]">December 1, 2025</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[#64748b] mb-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Payment Method</span>
                    </div>
                    <div className="text-[#e2e8f0]">•••• •••• •••• 4242</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[#64748b] mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Status</span>
                    </div>
                    <div className="text-[#3dd68c]">Active & Current</div>
                  </div>
                </div>
              </div>
              
              {/* Plan Comparison */}
              <div>
                <h4 className="text-[#e2e8f0] mb-6">Available Plans</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Starter',
                      price: '$299',
                      features: ['Up to 25 personnel', 'Core DISP modules', '10GB storage', 'Email support']
                    },
                    {
                      name: 'Professional',
                      price: '$799',
                      current: true,
                      features: ['Up to 100 personnel', 'All DISP modules', '50GB storage', 'Priority support', 'API access']
                    },
                    {
                      name: 'Enterprise',
                      price: 'Custom',
                      features: ['Unlimited personnel', 'All features', 'Unlimited storage', 'Dedicated manager', 'SLA guarantees']
                    }
                  ].map((plan) => (
                    <div 
                      key={plan.name}
                      className={`bg-[#2a2f38] p-6 clip-corner border ${
                        plan.current ? 'border-[#3dd68c]' : 'border-[#3a3f48]'
                      }`}
                    >
                      <h5 className="text-[#e2e8f0] mb-2">{plan.name}</h5>
                      <div className="text-3xl text-[#3dd68c] mb-4">
                        {plan.price}
                        {plan.price !== 'Custom' && <span className="text-sm text-[#94a3b8]">/mo</span>}
                      </div>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#3dd68c] flex-shrink-0 mt-0.5" />
                            <span className="text-[#94a3b8] text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {plan.current ? (
                        <Button variant="secondary" size="sm" className="w-full" disabled>
                          Current Plan
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="w-full">
                          {plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-[#2a2f38] border border-[#3a3f48] clip-corner p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-[#3dd68c]" />
                    <h4 className="text-[#e2e8f0]">Payment Method</h4>
                  </div>
                  <Button variant="outline" size="sm">Update Card</Button>
                </div>
                
                <div className="bg-[#1a1d23] p-6 clip-corner-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-[#3dd68c] clip-corner-tiny flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-[#0f1419]" />
                      </div>
                      <div>
                        <div className="text-[#e2e8f0]">Visa ending in 4242</div>
                        <div className="text-[#64748b] text-sm">Expires 12/2026</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#3dd68c]/20 text-[#3dd68c] clip-corner-tiny text-xs">
                      Default
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Billing History */}
              <div className="bg-[#2a2f38] border border-[#3a3f48] clip-corner p-6">
                <h4 className="text-[#e2e8f0] mb-6">Billing History</h4>
                
                <div className="space-y-3">
                  {billingHistory.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-[#1a1d23] clip-corner-sm hover:bg-[#1a1d23]/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-[#3dd68c]" />
                        </div>
                        <div>
                          <div className="text-[#e2e8f0] mb-1">{transaction.invoice}</div>
                          <div className="text-[#64748b] text-sm">{transaction.date}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-[#e2e8f0]">{transaction.amount}</div>
                          <div className="text-[#3dd68c] text-sm">{transaction.status}</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
