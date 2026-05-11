// middleware/auth.ts

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth()

  /*
   auth.value example:

   {
      user: {
        _id: "...",
        role: "admin"
      },
      authenticated: true,
      checked: true,
      serverError: false
   }
  */

  // Wait until auth check finishes
  if (!auth.value.checked) {
    return
  }

  // Allow if backend/server has issue
  // So app doesn't completely break
  if (auth.value.serverError) {
    return
  }

  // Not logged in
  if (!auth.value.authenticated) {
    return navigateTo('/login')
  }

  // =========================
  // ROLE AUTHORIZATION
  // =========================

  // Route roles from page meta
  const allowedRoles = to.meta.roles as string[] | undefined

  // If route has no roles
  // only authentication required
  if (!allowedRoles?.length) {
    return
  }

  const userRole = auth.value.user?.role

  // User role not allowed
  if (!allowedRoles.includes(userRole)) {
    return navigateTo('/403')
  }
})