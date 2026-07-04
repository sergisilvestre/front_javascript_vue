<template>
  <p v-if="errorMsg" class="error">
    {{ errorMsg }}
  </p>
</template>
<script setup lang="ts">
defineProps<{
  errorMsg?: string;
}>();
</script>
<style scoped>
.error {
  color: #ff8a80;
}
</style>
