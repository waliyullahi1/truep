export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth()

  // wait until auth is ready
  if (!auth.value.checked) return

  const isPrivateRoute = to.meta.isPrivateRoute
  const sellerOnly = to.meta.sellerOnly
  const adminOnly = to.meta.adminOnly
  /*
  |--------------------------------------------------------------------------
  | PRIVATE ROUTE
  |--------------------------------------------------------------------------
  */
console.log(auth.value.authenticated, 'dfsdsfdsdfsdfdfdfsdffffffffffffffff');

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
      return navigateTo('/user/profile/edit')
    }
  }

  
  if (adminOnly) {

    // not logged in
    if (!auth.value.authenticated) {
      return navigateTo('/auth')
    }

    // logged in but normal user
    if (auth.value.user?.roles !== 'admin') {
      return navigateTo('/profile/edit')
    }
  }
})