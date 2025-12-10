import { Shield, Lock, FileCheck, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from 'figma:asset/35f931b802bf39733103d00f96fb6f9c21293f6e.png';

export function Footer() {
  return (
    <footer className="bg-[#0f1419] border-t border-[#2a2f38]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <img src={logoImage} alt="Fourtify" className="h-10 mb-4" />
            <p className="text-[#64748b] mb-4">
              The DISP compliance CRM for defence-ready companies.
            </p>
            <div className="flex items-center gap-2 text-[#64748b]">
              <Mail className="w-4 h-4" />
              <span>contact@fourtify.defence</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h5 className="text-[#e2e8f0] mb-4">Product</h5>
            <ul className="space-y-3">
              <li><a href="#features" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">Pricing</a></li>
              <li><a href="#" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">Integrations</a></li>
              <li><a href="#" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-[#e2e8f0] mb-4">Company</h5>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">About Us</Link></li>
              <li><a href="#" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">Careers</a></li>
              <li><a href="#" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">Contact</a></li>
              <li><a href="#" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-[#e2e8f0] mb-4">Legal & Compliance</h5>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">Security</a></li>
              <li><a href="#" className="text-[#64748b] hover:text-[#3dd68c] transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#2a2f38]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-[#64748b]">
              © 2025 Fourtify Defence. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[#64748b]">
                <Lock className="w-4 h-4 text-[#3dd68c]" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-[#64748b]">
                <FileCheck className="w-4 h-4 text-[#3dd68c]" />
                <span>DISP Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}