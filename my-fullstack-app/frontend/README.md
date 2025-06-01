# Vercel Root Directory Setting

**Root Directory** สำหรับโปรเจค Next.js (frontend) ใน Vercel:
- ให้ตั้งค่า Root Directory ใน Vercel เป็น:  
  ```
  my-fullstack-app/frontend
  ```
- ถ้า deploy backend แยก ให้ตั้ง Root Directory backend เป็น:
  ```
  my-fullstack-app/backend
  ```
- สำหรับ Next.js, Vercel จะ detect และ build อัตโนมัติในโฟลเดอร์นี้

**สรุป:**  
- ใน Vercel Dashboard > Project > Settings > General > Root Directory  
- ใส่: `my-fullstack-app/frontend`

---

## คำตอบ

**backend ในโปรเจคนี้เป็น Node.js (Express + TypeScript) ไม่ใช่ Next.js**

- โฟลเดอร์ `my-fullstack-app/backend` ใช้ Express (Node.js) สำหรับ API server
- โฟลเดอร์ `my-fullstack-app/frontend` ใช้ Next.js (React) สำหรับ frontend

**สรุป:**  
- backend = Node.js (Express/TypeScript)
- frontend = Next.js (React)
