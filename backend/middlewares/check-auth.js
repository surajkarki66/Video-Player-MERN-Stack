const jwt = require('jsonwebtoken');

const key = require('../configs/default').secret_key;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, key);
        req.userData = decoded;
        next();
    } catch (error) {
        // 401: unauthenticated
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};