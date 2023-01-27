<script setup>

import { useAuthStore } from '@stores/auth'
import { useResize } from '@composables/resize'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { StatusBar, Style } from '@capacitor/status-bar'

useResize()

const authStore = useAuthStore()
const router = useRouter()

const setStatusBarStyleDark = async () => {
    await StatusBar.setStyle({ style: Style.Dark })
    await StatusBar.setBackgroundColor({ color: '#1b1b1f' })
}
  
const setStatusBarStyleLight = async () => {
    await StatusBar.setStyle({ style: Style.Light })
    await StatusBar.setBackgroundColor({ color: '' })
}

onBeforeMount( async () => {
    authStore.checkAuth()
    setStatusBarStyleDark()
})



</script>

<template>

    <router-view v-slot="{ Component, route }">
        <component :is="route.meta.layout || 'div'"> 
            <component :is="Component"></component>
        </component>
    </router-view>
    
</template> 