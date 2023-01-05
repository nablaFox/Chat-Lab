<!-- to complete -->

<script setup>

import IconButton from '@components/actions/IconButton.vue'

defineProps({
    leadingIcon: {
        type: String,
        default: 'menu'
    },
    trailingIcon: {
        type: String,
        default: 'search'
    },
    placeholder: String,
    text: String
})

defineEmits(['leadingClick', 'trailingClick', 'update:text'])

</script>


<template>

    <div class="search">
       <div 
            class="search__leading-icon" 
            v-if="leadingIcon"
        >
            <IconButton 
                :icon="leadingIcon"
                @click="$emit('leadingClick')"
            />
        </div>

        <input
            class="search__input"
            type="text" 
            :placeholder="placeholder"
            :value="text"
            @input="$emit('update:text', $event.target.value)"
        >

        <div class="search__trailing">

            <IconButton 
                :icon="trailingIcon"
                v-if="trailingIcon"
                @click="$emit('trailingClick')"
            />

        </div>
    </div>

</template>



<style lang="scss" scoped>

@import "@design";

.search {
    position: relative;
    overflow: hidden;
    border-radius: $extra-large-rounded;
    background-color: var(--md-sys-color-surface3);
    @include flex();
    padding: 4px;
    gap: 4px;
    width: 100%;
}

.search__trailing {
    @include flex()
}

.search__input {
    width: 100%;
}

</style>
