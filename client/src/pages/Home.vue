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



const msg = ref('')

const selected = ref(0)

</script>


<template>

    <div class="home">


        <ListItem
            v-for="n in 3"
            :class="{ active: selected === n}"
            @click="selected = n"
            headline="ciao"
            
        />


        <MdButton
            as="router-link"
            href="/users/1232913/chats"
            label="User"
        />

    </div>



</template>


<style lang="scss" scoped>

@import "@design";

.home {
    height: var(--full-vh);
    @include flex($direction: column);
    gap: 24px;
}




</style>