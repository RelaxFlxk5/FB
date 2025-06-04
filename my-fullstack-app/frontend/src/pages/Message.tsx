import React, { useState } from 'react';
import SidebarLayout from '../components/SidebarLayout';

const inputStyle: React.CSSProperties = {
  width: 280,
  padding: '12px 14px',
  marginRight: 12,
  borderRadius: 8,
  border: '1.5px solid #e6eaf0',
  background: '#f7fafd',
  fontSize: 15,
  fontWeight: 500,
  color: '#1a2233',
  outline: 'none',
  transition: 'border 0.2s',
  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
};

const btnStyle: React.CSSProperties = {
  padding: '12px 28px',
  fontWeight: 700,
  background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontSize: 16,
  letterSpacing: 0.5,
  boxShadow: '0 2px 8px rgba(25,118,210,0.10)',
  transition: 'background 0.2s, box-shadow 0.2s',
  marginLeft: 8,
  outline: 'none',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  background: '#fff',
  borderRadius: 14,
  boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  overflow: 'hidden',
};

const thStyle: React.CSSProperties = {
  padding: 12,
  background: '#f5f8fa',
  borderBottom: '1.5px solid #e6eaf0',
  fontWeight: 700,
  color: '#1a2233',
  fontSize: 15,
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  padding: 12,
  borderBottom: '1px solid #f0f2f5',
  fontSize: 15,
  color: '#222',
  background: '#fff',
};

const actionBtnStyle: React.CSSProperties = {
  ...btnStyle,
  padding: '8px 18px',
  fontSize: 15,
  fontWeight: 600,
  background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
  boxShadow: '0 1px 4px rgba(67,206,162,0.10)',
  marginLeft: 0,
};

const chatCardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 18,
  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
  padding: '36px 32px 32px 32px',
  margin: '40px auto',
  maxWidth: 760,
  fontFamily: 'Inter, Arial, sans-serif',
  border: '1px solid #e6eaf0',
};

const ChatManager: React.FC = () => {
  const [pageAccessToken, setPageAccessToken] = useState('');
  const [fbPageId, setFbPageId] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [convMessages, setConvMessages] = useState<any[]>([]);
  const [convLoading, setConvLoading] = useState(false);

  const fetchChats = async () => {
    setLoading(true);
    setError(null);
    setSelectedConvId(null);
    setConvMessages([]);
    try {
      const res = await fetch('https://fb-fc2o.onrender.com/api/facebook/list-chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fbPageId, pageAccessToken }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.chats);
      } else {
        setError(data.error || 'เกิดข้อผิดพลาด');
      }
    } catch (e) {
      setError('ไม่สามารถเชื่อมต่อ API ได้');
    }
    setLoading(false);
  };

  const fetchConversation = async (convId: string) => {
    setSelectedConvId(convId);
    setConvLoading(true);
    setConvMessages([]);
    try {
      const res = await fetch('https://fb-fc2o.onrender.com/api/facebook/conversation-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: convId, pageAccessToken }),
      });
      const data = await res.json();
      if (data.success) {
        setConvMessages(data.messages);
      } else {
        setConvMessages([]);
      }
    } catch (e) {
      setConvMessages([]);
    }
    setConvLoading(false);
  };

  return (
    <SidebarLayout>
      <div style={chatCardStyle}>
        <h1 style={{
          fontWeight: 800,
          fontSize: 28,
          marginBottom: 18,
          color: '#1976d2',
          letterSpacing: -1,
          textAlign: 'center',
        }}>
          จัดการแชทรวม Facebook & IG
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, gap: 0 }}>
          <input
            type="text"
            placeholder="Facebook Page ID"
            value={fbPageId}
            onChange={e => setFbPageId(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Page Access Token"
            value={pageAccessToken}
            onChange={e => setPageAccessToken(e.target.value)}
            style={inputStyle}
          />
          <button
            style={{
              ...btnStyle,
              opacity: fbPageId && pageAccessToken ? 1 : 0.5,
              cursor: fbPageId && pageAccessToken ? 'pointer' : 'not-allowed',
            }}
            disabled={!fbPageId || !pageAccessToken}
            onClick={fetchChats}
          >
            ดึงแชท
          </button>
        </div>
        {loading && <div style={{ marginTop: 16, color: '#1976d2', fontWeight: 600 }}>กำลังโหลด...</div>}
        {error && <div style={{ marginTop: 16, color: '#e53935', fontWeight: 600 }}>{error}</div>}
        <div style={{ marginTop: 24 }}>
          {messages.length > 0 && (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Conversation ID</th>
                  <th style={thStyle}>Snippet</th>
                  <th style={thStyle}>Updated Time</th>
                  <th style={thStyle}>ดูประวัติ</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg: any) => (
                  <tr key={msg.id}>
                    <td style={tdStyle}>{msg.id}</td>
                    <td style={tdStyle}>{msg.snippet}</td>
                    <td style={tdStyle}>{msg.updated_time}</td>
                    <td style={tdStyle}>
                      <button style={actionBtnStyle} onClick={() => fetchConversation(msg.id)}>
                        ดูประวัติ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {selectedConvId && (
          <div style={{
            marginTop: 36,
            background: '#f7fafd',
            borderRadius: 12,
            padding: '24px 20px',
            boxShadow: '0 2px 8px rgba(25,118,210,0.05)',
          }}>
            <h3 style={{
              fontWeight: 700,
              fontSize: 20,
              color: '#1976d2',
              marginBottom: 16,
            }}>
              ประวัติแชท (Conversation ID: {selectedConvId})
            </h3>
            {convLoading && <div style={{ color: '#1976d2', fontWeight: 600 }}>กำลังโหลด...</div>}
            {convMessages.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {convMessages.map((m: any) => (
                  <li key={m.id} style={{
                    marginBottom: 18,
                    padding: '12px 16px',
                    background: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <span style={{
                      fontWeight: 700,
                      color: '#1976d2',
                      marginRight: 8,
                      minWidth: 90,
                    }}>
                      {m.from?.name || 'ไม่ทราบชื่อ'}:
                    </span>
                    <span style={{ flex: 1, color: '#222' }}>{m.message}</span>
                    <span style={{
                      color: '#888',
                      marginLeft: 16,
                      fontSize: 13,
                      minWidth: 120,
                      textAlign: 'right',
                    }}>
                      {m.created_time}
                    </span>
                  </li>
                ))}
              </ul>
            ) : !convLoading && <div style={{ color: '#888' }}>ไม่มีข้อความ</div>}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default ChatManager;