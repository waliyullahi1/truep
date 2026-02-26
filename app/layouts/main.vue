<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const fixed = computed(() => {
  return route.meta?.fixed === false ? false : true
})
</script>

<template>
  <NavigationNavbar :fixed="fixed" />
  <slot />
  <NavigationFooter />
</template>
