<script setup>

import { ref } from 'vue'

import FAB from '@components/actions/FAB.vue'
import IconButton from '@components/actions/IconButton.vue'
import Segment from '@components/navigation/NavSegment.vue'
import NavRail from '@components/navigation/NavigationRail.vue'
import Search from '@components/navigation/Search.vue'
import ListItem from '@components/containment/ListItem.vue'
import MdMenu from '@components/input/MdMenu.vue'
import MdButton from '@components/actions/MdButton.vue'
import Controls from '@components/chat/ChatControls.vue'
import Message from '@components/chat/Message.vue'
import ChatHeader from '@components/chat/ChatHeader.vue'

import { useChatStore } from '@stores/chats'

const chatStore = useChatStore()


const me = '639f5c843501a6439491a4f6'


const recipient = ref('')


function startChat() {
    chatStore.start(me, recipient.value)
}

</script>


<template>

    <div class="home">

 
        <MdButton
            as="router-link"
            href="/users/123"
            label="User"
        />

        <MdButton
            as="router-link"
            href="/login"
            label="Login"
            variant="outlined"
        />


        <input
            class="test"
            type="text"
            v-model="recipient"
        >

        <button @click="startChat"> Create </button>

    </div>



</template>


<style lang="scss" scoped>

@import "@design";

.home {
    height: var(--full-vh);
    @include flex($direction: column);
    gap: 24px;
}

.test {
    background-color: var(--md-sys-color-primary-container);
}


</style>