<script setup>

import { onMounted, provide, ref } from 'vue';

const resize = () => {
  document.documentElement.style.setProperty('--full-vh', `${window.innerHeight}px`)
}

const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
const darkMode = ref(theme)
const root = document.documentElement

function changeTheme() {
   darkMode.value = !darkMode.value

   if (darkMode.value) {
      root.classList.replace('light', 'dark')
   } else {
      root.classList.replace('dark', 'light')
   }
}

onMounted(() => {
   resize()
   theme ? 
      root.classList.add('dark')
      : root.classList.add('light')
   
   window.addEventListener('resize', resize)
})

provide('theme', {
   darkMode,
   changeTheme,
})


</script>


<template>

   <router-view v-slot="{ Component, route }">
      
      <component :is="route.meta.layout">

         <component 
            :is="route.meta.transition" 
            v-if="route.meta.transition"
         >
            <component :is="Component"></component>
         </component>

         <component :is="Component" v-else></component>

      </component>

   </router-view>

</template>

<!-- global styles -->
<style lang="scss">

@import "@design";
@import '@plugins/normalize.css';
@import './assets/styles/themes/dark.scss';
@import './assets/styles/themes/light.scss';
@import './assets/styles/reset.scss';
@import './assets/styles/global.scss';

</style>