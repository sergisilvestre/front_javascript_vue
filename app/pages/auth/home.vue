<template>
    <div>
        Welcome at home
    </div>
</template>
<script setup>
definePageMeta({
    middleware: 'auth'
})
</script>
<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2rem;
}
</style>