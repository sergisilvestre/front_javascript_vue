<template>
  <NuxtLink :to="to" class="sidebar-link">
    {{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to?: string | Record<string, any>;
  text: string;
}>();
</script>
<style scoped>
.sidebar-link {
  padding: 20px 30px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidebar-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
