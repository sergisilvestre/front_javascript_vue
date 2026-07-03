<template>
    <div class="full-centered">
        <div style="padding: 2rem;">
            <div>{{ title }}</div>
            <div>Token expires in:</div>
            <div><UiBaseButton title="Logout" @click="handleLogout" /></div>
            <div style="margin-top:2rem; display:flex; flex-wrap:wrap; justify-content: center; gap: 7px;">
                <UiBaseBadge v-for="item in items" :key="item.id" :text="item.name" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const { checkAuth } = useAuth()

const user = await checkAuth();

const title = 'Welcome' + (user && user.name ? ', ' + user.name : ' at home');

interface User {
    id: number
    name: string
    email: string
}

const items = ref<User[]>([])

const api = useApi()
const response = await api.request<User[] | { data: User[] }>('/user')
items.value = Array.isArray(response) ? response : response.data ?? []

const handleLogout = async () => {
    const { logout } = useAuth()
    await logout()
    
}

</script>
<style scoped>
.full-centered {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2rem;
    text-align: center;
}
</style>