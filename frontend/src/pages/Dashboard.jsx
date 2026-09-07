import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  TrendingDown, 
  AlertTriangle 
} from 'lucide-react';

export default function Dashboard() {
  const [firstName, setFirstName] = useState('Esther');
  const [greeting, setGreeting] = useState('Good morning');
  
  // State to handle the selected dashboard date
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    // 1. Calculate time-based greeting dynamically
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }

    // 2. Fetch and clean user's first name from localStorage database state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const userData = parsed.user || parsed.data || parsed;
        const rawFirst = userData.firstName || userData.first_name || userData.name || '';
        const cleanedName = rawFirst.replace(/[0-9]/g, '').trim();

        if (cleanedName) {
          const onlyFirstName = cleanedName.split(' ')[0];
          const formattedName = onlyFirstName.charAt(0).toUpperCase() + onlyFirstName.slice(1).toLowerCase();
          setFirstName(formattedName);
        }
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. GREETING HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            {greeting} 
            <span className="inline-block animate-wave text-xl">👋</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Here's what's happening with your store today.</p>
        </div>

        {/* Interactive Date Picker Badge */}
        <div className="relative flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 shadow-xs w-fit hover:border-emerald-500 transition cursor-pointer">
          <CalendarIcon className="w-4 h-4 text-emerald-600" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent border-none focus:outline-none cursor-pointer text-xs font-semibold text-slate-700"
          />
        </div>
      </div>

      {/* 2. TOP METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Sales</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-black text-slate-900">--</h3>
            <p className="text-[11px] font-semibold text-slate-400 mt-1">Synced with POS</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Profit</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-black text-slate-900">--</h3>
            <p className="text-[11px] font-semibold text-slate-400 mt-1">Synced with ledger</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Expenses</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-black text-slate-900">--</h3>
            <p className="text-[11px] font-semibold text-slate-400 mt-1">Updated expenses</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Products</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-black text-slate-900">--</h3>
            <p className="text-[11px] font-semibold text-slate-400 mt-1">Inventory items</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock Items</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-black text-slate-900">--</h3>
            <p className="text-[11px] font-semibold text-slate-400 mt-1">Stock threshold</p>
          </div>
        </div>

      </div>

      {/* 3. MIDDLE SECTION: ANALYTICS & TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Overview Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Sales Overview</h3>
              <p className="text-[11px] text-slate-400">Live transaction trends from database for {selectedDate}</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <BarChart3 className="w-4 h-4 text-slate-600" />
            </div>
          </div>
          
          <div className="h-64 w-full bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-xs">
            Chart data will load from your backend API endpoint
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Top Selling Products</h3>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">Live</span>
          </div>
          
          <div className="space-y-3 text-center py-10 text-slate-400 text-xs">
            No sales recorded yet. Connect your items list from the inventory table.
          </div>
        </div>

      </div>

      {/* 4. BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Low Stock Watch */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Low Stock Watch</h3>
          </div>
          <div className="text-center py-10 text-slate-400 text-xs">
            All inventory levels are optimal.
          </div>
        </div>

        {/* Sales by Payment Method */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Sales by Payment Method</h3>
          <div className="flex items-center justify-center my-auto py-12 text-slate-400 text-xs">
            Payment breakdown graph
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-emerald-700 p-6 rounded-2xl text-white shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black">Quick Actions</h3>
            <p className="text-xs text-emerald-200 mt-1">Perform common tasks instantly</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 my-6">
            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl text-left transition border border-white/10 flex flex-col justify-between">
              <ShoppingCart className="w-5 h-5 text-emerald-200 mb-2" />
              <span className="text-xs font-bold block">New Sale</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl text-left transition border border-white/10 flex flex-col justify-between">
              <Package className="w-5 h-5 text-emerald-200 mb-2" />
              <span className="text-xs font-bold block">Add Product</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl text-left transition border border-white/10 flex flex-col justify-between">
              <Users className="w-5 h-5 text-emerald-200 mb-2" />
              <span className="text-xs font-bold block">Add Customer</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl text-left transition border border-white/10 flex flex-col justify-between">
              <BarChart3 className="w-5 h-5 text-emerald-200 mb-2" />
              <span className="text-xs font-bold block">View Reports</span>
            </button>
          </div>

          <div className="bg-white/10 p-3 rounded-xl flex items-center justify-between text-xs font-bold">
            <span>System Status</span>
            <span className="text-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Connected
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}