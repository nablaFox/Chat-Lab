<!-- add disabled style -->

<script setup>

import { ref, computed } from 'vue'

const props = defineProps({
    icon: String,
    as: { type: String, default: 'button'},
    href: String,
    variant: {
        type: String,
        validators: value =>
            ['filled', 'outlined', 'tonal'].includes(value)
    },
    toggleable: Boolean,
    iconVariant: String
})
const emit = defineEmits(['change'])

const selected = ref(false)

const IconVariant = computed(() => {
    if (selected.value) {
        return 'material-icons'
    } else if (props.iconVariant) {
        return `material-icons-${props.iconVariant}`
    } else {
        return 'material-icons-outlined'
    }
})

function onClick() {
    if (props.toggleable) {
        selected.value = !selected.value;
        emit('change', selected.value);
    }
}


function onTap() {
    // to be completed
}

const isRegularLink = computed(() => props.as === 'a')
const isRouterLink = computed(() => props.as === 'router-link')

</script>


<template>
    
    <component
        :is="as"
        class="icon-btn state-layer"
        :class="
            { 'toggleable': toggleable },
            { 'selected': selected },
            variant
        "
        :href="isRegularLink && href"
        :to="isRouterLink && href"
        @click="onClick"
        
    >
        <span
            style="font-size: 26px;"
            :class="IconVariant"
        >
            {{ icon }}
        </span>
    </component>

</template>


<style lang="scss" scoped>

@import "@design";

.icon-btn {
    @include flex();

    border-radius: $full-rounded;
    overflow: hidden;
    color: var(--md-sys-color-on-surface-variant);
    padding: 8px;

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