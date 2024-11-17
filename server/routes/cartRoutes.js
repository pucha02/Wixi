import express from 'express';
import { addToCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add-to-cart', addToCart);
router.post('/remove-from-cart', removeFromCart);

export default router;