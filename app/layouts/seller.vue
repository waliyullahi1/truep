<script setup>
const auth = useAuth()
watch(
  auth,
  (val) => {
    console.log('AUTH VAL ssssUE:', val)
  },
  { immediate: true, deep: true }
)


</script>

<template>
  <div>
    <NavigationSellerNavBar />
   
    
    
   
    <slot />

   
  </div>
</template>