import React, { useState } from 'react';

const mockShops = [
  { id: 'shop1', name: 'ร้านกาแฟ A', fbPage: 'Page A', fbPageId: '1234567890' },
  { id: 'shop2', name: 'ร้านอาหาร B', fbPage: 'Page B', fbPageId: '2345678901' },
];

const SystemUI: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'Inter, Arial, sans-serif' }}>
      <h1>ตั้งค่าปุ่ม Booking Now สำหรับ Facebook Page</h1>
      <p>
        เลือกร้านค้า (1 ร้านต่อ 1 Facebook Page) และตั้งค่าปุ่ม <b>Booking Now</b> สำหรับแต่ละร้าน รองรับหลายร้าน (Multi-shop)
      </p>
      <h2>เข้าสู่ระบบ</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <button>Login with Email</button>
        <button>Login with Facebook</button>
        <button>Login with Instagram</button>
        <button>Login with WhatsApp</button>
        <button>Login with X (Twitter)</button>
        <button>Login with LINE</button>
        <button>Login with TikTok</button>
      </div>
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
      <button
        style={{
          marginTop: 8,
          padding: '10px 28px',
          fontWeight: 'bold',
          background: selectedShop ? '#43a047' : '#bbb',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: selectedShop ? 'pointer' : 'not-allowed',
        }}
        disabled={!selectedShop}
        onClick={() => {
          if (selectedShop) {
            alert(`ตั้งค่าปุ่ม Booking Now ให้กับร้าน ${mockShops.find(s => s.id === selectedShop)?.name}`);
          }
        }}
      >
        ตั้งค่าปุ่ม Booking Now
      </button>
      <h3 style={{ marginTop: 32 }}>ขั้นตอนการเชื่อมต่อ Facebook Page</h3>
      <ol>
        <li>เข้าสู่ระบบด้วย Email หรือ Social Media</li>
        <li>เลือกร้านค้า (Shop) ที่ต้องการ</li>
        <li>กดปุ่ม <b>ตั้งค่าปุ่ม Booking Now</b></li>
        <li>ระบบจะตั้งค่าปุ่ม Booking Now ให้กับ Facebook Page ของร้านนั้น</li>
      </ol>
      <p style={{ marginTop: 24, color: '#888' }}>
        * ระบบนี้ใช้ Facebook Graph API ในการตั้งค่าปุ่ม Call-to-Action และเก็บข้อมูลความสัมพันธ์ระหว่างร้านค้าและเพจ
      </p>
    </div>
  );
};

export default SystemUI;
