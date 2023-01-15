import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    routes,
    history: createWebHashHistory(),
    //scrollBehavior()
})

// auth rules
router.beforeEach(async (to, from) => {

})

router.beforeResolve(async (to, from, next) => {
    for (const route of to.matched) {
        if (route.meta && route.meta.beforeResolve) {
            route.meta.beforeResolve(to, from)
        }
    }

    next()
})

export default router