<script setup>

import MdButton from '@components/actions/MdButton.vue'


</script>


<template>

    <div class="home">

        <MdButton
            as="router-link"
            href="/login"
            label="Login"
            variant="outlined"
        />

    </div>



</template>


<style lang="scss" scoped>

@import "@design";

.home {
    height: var(--full-vh);
    @include flex($direction: column);
    gap: 24px;
}

.test {
    background-color: var(--md-sys-color-primary-container);
}


</style>