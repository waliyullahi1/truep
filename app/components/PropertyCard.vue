<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

/* ===============================
   PROPS
================================ */
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

/* ===============================
   HELPERS
================================ */

/* price value */
const getPrice = (item) => {
  if (!item?.pricing) return 0

  if (item.pricing.paymentType === 'outright') {
    return item.pricing.price || 0
  }

  if (item.pricing.paymentType === 'installment') {
    return item.pricing.installment?.monthlyAmount || 0
  }

  if (item.pricing.paymentType === 'rent') {
    return item.pricing.price || 0
  }

  return 0
}

/* price label */
const getPriceLabel = (item) => {
  const pricing = item?.pricing || {}

  if (item?.type === 'house') {
    if (item?.purpose === 'sale') {
      return pricing.paymentType === 'installment' ? '/month' : '/outright'
    }

    if (item?.purpose === 'rent') {
      return pricing.rent?.duration ? `/${pricing.rent.duration}` : ''
    }
  }

  if (item?.type === 'land') {
    if (pricing.paymentType === 'outright') {
      return item.landDetails?.unit ? `/per ${item.landDetails.unit}` : ''
    }

    if (pricing.paymentType === 'installment') {
      return `/per ${item.landDetails?.unit || 'plot'} /monthly`
    }
  }

  return ''
}

/* smart money format */
const smartMoney = (value) => {
  const num = Number(value || 0)

  if (num >= 1_000_000_000) return "₦" + (num / 1_000_000_000).toFixed(1) + "B"
  if (num >= 1_000_000) return "₦" + (num / 1_000_000).toFixed(1) + "M"
  if (num >= 1_000) return "₦" + (num / 1_000).toFixed(1) + "K"

  return "₦" + num.toLocaleString()
}

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

/* location */
const locationLabel = computed(() => {
  const loc = props.item?.location || {}

  return [
    loc.address,
    loc.city,
    loc.state
  ].filter(Boolean).join(', ')
})
</script>
<template>
  
       
     <NuxtLink :to="`/property/${item.slug}`"
          class="border rounded-xl  text-left  transition overflow-hidden"
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

<style scoped>
/* make arrows small circle */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.2s;
}

/* smaller arrow icon */
:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
  font-size: 12px;
  font-weight: bolder;
}

/* spacing */
:deep(.swiper-button-prev) {
  left: 6px;
}

:deep(.swiper-button-next) {
  right: 6px;
}

/* hover effect */
:deep(.swiper-button-prev:hover),
:deep(.swiper-button-next:hover) {
  background: rgba(0, 0, 0, 0.7);
}
</style>