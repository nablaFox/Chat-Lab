<script setup>

import { ref, onMounted } from 'vue'
import Controls from '@components/chat/ChatControls.vue'
import ChatHeader from '@components/chat/ChatHeader.vue' 
import Message from '@components/chat/Message.vue'



</script>


<template>

    <div class="chat">
        <ChatHeader username="Username"/>
        <div class="chat__wrapper" id="test">
            <Message
                v-for="n in 10"
                origin="recipient"
                text="Hello world"
                date="13:50"
            />
            <Message
                v-for="n in 10"
                origin="sender"
                text="Hello world"
            />
        </div>
        <Controls leading-icon-2="add_circle"/>
    </div>


</template>


<style lang="scss" scoped>

@import "@design";

.chat {
    background-color: var(--md-sys-color-surface);
    border-radius: $large-rounded;
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