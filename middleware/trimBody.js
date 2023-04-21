module.exports = () => (req, res, next) => {
    for (const key in req.body) {
        if (typeof req.body[key] == 'string') {
            res.body[key] = req.body[key].trim();
        }
    }
    next();
}