import type { Request, Response } from 'express';
import axios from 'axios';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') return res.status(405).end();

  const { fbPageId, bookingUrl, pageAccessToken } = req.body;
  if (!fbPageId || !bookingUrl || !pageAccessToken) {
    return res.status(400).json({ error: 'fbPageId, bookingUrl และ pageAccessToken จำเป็นต้องมี' });
  }

  try {
    // เรียก Facebook Graph API เพื่อ set CTA
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
}
