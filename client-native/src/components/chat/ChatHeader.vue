<script setup>

import IconButton from '@components/actions/IconButton.vue'

defineProps({
    username: String
})

</script>


<template>

    <div class="chat-header">
        <div class="chat-header__top">
            <div class="chat-header__leading">
                <IconButton 
                    icon="arrow_back"
                    as="router-link"
                    href="/"
                />
            </div>

            <div class="chat-header__trailing">
                <IconButton icon="search"/>
                <IconButton icon="more_vert"/>
            </div>
        </div>
        
        <div class="chat-header__headline"> 
            {{ username }}
        </div>
    </div>


</template>


<style lang="scss" scoped>

@import "@design";

.chat-header {
    padding-top: 8px;
    width: 100%;
    padding-bottom: 10px;
    @include flex($direction: column);
    gap: 4px;
}

.chat-header__top {
    width: 100%;
    @include flex()
}

.chat_header__leading {  @include flex(); }

.chat-header__trailing {
    width: 100%;
    @include flex($justify: end);
}

.chat-header__headline {
    @extend %headline-small;
    align-self: start;
    padding-left: 4px;
}

</style>