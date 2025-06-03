import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'; // เพิ่มบรรทัดนี้
import { router as IndexRouter } from './controllers/IndexController';
import { router as FacebookRouter } from './controllers/FacebookController';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: ['https://fb-theta-one.vercel.app', 'localhost:3000'],
  // ถ้าใช้ cookie หรือ session ต้องตั้งค่า credentials เป็น true
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Database connection
// --- หากไม่ต้องการใช้ MongoDB หรือยังไม่ได้รัน MongoDB ให้ comment โค้ดนี้ชั่วคราว ---
// mongoose.connect('mongodb://localhost:27017/mydatabase')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', IndexRouter);
app.use(FacebookRouter); // เพิ่มบรรทัดนี้เพื่อ mount FacebookController

app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please stop the other process or use a different port.`);
    process.exit(1);
  } else {
    throw err;
  }
});

// แก้ไขปัญหา:
// 1. Cannot find module './controllers/IndexController'
//    - ตรวจสอบว่ามีไฟล์ src/controllers/IndexController.ts อยู่จริง
//    - ถ้าไม่มี ให้สร้างไฟล์เปล่าๆ ไว้ก่อน เช่น:
   // export const router = (req, res) => { res.send('OK'); };
// 2. useNewUrlParser และ useUnifiedTopology ไม่อยู่ใน ConnectOptions ของ mongoose v7+
//    - ให้ลบสอง property นี้ออกจาก options ของ mongoose.connect()

// ตัวอย่างการแก้ไข mongoose.connect():
// mongoose.connect(MONGO_URI); // ไม่ต้องใส่ useNewUrlParser/useUnifiedTopology

