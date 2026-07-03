// composables/useAuth.ts
export const useAuth = () => {
  const token = useCookie<string | null>("token");
  const user = useState<any | null>("user", () => null);
  const router = useRouter();
  const api = useApi();

  const checkAuth = async () => {
    if (!token.value) {
      user.value = null;
      return null;
    }

    try {
      let me = {
        data: {
          message: {},
        },
      };

      me = await api.request("/auth/check");

      user.value = me.data.message;
      console.log("User data fetched successfully:", user.value);

      return user.value;
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response && error.response.status === 401) {
        console.log("Token is invalid or expired. Logging out...");
        localStorage.removeItem("token");
      }

      token.value = null;
      user.value = null;
      return null;
    }
  };

  const logout = async () => {
    let loggedOut = await api.request("/auth/logout", { method: "POST" });

    token.value = null;
    user.value = null;

    if (loggedOut) {
      console.log("User logged out successfully.");
      localStorage.removeItem("token");
      location.reload();
    }
  };

  return {
    token,
    user,
    checkAuth,
    logout,
  };
};
