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

    error.status =
      err?.response?.status ||
      err?.status ||
      err?.statusCode ||
      null
    error.response = err?.response ?? null
    error.validationErrors =
      err?.data?.errors ||
      err?.response?._data?.errors ||
      null

    return error
  }

  const apiLoadingCount = useState<number>('apiLoadingCount', () => 0)
  const apiLoading = useState<boolean>('apiLoading', () => false)

  const startLoading = () => {
    apiLoadingCount.value += 1
    apiLoading.value = true
  }

  const stopLoading = () => {
    apiLoadingCount.value = Math.max(0, apiLoadingCount.value - 1)
    apiLoading.value = apiLoadingCount.value > 0
  }

  const request = async <T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> => {
    const cookieToken = useCookie<string | null>('token').value
    const fallbackToken = process.client ? localStorage.getItem('token') : null
    const authToken = cookieToken || fallbackToken || ''

    const headers = {
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options.headers,
    }

    startLoading()
    try {
      return await $fetch<T>(url, {
        baseURL: config.public.apiBase,
        method: options.method || 'GET',
        body: options.body,
        query: options.params, // 👈 important rename
        headers,
      })
    } catch (err: any) {
      console.log('API request error:', err)
      console.log('request', request)
      throw normalizeError(err)
    } finally {
      stopLoading()
    }
  }

  return {
    request,
  }
}