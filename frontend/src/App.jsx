import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home'; 
import SignUpForm from './pages/signup'; 
import SplashScreen from './pages/screen'; 
import SignInForm from './pages/signin';
import AddCustomer from './pages/Customers';
import Dashboard from './pages/Dashboard';
import Layouts from './pages/Layouts';
import Sales from './pages/Sales'; 

function AppRoutes() {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    console.log("User authorized successfully!");
    navigate('/dashboard'); // <-- Corrected to navigate straight to the Dashboard on login
  };

  return (
    <Routes>
      {/* Fallback route: redirects root URL to /signin so users authenticate first */}
      <Route path="/" element={<Navigate to="/signin" replace />} />
      
      {/* Standard App Pages */}
      <Route path="/home" element={<Home onNavigate={(targetView) => navigate(`/${targetView}`)} />} />
      
      {/* Layout Wrapper: Adds desktop sidebar and mobile bottom navigation to these routes */}
      <Route element={<Layouts />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pos" element={<Sales />} /> 
        <Route path="/customers" element={<AddCustomer />} />
      </Route>

      <Route 
        path="/signup" 
        element={
          <SignUpForm 
            onNavigateToSignIn={(successMsg) => {
              if (successMsg) {
                navigate('/signin', { state: { message: successMsg } });
              } else {
                navigate('/signin');
              }
            }} 
          />
        } 
      />
      
      <Route 
        path="/signin" 
        element={
          <SignInForm 
            onAuthSuccess={handleAuthSuccess} 
            onNavigateToSignUp={() => navigate('/signup')}
            onNavigateToForgotPassword={() => console.log("Forgot password overlay activated.")}
          />
        } 
      />

      {/* Catch-all handler: redirects invalid URLs back to sign-in */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default function App() {
  const [isSplashLoading, setIsSplashLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashLoading(false);
  };

  return (
    <Router>
      {isSplashLoading ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <AppRoutes />
      )}
    </Router>
  );
}