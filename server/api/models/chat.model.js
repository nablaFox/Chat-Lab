const mongoose = require("mongoose")
const { omitBy, isNil } = require('lodash')

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        sender: String,
        text: String,
        timestamp: Date
    }]
})


chatSchema.pre('save', async function save(next) {
    try {
        if (this.participants[0].equals(this.participants[1])) {
            throw new Error("Users cannot start a new chat with themselves")
        }

        const existingChat = await Chat.findOne({
            participants: { $all: [this.participants[0], this.participants[1]] }
        })

        if (existingChat) {
            throw new Error("The users already have a chat");
        }

        next()
    } catch(err) {
        next(err)
    }
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
            chat = await this.findById(id).exec();
        }
        if (chat) { return chat }
        console.log('chat does not exist')
    },

    list({
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