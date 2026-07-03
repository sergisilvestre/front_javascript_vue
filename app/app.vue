<template>
    <div>
        <NuxtPage />
        <UiBaseLoadingPage v-if="loading" />
    </div>
</template>
<script setup lang="ts">
const { checkAuth } = useAuth()
const startupLoading = useState<boolean>('appStartupLoading', () => true)
const apiLoading = useState<boolean>('apiLoading', () => false)
const loading = computed(() => startupLoading.value || apiLoading.value)

let intervalId: ReturnType<typeof setInterval>

onMounted(async () => {
    await checkAuth()
    startupLoading.value = false

    intervalId = setInterval(async () => {
        await checkAuth()
    }, 60 * 1000)
})

onUnmounted(() => {
    clearInterval(intervalId)
})
</script>
<style>
body {
    margin: 0;
    padding: 0;
}

input,
button {
    box-sizing: border-box;
}
</style> 