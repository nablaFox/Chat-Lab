import { ref, computed } from 'vue'
import { defineStore } from "pinia"
import axios from 'axios'
import socket from '@services/socketio.js'

function update(chat, payload) {
    chat.messages.push(payload)
    chat.lastMessage = payload
}

export const useChatStore = defineStore('chats', () => {
    const chats = ref({})
    const chatId = ref('')
    const authHeader = ref({})
    const loaded = ref(false)

    const chat = computed(() => chats.value[chatId.value])

    async function init(userId, token) {
        authHeader.value = {
            'text-type': 'application/json',
            'Authorization': JSON.stringify(token)
        }

        // first check in the local memory.... then:
        const response = await axios.get(
            `http://cathost.ddns.net/chats/user/${userId}?preview=false`, 
            { headers: authHeader.value }
        ).catch(err => { alert(err.response.data) })

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

        loaded.value = true
    }

    function sendMessage(sender, recipient, text) {
        const response = axios.post(`http://cathost.ddns.net/chats/${chatId.value}`, {
            from: sender,
            text: text,
        }, {
            headers: authHeader.value
        }).catch(err => { alert(err.response.data) })

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
        loaded,
        init,
        sendMessage
    }
})