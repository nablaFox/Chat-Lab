<script setup>


</script>


<template>

   <router-view v-slot="{ Component, route }">
      
      <component :is="route.meta.layout">
         <component :is="route.meta.transition || 'fade'">
            <component :is="Component"></component>
         </component>
      </component>

   </router-view>

</template>

<!-- global styles -->
<style lang="scss">

@import 'normalize.css/normalize.css';
@import '@design';

</style>