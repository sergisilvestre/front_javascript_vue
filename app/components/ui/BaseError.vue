<template>
    <p v-if="errorMsg" class="error">
        {{ errorMsg }}
    </p>
</template>
<script setup lang="ts">
defineProps<{
  errorMsg?: string
}>()
</script>
<style scoped>
.error {
    color: red;
    font-weight: bold;
}
</style>