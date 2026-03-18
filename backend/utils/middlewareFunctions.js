const jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema');

module.exports.isAuthenticate = async (req, res, next) => {
    const token = req.cookies?.token;
    console.log(token)
    try {
        if (!token)
            return res.status(401).json({ type: 'error', message: 'Unauthorised' })

        const user = await jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = user;

        next()
    } catch (error) {
        res.clearCookie('token');
        return res.status(403).json({ type: 'error', message: 'Fake or Expired Credentials' })
    }
}

module.exports.isRoleAllowed = (...roles) => {
    return async (req, res, next) => {

        const user = await userSchema.findById(req.user?.id);

        if (!user || !roles.includes(req.user.role))
            return res.status(403).json({ type: 'error', message: 'Access denied!' })
        next();
    }
}