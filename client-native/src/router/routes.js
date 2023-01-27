import MainLayout from '@layouts/Main.vue'
import Chat from '@pages/Chat.vue'
import Home from '@pages/Home.vue'
import Login from '@pages/Login.vue'

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            layout: MainLayout,
        },
    },
    {
        path: '/chat/:chat',
        name: 'chat',
        component: Chat,
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]
