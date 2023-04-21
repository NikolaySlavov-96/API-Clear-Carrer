function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please login' });
        }
    }
}

function isGues() {
    return (req, res, next) => {
        if (req.user) {
            res.status(400).json({ message: 'You are alreqdy logind' });
        } else {
            next();
        }
    }
}

module.exports = {
    hasUser,
    isGues
}