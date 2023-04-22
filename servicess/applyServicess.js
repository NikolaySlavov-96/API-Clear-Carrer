const Product = require("../models/Product");
const User = require("../models/User");

async function addApply(offerId, userId) {
    const procut = await Product.findById(offerId);
    procut.applyUser.push(userId);
    return await procut.save();
}

async function getAllCounterApply(id) {
    const counter = await Product.findById(id);
    return counter.applyUser.length;
}

async function getSpecificData(idProduct, idOwner) {
    const counter = await Product.findById(idProduct);
    const data = counter.applyUser.map(p => p.toString()).includes(idOwner);
    return data ? 1 : 0;
}

module.exports = {
    addApply,
    getAllCounterApply,
    getSpecificData
}