<template>
  <div class="sm:p-4 p-0">
    
    <div class="grid">
      <button @click="router.push('/search')"
        v-for="(image, index) in images"
        :key="image.id"
        :class="getCardClass(image, index)"
      >
        <!-- IMAGE -->
        <img :src="image.src" :alt="image.state" />

        <!-- OVERLAY -->
        <div class="overlay">
          <div class=" flex flex-col sn:p-4 p-2  items-start  ">

            <div class="flex  items-start justify-start gap-2 text-white text-sm">
              <div class=" w-4 h-4">
                <img src="@/assets/images/icons/location.svg" class="w-4 h-4" />
              </div>
              <UiTypographyP class=" text-left">{{ image.city }}</UiTypographyP>
            </div>

            <span class=" text-white">
              {{ image.state }}
            </span>

          </div>
        </div>
      </button>
    </div>
   
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isMobile = ref(false)

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})

const getCardClass = (image, index) => {
  if (isMobile.value) {
    // 👉 mobile: only 3rd item becomes wide
    return ['card', index === 2 ? 'wide' : '']
  }

  // 👉 desktop: use original layout
  return ['card', image.layout]
}

const images = [
  {
    id: 1,
    src: "/image/ibadan.webp",
    state: "Ibadan",
    layout: "tall",
    city: "The ancient city"
  },
  {
    id: 2,
    src: "/image/abuja.webp",
    state: "Abuja",
    layout: "wide",
    city: "Federal Capital"
  },
  {
    id: 3,
    src: "/image/ph.png",
    state: "Port Harcourt",
    city: "Garden City of Nigeria",
    layout: "tall"
  },
  {
    id: 4,
    src: "/image/osun.png",
    state: "Osun",
    city: "Coal City State"
  },
  {
    id: 5,
    src: "/image/lagos.webp",
    state: "Lagos",
    city: "Nigeria's commercial hub"
  }
]
</script>
<style scoped>
/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 16px;
}

/* CARD */
.card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

/* IMAGE */
.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
 
  transition: opacity 0.3s ease;
}

/* HOVER EFFECT */
.card:hover .overlay {
  opacity: 1;
}

/* CONTENT */
.overlay-content {
  padding: 16px;
  width: 100%;
}

/* TEXT */
.state {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

/* SLIDE UP TEXT */
.card:hover .state {
  transform: translateY(0);
}

/* LAYOUT VARIANTS */
.tall {
  grid-row: span 2;
}

.wide {
  grid-column: span 2;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 180px;
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>