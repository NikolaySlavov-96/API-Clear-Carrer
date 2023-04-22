const { addApply, getAllCounterApply, getSpecificData } = require('../servicess/applyServicess');
const { parserError } = require('../util/parser');

const applyController = require('express').Router();

applyController.post('/', async (req, res) => {
    try {
        await addApply(req.body.offerId, req.user._id);
        res.status(201).json({ message: 'Successfull create' });
    } catch (err) {
        const message = parserError(err);
        res.status(401).json({ message });
    }
});

applyController.get('/', async (req, res) => {

    const fundamentalInfo = req.query.where.split('=');
    
    if (req.query.where.includes('and')) {
        const idProduct = JSON.parse(fundamentalInfo[1].split(' ')[0]);
        const idOwner = JSON.parse(fundamentalInfo[2]);

        const data = await getSpecificData(idProduct, idOwner);
        res.status(200).json(data); // check type for error
    } else {
        const idProduct = JSON.parse(fundamentalInfo[1]);
        const allApply = await getAllCounterApply(idProduct);
        res.status(200).json(allApply); // chech type for error
    }
})

module.exports = applyController;