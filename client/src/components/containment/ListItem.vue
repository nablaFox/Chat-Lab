<!-- modify padding on large images -->

<script setup>

import { useSlots, computed } from 'vue';

const slots = useSlots()

const props = defineProps({
    overline: String,
    headline: String,
    trailText: String,
    divider: Boolean,
    variant: String,
    round: Boolean
})

const Variant = computed(() => {
    if (props.variant) {
        return props.variant
    }
    else if (!(props.overline || slots.suppText)) {
        return 'one-line' 
    }
    else if (props.overline && slots.suppText) {
        return 'three-line'
    }
    else if (props.overline || slots.suppText) {
        return 'two-line'
    }
})

</script>


<template>

    <div
        :class="[
            Variant,
            divider && 'has-divider',
            round && 'round'
        ]"
        class="list-item state-layer"
    >
        <div 
            class="list-item__leading"
            v-if="$slots.leading"
        >
            <slot name="leading"> </slot>
        </div>

        <div class="list-item__content">
            <div 
                class="list-item__overline" 
                v-if="overline"
            >
                {{ overline }}
            </div>

            <div class="list-item__headline"> {{ headline }} </div>

            <div 
                class="list-item__supporting-text"
                v-if="$slots.suppText"
            >
                <slot name="suppText"> </slot>
            </div>

        </div>

        <div 
            class="list-item__trailing"
            v-if="$slots.trailing || trailText"
        >
            <slot name="trailing"></slot>

            <div 
                class="list-item__trailing-text" 
                v-if="trailText"
            >
                {{ trailText }}
            </div>

        </div>
    </div>


</template>



<style lang="scss" scoped>

@import "@design";

.one-line {
    height: 56px;
    padding: 8px 24px 8px 16px;
}

.two-line {
    @extend .one-line;
    height: 72px;
}

.three-line {
    align-items: start;
    padding: 12px 24px 12px 16px;

    .list-item__supporting-text {
        width: auto;
        overflow: visible;
        white-space: normal;
    }
}

.list-item {
    gap: 16px;
    width: 360px;
    justify-content: flex-start;
    background-color: var(--md-sys-color-surface);

    &.has-divider {
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
    }
}

.list-item__content {
    width: 100%;
    overflow: hidden;
}

.list-item__overline {
    @extend %label-medium;
    color: var(--md-sys-color-on-surface-variant)
}

.list-item__headline {
    color: var(--md-sys-color-on-surface)
}

.list-item__supporting-text {
    @extend %body-medium;
    color: var(--md-sys-color-on-surface-variant);
    white-space:nowrap;
    text-overflow: ellipsis;
    overflow:hidden; 
    width: 90%
}

.list-item__trailing-text {
    @extend %label-small;
    color: var(--md-sys-color-on-surface-variant)
}

.list-item__leading,
.list-item__trailing {
    @include flex()
}

.round {
    border-radius: $medium-rounded;
    overflow: hidden;
}

.active.state-layer::before {
    opacity: 12%;
    background-color: var(--md-sys-color-on-surface);
}

</style>
