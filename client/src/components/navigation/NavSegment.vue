<script setup>

const props = defineProps({
    icon: String,
    label: String,
    isCircular: Boolean
})

defineEmits(['select'])

</script>



<template>

    <div class="segment">
        <button
            :class="{ circular: isCircular }"
            class="segment__btn"
            @click="$emit('select')"
        >
            <span class="material-icons state-layer">
                {{ icon }}
            </span>
        </button>

        <label class="segment__label" v-if="label && !isCircular">
            {{ label }}
        </label>
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
    .state-layer { padding: 4px 20px }

    &.circular {
        border-radius: $full-rounded;
        .state-layer { padding: 16px }
    }
}

.segment__label {
    @extend %label-medium
}

.active .segment__btn {
   background-color: var(--md-sys-color-secondary-container);
   color: var(--md-sys-color-on-secondary-container);
}


</style>