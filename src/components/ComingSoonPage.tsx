import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-[#1a1d23] border border-[#2a2f38] clip-corner p-10 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-[#3dd68c] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>
        <h2 className="text-[#e2e8f0] mb-3">Coming Soon</h2>
        <p className="text-[#94a3b8]">
          Your SAAS product will be here.
        </p>
      </div>
    </div>
  );
}
