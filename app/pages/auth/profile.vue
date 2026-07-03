<template>
    <div class="full-centered" style="flex-direction: column;">
        <div style="gap: 1rem;">
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
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})



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


const handleRefresh = async () => {
    const { refresh } = useAuth()
    await refresh()
}

const handleRevoke = async () => {
    const { revoke } = useAuth()
    await revoke()
}
</script>