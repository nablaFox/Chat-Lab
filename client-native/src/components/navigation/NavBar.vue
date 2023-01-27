<script setup>

import { ref } from 'vue'
import Segment from './NavSegment.vue'
import FAB from '@components/actions/FAB.vue'

const destinations = [
    { icon: 'chat_bubble', label: 'Chat', id: 0, href: '/' },
    { icon: 'schedule', label: 'History', id: 1 },
    { icon: 'account_circle', label: 'Account', id: 2 }
]

const selected = ref(0)

</script>

<template>

    <div class="nav-bar">
        <FAB icon="graphic_eq" variant="tertiary" />

        <div class="nav-bar__destinations">
            <Segment
                v-for="dest in destinations"
                :icon="dest.icon"
                :label="dest.label"
                :key="dest.id"
                :class="{ active: selected === dest.id }"
                @select="selected = dest.id"
            />
        </div>
    </div>
    
</template>


<style lang="scss" scoped>

@import "@design";

.nav-bar {
    width: 100%;
    @include pos($b: 0, $l: 0);
    z-index: 99999;
}

.nav-bar__destinations {
    @include flex();
    background-color: var(--md-sys-color-surface2);
    height: 80px;
}

.fab {
    margin-left: auto;
    margin-right: 10px;
    margin-bottom: 10px;
}

</style>