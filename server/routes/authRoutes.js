import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { User } from '../MongooseModels/User.js';

const router = express.Router();

router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.post('/logout-user', authenticateToken, (req, res) => {
    res.json({ message: 'Ви вийшли з акаунту' });
});
router.get('/get-information-for-user-account', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('orders');
        if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });

        res.json({
            number_phone: user.number_phone,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            orders: user.orders,
        });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні даних користувача' });
    }
});

router.get('/get-information-for-user-cart', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        
        if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });
        res.json({
            cart: user.cart
        });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні даних користувача' });
    }
});

export default router;
