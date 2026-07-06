import type { CreateUserPayload, UpdateUserPayload, User } from "@/types/user";
import type { ApiRequest } from "@/services/api/http.client";

export const userApi = {
  list: async (request: ApiRequest) =>
    request<User[] | { data: User[] }>('/user'),

  create: async (request: ApiRequest, payload: CreateUserPayload) =>
    request<User>("/user", {
      method: "POST",
      body: payload,
    }),

  update: async (request: ApiRequest, id: string | number, payload: UpdateUserPayload) =>
    request<User>(`/user/${id}`, {
      method: "PUT",
      body: payload,
    }),

  remove: async (request: ApiRequest, id: string | number) =>
    request<void>(`/user/${id}`, {
      method: "DELETE",
    }),
};
