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


function toggleTheme(e) {
    const root = document.documentElement;

    if (e.target.checked) {
        root.classList.replace('dark', 'light')
    } else {
        root.classList.replace('light', 'dark')
    }

}

function test() {
    alert('ok')
}

function test1() {
    alert('ok1')
}

const sel = ref(true)


const items = [
    { label: 'item1', leadIcon: 'visibility', id: 1 },
    { label: 'item2', leadIcon: 'content_copy', trailText: 'C', id: 2 },
    { label: 'item3', leadIcon: 'edit', trailIcon: 'done', divider: true, id: 3 },
    { label: 'item4', leadIcon: 'cloud', trailIcon: 'arrow_right', id: 4 },
]

</script>


<template>

    <div class="home">

        <MdMenu
            :items="items"
            :control="{
                type: 'button',
                text: 'Activated',
                variant: 'tonal'
            }"
        />

        <input class="test" type="checkbox" @change="toggleTheme">

    </div>




</template>


<style lang="scss" scoped>

@import "@design";

.home {
    height: var(--full-vh);
    @include flex($direction: column);
    gap: 20px;

}

.test {
    position: absolute;
    left: 0;
    bottom: 0;
}



</style>