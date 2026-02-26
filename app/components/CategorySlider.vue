
<template>
  <div class="relative py-4 group">
    <!-- Swiper -->
    <Swiper
      :modules="[Navigation]"
      :slides-per-view="1.2"
      :space-between="20"
      :breakpoints="{
        640: { slidesPerView: 2.2 },
        1024: { slidesPerView: 5.2 }
      }"
      :navigation="{
        prevEl: '.custom-prev',
        nextEl: '.custom-next'
      }"
      class="pb-6 overflow-visible"
    >
      <SwiperSlide
        v-for="(item, index) in categories"
        :key="index"
        class="h-auto"
      >
        <!-- CARD -->
        <div
          class=" h-40 bg-cover bg-center rounded-2xl shadow-md my-4 flex flex-col transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          :style="`background-image: url('/image/${item.image}')`"
        >
          <!-- GRADIENT OVERLAY -->
          <div class="bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-2xl flex flex-col justify-end h-full">
            <!-- TITLE -->
            <h3 class="font-semibold text-sm text-white mb-2 text-center">
              {{ item.title }}
            </h3>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- LEFT BUTTON -->
    <button
      class="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10
             opacity-0 group-hover:opacity-100
             transition duration-300
             bg-white shadow-lg rounded-full w-10 h-10
             flex items-center justify-center text-xl font-bold"
    >
      ‹
    </button>

    <!-- RIGHT BUTTON -->
    <button
      class="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10
             opacity-0 group-hover:opacity-100
             transition duration-300
             bg-white shadow-lg rounded-full w-10 h-10
             flex items-center justify-center text-xl font-bold"
    >
      ›
    </button>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'


const categories = [


  // PROPERTY AGENTS (NON-PHYSICAL WORK)
 

  // HOME & LAND PROFESSIONALS (PHYSICAL WORK)
   // HOME & LAND PROFESSIONALS (PHYSICAL WORK)
  {
    title: 'Land sellers',
    image: 'landseller.jpg',
    bg: 'bg-pink-600',
  },
  {
    title: 'Architecture & Interior Design',
    image: 'architecture.jpg',
    bg: 'bg-pink-600',
  },
     {
    title: 'Property Agents',
    image: 'propertyagents.jpg',
    bg: 'bg-indigo-700',
  },
  {
    title: 'Surveying Services',
    image: 'survey.jpg',
    bg: 'bg-orange-600',
  },
  {
    title: 'Builders & Bricklayers',
    image: 'bricklayer.jpg',
    bg: 'bg-red-700',
  },
  {
    title: 'Civil Engineers',
    image: 'civil-servant.jpg',
    bg: 'bg-gray-700',
  },
  {
    title: 'Electricians',
    image: 'electricians.jpg',
    bg: 'bg-yellow-600',
  },
  {
    title: 'Plumbers',
    image: 'plumbers.jpg',
    bg: 'bg-cyan-700',
  },
  {
    title: 'Painters & Tilers',
    image: 'painters.jpg',
    bg: 'bg-purple-700',
  },
  {
    title: 'Furniture & Carpenter',
    image: 'funiture.jpg',
    bg: 'bg-amber-700',
  },
  {
    title: 'Renovation Experts',
    image: 'renovation_experts.jpg',
    bg: 'bg-emerald-700',
  },

    // PROPERTY MARKET
  
  {
    title: 'House Renters',
    image: 'houseseller.jpg',
    bg: 'bg-gradient-to-br from-green-700 to-emerald-900',
  },
  {
    title: 'House Sellers',
    image: 'houseseller.jpg',
    bg: 'bg-blue-700',
  },

  {
    title: 'Land Agents',
    image: 'landagent.jpg',
    bg: 'bg-sky-700',
  },
 
]
</script>

