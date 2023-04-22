const { parseToken } = require("../servicess/authServices");

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (token) {
        try {
            const payload = parseToken(token);
            req.user = payload;
            req.token = token;

        } catch (err) {
            res.status(401).json({ message: 'Invalid authorization token' });
        }
    }
    next()
}