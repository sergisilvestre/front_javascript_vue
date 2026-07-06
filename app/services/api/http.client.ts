export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
};

export interface ApiRequest {
  <T>(url: string, options?: RequestOptions, showLoading?: boolean): Promise<T>;
}

export interface ApiError extends Error {
  status: number | null;
  response: unknown;
  validationErrors: Record<string, string[] | string> | null;
}

export const normalizeError = (err: any): ApiError => {
  const error = new Error(
    err?.data?.message ||
      err?.response?._data?.message ||
      err?.message ||
      "Request failed",
  ) as ApiError;

  error.status = err?.response?.status || err?.status || err?.statusCode || null;
  error.response = err?.response ?? null;
  error.validationErrors = err?.data?.errors || err?.response?._data?.errors || null;

  return error;
};
