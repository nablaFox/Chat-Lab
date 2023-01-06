<script setup>

import ListItem from '@components/containment/ListItem.vue'
import Search from '@components/navigation/Search.vue'

</script>


<template>
    
    <div class="chat-list">
        <div class="chat-list__head">
            <h1 class="chat-list__title"> Conversations </h1>
            <Search
                leading-icon="search"
                :trailing-icon="null"
                placeholder="Search chat"
            />
        </div>

        <div class="chat-list__wrapper">
            <ListItem
                v-for="n in 20"
                headline="Username"
                :class="n == 1 && 'active'"
                round
            >
                Hello world, this message is just for text
            </ListItem>
        </div>
    </div>

</template>


<style lang="scss">

@import "@design";

.chat-list {
    max-width: 100%;
    overflow: hidden;
}

.chat-list__head {
    @include flex($direction: column);
    gap: 30px;
    margin-bottom: 30px;
}

.search { height: 45px }

.chat-list__wrapper {
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: thin;
    box-sizing: content-box!important;
    padding-right: 10px;
}

.list-item {
    background-color: transparent!important;
    width: auto!important;
}

</style>