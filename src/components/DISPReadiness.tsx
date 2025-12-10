import { Sidebar } from './Sidebar';
import { 
  FileCheck, 
  Download, 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Shield,
  Users,
  Lock,
  Building2
} from 'lucide-react';
import { Button } from './Button';
import { useState } from 'react';

export function DISPReadiness() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['governance']);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };
  
  const categories = [
    {
      id: 'governance',
      name: 'Governance Framework',
      icon: Shield,
      progress: 95,
      completed: 19,
      total: 20,
      items: [
        { id: 1, title: 'Security Policy Documentation', status: 'completed' },
        { id: 2, title: 'Risk Management Framework', status: 'completed' },
        { id: 3, title: 'Security Roles & Responsibilities', status: 'completed' },
        { id: 4, title: 'Executive Oversight Structure', status: 'completed' },
        { id: 5, title: 'Third-Party Risk Management', status: 'pending' }
      ]
    },
    {
      id: 'personnel',
      name: 'Personnel Security',
      icon: Users,
      progress: 88,
      completed: 22,
      total: 25,
      items: [
        { id: 6, title: 'Security Clearance Verification', status: 'completed' },
        { id: 7, title: 'Background Check Process', status: 'completed' },
        { id: 8, title: 'Security Awareness Training', status: 'completed' },
        { id: 9, title: 'Insider Threat Program', status: 'in-progress' },
        { id: 10, title: 'Access Control Reviews', status: 'pending' }
      ]
    },
    {
      id: 'physical',
      name: 'Physical Security',
      icon: Building2,
      progress: 82,
      completed: 18,
      total: 22,
      items: [
        { id: 11, title: 'Perimeter Security Assessment', status: 'completed' },
        { id: 12, title: 'Access Control Systems', status: 'completed' },
        { id: 13, title: 'Surveillance & Monitoring', status: 'completed' },
        { id: 14, title: 'Visitor Management Protocol', status: 'in-progress' },
        { id: 15, title: 'Asset Protection Measures', status: 'pending' }
      ]
    },
    {
      id: 'cyber',
      name: 'Cyber Security',
      icon: Lock,
      progress: 79,
      completed: 27,
      total: 34,
      items: [
        { id: 16, title: 'Network Segmentation', status: 'completed' },
        { id: 17, title: 'Vulnerability Management', status: 'completed' },
        { id: 18, title: 'Incident Response Plan', status: 'completed' },
        { id: 19, title: 'Encryption Implementation', status: 'in-progress' },
        { id: 20, title: 'Security Monitoring (SIEM)', status: 'in-progress' },
        { id: 21, title: 'Patch Management Process', status: 'pending' }
      ]
    }
  ];
  
  const overallProgress = Math.round(
    categories.reduce((sum, cat) => sum + cat.progress, 0) / categories.length
  );
  
  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-[#0f1419] border-b border-[#2a2f38] px-8 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#e2e8f0]">DISP Readiness Assessment</h3>
              <p className="text-[#64748b]">Track your compliance progress across all domains</p>
            </div>
            
            <Button variant="primary" size="sm">
              <Download className="w-4 h-4 mr-2" /> Export Report
            </Button>
          </div>
        </header>
        
        {/* Content */}
        <div className="p-8">
          {/* Overall Progress */}
          <div className="bg-[#2a2f38] border border-[#3a3f48] p-8 clip-corner mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-[#e2e8f0] mb-4">Overall DISP Compliance</h4>
                <div className="flex items-baseline gap-3 mb-4">
                  <div className="text-6xl text-[#3dd68c]">{overallProgress}%</div>
                  <div className="text-[#94a3b8]">Complete</div>
                </div>
                <p className="text-[#94a3b8] mb-6">
                  You're on track to achieve DISP certification. Complete the remaining tasks to reach 100% compliance.
                </p>
                <div className="flex gap-6">
                  <div>
                    <div className="text-2xl text-[#e2e8f0]">86</div>
                    <div className="text-[#64748b]">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl text-[#f59e0b]">15</div>
                    <div className="text-[#64748b]">In Progress</div>
                  </div>
                  <div>
                    <div className="text-2xl text-[#64748b]">14</div>
                    <div className="text-[#64748b]">Pending</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4 text-[#3dd68c]" />
                        <span className="text-[#e2e8f0]">{category.name}</span>
                      </div>
                      <span className="text-[#94a3b8]">{category.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#1a1d23] clip-corner-tiny overflow-hidden">
                      <div 
                        className="h-full bg-[#3dd68c] transition-all"
                        style={{ width: `${category.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Detailed Checklist */}
          <div className="space-y-4">
            {categories.map((category) => {
              const isExpanded = expandedSections.includes(category.id);
              
              return (
                <div key={category.id} className="bg-[#2a2f38] border border-[#3a3f48] clip-corner overflow-hidden">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleSection(category.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-[#2a2f38]/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-[#3dd68c]" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-[#e2e8f0] mb-1">{category.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
                          <span>{category.completed}/{category.total} completed</span>
                          <span>•</span>
                          <span className="text-[#3dd68c]">{category.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative">
                        <svg className="transform -rotate-90 w-16 h-16">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#1a1d23"
                            strokeWidth="4"
                            fill="none"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#3dd68c"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - category.progress / 100)}`}
                            className="transition-all"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[#e2e8f0] text-xs">
                          {category.progress}%
                        </div>
                      </div>
                      
                      {isExpanded ? (
                        <ChevronDown className="w-6 h-6 text-[#94a3b8]" />
                      ) : (
                        <ChevronRight className="w-6 h-6 text-[#94a3b8]" />
                      )}
                    </div>
                  </button>
                  
                  {/* Category Items */}
                  {isExpanded && (
                    <div className="border-t border-[#3a3f48] p-6 space-y-3">
                      {category.items.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-[#1a1d23] clip-corner-sm hover:bg-[#1a1d23]/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {item.status === 'completed' ? (
                              <CheckCircle2 className="w-5 h-5 text-[#3dd68c] flex-shrink-0" />
                            ) : item.status === 'in-progress' ? (
                              <div className="w-5 h-5 border-2 border-[#f59e0b] rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 bg-[#f59e0b] rounded-full"></div>
                              </div>
                            ) : (
                              <Circle className="w-5 h-5 text-[#64748b] flex-shrink-0" />
                            )}
                            <span className={`${
                              item.status === 'completed' 
                                ? 'text-[#94a3b8] line-through' 
                                : 'text-[#e2e8f0]'
                            }`}>
                              {item.title}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {item.status === 'completed' && (
                              <span className="px-3 py-1 bg-[#3dd68c]/20 text-[#3dd68c] clip-corner-tiny text-xs">
                                Complete
                              </span>
                            )}
                            {item.status === 'in-progress' && (
                              <span className="px-3 py-1 bg-[#f59e0b]/20 text-[#f59e0b] clip-corner-tiny text-xs">
                                In Progress
                              </span>
                            )}
                            {item.status === 'pending' && (
                              <span className="px-3 py-1 bg-[#64748b]/20 text-[#64748b] clip-corner-tiny text-xs">
                                Pending
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg">
              <FileCheck className="w-5 h-5 mr-2" /> Generate Compliance Report
            </Button>
            <Button variant="outline" size="lg">
              <Download className="w-5 h-5 mr-2" /> Export to PDF
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}