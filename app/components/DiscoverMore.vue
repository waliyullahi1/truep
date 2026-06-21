<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

/* =================================
   CATEGORY LIST (SINGLE SOURCE)
================================= */
const categories = [
  {
    label: 'Houses',
    icon: 'house_icon.svg',
    path: 'house'
  },
  {
    label: 'Apartments',
    icon: 'apartment.svg',
    path: 'house/flat'
  },
  {
    label: 'Rooms',
    icon: 'room_icon.svg',
    path: 'house/self_contain'
  },
  {
    label: 'Studios',
    icon: 'studios.svg',
    path: 'house/studio'
  },
  {
    label: 'Student apartments',
    icon: 'graduate_cap.svg',
    path: '/hostel'
  },
  {
    label: 'All properties',
    icon: 'all-property.svg',
    path: ''
  }
]

/* =================================
   NAVIGATION
================================= */
const goToSearch = (path) => {
  router.push(`/search/${path}`)
}
</script>

<template>
  <div class="flex flex-wrap gap-3 mt-4 font-normal">

    <button
      v-for="item in categories"
      :key="item.label"
      @click="goToSearch(item.path)"
      class="btn"
    >
      <img :src="`/image/icon/${item.icon}`" class="w-5" />
      <p class="whitespace-nowrap text-sm">{{ item.label }}</p>
    </button>

  </div>
</template>

<style scoped>
.btn {
  @apply flex items-center gap-3 rounded-md p-3 bg-[#f9f9f9] text-[16px] font-semibold hover:bg-gray-100 transition;
}
</style>