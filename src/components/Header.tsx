import { Shield, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useState } from 'react';
import logoImage from 'figma:asset/35f931b802bf39733103d00f96fb6f9c21293f6e.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authEnabled = false;

  const handleAuthClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!authEnabled) {
      event.preventDefault();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1419]/95 backdrop-blur-sm border-b border-[#2a2f38]">
      <nav className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoImage} alt="Fourtify" className="h-10 lg:h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-[#94a3b8] hover:text-[#3dd68c] transition-colors">Features</a>
            <a href="#how-it-works" className="text-[#94a3b8] hover:text-[#3dd68c] transition-colors">How It Works</a>
            <a href="#industries" className="text-[#94a3b8] hover:text-[#3dd68c] transition-colors">Industries</a>
            <a href="#pricing" className="text-[#94a3b8] hover:text-[#3dd68c] transition-colors">Pricing</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" onClick={handleAuthClick} aria-disabled={!authEnabled}>
              <Button variant="secondary" size="sm">Login</Button>
            </Link>
            <Link to="/register" onClick={handleAuthClick} aria-disabled={!authEnabled}>
              <Button variant="primary" size="sm">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#e2e8f0]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 flex flex-col gap-4">
            <a href="#features" className="text-[#94a3b8] hover:text-[#3dd68c] transition-colors py-2">Features</a>
            <a href="#how-it-works" className="text-[#94a3b8] hover:text-[#3dd68c] transition-colors py-2">How It Works</a>
            <a href="#industries" className="text-[#94a3b8] hover:text-[#3dd68c] transition-colors py-2">Industries</a>
            <a href="#pricing" className="text-[#94a3b8] hover:text-[#3dd68c] transition-colors py-2">Pricing</a>
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/login" onClick={handleAuthClick} aria-disabled={!authEnabled}>
                <Button variant="secondary" size="sm" className="w-full">Login</Button>
              </Link>
              <Link to="/register" onClick={handleAuthClick} aria-disabled={!authEnabled}>
                <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
