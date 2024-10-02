const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    number_section_NP: { type: String, required: true },
    city: { type: String, required: true },
    products: [
        {
            type: Map, // Здесь можно настроить продукты в виде объекта с произвольными полями
            of: String
        }
    ]
});

const userSchema = new mongoose.Schema({
    number_phone: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    orders: [orderSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;