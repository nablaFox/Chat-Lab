<script setup>

import IconButton from '@components/actions/IconButton.vue'

</script>

<template>

    <div class="action-bar">
        <IconButton icon="menu" />
        <div class="action-bar__title"> Echo </div>
        <IconButton icon="search" />
    </div>
    
</template>


<style lang="scss" scoped>

@import "@design";

.action-bar {
    width: 100%;
    height: 88px;
    @include flex($justify: space-between);
}

.action-bar__title {
    user-select: none;
    @extend %title-large;
}


</style>