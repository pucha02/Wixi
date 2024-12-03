import Cart from "../MongooseModels/Cart.js";
import { User } from "../MongooseModels/User.js";
import { ObjectId } from "mongodb";

export const addToCart = async (req, res) => {
    const { userId, _id, title, cost, quantity, color, discount, originalCost } = req.body;  // Извлекаем данные из запроса
    console.log("Received request to add to cart:", { userId, _id, title, cost, quantity, color, discount, originalCost });

    try {
        // Проверка наличия обязательных полей
        if (!userId || !_id || !title || !cost || !quantity) {
            return res.status(400).json({ error: 'Invalid data: userId, _id, title, cost, and quantity are required' });
        }

        // Поиск пользователя по userId
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found:", userId);
            return res.status(404).json({ error: 'User not found' });
        }

        // Проверка, существует ли уже товар в корзине
        const existingProduct = user.cart.find(item => item._id.toString() === _id);
        console.log("Existing product in cart:", existingProduct);

        if (existingProduct) {
            console.log("Updating quantity of existing product:", existingProduct);
            // Обновление количества товара в корзине
            await User.updateOne(
                { _id: userId, 'cart._id': _id },
                { $inc: { 'cart.$.quantity': quantity } }
            );
            console.log("Product quantity updated");
        } else {
            console.log("Adding new product to cart:", { _id, title, cost, quantity, color, discount, originalCost });
            // Добавление нового товара в корзину
            await User.updateOne(
                { _id: userId },
                { $push: { cart: { _id, title, cost, quantity, color, discount, originalCost } } }
            );
            console.log("New product added to cart");
        }

        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        console.error("Error occurred while adding product to cart:", error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
};


export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    
    console.log("Received request to remove product from cart:", { userId, productId });

    try {
        if (!userId || !productId) {
            console.error("Invalid data: userId and productId are required");
            return res.status(400).json({ error: 'Invalid data: userId and _id are required' });
        }

        console.log(`Attempting to remove product with ID ${productId} from user ${userId}'s cart`);

        const result = await User.updateOne(
            { _id: userId },
            { $pull: { cart: { _id: new ObjectId(productId) } } }
        );

        console.log("Update result:", result);

        if (result.modifiedCount === 0) {
            console.warn("No products were removed. It might not exist in the cart.");
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        console.log("Product removed successfully");

        res.status(200).json({ message: 'Product completely removed from cart' });
    } catch (error) {
        console.error("Error occurred while removing product:", error);
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
};