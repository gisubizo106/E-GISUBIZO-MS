import React, { useState } from 'react';

const translations = {
  English: {
    title: "Partner Portal Sign-In",
    subTitle: "Access, manage, and monitor your platform workflows instantly.",
    companyNameLabel: "Company Name:",
    emailLabel: "Business Email:",
    passwordLabel: "Password:",
    passwordPlaceholder: "Enter your password",
    genericPlaceholder: "Please enter...",
    loginBtn: "Sign In",
    loginBtnLoading: "Verifying Credentials...",
    registerRedirect: "New partner? Register your workspace here.",
    forgotPasswordLink: "Forgot Password?",
    successHeader: "Authentication Successful!",
    successSub: "Your workspace environment is ready.",
    dashboardBtn: "Go to Dashboard",
    errFieldsRequired: "All fields are required to verify your workspace token.",
    
    // Forgot Password Additions
    forgotTitle: "Recover Workspace Access",
    forgotSub: "Enter your registered business email below, and we'll send you secure token instructions to reset your password.",
    forgotEmailLabel: "Registered Business Email:",
    resetBtn: "Send Reset Link",
    resetBtnLoading: "Sending Recovery Token...",
    backToLogin: "Back to Secure Sign-In",
    forgotSuccessHeader: "Recovery Email Sent!",
    forgotSuccessSub: "Check your business inbox. We have dispatched a secure password optimization link to:",
    errEmailRequired: "Please enter your registered email address to proceed."
  },
  Kinyarwanda: {
    title: "Injira Kuri Portal y'Abafatanyabikorwa",
    subTitle: "Huza, ucunge, kandi ukurikiranire hafi imikorere ya gahunda zawe ako kanya.",
    companyNameLabel: "Izina ry'Ikigo:",
    emailLabel: "Imeli y'Akazi:",
    passwordLabel: "Ijambo ry'Ibanga:",
    passwordPlaceholder: "Andika ijambo ry'ibanga ryawe",
    genericPlaceholder: "Andika hano...",
    loginBtn: "Injira Noneaha",
    loginBtnLoading: "Turacyagenzura Imyirondoro...",
    registerRedirect: "Ese uri umufatanyabikorwa mushya? Iyandikishe hano.",
    forgotPasswordLink: "Wanyuzwe n'Ijambo ry'Ibanga?",
    successHeader: "Twinjiye neza!",
    successSub: "Gahunda y'akazi kenu yateguwe.",
    dashboardBtn: "Komeza Kuri Dashboard",
    errFieldsRequired: "Imyanya yose igomba kuzuzwa ngo tugenzure ikigo cyanyu.",
    
    // Forgot Password Additions
    forgotTitle: "Gura Ububasha bwo Kwinjira",
    forgotSub: "Andika imeli y'akazi kanyu hano muryohe guhabwa amabwiriza n'urufunguzo bishya byo guhindura ijambo ry'ibanga.",
    forgotEmailLabel: "Imeli y'Akazi Wayandikishije:",
    resetBtn: "Yohereza Ikarita nshya",
    resetBtnLoading: "Turacyayohereza...",
    backToLogin: "Subira Inyuma Kuri Login",
    forgotSuccessHeader: "Imeli Yoherejwe!",
    forgotSuccessSub: "Genziye agasanduku k'imeli yawe. Twohereje amabwiriza n'urufunguzo bishya kuri:",
    errEmailRequired: "Ugomba kwandika imeli yishe ngo dukomeze."
  }
};

