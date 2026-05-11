export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig()
  const auth = useAuth()
 console.log(auth.value);
  console.log('Middleware started')
  console.log(auth.value);
  
  // Prevent multiple checks
  if (auth.value.checked) {
    return
  }
   console.log('is not been check');
   
  // SSR cookies
  const headers = process.server
    ? useRequestHeaders(['cookie'])
    : undefined
 
  
  try {
    // SERVER SIDE FETCH
    const data = await $fetch(
      `${config.public.api_url}/auth/protected`,
      {
        credentials: 'include',
        headers,
        timeout: 2500,
        retry: 0
      }
    )

    console.log('AUTH SUCCESsS', data)

    // auth.value.user = data?.data || null
    // auth.value.authenticated = true
    // auth.value.checked = true

  } catch (err) {
    console.log('SSR AUTH FAILED', err)

    // Default guest state
    auth.value.user = null
    auth.value.authenticated = false
    auth.value.checked = false

    // CLIENT RETRY AFTER HTML RENDER
    if (process.client) {
      setTimeout(async () => {
        try {
          console.log('Retrying auth fetch...')

          // const retryData = await $fetch(
          //   `${config.public.api_url}/auth/protected`,
          //   {
          //     credentials: 'include',
          //     timeout: 2500,
          //     retry: 0
          //   }
          // )

          // console.log('RETRY SUCCESS', retryData)

          // auth.value.user = retryData?.data || null
          auth.value.authenticated = false
          auth.value.checked = false

        } catch (retryErr) {
          console.log('Retry failed', retryErr)

          auth.value.user = null
          auth.value.authenticated = false
          auth.value.checked = false
        }
      }, 1500)
    }
  }
})