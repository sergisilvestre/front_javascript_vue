import type { AuthResponse, AuthUser } from "../types/auth";
import { authApi } from "../../services/api/auth.api";

export const useAuth = () => {
  const token = useCookie<string | null>("token");
  const ttl = useCookie<string | null>("ttl");
  const user = useState<AuthUser | null>("user", () => null);
  const isLoggedIn = useState<boolean>("isLoggedIn", () => false);
  const api = useApi();

  if (import.meta.client) {
    const storedToken = localStorage.getItem("token");
    const storedTtl = localStorage.getItem("ttl");

    if (!token.value && storedToken) {
      token.value = storedToken;
    }

    if (!ttl.value && storedTtl) {
      ttl.value = storedTtl;
    }
  }

  const setAuthState = (auth: Partial<AuthResponse> | null) => {
    token.value = auth?.token ?? null;
    ttl.value = auth?.ttl ?? null;
    user.value = auth?.user ?? user.value ?? null;
    isLoggedIn.value = Boolean(auth?.user || user.value);

    if (import.meta.client) {
      if (auth?.token) {
        localStorage.setItem("token", auth.token);
      } else {
        localStorage.removeItem("token");
      }

      if (auth?.ttl) {
        localStorage.setItem("ttl", auth.ttl);
      } else {
        localStorage.removeItem("ttl");
      }
    }
  };

  const clearAuthState = () => {
    setAuthState(null);
    user.value = null;
    isLoggedIn.value = false;

    if (import.meta.client) {
      location.reload();
    }
  };

  const checkAuth = async () => {
    if (!token.value) {
      user.value = null;
      isLoggedIn.value = false;
      return null;
    }

    try {
      const response = await authApi.check(api.request);
      user.value = response.message;
      isLoggedIn.value = true;
      return user.value;
    } catch (error: any) {
      if (error.status === 401 || error.response?.status === 401) {
        clearAuthState();
        return null;
      }

      clearAuthState();
      return null;
    }
  };

  const refresh = async () => {
    try {
      const response = await authApi.refresh(api.request);
      setAuthState(response);
      return response;
    } catch (error: any) {
      if (error.status === 401 || error.response?.status === 401) {
        clearAuthState();
      }

      return null;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout(api.request);
    } catch (error) {
      console.warn("Logout request failed:", error);
    }

    clearAuthState();
  };

  const revoke = async () => {
    try {
      await authApi.revoke(api.request);
    } catch (error) {
      console.warn("Revoke request failed:", error);
    }

    clearAuthState();
  };

  const saveUserAuthInfo = (tokenValue: string, ttlValue: string, authUser?: AuthUser | null) => {
    setAuthState({
      token: tokenValue,
      ttl: ttlValue,
      user: authUser ?? user.value ?? null,
    });
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
