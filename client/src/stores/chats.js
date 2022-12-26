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
    const chats = ref('')
    const chat = ref('')

    async function getByUser(userId) {
        try {
            const response = await axios.get(`http://cathost.ddns.net/chats/user/${userId}`, {
                headers: authHeader
            })
            chats.value = response.data
        } catch(err) {
            console.log('getByUser error')
            checkAuth(err)
        }
    }

    async function getById(chatId) {
        try {
            const response = await axios.get(`http://cathost.ddns.net/chats/${chatId}`, {
                headers: authHeader
            })
            chat.value = response.data
        } catch(err) { console.log('getById error') }
    }

    async function start(sender, recipient) {
        try {
            await axios.post('http://cathost.ddns.net/chats', {
                participants: [sender, recipient],
                sender: sender,
                recipient: recipient,
                messages: [{
                    timestamp: Date.now(),
                    sender: sender
                }]
            })
        } catch(err) {
            alert(err)
        }
    }

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
        catch(err) { console.log(err) }
    }

    function listen(userId) {
        const ws = new WebSocket('ws://cathost.ddns.net/ws', userId)

        ws.onmessage = (event) => {
            if (event.data != 'updateChats') {
                chat.value = JSON.parse(event.data)
            }
            getByUser(userId)
        }
    }

    return {
        chats,
        chat,
        getByUser,
        getById,
        start,
        listen,
        sendMessage
    }
})

