import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Разрешаем только запросы с фронтенда на порту 3000
    credentials: true, // Разрешаем отправку cookies  
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes)

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});