import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { DISPReadiness } from './components/DISPReadiness';
import { AccountBilling } from './components/AccountBilling';
import { AboutUs } from './components/AboutUs';
import { ContactPage } from './components/ContactPage';
import { SubscribePage } from './components/SubscribePage';
import { PaymentPage } from './components/PaymentPage';
import { QualificationPage } from './components/QualificationPage';
import { ScrollToTop } from './components/ScrollToTop';
import { ConfirmEmailPage } from './components/ConfirmEmailPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ComingSoonPage } from './components/ComingSoonPage';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireSubscription>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/disp-readiness"
          element={
            <ProtectedRoute requireSubscription>
              <DISPReadiness />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute requireSubscription>
              <AccountBilling />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/coming-soon"
          element={
            <ProtectedRoute>
              <ComingSoonPage />
            </ProtectedRoute>
          }
        />
        <Route path="/demo" element={<ComingSoonPage />} />
        <Route path="/qualify" element={<QualificationPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />
      </Routes>
    </Router>
  );
}
