<script setup>

import { computed } from 'vue'

defineEmits(['select'])

const props = defineProps({
    lastmessage: String,
    timestamp: String,
    username: String,
})

const lastDate = computed(() => {
    const currentDate = new Date()
    const date = new Date(props.timestamp)
    const diff = currentDate.getTime() - date.getTime()
    const diffInHours = diff / (1000 * 60 * 60)
    const diffInDays = diff / (1000 * 60 * 60 * 24)

    if (diffInHours <= 24) {
        return `${date.getHours()}:${date.getMinutes()}`;
    } else if (diffInDays <= 7) {
        return `${Math.floor(diffInDays)} giorni fa`;
    }
})

</script>


<template>

    <div class="chat-box" @click="$emit('select')">
        <div class="chat-box__pic">

        </div>

        <div class="chat-box__right">
            <div class="chat-box__body">
                <div class="chat-box__username">
                    {{ username }}
                </div>

                <div class="chat-box__last-msg">
                    {{ lastmessage }}
                </div>
            </div>

            <div class="chat-box__timestamp">
                {{ lastDate }}
            </div>
        </div>

        
    </div>

</template>

<style scoped>

.chat-box {
    display: flex;
    align-items: center;
}

.chat-box__pic {
    min-width: 40px;
    min-height: 40px;
    border-radius: 100px;
    background-color: aqua;
    margin-left: 10px;
}

.chat-box__username {
    margin-bottom: 5px;
}

.chat-box__right {
    width: 100%;
    display: flex;
    margin-left: 10px;
    padding: 20px 10px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}

.chat-box__timestamp {
    margin-left: auto;
}

</style>