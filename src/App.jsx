import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import RecipientDashboard from './components/RecipientDashboard';
import EditProfile from './components/EditProfile';
import DonatePage from './components/DonatePage';
import FundingPage from './components/FundingPage';
import RecipientPage from './components/RecipientPage';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import VerifyEmail from './components/VerifyEmail';

function DashboardRouter() {
  const { user } = useAuth();
  return user && user.userType === 'recipient' ? <RecipientDashboard /> : <Dashboard />;
}

function AppRoutes() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If donor/funder and not verified, force verify page
  if (user && (user.userType === 'donor' || user.userType === 'funder') && !user.isVerified) {
    // Only allow /verify-email route
    return (
      <Routes>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<VerifyEmail />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <DashboardRouter />
        </PrivateRoute>
      } />
      <Route path="/donate" element={
        <PrivateRoute requiredUserType="donor">
          <DonatePage />
        </PrivateRoute>
      } />
      <Route path="/fund" element={
        <PrivateRoute requiredUserType="funder">
          <FundingPage />
        </PrivateRoute>
      } />
      <Route path="/receive" element={
        <PrivateRoute requiredUserType="recipient">
          <RecipientPage />
        </PrivateRoute>
      } />
      <Route path="/edit-profile" element={
        <PrivateRoute>
          <EditProfile />
        </PrivateRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#03045E] via-[#0077B6] to-[#00B4D8]">
        <Navbar />
        <main className="pt-16">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
