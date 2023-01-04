<script setup>

defineProps({
    text: String,
    variant: {
        type: String,
        default: 'filled',
    },
    icon: String
})

// add disabled styles

</script>


<template>

    <button 
        class="button state-layer"
        :class="[variant, { 'has-icon': icon }]"
    >
        <span 
            class="material-icons-outlined"
            v-if="icon"
        > 
            {{ icon }} 
        </span>
        {{ text }}
    </button>
    
</template>


<style lang="scss" scoped>

@import "@design";

.button {
    border-radius: $full-rounded;
    overflow: hidden;
    height: 40px;
    padding: 0 24px;
    @extend %label-large;
}

.has-icon {
    gap: 8px;
    padding-left: 16px;
    padding-right: 24px;

    &.text { 
        padding-left: 12px;
        padding-right: 16px;
    }
}

.filled {
    background-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary)
}

.outlined {
    color: var(--md-sys-color-primary);
    border: 1px solid var(--md-sys-color-outline);
}

.text {
    color: var(--md-sys-color-primary);
    padding: 0 12px
}

.elevated {
    box-shadow: var(--md-sys-elevation1);
    background-color: var(--md-sys-color-surface1);
    color: var(--md-sys-color-primary)
}

.tonal {
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container)
}

</style>