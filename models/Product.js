const { model, Schema, Types: { ObjectId } } = require('mongoose');

const productSchema = new Schema({
    title: { type: String, require: true },
    imageUrl: { type: String, require: true },
    category: { type: String, require: true },
    description: { type: String, require: true },
    requirements: { type: String, require: true },
    salary: { type: Number, require: true },
    applyUser: { type: [ObjectId], require: true, ref: 'User', default: [] },
    _ownerId: { type: ObjectId, ref: 'User', require: true, }
})

const Product = model('Product', productSchema);

module.exports = Product;