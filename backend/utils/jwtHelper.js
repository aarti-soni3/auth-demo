const jwt = require('jsonwebtoken')

module.exports.signAccessToken = (user) => {
    const token = jwt.sign({ id: user._id.toString(), username: user.username, role: user.role }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
    return token
}