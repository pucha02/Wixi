import Product from '../MongooseModels/Product.js'; 
import Category from '../MongooseModels/Category.js'; 

export const getProductsByCategory = async (req, res) => {
    const { category } = req.query;
    try {
        const foundCategory = await Category.findOne({ title: category });
        
        if (!foundCategory) {
            return res.status(404).json({ message: 'Категорія не знайдена' });
        }
        const products = await Product.find({ 'category': foundCategory._id});
        
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Помилка отримання даних', error });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const { search } = req.query; 

        const query =  { title: { $regex: `(^|\\s)${search}`, $options: 'i' } }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Помилка отримання даних', error });
    }
};
