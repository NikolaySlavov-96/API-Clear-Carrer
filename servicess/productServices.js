const Product = require("../models/Product");

async function getAll() {
    return Product.find({});
}

async function getById(id) {
    return Product.findById(id);
}

async function createProduct(product) {
    return Product.create(product);
}

async function updateProduct(id, product) {
    const productData = await Product.findById(id);

    productData.title = product.title;
    productData.imageUrl = product.imageUrl;
    productData.category = product.category;
    productData.description = product.description;
    productData.requirements = product.requirements;
    productData.salary = product.salary;

    await productData.save();
}

async function deleteById(id) {
    return Product.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteById
}