import { Sidebar } from './Sidebar';
import { 
  Bell, 
  Search, 
  TrendingUp, 
  Users, 
  FileCheck, 
  AlertCircle,
  CheckCircle2,
  Clock,
  MoreVertical,
  Plus,
  Menu
} from 'lucide-react';
import { Button } from './Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const kpis = [
    {
      label: 'DISP Compliance Score',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: FileCheck,
      color: 'text-[#3dd68c]'
    },
    {
      label: 'Active Tasks',
      value: '24',
      change: '-8',
      trend: 'down',
      icon: Clock,
      color: 'text-[#f59e0b]'
    },
    {
      label: 'Personnel Cleared',
      value: '89/95',
      change: '+3',
      trend: 'up',
      icon: Users,
      color: 'text-[#3dd68c]'
    },
    {
      label: 'Critical Alerts',
      value: '2',
      change: '0',
      trend: 'neutral',
      icon: AlertCircle,
      color: 'text-[#ef4444]'
    }
  ];
  
  const tasks = {
    todo: [
      { id: 1, title: 'Update Personnel Security Clearance', priority: 'high', assignee: 'JS' },
      { id: 2, title: 'Complete Cyber Risk Assessment', priority: 'high', assignee: 'MK' },
      { id: 3, title: 'Review Physical Access Logs', priority: 'medium', assignee: 'AL' }
    ],
    inProgress: [
      { id: 4, title: 'Implement Network Segmentation', priority: 'high', assignee: 'JS' },
      { id: 5, title: 'Conduct Security Awareness Training', priority: 'medium', assignee: 'TR' }
    ],
    completed: [
      { id: 6, title: 'Annual DISP Audit Preparation', priority: 'high', assignee: 'JS' },
      { id: 7, title: 'Update Incident Response Plan', priority: 'medium', assignee: 'MK' }
    ]
  };
  
  const notifications = [
    { 
      id: 1, 
      type: 'alert', 
      title: 'Security Clearance Expiring', 
      description: '2 personnel clearances expire in 30 days',
      time: '2h ago'
    },
    { 
      id: 2, 
      type: 'success', 
      title: 'Cyber Assessment Complete', 
      description: 'Q4 vulnerability scan passed with 98% score',
      time: '5h ago'
    },
    { 
      id: 3, 
      type: 'info', 
      title: 'New Task Assigned', 
      description: 'Physical security audit scheduled for next week',
      time: '1d ago'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-[#0f1419] border-b border-[#2a2f38] px-8 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#e2e8f0]">Dashboard</h3>
              <p className="text-[#64748b]">Welcome back, John Smith</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="bg-[#2a2f38] border border-[#3a3f48] pl-10 pr-4 py-2 text-[#e2e8f0] placeholder:text-[#64748b] focus:outline-none focus:border-[#3dd68c] transition-colors clip-corner-sm w-64"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 hover:bg-[#2a2f38] rounded transition-colors">
                <Bell className="w-6 h-6 text-[#94a3b8]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full"></span>
              </button>

              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="p-8">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi, index) => (
              <div key={index} className="bg-[#2a2f38] border border-[#3a3f48] p-6 clip-corner hover:border-[#3dd68c]/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center`}>
                    <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  {kpi.trend !== 'neutral' && (
                    <div className={`flex items-center gap-1 text-sm ${
                      kpi.trend === 'up' ? 'text-[#3dd68c]' : 'text-[#ef4444]'
                    }`}>
                      <TrendingUp className={`w-4 h-4 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                      <span>{kpi.change}</span>
                    </div>
                  )}
                </div>
                <div className="text-3xl text-[#e2e8f0] mb-1">{kpi.value}</div>
                <div className="text-[#94a3b8]">{kpi.label}</div>
              </div>
            ))}
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Kanban Board */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-[#e2e8f0]">Task Board</h4>
                <Button variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" /> New Task
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {/* To Do */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-[#94a3b8]">To Do</h5>
                    <span className="px-2 py-1 bg-[#2a2f38] text-[#64748b] clip-corner-tiny text-xs">
                      {tasks.todo.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {tasks.todo.map((task) => (
                      <div key={task.id} className="bg-[#2a2f38] border border-[#3a3f48] p-4 clip-corner-sm hover:border-[#3dd68c]/50 transition-all cursor-grab active:cursor-grabbing">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`px-2 py-1 clip-corner-tiny text-xs ${
                            task.priority === 'high' 
                              ? 'bg-[#ef4444]/20 text-[#ef4444]' 
                              : 'bg-[#f59e0b]/20 text-[#f59e0b]'
                          }`}>
                            {task.priority}
                          </div>
                          <button className="text-[#64748b] hover:text-[#e2e8f0]">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[#e2e8f0] mb-3">{task.title}</p>
                        <div className="flex items-center justify-between">
                          <div className="w-6 h-6 bg-[#3dd68c] clip-corner-tiny flex items-center justify-center text-[#0f1419] text-xs">
                            {task.assignee}
                          </div>
                          <Clock className="w-4 h-4 text-[#64748b]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* In Progress */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-[#94a3b8]">In Progress</h5>
                    <span className="px-2 py-1 bg-[#2a2f38] text-[#64748b] clip-corner-tiny text-xs">
                      {tasks.inProgress.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {tasks.inProgress.map((task) => (
                      <div key={task.id} className="bg-[#2a2f38] border border-[#3dd68c]/50 p-4 clip-corner-sm hover:border-[#3dd68c] transition-all cursor-grab active:cursor-grabbing">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`px-2 py-1 clip-corner-tiny text-xs ${
                            task.priority === 'high' 
                              ? 'bg-[#ef4444]/20 text-[#ef4444]' 
                              : 'bg-[#f59e0b]/20 text-[#f59e0b]'
                          }`}>
                            {task.priority}
                          </div>
                          <button className="text-[#64748b] hover:text-[#e2e8f0]">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[#e2e8f0] mb-3">{task.title}</p>
                        <div className="flex items-center justify-between">
                          <div className="w-6 h-6 bg-[#3dd68c] clip-corner-tiny flex items-center justify-center text-[#0f1419] text-xs">
                            {task.assignee}
                          </div>
                          <div className="w-full h-1 bg-[#1a1d23] ml-2 clip-corner-tiny overflow-hidden flex-1">
                            <div className="h-full bg-[#3dd68c]" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Completed */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-[#94a3b8]">Completed</h5>
                    <span className="px-2 py-1 bg-[#2a2f38] text-[#64748b] clip-corner-tiny text-xs">
                      {tasks.completed.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {tasks.completed.map((task) => (
                      <div key={task.id} className="bg-[#2a2f38] border border-[#3a3f48] p-4 clip-corner-sm opacity-75">
                        <div className="flex items-start justify-between mb-3">
                          <CheckCircle2 className="w-5 h-5 text-[#3dd68c]" />
                          <button className="text-[#64748b] hover:text-[#e2e8f0]">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[#e2e8f0] mb-3 line-through">{task.title}</p>
                        <div className="flex items-center justify-between">
                          <div className="w-6 h-6 bg-[#3dd68c] clip-corner-tiny flex items-center justify-center text-[#0f1419] text-xs">
                            {task.assignee}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notifications Panel */}
            <div>
              <h4 className="text-[#e2e8f0] mb-6">Recent Notifications</h4>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="bg-[#2a2f38] border border-[#3a3f48] p-4 clip-corner-sm">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 clip-corner-tiny mt-2 flex-shrink-0 ${
                        notification.type === 'alert' ? 'bg-[#ef4444]' :
                        notification.type === 'success' ? 'bg-[#3dd68c]' :
                        'bg-[#3b82f6]'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[#e2e8f0] mb-1">{notification.title}</div>
                        <p className="text-[#94a3b8] text-sm mb-2">{notification.description}</p>
                        <div className="text-[#64748b] text-xs">{notification.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
