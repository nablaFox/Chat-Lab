<!-- avatar component -->

<script setup>

defineProps({
    origin: String,
    avatar: String,
    text: String,
    date: String
})

</script>


<template>

    <div 
        class="message"
        :class="origin"
    >
        <div class="message__avatar" v-if="avatar"> <div class="test-avatar"></div> </div>

        <div class="message__content">
            {{ text }}
            
            <div class="message__date">
                {{ date }}
            </div>
        </div>
    </div>

</template>


<style lang="scss" scoped>

@import "@design";

.test-avatar {
    width: 40px;
    height: 40px;
    border-radius: $full-rounded;
    background-color: var(--md-sys-color-primary);
}

.message {
    @include flex();
    gap: 10px;

    &.sender { flex-direction: row-reverse; }
}

.message__content {
    border-radius: 16px 16px 16px 4px;
    padding: 6px 50px 9px 9px;
    position: relative;
    max-width: 300px;
    @extend %body-medium;
}


.message__date {
    position: absolute;
    @extend %label-small;
    right: 10px;
    bottom: 4px;
}

.sender {
    .message__content { 
        border-radius: 16px 16px 4px 16px;
        background-color: var(--md-sys-color-tertiary-container);
        color: var(--md-sys-color-on-tertiary-container);
    }

    .message__date { 
        color: var(--md-sys-color-on-tertiary-container) 
    }    
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