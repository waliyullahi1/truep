<template>
  <div class="relative py-4 group">
    <!-- Swiper -->
    <Swiper
      :modules="[Navigation]"
      :slides-per-view="1.2"
      :space-between="20"
      :breakpoints="{
        640: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.2 }
      }"
      :navigation="{
        prevEl: '.custom-prev',
        nextEl: '.custom-next'
      }"
      class="pb-6 overflow-visible"
    >
      <SwiperSlide
        v-for="(item, idx) in properties"
        :key="idx"
        class="h-auto"
      >
    
        <!-- CARD -->
      <div class="rounded-lg overflow-hidden bg-white mx-2 shadow relative">

          <!-- PRICE -->
          <div class="absolute top-2 left-2 z-10">
            <UiTypographyP class="bg-red-600/70 px-3 py-1 text-white text-xs rounded">
              {{ item.price }}
            </UiTypographyP>
          </div>

          <!-- IMAGE -->
          <div
            class="bg-no-repeat bg-center bg-cover h-36 flex justify-center items-center"
            :style="{ backgroundImage: `url(${item.image})` }"
          ></div>

          <!-- CONTENT -->
          <div class="px-2 py-2 mt-3">

            <!-- AGENT + TYPE -->
            <div class="flex justify-between items-center">
              <div class="flex gap-2 items-center">
                <div class="bg-black rounded-full overflow-hidden">
                  <img
                    src="@/assets/images/professionor.jpg"
                    class="w-7 h-7 object-cover"
                    alt=""
                  />
                </div>

                <div>
                  <p class="text-[12px] font-semibold text-secondary leading-tight">
                    {{ item.name }}
                    <br />
                    <small class="text-black text-[11px]">
                      {{ item.role }}
                    </small>
                  </p>
                </div>
              </div>

              <span class="bg-secondary text-white rounded-lg px-2 py-1 text-xs">
                {{ item.type }}
              </span>
            </div>

            <!-- TITLE -->
            <UiTypographyH3 class="text-sm mt-3">
              {{ item.title }}
            </UiTypographyH3>

            <!-- DESCRIPTION -->
            <UiTypographyP class="mt-2 text-[12px] text-gray-600 line-clamp-3">
              {{ item.description }}
            </UiTypographyP>

            <!-- FEATURES -->
            <div class="mt-3 flex gap-3 text-[11px] text-gray-700">

              <div v-if="item.features.bedrooms" class="flex gap-1 items-center">
                <img src="/image/icon/bed.svg" class="w-4" />
                <span>{{ item.features.bedrooms }} Beds</span>
              </div>

              <div v-if="item.features.bathrooms" class="flex gap-1 items-center">
                <img src="/image/icon/bath.svg" class="w-4" />
                <span>{{ item.features.bathrooms }} Baths</span>
              </div>

              <div v-if="item.features.area" class="flex gap-1 items-center">
                <img src="/image/icon/location.svg" class="w-4" />
                <span>{{ item.features.area }}</span>
              </div>
            </div>

            <!-- DATE -->
            <span class="text-slate-500 text-[11px] block mt-2">
              Updated {{ item.updatedAt }}
            </span>
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


const carouselConfig = {
  wrapAround: false,
  breakpoints: {
    0: { itemsToShow: 1.1 },
    640: { itemsToShow: 2 },
    768: { itemsToShow: 3 },
    1024: { itemsToShow: 3 },
    1280: { itemsToShow: 4 },
  },
}

const properties = [
  {
    name: "Mr. Adewale",
    role: "Agent",
    type: "Land for Sale",
    title: "Dry Land for Sale",
    price: "₦5,000,000",
    image: "/images/land1.jpg",
    description:
      "Dry and well-documented land located in Ibeju-Lekki, suitable for residential and investment purposes.",
    features: {
      bedrooms: null,
      bathrooms: null,
      area: "600 sqm",
    },
    updatedAt: "24 Jan 2026",
  },

  {
    name: "Mrs. Adebayo",
    role: "Property Owner",
    type: "House for Sale",
    title: "Detached Duplex for Sale",
    price: "₦750,000,000",
    image: "/images/land2.jpg",
    description:
      "Ultra-luxury 5-bedroom waterfront duplex located in Victoria Garden City (VGC), Lekki.",
    features: {
      bedrooms: 5,
      bathrooms: 5,
      area: "1,400 sqm",
    },
    updatedAt: "18 Jan 2026",
  },

  {
    name: "Mr. Johnson",
    role: "Agent",
    type: "House for Rent",
    title: "3-Bedroom Terrace Duplex",
    price: "₦7,500,000 / year",
    image: "/images/land1.jpg",
    description:
      "Modern 3-bedroom terrace duplex in Ikota, Lekki with good road access and security.",
    features: {
      bedrooms: 3,
      bathrooms: 3,
      area: null,
    },
    updatedAt: "20 Jan 2026",
  },

  {
    name: "Mrs. Okafor",
    role: "Agent",
    type: "Land for Sale",
    title: "Investment Land in Epe",
    price: "₦2,800,000",
    image: "/images/land2.jpg",
    description:
      "Affordable land ideal for long-term investment close to major developments.",
    features: {
      bedrooms: null,
      bathrooms: null,
      area: "500 sqm",
    },
    updatedAt: "22 Jan 2026",
  },
]
</script>
