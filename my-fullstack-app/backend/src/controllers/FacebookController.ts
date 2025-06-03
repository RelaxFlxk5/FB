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

// POST /api/auth/facebook - Generate Facebook OAuth URL and return to frontend
router.post('/api/auth/facebook', (req, res) => {
  // You can receive data from req.body if needed (e.g., state, custom params)
  const clientId = '237505309262020';
  const frontendBaseUrl = 'https://fb-theta-one.vercel.app';
  const redirectUri = encodeURIComponent(`${frontendBaseUrl}/auth/facebook/callback`);
  const scope = 'email,public_profile,pages_manage_metadata,pages_read_engagement,pages_manage_engagement';
  const fbAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&auth_type=rerequest`;
  // Respond with the URL for the frontend to redirect
  res.json({ url: fbAuthUrl });
});

// POST /api/auth/facebook/callback - รับ code แล้วแลก access token
router.post('/api/auth/facebook/callback', async (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).json({ error: 'Missing code' });
  }

  const clientId = '237505309262020';
  const clientSecret = process.env.FB_CLIENT_SECRET || '90800acafa3015637be435006fc7d9d5';
  const frontendBaseUrl = process.env.FRONTEND_BASE_URL || 'https://fb-theta-one.vercel.app';
  const redirectUri = `${frontendBaseUrl}/auth/facebook/callback`;

  try {
    // ขอ access token จาก Facebook
    const tokenRes = await axios.get('https://graph.facebook.com/v19.0/oauth/access_token', {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      },
    });

    const accessToken = (tokenRes.data as { access_token: string }).access_token;

    // (Optional) ดึงข้อมูล user เพิ่มเติม
    // const userRes = await axios.get('https://graph.facebook.com/me', {
    //   params: { access_token: accessToken, fields: 'id,name,email' },
    // });

    // ส่งกลับ frontend (หรือ set cookie/session ตามต้องการ)
    res.json({ success: true, accessToken /*, user: userRes.data */ });
  } catch (err: any) {
    res.status(500).json({ error: err?.response?.data?.error?.message || 'Facebook token exchange failed' });
  }
});

// GET /api/facebook/health - สำหรับ health check
router.get('/api/facebook/health', (req, res) => {
  res.send('Facebook API controller is ready');
});

// GET /api/verify-webhook - สำหรับ Facebook Webhook Verification
router.get('/api/verify-webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'EAADYAoOXQMQBOxmZBZA8mX6Y1o2YSNItRF2s2ZBhcs7ICUUNcU7Gf1sq8YYmnJszsII5qFOnKm1hXexbvby5ExDfqA4tLDAtPhjyS00YIph6PgvZBhbenYVEYKkAfgNAqcGhaV1kJF1fVZB1vibwzrmFgbLVOMy9km77Sg0KKC6IuNO5qjhWLMlfoZC85fy4bUDzkindQ2NBX7zPUj'; // ตั้งค่าใน .env หรือใส่ตรงนี้

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});
