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

  if (isPrivateRoute && !auth.value.authenticated) {
     auth.value.showLoginModal = true
      // navigateTo('/auth')
      return 
  }

  /*
  |--------------------------------------------------------------------------
  | SELLER ONLY ROUTE
  |--------------------------------------------------------------------------
  */

  if (sellerOnly) {

    // not logged in
    if (!auth.value.authenticated) {
      auth.value.showLoginModal = true
      // navigateTo('/auth')
      return 
    }

    // logged in but normal user
    if (auth.value.user?.roles === 'user') {
      return navigateTo('/user/profile/edit')
    }
  }

  
  if (adminOnly) {

    // not logged in
    if (!auth.value.authenticated) {
       auth.value.showLoginModal = true
      // navigateTo('/auth')
      return 
      // return navigateTo('/auth')
    }
    // console.log( auth.value.user?.roles, 'fffffff');
    
    // logged in but normal user
    if (auth.value.user?.roles !== 'Admin') {
      return navigateTo('/')
    }
  }
})