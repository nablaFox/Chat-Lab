import { useEventListener } from '@vueuse/core'

const resize = () => document.documentElement.style.setProperty('--full-vh', `${window.innerHeight}px`)

export function useFullResize() {
    resize()
    useEventListener(window, 'resize', resize)
}