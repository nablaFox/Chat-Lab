<!-- animations on scroll -->

<script setup>

import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@stores/chat.js'
import ListItem from '@components/containment/ListItem.vue'
import ActionBar from '@components/navigation/ActionBar.vue'
import { useTimestamp } from '@composables/timestamp.js'

const router = useRouter()
const chatStore = useChatStore()

const { chats } = storeToRefs(chatStore)

function openChat(id) {
    router.push(`/chat/${id}`)
}

</script>


<template>
    
    <div class="home">
        <ActionBar />
        <ListItem
            v-for="chat in chats"
            :key="chat._id"
            :headline="chat.recipient.username" 
            variant="two-line" 
            :trailText="useTimestamp(chat.lastMessage.timestamp, 'date')"
            @click="openChat(chat._id)"
            round
        >
            {{ chat.lastMessage.text }}
        </ListItem>
    </div>
</template>


<style lang="scss" scoped> 

@import "@design";

.home {
    width: 100%;
    max-height: 100%;
    overflow-y: scroll;
    padding: $page-padding;
}

.list-item {
    width: 100%;
    &:not(:first-child) { margin-top: 13px }
}

</style>