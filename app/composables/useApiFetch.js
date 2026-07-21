// export const useApiFetch = async (url, options = {}) => {
//   const config = useRuntimeConfig()

//   const headers = process.server
//     ? useRequestHeaders(['cookie'])
//     : {}

//   try {
//     const res = await $fetch(`${config.public.api_url}${url}`, {
//       credentials: 'include',
//       headers,
//       timeout: 30000,
//       retry: 0,
//       ...options
//     })

//     return {
//       success: true,
//       data: res,
//       message: null,
//       error: null
//     }

//   } catch (error) {
//     console.error('🔥 RAW API ERROR:', error) // 👈 full original error

//     return {
//       success: false,
//       message:
//         error?.data?.message ||
//         error?.statusMessage ||
//         error?.message ||
//         'Request failed',
//       status: error?.status || null,
//       data: null,

//       // 👇 KEEP ORIGINAL ERROR
//       error: {
//         raw: error,
//         data: error?.data,
//         status: error?.status,
//         statusText: error?.statusText
//       }
//     }
//   }
// }

export const useApiFetch = async (url, options = {}) => {
  const config = useRuntimeConfig()
  const auth = useAuth()

  const headers = process.server
    ? useRequestHeaders(["cookie"])
    : {}

  const method = (options.method || "GET").toUpperCase()

  // Clone headers so we don't mutate the original
  const requestHeaders = {
    ...headers,
    ...(options.headers || {})
  }

  // Add CSRF token only for requests that modify data
  if (
    ["POST", "PUT", "PATCH", "DELETE"].includes(method) &&
    auth.value.csrfToken
  ) {
    requestHeaders["X-CSRF-Token"] = auth.value.csrfToken
  }

  try {
    const res = await $fetch(`${config.public.api_url}${url}`, {
      credentials: "include",
      headers: requestHeaders,
      timeout: 30000,
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
    console.error("🔥 RAW API ERROR:", error)

    return {
      success: false,
      message:
        error?.data?.message ||
        error?.statusMessage ||
        error?.message ||
        "Request failed",

      status: error?.status || null,

      data: null,

      error: {
        raw: error,
        data: error?.data,
        status: error?.status,
        statusText: error?.statusText
      }
    }
  }
}