<template>
    <div class="full-centered">
        <div style="padding: 2rem;">
            <div>{{ title }}</div>

            <div style="font-size: 1.5rem;">
                Token expires at:
                <strong>{{ expiresAt }}</strong>
            </div>

            <div style="font-size: 1.5rem">
                Your session will expire in:
                <strong>{{ expiresIn }}</strong>
            </div>

            <div style="gap: 3px; display: flex; flex-wrap: wrap; justify-content: center; margin-top: 1rem;">
                <UiBaseButton title="Refresh" @click="handleRefresh" />
                <UiBaseButton title="Revoke" @click="handleRevoke" />
                <UiBaseButton title="Logout" @click="handleLogout" />
            </div>

            <hr>
            <div style="font-size: 1.5rem; margin-top: 2rem;">List of users</div>
            <div style="margin-top:2rem; display:flex; flex-wrap:wrap; justify-content: center; gap:7px;">
                <UiBaseBadge v-for="item in items" :key="item.id" :text="item.name" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const { checkAuth } = useAuth()
const user = await checkAuth()

const title = 'Welcome' + (user?.name ? ', ' + user.name : ' at home')

interface User {
    id: number
    name: string
    email: string
}

const items = ref<User[]>([])

const api = useApi()
const response = await api.request<User[] | { data: User[] }>('/user')
items.value = Array.isArray(response) ? response : response.data ?? []

const expiresAt = ref('-')
const expiresIn = ref('-')

const updateTTL = () => {
    const ttl = localStorage.getItem('ttl')

    if (!ttl) {
        expiresAt.value = 'Not found'
        expiresIn.value = '-'
        return
    }

    // Parse "2026-07-03 13:02:06"
    const expiry = new Date(ttl.replace(' ', 'T'))

    if (isNaN(expiry.getTime())) {
        expiresAt.value = 'Invalid date'
        expiresIn.value = '-'
        return
    }

    expiresAt.value = expiry.toLocaleString()

    const diff = expiry.getTime() - Date.now()

    if (diff <= 0) {
        expiresIn.value = 'Expired'
        return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    const parts: string[] = []

    if (days > 0) parts.push(`${days}d`)
    if (hours > 0) parts.push(`${hours}h`)
    if (minutes > 0) parts.push(`${minutes}m`)

    // Always show seconds
    parts.push(`${seconds}s`)

    expiresIn.value = parts.join(' ')
}

let timer: ReturnType<typeof setInterval>

onMounted(() => {
    updateTTL()
    timer = setInterval(updateTTL, 1000)
})

onUnmounted(() => {
    clearInterval(timer)
})

const handleLogout = async () => {
    const { logout } = useAuth()
    await logout()
}

const handleRefresh = async () => {
    const { refresh } = useAuth()
    await refresh()
}

const handleRevoke = async () => {
    const { revoke } = useAuth()
    await revoke()
}

</script>
<style scoped>
.full-centered {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2rem;
    text-align: center;
}
</style>