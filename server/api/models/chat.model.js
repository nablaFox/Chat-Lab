const mongoose = require("mongoose")
const { omitBy, isNil } = require('lodash')
const User = require('./user.model')
const { care } = require('../utils/error')

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        from: String,
        text: String,
        timestamp: Date
    }]
})

chatSchema.pre('save', async function(next) {
    const [_, err] = await care(async () => {
        if (this.participants[0].equals(this.participants[1])) {
            throw "Users cannot start a new chat with themselves"
        }

        const existingChat = await Chat.findOne({
            participants: { $all: [this.participants[0], this.participants[1]] }
        })

        if (existingChat && !this.messages.length) { // pensare ad un altro modo
            throw "The users already have a chat"
        }
    }, false)

    if (err) { next(err) }
})
 
chatSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    await User.updateMany(
        { chat: this._id }, 
        { $pull: { chat: this._id } }
    )
    next()
})

chatSchema.method({
    transform() {
        const transformed = {}
        const fields = [
            'id',
            'participants',
            'messages'
        ]
        
        fields.forEach(field => {
            transformed[field] = this[field]
        })

        return transformed
    }
})

chatSchema.statics = {
    async get(id) {
        let chat;
        if (mongoose.Types.ObjectId.isValid(id)) {
            chat = await this.findById(id)
        }
        if (chat) { return chat }

        throw 'chat does not exist'
    },

    async list({
        skip = 0, limit = 10,
        participants,
        messages
    }) {
        const options = omitBy({ 
            participants,
            messages
        }, isNil)

        return this
            .find(options)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec()
    }
}

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat