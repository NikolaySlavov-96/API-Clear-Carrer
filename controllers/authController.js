const authController = require('express').Router();
const { body, validationResult } = require('express-validator');
const { register, login, logout } = require('../servicess/authServices');
const { parserError } = require('../util/parser');



authController.post('/login',
    body('email').isEmpty().withMessage('Email field is required'),
    body('password').isEmpty().withMessage('Password field is required'),
    async (req, res) => {
        try {
            const { error } = validationResult(req);
            if (error.length > 0) {
                throw error;
            }

            const body = req.body;
            const token = await login(body.email, body.password)
        } catch (err) {
            const message = parserError(err);
            res.status(400).json({ message });
        }
    });

authController.post('/register',
    body('email').isEmpty().withMessage('Email is required').bail(),
    body('email').isEmail().withMessage('Email addres not valid form'),
    body('password').isEmpty().withMessage('Password is required'),
    async (req, res) => {
        debugger
        //TO DO Validation Password Length
        try {
            const { error } = validationResult(req);
            if (error.length > 0) {
                throw error;
            }

            const body = req.body;
            const token = await register(body.email, body.password);
            res.json(token);
        } catch (err) {
            const message = parserError(err);
            res.status(400).json({ message });
        }
    });

authController.get('/logout', async (req, res) => {
    const token = req.token;
    await logout(token);
    res.status(204).end();
});

module.exports = authController;