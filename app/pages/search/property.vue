<script setup>
import { ref, computed, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

definePageMeta({
  layout: 'main'
}) 
/* =================================
   STATE
================================= */
const search = ref('')
const location = ref('')
const category = ref('All')
const visibleCount = ref(9)

/* =================================
   PROPERTY DATA
================================= */

const results = ref([
  /* =============================
     NORMAL HOUSES
  ============================= */

  {
    id: 1,
    title: '3 Bedroom Fully Furnished Maisonette',
    category: 'Flat / Apartment',
    location: 'Victoria Island, Lagos',
    price: '₦30,000,000 / year',
    beds: 3,
    baths: 4,
    toilets: 4,
    purpose: 'Rent',
    images: ['/images/land1.jpg','/images/land2.jpg']
  },
  {
    id: 2,
    title: '4 Bedroom Terrace Duplex With BQ',
    category: 'Duplex',
    location: 'Lekki Right, Lagos',
    price: '₦28,000,000 / year',
    beds: 4,
    baths: 5,
    toilets: 5,
    purpose: 'Rent',
    images: ['/images/land2.jpg','/images/land3.jpg']
  },

  /* =============================
     LAND FOR SALE (NEW)
  ============================= */

  {
    id: 100,
    title: '700sqm Estate Plot At NNPC By Ochacho',
    category: 'Land',
    location: 'Life Camp Abuja',
    price: '₦110,000,000',
    beds: 0,
    baths: 0,
    toilets: 0,
    purpose: 'Sale',
    images: ['/images/land1.jpg','/images/land2.jpg']
  },
  {
    id: 101,
    title: 'Flat Land In NNPC Estate',
    category: 'Land',
    location: 'Life Camp Abuja',
    price: '₦85,000,000',
    beds: 0,
    baths: 0,
    toilets: 0,
    purpose: 'Sale',
    images: ['/images/land2.jpg','/images/land3.jpg']
  },
  {
    id: 102,
    title: 'Commercial Land Jahi',
    category: 'Land',
    location: 'Jahi Abuja',
    price: '₦650,000,000',
    beds: 0,
    baths: 0,
    toilets: 0,
    purpose: 'Sale',
    images: ['/images/land3.jpg','/images/land1.jpg']
  },
  {
    id: 103,
    title: '700sqm Land Akobo',
    category: 'Land',
    location: 'Ibadan Oyo',
    price: '₦40,000',
    beds: 0,
    baths: 0,
    toilets: 0,
    purpose: 'Sale',
    images: ['/images/land1.jpg','/images/land2.jpg']
  },

  /* =============================
     AUTO GENERATE MANY
  ============================= */

  ...Array.from({ length: 40 }, (_, i) => {
    const types = ['House','Flat / Apartment','Duplex']
    const cities = ['Ilorin','Abuja','Lagos','Ibadan','Port Harcourt']

    return {
      id: i + 200,
      title: `${Math.floor(Math.random()*4)+2} Bedroom ${types[i%3]}`,
      category: types[i%3],
      location: cities[i%5],
      price: `₦${(Math.random()*90+10).toFixed(0)},000,000`,
      beds: Math.floor(Math.random()*5)+1,
      baths: Math.floor(Math.random()*4)+1,
      toilets: Math.floor(Math.random()*4)+1,
      purpose: 'Sale',
      images: ['/images/land1.jpg','/images/land2.jpg','/images/land3.jpg']
    }
  })
])

/* =================================
   FILTER OPTIONS
================================= */

const categories = [
  'All',
  'Land',
  'House',
  'Flat / Apartment',
  'Duplex'
]

const locationOptions = computed(() =>
  [...new Set(results.value.map(r => r.location))]
)

/* =================================
   FILTER LOGIC
================================= */

const filteredResults = computed(() =>
  results.value.filter(item => {
    const text = `${item.title} ${item.location}`.toLowerCase()

    return (
      (!search.value || text.includes(search.value.toLowerCase())) &&
      (!location.value || item.location === location.value) &&
      (category.value === 'All' || item.category === category.value)
    )
  })
)

const displayedResults = computed(() =>
  filteredResults.value.slice(0, visibleCount.value)
)

function loadMore() {
  visibleCount.value += 9
}

watch([search, location, category], () => {
  visibleCount.value = 9
})
</script>

<template>
<div>

  <!-- HERO -->
  <section class="mt-20 bg-primary py-10 text-white text-center">
    <Container>
       <h1 class="text-3xl font-bold">Find Properties Across Nigeria</h1>
    <p class="mt-2 text-sm">Buy • Rent • Lease • Invest</p>
    </Container>
   
  </section>

  <!-- FILTERS -->
  <section class="p-6 flex flex-wrap gap-3">
    <input
      v-model="search"
      placeholder="Search property..."
      class="px-4 h-11 border rounded"
    />

    <select v-model="location" class="px-4 h-11 border rounded">
      <option value="">All Locations</option>
      <option v-for="l in locationOptions" :key="l" :value="l">
        {{ l }}
      </option>
    </select>

    <button
      v-for="c in categories"
      :key="c"
      @click="category = c"
      class="px-4 py-2 rounded text-sm"
      :class="category === c ? 'bg-primary text-white' : 'bg-gray-200'"
    >
      {{ c }}
    </button>
  </section>

  <!-- CARDS -->
  <section class="">
    <Container class="  grid md:grid-cols-3 gap-6">
      <div
        v-for="item in displayedResults"
        :key="item.id"
        class="border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
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

          <Swiper
            :modules="[Pagination]"
            :pagination="{ clickable: true }"
          >
            <SwiperSlide v-for="img in item.images" :key="img">
              <div
                class="h-44 bg-cover bg-center"
                :style="{ backgroundImage: `url(${img})` }"
              />
            </SwiperSlide>
          </Swiper>

        </div>

        <!-- CONTENT -->
        <div class="p-4 text-sm">
          <div class="flex gap-4  mb-4 items-center bg-priary/10  rounded">

              <img
                src="/image/profile.webp"
                class="w-12 h-12 rounded-full object-cover"
              />

              <div class=" text-xs ">
                <h2 class="font-semibold">Walheed Khinde</h2>
                <p class="text-xs text-gray-500">Survey • Lagos</p>
                
              </div>

            </div>

          <h2 class="font-semibold">
            {{ item.title }}
          </h2>

          <p class="text-gray-500">
            {{ item.location }}
          </p>

          <p class="text-primary font-bold mt-1">
            {{ item.price }}
          </p>

          <!-- hide for land -->
          <div
            v-if="item.category !== 'Land'"
            class="flex gap-3 mt-2 text-xs"
          >
            <span>{{ item.beds }} Beds</span>
            <span>{{ item.baths }} Baths</span>
            <span>{{ item.toilets }} Toilets</span>
          </div>

          <button class="mt-3 w-full bg-primary text-white py-2 rounded">
            View Details
          </button>

        </div>
      </div>
    </Container>
  </section>

  <!-- LOAD MORE -->
  <div
    v-if="visibleCount < filteredResults.length"
    class="flex justify-center pb-10"
  >
    <button
      @click="loadMore"
      class="px-6 py-3 bg-primary text-white rounded"
    >
      View More
    </button>
  </div>

</div>
</template>

<style scoped>
:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.5;
}
:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}
</style>
