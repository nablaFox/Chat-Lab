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
        
        <slot> </slot>
    </div>
    
</template>


<style lang="scss" scoped>

.main-layout {
    height: var(--full-vh);
    display: flex;

    :slotted(> div) { width: 100% }
}

.nav-rail {
    height: 100%;
    gap: 50px;
    padding: 24px 12px;
    border-right: 1px solid var(--md-sys-color-outline-variant);
}

.toggle_theme-btn { margin-top: auto }

</style>


