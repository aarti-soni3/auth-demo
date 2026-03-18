module.exports.setTokenCookie = (res, value) => {
    return res.cookie('token', value, {
        httpOnly: true,
        sameSite: 'Lax',
        maxAge: 3600000
    })
}

module.exports.removeTokenCookie = (res) => {
    return res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Lax',
        // path: '/'
    })
}