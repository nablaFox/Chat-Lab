import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    routes,
    history: createWebHashHistory(),
    //scrollBehavior()
})

export default router