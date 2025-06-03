import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FacebookCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // อ่าน query string ที่ Facebook ส่งกลับมา
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (error) {
      alert('Facebook login failed: ' + error);
      navigate('/');
      return;
    }

    if (code) {
      // ส่ง code ไป backend เพื่อแลก access token
      fetch('https://fb-fc2o.onrender.com/api/auth/facebook/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // สำเร็จ: redirect ไป dashboard หรือเก็บ token ตามต้องการ
            navigate('/dashboard');
          } else {
            alert('Login failed: ' + (data.error || 'Unknown error'));
            navigate('/');
          }
        })
        .catch(() => {
          alert('เกิดข้อผิดพลาด');
          navigate('/');
        });
    } else {
      alert('No code found in callback');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>กำลังเข้าสู่ระบบด้วย Facebook...</h2>
    </div>
  );
};

export default FacebookCallback;