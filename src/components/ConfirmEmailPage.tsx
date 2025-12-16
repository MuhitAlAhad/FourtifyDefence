import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { request } from '../services/auth';

export function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState<string>('Confirming your email…');

  useEffect(() => {
    const userId = searchParams.get('userId');
    const token = searchParams.get('token');

    if (!userId || !token) {
      setStatus('error');
      setMessage('Invalid confirmation link.');
      return;
    }

    const confirm = async () => {
      try {
        await request('/auth/confirm-email' + `?userId=${encodeURIComponent(userId)}&token=${encodeURIComponent(token)}`, {
          method: 'GET'
        });
        setStatus('success');
        setMessage('Email confirmed. You can now sign in.');
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Email confirmation failed. The link may be expired.';
        setStatus('error');
        setMessage(msg);
      }
    };

    void confirm();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#080d1a] flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-[#0f1419] border border-[#2a2f38] clip-corner p-8 text-center">
        <div className="w-16 h-16 bg-[#3dd68c]/10 clip-corner-sm flex items-center justify-center mx-auto mb-4">
          {status === 'success' ? (
            <CheckCircle2 className="w-8 h-8 text-[#3dd68c]" />
          ) : status === 'error' ? (
            <AlertCircle className="w-8 h-8 text-[#ef4444]" />
          ) : (
            <Shield className="w-8 h-8 text-[#94a3b8]" />
          )}
        </div>
        <h3 className="text-[#e2e8f0] mb-2">Email Confirmation</h3>
        <p className="text-[#94a3b8] mb-6">{message}</p>

        {status !== 'pending' && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login">
              <Button variant="primary">Go to Login</Button>
            </Link>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
