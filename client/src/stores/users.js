import { defineStore } from "pinia";
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('users', () => {
    const users = ref('')
    const searchedUsers = ref('')

    async function getAll() {
        const response = await axios.get('http://cathost.ddns.net/users')
        users.value = response.data
    }

    async function getByUsername(username) {
        const response = await axios.get('http://cathost.ddns.net/users/', {
            params: {
                username: username
            }
        })
        searchedUsers.value = response.data
    }

    function getUsername(id) {
        const user = users.value.find(user => user.id == id)
        return user.username
    }

    return { 
        users, 
        searchedUsers, 
        getAll, 
        getByUsername, 
        getUsername 
    }
 
})

