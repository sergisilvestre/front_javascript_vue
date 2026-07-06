<template>
  <div class="container">
    <UiBaseTitle title="Create user" style="margin-right: auto"></UiBaseTitle>
    <div style="display: flex; flex-direction: column; gap: 20px; padding: 20px;">
      <div>
        <UiBaseInput v-model="form.name" label="Name" placeholder="Enter your name" />
        <UiBaseError :errorMsg="formErrors.name" />
      </div>
      <div>
        <UiBaseInput v-model="form.email" label="Email" placeholder="Enter your email" />
        <UiBaseError :errorMsg="formErrors.email" />
      </div>
      <div>

        <UiBaseInput v-model="form.password" label="Password" placeholder="Enter your password" type="password" />
        <UiBaseError :errorMsg="formErrors.password" />
      </div>
      <div>
        <UiBaseButton @click="submitForm" title="Store" />
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { useUserService } from "@/services/user.service";

definePageMeta({
  middleware: "auth",
});

const { form, formErrors, submitForm } = useUserService();
</script>