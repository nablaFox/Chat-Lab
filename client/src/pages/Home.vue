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


function toggleTheme(e) {
    const root = document.documentElement;

    if (e.target.checked) {
        root.classList.replace('dark', 'light')
    } else {
        root.classList.replace('light', 'dark')
    }

}


const msg = ref('')

</script>


<template>

    <div class="home">


        

        <ChatHeader
            username="Username"
        />

    </div>


    <input type="checkbox" @change="toggleTheme" class="test">


</template>


<style lang="scss" scoped>

@import "@design";

.home {
    height: var(--full-vh);
    @include flex($direction: column);
    gap: 24px;
}

.test {
    position: absolute;
    top: 0;
}



</style>