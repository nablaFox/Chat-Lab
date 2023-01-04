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
    }
})

defineEmits(['leadingClick', 'trailingClick'])

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
        >

        <div class="search__trailing">
            <div class="search__trailing-1">
                <IconButton 
                    :icon="trailingIcon"
                    @click="$emit('trailingClick')"
                />
            </div>

            <slot name="trailing-2"></slot>
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
    width: 355px;
}

.search__trailing {
    @include flex()
}

.search__input {
    width: 100%;
}

</style>
