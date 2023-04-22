const authController = require("../controllers/authController");
const productController = require("../controllers/productController");


module.exports = (app) => {

    app.get('/', (req, res) => {
        res.json({ message: 'Success' })
    })
    app.use('/users', authController);
    app.use('/data/offers', productController);
    // app.use('/data/applications', );
    app.get('*', (req, res) => {
        res.status(404).json({ message: 'Page not Found' })
    })
}