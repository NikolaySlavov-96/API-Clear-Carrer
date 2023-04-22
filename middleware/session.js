const { parseToken } = require("../servicess/authServices");

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (token) {
        const payload = parseToken(token);
        req.user = payload;
        req.token = token;
    } else {
        res.status(401).json({ message: 'Invalid authorization token' });
    }

    next()
}