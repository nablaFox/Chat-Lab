<script setup>

import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@stores/chats'


import Controls from '@components/chat/ChatControls.vue'
import ChatHeader from '@components/chat/ChatHeader.vue' 
import Message from '@components/chat/Message.vue'

const route = useRoute()
const chatStore = useChatStore()

const { chat } = storeToRefs(chatStore)

function onSend(message) {


}   

onBeforeMount(() => {
    chatStore.get(route.params.chat)
})

</script>


<template>

    <div class="chat">
        <ChatHeader username="Username"/>
        <div class="chat__wrapper" id="test">

            <Message
                v-for="msg in chat.messages"
                :origin="msg.sender === route.params.id ? 'sender' : 'recipient'"
                :text="msg.text"
                date="13:50"
            />
            
        </div>
        <Controls 
            leading-icon-2="add_circle"
            @send="onSend"
        />
    </div>


</template>


<style lang="scss" scoped>

@import "@design";

.chat {
    background-color: var(--md-sys-color-surface);
    border-radius: $large-top-rounded;
    @include flex($direction: column, $justify: start);
    height: 100%;
    overflow: hidden;
}

.chat__wrapper {
    width: 100%;
    padding: 5px 32px;
    padding-bottom: 10px;
    scrollbar-width: none;
    flex: 1;
    max-height: 100%;
    overflow-y: scroll;
    gap: 5px;
    @include flex($direction: column, $align: start, $justify: start);
    @include minSize(1400px) { }
}

</style>