<!-- notifications, chat rotation -->

<script setup>

import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore } from '@stores/chats'
import { useTimestamp } from '../../composables/timestamp'

import ListItem from '@components/containment/ListItem.vue'
import Search from '@components/navigation/Search.vue'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()

const { chats } = storeToRefs(chatStore)

const selected = ref('')

function onClick(chat) {
    router.push({ name: 'chat', params: { chat: chat } })
    selected.value = chat
}

onBeforeMount(() => selected.value = route.params.chat )

</script>


<template>
    

    <div class="chat-list">
        <div class="chat-list__head">
            <h1 class="chat-list__title"> Conversations </h1>
            <Search
                leading-icon="search"
                :trailing-icon="null"
                placeholder="Search chat"
            />
        </div>

        <div class="chat-list__wrapper">
            <ListItem
                v-for="chat in chats"
                :key="chat._id"
                :headline="chat.recipient.username"
                :trailText="useTimestamp('date', chat.lastMessage.timestamp)"
                :class="selected == chat._id && 'active'"
                @click="onClick(chat._id)"
                round
            >
               {{ chat.lastMessage.text }}
            </ListItem>
        </div>
    </div>

</template>


<style lang="scss">

@import "@design";

.chat-list {
    max-width: 100%;
    overflow: hidden;
}

.chat-list__head {
    @include flex($direction: column);
    gap: 30px;
    margin-bottom: 30px;
}

.search { height: 45px }

.chat-list__wrapper {
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: thin;
    box-sizing: content-box!important;
    padding-right: 10px;
}

.list-item {
    background-color: transparent!important;
    width: auto!important;

    &:not(:first-child) { margin-top: 10px }
}

</style>