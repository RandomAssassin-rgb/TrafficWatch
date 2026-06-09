import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Camera, FileText, Award, BarChart3, Settings, HelpCircle, Bell, Plus, Shield } from 'lucide-react';

export default function AppLayout() {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { path: '/upload', label: 'Evidence', icon: Camera },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/rewards', label: 'Rewards', icon: Award },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-700 leading-tight">TrafficWatch<br/>AI</h1>
              <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Institutional Grade</p>
            </div>
          </div>
          
          <Link to="/upload" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 mb-8 font-semibold transition-colors shadow-sm">
            <Plus size={18} /> New Report
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = path === item.path || (path === '/' && item.path === '/dashboard');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-1">
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <Settings size={20} /> Settings
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <HelpCircle size={20} /> Support
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-xl font-bold text-slate-900 hidden">TrafficWatch AI</Link>
            <nav className="flex items-center gap-8">
              <Link to="/dashboard" className={`text-sm font-semibold pb-5 pt-5 border-b-2 ${path === '/dashboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}>Platform</Link>
              <Link to="#" className="text-sm font-semibold pb-5 pt-5 border-b-2 border-transparent text-slate-600 hover:text-slate-900">Features</Link>
              <Link to="/analytics" className={`text-sm font-semibold pb-5 pt-5 border-b-2 ${path === '/analytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}>Analytics</Link>
              <Link to="/rewards" className={`text-sm font-semibold pb-5 pt-5 border-b-2 ${path === '/rewards' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}>Rewards</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/upload" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
              Report Violation
            </Link>
            <div className="flex items-center gap-4 text-slate-500">
              <button className="hover:text-slate-900 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <button className="hover:text-slate-900 transition-colors">
                <Settings size={20} />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden ml-2">
                <img src="https://ui-avatars.com/api/?name=Officer+Doe&background=0D8ABC&color=fff" alt="User" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#f8fafc]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
