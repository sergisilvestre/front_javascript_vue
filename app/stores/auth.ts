import type { AuthUser } from "~/app/types/auth";

export const authStore = {
  user: null as AuthUser | null,
  token: null as string | null,
  ttl: null as string | null,
  isAuthenticated: false,
};
