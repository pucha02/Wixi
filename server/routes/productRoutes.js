import express from 'express'; 
import { getProductsByCategory } from '../controllers/productController.js'; 

const router = express.Router();

router.get('/get-products-by-category', getProductsByCategory);

export default router; 
