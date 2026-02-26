<template>
  <div class="relative py-6 max-w-5xl mx-auto group">

    <!-- ================= MAIN SLIDER ================= -->
    <div class="relative">
      <Swiper
        :modules="[Navigation, Thumbs]"
        :thumbs="{ swiper: thumbsSwiper }"
        :navigation="{
          prevEl: '.main-prev',
          nextEl: '.main-next'
        }"
        :space-between="20"
        class="rounded-xl overflow-hidden"
      >
        <SwiperSlide
          v-for="(item, idx) in properties"
          :key="idx"
        >
          <img
            :src="item.image"
            class="w-full h-[350px] object-cover rounded-xl"
          />
        </SwiperSlide>
      </Swiper>

      <!-- MAIN ARROWS -->
      <button class="main-prev nav-btn left-2">‹</button>
      <button class="main-next nav-btn right-2">›</button>
    </div>



    <!-- ================= THUMBNAILS ================= -->
    <div class="relative mt-4">

      <Swiper
        class="thumb-swiper"
        :modules="[Navigation, Thumbs]"
        :space-between="10"
        :slides-per-view="5"
        watch-slides-progress
        :navigation="{
          prevEl: '.thumb-prev',
          nextEl: '.thumb-next'
        }"
        @swiper="setThumbsSwiper"
      >
        <SwiperSlide
          v-for="(item, idx) in properties"
          :key="'thumb' + idx"
          class="thumb-slide cursor-pointer"
        >
          <img
            :src="item.image"
            class="w-full h-20 object-cover rounded-md"
          />
        </SwiperSlide>
      </Swiper>

      <!-- THUMB ARROWS -->
      <button class="thumb-prev thumb-btn left-0">‹</button>
      <button class="thumb-next thumb-btn right-0">›</button>

    </div>

  </div>
</template>



<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const properties = [
  { image: '/images/land1.jpg' },
  { image: '/images/land2.jpg' },
  { image: '/images/land1.jpg' },
  { image: '/images/land2.jpg' },
  { image: '/images/land1.jpg' },
  { image: '/images/land2.jpg' },
]
</script>



<style scoped>
/* ================= MAIN NAV BUTTON ================= */
.nav-btn {
  @apply absolute top-1/2 -translate-y-1/2 z-10
         bg-white shadow-lg w-10 h-10 rounded-full
         flex items-center justify-center
         opacity-0 group-hover:opacity-100 transition;
}

/* ================= THUMB NAV BUTTON ================= */
.thumb-btn {
  @apply absolute top-1/2 -translate-y-1/2 z-10
         bg-white shadow w-8 h-8 rounded-full
         flex items-center justify-center text-sm;
}

/* thumbnail style */
.thumb-slide {
  opacity: 0.5;
  transition: 0.3s;
}

/* active thumb highlight */
:deep(.swiper-slide-thumb-active) {
  opacity: 1;
  transform: scale(1.05);
  border: 2px solid white;
}
</style>
