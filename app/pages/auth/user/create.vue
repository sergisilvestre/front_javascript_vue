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
import { userApi } from "@/services/api/user.api";

definePageMeta({
  middleware: "auth",
});

const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const formErrors = reactive<Record<string, string>>({
  name: "",
  email: "",
  password: "",
});

const { request } = useApi();

const resetFormErrors = () => {
  Object.keys(formErrors).forEach((key) => {
    formErrors[key] = "";
  });
};

const submitForm = async () => {
  resetFormErrors();

  try {
    await userApi.create(request, {
      name: form.name,
      email: form.email,
      password: form.password,
    });

    await router.push("/auth/user");

  } catch (error: any) {
    const validationErrors = error?.validationErrors ?? {};

    Object.keys(formErrors).forEach((key) => {
      const fieldErrors = validationErrors[key];
      formErrors[key] = Array.isArray(fieldErrors)
        ? fieldErrors.join(", ")
        : "";
    });
  }
};
</script>
