import { reactive, ref } from "vue";
import { useRouter } from "#imports";
import { useApi } from "@/composables/useApi";
import { userApi } from "@/services/api/user.api";
import type { User } from "@/types/user";

export const useUserService = () => {
  const router = useRouter();
  const { request } = useApi();

  // Create user form
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

      throw error;
    }
  };

  // User list
  const items = ref<User[]>([]);
  const loading = ref(false);

  const fetchUsers = async () => {
    loading.value = true;

    try {
      const response = await userApi.list(request);
      items.value = Array.isArray(response)
        ? response
        : (response.data ?? []);
    } finally {
      loading.value = false;
    }
  };

  return {
    // Create
    form,
    formErrors,
    submitForm,
    resetFormErrors,

    // List
    items,
    loading,
    fetchUsers,
  };
};