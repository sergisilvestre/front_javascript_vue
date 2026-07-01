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

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>