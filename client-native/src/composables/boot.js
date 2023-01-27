import { useChatStore } from '@stores/chat'
import { useUserStore } from '@stores/user'
import socket from '@services/socketio'

export async function useBoot(payload) {
    const chatStore = useChatStore()
    const userStore = useUserStore()

    const { user, token } = JSON.parse(payload)

    userStore.set(user)

    await chatStore.init(
        user.id,
        token
    )

    socket.connect(user.id)
}