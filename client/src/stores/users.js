import { defineStore } from "pinia"
import { ref } from 'vue'
import axios from 'axios'
import { useFetch } from '@vueuse/core'

export const useUserStore = defineStore('users', () => {
    const user = ref('')

    async function get(id) {
        
        const response = await axios.get(`http://localhost:3000/users/${id}`)
            .catch(err => console.error(err))

        user.value = response.data

    }

    return { 
        user,
        get,
    }
 
})

