import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_jwt_secret_key';

// export const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ message: 'Немає доступу' });

//     try {
//         const verified = jwt.verify(token.split(' ')[1], JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json({ message: 'Неправильний токен' });
//     }
// };

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    // Логируем куки для дебага
    console.log('Cookies:', req.cookies);  // Выведет все куки
    console.log('Token:', token);  // Выведет токен, если он есть

    if (!token) {
        return res.status(401).json({ message: 'Немає доступу, токен відсутній' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; 
        next(); 
    } catch (err) {
        console.log('Ошибка при проверке токена:', err);  // Лог ошибки
        return res.status(400).json({ message: 'Неправильний або прострочений токен' });
    }
};