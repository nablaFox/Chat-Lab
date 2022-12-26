<script setup>

import { onMounted, ref } from 'vue'

const props = defineProps({
    placeholder: String,
    text: String
})

const emit = defineEmits(['update:text', 'enter'])

const textarea = ref(null)

onMounted(() => {
    const tx = textarea.value;
    tx.addEventListener("input", OnInput, false)
})

function OnInput() {
    this.style.height = 0
    this.style.height = (this.scrollHeight) + "px"
    if (this.scrollHeight > 150) { this.style.overflowY = 'scroll' }
    else { this.style.overflowY = 'hidden' }
}

function onEnter(e) {
    if (e.shiftKey) {
        return
    } else {
        e.preventDefault()
        emit('enter')
    }
}

const resetHeight = () => textarea.value.style.height = ''

defineExpose({ resetHeight })


</script>


<template>

    <div class="textarea__wrapper">
        <slot name="prepend-icon"></slot>

        <textarea
            ref="textarea"
            class="textarea"
            :placeholder="placeholder"
            rows="1"
            :value="text"
            @keydown.enter="onEnter"
            @input="$emit('update:text', $event.target.value)"
        >
        </textarea>

    </div>


</template>


<style scoped>

.textarea__wrapper {
    width: 100%;
}

.textarea {
    max-height: 150px;
    overflow-y: hidden;
}

.textarea__wrapper {
    display: flex;
}


</style>