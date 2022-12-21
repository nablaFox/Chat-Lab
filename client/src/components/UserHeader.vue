<script setup>

</script>


<template>


    <header class="user-header">
        <div class="user-header__left">
            <div class="user-header__photo"></div>

            <slot name="left"></slot>
        </div>

        <slot name="right"></slot>
    </header>

</template>



<style lang="scss" scoped>

@import "@design";

.user-header {
    padding: 10px 16px;
    background-color: var(--surface-default-low);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $text-5;
}

.user-header__left {
    display: flex;
    align-items: center;
}

.user-header__photo {
    border-radius: 200px;
    width: 43px;
    height: 43px;
    background-color: black;
    margin-right: 13px;
}

</style>