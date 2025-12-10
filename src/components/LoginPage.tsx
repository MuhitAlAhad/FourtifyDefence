import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import logoImage from 'figma:asset/35f931b802bf39733103d00f96fb6f9c21293f6e.png';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-[#1a1d23] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#3dd68c]/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#3dd68c]/5 blur-3xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Back to home */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-[#3dd68c] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>
        
        {/* Login Card */}
        <div className="bg-[#2a2f38] border border-[#3a3f48] clip-corner p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <img src={logoImage} alt="Fourtify" className="h-12 mx-auto mb-4" />
            <h3 className="text-[#e2e8f0] mb-2">Welcome Back</h3>
            <p className="text-[#94a3b8]">Sign in to your account</p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Email Address"
              type="email"
              placeholder="your.email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input 
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#94a3b8] cursor-pointer">
                <input type="checkbox" className="accent-[#3dd68c]" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-[#3dd68c] hover:text-[#2ab872] transition-colors">
                Forgot password?
              </a>
            </div>
            
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign In
            </Button>
          </form>
          
          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#3a3f48]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#2a2f38] px-4 text-[#64748b]">or</span>
            </div>
          </div>
          
          {/* Register Link */}
          <div className="text-center">
            <p className="text-[#94a3b8]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#3dd68c] hover:text-[#2ab872] transition-colors">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
        
        {/* Security Notice */}
        <div className="mt-6 p-4 bg-[#2a2f38]/50 border border-[#3a3f48] clip-corner-sm text-center">
          <p className="text-[#64748b]">
            🔒 Your connection is secured with AES-256 encryption
          </p>
        </div>
      </div>
    </div>
  );
}