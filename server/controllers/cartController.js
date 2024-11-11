import Cart from "../MongooseModels/Cart.js";
import User from "../MongooseModels/User.js";

export const addToCart = async (req, res) => {
    const { userId, product } = req.body;

    try {
        // Найти пользователя и проверить, есть ли уже товар в корзине
        const user = await User.findById(userId);
        const existingProduct = user.cart.find(item => item._id.toString() === product._id);

        if (existingProduct) {
            // Если товар уже есть, увеличиваем количество
            await User.updateOne(
                { _id: userId, 'cart._id': product._id },
                { $inc: { 'cart.$.quantity': product.quantity || 1 } }
            );
        } else {
            // Если товара нет, добавляем его в корзину
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
        // Полностью удаляем товар из корзины пользователя
        await User.updateOne(
            { _id: userId },
            { $pull: { cart: { _id: product._id } } }
        );

        res.status(200).json({ message: 'Product completely removed from cart' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
}