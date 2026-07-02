// composables/useAuth.ts
export const useAuth = () => {
  const token = useCookie<string | null>("token");
  const user = useState<any | null>("user", () => null);

  const api = useApi();

  const checkAuth = async () => {
    if (!token.value) {
      user.value = null;
      return null;
    }

    try {
      const me = await api.request("/auth/check", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      console.log("User data fetched successfully:", me);

      user.value = me;
      return me;
    } catch (error) {
      token.value = null;
      user.value = null;
      return null;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    navigateTo("/auth/login");
  };

  return {
    token,
    user,
    checkAuth,
    logout,
  };
};
