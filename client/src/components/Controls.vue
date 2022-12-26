<script setup>

import { ref } from 'vue'
import { useChatStore } from '@stores/chats'

import VueTextArea from '@components/VueTextArea.vue'

const props = defineProps({
    sender: String,
    recipient: String,
    chatId: String
})

const emit = defineEmits(['update:chat'])

const chatStore = useChatStore()
const message = ref('')
const textarea = ref(null)

function send() {
    if (message.value.length > 0) {
        chatStore.sendMessage(
            props.chatId,
            props.sender,
            props.recipient,
            message.value
        )
        message.value = ''
        textarea.value.resetHeight()
    }
}


</script>


<template>

    <footer class="controls">

        <div class="controls__left">
            <div class="controls__icon"> I </div>
            <div class="controls__icon"> I </div>
        </div>

        <div class="controls__middle">
            <VueTextArea
                ref="textarea"
                placeholder="Message"
                v-model:text="message"
                @enter="send"
            >
            </VueTextArea>
        </div>

        <div class="controls__right">
            <button 
                @click="send"
                v-show="message"
                class="controls__send-btn"
            > 
                <i class="material-icons-round"> send </i>
            </button>
        </div>

    </footer>

</template>



<style lang="scss" scoped>

@import "@design";

.controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: var(--surface-default-medium);
    display: flex;
    align-items: center;
    font-size: $text-5;
    min-height: 60px;
    padding: 10px 20px;
}

.controls__left {
    display: flex;
    background-color: black;
}

.controls__middle {
    width: 80%;
    background-color: var(--surface-default-low);
    border-radius: 7px;
    padding: 10px;
    display: flex;
    align-items: center;
    margin-left: 50px;
    margin-right: 20px;
        
    @include maxSize(780px) {
        padding: 8px;
        width: 80%;
        margin-left: 20px;
    }

    @include maxSize(480px) {
        margin-right: 10px
    }
}

.controls__right {
    width: 20px;
}

.controls__send-btn {
    background-color: transparent;
    border: none;
    color: white;
}

</style>