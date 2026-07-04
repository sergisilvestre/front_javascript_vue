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
                <UiBaseButton @click="submitForm" title="Create User" />
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: "auth",
});

const route = useRoute()
const item_id = route.params.id
const item = JSON.parse(route.query.item as string)
const router = useRouter();

const form = reactive({
    name: item.name,
    email: item.email,
    password: ""
});

const formErrors = reactive<Record<string, string>>({
    name: "",
    email: "",
    password: ""
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
        const response = await request(`/user/${item_id}`, {
            method: "PUT",
            body: {
                name: form.name,
                email: form.email,
                password: form.password
            },
        });

        console.log("User created:", response);
    } catch (error: any) {
        console.error("Error creating user:", error);

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
        const response = await request(`/user/${item_id}`, {
            method: "DELETE",
        });

        console.log("User deleted:", response);

        await router.push("/auth/user");
    } catch (error: any) {
        console.error("Error deleting user:", error);
    }
};

</script>
