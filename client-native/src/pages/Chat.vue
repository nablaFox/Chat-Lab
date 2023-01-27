<script setup>

import { storeToRefs } from 'pinia'
import { useChatStore } from '@stores/chat'
import ChatHeader from '@components/chat/ChatHeader.vue'
import ChatControls from '@components/chat/ChatControls.vue'
import Message from '@components/chat/Message.vue'
import { onBeforeMount, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@stores/user'
import { nextTick } from 'vue'

const chatStore = useChatStore()
const user = useUserStore()
const route = useRoute()

const { chat, chatId, loaded } = storeToRefs(chatStore)
const wrapper = ref(null)

const scroll = () => {
    wrapper.value.scrollTop = wrapper.value.scrollHeight
}

function onSend(message) {
    chatStore.sendMessage(
        user.id, 
        chat.value.recipient._id,
        message
    )

    nextTick(scroll)
}

onBeforeMount(() => {
    chatId.value = route.params.chat
})

onMounted(scroll)


</script>


<template>

    <div class="chat" v-if="loaded">
        <ChatHeader :username="chat.recipient.username"/>
        
        <div class="messages__wrapper" ref="wrapper">
            <Message
                v-for="(msg, index) in chat.messages"
                :origin="msg.from === user.id ? 'sender' : 'recipient'"
                :text="msg.text"
                :date="msg.timestamp"
                :ex-date="index ? chat.messages[index - 1].timestamp : null"
            />
        </div>

        <ChatControls
            @send="onSend"
            leading-icon-1="mood"
            :leading-icon-2="null"
            trailing-icon-2="attach_file"
        />
    </div>

</template>



<style lang="scss" scoped>

@import "@design";

.chat {
    padding: $page-padding;
    @include flex($direction: column, $justify: start);
    height: var(--full-vh);
    overflow: hidden;
    position: relative;
}

.messages__wrapper {
    width: 100%;
    max-height: 100%;
    overflow-y: scroll;
    @include flex($direction: column, $align: start, $justify: start);
    flex: 1;
    gap: 7px;
    padding: 10px 0;
}


</style>