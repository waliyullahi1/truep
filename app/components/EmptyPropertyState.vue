<template>
  <div class="w-full flex flex-col items-center justify-center text-center 0 px-4">

    <!-- SVG ILLUSTRATION -->
    <svg
      viewBox="0 0 800 400"
      class="w-full max-w-md m"
      fill="none"
    >
      <!-- Background blob -->
      <ellipse cx="400" cy="200" rx="300" ry="150" fill="#f3f4f6" />

      <!-- House -->
      <g>
        <!-- Roof -->
        <polygon points="300,180 400,110 500,180" fill="#1a2258" />

        <!-- Body -->
        <rect x="320" y="180" width="160" height="110" rx="6" fill="#ffffff" stroke="#1a2258" stroke-width="2"/>

        <!-- Door -->
        <rect x="380" y="220" width="40" height="70" fill="#1a2258" />

        <!-- Window -->
        <rect x="340" y="210" width="30" height="25" fill="#e5e7eb" />
        <rect x="430" y="210" width="30" height="25" fill="#e5e7eb" />

        <!-- Garage -->
        <rect x="480" y="200" width="80" height="90" fill="#e5e7eb" />
      </g>

      <!-- Tree -->
      <g>
        <ellipse cx="600" cy="210" rx="25" ry="60" fill="#1a2258" opacity="0.8"/>
        <rect x="595" y="260" width="10" height="30" fill="#1a2258"/>
      </g>

      <!-- FOR SALE SIGN -->
      <g>
        <rect x="180" y="170" width="70" height="40" fill="#1a2258" rx="4"/>
        <text x="215" y="195" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
          FOR SALE
        </text>

        <rect x="210" y="150" width="5" height="80" fill="#1a2258"/>
        <rect x="210" y="150" width="40" height="5" fill="#1a2258"/>
      </g>
    </svg>

    <!-- TITLE -->
    <h1 class="text-xl md:text-4xl font-semibold text-[#1a2258]">
      No Property Found
    </h1>

    <!-- DESCRIPTION -->
    <p class=" text-sm md:text-lg text-gray-500 max-w-md">
      We couldn’t find any properties matching your search.
      Try adjusting your filters or explore all available listings.
    </p>

    <!-- ACTION BUTTONS -->
    <div class="flex gap-4 mt-4 flex-wrap justify-center">

      < <NuxtLink to="/search" 
       
        class="flex items-center gap-2 bg-[#1a2258] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
      >
        🔍 View All Properties
      </NuxtLink>

      < <NuxtLink to="/search" 
      
        class="flex items-center gap-2 border border-[#1a2258] text-[#1a2258] px-6 py-3 rounded-lg hover:bg-[#1a2258]/10 transition"
      >
        ⚙️ Reset Filters
      </NuxtLink>

    </div>

    <!-- FEATURES -->
    <div class="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-600">

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