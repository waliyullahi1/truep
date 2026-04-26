export const useApiFetch = async (url, options = {}) => {
  const config = useRuntimeConfig()

  const headers = process.server
    ? useRequestHeaders(['cookie'])
    : {}

  try {
    const res = await $fetch(`${config.public.api_url}${url}`, {
      credentials: 'include',
      headers,
      timeout: 20000,
      retry: 0,
      ...options
    })

    return {
      success: true,
      data: res,
      message: null,
      error: null
    }

  } catch (error) {
    console.error('🔥 RAW API ERROR:', error) // 👈 full original error

    return {
      success: false,
      message:
        error?.data?.message ||
        error?.statusMessage ||
        error?.message ||
        'Request failed',
      status: error?.status || null,
      data: null,

      // 👇 KEEP ORIGINAL ERROR
      error: {
        raw: error,
        data: error?.data,
        status: error?.status,
        statusText: error?.statusText
      }
    }
  }
}