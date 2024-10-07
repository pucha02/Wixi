import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import CRUDproductRoutes from './routes/CRUDproductOperationsRoutes.js';
import categoryRoutes from './routes/CRUDcategoriesOperationsRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/CRUDproducts', CRUDproductRoutes);
app.use('/api/CRUDcategories', categoryRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
