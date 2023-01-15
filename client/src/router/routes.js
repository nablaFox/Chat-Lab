import MainLayout from '@layouts/Main.vue'
import { ref } from 'vue'
import { useUserStore } from '@stores/users'
import { useChatStore } from '@stores/chats'


async function user(to, from, next) {
    const userStore = useUserStore()
    await userStore.get(to.params.id)
    next()
}

async function chat(to) {
    const chatStore = useChatStore()
    to.meta.loaded.value = false

    await chatStore.init(to.params.chat) // if needed

    to.meta.recipient.value = chatStore.chats[to.params.chat]
        .participants
        .find(p => p._id !== to.params.id)

    to.meta.loaded.value = true
}

export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@pages/index.vue'),
        meta: { layout: MainLayout }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@pages/Login.vue'),
        meta: { layout: MainLayout }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@pages/Register.vue'),
        meta: { layout: MainLayout }
    },
    {
        path: '/users/:id',
        name: 'user',
        meta: { layout: MainLayout },
        component: () => import('@pages/User.vue'),
        beforeEnter: user,
        children: [
            {
                name: 'chat',
                path: ':chat',
                component: () => import('@components/chat/Chat.vue'),
                meta: { 
                    beforeResolve: chat, 
                    loaded: ref(false),
                    recipient: ref({})
                },
            }
        ]
    },
]
