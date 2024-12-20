import express from 'express';
import { getPromoCodeByCode } from '../controllers/promocodeController.js';
import { checkPromoCode } from '../controllers/promocodeController.js';
import { checkLastPromoCode } from '../controllers/promocodeController.js';
const router = express.Router();

router.get('/get-promocode-by-code', getPromoCodeByCode);
router.post('/check-promo', checkPromoCode);
router.post('/check-promocode', checkLastPromoCode);
export default router;