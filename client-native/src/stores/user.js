import { ref } from 'vue'
import { defineStore } from "pinia"

export const useUserStore = defineStore('user', () => {
    const id = ref({})
    const username = ref('')

    function set(user) {
        id.value = user.id
        username.value = user.username
    }

    return {
        set,
        id,
        username
    }
})