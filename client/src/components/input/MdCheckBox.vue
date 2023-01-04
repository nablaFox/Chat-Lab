<!-- to complete -->

<script setup>

defineProps({
    checked: Boolean,
    required: Boolean,
    indeterminate: Boolean
})
defineEmits(['update:checked'])

</script>


<template>

    <span class="state-layer md-checkbox">
        <input
            type="checkbox"
            class="material-icons checkbox"
            :required="required"
            :indeterminate="indeterminate"
            :checked="checked"
            @change="$emit('update:checked', $event.target.checked)"
        >
    </span>

</template>



<style lang="scss" scoped>

@import "@design";





.md-checkbox__container {
    overflow: hidden;
    border-radius: $full-rounded;
    padding: 11px;
    width: 40px;
    aspect-ratio: 1;
}


.md-checkbox__container:has(.md-checkbox:checked) {
        display: none;
    }

.md-checkbox {
    position: relative;
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid var(--md-sys-color-on-surface-variant);
    border-radius: 2px;
}

.md-checkbox:checked {
    background-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
    border: none;
}


.md-checkbox:checked:after {
    content: 'check';
	font-size: 18px;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}



.md-checkbox:indeterminate {
    
}

.md-checkbox:invalid {
    border-color: var(--md-sys-color-error);
}

.md-checkbox:checked:invalid {
    display: none!important
}


</style>