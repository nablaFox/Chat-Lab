import { defineStore } from "pinia";
import { ref } from 'vue'
import axios from 'axios'

const ws = new WebSocket('ws://cathost.ddns.net/ws')

export const useChatStore = defineStore('chats', () => {
    const chats = ref('')
    const chat = ref('')

    async function getByUser(userId) {
        const response = await axios.get(`http://cathost.ddns.net/chats/user/${userId}`)
        chats.value = response.data
    }

    async function getById(chatId) {
        const response = await axios.get(`http://cathost.ddns.net/chats/${chatId}`)
        chat.value = response.data
    }

    async function start(sender, recipient) {
        try {
            await axios.post('http://cathost.ddns.net/chats', {
                participants: [sender, recipient],
                messages: [{
                    timestamp: Date.now(),
                    sender: sender
                }]
            })
        } catch(err) {
            alert(err)
        }
    }

    function listen(userId) {

        ws.onmessage = (event) => {
            if (event.data != 'updateChat') {
                chat.value = JSON.parse(event.data)
            }
            getByUser(userId)
        }
    }

    function sendMessage(chatId, sender, recipient, text) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.accessToken;

        return axios.post('http://cathost.ddns.net/chats/sendMessage', {
            participants: [sender, recipient],
            sender: sender,
            text: text,
            chatId: chatId
        }, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        })
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

