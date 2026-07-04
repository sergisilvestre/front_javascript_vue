// composables/useAuth.ts
export const useAuth = () => {
  const token = useCookie<string | null>("token");
  const ttl = useCookie<string | null>("ttl");
  const user = useState<any | null>("user", () => null);
  const isLoggedIn = useState<boolean>("isLoggedIn", () => false);
  const api = useApi();

  if (process.client) {
    const storedToken = localStorage.getItem("token");
    const storedTtl = localStorage.getItem("ttl");

    if (!token.value && storedToken) {
      token.value = storedToken;
    }

    if (!ttl.value && storedTtl) {
      ttl.value = storedTtl;
    }
  }

  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface AuthResponse {
    token: string;
    ttl: string;
    user: User;
  }

  const clearAuthState = () => {
    token.value = null;
    ttl.value = null;
    user.value = null;
    isLoggedIn.value = false;

    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("ttl");
    }

    location.reload();
  };

  const checkAuth = async () => {
    if (!token.value) {
      user.value = null;
      isLoggedIn.value = false;
      return null;
    }

    try {
      let me = {
        data: {
          message: {},
        },
      };

      me = await api.request("/auth/check", {}, false);

      user.value = me.data.message;
      isLoggedIn.value = true;
      console.log("User data fetched successfully:", user.value);

      return user.value;
    } catch (error: any) {
      console.error("Error fetching user data:", error);

      if (error.status === 401 || error.response?.status === 401) {
        console.log("Token is invalid or expired. Clearing auth state...");
        clearAuthState();
        return null;
      }

      clearAuthState();
      return null;
    }
  };

  const refresh = async () => {
    try {
      const res = await api.request("/auth/refresh", { method: "POST" });
      saveUserAuthInfo(res.data.token, res.data.ttl);
      token.value = res.data.token;
      ttl.value = res.data.ttl;
      return res.data;
    } catch (error: any) {
      console.error("Error refreshing token:", error);

      if (error.status === 401 || error.response?.status === 401) {
        clearAuthState();
      }

      return null;
    }
  };

  const logout = async () => {
    try {
      await api.request("/auth/logout", { method: "POST" });
    } catch (error) {
      console.warn("Logout request failed:", error);
    }

    clearAuthState();

    if (process.client) {
      location.reload();
    }
  };

  const revoke = async () => {
    await api.request("/auth/revoke", { method: "POST" });
    localStorage.removeItem("token");
    localStorage.removeItem("ttl");
    token.value = null;
    ttl.value = null;
    user.value = null;
    location.reload();
  };

  const saveUserAuthInfo = (tokenValue: string, ttlValue: string) => {
    token.value = tokenValue;
    ttl.value = ttlValue;
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("ttl", ttlValue);
  };

  return {
    token,
    user,
    isLoggedIn,
    checkAuth,
    refresh,
    revoke,
    logout,
    saveUserAuthInfo,
  };
};
