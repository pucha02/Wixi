import express from 'express'; 
import { registerUser, loginUser } from '../controllers/authController.js'; 
import { authenticateToken } from '../middlewares/authMiddleware.js'; 
import User from '../MongooseModels/User.js'; 

const router = express.Router();

router.get('/get-information-for-user-account', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('orders');
        if (!user) return res.status(404).json({ message: 'Користувач не знайдено' });

        res.json({
            number_phone: user.number_phone,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            orders: user.orders,
        });
    } catch (error) {
        res.status(500).json({ message: 'Помилка отримання даних користувача' });
    }
});

router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.post('/logout-user', authenticateToken, (req, res) => {
    res.json({ message: 'Успішний вихід' });
});

export default router; 
