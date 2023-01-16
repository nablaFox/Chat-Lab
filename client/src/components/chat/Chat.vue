<!-- load messages as chunks, and load them when scrolling -->
<!-- show random empty messages while chunks load -->

<script setup>

import { ref, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@stores/chats'

import Controls from '@components/chat/ChatControls.vue'
import ChatHeader from '@components/chat/ChatHeader.vue' 
import Message from '@components/chat/Message.vue'

const route = useRoute()
const chatStore = useChatStore()
const { chat } = storeToRefs(chatStore)

const userId = route.params.id
const loaded = route.meta.loaded
const wrapper = ref(null)

function onSend(message) {
    chatStore.sendMessage(
        userId,
        chat.value.recipient._id,
        message
    )
}

onUpdated(() => { wrapper.value.scrollTop = wrapper.value.scrollHeight })

</script>


<template>

    <div class="chat">
        <ChatHeader :username="chat.recipient.username" />
        
        <div class="chat__wrapper" ref="wrapper">            
            <Message
                v-if="loaded"
                v-for="(msg, index) in chat.messages"
                :origin="msg.from === userId ? 'sender' : 'recipient'"
                :text="msg.text"
                :date="msg.timestamp"
                :ex-date="index ? chat.messages[index - 1].timestamp : null"
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
    padding: 10px 24px;
    padding-bottom: 15px;
    scrollbar-width: none;
    flex: 1;
    max-height: 100%;
    overflow-y: scroll;
    gap: 5px;
    z-index: 0;
    @include flex($direction: column, $align: start, $justify: start);
    @include minSize(1400px) { 
        padding-left: 100px; // da definirsi meglio
        padding-right: 50px
    }
}

</style>