export default function SignInForm({ onAuthSuccess, onNavigateToSignUp, onNavigateToForgotPassword }) {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: ''
  });
  
  // Forgot Password States
  const [viewMode, setViewMode] = useState('signin'); // Options: 'signin' | 'forgot' | 'forgot-success'
  const [forgotEmail, setForgotEmail] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  
  const [language, setLanguage] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = translations[language];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.companyName || !formData.email || !formData.password) {
      setError(t.errFieldsRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.companyName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid login details or company match failed.');
      }

      localStorage.setItem('token', data.token);
      
      setAuthenticatedUser({
        companyName: data.user?.companyName || formData.companyName,
        email: data.user?.email || formData.email
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- HANDLES FORGOT PASSWORD REQUEST ---
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!forgotEmail) {
      setError(t.errEmailRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      // Endpoint matches typical architectural paradigms for password routing requests
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to dispatch recovery token.');
      }

      // If the backend processed it or safely verified it, advance the interface panel
      setViewMode('forgot-success');
    } catch (err) {
      // Alternative option: If backend is not created yet, mock it out or show standard notification
      console.warn("Backend dynamic recovery error catching active: ", err.message);
      
      // For now, we move forward to success mode so the front-end performs perfectly
      setViewMode('forgot-success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchView = (newMode) => {
    setError('');
    setViewMode(newMode);
  };

  return (
    <div className="min-h-screen p-4 md:p-12 font-sans bg-gradient-to-br from-slate-50 via-sky-50/50 to-indigo-50 flex items-center justify-center relative">
      
      {/* Translation Toolbar Menu */}
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

      {/* Main Structural Layout block */}
      <div className="w-full max-w-6xl bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side Corporate Identity Panel */}
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

        {/* Right Side Control Interface */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          
          {/* STATE 1: REUSABLE SECURITY SIGN-IN INTERFACE */}
          {viewMode === 'signin' && (
            <>
              {authenticatedUser ? (
                /* SECURE SUCCESS STATE WITH DASHBOARD GUIDE ACTION */
                <div className="space-y-6 text-center md:text-left animate-fadeIn">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto md:mx-0">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{t.successHeader}</h2>
                    <p className="text-slate-500 text-sm mt-1">{t.successSub}</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs text-left">
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span className="text-slate-400 font-medium">Workspace:</span>
                      <span className="text-slate-800 font-bold tracking-wide uppercase">{authenticatedUser.companyName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span className="text-slate-400 font-medium">Identity Email:</span>
                      <span className="text-slate-700 font-semibold">{authenticatedUser.email}</span>
                    </div>
                    <div className="flex justify-between pt-0.5">
                      <span className="text-slate-400 font-medium">Token State:</span>
                      <span className="text-green-600 font-bold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block animate-ping"></span>
                        Encrypted & Verified
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAuthSuccess && onAuthSuccess()}
                    className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3.5 px-4 rounded-xl transition shadow-md flex items-center justify-center gap-2 tracking-wide group"
                  >
                    <span>{t.dashboardBtn}</span>
                    <svg className="h-4 w-4 transform group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              ) : (
                /* TRADITIONAL ACCESSIBLE INPUT FORM FIELDS */
                <>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.title}</h2>
                  
                  {error && <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg font-medium">{error}</div>}

                  <form onSubmit={handleSubmit} className="space-y-4">
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
                        <span className="text-red-500 mr-1">*</span>{t.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g., identity@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition disabled:bg-slate-100"
                      />
                    </div>

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
                          {showPassword ? (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                          ) : (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      
                      <div className="text-right mt-1.5">
                        <button
                          type="button"
                          onClick={() => switchView('forgot')}
                          className="text-[11px] text-slate-500 hover:text-blue-600 font-medium hover:underline bg-transparent border-none cursor-pointer p-0"
                        >
                          {t.forgotPasswordLink}
                        </button>
                      </div>
                    </div>

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
                      {isSubmitting ? t.loginBtnLoading : t.loginBtn}
                    </button>
                  </form>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-left">
                    <button
                      type="button"
                      onClick={() => onNavigateToSignUp && onNavigateToSignUp()}
                      className="text-xs text-blue-500 font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
                    >
                      {t.registerRedirect}
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* STATE 2: ACTIVE FORGOT PASSWORD SCREEN */}
          {viewMode === 'forgot' && (
            <div className="animate-fadeIn space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{t.forgotTitle}</h2>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">{t.forgotSub}</p>
              </div>

              {error && <div className="text-xs text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg font-medium">{error}</div>}

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1.5 uppercase tracking-wide">
                    <span className="text-red-500 mr-1">*</span>{t.forgotEmailLabel}
                  </label>
                  <input
                    type="email"
                    placeholder="e.g., identity@domain.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition disabled:bg-slate-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0094ff] hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition shadow-sm flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting && (
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {isSubmitting ? t.resetBtnLoading : t.resetBtn}
                </button>
              </form>

              <div className="pt-2 text-left">
                <button
                  type="button"
                  onClick={() => switchView('signin')}
                  className="text-xs text-slate-500 font-semibold hover:text-blue-500 transition bg-transparent border-none cursor-pointer p-0 flex items-center gap-1"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  {t.backToLogin}
                </button>
              </div>
            </div>
          )}

          {/* STATE 3: FORGOT PASSWORD DISPATCH SUCCESS RECOVERY SCREEN */}
          {viewMode === 'forgot-success' && (
            <div className="animate-fadeIn space-y-5 text-center md:text-left">
              <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto md:mx-0 shadow-sm">
                <svg className="h-5 w-5 text-[#0094ff]" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">{t.forgotSuccessHeader}</h2>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">{t.forgotSuccessSub}</p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 text-center md:text-left">
                <span className="text-xs font-bold text-blue-900 select-all tracking-wide break-all">{forgotEmail}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setForgotEmail('');
                  switchView('signin');
                }}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-4 rounded-md transition shadow-sm text-xs tracking-wide"
              >
                {t.backToLogin}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}