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

    async function start({sender, recipient}) {

        await axios.post('http://cathost.ddns.net/chats', {
            participants: [sender, recipient]
        })
        .catch(err => console.error(err))
        
    }

    async function get(chatId) {
        try {
            const response = await axios.get(`http://cathost.ddns.net/chats/${chatId}`, {
                headers: authHeader
            })
            chat.value = response.data
        } catch(err) { console.log('getById error') }
    }

    async function sendMessage(chatId, sender, text) {
        try {
            await axios.post('http://cathost.ddns.net/chats/sendMessage', {
                sender: sender,
                text: text,
                chatId: chatId
            }, {
                headers: authHeader
            })
        }
        catch(err) { console.err('sendMessage error: ' + err) }
    }

    return {
        chat,
        start,
        get,
        sendMessage
    }
})

