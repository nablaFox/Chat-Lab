<script setup>

import FAB from '@components/actions/FAB.vue'
import IconButton from '@components/actions/IconButton.vue'
import Segment from '@components/navigation/NavSegment.vue'
import NavRail from '@components/navigation/NavigationRail.vue'
import Search from '@components/navigation/Search.vue'
import ListItem from '@components/containment/ListItem.vue'

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

</script>


<template>

    <div class="home">



        <ListItem
            headline="List Item"
            trailText="100+"

        >
            <template #leading>
                
            </template>

        </ListItem>


        <input class="test" type="checkbox" @change="toggleTheme">
        

    </div>




</template>


<style lang="scss" scoped>

.home {
    height: var(--full-vh);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

}

.test {
    position: absolute;
    left: 0;
    bottom: 0;
}



</style>