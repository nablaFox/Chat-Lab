const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const { omitBy, isNil } = require('lodash')

const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    bio: String
})

userSchema.pre('save', async function save(next) {
    try {
        if (!this.isModified('password')) return next()

        const rounds = env === 'development' ? 1 : 10
        const hash = await bcrypt.hash(this.password, rounds);
        this.password = hash;

        next()
    } catch(err) {
        next(err)
    }
})


userSchema.method({
    transform() {
        const transformed = {}
        const fields = [
            'id', 
            'username',
            'password',
            'email',
            'bio'
        ]

        fields.forEach(field => {
            transformed[field] = this[field]
        })

        return transformed
    },

    token() {
        const payload = {
            exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
            iat: moment().unix(),
            sub: this._id
        }
        return jwt.sign(payload, jwtSecret)
    },

    async passwordMatches(password) {
        return bcrypt.compare(password, this.password);
    }

})


userSchema.statics = {
    async get(id) {
        let user;
        if (mongoose.Types.ObjectId.isValid(id)) {
            user = await this.findById(id).exec();
        }
        if (user) { return user }
        console.log('User does not exist')
    },

    list({
        skip = 0, limit = 30,
        username,
        password,
        email,
        bio
    }) {
        const options = omitBy({ 
            username,
            password,
            email,
            bio
        }, isNil)

        if (username) {
            options.username = { $regex: username, $options: "i" }
        }

        return this
            .find(options)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec()
    },

    async findAndGenerateToken(options) {
        const { username, password } = options;
        if (!username) { }

        const user = await this.findOne({ username }).exec()

        if (user && await user.passwordMatches(password)) {
            return { user, accessToken: user.token() }
        }
        else {  }
    }
}

module.exports = mongoose.model('User', userSchema)