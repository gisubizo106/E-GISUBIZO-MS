import React, { useState } from 'react';

const translations = {
  English: {
    title: "Partner Portal Sign-Up",
    subTitle: "Connect, manage, and monitor your platform workflows instantly.",
    emailLabel: "Business Email:",
    emailPlaceholder: "e.g., partner@domain.com",
    firstNameLabel: "First Name:",
    lastNameLabel: "Last Name:",
    companyNameLabel: "Company Name:",
    titleLabel: "Title:",
    passwordLabel: "Password:",
    passwordPlaceholder: "Create a strong password",
    confirmPasswordLabel: "Confirm Password:",
    confirmPasswordPlaceholder: "Re-enter your password",
    genericPlaceholder: "Please enter...",
    registerBtn: "Register Now",
    registerBtnLoading: "Processing Registration...",
    loginRedirect: "Already a partner? Login here.",
    errPasswordShort: "Password must be at least 8 characters long",
    errPasswordMatch: "Passwords do not match",
    successMessage: "Registration successful! Welcome to E-Gisubizo. Please sign in."
  },
  Kinyarwanda: {
    title: "Iyandikishe Kuri Portal y'Abafatanyabikorwa",
    subTitle: "Huza, ucunge, kandi ukurikiranire hafi imikorere ya gahunda zawe ako kanya.",
    emailLabel: "Imeli y'Akazi:",
    emailPlaceholder: "urugero: partner@domain.com",
    firstNameLabel: "Izina Rya mbere:",
    lastNameLabel: "Izina Ry'umuryango:",
    companyNameLabel: "Izina ry'Ikigo:",
    titleLabel: "Title:",
    passwordLabel: "Ijambo ry'Ibanga:",
    passwordPlaceholder: "Remera ijambo ry'ibanga rikomeye",
    confirmPasswordLabel: "Subiramo Ijambo ry'Ibanga:",
    confirmPasswordPlaceholder: "Subiramo ijambo ry'ibanga ryawe",
    genericPlaceholder: "Andika hano...",
    registerBtn: "Yandikishe Noneaha",
    registerBtnLoading: "Turacyatunganya Iyandikisha...",
    loginRedirect: "Ese usanzwe uri umufatanyabikorwa? Injira hano.",
    errPasswordShort: "Ijambo ry'ibanga rigomba kuba rinafite inyuguti cyangwa imibare bito 8",
    errPasswordMatch: "Amambo y'ibanga ntayahuza",
    successMessage: "Iyandikisha ryagenze neza! Ikaze kuri E-Gisubizo. Injira hano."
  }
};

export default function SignUpForm({ onNavigateToSignIn }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    title: '',
    password: '',
    confirmPassword: '' 
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [language, setLanguage] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = translations[language];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 8) {
      setError(t.errPasswordShort);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError(t.errPasswordMatch);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          companyName: formData.companyName,
          title: formData.title,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      localStorage.setItem('token', data.token);
      
      // Pass the localized success message back to the parent router setup
      if (onNavigateToSignIn) {
        onNavigateToSignIn(t.successMessage);
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-12 font-sans bg-gradient-to-br from-slate-50 via-sky-50/50 to-indigo-50 flex items-center justify-center relative">
      
      {/* Translation Menu Container */}
      <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50">
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="inline-flex items-center justify-between gap-x-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-md ring-1 ring-inset ring-slate-200 hover:bg-slate-50 transition"
          >
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 18c-1.18 0-2.018-3.07-2.018-7s.838-7 2.018-7m0 14c1.18 0 2.018-3.07 2.018-7s-.838-7-2.018-7M12 3v18" />
            </svg>
            <span>{language}</span>
            <svg className="-mr-1 h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-slate-100">
              <div className="py-1">
                {['English', 'Kinyarwanda'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangMenu(false);
                    }}
                    className={`${
                      language === lang ? 'bg-slate-50 text-blue-600 font-bold' : 'text-slate-700'
                    } block w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main UI Container layout */}
      <div className="w-full max-w-6xl bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side Branding Panel */}
        <div className="w-full md:w-1/2 bg-slate-50 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              E-Gisubizo <span className="text-blue-500 font-medium text-lg block sm:inline sm:ml-2">Partner Portal</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">{t.subTitle}</p>
          </div>
          
          <div className="my-8 flex items-center justify-center bg-blue-100/40 border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="w-full max-w-[380px] aspect-square flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute w-48 h-48 rounded-full bg-blue-100/40 animate-pulse -z-10"></div>
              <div className="absolute w-72 h-72 rounded-full bg-indigo-50/60 -z-20"></div>
              <img
                src="/user.png"
                alt="user logo"
                className="w-14 md:w-16 object-contain bg-white rounded-md shadow-2xl"
              />
            </div>
          </div>

          <div className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} E-Gisubizo Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side Interaction Panel */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.title}</h2>
          
          {error && <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email */}
            <div>
              <label className="block text-slate-700 text-xs font-bold mb-1.5 uppercase tracking-wide">
                <span className="text-red-500 mr-1">*</span>{t.emailLabel}
              </label>
              <input
                type="email"
                name="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition disabled:bg-slate-100"
              />
            </div>

            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5 uppercase tracking-wide">
                  <span className="text-red-500 mr-1">*</span>{t.firstNameLabel}
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder={t.genericPlaceholder}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5 uppercase tracking-wide">
                  <span className="text-red-500 mr-1">*</span>{t.lastNameLabel}
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder={t.genericPlaceholder}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition disabled:bg-slate-100"
                />
              </div>
            </div>

            {/* Corporate Placement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5 uppercase tracking-wide">
                  <span className="text-red-500 mr-1">*</span>{t.companyNameLabel}
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder={t.genericPlaceholder}
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5 uppercase tracking-wide">
                  <span className="text-red-500 mr-1">*</span>{t.jobTitleLabel}
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder={t.genericPlaceholder}
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition disabled:bg-slate-100"
                />
              </div>
            </div>

            {/* Password Credentials */}
            <div>
              <label className="block text-slate-700 text-xs font-bold mb-1.5 uppercase tracking-wide">
                <span className="text-red-500 mr-1">*</span>{t.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={t.passwordPlaceholder}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition pr-10 disabled:bg-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-slate-700 text-xs font-bold mb-1.5 uppercase tracking-wide">
                <span className="text-red-500 mr-1">*</span>{t.confirmPasswordLabel}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder={t.confirmPasswordPlaceholder}
                  value={formData.confirmPassword || ''}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition pr-10 disabled:bg-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0094ff] hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition shadow-sm mt-2 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isSubmitting && (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {isSubmitting ? t.registerBtnLoading : t.registerBtn}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-left">
            <button 
              type="button"
              onClick={() => onNavigateToSignIn && onNavigateToSignIn()} 
              className="text-xs text-blue-500 font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              {t.loginRedirect}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
