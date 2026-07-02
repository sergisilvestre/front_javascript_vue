export const useAuthApi = () => {
  const config = useRuntimeConfig()

  const request = async <T>(url: string, options: any): Promise<T> => {
    try {
      return await $fetch<T>(url, {
        baseURL: config.public.apiBase,
        ...options,
      })
    } catch (err: any) {
      throw normalizeApiError(err)
    }
  }

  const normalizeApiError = (err: any) => {
    const error: any = new Error(
      err?.data?.message ||
      err?.response?._data?.message ||
      err?.message ||
      'Request failed'
    )
    error.validationErrors = err?.data?.errors || err?.response?._data?.errors || null
    return error
  }

  const login = (email: string, password: string) => {
    return request<{ data?: { token?: string }, token?: string }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
  }

  return {
    login,
  }
}