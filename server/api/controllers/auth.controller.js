const User = require('../models/user.model')
const httpStatus = require('http-status')

exports.register = async (req, res, next) => {
    try {
        const user = await new User(req.body).save()
        const userTransformed = user.transform()
        const token = user.token()
        res.status(httpStatus.CREATED).json({ token, user: userTransformed })

    } catch(err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { user, accessToken } = await User.findAndGenerateToken(req.body)
        const userTransformed = user.transform()
        res.json({ accessToken, user: userTransformed })
    } catch(err) {
        next(err)
    }
}
