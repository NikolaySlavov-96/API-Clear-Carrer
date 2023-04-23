const productController = require('express').Router();
const { hasUser } = require('../middleware/guards');
const { getAll, getById, deleteById, updateProduct, createProduct } = require('../servicess/productServices');
const { parserError } = require('../util/parser');


productController.get('/', async (req, res) => {
    const product = await getAll();
    res.json(product);
});

productController.post('/', hasUser(), async (req, res) => {
    try {
        const data = Object.assign({ _ownerId: req.user._id }, req.body);
        const item = await createProduct(data);
        res.json(item)
    } catch (err) {
        const message = parserError(err);
        res.status(400).json({ message });
    }
});

productController.get('/:id', async (req, res) => {
    const product = await getById(req.params.id);
    res.json(product);
});

productController.put('/:id', hasUser(), async (req, res) => {
    const product = await getById(res.params.id);
    if (req.user._id != product._ownerId) {
        return res.status(403).json({ message: 'You cannot modify thhis records' });
    }

    try {
        const result = await updateProduct(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        const message = parserError(err);
        res.status(400).json({ message });
    }
});

productController.delete('/:id', hasUser(), async (req, res) => {
    const product = await deleteById(req.params.id);

    if (req.user._id != product._ownerId) {
        return res.status(403).json({ message: 'You cannot modify this records' });
    }

    try {
        await deleteById(req.params.id);
        res.status(204).end();
    } catch (err) {
        const message = parserError(err);
        res.status(400).json({ message });
    }
});

module.exports = productController;