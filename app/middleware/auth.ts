// middleware/auth.ts
export default defineNuxtRouteMiddleware(async () => {
  const { user, checkAuth } = useAuth();

  if (!user.value) {
    await checkAuth();
  }

  if (!user.value) {
    return navigateTo("/auth/login");
  }
});
