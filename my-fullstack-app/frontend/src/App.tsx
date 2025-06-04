import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SystemUI from './components/SystemUI';
import FacebookCallback from './pages/FacebookCallback';
import Dashboard from './pages/Dashboard';
import ChatManager from './pages/Message';


export default function App() {
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [loadingFb, setLoadingFb] = useState(false);

  const handleOAuth = (url: string) => {
    window.location.href = url;
  };

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat-manager" element={<ChatManager />} />
        <Route
          path="/"
          element={
            <div
              style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e3f0ff 0%, #f9f9f9 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 56,
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: 400,
                  background: '#fff',
                  borderRadius: 18,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  padding: '40px 32px 32px 32px',
                  margin: '0 auto',
                }}
              >
                <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 8, color: '#222', letterSpacing: -1 }}>
                  เข้าสู่ระบบ
                </h1>
                <p style={{ color: '#666', marginBottom: 32, fontSize: 16 }}>
                  เลือกช่องทางเข้าสู่ระบบ
                </p>
                {showEmailForm && (
                  <form
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 16,
                      marginBottom: 32,
                      alignItems: 'stretch',
                    }}
                    onSubmit={e => {
                      e.preventDefault();
                      // TODO: call your email login API here
                      alert('เข้าสู่ระบบด้วย Email/Password (mock)');
                    }}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      style={{
                        padding: 12,
                        borderRadius: 6,
                        border: '1px solid #ccc',
                        fontSize: 15,
                        outline: 'none',
                        transition: 'border 0.2s',
                      }}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      style={{
                        padding: 12,
                        borderRadius: 6,
                        border: '1px solid #ccc',
                        fontSize: 15,
                        outline: 'none',
                        transition: 'border 0.2s',
                      }}
                      required
                    />
                    <button
                      type="submit"
                      style={{
                        padding: 12,
                        borderRadius: 6,
                        background: '#1976d2',
                        color: '#fff',
                        fontWeight: 600,
                        border: 'none',
                        fontSize: 16,
                        marginTop: 4,
                        letterSpacing: 0.5,
                        boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                    >
                      เข้าสู่ระบบ
                    </button>
                  </form>
                )}
                {/* Divider line before social login buttons */}
                <hr style={{ margin: '24px 0', border: 0, borderTop: '1px solid #eee' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <button
                    style={{
                      ...btnStyle,
                      background: '#1877f2',
                      color: '#fff',
                      opacity: loadingFb ? 0.7 : 1,
                      cursor: loadingFb ? 'not-allowed' : 'pointer',
                    }}
                    disabled={loadingFb}
                    onClick={async () => {
                      setLoadingFb(true);
                      try {
                        const res = await fetch('https://fb-fc2o.onrender.com/api/auth/facebook', {
                          method: 'POST',
                          credentials: 'include',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({}),
                        });
                        const data = await res.json();
                        if (data.url) {
                          window.location.href = data.url;
                        }
                      } finally {
                        setLoadingFb(false);
                      }
                    }}
                  >
                    {loadingFb ? '⏳ กำลังเชื่อมต่อ...' : '📘 Login with Facebook (Meta OAuth)'}
                  </button>
                  <button
                    style={{
                      ...btnStyle,
                      background: 'linear-gradient(90deg, #f58529 0%, #e1306c 100%)',
                      color: '#fff',
                    }}
                    // onClick={() => handleOAuth('/api/auth/instagram')}
                    disabled
                  >
                    📸 Login with Instagram (Meta OAuth)
                  </button>
                  <button
                    style={{ ...btnStyle, background: '#25d366', color: '#fff' }}
                    // onClick={() => handleOAuth('/api/auth/whatsapp')}
                    disabled
                  >
                    💬 Login with WhatsApp (Meta OAuth)
                  </button>
                  <button
                    style={{ ...btnStyle, background: '#000', color: '#fff' }}
                    // onClick={() => handleOAuth('/api/auth/x')}
                    disabled
                  >
                    𝕏 Login with X (Twitter OAuth 2.0)
                  </button>
                  <button
                    style={{ ...btnStyle, background: '#06c755', color: '#fff' }}
                    // onClick={() => handleOAuth('/api/auth/line')}
                    disabled
                  >
                    💚 Login with LINE (LINE Login API)
                  </button>
                  <button
                    style={{ ...btnStyle, background: '#010101', color: '#fff' }}
                    // onClick={() => handleOAuth('/api/auth/tiktok')}
                    disabled
                  >
                    🎵 Login with TikTok (TikTok Login Kit)
                  </button>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/auth/facebook/callback" element={<FacebookCallback />} />
      </Routes>
    </Router>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '13px',
  fontSize: 16,
  borderRadius: 8,
  border: 'none',
  background: '#f5f5f5',
  color: '#222',
  fontWeight: 500,
  transition: 'background 0.2s',
  marginTop: 0,
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  letterSpacing: 0.5,
};