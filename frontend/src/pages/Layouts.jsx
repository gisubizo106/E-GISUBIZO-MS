import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  ShoppingBag, 
  Truck, 
  Users, 
  CreditCard, 
  UserCheck, 
  FileText, 
  Settings as SettingsIcon, 
  LogOut, 
  Sparkles, 
  Search, 
  Plus, 
  Bell, 
  Mail, 
  Store 
} from 'lucide-react';

export default function Layouts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [companyName, setCompanyName] = useState('E-GISUBIZO');

  const [userProfile, setUserProfile] = useState({
    name: 'Esther Gisubizo',
    firstName: 'Esther',
    email: 'admin@e-gisubizo.com',
    role: 'Administrator',
    initials: 'EG'
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const userData = parsed.user || parsed.data || parsed;

        // Extract Company Name
        const comp = userData.company_name || userData.companyName || userData.company || 'E-GISUBIZO';
        setCompanyName(comp);

        // Extract Names
        const firstName = userData.firstName || userData.first_name || '';
        const lastName = userData.lastName || userData.last_name || '';
        
        let fullName = '';
        if (firstName || lastName) {
          fullName = `${firstName} ${lastName}`.trim();
        } else if (userData.name || userData.fullName) {
          fullName = userData.name || userData.fullName;
        } else {
          const emailPrefix = (userData.email || 'Esther Gisubizo').split('@')[0];
          fullName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
        }

        const derivedFirstName = firstName || fullName.split(' ')[0] || 'User';
        const email = userData.email || userData.userEmail || 'admin@e-gisubizo.com';
        const role = userData.role || 'Administrator';

        const initials = fullName
          .split(' ')
          .filter(Boolean)
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || 'EG';

        setUserProfile({
          name: fullName,
          firstName: derivedFirstName,
          email: email,
          role: role,
          initials: initials
        });
      } catch (err) {
        console.error("Failed to parse user data from localStorage:", err);
      }
    }
  }, []);

  // Streamlined menu configuration (Sales removed, POS remains)
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'pos', name: 'POS', path: '/pos', icon: <ShoppingCart className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'inventory', name: 'Inventory', path: '/inventory/products', icon: <Package className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'purchases', name: 'Purchases', path: '/purchases', icon: <ShoppingBag className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'suppliers', name: 'Suppliers', path: '/suppliers', icon: <Truck className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'customers', name: 'Customers', path: '/customers', icon: <Users className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'expenses', name: 'Expenses', path: '/expenses', icon: <CreditCard className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'employees', name: 'Employees', path: '/employees', icon: <UserCheck className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'reports', name: 'Reports', path: '/reports', icon: <FileText className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'settings', name: 'Settings', path: '/settings', icon: <SettingsIcon className="w-5 h-5 md:w-4 md:h-4" /> },
  ];

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      
      {/* 1. COMPREHENSIVE DESKTOP SIDEBAR */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col justify-between hidden md:flex z-25 overflow-y-auto select-none">
        <div>
          {/* Logo Brand Header - Styled Green */}
          <div className="flex items-center gap-3 px-6 py-5">
            <div className="bg-emerald-600 p-2.5 rounded-2xl text-white shadow-md shadow-emerald-500/30 flex items-center justify-center">
              <Store className="w-6 h-6 md:w-5 md:h-5 text-white" />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-slate-900 font-black text-sm tracking-wider truncate">{companyName}</h1>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight">Shop Management System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 space-y-1 pb-6">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white' : 'text-emerald-600'}>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Cards: Upgrade Plan, User Details & Logout */}
        <div className="p-4 space-y-3 border-t border-slate-200 bg-slate-100/50">
          
          {/* Upgrade Plan Box */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 p-3.5 rounded-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1.5 text-emerald-700 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Upgrade Plan</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
              Unlock more features and grow your business.
            </p>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl shadow-sm transition">
              Upgrade Now
            </button>
          </div>

          {/* User First Name & Email Display Block */}
          <div className="px-3 py-2 bg-white border border-slate-200/80 rounded-xl shadow-xs">
            <p className="text-xs font-bold text-slate-800 truncate">{userProfile.firstName}</p>
            <p className="text-[10px] text-slate-400 font-medium truncate">{userProfile.email}</p>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>

        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA & TOP NAVBAR */}
      <div className="flex-1 flex flex-col overflow-hidden pb-20 md:pb-0">
        
        {/* Top Navbar Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
          
          {/* Search Bar */}
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full max-w-md hidden sm:block">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-10 pr-14 py-2.5 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <kbd className="bg-slate-200 text-slate-500 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-slate-300">Ctrl + K</kbd>
              </span>
            </div>
          </div>

          {/* Header Action Icons & User Info */}
          <div className="flex items-center gap-3">
            
            {/* Quick Add Button (+) */}
            <button className="w-9 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-md shadow-emerald-200 transition">
              <Plus className="w-5 h-5" />
            </button>

            {/* Notification Bell with Badge */}
            <div className="relative">
              <button className="w-9 h-9 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 transition">
                <Bell className="w-4 h-4" />
              </button>
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </div>

            {/* Mail/Messages Icon */}
            <button className="w-9 h-9 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full hidden sm:flex items-center justify-center text-slate-600 transition">
              <Mail className="w-4 h-4" />
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            {/* Profile Avatar & Details with Live Indicator */}
            <div className="flex items-center gap-3 pl-1">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-sm border border-emerald-200">
                  {userProfile.initials}
                </div>
                {/* Live Indicator Dot */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
              </div>

              <div className="hidden md:block text-left">
                <h4 className="text-xs font-bold text-slate-800 leading-tight">{userProfile.name}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{userProfile.role}</span>
              </div>
            </div>

          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <Outlet />
        </main>
      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION BAR */}
      <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-1 py-2.5 flex items-center justify-around z-30 shadow-2xl overflow-x-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition min-w-[52px] ${
                isActive ? 'text-emerald-600 font-bold bg-emerald-50/80 scale-105' : 'text-slate-400 hover:text-emerald-600'
              }`}
            >
              <div className="p-1">{item.icon}</div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}