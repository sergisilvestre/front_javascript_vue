import type { RequestOptions, ApiError } from "@/services/api/http.client";
import { normalizeError } from "../services/api/http.client";

export const useApi = () => {
  const config = useRuntimeConfig();

  const apiLoadingCount = useState<number>("apiLoadingCount", () => 0);
  const apiLoading = useState<boolean>("apiLoading", () => false);
  const apiLoadingStartedAt = useState<number | null>(
    "apiLoadingStartedAt",
    () => null,
  );
  let apiLoadingTimeout: ReturnType<typeof setTimeout> | null = null;

  const MIN_LOADING_DURATION = 500;

  const startLoading = () => {
    if (apiLoadingCount.value === 0) {
      apiLoadingStartedAt.value = Date.now();
      apiLoading.value = true;
    }

    apiLoadingCount.value += 1;

    if (apiLoadingTimeout) {
      clearTimeout(apiLoadingTimeout);
      apiLoadingTimeout = null;
    }
  };

  const stopLoading = () => {
    apiLoadingCount.value = Math.max(0, apiLoadingCount.value - 1);

    if (apiLoadingCount.value > 0) {
      return;
    }

    const startedAt = apiLoadingStartedAt.value ?? Date.now();
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(0, MIN_LOADING_DURATION - elapsed);

    if (apiLoadingTimeout) {
      clearTimeout(apiLoadingTimeout);
    }

    apiLoadingTimeout = setTimeout(() => {
      if (apiLoadingCount.value === 0) {
        apiLoading.value = false;
        apiLoadingStartedAt.value = null;
      }
      apiLoadingTimeout = null;
    }, remaining);
  };

  const request = async <T>(
    url: string,
    options: RequestOptions = {},
    showLoading: boolean = true,
  ): Promise<T> => {
    const cookieToken = useCookie<string | null>("token").value;
    const fallbackToken = import.meta.client ? localStorage.getItem("token") : null;
    const authToken = cookieToken || fallbackToken || "";

    const headers = {
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options.headers,
    };

    if (showLoading) {
      startLoading();
    }

    try {
      return await $fetch<T>(url, {
        baseURL: config.public.apiBase,
        method: options.method || "GET",
        body: options.body as BodyInit | Record<string, unknown> | null | undefined,
        query: options.params,
        headers,
      });
    } catch (err: unknown) {
      throw normalizeError(err as ApiError);
    } finally {
      if (showLoading) {
        stopLoading();
      }
    }
  };

  return {
    request,
    apiLoading,
  };
};
