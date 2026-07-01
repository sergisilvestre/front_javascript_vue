<template>
    <div class="login">
        <form @submit.prevent="login" class="form">
            <h1 class="title">Login</h1>

            <UiBaseInput v-model="email" type="email" placeholder="Email" :disabled="loading" />

            <UiBaseInput v-model="password" type="password" placeholder="Password" :disabled="loading" />

            <UiBaseButton type="submit" variant="primary" :loading="loading" title="Login" />

            <p v-if="errorMsg" class="error">
                {{ errorMsg }}
            </p>
        </form>
    </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const token = useCookie('token')

const email = ref('user@mail.com')
const password = ref('12345678')
const loading = ref(false)
const errorMsg = ref('')

const login = async () => {
    loading.value = true
    errorMsg.value = ''

    try {
        const res: any = await $fetch('/auth/login', {
            baseURL: config.public.apiBase,
            method: 'POST',
            body: {
                email: email.value,
                password: password.value,
            },
        })

        if (!res || !res.data) {
            throw new Error('Invalid response')
        }

        token.value = res.data?.token ?? res.token
        localStorage.setItem('token', token.value);
        console.log('Login success')
    } catch (err) {
        console.error(err)
        errorMsg.value = 'Login failed'
        token.value = null
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login {
    max-width: 320px;
    margin: auto;
    height: 100dvh;
    display: flex;
    align-items: center;
}

.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.title {
    text-align: center;
}

.button {
    width: 100%;
    padding: 10px;
    cursor: pointer;
}

.error {
    color: red;
    font-size: 13px;
    text-align: center;
}
</style>