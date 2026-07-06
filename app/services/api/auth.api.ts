import type { AuthResponse, AuthUser, LoginPayload } from "@/types/auth";
import type { ApiRequest } from "@/services/api/http.client";

export const authApi = {
  login: async (request: ApiRequest, payload: LoginPayload) => {
    const response = await request<AuthResponse | { data: AuthResponse }>("/auth/login", {
      method: "POST",
      body: payload,
    });

    return (response as { data?: AuthResponse }).data ?? (response as AuthResponse);
  },

  check: async (request: ApiRequest) => {
    const response = await request<{ message: AuthUser } | { data: { message: AuthUser } }>('/auth/check', {}, false);

    return (response as { data?: { message: AuthUser } }).data ?? (response as { message: AuthUser });
  },

  refresh: async (request: ApiRequest) => {
    const response = await request<AuthResponse | { data: AuthResponse }>("/auth/refresh", { method: "POST" });

    return (response as { data?: AuthResponse }).data ?? (response as AuthResponse);
  },

  logout: async (request: ApiRequest) =>
    request<void>("/auth/logout", { method: "POST" }),

  revoke: async (request: ApiRequest) =>
    request<void>("/auth/revoke", { method: "POST" }),
};
