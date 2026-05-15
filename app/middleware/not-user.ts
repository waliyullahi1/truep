// middleware/not-user.ts

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth()

  if (!auth.value.checked) {
    return
  }

  if (auth.value.serverError) {
    return
  }
 
  
  // not logged in
  if (!auth.value.authenticated) {
    return navigateTo('/login')
  }

  const userRole = auth.value.user?.roles

  // block only normal users
  if (userRole === 'user') {
    return navigateTo('/403')
  }
})