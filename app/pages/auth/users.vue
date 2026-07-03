<template>
    <div class="container">
        <div style="font-size: 1.5rem; margin-top: 2rem;">List of users</div>
        <div style="margin-top:2rem; display:flex; flex-wrap:wrap; justify-content: center; gap:7px;">
            <UiBaseBadge v-for="item in items" :key="item.id" :text="item.name" />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

interface User {
    id: number
    name: string
    email: string
}

const items = ref<User[]>([])

const api = useApi()
const response = await api.request<User[] | { data: User[] }>('/user')
items.value = Array.isArray(response) ? response : response.data ?? []


</script>
<style scoped></style>