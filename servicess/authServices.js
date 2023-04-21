const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = 'geoit3i23rjfeif';
const tokenBlackList = new Set();

async function register(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (user) {
        throw new Error('Email addres is taken');
    }

    const createAccount = await User.create({
        email,
        password: await bcrypt.hash(password, 10)
    });

    return createToken(createAccount);
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Email or Password not correct');
    }

    const hashMatch = await bcrypt.compare(password, user.password);

    if (!hashMatch) {
        throw new Error('Email or Password not correct');
    }

    return createToken(user);
}

async function logout(token) {
    tokenBlackList.add(token);
}

function createToken({ _id, email }) {
    const payload = {
        _id,
        email
    }

    return {
        _id,
        email,
        accessToken: jwt.sign(payload, secret)
    }
}

function parseToken(token) {
    if (tokenBlackList.has(token)) {
        throw new Error('Token is Blacklisted');
    }

    return jwt.verify(token, secret);
}

module.exports = {
    register,
    login,
    logout,
    createToken,
    parseToken
}