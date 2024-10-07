import mongoose from 'mongoose';
import Category from '../MongooseModels/Category.js'; 

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні категорій', error });
    }
};

export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Невірний формат ID категорії' });
    }

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Категорія не знайдена' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні категорії', error });
    }
};

export const createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: 'Помилка під час створення категорії', error });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Невірний формат ID категорії' });
    }

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Категорія не знайдена' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: 'Помилка під час оновлення категорії', error });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Невірний формат ID категорії' });
    }

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Категорія не знайдена' });
        }
        res.status(200).json({ message: 'Категорія видалена' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при видаленні категорії', error });
    }
};
