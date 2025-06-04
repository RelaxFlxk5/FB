import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const menu = [
  { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { path: '/chat-manager', label: 'รวมแชท', icon: '💬' },
//   { path: '/message', label: 'ประวัติแชท', icon: '📜' },
  // เพิ่มเมนูอื่นๆ ได้ที่นี่
];

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f0ff 0%, #f9f9f9 100%)'
    }}>
      <aside style={{
        width: 220,
        background: '#fff',
        boxShadow: '2px 0 16px 0 rgba(25,118,210,0.07)',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 0 0 0',
        zIndex: 2,
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: 22,
          color: '#1976d2',
          textAlign: 'center',
          marginBottom: 32,
          letterSpacing: 1,
        }}>
          FB Booking
        </div>
        <nav>
          {menu.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 32px',
                color: location.pathname === item.path ? '#1976d2' : '#222',
                background: location.pathname === item.path ? '#e3f0ff' : 'transparent',
                fontWeight: location.pathname === item.path ? 600 : 400,
                textDecoration: 'none',
                borderLeft: location.pathname === item.path ? '4px solid #1976d2' : '4px solid transparent',
                transition: 'background 0.2s, color 0.2s',
                cursor: 'pointer',
                fontSize: 17,
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ flex: 1 }} />
        <div style={{
          padding: 24,
          fontSize: 13,
          color: '#aaa',
          textAlign: 'center'
        }}>
          &copy; {new Date().getFullYear()} FB Booking
        </div>
      </aside>
      <main style={{
        flex: 1,
        padding: '40px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 900,
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '40px 32px 32px 32px',
          margin: '0 24px',
        }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;