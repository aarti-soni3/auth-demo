const jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema');

module.exports.isAuthenticate = async (req, res, next) => {
    const accessToken = req.headers.authorization && req.headers.authorization.split(" ")[1];
    try {
        if (!accessToken)
            return res.status(401).json({ type: 'error', message: 'Unauthorised' })

        const user = await jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        req.user = user;

        next()
    } catch (error) {
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