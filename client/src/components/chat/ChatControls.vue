<!-- add transition to send icon -->

<script setup>

import { ref } from 'vue'
import IconButton from '@components/actions/IconButton.vue'

const props = defineProps({
    leadingIcon1: {type: String, default: 'mood'},
    leadingIcon2: String,
    trailingIcon1: { type: String, default: 'mic' },
    trailingIcon2: String,
    placeholder: {type: String, default: 'Aa'},
})
const emit = defineEmits(['send'])

const textarea = ref(null)
const message = ref('')

function resize() {
    const tx = textarea.value;
    tx.style.height="auto"
    tx.style.height = `${tx.scrollHeight}px`

    if (tx.scrollHeight >= 200) { 
        tx.style.overflow = 'scroll'
    }
}

function send(e) {
    if (!e.shiftKey) {
        e.preventDefault()
        emit('send', message.value)
        textarea.value.style.height="auto"
        message.value = ''
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
            <textarea
                ref="textarea"
                class="textarea"
                rows="1"
                :placeholder="placeholder"
                v-model="message"
                @input="resize"
                @keydown.enter="send"
            ></textarea>

            <div class="chat-controls__trailing">
                <template v-if="!message.length">
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
                />
            </div>
        </div>
    </footer>


</template>



<style lang="scss" scoped>

@import "@design";

.chat-controls {
    width: 100%;
    display: flex;
    gap: 10px;
    padding: 0px 10px;
    padding-bottom: 10px;
}

.chat-controls__left {
    display: flex;
    align-items: end;
    padding-bottom: 4px;
}

.chat-controls__right {
    background-color: var(--md-sys-color-surface5);
    width: 100%;
    height: fit-content;
    border-radius: $extra-large-rounded;
    padding: 4px 10px;
    gap: 8px;
    padding-left: 25px;
    display: flex;
    align-items: center;
}

.textarea {
    overflow: hidden;
    resize: none;
    padding: 8px 0;
    max-height: 200px;
    scrollbar-width: thin;
    color: var(--md-sys-color-on-surface)
}

.chat-controls__trailing {
    align-self: end;
}

:deep(.material-icons-outlined),
:deep(.material-icons-round) { font-size: 26px }

</style>
