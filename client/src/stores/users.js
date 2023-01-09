import { defineStore } from "pinia";
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('users', () => {
    const users = ref('')
    const user = ref('')
    const contact = ref('') // optimize loading and reusing

    async function get(id) {
        const response = await axios.get(`http://localhost:3000/users/${id}`)
        user.value = response.data
    }

    async function getContact(id) {
        const response = await axios.get(`http://localhost:3000/users/${id}`)
        // filter private data

        contact.value = response.data
    }

    async function getAll() {
        const response = await axios.get('http://cathost.ddns.net/users')
        users.value = response.data
    }

    return { 
        users,
        user,
        get,
        getContact,
        getAll
    }
 
})

