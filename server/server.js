const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./MongooseModels/User');


mongoose.connect('mongodb+srv://wixi4598:gj2TIqB9qCzKUeeR@cluster0.zoliw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5000, () => {
            console.log('Сервер запущено на порту 5000');
        });
    })
    .catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your_jwt_secret_key';


app.post('/register-user', async (req, res) => {
    const { number_phone, firstname, lastname, email, password } = req.body;

    if (!number_phone || !firstname || !lastname || !password) {
        return res.status(400).json({ message: "Заповніть всі обов'язкові поля" });
    }

    try {
        const existingUser = await User.findOne({ number_phone });
        if (existingUser) {
            return res.status(400).json({ message: 'Користувач з таким номером телефону вже існує' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            number_phone,
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Користувач успішно зареєстрований' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка реєстрації' });
    }
});

app.post('/login-user', async (req, res) => {
    const { number_phone, password } = req.body;
    
    try {
        const user = await User.findOne({ number_phone });
        if (!user) {
            return res.status(400).json({ message: 'Користувача з таким номером телефону не знайдено' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Неправильний пароль' });
        }
        
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при вході' });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Немає доступу' });

    try {
        const verified = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Неправильний токен' });
    }
};

app.post('/logout-user', authenticateToken, (req, res) => {
    res.json({ message: 'Успішний вихід' });
});

app.get('/get-information-for-user-account', authenticateToken, async (req, res) => {
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


