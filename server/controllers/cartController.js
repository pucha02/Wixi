import Cart from "../MongooseModels/Cart.js";
import { User } from "../MongooseModels/User.js";

export const addToCart = async (req, res) => {
    const { userId, product } = req.body;

    try {
        const user = await User.findById(userId);
        const existingProduct = user.cart.find(item => item._id.toString() === product._id);

        if (existingProduct) {
            await User.updateOne(
                { _id: userId, 'cart._id': product._id },
                { $inc: { 'cart.$.quantity': product.quantity || 1 } }
            );
        } else {
            await User.updateOne(
                { _id: userId },
                { $push: { cart: { ...product, quantity: product.quantity || 1 } } }
            );
        }

        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
};

export const removeFromCart = async (req, res) => {
    const { userId, product } = req.body;

    try {
        await User.updateOne(
            { _id: userId },
            { $pull: { cart: { _id: product._id } } }
        );

        res.status(200).json({ message: 'Product completely removed from cart' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
}