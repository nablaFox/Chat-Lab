<script setup>

import { ref } from 'vue'
import FAB from '@components/actions/FAB.vue'
import IconButton from '@components/actions/IconButton.vue'
import Segment from '@components/navigation/NavSegment.vue'

defineProps({
    fabIcon: String,
    fabVariant: String,
    fabSize: String,

    destinations: Array,

    alignment: {
        type: String,
        default: 'top',
    },
    menu: {
        type: Boolean,
        default: true
    },
    fab: {
        type: Boolean,
        default: true
    }
})

const selected = ref(0)

</script>


<template>

    <nav 
        class="nav-rail"
        :class="alignment"
    >
        <div 
            class="nav-rail__head"
            v-if="menu || fab"
        >
            <div class="nav-rail__menu" v-if="menu">
                <IconButton icon="menu" />
            </div>

            <div class="nav-rail__fab" v-if="fab">
                <FAB
                    :icon="fabIcon"
                    :variant="fabVariant"
                    :size="fabSize"
                />
            </div>          
        </div>

        <div class="nav-rail__destinations">
            <Segment 
                v-for="dest in destinations"
                :key="dest.id"
                :label="dest.label"
                :icon="dest.icon"
                :circular="dest.circular"
                :class="{ active: selected === dest.id }"
                @select="selected = dest.id"
            />
        </div>

        <slot></slot>
    </nav>


</template>



<style lang="scss" scoped>

@import "@design";

.nav-rail {
    background-color: var(--md-sys-surface);
    padding: 44px 0 56px;

    @include flex($direction: column, $justify: flex-start);
    display: inline-flex;

    &.top { gap: 40px }
    &.middle { gap: 60px }
    &.bottom { justify-content: space-between }
}

.nav-rail__head {
    @include flex($direction: column, $justify: flex-start);
    gap: 4px;
}

.nav-rail__menu {
    @include flex();
    width: 48px;
    height: 48px;
}

.nav-rail__destinations {
    @include flex($direction: column, $justify: flex-start);
    gap: 12px;
    padding: 5px 5px;
}

:deep(.segment__btn) {
    padding: 12px!important;
}

</style>
