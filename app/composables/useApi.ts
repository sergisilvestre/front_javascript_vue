export const useApi = () => {
  const config = useRuntimeConfig()

  type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'

  type RequestOptions = {
    method?: HttpMethod
    body?: any
    params?: Record<string, any>
    headers?: Record<string, string>
  }

  const normalizeError = (err: any) => {
    const error: any = new Error(
      err?.data?.message ||
      err?.response?._data?.message ||
      err?.message ||
      'Request failed'
    )

    error.validationErrors =
      err?.data?.errors ||
      err?.response?._data?.errors ||
      null

    return error
  }

  const request = async <T>(
    url: string,
    options: RequestOptions = {
      headers: {
        'Authorization': `Bearer ${useCookie('token').value || ''}`,
      },
    }
  ): Promise<T> => {
    try {
      return await $fetch<T>(url, {
        baseURL: config.public.apiBase,
        method: options.method || 'GET',
        body: options.body,
        query: options.params, // 👈 important rename
        headers: options.headers,
      })
    } catch (err: any) {
      throw normalizeError(err)
    }
  }

  return {
    request,
  }
}