import React, { useState } from 'react';

const mockShops = [
  { id: 'shop1', name: 'test A', fbPage: 'Betaskthai Dev ', fbPageId: '215721771615805' },
];

const Dashboard: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [bookingUrl, setBookingUrl] = useState('');
  const [pageAccessToken, setPageAccessToken] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [tab, setTab] = useState<'cta' | 'post'>('cta');
  const [postMessage, setPostMessage] = useState('');
  const [postResult, setPostResult] = useState<string | null>(null);

  const handleSetCTA = async () => {
    if (!selectedShop) return;
    const shop = mockShops.find(s => s.id === selectedShop);
    if (!shop) return;
    setResult('กำลังตั้งค่าปุ่ม...');
    try {
      const res = await fetch('https://fb-fc2o.onrender.com/api/facebook/cta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fbPageId: shop.fbPageId,
          bookingUrl,
          pageAccessToken,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult('✅ ตั้งค่าปุ่ม Booking Now สำเร็จ');
      } else {
        setResult('❌ ' + (data.error || 'เกิดข้อผิดพลาด'));
      }
    } catch (e) {
      setResult('❌ ไม่สามารถเชื่อมต่อ API ได้');
    }
  };

  const handleCreatePost = async () => {
    if (!selectedShop) return;
    const shop = mockShops.find(s => s.id === selectedShop);
    if (!shop) return;
    setPostResult('กำลังโพสต์...');
    try {
      const res = await fetch('https://fb-fc2o.onrender.com/api/facebook/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fbPageId: shop.fbPageId,
          pageAccessToken,
          message: postMessage,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPostResult('✅ โพสต์สำเร็จ! Post ID: ' + data.postId);
      } else {
        setPostResult('❌ ' + (data.error || 'เกิดข้อผิดพลาด'));
      }
    } catch (e) {
      setPostResult('❌ ไม่สามารถเชื่อมต่อ API ได้');
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'Inter, Arial, sans-serif' }}>
      <h1>Dashboard</h1>
      <h2>เลือกร้านค้า (Shop) และ Facebook Page</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>ร้านค้า</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Facebook Page</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Page ID</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>เลือก</th>
          </tr>
        </thead>
        <tbody>
          {mockShops.map(shop => (
            <tr key={shop.id}>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>{shop.name}</td>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>{shop.fbPage}</td>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>{shop.fbPageId}</td>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>
                <button
                  style={{
                    background: selectedShop === shop.id ? '#1976d2' : '#eee',
                    color: selectedShop === shop.id ? '#fff' : '#333',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedShop(shop.id)}
                >
                  {selectedShop === shop.id ? 'เลือกแล้ว' : 'เลือก'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedShop && (
        <div style={{ marginTop: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <button
              style={{
                padding: '8px 24px',
                borderRadius: 4,
                border: 'none',
                background: tab === 'cta' ? '#1976d2' : '#eee',
                color: tab === 'cta' ? '#fff' : '#333',
                fontWeight: tab === 'cta' ? 'bold' : 'normal',
                cursor: 'pointer',
              }}
              onClick={() => setTab('cta')}
            >
              ตั้งค่าปุ่ม Booking Now
            </button>
            <button
              style={{
                padding: '8px 24px',
                borderRadius: 4,
                border: 'none',
                background: tab === 'post' ? '#1976d2' : '#eee',
                color: tab === 'post' ? '#fff' : '#333',
                fontWeight: tab === 'post' ? 'bold' : 'normal',
                cursor: 'pointer',
              }}
              onClick={() => setTab('post')}
            >
              จัดการโพสต์บนเพจ
            </button>
          </div>
          {tab === 'cta' && (
            <>
              <h3>ตั้งค่าปุ่ม Booking Now สำหรับร้าน {mockShops.find(s => s.id === selectedShop)?.name}</h3>
              <input
                type="text"
                placeholder="Booking URL (ลิงก์จองคิว)"
                value={bookingUrl}
                onChange={e => setBookingUrl(e.target.value)}
                style={{ width: 320, padding: 8, marginRight: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
              <input
                type="text"
                placeholder="Page Access Token"
                value={pageAccessToken}
                onChange={e => setPageAccessToken(e.target.value)}
                style={{ width: 320, padding: 8, marginRight: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 8 }}
              />
              <br />
              <button
                style={{
                  marginTop: 12,
                  padding: '10px 28px',
                  fontWeight: 'bold',
                  background: '#43a047',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: bookingUrl && pageAccessToken ? 'pointer' : 'not-allowed',
                }}
                disabled={!bookingUrl || !pageAccessToken}
                onClick={handleSetCTA}
              >
                ตั้งค่าปุ่ม Booking Now
              </button>
              {result && <div style={{ marginTop: 16 }}>{result}</div>}
            </>
          )}
          {tab === 'post' && (
            <>
              <h3>โพสต์ข้อความบน Facebook Page</h3>
              <textarea
                placeholder="ข้อความโพสต์"
                value={postMessage}
                onChange={e => setPostMessage(e.target.value)}
                style={{ width: 400, height: 80, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
              <br />
              <input
                type="text"
                placeholder="Page Access Token"
                value={pageAccessToken}
                onChange={e => setPageAccessToken(e.target.value)}
                style={{ width: 320, padding: 8, marginTop: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
              <br />
              <button
                style={{
                  marginTop: 12,
                  padding: '10px 28px',
                  fontWeight: 'bold',
                  background: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: postMessage && pageAccessToken ? 'pointer' : 'not-allowed',
                }}
                disabled={!postMessage || !pageAccessToken}
                onClick={handleCreatePost}
              >
                โพสต์ข้อความ
              </button>
              {postResult && <div style={{ marginTop: 16 }}>{postResult}</div>}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;