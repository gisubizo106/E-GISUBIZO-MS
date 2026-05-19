import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home'; 
import SignUpForm from './pages/signup'; 
import SplashScreen from './pages/screen'; 
import SignInForm from './pages/signin';

function AppRoutes() {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    console.log("User authorized successfully!");
    navigate('/home'); 
  };

  return (
    <Routes>
      {/* Fallback route: redirects root URL to /signin so users authenticate first */}
      <Route path="/" element={<Navigate to="/signin" replace />} />
      
      {/* Standard App Pages */}
      <Route path="/home" element={<Home onNavigate={(targetView) => navigate(`/${targetView}`)} />} />
      
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
            // Linked to prevent routing failures when clicking Forgot Password
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