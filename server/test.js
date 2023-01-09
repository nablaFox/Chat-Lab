const axios = require('axios')

const sender = '639f5d4991f91df2eddc483d'
const recipient = '63a7307040e6219c0a73a9f0'
const text = 'hello world'
const chatId = '63bade087ce2e06a7c5f9eb0'

axios.post('http://cathost.ddns.net/chats/sendMessage', {
    participants: [sender, recipient],
    sender: sender,
    recipient: recipient,
    text: text,
    chatId: chatId
})