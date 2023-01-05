<script setup>

const props = defineProps({
    icon: String,
    label: String,
    circular: Boolean
})

defineEmits(['select'])

</script>


<template>

    <div class="segment">
        <button
            :class="{ circular: circular }"
            class="segment__btn state-layer"
            @click="$emit('select')"
        >
            <span class="material-icons">
                {{ icon }}
            </span>
        </button>

        <div 
            class="segment__label" 
            v-if="label && !circular"
        >
            {{ label }}
        </div>
    </div>

</template>


<style lang="scss" scoped>

@import "@design";

.segment {
    @include flex($direction: column);
    gap: 4px;
}

.segment__btn {
    overflow: hidden;
    border-radius: $large-rounded;
    padding: 4px 20px;

    &.circular {
        border-radius: $full-rounded;
        padding: 16px;
    }
}

.segment__label { @extend %label-medium }

.active .segment__btn {
   background-color: var(--md-sys-color-secondary-container);
   color: var(--md-sys-color-on-secondary-container);
}

</style>