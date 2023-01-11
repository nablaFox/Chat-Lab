import MainLayout from '@layouts/Main.vue'
import { toRaw, ref } from 'vue'
import { useUserStore } from '@stores/users'
import { useChatStore } from '@stores/chats'


async function user(to, from, next) {
    const userStore = useUserStore()
    await userStore.get(to.params.id)
    next()
}

// error handle
async function chat(to) {
    const chatStore = useChatStore()
    const userStore = useUserStore()

    to.meta.loaded.value && (to.meta.loaded.value = false)

    to.meta.recipient.value = toRaw(
        userStore.user.chat.find(chat => chat._id === to.params.chat)
    ).recipient

    await chatStore.get(to.params.chat) // if needed
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
