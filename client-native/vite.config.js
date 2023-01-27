import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const aliases = require('./aliases.config')


export default defineConfig({
	resolve: {
        alias: aliases
    },
	plugins: [vue()]
})
