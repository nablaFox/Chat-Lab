const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/vars')
const User = require('../models/user.model')

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: 'No authorization provided' });
    }
    
    const Auth = JSON.parse(req.headers.authorization)

    const token = Auth.accessToken
    const userId = Auth.userId
    const user = await User.findById(userId)
    
    if (!user) {
        return res.status(403).json({ msg: 'Forbidden'})
    }

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}