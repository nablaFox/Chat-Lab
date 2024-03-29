import { defineStore } from "pinia";
import { ref } from 'vue'
import router from '@router'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')))

    async function login(username, password) {
        try {
            const response = await axios.post('https://chat-lab.icedcube.net/auth/login', {
                username: username,
                password: password
            })
            user.value = response.data
            localStorage.setItem('user', JSON.stringify(user.value))
            router.push(`/users/${user.value.user.id}`)
        } catch(error) {
            alert(error)
        }
    }

    async function register(username, password) {
        try {
            const response = await axios.post('https://chat-lab.icedcube.net/auth/register', {
                username: username,
                password: password
            })
            user.value = response.data
            localStorage.setItem('user', JSON.stringify(user.value))
        } catch(error) {
            alert(error)
        }
    }

    function logout() {
        user.value = null
        localStorage.removeItem('user')
        router.push('/')
    }

    return { user, login, register, logout }
})

