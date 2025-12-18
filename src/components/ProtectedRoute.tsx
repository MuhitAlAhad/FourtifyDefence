import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requireSubscription?: boolean;
}

export function ProtectedRoute({ children, requireSubscription = false }: ProtectedRouteProps) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireSubscription) {
    const hasSubscription = localStorage.getItem('hasActiveSubscription') === 'true';
    if (!hasSubscription) {
      return <Navigate to="/subscribe" replace />;
    }
  }

  return <>{children}</>;
}
