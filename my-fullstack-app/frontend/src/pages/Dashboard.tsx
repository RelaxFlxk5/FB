import React, { useState } from 'react';
import SidebarLayout from '../components/SidebarLayout';

const mockShops = [
  { id: 'shop1', name: 'test A', fbPage: 'Betaskthai Dev ', fbPageId: '215721771615805' },
];

export default function Dashboard() {
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
    <SidebarLayout>
      <div
        style={{
          maxWidth: 760,
          margin: '48px auto',
          fontFamily: 'Inter, Arial, sans-serif',
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          padding: '40px 36px 36px 36px',
          border: '1px solid #e6eaf0',
        }}
      >
        <h1 style={{
          fontWeight: 800,
          fontSize: 30,
          marginBottom: 8,
          color: '#1976d2',
          letterSpacing: -1,
          textAlign: 'center',
        }}>Dashboard</h1>
        <h2 style={{
          fontWeight: 700,
          fontSize: 20,
          marginBottom: 24,
          color: '#222',
          textAlign: 'center',
        }}>
          เลือกร้านค้า (Shop) และ Facebook Page
        </h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            marginBottom: 20,
            background: '#fff',
            borderRadius: 14,
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            overflow: 'hidden',
          }}
        >
          <thead>
            <tr style={{ background: '#f5f8fa' }}>
              <th style={{
                padding: 14,
                borderBottom: '1.5px solid #e6eaf0',
                fontWeight: 700,
                color: '#1a2233',
                fontSize: 15,
                textAlign: 'left',
              }}>ร้านค้า</th>
              <th style={{
                padding: 14,
                borderBottom: '1.5px solid #e6eaf0',
                fontWeight: 700,
                color: '#1a2233',
                fontSize: 15,
                textAlign: 'left',
              }}>Facebook Page</th>
              <th style={{
                padding: 14,
                borderBottom: '1.5px solid #e6eaf0',
                fontWeight: 700,
                color: '#1a2233',
                fontSize: 15,
                textAlign: 'left',
              }}>Page ID</th>
              <th style={{
                padding: 14,
                borderBottom: '1.5px solid #e6eaf0',
                fontWeight: 700,
                color: '#1a2233',
                fontSize: 15,
                textAlign: 'left',
              }}>เลือก</th>
            </tr>
          </thead>
          <tbody>
            {mockShops.map(shop => (
              <tr key={shop.id} style={{ background: selectedShop === shop.id ? '#e3f0ff' : '#fff' }}>
                <td style={{
                  padding: 14,
                  borderBottom: '1px solid #f0f2f5',
                  fontSize: 15,
                  color: '#222',
                }}>{shop.name}</td>
                <td style={{
                  padding: 14,
                  borderBottom: '1px solid #f0f2f5',
                  fontSize: 15,
                  color: '#222',
                }}>{shop.fbPage}</td>
                <td style={{
                  padding: 14,
                  borderBottom: '1px solid #f0f2f5',
                  fontSize: 15,
                  color: '#222',
                }}>{shop.fbPageId}</td>
                <td style={{
                  padding: 14,
                  borderBottom: '1px solid #f0f2f5',
                }}>
                  <button
                    style={{
                      background: selectedShop === shop.id
                        ? 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)'
                        : '#f5f5f5',
                      color: selectedShop === shop.id ? '#fff' : '#1976d2',
                      border: 'none',
                      padding: '8px 22px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: 15,
                      boxShadow: selectedShop === shop.id
                        ? '0 2px 8px rgba(25,118,210,0.10)'
                        : 'none',
                      transition: 'background 0.2s, color 0.2s',
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
          <div style={{
            marginTop: 32,
            marginBottom: 24,
            background: '#f7fafd',
            borderRadius: 14,
            padding: '32px 28px',
            boxShadow: '0 2px 8px rgba(25,118,210,0.05)',
          }}>
            <div style={{ display: 'flex', gap: 18, marginBottom: 28 }}>
              <button
                style={{
                  padding: '10px 32px',
                  borderRadius: 8,
                  border: 'none',
                  background: tab === 'cta'
                    ? 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)'
                    : '#e6eaf0',
                  color: tab === 'cta' ? '#fff' : '#1976d2',
                  fontWeight: tab === 'cta' ? 700 : 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: tab === 'cta'
                    ? '0 2px 8px rgba(25,118,210,0.10)'
                    : 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => setTab('cta')}
              >
                ตั้งค่าปุ่ม Booking Now
              </button>
              <button
                style={{
                  padding: '10px 32px',
                  borderRadius: 8,
                  border: 'none',
                  background: tab === 'post'
                    ? 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)'
                    : '#e6eaf0',
                  color: tab === 'post' ? '#fff' : '#1976d2',
                  fontWeight: tab === 'post' ? 700 : 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: tab === 'post'
                    ? '0 2px 8px rgba(25,118,210,0.10)'
                    : 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => setTab('post')}
              >
                จัดการโพสต์บนเพจ
              </button>
            </div>
            {tab === 'cta' && (
              <>
                <h3 style={{
                  fontWeight: 700,
                  fontSize: 19,
                  color: '#1976d2',
                  marginBottom: 18,
                }}>
                  ตั้งค่าปุ่ม Booking Now สำหรับร้าน {mockShops.find(s => s.id === selectedShop)?.name}
                </h3>
                <input
                  type="text"
                  placeholder="Booking URL (ลิงก์จองคิว)"
                  value={bookingUrl}
                  onChange={e => setBookingUrl(e.target.value)}
                  style={{
                    width: 340,
                    padding: '13px 16px',
                    marginRight: 10,
                    borderRadius: 8,
                    border: '1.5px solid #e6eaf0',
                    background: '#fff',
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#1a2233',
                    outline: 'none',
                    transition: 'border 0.2s',
                    marginBottom: 10,
                  }}
                />
                <input
                  type="text"
                  placeholder="Page Access Token"
                  value={pageAccessToken}
                  onChange={e => setPageAccessToken(e.target.value)}
                  style={{
                    width: 340,
                    padding: '13px 16px',
                    marginRight: 10,
                    borderRadius: 8,
                    border: '1.5px solid #e6eaf0',
                    background: '#fff',
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#1a2233',
                    outline: 'none',
                    transition: 'border 0.2s',
                    marginBottom: 10,
                  }}
                />
                <br />
                <button
                  style={{
                    marginTop: 16,
                    padding: '13px 36px',
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: bookingUrl && pageAccessToken ? 'pointer' : 'not-allowed',
                    fontSize: 16,
                    boxShadow: '0 2px 8px rgba(67,206,162,0.10)',
                    transition: 'background 0.2s, box-shadow 0.2s',
                  }}
                  disabled={!bookingUrl || !pageAccessToken}
                  onClick={handleSetCTA}
                >
                  ตั้งค่าปุ่ม Booking Now
                </button>
                {result && <div style={{ marginTop: 18, fontWeight: 600, color: result.startsWith('✅') ? '#43a047' : '#e53935' }}>{result}</div>}
              </>
            )}
            {tab === 'post' && (
              <>
                <h3 style={{
                  fontWeight: 700,
                  fontSize: 19,
                  color: '#1976d2',
                  marginBottom: 18,
                }}>
                  โพสต์ข้อความบน Facebook Page
                </h3>
                <textarea
                  placeholder="ข้อความโพสต์"
                  value={postMessage}
                  onChange={e => setPostMessage(e.target.value)}
                  style={{
                    width: 420,
                    height: 90,
                    padding: '13px 16px',
                    borderRadius: 8,
                    border: '1.5px solid #e6eaf0',
                    background: '#fff',
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#1a2233',
                    outline: 'none',
                    transition: 'border 0.2s',
                    marginBottom: 10,
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder="Page Access Token"
                  value={pageAccessToken}
                  onChange={e => setPageAccessToken(e.target.value)}
                  style={{
                    width: 340,
                    padding: '13px 16px',
                    borderRadius: 8,
                    border: '1.5px solid #e6eaf0',
                    background: '#fff',
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#1a2233',
                    outline: 'none',
                    transition: 'border 0.2s',
                    marginBottom: 10,
                  }}
                />
                <br />
                <button
                  style={{
                    marginTop: 16,
                    padding: '13px 36px',
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: postMessage && pageAccessToken ? 'pointer' : 'not-allowed',
                    fontSize: 16,
                    boxShadow: '0 2px 8px rgba(25,118,210,0.10)',
                    transition: 'background 0.2s, box-shadow 0.2s',
                  }}
                  disabled={!postMessage || !pageAccessToken}
                  onClick={handleCreatePost}
                >
                  โพสต์ข้อความ
                </button>
                {postResult && <div style={{ marginTop: 18, fontWeight: 600, color: postResult.startsWith('✅') ? '#43a047' : '#e53935' }}>{postResult}</div>}
              </>
            )}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};