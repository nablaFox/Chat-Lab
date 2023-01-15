<!-- load messages as chunks, and load them when scrolling -->
<!-- show random empty messages while chunks load -->

<script setup>

import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@stores/chats'
import { useTimestamp } from '../../composables/timestamp'

import Controls from '@components/chat/ChatControls.vue'
import ChatHeader from '@components/chat/ChatHeader.vue' 
import Message from '@components/chat/Message.vue'

const route = useRoute()
const chatStore = useChatStore()
const { chat } = storeToRefs(chatStore)

const userId = route.params.id
const recipient = route.meta.recipient
const loaded = route.meta.loaded

function onSend(message) {

    chatStore.sendMessage(
        route.params.id,
        message
    )
}


</script>


<template>

    <div class="chat">
        <ChatHeader :username="recipient.username" />
        
        <div class="chat__wrapper">
            <Message
                v-if="loaded"
                v-for="msg in chat.messages"
                :origin="msg.sender === userId ? 'sender' : 'recipient'"
                :text="msg.text"
                :date="useTimestamp('msg', msg.timestamp)"
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