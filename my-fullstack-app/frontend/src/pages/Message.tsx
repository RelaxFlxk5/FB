import React, { useState } from 'react';
import SidebarLayout from '../components/SidebarLayout';

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
                <th style={{ padding: 8, border: '1px solid #ddd' }}>ดูประวัติ</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg: any) => (
                <tr key={msg.id}>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>{msg.id}</td>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>{msg.snippet}</td>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>{msg.updated_time}</td>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>
                    <button onClick={() => fetchConversation(msg.id)}>
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
        <div style={{ marginTop: 32 }}>
          <h3>ประวัติแชท (Conversation ID: {selectedConvId})</h3>
          {convLoading && <div>กำลังโหลด...</div>}
          {convMessages.length > 0 ? (
            <ul>
              {convMessages.map((m: any) => (
                <li key={m.id}>
                  <b>{m.from?.name || 'ไม่ทราบชื่อ'}:</b> {m.message}
                  <span style={{ color: '#888', marginLeft: 8 }}>{m.created_time}</span>
                </li>
              ))}
            </ul>
          ) : !convLoading && <div>ไม่มีข้อความ</div>}
        </div>
      )}
    </div></SidebarLayout>
  );
};

export default ChatManager;