import { defineStore } from "pinia";
import { ref } from 'vue'
import axios from 'axios'


export const useUserStore = defineStore('users', () => {
    const users = ref('')
    const searchedUsers = ref(null)
    const user = ref('')

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

    async function getById(userId) {
        const response = await axios.get(`http://cathos.ddns.net/users/${userId}`)
        user.value = response.data;
    }


    function getUsername(id) {
        try {
            const user = users.value.find(user => user.id == id)
            return user ? user.username : undefined
        } catch(err) {
            
        }
        
    }

    return { 
        users, 
        user, 
        searchedUsers, 
        getAll, 
        getByUsername, 
        getById, 
        getUsername 
    }
 
})

