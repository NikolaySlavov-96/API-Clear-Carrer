const authController = require("../controllers/authController");
const productController = require("../controllers/productController");


module.exports = (app) => {
    app.get('/', (req, res) => {
        res.json({ message: 'REST API workin correct' });
    })
    app.use('/users', authController);
    app.use('/data', productController);
}