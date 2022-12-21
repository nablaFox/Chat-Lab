<script setup>

const props = defineProps({
    id: String,
    placeholder: String,
    label: String,
    text: String,
})


</script>


<template>

    <div class="input-wrapper">
        <label :for="id"> {{ label }} </label>
        <input 
            type="text"
            :id="id"
            :placeholder="placeholder"
            :value="text"
            @input="$emit('update:text', $event.target.value)"
        />
    </div>

</template>

<style lang="scss" scoped>

input {
    width: 100%
}


</style>