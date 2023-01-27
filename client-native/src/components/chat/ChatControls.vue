<!-- add transition to send icon -->

<script setup>

import { useTextareaAutosize } from '@vueuse/core'
import IconButton from '@components/actions/IconButton.vue'

const props = defineProps({
    leadingIcon1: {type: String, default: 'mood'},
    leadingIcon2: String,
    trailingIcon1: { type: String, default: 'mic' },
    trailingIcon2: String,
    placeholder: {type: String, default: 'Aa'},
})
const emit = defineEmits(['send'])

const { textarea, input, triggerResize } = useTextareaAutosize()

function send(e) {
    if (!e.shiftKey) {
        e.preventDefault()
        input.value && emit('send', input.value)
        textarea.value.style.height="auto"
        input.value = ''
        setTimeout(triggerResize, 0)
    }
}

</script>


<template>

   
    <footer class="chat-controls">
        <div class="chat-controls__left"> 
            <IconButton
                v-if="leadingIcon1"
                :icon="leadingIcon1"
            />
            <IconButton
                v-if="leadingIcon2"
                :icon="leadingIcon2"
            />
        </div>

        <div class="chat-controls__right">
            <div class="textarea__wrapper">
                <textarea
                    ref="textarea"
                    class="textarea"
                    rows="1"
                    :placeholder="placeholder"
                    :value="input"
                    @input="e => input = e.target.value"
                    @keydown.enter="send"
                ></textarea>
            </div>

            <div class="chat-controls__trailing">
                <template v-if="!input">
                    <IconButton
                        v-if="trailingIcon1"
                        :icon="trailingIcon1"
                    />
                    <IconButton
                        v-if="trailingIcon2"
                        :icon="trailingIcon2"
                    />
                </template>
            
                <IconButton
                    v-else
                    icon="send"
                    icon-variant="round"
                    @click="send"
                    @touchend.prevent="send"
                />
            </div>
        </div>
    </footer>


</template>



<style lang="scss" scoped>

@import "@design";

$spacing: 10px;

.chat-controls {
    width: 100%;
    display: flex;
    padding: $spacing 0;
    gap: $spacing;
}

.chat-controls__left {
    display: flex;
    align-items: flex-end;
    position: relative;
    gap: 5px;
}

.chat-controls__right {
    display: flex;
    align-items: flex-end;
    width: 100%;
    border-radius: $extra-large-rounded;
    background-color: var(--md-sys-color-surface5);
    padding: 2px $spacing;
}

.textarea__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 10px 5px;
}

.textarea {
    resize: none;
    padding: 0px 0;
    max-height: 200px;
    scrollbar-width: thin;
    color: var(--md-sys-color-on-surface);
}

.chat-controls__trailing {
    @include flex()
}


</style>
