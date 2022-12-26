<script setup>

import { computed } from 'vue'
import { useRoute } from 'vue-router';

const props = defineProps({
    text: String,
    sender: String,
    date: String
})

const route = useRoute()

const msgDate = computed(() => {
    const date = new Date(props.date)
    return `${date.getHours()}:${date.getMinutes()}`
})

const isSender = computed(() => {
    return props.sender === route.params.id ? true : false;
})

</script>


<template>

    <div class="message-container"
        :class="{ sender: isSender, recipient: !isSender }"
        v-if="text"
    >
        <div class="message">
            <div class="message__text">
                {{ text }}
            </div>
            <div class="message__date">
                {{ msgDate }}
            </div>
        </div>
    </div>

</template>



<style lang="scss" scoped>

@import "@design";

.message-container {
    margin-bottom: 20px;
}

.message {
    max-width: 300px;
    min-width: 100px;
    display: inline-block;
    border-radius: 3px;
    padding: 7px;
}


.message__date {
    text-align: right;
    font-size: $text-1;
    color: var(--text-default-medium);
}

.message__text {
    font-size: $text-4;
}

.sender {
    margin-left: auto;
}

.message-container.sender .message {
    background-color: var(--brand-primary-high);
}

.message-container.recipient .message {
    background-color: var(--bg-default-low);
}

</style>