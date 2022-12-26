<script setup>

import { ref } from 'vue'
import { useAuthStore } from '@stores/auth'

import VueInput from '@components/VueInput.vue'

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
            <VueInput
                id="login__username"
                label="Username:"
                v-model:text="username"
                placeholder="Write the username"
            />

            <VueInput
                id="login__password"
                label="Password:"
                v-model:text="password"
                placeholder="Write the username"
            />

            <button> Sign-in </button>
        </form>
    </div>


</template>




<style lang="scss" scoped>

.login-wrapper {
    width: 100%;
    height: var(--full-vh);
    display: flex;
    align-items: center;
    justify-content: center;

}

button {
    margin-top: 30px;
}

</style>