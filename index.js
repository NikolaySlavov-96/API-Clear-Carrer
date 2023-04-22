const https = require('https');
const fs = require('fs');
const express = require('express');
const useConfig = require('./config/useConfig');
const database = require('./config/database');
const router = require('./config/router');

const PORT = 3030;

/*
const option = {
    key: fs.readFileSync('../key-PRK.pem'),
    cert: fs.readFileSync('../cert-CRT.pem'),
    ca: [
        fs.readFileSync('../ca-bundle.pem'),
    ]
}
*/

start();

async function start() {

    const app = express();
    await database(app);
    // https.createServer(option, app).listen(PORT, () => console.log('Server workin on ' + PORT));

    app.get('/', (req, res) => {
        res.json({ message: 'Contunue' }).end();
    })

    useConfig(app);
    router(app);

    app.listen(PORT, () => console.log('Server workin on ' + PORT));
}