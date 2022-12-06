<script setup>

import { useChatStore } from '@stores/chats'

const props = defineProps({
    username: String,
    recipient: String,
    sender: String,
    bio: String
})

const chatStore = useChatStore()

function startChat() {
    chatStore.start(props.sender, props.recipient)
}

</script>


<template>

    <div class="user-box">

        <div class="user-box__right">
            <div class="user-box__username">
                {{ username }}
            </div>

            <div class="user-box__bio">
                Bio test
            </div>
        </div>

        <div class="user-box__left">
           <button @click="startChat"> Chat </button>
        </div>

    </div>
    
</template>



<style scoped>

.user-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}

</style>