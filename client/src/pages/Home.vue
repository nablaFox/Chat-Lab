<script setup>

</script>


<template>

    <div class="home">

        <div class="hero">
            <div class="hero__link">
                <router-link to="/login" class="header__item"> Login </router-link>
            </div>

            <div class="hero__link">
                <router-link to="/register" class="header__item"> Register </router-link>
            </div>
        </div>


    </div>

</template>


<style lang="scss" scoped>

.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero__link {
    padding: 20px;
}


</style>