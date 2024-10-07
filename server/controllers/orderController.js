import Product from '../MongooseModels/Product.js'; 
import User from '../MongooseModels/User.js'; 

export const registerOrder = async (req, res) => {
    const { number_phone, orderData, totalCost } = req.body;

    try {
        const user = await User.findOne({ number_phone });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // const products = await Product.find({ _id: { $in: orderData.products.map(p => p.product) } });

        // if (products.length !== orderData.products.length) {
        //     return res.status(400).json({ message: 'One or more products not found' });
        // }

        const newOrder = {
            number_section_NP: orderData.number_section_NP,
            city: orderData.city,
            products: orderData.products.map(item => ({
                product: item.product,
                color: item.color,
                size: item.size,
                quantity: item.quantity,
                cost: item.cost
            })),
            totalCost
        };

        user.orders.push(newOrder);
        await user.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
