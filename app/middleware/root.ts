export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/") {
    return navigateTo("/auth/user", { redirectCode: 301 });
  }
});
