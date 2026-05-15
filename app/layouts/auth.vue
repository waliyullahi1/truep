<script setup>
import { computed, watchEffect } from 'vue'

const route = useRoute()
const auth = useAuth()

/*
|--------------------------------------------------------------------------
| ROUTE META
|--------------------------------------------------------------------------
*/

const access = computed(() => route.meta.access)
const sellerOnly = computed(() => route.meta.sellerOnly)
const isPrivateRoute = computed(() => route.meta.isPrivateRoute)

/*
|--------------------------------------------------------------------------
| AUTH CHECK
|--------------------------------------------------------------------------
*/

watchEffect(() => {

  // wait until auth check finishes
  if (!auth.value.checked) return

  /*
  |--------------------------------------------------------------------------
  | PRIVATE ROUTE
  |--------------------------------------------------------------------------
  */

  if (isPrivateRoute.value && !auth.value.authenticated) {
    return navigateTo('/auth')
  }

  /*
  |--------------------------------------------------------------------------
  | SELLER ONLY ROUTE
  |--------------------------------------------------------------------------
  */

  if (sellerOnly.value) {

    // not logged in
    if (!auth.value.authenticated) {
      return navigateTo('/auth')
    }

    // logged in but still normal user
    if (auth.value.user?.roles === 'user') {
      return navigateTo('/profile/edit')
    }
  }

})

</script>

<template>
  <div>

    <!-- SELLER NAVBAR -->
    <NavigationSellerNavBar
      v-if="
        auth.authenticated &&
        auth.user?.roles !== 'user' &&
        access === 'seller'
      "
    />

    <!-- LOGGED IN USER NAV -->
    <NavigationNavUser
      v-else-if="auth.authenticated"
    />

    <!-- GUEST NAV -->
    <NavigationNavbar
      v-else
    />

    <slot />

  </div>
</template>