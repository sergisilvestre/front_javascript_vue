<template>
  <span>{{ text }}</span>
</template>
<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
span {
  font-size: 1rem;
  padding: 4px 15px;
  background-color: #000000;
  border-radius: 25px;
  color: white;
}
</style>
