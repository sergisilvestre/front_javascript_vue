<template>
  <div class="container">
    <div style="
        font-size: 1.5rem;
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
      ">
      <span style="margin-right: auto"> List of users </span>
      <UiBaseButtonIcon type="create" to="/auth/user/create" />
    </div>
    <div style="
        margin-top: 2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 7px;
      ">
      <NuxtLink v-for="item in items" :key="item.id" :to="{
        path: `/auth/user/${item.id}`, query: {
          item: JSON.stringify(item)
        }
      }" class="sidebar-link">
        <UiBaseBadge :text="item.name" style="display: block;"/>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

interface User {
  id: number;
  name: string;
  email: string;
}

const items = ref<User[]>([]);

const api = useApi();
const response = await api.request<User[] | { data: User[] }>("/user");
items.value = Array.isArray(response) ? response : (response.data ?? []);
</script>
<style scoped></style>
