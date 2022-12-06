<script setup>

import { ref } from 'vue'
import { useAuthStore } from '@stores/auth'

import Input from '@components/BaseInputText.vue'

const auth = useAuthStore()

const username = ref('')
const password = ref('')

function onSubmit() {
    auth.login(username.value, password.value)
}

</script>


<template>

    <div class="login-wrapper">

        <form @submit.prevent="onSubmit">
            <Input
                id="login__username"
                label="Username:"
                v-model:text="username"
                placeholder="Write the username"
            />

            <Input
                id="login__password"
                label="Password:"
                v-model:text="password"
                placeholder="Write the username"
            />

            <button> Sign-in </button>
        </form>
    </div>


</template>




<style scoped>

.login-wrapper {
    width: 800px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
}

button {
    margin-top: 30px;
}

</style>