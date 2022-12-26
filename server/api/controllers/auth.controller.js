const User = require('../models/user.model')
const httpStatus = require('http-status')

function generateToken(user, accessToken) {
    const userId = user._id
    const tokenType = 'Bearer'

    return {
        userId,
        accessToken,
        tokenType
    }
}

exports.register = async (req, res, next) => {
    try {
        const user = await new User(req.body).save()
        const userTransformed = user.transform()
        const token = generateToken(user, user.token())
        res.status(httpStatus.CREATED).json({ token, user: userTransformed })
    } catch(err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { user, accessToken } = await User.findAndGenerateToken(req.body)
        const userTransformed = user.transform()
        const token = generateToken(user, accessToken)
        res.json({ token, user: userTransformed })
    } catch(err) {
        next(err)
    }
}
