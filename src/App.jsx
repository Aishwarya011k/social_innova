import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';
import DonatePage from './components/DonatePage';
import FundingPage from './components/FundingPage';
import RecipientPage from './components/RecipientPage';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#03045E] via-[#0077B6] to-[#00B4D8]">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
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
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
