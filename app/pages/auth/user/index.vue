<template>
  <div class="container">
    <div style="
        font-size: 1.5rem;
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
      ">
      <UiBaseTitle title="List of users" style="margin-right: auto"></UiBaseTitle>
      <UiBaseButtonIcon type="create" @click="() => navigateTo('/auth/user/create')" />
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
import type { User } from "@/types/user";
import { userApi } from "@/services/api/user.api";

definePageMeta({
  middleware: "auth",
});

const items = ref<User[]>([]);
const api = useApi();

const response = await userApi.list(api.request);
items.value = Array.isArray(response) ? response : (response.data ?? []);
</script>
<style scoped></style>
