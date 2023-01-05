import MainLayout from '@layouts/Main.vue'

export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@pages/Home.vue'),
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
        path: '/user/:id',
        name: 'user',
        component: () => import('@pages/User.vue'),
        meta: { layout: MainLayout }
    },
]
