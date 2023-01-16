<!-- add transition, drop selection -->

<script setup>

import { ref, computed } from 'vue';

import ListItem from '@components/containment/ListItem.vue'
import IconButton from '@components/actions/IconButton.vue'
import MdButton from '@components/actions/MdButton.vue'

const props = defineProps({
    items: Array,
    control: String,
    icon: String,
    label: String,
    variant: String
})
const emit = defineEmits(['open', 'close'])

const open = ref(false)

function onChange() {
    open.value = !open.value;

    if (open.value) { emit('open') }
    else { emit('close') }
}

const Control = computed(() => {
    if (props.control === 'button') { 
        return MdButton
    }
    else if (props.control === 'icon-button') {
        return IconButton
    }
})

</script>


<template>

    <div class="menu__container">

        <div class="menu__control">
            <component
                :is="Control"
                :icon="icon"
                :label="label"
                :variant="variant"
                toggleable
                @click="onChange"
            />
        </div>

        <div class="menu" v-if="open">
            <ListItem
                v-for="item in items"
                :headline="item.label"
                :trailText="item.trailText"
                :divider="item.divider"
                :tabindex="item.id"
            >
                <template #leading v-if="item.leadIcon">
                    <span class="material-icons-outlined"> {{ item.leadIcon }} </span>
                </template>

                <template #trailing v-if="item.trailIcon">
                    <span class="material-icons-outlined"> {{ item.trailIcon }} </span>
                </template>
            </ListItem>
        </div>

    </div>

</template>




<style lang="scss" scoped>

@import "@design";

.menu__container {
    position: relative;;
}

.menu {
    @include flex($direction: column, $align: start);
    gap: 1px;
    border-radius: $small-rounded;
    background-color: var(--md-sys-color-surface2);
    box-shadow: var(--md-sys-elevation2);
    overflow: hidden;
    position: absolute;
    width: fit-content;
    right: 0;
    min-width: 112px;
    max-width: 280px;
    white-space: nowrap;
    z-index: 9999;
}

.menu > .list-item {
    width: 100%!important;
    height: 48px;
    padding: 8px 12px;
    user-select: none;
    background-color: transparent;
    gap: 12px;
}

.menu__control {
    padding-bottom: 5px;
}

:deep(.icon-btn.selected) {
    background-color: var(--md-sys-color-surface2);
}

.icon-btn { margin-left: auto }

</style>