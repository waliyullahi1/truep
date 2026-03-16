<script setup>
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()

const auth = ref(false)

/* =========================
CHECK AUTH
========================= */

onMounted(async () => {

  try {

    const response = await fetch(
      `${config.public.api_url}/auth/protected`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )

    if (response.status === 200) {
      auth.value = true
    } else {
      auth.value = false
    }

  } catch (err) {

    auth.value = false

  }

})
</script>

<template>
  <div>

    <!-- NOT LOGGED IN -->
    <div v-if="!auth">
      <NavigationNavbar />
      <slot />
      <NavigationFooter />
    </div>

    <!-- LOGGED IN -->
    <div>
      <NavigationNavUser />
      <slot />
      <NavigationFooter />
    </div>

  </div>
</template>