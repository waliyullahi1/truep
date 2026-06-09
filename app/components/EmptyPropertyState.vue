<template>
  <div class="w-full flex flex-col items-center justify-center text-center 0 px-4">

    <!-- SVG ILLUSTRATION -->
    <img   src="/image/non-property.png" class=" md:w-1/3 l  w-2/3  sm:w-1/2 lg:w-1/4" />

    <!-- TITLE -->
    <h1 class="text-lg md:text-2xl font-semibold text-[#1a2258]">
      No Property Found
    </h1>

    <!-- DESCRIPTION -->
    <p class=" text-xs md:text-sm text-gray-500 max-w-md">
      We couldn’t find any properties matching your search.
      Try adjusting your filters or explore all available listings.
    </p>

    <!-- ACTION BUTTONS -->
    <div class="flex gap-4 mt-4 flex-wrap justify-center">

      <NuxtLink to="/search" 
       
        class="flex text-sm items-center gap-2 bg-[#1a2258] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
      >
          View All Properties
      </NuxtLink>

       <NuxtLink to="/search" 
      
        class="flex items-center  text-sm gap-2 border border-[#1a2258] text-[#1a2258] px-4 py-2 rounded-lg hover:bg-[#1a2258]/10 transition"
      >
          Reset Filters
      </NuxtLink>

    </div>

    <!-- FEATURES -->
    <div class="flex flex-wrap justify-center gap-8 mt-7 text-xs text-gray-600">

      <div class="flex items-center gap-2">
        🏠 <span>Buy or Rent Houses</span>
      </div>

      <div class="flex items-center gap-2">
        📍 <span>Find Verified Land</span>
      </div>

      <div class="flex items-center gap-2">
        ✔️ <span>Trusted Listings</span>
      </div>

      <div class="flex items-center gap-2">
        🎧 <span>Dedicated Support</span>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAll = () => {
  router.push('/search')
}
</script>