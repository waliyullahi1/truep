// plugins/auth.ts

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const auth = useAuth()
 
  // Prevent duplicate auth checks
  if (auth.value.checked) {
    return
  }

  try {
    // Forward SSR cookies
    const headers = process.server
      ? useRequestHeaders(['cookie'])
      : undefined

    const response = await $fetch<{
      data: any
    }>(
      `${config.public.api_url}/auth/protected`,
      {
        credentials: 'include',
        headers,
        timeout: 5000,
        retry: 0
      }
    )

    // SUCCESS
    auth.value.user = response?.data || null
    auth.value.authenticated = true
    auth.value.checked = true
    auth.value.serverError = false

    console.log('✅ Auth initialized', )

  } catch (error) {
    console.log('❌ Auth initialization failed', error)

    // IMPORTANT:
    // Do NOT assume user is logged out
    // because backend may temporarily fail

    auth.value.user = null
    auth.value.authenticated = false
    auth.value.checked = true
    auth.value.serverError = true
  }
})