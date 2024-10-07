import mongoose from 'mongoose'; 

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    type: { type: String },
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

export default Product; 
