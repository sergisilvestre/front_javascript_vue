<template>
    <div class="sidebar-container">
        <div class="sidebar-content">
            <div
                style="padding: 20px; display: flex; flex-direction: column;">
                <div v-if="user"
                    style="justify-content: center; align-items: center; display: flex; flex-direction: column;">
                    <img :src="avatar" height="65" width="65"
                        style="margin-bottom: 10px; border-radius: 50%; background-color: #ccc; border: solid 3px white;" />
                    <span style="display: block; text-align: left; width: 100%;">{{ user.name }}</span>
                    <span style="display: block; text-align: left; width: 100%;">{{ user.email }}</span>
                </div>
            </div>
            <hr style="width: 100%; margin: 20px 0px;" />
            <div style="display: flex; flex-direction: column; margin-bottom: auto;">
                <UiBaseSidebarLink text="Profile" to="/auth/profile" />
                <UiBaseSidebarLink text="Users" to="/auth/users" />
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <UiBaseSidebarLink text="Logout" @click="handleLogout" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import avatar from '../../../assets/images/avatar.webp'

const handleLogout = async () => {
    const { logout } = useAuth()
    await logout()
}

const { checkAuth } = useAuth()
const user = await checkAuth()

</script>
<style scoped>
.sidebar-container {
    color: white;
    width: 350px;
    max-width: 85%;
    height: 100dvh;
    background-color: #000000;
    box-shadow: 2px 0 5px rgba(125, 125, 125, 1);
}

.sidebar-content {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>