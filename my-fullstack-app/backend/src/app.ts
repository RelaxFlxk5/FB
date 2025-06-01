import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { router as IndexRouter } from './controllers/IndexController';
import { router as FacebookRouter } from './controllers/FacebookController';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
// --- หากไม่ต้องการใช้ MongoDB หรือยังไม่ได้รัน MongoDB ให้ comment โค้ดนี้ชั่วคราว ---
// mongoose.connect('mongodb://localhost:27017/mydatabase')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', IndexRouter);
app.use(FacebookRouter); // เพิ่มบรรทัดนี้เพื่อ mount FacebookController

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

// แก้ไขปัญหา:
// 1. Cannot find module './controllers/IndexController'
//    - ตรวจสอบว่ามีไฟล์ src/controllers/IndexController.ts อยู่จริง
//    - ถ้าไม่มี ให้สร้างไฟล์เปล่าๆ ไว้ก่อน เช่น:
   // export const router = (req, res) => { res.send('OK'); };
// 2. useNewUrlParser และ useUnifiedTopology ไม่อยู่ใน ConnectOptions ของ mongoose v7+
//    - ให้ลบสอง property นี้ออกจาก options ของ mongoose.connect()

// ตัวอย่างการแก้ไข mongoose.connect():
// mongoose.connect(MONGO_URI); // ไม่ต้องใส่ useNewUrlParser/useUnifiedTopology

