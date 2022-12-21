<script setup>


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

@import 'normalize.css/normalize.css';
@import '@design';

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