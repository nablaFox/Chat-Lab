import { ref, computed } from 'vue'
import { defineStore } from "pinia"
import axios from 'axios'
import socket from '@socket'

const token = JSON.stringify(JSON.parse(localStorage.getItem('user')).token)
const authHeader = {
    'text-type': 'application/json',
    'Authorization': token,
}


export const useChatStore = defineStore('chats', () => {
    const chats = ref({})
    const chatId = ref('')

    const chat = computed(() => chats.value[chatId.value])

    async function create(sender, recipient) {
        await axios.post('http://cathost.ddns.net/chats', {
            participants: [sender, recipient]
        })
            .catch(err => console.error(err.response.data))
    }

    function update(chat, payload) {
        chat.messages.push(payload)
        chat.lastMessage = payload
    }

    async function init(id) {
        const response = await axios.get(`http://localhost:3000/chats/user/${id}`)
            .catch(err => console.error(err.response.data))

        if (!response) { return }

        response.data.forEach(chat => {
            chats.value[chat._id] = { ...chat }
        })

        socket.listenMessages(({ text, from, timestamp }) => {  
            Object.values(chats.value).forEach(chat => {
                if (chat.recipient._id === from) {
                    update(chat, {
                        text,
                        from,
                        timestamp
                    })
                }
            })
        })
    }

    async function load(id) {
        chatId.value = id
        if (chats.value[id].messages) { return }

        const response = await axios.get(`http://localhost:3000/chats/${id}`, {
            headers: authHeader
        })
            .catch(err => console.error(err.response.data))
    
        if (!response) { return }

        chats.value[id].messages = response.data.messages
    }

    async function sendMessage(sender, recipient, text) {
        await axios.post(`http://cathost.ddns.net/chats/${chatId.value}`, {
            from: sender,
            text: text
        }, {
            headers: authHeader
        })
            .catch(err => console.error(err.response.data))

        socket.sendMessage(recipient, text)
        update(chat.value, {
            from: sender,
            text: text,
            timestamp: new Date()
        })
    }

    return {
        chat,
        chats,
        chatId,
        create,
        init,
        load,
        sendMessage
    }
})