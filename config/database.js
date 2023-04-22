const mongoose = require('mongoose');

const DB_STRING = 'mongodb://192.168.88.50:27017/clear-carrer';

module.exports = async (app) => {
    try {
        await mongoose.connect(DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // await mongoose.connect(DB_STRING); // or up
        console.log('DB Success Connect');
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}