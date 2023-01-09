import { defineStore } from "pinia";
import { ref } from 'vue'
import axios from 'axios'
import router from '@router'

const token = JSON.stringify(JSON.parse(localStorage.getItem('user')).token)
const authHeader = {
    'Content-type': 'application/json',
    'Authorization': token,
}

function checkAuth(err) {
    if (
        err.response === '401'
        || err.response === '403'
    ) {
        router.push('/login')
    }
}    

export const useChatStore = defineStore('chats', () => {
    const chat = ref('')
    const ws = ref(null)

    async function start(sender, recipient) {
        try {
            await axios.post('http://cathost.ddns.net/chats', {
                participants: [sender, recipient]
            })
        } catch(err) {
            alert(err)
        }
    }

    async function get(chatId) {
        try {
            const response = await axios.get(`http://cathost.ddns.net/chats/${chatId}`, {
                headers: authHeader
            })
            chat.value = response.data
        } catch(err) { console.log('getById error') }
    }

    function listen(userId) {
        ws.value = new WebSocket('ws://cathost.ddns.net/ws', userId)

        ws.value.onmessage = (event) => {
            if (event.data != 'updateChats') {
                chat.value = JSON.parse(event.data)
            }
            getByUser(userId)
        }
    }

    function close() { ws.value.close() }

    async function sendMessage(chatId, sender, recipient, text) {
        try {
            await axios.post('http://cathost.ddns.net/chats/sendMessage', {
                participants: [sender, recipient],
                sender: sender,
                recipient: recipient,
                text: text,
                chatId: chatId
            }, {
                headers: authHeader
            })
        }
        catch(err) { console.err('sendMessage error: ' + err) }
    }

 /*    function dateFormatter(date) {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "2-digit", 
            minute: '2-digit',
            hour12: false
        })
    }

    function lastMessage(chat) {
        const message = chat.messages[chat.messages.length - 1]
        const text = message.text

        let date = message.timestamp
        let diff = Math.abs(new Date(date) - new Date())
        diff = Math.floor(diff / (1000 * 60 * 60))

        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurstday", "Friday", "Saturday"];

        if (diff >= 24) {
            date = 'yesterday'
        } else if (diff >= 48) {
            date = weekdays[new Date(date).getDay()]
        } else if (diff >= 7) {
            date = new Date(date).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        } else {
            date = dateFormatter(date)
        }

        return { text, date }
    } */

    return {
        chat,
        start,
        get,
        listen,
        close,
        sendMessage
    }
})

