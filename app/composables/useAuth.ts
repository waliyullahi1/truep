// composables/useAuth.ts

export const useAuth = () => useState('auth', () => ({
  user: null,
  authenticated: false,
  checked: false,
  serverError: false
}))