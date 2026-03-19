const UserSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken } = require('../utils/jwtHelper');

module.exports.createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, role, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserSchema({ firstname: firstname, lastname: lastname, email: email, role: role, username: username, password: hashedPassword });
        await user.validate();
        await user.save();

        const accessToken = signAccessToken(user)
        const refreshToken = signRefreshToken(user)

        const userData = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            role: user.role,
            email: user.email,
        };

        return res.status(201).json({
            type: 'success',
            message: 'Login Successful',
            user: userData,
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    } catch (error) {
        return res.status(500).json({ type: 'error', message: error.message })
    }
}

module.exports.loginUser = async (req, res) => {
    const loginUser = { username: req.body.username, password: req.body.password }

    try {
        const user = await UserSchema.findOne({ username: loginUser.username });

        if (!user) {
            console.info('user is not exist')
            return res.status(401).json({ type: 'error', message: 'User not exists' });
        }

        const isMatch = await bcrypt.compare(loginUser.password, user.password)

        if (isMatch) {
            const accessToken = signAccessToken(user)
            const refreshToken = signRefreshToken(user)

            const userData = {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                role: user.role,
                email: user.email,
            };

            return res.status(200).json({
                type: 'success',
                message: 'Login Successful',
                user: userData,
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        }
        else {
            return res.status(403).json({ type: 'error', message: 'Invalid creadentials' })
        }
    } catch (error) {
        return res.status(500).json({ type: 'error', message: error.message })
    }
}

module.exports.logoutUser = (req, res) => {
    // removeTokenCookie(res);
    res.status(200).json({ type: 'success', message: 'Logged out successfully!' })
}