<script setup>

import { ref, onBeforeMount, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useChatStore } from '@stores/chats'
import { useUserStore } from '@stores/users'
import { storeToRefs } from 'pinia'

import UserHeader from '@components/UserHeader.vue'
import SearchBox from '@components/SearchBox.vue'
import UserBox from '@components/UserBox.vue'
import ChatBox from '@components/ChatBox.vue'
import Message from '@components/Message.vue'
import Controls from '@components/Controls.vue'

const route = useRoute()
const chatStore = useChatStore()
const userStore = useUserStore()

const { searchedUsers } = storeToRefs(userStore)
const { chats, chat } = storeToRefs(chatStore)
const { getUsername } = userStore

const searched = ref('')
const chatSelected = ref('')
const recipient = ref('')
const chatId = ref('')

// methods
function openChat(rec, id) {
    chatSelected.value = true
    recipient.value = rec
    chatId.value = id
    chatStore.getById(id)
}

function check(participants) {
    if (participants[0] == route.params.id) return participants[1]
    else return participants[0]
}

// watchers
let timeoutId = null
watch(searched, (oldValue, newValue) => {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
        if (oldValue) {
            userStore.getByUsername(oldValue)
        }
        else { userStore.searchedUsers = null }
    }, 300)
})

const wrapper = ref(null)
watch(chat, () => {
    nextTick(() => {
        wrapper.value.scrollTop = wrapper.value.scrollHeight
    })
})

// hooks

onBeforeMount(() => {
    chatStore.getByUser(route.params.id)
    chatStore.listen(route.params.id)
    userStore.getAll()

    // window.onbeforeunload = () => chatStore.close()
})


</script>

<template>

    <div class="wrapper">

        <div class="chats-container">
            <UserHeader> </UserHeader>

            <div class="chats-wrapper">
                <SearchBox v-model:text="searched"/>

                <template v-if="searched">
                    <UserBox
                        v-for="user in searchedUsers"
                        :username="user.username"
                        :recipient="user.id"
                        :sender="route.params.id"
                        :bio="user.bio"
                    />
                </template>

                <template v-else>
                    <ChatBox
                        v-for="{ messages, participants, id } in chats"
                        :lastmessage="messages[messages.length - 1].text || ''"
                        :timestamp="messages[messages.length -1].timestamp"
                        :username="getUsername(check(participants))"
                        @select="openChat(check(participants), id)"
                    />
                </template>
                
            </div>
        </div>

        <div class="messages-container"
            :class="{ 'is-open': chatSelected }"
        >

            <template v-if="chatSelected">
                <UserHeader>
                    <template #left> {{ getUsername(recipient) }}</template> 
                </UserHeader>

                <div class="messages-wrapper" ref="wrapper">
                    <div class="messages">
                        <Message
                            v-for="{ sender, text, timestamp } in chat.messages"
                            :sender="sender"
                            :text="text"
                            :date="timestamp"
                        />
                    </div>
                </div>

                <Controls
                    :sender="route.params.id"
                    :recipient="recipient"
                    :chatId="chatId"
                />
               
            </template>

            
            <div class="default-banner" v-else>
                <div class="default-banner__wrapper">
                    <div class="default-banner__icon">
                        Icon
                    </div>

                    <div class="default-banner__title">
                        Title
                    </div>

                    <div class="default-banner__body">
                        Send and receive messages without keeping your phone online. Use whatApp on up to 4 linked devices and 1 phone at the same time.
                    </div>
                </div>
            </div>

        </div>

    </div>


</template>


<style lang="scss" scoped>

@import "@design";

.wrapper {
    display: flex;
    max-width: 1600px;
    margin: 0 auto;
    height: var(--full-vh);

    @include minSize(1441px) { padding: 19px 0 }
}

.chats-container {
    flex: 1;
    border-right: 1px solid var(--border-default-low);
    overflow: hidden;
}

.messages-container {
    flex: 2;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;

    @include maxSize(780px) {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: none;
    }
}

.messages-wrapper {
    overflow-y: scroll;
    height: 100%;
    padding-bottom: 60px;

    &::-webkit-scrollbar {
        width: 0;
    }


}

.messages {
    padding-top: 20px;
    padding-left: 80px;
    padding-right: 80px;
    background-color: var(--bg-default-high);
    min-height: 100%;
    display: flex;
    flex-direction: column;

    @include maxSize(780px) {
        padding-right: 10px;
        padding-left: 10px;
        padding-top: 20px;
    }
}

.default-banner__wrapper {
    max-width: 60%;
}

.default-banner__wrapper * {
    text-align: center;
}

.default-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
}

.is-open {
    display: flex;
}


</style>