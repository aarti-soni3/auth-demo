const UserSchema = require('../models/userSchema');

module.exports.getUser = async (req, res) => {
    const user = await UserSchema.findById({ _id: req.user.id }, { firstname: 1, lastname: 1, username: 1, email: 1, role: 1 });
    if (!user)
        return res.status(401).json({ type: 'error', message: 'invalid creadentials' })

    console.log('user data : ',user)
    return res.status(200).json({ user: user });
}

module.exports.getManager = async (req, res) => {
    const manager = await UserSchema.findById({ _id: req.user.id }, { firstname: 1, lastname: 1, username: 1, email: 1, role: 1 });
    if (!manager)
        return res.status(401).json({ type: 'error', message: 'invalid creadentials' })

    console.log('manager data : ',manager)
    return res.status(200).json({ user: manager });
}

module.exports.getAdmin = async (req, res) => {
    const admin = await UserSchema.findById({ _id: req.user.id }, { firstname: 1, lastname: 1, username: 1, email: 1, role: 1 });
    if (!admin)
        return res.status(401).json({ type: 'error', message: 'invalid creadentials' })
    console.log('admin data : ', admin)
    return res.status(200).json({ user: admin });
}