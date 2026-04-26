export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig()
  const auth = useAuth()

  // already checked before
  if (auth.value !== null) return

  // console.log('Checking authentication...')

  // default state so page can continue rendering
  auth.value = false

  // SSR cookies only
  const headers = process.server
    ? useRequestHeaders(['cookie'])
    : {}

  try {
    const { data, error } = await useAsyncData(
      'auth-check',
      () =>
        $fetch(`${config.public.api_url}/auth/protected`, {
          credentials: 'include',
          headers,
          timeout: 2500,
          retry: 0
        }),
      {
        server: true,
        lazy: true,
        default: () => null
      }
    )

    // request failed
    if (error.value) {
      // console.log('Auth check failed:', error.value?.message || error.value)
      auth.value = false
    } else {
      auth.value = !!data.value
    }

  } catch (err) {
    // console.log('Auth middleware error:', err?.message || err)
    auth.value = false
  }

  // retry silently in browser after page loads
  if (process.client && auth.value === false) {
    setTimeout(async () => {
      try {
        const res = await $fetch(`${config.public.api_url}/auth/protected`, {
          credentials: 'include',
          timeout: 2500,
          retry: 0
        })

        auth.value = !!res
      } catch {
        // stay guest mode silently
      }
    }, 2500)
  }
})