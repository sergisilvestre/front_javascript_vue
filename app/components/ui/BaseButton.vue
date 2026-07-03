<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['btn', variant, { loading }]"
  >
    {{ title }}
    <span v-if="loading" class="spinner"></span>
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' },
  loading: Boolean,
  title: { type: String, default: 'Submit' },
  disabled: Boolean
})
</script>

<style scoped>
.btn {
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  background: #000000;
  color: white;
}

.btn:hover {
  background: #000000;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

</style>