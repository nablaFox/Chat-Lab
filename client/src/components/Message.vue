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



<style scoped>

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
}

.sender {
    margin-left: auto;
}

.message-container.sender .message {
    background-color: green;
}

.message-container.recipient .message {
    background-color: yellow;
}

</style>