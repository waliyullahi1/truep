<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination' 
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

/* ===============================
   HELPERS
================================ */

/* fallback images */
const images = computed(() => {
  const files = props.item?.media?.files || []

  const validImages = files.filter(
    f => f.type === 'image' && f.url
  )

  return validImages.length
    ? validImages
    : [{ url: '/image/no-image.png' }]
})

/* price */
const smartMoney = (num = 0) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(num)
}

/* label */
const getPriceLabel = (item) => {
  if (item?.purpose === 'rent') return '/yr'
  return ''
}

/* location */
const locationLabel = computed(() => {
  const loc = props.item?.location || {}
  return `${loc.address || ''}, ${loc.city || ''}, ${loc.state || ''}`
})
</script>

<template>
  
       
     <NuxtLink :to="`/property/${item.slug}`"
          class="border rounded-xl  transition overflow-hidden"
        >
       
          <!-- IMAGE SLIDER -->
          <div class="relative">

            <!-- badge -->
            <span class="absolute top-2 left-2 z-10 bg-primary text-white text-xs px-2 py-1 rounded">
              FOR {{ item.purpose.toUpperCase() }} 
            </span>

            <span class="absolute top-2 right-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {{ item.category }} 
            </span>
            <ClientOnly>
              <Swiper
                :modules="[Pagination, Navigation]"
                :pagination="{ clickable: true }"
                :navigation="true"
                class="property-swiper"
              >
              <!-- <SwiperSlide v-for="img in (item?.media?.files?.filter(f => f.type === 'image' && f.url) || [{ url: '/image/osun.png' }])" :key="img.url"> -->
                <SwiperSlide 
                 v-for="img in (
                      item?.media?.files?.filter(f => f.type === 'image' && f.url)?.length
                        ? item.media.files.filter(f => f.type === 'image' && f.url)
                        : [{ url: '/image/no-image.png' }]
                    )"
                   :key="img">
                  <div
                    class="h-44 bg-cover bg-center"
                    :style="{
                      backgroundImage: `url(${img.url || '/image/no-image.png'})`
                    }"
                  />
                </SwiperSlide>
              </Swiper>
            </ClientOnly>
          </div>

          <!-- CONTENT -->
          <div class="p-4 text-sm">
            <!-- <div class="flex gap-4  mb-4 items-center bg-priary/10  rounded">

                <img
                  src="/image/profile.webp"
                  class="w-12 h-12 rounded-full object-cover"
                />

                <div class=" text-xs ">
                  <h2 class="font-semibold">{{ item.user?.name || 'Walheed Khinde' }}</h2>
                  <p class="text-xs text-gray-500">Survey • {{ item.user?.location || getLocationLabel(item.location) }}</p>
                  
                </div>

              </div> -->

            <h2 class="font-semibold">
              {{ item.title }}
            </h2>

            <p class="text-gray-500">
             {{item.location.address}}, {{item.location.city}}, {{item.location.state}}
            </p> 

            <p class="text-primary text-lg font-bold mt-1">
               {{smartMoney(item.pricing.price || 0) }} {{ getPriceLabel(item) }}
            </p>

            <!-- hide for land -->
             
            <div
              v-if="item.type !== 'land'"
              class="flex gap-3 mt-2 text-xs"
            >
              <span>{{ item.houseDetails?.bathroom }} Beds</span>
              <span>{{ item.houseDetails?.bedroom }} Baths</span>
              <span>{{ item.houseDetails?.toilet }} Toilets</span>
            </div>

           

          </div>
        </NuxtLink> 
    

</template>