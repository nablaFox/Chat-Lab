<script setup>

import { computed } from 'vue'

const props = defineProps({
    as: { type: String, default: 'button'},
    icon: String,
    label: String,
    href: String,
    size: {
        type: String,
        validator: value =>
            ['small', 'large', 'extended'].includes(value)
    },
    variant: {
        validator(value) {
            return ['primary', 'tertiary', 'secondary'].includes(value) 
        }
    }
})

const isRegularLink = computed(() => props.as === 'a')
const isRouterLink = computed(() => props.as === 'router-link')
const isExtended = computed(() => props.size === 'extended')

</script>


<template>

    <component
        :is="as"
        class="fab state-layer"
        :class="[
            variant, 
            size, 
            isExtended && 'extended'
        ]"
        :href="isRegularLink && href"
        :to="isRouterLink && href"
    >
        <span
            class="material-icons-outlined fab__icon"
        >
            {{ icon }}
        </span>
        
        <div 
            class="fab__label"
            v-if="isExtended"
        >
            {{ label }}
        </div>
    </component>

</template>



<style lang="scss" scoped>

@import "@design";

.fab {
    overflow: hidden;
    border-radius: $large-rounded;
    background-color: var(--md-sys-color-surface3);
    color: var(--md-sys-color-primary);
    padding: 16px;
    @extend %label-large;

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
        padding: 8px;
    }

    &.large {
        padding: 30px;
        .fab__icon { font-size: 36px }
    }

    &.extended {
        padding: 16px 20px 16px 16px;
        gap: 12px;
    }
}

</style>