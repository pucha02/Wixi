const mongoose = require('mongoose');

// Схема товара (product)
const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },

    category: {
        id: { type: Number, required: true },
        title: { type: String, required: true },
    },
    description: { type: String, default: null },
    cost: { type: String },
    color: [
        {
            color_name: { type: String },
            sizes: [{
                size_name: { type: String }
            }],
            img: [{
                img_link: { type: String }
            }]
        }
    ]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;