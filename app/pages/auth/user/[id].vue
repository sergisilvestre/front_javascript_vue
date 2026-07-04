<template>
    <div class="container">

        <div style="
        font-size: 1.5rem;
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
      ">
            <span style="margin-right: auto"> Edit user </span>
            <UiBaseButtonIcon type="delete" @click="deleteUser" />
        </div>
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

                <UiBaseInput v-model="form.password" label="Password" placeholder="Enter your password"
                    type="password" />
                <UiBaseError :errorMsg="formErrors.password" />
            </div>
            <div>
                <UiBaseButton @click="submitForm" title="Update" />
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { userApi } from "../../../../services/api/user.api";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const itemId = route.params.id as string;
const item = JSON.parse(route.query.item as string);
const router = useRouter();

const form = reactive({
  name: item.name,
  email: item.email,
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
    await userApi.update(request, itemId, {
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

const deleteUser = async () => {
  try {
    await userApi.remove(request, itemId);
    await router.push("/auth/user");
  } catch (error: any) {
    console.error("Error deleting user:", error);
  }
};
</script>
