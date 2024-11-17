import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: { type: String },
    color: { type: String },
    size: { type: String },
    quantity: { type: Number, default: 1 },
    cost: { type: Number }
});

const orderSchema = new mongoose.Schema({
    number_section_NP: { type: String },
    city: { type: String },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            title: { type: String },
            color: { type: String },
            size: { type: String },
            quantity: { type: Number },
            cost: { type: Number }
        }
    ],
    totalCost: { type: Number, required: true },
    number_phone: { type: String }
});

const userSchema = new mongoose.Schema({
    number_phone: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    cart: [cartItemSchema], // Добавляем корзину
    orders: [orderSchema]
});

export const User = mongoose.model('User', userSchema);
export const Order = mongoose.model('Order', orderSchema)
