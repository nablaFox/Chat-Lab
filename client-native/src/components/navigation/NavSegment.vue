<!-- add animations on active -->

<script setup>

const props = defineProps({
    href: { type: String, default: '/' },
    icon: String,
    label: String,
    circular: Boolean
})

defineEmits(['select'])

</script>


<template>

    <div class="segment">
        <router-link
            :to="href"
            :class="{ circular: circular }"
            class="segment__btn"
            @click="$emit('select')"
        >
            <span class="material-icons">
                {{ icon }}
            </span>
        </router-link>

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
    width: 100%;
}

.segment__btn {
    overflow: hidden;
    border-radius: $large-rounded;
    padding: 4px 20px;
    @include flex();

    &.circular {
        border-radius: $full-rounded;
        padding: 16px;
    }
}

.segment__label { @extend %label-medium }

.active {
    .segment__btn {
        background-color: var(--md-sys-color-secondary-container);
        color: var(--md-sys-color-on-secondary-container);
    }

    .segment__label { font-weight: 700 }
}

</style>