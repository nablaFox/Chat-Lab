<script setup>

    import { ref, computed } from 'vue'

    import ChatList from '@components/chat/ChatList.vue'
    import Banner from '@components/chat/Banner.vue'
    
</script>


<template>

    <div class="list-detail-layout">

        <ChatList/>
        <router-view :key="$route.fullPath" ref="chat"/>
        <Banner v-if="!$route.matched[1]" />

    </div>

</template>



<style lang="scss" scoped>

@import "@design";

.list-detail-layout {
    display: flex;
    overflow: hidden;
    gap: 24px;
    width: 100%;
    height: 100%;
}

.chat-list {
    flex: 1;
    max-width: 350px;
}

.chat { flex: 3.3 }

</style>
