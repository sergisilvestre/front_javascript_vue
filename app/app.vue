<template>
  <div>
    <div style="display: flex; flex-direction: row">
      <SharedSidebar v-if="isLoggedIn" />
      <div style="width: 100%">
        <NuxtPage />
      </div>
    </div>
    <UiBaseLoadingPage v-if="loading" />
  </div>
</template>
<script setup lang="ts">
const { checkAuth, isLoggedIn } = useAuth();
const startupLoading = useState<boolean>("appStartupLoading", () => true);
const apiLoading = useState<boolean>("apiLoading", () => false);
const loading = computed(() => startupLoading.value || apiLoading.value);

let intervalId: ReturnType<typeof setInterval>;

onMounted(async () => {
  startupLoading.value = false;

  intervalId = setInterval(async () => {
    await checkAuth();
  }, 30 * 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
<style>
body {
  margin: 0;
  padding: 0;
}

input,
button {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

.full-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
  text-align: center;
}

.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
