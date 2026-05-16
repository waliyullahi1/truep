export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth()

  // wait until auth is ready
  if (!auth.value.checked) return

  const isPrivateRoute = to.meta.isPrivateRoute
  const sellerOnly = to.meta.sellerOnly

  /*
  |--------------------------------------------------------------------------
  | PRIVATE ROUTE
  |--------------------------------------------------------------------------
  */

  if (isPrivateRoute && !auth.value.authenticated) {
    return navigateTo('/auth')
  }

  /*
  |--------------------------------------------------------------------------
  | SELLER ONLY ROUTE
  |--------------------------------------------------------------------------
  */

  if (sellerOnly) {

    // not logged in
    if (!auth.value.authenticated) {
      return navigateTo('/auth')
    }

    // logged in but normal user
    if (auth.value.user?.roles === 'user') {
      return navigateTo('/profile/edit')
    }
  }
})