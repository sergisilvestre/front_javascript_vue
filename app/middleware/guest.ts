export default defineNuxtRouteMiddleware(async () => {
  const { user, checkAuth } = useAuth();

  await checkAuth();

  if (user.value) {
    return navigateTo("/auth/user");
  }
});
