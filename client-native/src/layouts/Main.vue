<script setup>

import NavBar from '@components/navigation/NavBar.vue';

// variabili del layout (icone, fab, ecc.) da rendere disponibili con provide


</script>


<template>
    <div class="main-layout">
        <!-- navigation drawer -->
        <slot />
        <NavBar />
    </div>
</template>


<style lang="scss" scoped>

@import "@design";

.main-layout {
    position: relative;
    height: var(--full-vh);
    overflow: hidden;
}

</style>