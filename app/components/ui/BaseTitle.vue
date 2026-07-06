<template>
    <span class="title">{{ title }}</span>
</template>

<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>
<style scoped>
.title {
    font-size: 1.5rem;
    font-weight: bold;
}
</style>