<!-- avatar and divider components -->

<script setup>

import { computed } from 'vue'
import { useTimestamp } from '@composables/timestamp'
import dayjs from 'dayjs'

const props = defineProps({
    origin: String,
    avatar: String,
    text: String,
    date: String,
    exDate: String
})

const isDivider = computed(() => {
    const date = dayjs(props.date)
    if (!props.exDate) { return true }
    return Math.round(date.diff(props.exDate, 'day', true)) > 0
})

</script>


<template>

    <div class="divider" v-if="isDivider">
        <span class="divider__content"> 
            {{ useTimestamp(date, 'divider') }}
        </span>
    </div>

    <div 
        class="message__container"
        :class="origin"
    >
        <div class="message">
            <div class="message__avatar" v-if="avatar"> 
                <div class="test-avatar"></div> 
            </div>

            <div class="message__content">
                {{ text }}
                
                <div class="message__date">
                    {{ useTimestamp(date, 'msg') }}
                </div>
            </div>
        </div>    
    </div>

</template>


<style lang="scss" scoped>

@import "@design";

.divider {
    width: 40%;
    height: fit-content;
    margin: 15px 0;
    @include flex($justify: center);
    background-color: var(--md-sys-color-surface1);
    opacity: .8;
    border-radius: $small-rounded;
    align-self: center;
}

.divider__content {
    @extend %label-medium;
    padding: 1px 0;
}

.test-avatar {
    width: 40px;
    height: 40px;
    border-radius: $full-rounded;
    background-color: var(--md-sys-color-primary);
}

.message {
    @include flex();
    display: inline-flex;
    gap: 10px;
}

.message__content {
    border-radius: 16px 16px 16px 4px;
    padding: 6px 50px 9px 9px;
    position: relative;
    max-width: 350px;
    @extend %body-medium;
    @include minSize(1440px) {}
}


.message__date {
    position: absolute;
    @extend %label-small;
    right: 10px;
    bottom: 4px;
}

.sender {
    align-self: flex-end;
    .message__content { 
        border-radius: 16px 16px 4px 16px;
        background-color: var(--md-sys-color-tertiary-container);
        color: var(--md-sys-color-on-tertiary-container);
    }

    .message__date { 
        color: var(--md-sys-color-on-tertiary-container) 
    }

    .message { flex-direction: row-reverse }
}

.recipient {
    .message__content { 
        background-color: var(--md-sys-color-surface5);
    }
    .message__date { 
        color: var(--md-sys-color-on-surface-variant);
    }
}

</style>