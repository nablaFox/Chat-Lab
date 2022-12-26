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

@import '@design';
@import '@plugins/normalize.css';
@import './assets/styles/themes/dark';
@import './assets/styles/themes/light';

* {
   box-sizing: border-box;
}


body {
   background-color: var(--bg-default-medium);
   font-size: $text-3;
   font-family: $font-family;
   color: var(--text-default-high)
}

</style>