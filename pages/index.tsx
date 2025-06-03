import React, { useState } from 'react';

export default function Home() {
  const [showEmailForm, setShowEmailForm] = useState(true);

  const handleOAuth = (url: string) => {
    window.location.href = url;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #e3f0ff 0%, #f9f9f9 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 64,
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          padding: '48px 36px 36px 36px',
          margin: '0 auto',
          border: '1px solid #e6eaf0',
        }}
      >
        <h1
          style={{
            fontWeight: 800,
            fontSize: 34,
            marginBottom: 10,
            color: '#1a2233',
            letterSpacing: -1.2,
            textAlign: 'center',
          }}
        >
          เข้าสู่ระบบ
        </h1>
        <p
          style={{
            color: '#6b7685',
            marginBottom: 36,
            fontSize: 17,
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          เลือกช่องทางเข้าสู่ระบบ
        </p>
        {showEmailForm && (
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              marginBottom: 36,
              alignItems: 'stretch',
            }}
            onSubmit={e => {
              e.preventDefault();
              alert('เข้าสู่ระบบด้วย Email/Password (mock)');
            }}
          >
            <input
              type="email"
              placeholder="Email"
              style={{
                padding: '14px 16px',
                borderRadius: 8,
                border: '1.5px solid #e6eaf0',
                fontSize: 16,
                outline: 'none',
                transition: 'border 0.2s',
                background: '#f7fafd',
                fontWeight: 500,
                color: '#1a2233',
              }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={{
                padding: '14px 16px',
                borderRadius: 8,
                border: '1.5px solid #e6eaf0',
                fontSize: 16,
                outline: 'none',
                transition: 'border 0.2s',
                background: '#f7fafd',
                fontWeight: 500,
                color: '#1a2233',
              }}
              required
            />
            <button
              type="submit"
              style={{
                padding: '14px',
                borderRadius: 8,
                background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                fontSize: 17,
                marginTop: 4,
                letterSpacing: 0.5,
                boxShadow: '0 2px 8px rgba(25,118,210,0.10)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              เข้าสู่ระบบ
            </button>
          </form>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <button
            style={{
              ...btnStyle,
              background: 'linear-gradient(90deg, #1877f2 0%, #0052cc 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(24,119,242,0.10)',
            }}
            onClick={() => {
              const clientId = '237505309262020';
              const redirectUri = encodeURIComponent('https://0bbf6dfm-3000.asse.devtunnels.ms/auth/facebook/callback');
              const scope = 'email,public_profile,pages_manage_metadata,pages_read_engagement,pages_manage_engagement';
              const fbAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&auth_type=rerequest`;
              window.location.href = fbAuthUrl;
            }}
          >
            <span style={{ fontSize: 20, marginRight: 8 }}>📘</span>
            Login with Facebook (Meta OAuth)
          </button>
          <button
            style={{
              ...btnStyle,
              background: 'linear-gradient(90deg, #f58529 0%, #e1306c 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(229,48,108,0.10)',
            }}
            onClick={() => handleOAuth('/api/auth/instagram')}
          >
            <span style={{ fontSize: 20, marginRight: 8 }}>📸</span>
            Login with Instagram (Meta OAuth)
          </button>
          <button
            style={{
              ...btnStyle,
              background: 'linear-gradient(90deg, #25d366 0%, #128c7e 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(37,211,102,0.10)',
            }}
            onClick={() => handleOAuth('/api/auth/whatsapp')}
          >
            <span style={{ fontSize: 20, marginRight: 8 }}>💬</span>
            Login with WhatsApp (Meta OAuth)
          </button>
          <button
            style={{
              ...btnStyle,
              background: 'linear-gradient(90deg, #000 0%, #434343 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            }}
            onClick={() => handleOAuth('/api/auth/x')}
          >
            <span style={{ fontSize: 20, marginRight: 8 }}>𝕏</span>
            Login with X (Twitter OAuth 2.0)
          </button>
          <button
            style={{
              ...btnStyle,
              background: 'linear-gradient(90deg, #06c755 0%, #00b900 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(6,199,85,0.10)',
            }}
            onClick={() => handleOAuth('/api/auth/line')}
          >
            <span style={{ fontSize: 20, marginRight: 8 }}>💚</span>
            Login with LINE (LINE Login API)
          </button>
          <button
            style={{
              ...btnStyle,
              background: 'linear-gradient(90deg, #010101 0%, #333 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(1,1,1,0.10)',
            }}
            onClick={() => handleOAuth('/api/auth/tiktok')}
          >
            <span style={{ fontSize: 20, marginRight: 8 }}>🎵</span>
            Login with TikTok (TikTok Login Kit)
          </button>
        </div>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '14px 0',
  fontSize: 16,
  borderRadius: 8,
  border: 'none',
  background: '#f5f5f5',
  color: '#222',
  fontWeight: 600,
  transition: 'background 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
  marginBottom: 0,
  marginTop: 0,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  letterSpacing: 0.5,
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
};
