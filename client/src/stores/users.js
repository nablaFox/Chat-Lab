import { defineStore } from "pinia"
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('users', () => {
    const user = ref({})
    const chat = ref({})

    async function get(id) {
        const response = await axios.get(`https://chat-lab.icedcube.net/users/${id}`)
            .catch(err => console.error(err))


        user.value = response.data
    }

    return { 
        user,
        get,
    }
 
})

