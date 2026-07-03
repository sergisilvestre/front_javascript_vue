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
    options: RequestOptions = {}
  ): Promise<T> => {
    const headers = {
      Authorization: `Bearer ${useCookie('token').value || ''}`,
      ...options.headers,
    }

    try {
      return await $fetch<T>(url, {
        baseURL: config.public.apiBase,
        method: options.method || 'GET',
        body: options.body,
        query: options.params, // 👈 important rename
        headers,
      })
    } catch (err: any) {
      
      console.log('API request error:', err);
      console.log('request', request);

      throw normalizeError(err)
    }
  }

  return {
    request,
  }
}