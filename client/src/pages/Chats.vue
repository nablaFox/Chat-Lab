<script setup>

    import { ref } from 'vue'

    import ListItem from '@components/containment/ListItem.vue'
    import Search from '@components/navigation/Search.vue'
    import ChatHeader from '@components/chat/ChatHeader.vue'
    import Controls from '@components/chat/ChatControls.vue'
    import Message from '@components/chat/Message.vue'

    const selected = ref(0);

</script>


<template>


    <div class="list-detail-layout">

        <div class="list">
            <div class="list__head">
                <h1> Conversations </h1>
                <Search
                    style="height: 46px"
                    :trailing-icon="null"
                    leading-icon="search"
                    placeholder="Search chats"
                />
            </div>
            
            <div class="chats__wrapper">
                <ListItem
                    v-for="n in 20"
                    :class="{ active: selected === n}"
                    @click="selected = n"
                    headline="User"
                    round
                >
                    <template #suppText> Hello world, hello world, i am, my</template>
                </ListItem>
            </div>
        </div>

        <div class="detail">
            
            <ChatHeader
                username="Username"
            />

            <div class="messages__wrapper">
                <Message 
                    v-for="n in 2"
                    origin="sender"
                    text="ciao ciao"
                    date="13:50"
                />

                <Message 
                    origin="recipient"
                    text="Ciao amore, come stai?"
                    date="13:50"
                />

                <Message 
                    origin="recipient"
                    text="parapi"
                    date="13:50"
                />

                <Message 
                    origin="sender"
                    text="parapa"
                    date="13:50"
                />

                
            </div>

            <Controls />

        </div>

    </div>


</template>



<style lang="scss" scoped>

@import "@design";

:global(.main-layout) {
    background-color: var(--md-sys-color-surface1);
}

.list-item { 
    background-color: transparent;
    width: 100%;

    &:not(:first-child) { margin-top: 10px }
}

.list-detail-layout {
    margin-top: 24px;
    margin-left: 24px;
    margin-right: 24px;
    display: flex;
    overflow: hidden;
    gap: 24px;
    height: calc(var(--full-vh) - 24px);
}

.list {
    @include flex($direction: column, $align: flex-start);
    width: 320px;
    overflow: hidden;

    @include minSize(1400px) { width: 400px }
}

.list__head {
    @include flex($direction: column, $justify: flex-start);
    gap: 30px;
    width: 100%;
}

.chats__wrapper {
    margin-top: 20px;
    overflow-y: auto;
    width: 100%;
    scrollbar-width: thin;
    padding-right: 10px;
    overflow-x: hidden;
    box-sizing: content-box;
}

.detail {
    @include flex($direction: column, $justify: flex-start);
    border-radius: $large-rounded;
    background-color: var(--md-sys-color-surface);
    width: 100%;
}

.messages__wrapper {
    flex: 1;
    width: 100%;
    overflow-y: scroll;
    padding-right: 20px;
    padding-left: 80px;
    padding-bottom: 15px;
}

.message__container {
    display: flex;
    width: 100%;
}

.message__container:not(:first-child) {
    margin-top: 4px;
}

:deep(.message.sender) {
    margin-left: auto;
}

</style>
