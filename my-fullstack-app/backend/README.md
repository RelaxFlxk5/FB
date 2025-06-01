# Vercel 404: NOT_FOUND (Code: NOT_FOUND)

**สาเหตุที่พบบ่อย:**
- ไม่มีไฟล์ `api` หรือไฟล์ entry point ที่ Vercel รู้จักใน root directory ที่ตั้งไว้
- สำหรับ Node.js/Express backend ต้องตั้งค่า Vercel ให้ใช้ Output Directory และ Start Command ที่ถูกต้อง

**วิธีแก้ไขสำหรับ Node.js/Express backend:**

1. **ตรวจสอบว่า build แล้วมีไฟล์ `dist/app.js`**
   - ต้องมีไฟล์ `dist/app.js` หลัง `npm run build`

2. **ตั้งค่าใน Vercel Dashboard**
   - **Root Directory:** `my-fullstack-app/backend`
   - **Build Command:** `npm run build`
   - **Output Directory:** (ปล่อยว่าง หรือใส่ `dist` ถ้าต้องการให้ Vercel copy ไฟล์ไป serve)
   - **Install Command:** `npm install`
   - **Start Command:** `npm run start`

3. **Vercel Project Settings**
   - ไปที่ Project > Settings > General > Build & Development Settings
   - ตรวจสอบว่า Root Directory, Build Command, Output Directory, Start Command ถูกต้อง

4. **หมายเหตุ**
   - Vercel เหมาะกับ Next.js/Frontend มากกว่า Node.js API (Express) แบบ pure
   - ถ้าใช้ Express API จริงจัง แนะนำ deploy ที่ Render, Railway, Fly.io, หรือ VPS จะง่ายกว่า

---

**สรุป:**  
- 404 NOT_FOUND จาก Vercel มักเกิดจากไม่ได้ตั้งค่า Root Directory หรือ Start Command ให้ถูกต้องสำหรับ Node.js backend  
- ตรวจสอบไฟล์ entry point (`dist/app.js`) และตั้งค่า Start Command เป็น `npm run start`
