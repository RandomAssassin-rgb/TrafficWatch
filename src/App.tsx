import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Reports from './pages/Reports';
import Rewards from './pages/Rewards';
import AdminReview from './pages/AdminReview';
import Analytics from './pages/Analytics';
import LiveCamera from './pages/LiveCamera';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', emoji: '🏠' },
  { name: 'Upload Evidence', path: '/upload', emoji: '📤' },
  { name: 'Review Queue', path: '/admin', emoji: '🔍' },
  { name: 'Live Camera', path: '/live', emoji: '🎥' },
  { name: 'Analytics', path: '/analytics', emoji: '📊' },
  { name: 'My Reports', path: '/reports', emoji: '📄' },
  { name: 'Rewards', path: '/rewards', emoji: '🏆' },
];

function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (location.pathname === '/') return <>{children}</>;

  return (
    <div style={{
      display: 'flex', height: '100vh', width: '100%',
      backgroundColor: '#f8fafc', overflow: 'hidden',
      fontFamily: "'Inter', -apple-system, sans-serif"
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '230px', flexShrink: 0,
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 18px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px', height: '34px', backgroundColor: '#2563eb',
              borderRadius: '8px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{ color: 'white', fontSize: '16px' }}>🚦</span>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', lineHeight: 1.2 }}>TrafficWatch</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '500' }}>AI Enforcement</div>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 12px', borderRadius: '8px',
                  textDecoration: 'none', fontSize: '14px',
                  fontWeight: active ? '600' : '500',
                  color: active ? '#2563eb' : '#64748b',
                  backgroundColor: active ? '#eff6ff' : 'transparent',
                }}
              >
                <span style={{ fontSize: '15px' }}>{item.emoji}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div style={{
          padding: '14px 16px', borderTop: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            backgroundColor: '#dbeafe', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', color: '#2563eb', fontWeight: '700', flexShrink: 0,
          }}>O</div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a' }}>Officer</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>ID: OP-884-AX</div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/admin" element={<AdminReview />} />
          <Route path="/live" element={<LiveCamera />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
