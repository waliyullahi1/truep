<script setup>
import { ref } from 'vue'

const current = ref(0)

/* avatars (stay fixed) */
const avatars = [
  '/image/abuja.jpg',
  '/image/bricklayer.jpg',
  '/image/civil-servant.jpg',
  '/image/electricians.jpg',
  '/image/lagos.jpg',
  '/image/painters.jpg',
]

/* slides */
const slides = [
  { text: 'Abanise was founded in 2019 by a team of real estate and technology experts with over 20 years of experience in the rental industry.' },
  { text: 'As part of Reva Group, we have the expertise to deliver a platform that simplifies Buy/renting property while maintaining a high level of trust and security for tenants, property owners and agencies.' },
  { text: 'With operations in 36 State worldwide, Abanise is a global platform dedicated to making the buying/rental process easier and more transparent for everyone involved' }
]

const next = () => {
  current.value = (current.value + 1) % slides.length
}

const prev = () => {
  current.value = (current.value - 1 + slides.length) % slides.length
}

/* 🔥 POSITION (rotates circle, not images) */
const getPosition = (index) => {
  const radius = 140

  const angle =
    ((index + current.value) / avatars.length) * (2 * Math.PI)

  const x = radius * Math.cos(angle)
  const y = radius * Math.sin(angle) * 0.65

  return {
    transform: `translate(${x}px, ${y}px)`
  }
}
</script>

<template>
  <div class="w-[90%] mx-auto py-20">
    
    <div class="grid md:grid-cols-2 space-y-12 gap-10 items-center">

      <!-- LEFT: SVG ORBIT -->
      <div class="relative flex items-center justify-center">

        <!-- SVG Rings -->
        <svg
          class="absolute"
          width="400"
          height="300"
          viewBox="0 0 400 300"
        >
          <!-- Outer -->
          <ellipse
            cx="200"
            cy="150"
            rx="170"
            ry="90"
            stroke="#cbd5e1"
            stroke-width="1.5"
            stroke-dasharray="6 10"
            fill="none"
          />

          <!-- Middle -->
          <ellipse
            cx="200"
            cy="150"
            rx="120"
            ry="65"
            stroke="#cbd5e1"
            stroke-width="1.5"
            stroke-dasharray="6 10"
            fill="none"
          />

          <!-- Inner -->
          <ellipse
            cx="200"
            cy="150"
            rx="70"
            ry="40"
            stroke="#cbd5e1"
            stroke-width="1.5"
            stroke-dasharray="6 10"
            fill="none"
          />
        </svg>

        <!-- Center Icon -->
        <div class="z-10 bg-red-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-xl shadow">
          🏠
        </div>

        <!-- Avatars -->
        <div
          v-for="(img, index) in avatars"
          :key="index"
          class="absolute w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow transition-all duration-700 ease-in-out"
          :style="getPosition(index)"
        >
          <img :src="img" class="w-full h-full object-cover" />
        </div>

      </div>

      <!-- RIGHT -->
      <div>

        <!-- TEXT -->
        <transition name="slide" mode="out-in">
          <p :key="current" class="text-lg text-gray-700 leading-relaxed">
            {{ slides[current].text }}
          </p>
        </transition>

        <!-- CONTROLS -->
        <div class="flex items-center justify-between mt-10">
          
          <button @click="prev" class="text-3xl">←</button>

          <!-- Indicator -->
          <div class="flex items-center gap-2">
            <div
              v-for="(s, i) in slides"
              :key="i"
              :class="[
                'h-2 rounded-full transition-all duration-300',
                i === current ? 'w-10 bg-red-500' : 'w-2 bg-gray-300'
              ]"
            ></div>
          </div>

          <button @click="next" class="text-3xl">→</button>

        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
/* TEXT SLIDE */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
</style>