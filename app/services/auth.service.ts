import type { AuthResponse, AuthUser } from "@/types/auth";
import { authApi } from "@/services/api/auth.api";

export const authService = {
  async login(request: any, payload: { email: string; password: string }) {
    const response = await authApi.login(request, payload);
    return response as AuthResponse;
  },

  async check(request: any) {
    const response = await authApi.check(request);
    return response as { message: AuthUser };
  },

  async refresh(request: any) {
    const response = await authApi.refresh(request);
    return response as AuthResponse;
  },
};
