<script setup>
import { ref, onMounted } from 'vue'

const target = 14300
const count = ref(0)

onMounted(() => {
  const duration = 1500 // animation duration (ms)
  const startTime = performance.now()

  const animate = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1)
    
    count.value = Math.floor(progress * target)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
})
</script>

<template>
  <div class="text-center py-10">
    <!-- Number -->
    <h1 class="text-4xl font-semibold tracking-widest">
      {{ count.toLocaleString() }}
    </h1>

    <!-- Decorative circle (optional) -->
    <div class="flex justify-center items-center py-10">
  <div class="relative w-64 h-40 flex items-center justify-center">
    
    <!-- Rings -->
    <div class="absolute w-16 h-16 border  border-secondary/20 rounded-full transform scale-y-50"></div>
    <div class="absolute w-28 h-28 border border-secondary/20 rounded-full transform scale-y-50"></div>
    <div class="absolute w-40 h-40 border border-secondary/20 rounded-full transform scale-y-50"></div>
    <div class="absolute w-52 h-52 border border-secondary/20 rounded-full transform scale-y-50"></div>
    <div class="absolute w-64 h-64 border border-secondary/20 rounded-full transform scale-y-50"></div>

    <!-- Glow (also flattened) -->
    <div class="absolute w-64 h-64 bg-yellow-200 opacity-30 blur-2xl rounded-full transform scale-y-50"></div>

  </div>
</div>

    <!-- Text -->
    <p  class=" font-medium text-lg">
      Properties added today!
    </p>
  </div>
</template>