import { defineStore } from "pinia";
import { useRouter } from "vue-router"
import axios from 'axios'
import { Preferences } from '@capacitor/preferences'
import { useBoot } from '@composables/boot'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()

    async function checkAuth() {
        const { value } = await Preferences.get({ key: 'user' })
        if (!value) {
            router.push('/login')
            return
        }

        await useBoot(value)
    }

    async function login(username, password) {
        const response = await axios.post('https://chat-lab.icedcube.net/auth/login', {
            username: username,
            password: password
        }).catch(err => { alert(err) })

        if (!response) { return }
        const payload = JSON.stringify(response.data)
        
        await Preferences.set({
            key: 'user',
            value: payload
        })
        await useBoot(payload)
        router.push('/')
    }

    return {
        checkAuth,
        login
    }
})