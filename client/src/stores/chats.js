import { ref, computed } from 'vue'
import { defineStore } from "pinia"
import axios from 'axios'
import socket from '@socket'

export const useChatStore = defineStore('chats', () => {
    const token = JSON.stringify(JSON.parse(localStorage.getItem('user')).token)
    const authHeader = {
        'text-type': 'application/json',
        'Authorization': token,
    }

    const chats = ref({})
    const chatId = ref('')

    const chat = computed(() => chats.value[chatId.value])

    async function create(sender, recipient) {
        await axios.post('http://cathost.ddns.net/chats', {
            participants: [sender, recipient]
        })
            .catch(err => alert(err.response.data))
    }

    function update(chat, payload) {
        chat.messages.push(payload)
        chat.lastMessage = payload
    }

    async function init(id) {
        const response = await axios.get(`http://cathost.ddns.net/chats/user/${id}`)
            .catch(err => alert(err.response.data))

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
        if (chats.value[id].messages) { return  }

        const response = await axios.get(`http://cathost.ddns.net/chats/${id}`, {
            headers: authHeader
        })
            .catch(err => alert(err.response.data))
    
        if (!response) { return }

        chats.value[id].messages = response.data.messages
    }

    function sendMessage(sender, recipient, text) {
        const response = axios.post(`http://cathost.ddns.net/chats/${chatId.value}`, {
            from: sender,
            text: text,
        }, {
            headers: authHeader
        })
            .catch(err => alert(err.response.data))

        if (!response) { return }

        socket.sendMessage(recipient, text)
        update(chat.value, {
            from: sender,
            text: text,
            timestamp: new Date().toString()
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