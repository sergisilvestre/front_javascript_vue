<template>
    <div class="login">
        <form @submit.prevent="loginHandler" class="form">
            <h1 class="title">Login</h1>

            <UiBaseInput v-model="email" type="email" placeholder="Email" :disabled="loading" />

            <UiBaseInput v-model="password" type="password" placeholder="Password" :disabled="loading" />

            <UiBaseButton type="submit" variant="primary" :loading="loading" title="Login" />

            <UiBaseError :errorMsg="errorMsg" />
        </form>
    </div>
</template>
<script setup lang="ts">

// import { useApi } from '../../composables/useApi';

const token = useCookie('token')
const router = useRouter()
const { request } = useApi()

const email = ref('user@mail.com')
const password = ref('12345678')
const loading = ref(false)
const errorMsg = ref('')

const loginHandler = async () => {
    loading.value = true
    errorMsg.value = ''

    try {
        const res = await request('/auth/login', {
            method: 'POST',
            body: {
                email: email.value,
                password: password.value,
            },
        })

        if (!res?.data?.token) {
            throw new Error('Invalid response')
        }

        token.value = res.data.token
        localStorage.setItem('token', token.value)

        console.log('Login success')

        await router.push('/auth/home')
    } catch (err: any) {
        console.log('FULL ERROR:', err)

        errorMsg.value =
            err.validationErrors
                ? Object.values(err.validationErrors).flat().join(', ')
                : err.message

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