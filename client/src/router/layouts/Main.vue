<script setup>

import { inject } from 'vue'

import NavRail from '@components/navigation/NavigationRail.vue'
import IconButton from '@components/actions/IconButton.vue'

const { darkMode, changeTheme } = inject('theme')

const destinations = [
    { icon: 'chat_bubble_outline', id: 0, circular: true },
    { icon: 'account_circle', id: 1, circular: true },
    { icon: 'lightbulb', id: 2, circular: true },
    { icon: 'local_pizza', id: 3, circular: true }
]

</script>

<template>

    <div class="main-layout">
        <NavRail
            fab-icon="graphic_eq"
            fab-variant="tertiary"
            alignment="top"
            :destinations="destinations"
            :menu="false"
        >
            <IconButton
                v-if="darkMode"
                class="toggle_theme-btn"
                icon="light_mode"
                @click="changeTheme"
            />

            <IconButton
                v-else
                class="toggle_theme-btn"
                icon="dark_mode"
                @click="changeTheme"
            />
        </NavRail> 
        
        <slot />
    </div>
    
</template>


<style lang="scss" scoped>

@import "@design";

$normal-ver-spacing: 14px;
$large-ver-spacing: 24px;

$normal-horiz-spacing: 24px;

.main-layout {
    display: flex;
    background-color: var(--md-sys-color-surface1);
    height: var(--full-vh);
}

.nav-rail {
    height: 100%;
    gap: 50px;
    padding: 0px 12px;
    padding-bottom: $normal-ver-spacing;
    border-right: 1px solid var(--md-sys-color-outline-variant);

    @include minSize(1400px) { padding-bottom: $large-ver-spacing }
}

:slotted(div),
.nav-rail  {
    padding-top: $normal-ver-spacing!important;
    @include minSize(1400px) { padding-top: $large-ver-spacing!important }
}

:slotted(div) {
    margin: 0 $normal-horiz-spacing;
}

.toggle_theme-btn { margin-top: auto }

</style>


