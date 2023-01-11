<!-- profile image component, search option -->

<script setup>

import IconButton from '@components/actions/IconButton.vue'
import MdMenu from '@components/input/MdMenu.vue'

const props = defineProps({
    username: String,
    profilePhoto: String
})

const items = [
    { label: "Contact info" },
    { label: "Delete Chat" },
    { label: "Important Messages" },
    { label: "Block" }
]

</script>


<template>

    <header
        class="chat-header"
    >
        
        <div class="chat-header__left"> 
            <div class="chat-header__profile-photo"></div>
            {{ username }}            
        </div>

        <div class="chat-header__right"> 
            <IconButton icon="search" />

            <MdMenu
                control="icon-button"
                icon="more_vert"
                :items="items"
            />
        </div>
    </header>


</template>



<style lang="scss" scoped>

@import "@design";

.chat-header {
    height: 80px;
    @include flex($justify: space-between);
    padding: 0 24px;
    width: 100%;
}

.chat-header__left {
    @extend %title-medium;
    @include flex();
    gap: 10px;
}

.chat-header__profile-photo {
    width: 48px;
    height: 48px;
    background-color: var(--md-sys-color-primary);
    border-radius: $full-rounded;

}

.chat-header__right { @include flex(); gap: 5px }


</style>
