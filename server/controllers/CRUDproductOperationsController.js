import Product from '../MongooseModels/Product.js'; 

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні товарів', error });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Товар не знайдено' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні товару', error });
    }
};

export const createProduct = async (req, res) => {
    try {
        if (!req.body.category) {
            return res.status(400).json({ message: 'Не вказана категорія товару' });
        }

        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Помилка під час створення товару', error });
    }
};

export const updateProduct = async (req, res) => {
    try {
        if (!req.body.category) {
            return res.status(400).json({ message: 'Не вказана категорія товару' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Товар не знайдено' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Помилка під час оновлення товару', error });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Товар не знайдено' });
        }
        res.status(200).json({ message: 'Товар видалено' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при видаленні товару', error });
    }
};
