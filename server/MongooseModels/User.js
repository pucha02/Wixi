import mongoose from 'mongoose'; 

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
    totalCost: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
    number_phone: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    orders: [orderSchema]
});

const User = mongoose.model('User', userSchema);

export default User; 
