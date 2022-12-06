<script setup>

defineProps({
    text: String
})

</script>


<template>

    <div class="search-box">
        <div class="search-box__icon"> I </div>
        <input type="text" 
            placeholder="Search or start new chat"
            :value="text"
            @input="$emit('update:text', $event.target.value)"
        >
        <div class="search-box__icon"> I </div>
    </div>

</template>


<style scoped>

.search-box {
    padding: 8px 15px;
    background-color: green;
    border-radius: 8px;
    display: flex;
    margin-bottom: 30px;
    margin: 20px 10px;
}

.search-box__icon:not(:last-child) {
    margin-right: 30px;
}

.search-box__icon:not(:first-child) {
    margin-left: 10px;
}

input {
    width: 100%;
    background-color: transparent;
    border: none;
}

</style>