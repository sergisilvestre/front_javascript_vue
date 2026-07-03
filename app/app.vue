<template>
    <div>
        <NuxtPage />
        <UiBaseLoadingPage/>
    </div>
</template>
<script setup lang="ts">
const { checkAuth } = useAuth()

let intervalId: ReturnType<typeof setInterval>

onMounted(async () => {
    await checkAuth()

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