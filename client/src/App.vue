<script setup>

import { useFullResize } from '@composables/fullResize';

useFullResize()

</script>


<template>

   <router-view v-slot="{ Component, route }">
      
      <component :is="route.meta.layout">

         <component
            v-if="route.meta.transition"
            :is="route.meta.transition" 
         >
            <component :is="Component"></component>
         </component>

         <component v-else :is="Component"></component>

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