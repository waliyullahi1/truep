<script setup>
const route = useRoute()
const auth = useAuth()
const access = computed(() => route.meta.access)
// const isUserNavPage = computed(() => route.meta.userNav === true)
</script>

<template>
  <div>
    <!-- FORCE USER NAV ON CERTAIN PAGES -->
         <!-- <NavigationSellerNavBar
        -->
    
    <NavigationSellerNavBar
       v-if="auth.authenticated && auth.user?.roles !== 'user' && access == 'seller'"
    />
    <NavigationNavUser
      v-else-if="auth.authenticated"
    />

    
    <NavigationNavbar v-else /> 
   
    <slot />
  </div>
</template>