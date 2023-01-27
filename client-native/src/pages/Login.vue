<script setup>

import MdButton from '@components/actions/MdButton.vue'
import { ref } from 'vue'
import { useAuthStore } from '@stores/auth'

const authStore = useAuthStore()

const password = ref('')
const username = ref('')

</script>


<template>

    <form 
        @submit.prevent="authStore.login(password, username)"
        class="login-form"
    >
        <div class="login-form__title"> Echo login </div>

        <div class="login-form__wrapper">
            <div class="login-form__group">
                <label> Username </label>
                <input type="text" v-model="password">
            </div>
            <div class="login-form__group">
                <label> Password </label>
                <input type="text" v-model="username">
            </div>
            <MdButton label="Login"/>
        </div>
    </form>

</template>



<style lang="scss" scoped>

@import "@design";

.login-form {
    height: var(--full-vh);
    @include flex();
    position: relative;
}

.login-form__title {
    @include pos($t: 12%);
    @extend %headline-medium;
}

.login-form__wrapper {
    background-color: var(--md-sys-color-surface1);
    @include flex($direction: column);
    height: 50%;
    gap: 15px;
    border-radius: $large-rounded;
    padding: 0 15px;
    width: 310px;
}

.login-form__group { width: 100% }

label {
    display: block;
    margin-bottom: 8px;
}

input {
    height: 40px;
    border: 1px solid var(--md-sys-color-outline-variant)!important;
    border-radius: $medium-rounded;
    padding-left: 4px;
}

button {
    margin-top: 20px;
    width: 80%;
}

</style>