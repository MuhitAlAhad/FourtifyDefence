import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  FileCheck, 
  Users, 
  Settings, 
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import logoImage from 'figma:asset/35f931b802bf39733103d00f96fb6f9c21293f6e.png';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps = {}) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/disp-readiness', icon: FileCheck, label: 'DISP Readiness' },
    { path: '/account', icon: Settings, label: 'Account & Billing' },
  ];
  
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside className={`bg-[#0f1419] border-r border-[#2a2f38] transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } flex flex-col fixed lg:relative h-full z-50 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-6 border-b border-[#2a2f38]">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center">
              {collapsed ? (
                <div className="w-10 h-10 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#3dd68c]" />
                </div>
              ) : (
                <img src={logoImage} alt="Fourtify" className="h-8" />
              )}
            </Link>
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="text-[#64748b] hover:text-[#3dd68c] transition-colors hidden lg:block"
            >
              {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onMobileClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded transition-all ${
                      isActive 
                        ? 'bg-[#3dd68c]/10 text-[#3dd68c] border-l-2 border-[#3dd68c]' 
                        : 'text-[#94a3b8] hover:bg-[#2a2f38] hover:text-[#e2e8f0]'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* User Info */}
        <div className="p-4 border-t border-[#2a2f38]">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-[#3dd68c] clip-corner-sm flex items-center justify-center flex-shrink-0">
              <span className="text-[#0f1419]">JS</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-[#e2e8f0] truncate">John Smith</div>
                <div className="text-[#64748b] text-xs truncate">Admin</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}