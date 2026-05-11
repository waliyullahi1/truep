<script setup>
const auth = useAuth()
</script>

<template>
  <div>
     <NavigationNavbar v-if="!auth.authenticated" />

    <div v-else>  
       <NavigationNavUser v-if="auth.user.roles === 'user'" />
         <NavigationSellerNavBar  v-else />
    </div>
   
   
    <slot />

   
  </div>
</template>