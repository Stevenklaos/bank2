const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('Authorization');
    if(!token) return res.status(400).json({error: "Access Denied"});
    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (error) {
        res.status(400).json({error: "Ups.."});
    }
}