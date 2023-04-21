const express = require('express');
const trimBody = require('../middleware/trimBody');
const cors = require('../middleware/cors');
const session = require('../middleware/session');

module.exports = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());
}