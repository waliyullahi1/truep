export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
   const route = useRoute()
   if (route.path.startsWith('/ogProfile/')) {
    return
  }
     if (route.path.startsWith('/ogImage/')) {
    return
  }
       if (route.path.startsWith('/')) {
    return
  }
  const auth = useAuth()

  if (auth.value.checked) return

  try {
    const headers = process.server
      ? useRequestHeaders(['cookie'])
      : undefined

    const response = await $fetch(
      `${config.public.api_url}/auth/protected`,
      {
        credentials: 'include',
        headers,
        timeout: 8000,
        retry: 0,
      }
    )

    auth.value.user = response?.data || null
    auth.value.authenticated = true
    auth.value.serverError = false

  } catch (error: any) {

    // 👇 IMPORTANT: handle 401 separately
    if (error?.statusCode === 401) {
      auth.value.user = null
      auth.value.authenticated = false
      auth.value.serverError = false
    } else {
      // real server issue (Render sleep, network, etc)
      auth.value.serverError = true

      // DO NOT break app flow
      auth.value.user = null
      auth.value.authenticated = false
    }

  } finally {
    auth.value.checked = true
  }
})