<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">
      {{ label }}
    </label>

    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="['input', { error }]"
    />

    <p v-if="error" class="input-error">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: { type: String, default: "text" },
  placeholder: String,
  error: String,
  disabled: Boolean,
});

const model = defineModel();
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

/* label */
.input-label {
  font-size: 14px;
  color: #333;
}

/* input base */
.input {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;

  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: #fff;

  outline: none;
  transition: all 0.2s ease;

  color: #111;
}

/* focus state */
.input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

/* placeholder */
.input::placeholder {
  color: #9aa4b2;
}

/* hover */
.input:hover {
  border-color: #aab4c0;
}

/* error state */
.input.error {
  border-color: #e5484d;
}

.input.error:focus {
  box-shadow: 0 0 0 3px rgba(229, 72, 77, 0.15);
}

/* error text */
.input-error {
  font-size: 12px;
  color: #e5484d;
}
</style>
