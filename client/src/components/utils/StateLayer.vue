<script setup>

defineProps({
    isDisabled: Boolean
})

</script>


<template>

    <span 
        :class="{ disabled: isDisabled, 'state-layer': !isDisabled }"
        :disabled="isDisabled"
    >
        <slot></slot>
    </span>

</template>


<style lang="scss" scoped>

@import "@design";

.state-layer,
.disabled {
    position: relative;
    @include flex();
}

.state-layer {
    position: relative;
    &:hover::before { opacity: 0.08 }
    &:focus::before { opacity: 12% }
    &:active::before { opacity: 12% }
}

.state-layer::before {
    opacity: 0; 
    z-index: 0;
    background-color: currentColor;
    @include pseudo-normalize();
}

.disabled {
    color: var(--md-sys-color-on-surface);
    pointer-events: none;
    user-select: none;

    :deep(*) { opacity: 38%; }
}

.disabled::before {
    opacity: 12%;
    background-color: var(--md-sys-color-on-surface);
    @include pseudo-normalize();
}

.ripple {
    position: absolute;
    background-color: var(--md-sys-color-on-surface);
    border-radius: 50%;
    transform: scale(0);        

}

</style>