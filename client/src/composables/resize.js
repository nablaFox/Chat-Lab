import { useEventListener } from '@vueuse/core'

const resize = () => document.documentElement.style.setProperty('--full-vh', `${window.innerHeight}px`)

export function useResize() {
    resize()
    useEventListener(window, 'resize', resize)
}