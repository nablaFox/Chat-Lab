import { ref, computed } from 'vue'
import { defineStore } from "pinia"
import axios from 'axios'


const token = JSON.stringify(JSON.parse(localStorage.getItem('user')).token)
const authHeader = {
    'Content-type': 'application/json',
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

    async function init(id) {
        chatId.value = id
        if (chats.value[id]) { return }

        const response = await axios.get(`http://localhost:3000/chats/${id}`, {
            headers: authHeader
        })
            .catch(err => console.error(err.response.data))

        if (!response) { return }

        chats.value[id] = response.data
    }

    // async function loadMore(page) { }

    async function sendMessage(sender, text) {
        await axios.post(`http://cathost.ddns.net/chats/${chatId.value}`, {
            sender: sender,
            text: text
        }, {
            headers: authHeader
        })
            .catch(err => console.error(err.response.data))
    }

    return {
        chat,
        chats,
        chatId,
        create,
        init,
        sendMessage
    }
})