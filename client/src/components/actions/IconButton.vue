<script setup>

import { ref } from 'vue'

const props = defineProps({
    icon: String,
    variant: {
        type: String,
        validators: value =>
            ['filled', 'outlined', 'tonal'].includes(value)
    },
    toggleable: Boolean
})

const emit = defineEmits(['change'])

const selected = ref(false)

function onClick() {
    if (props.toggleable) {
        selected.value = !selected.value;
        emit('change', selected.value);
    }
}

</script>



<template>
    
    <div class="icon-btn__container">
        <button
            class="icon-btn"
            :class="
                { 'toggleable': toggleable },
                { 'selected': selected },
                variant
            "
            @click="onClick"
        >
            <span
                class="state-layer"
                :class="[selected ? 'material-icons' : 'material-icons-outlined']"
            >
                {{ icon }}
            </span>
        </button>
    </div>

</template>



<style lang="scss" scoped>

@import "@design";

.icon-btn__container {
    @include flex();
    width: 48px;
    aspect-ratio: 1;
}

// aggiungere la variante disabled

.icon-btn {
    border-radius: $full-rounded;
    overflow: hidden;
    color: var(--md-sys-color-on-surface-variant);
    .state-layer { padding: 8px }

    &.filled {
        color: var(--md-sys-color-on-primary);
        background-color: var(--md-sys-color-primary);
    }

    &.outlined {
        border: 1px solid var(--md-sys-color-outline)
    }

    &.tonal {
        color: var(--md-sys-color-on-secondary-container);
        background-color: var(--md-sys-color-secondary-container);
    }
}

.toggleable {
    &.filled {
        color: var(--md-sys-color-primary);
        background-color: var(--md-sys-color-surface-variant);
    }

    &.tonal {
        color: var(--md-sys-color-on-surface-variant);
        background-color: var(--md-sys-color-surface-variant);
    }
}

.selected {
    color: var(--md-sys-color-primary)!important;

    &.filled {
        color: var(--md-sys-color-on-primary)!important;
        background-color: var(--md-sys-color-primary);
    }

    &.outlined {
        border: none;
        color: var(--md-sys-color-inverse-on-surface)!important;
        background-color: var(--md-sys-color-inverse-surface);
    }

    &.tonal {
        color: var(--md-sys-color-on-secondary-container)!important;
        background-color: var(--md-sys-color-secondary-container);
    }
}


</style>