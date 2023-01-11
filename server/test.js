const axios = require('axios')

const sender = '639f5c843501a6439491a4f6'
const recipient = '63a247c2b6b65f94d9ef39a1'
const message = 'first message'


axios.post('http://cathost.ddns.net/chats', {
    participants: [sender, recipient],
    messages: [{
        sender: sender,
        text: message,
        timestamp: new Date()
    }]
})

