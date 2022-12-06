<script setup>

import { ref } from 'vue'
import { useChatStore } from '@stores/chats'

const props = defineProps({
    sender: String,
    recipient: String,
    chatId: String,
    chat: Array
})

const emit = defineEmits(['update:chat'])

const chatStore = useChatStore()
const message = ref('')

function send() {
    if (message.value.length > 0) {
        chatStore.sendMessage(
            props.chatId,
            props.sender,
            props.recipient,
            message.value
        )
        .then(chat => emit('update:chat', chat.data.messages))
    }
    message.value = ''
}

</script>


<template>

    <div class="controls">

        <div class="controls__left">
            <div class="controls__icon"> I </div>
            <div class="controls__icon"> I </div>
        </div>

        <div class="controls__middle">
            <input type="text"
                ref="input"
                v-model="message"
                placeholder="Type a message"
                @keydown.enter="send"
            >
        </div>

        <div class="controls__right" v-if="message">

            <button @click="send"> Send </button>

        </div>

    </div>

</template>



<style scoped>

.controls {
    height: 100px;
    background-color: purple;
    display: flex;
    align-items: center;
    padding: 3px 0;
}

.controls__middle {
    width: 80%;
    background-color: palegreen;
    border-radius: 6px;
    padding: 5px;
}

input {
    width: 100%;
    border: none;
    background: transparent;
    user-select: none;
    -webkit-user-select: none;  /* Chrome all / Safari all */
    -moz-user-select: none;
    outline: none;
}

.controls__left {
    margin-right: 50px;
    margin-left: 20px;
    display: flex;
    background-color: black;
}

.controls__right {
    margin-left: 10px;
}

</style>