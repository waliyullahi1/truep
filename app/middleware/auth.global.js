export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig()
  const auth = useAuth() // same state

  try {
    await $fetch(`${config.public.api_url}/auth/protected`, {
      credentials: 'include'
    })

    auth.value = true
  } catch {
    auth.value = false
  }
})