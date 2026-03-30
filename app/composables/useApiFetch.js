// /composables/useApiFetch.js

export const useApiFetch = (url, options = {}) => {
  const config = useRuntimeConfig()

  return $fetch(`${config.public.api_url}${url}`, { credentials: 'include', ...options })
}