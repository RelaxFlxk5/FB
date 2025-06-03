import React, { useState } from 'react';

const ChatManager: React.FC = () => {
  const [pageAccessToken, setPageAccessToken] = useState('');
  const [fbPageId, setFbPageId] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = async () => {
    setLoading(true);
    setError(null);
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

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'Inter, Arial, sans-serif' }}>
      <h1>จัดการแชทรวม Facebook & IG</h1>
      <input
        type="text"
        placeholder="Facebook Page ID"
        value={fbPageId}
        onChange={e => setFbPageId(e.target.value)}
        style={{ width: 320, padding: 8, marginRight: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Page Access Token"
        value={pageAccessToken}
        onChange={e => setPageAccessToken(e.target.value)}
        style={{ width: 320, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <button
        style={{
          marginLeft: 12,
          padding: '8px 24px',
          fontWeight: 'bold',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: fbPageId && pageAccessToken ? 'pointer' : 'not-allowed',
        }}
        disabled={!fbPageId || !pageAccessToken}
        onClick={fetchChats}
      >
        ดึงแชท
      </button>
      {loading && <div style={{ marginTop: 16 }}>กำลังโหลด...</div>}
      {error && <div style={{ marginTop: 16, color: 'red' }}>{error}</div>}
      <div style={{ marginTop: 24 }}>
        {messages.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: 8, border: '1px solid #ddd' }}>Conversation ID</th>
                <th style={{ padding: 8, border: '1px solid #ddd' }}>Snippet</th>
                <th style={{ padding: 8, border: '1px solid #ddd' }}>Updated Time</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg: any) => (
                <tr key={msg.id}>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>{msg.id}</td>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>{msg.snippet}</td>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>{msg.updated_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ChatManager;