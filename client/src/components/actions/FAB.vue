<script setup>

import { computed } from 'vue'

const props = defineProps({
    icon: String,
    label: String,
    size: {
        type: String,
        validators: value =>
            ['small', 'large', 'extended'].includes(value)
    },
    variant: {
        type: String,
        validators: value =>
            ['primary', 'tertiary', 'secondary'].includes(value)
    },
})

const isExtended = computed(() => {
    return props.size === 'extended' ? true : false;
})

</script>


<template>

    <button 
        class="fab"
        :class="[variant, size]"
    >
        <span class="state-layer">
            <span
                class="material-icons-outlined fab__icon"
            >
                {{ icon }}
            </span>
            <label class="fab__label" v-if="isExtended"> {{ label }} </label>
        </span>
    </button>

</template>



<style lang="scss" scoped>

@import "@design";

.fab {
    overflow: hidden;
    border-radius: $large-rounded;
    background-color: var(--md-sys-color-surface3);
    color: var(--md-sys-color-primary);

    .state-layer { padding: 16px }

    &.primary {
        color: var(--md-sys-color-on-primary-container);
        background-color: var(--md-sys-color-primary-container);
    }

    &.secondary {
        color: var(--md-sys-color-on-secondary-container);
        background-color: var(--md-sys-color-secondary-container);
    }

    &.tertiary {
        color: var(--md-sys-color-on-tertiary-container);
        background-color: var(--md-sys-color-tertiary-container);
    }

    &.small {
        border-radius: $medium-rounded;
        .state-layer { padding: 8px }
    }

    &.large {
        .state-layer { padding: 30px }
        .fab__icon { font-size: 36px }
    }

    &.extended .state-layer {
        padding: 16px 20px 16px 16px;
        gap: 12px;
    }
}

.fab__label { @extend %label-large }

</style>