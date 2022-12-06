<script setup>


const props = defineProps({
    username: String
})


</script>


<template>


    <header class="user-header">

        <div class="user-header__photo">
            
        </div>

        <div class="user__header__username">
            {{ username }}
        </div>

    </header>

</template>



<style scoped>


.user-header {
    padding: 10px 16px;
    background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user-header__photo {
    border-radius: 200px;
    width: 43px;
    height: 43px;
    background-color: black;
}

</style>