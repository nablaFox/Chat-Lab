<script setup>

import { ref } from 'vue';

import ListItem from '@components/containment/ListItem.vue'
import IconButton from '@components/actions/IconButton.vue'
import MdButton from '@components/actions/MdButton.vue'

defineProps({
    items: Array,
    control: Object
})
const emit = defineEmits(['open', 'close'])

const open = ref(false)

function onChange() {
    open.value = !open.value;

    if (open.value) { emit('open') }
    else { emit('close') }
}

</script>


<template>

    
    <div class="menu__container">

        <div class="menu__control">
            <IconButton
                v-if="control.type === 'icon-button'"
                :icon="control.icon"
                @change="onChange"
                toggleable
            />
            <MdButton
                v-else-if="control.type === 'button'"
                :variant="control.variant"
                :text="control.text"
                :icon="control.icon"
                @click="onChange"
            />
            <!-- 
                <MdSelection
                    v-else-if="control.type === 'selection'"
                    v-bind="control.spec"
                />
            -->
        </div>

        <!-- add transition -->
        <div class="menu" v-if="open">
            <ListItem
                v-for="item in items"
                :headline="item.label"
                :trailText="item.trailText"
                :divider="item.divider"
                :tabindex="item.id"
            >
                <template #leading>
                    <span class="material-icons-outlined"> {{ item.leadIcon }} </span>
                </template>

                <template #trailing>
                    <span class="material-icons-outlined"> {{ item.trailIcon}} </span>
                </template>
            </ListItem>
        </div>


    </div>

</template>




<style lang="scss" scoped>

@import "@design";

.menu__container {
    position: relative;
    min-width: 112px;
    max-width: 280px;
    width: 300px;
    z-index: 9999;
}

.menu {
    @include flex($direction: column, $align: start);
    gap: 1px;
    width: 100%;
    border-radius: $small-rounded;
    background-color: var(--md-sys-color-surface2);
    box-shadow: var(--md-sys-elevation2);
    overflow: hidden;
    position: absolute;
}

.menu > .list-item {
    width: 100%;
    height: 48px;
    padding: 8px 12px;
    user-select: none;
    background-color: transparent;
    gap: 12px;
}

.state-layer {
    &:hover::before { opacity: 0 }
    &:active::before { opacity: 12% }
}

:deep(.icon-btn.selected) {
    background-color: var(--md-sys-color-surface2);
}

.icon-btn__container {
    margin-left: auto;
}

</style>