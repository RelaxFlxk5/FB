import { Router } from 'express';
import axios from 'axios';

export const router = Router();

// POST /api/facebook/cta - สร้างปุ่ม Book Now CTA บน Facebook Page
router.post('/api/facebook/cta', async (req, res) => {
  const { fbPageId, bookingUrl, pageAccessToken } = req.body;
  if (!fbPageId || !bookingUrl || !pageAccessToken) {
    return res.status(400).json({ error: 'fbPageId, bookingUrl และ pageAccessToken จำเป็นต้องมี' });
  }
  try {
    const url = `https://graph.facebook.com/v19.0/${fbPageId}/call_to_actions`;
    const response = await axios.post(
      url,
      {
        type: 'BOOK_NOW',
        web_url: bookingUrl,
      },
      {
        params: {
          access_token: pageAccessToken,
        },
      }
    );
    return res.status(200).json({ success: true, fbResponse: response.data });
  } catch (err: any) {
    return res.status(500).json({ error: err?.response?.data?.error?.message || 'เกิดข้อผิดพลาด' });
  }
});

// POST /api/create-page-cta - alias สำหรับ /api/facebook/cta (รองรับ frontend เดิม)
router.post('/api/create-page-cta', async (req, res) => {
  const fbPageId = req.body.pageId ?? req.body.fbPageId;
  const bookingUrl = req.body.bookingUrl;
  const pageAccessToken = req.body.pageAccessToken;

  // Debug log สำหรับ input
  console.log('POST /api/create-page-cta', { pageId: req.body.pageId, fbPageId: req.body.fbPageId, bookingUrl, pageAccessToken });

  // ตรวจสอบและแจ้ง error กรณี field ว่าง
  if (!fbPageId) {
    return res.status(400).json({ error: 'fbPageId หรือ pageId จำเป็นต้องมี' });
  }
  if (!bookingUrl) {
    return res.status(400).json({ error: 'bookingUrl จำเป็นต้องมี' });
  }
  if (!pageAccessToken) {
    return res.status(400).json({ error: 'pageAccessToken จำเป็นต้องมี' });
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${fbPageId}/call_to_actions`;
    const response = await axios.post(
      url,
      {
        type: 'BOOK_NOW',
        web_url: bookingUrl,
      },
      {
        params: {
          access_token: pageAccessToken,
        },
      }
    );
    return res.status(200).json({ success: true, fbResponse: response.data });
  } catch (err: any) {
    console.error('Facebook API error:', err?.response?.data || err);
    return res.status(500).json({ error: err?.response?.data?.error?.message || 'เกิดข้อผิดพลาด' });
  }
});

// GET /api/facebook/health - สำหรับ health check
router.get('/api/facebook/health', (req, res) => {
  res.send('Facebook API controller is ready');
});
