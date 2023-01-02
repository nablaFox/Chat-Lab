<script setup>

import { onMounted } from 'vue';

const resize = () => {
  document.documentElement.style.setProperty('--full-vh', `${window.innerHeight}px`)
}

onMounted(() => {
   resize()
   window.addEventListener('resize', resize)
})


</script>


<template>

   <router-view v-slot="{ Component, route }">
      
      <component :is="route.meta.layout">
         <component :is="route.meta.transition || 'div'">
            <component :is="Component"></component>
         </component>
      </component>

   </router-view>

</template>

<!-- global styles -->
<style lang="scss">

@import "@design";
@import '@plugins/normalize.css';
@import './assets/styles/themes/dark.scss';
@import './assets/styles/themes/light.scss';

body {
   background-color: var(--md-sys-color-background);
   color: var(--md-sys-color-on-surface);
   @extend %body-large;
}

* {
   box-sizing: border-box;
}

</style>