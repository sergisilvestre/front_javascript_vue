export const isClient = typeof window !== "undefined";

export const getApiBaseUrl = () => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.public.apiBase || "http://localhost:3000";
};
