# Vercel Root Directory Setting (Backend)

**Root Directory** สำหรับ backend (Node.js/Express) ใน Vercel หรือบริการ deploy อื่น:

- ให้ตั้งค่า Root Directory ใน Vercel (หรือบริการ deploy อื่น) เป็น:
  ```
  my-fullstack-app/backend
  ```
- สำหรับ Node.js/Express backend, ให้แน่ใจว่าไฟล์ entry point (เช่น `src/app.ts` หรือ `dist/app.js`) อยู่ในโฟลเดอร์นี้

**สรุป:**  
- ใน Vercel Dashboard > Project > Settings > General > Root Directory  
- ใส่: `my-fullstack-app/backend`

**หมายเหตุ:**  
- ถ้าใช้ Vercel สำหรับ Node.js backend ให้ตั้ง Output Directory เป็น `dist` (หลัง build)
- ถ้าใช้บริการอื่น (เช่น Render, Railway, Fly.io) ให้เลือก root directory เป็น `my-fullstack-app/backend` เช่นกัน
