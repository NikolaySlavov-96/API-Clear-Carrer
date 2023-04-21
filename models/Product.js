const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    title: { type: String, require: true },
    imageUrl: { type: String, require: true },
    category: { type: String, require: true },
    description: { type: String, require: true },
    requirements: { type: String, require: true },
    salary: { type: Number, require: true },
})

const Product = model('Product', productSchema);

module.exports = Product;