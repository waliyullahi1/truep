<script setup>
const auth = useAuth()
</script>

<template>
  <div>
    <NavigationNavbar v-if="!auth" />
    <NavigationNavUser v-else />
   
    <slot />

    <NavigationFooter />
  </div>
</template>