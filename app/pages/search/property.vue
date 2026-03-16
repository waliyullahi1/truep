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
    location: {
      country: "Nigeria",
      state: "Lagos",
      lga: "Eti-Osa",
      city: "Victoria Island",
      address: "Victoria Island, Lagos",
      source: "manual",
      geometry: {
        type: "Polygon",
        coordinates: []
      }
    },
    pricing: {
      price: 30000000,
      currency: "NGN",
      rentDuration: "year",
      installment: false,
      installmentPlan: {
        months: null,
        monthlyAmount: null
      }
    },
    features: [{ 'Bedrooms': 3, 'Bathrooms': 4, 'Living Room': 1, 'Kitchen': 1, 'Bowlroom': true }],
    user: {
      name: "Walheed Khinde",
      phone: "",
      location: "Lagos"
    },
    beds: 3,
    baths: 4,
    toilets: 4,
    purpose: 'Rent',
    images: ['/images/land1.jpg', '/images/land2.jpg']
  },
  {
    id: 2,
    title: '4 Bedroom Terrace Duplex With BQ',
    category: 'Duplex',
    location: {
    country: "Nigeria",
    state: "",
    lga: "",
    city: "",
    address: "",
    source: "gps",

    geometry: {
      type: "Polygon",
      coordinates: []
    }
  },
     pricing: {
    price: null,
    currency: "NGN",
    rentDuration: null,
    installment: false,
    installmentPlan: {
      months: null,
      monthlyAmount: null
    }
  },
    features: [{' Bedrooms':4, ' Bathrooms':4, 'Living Room':4, '1 Kitchen':1, 'Bowlroom':true}],
    user: {
      name: "",
      phone: "",
      location: ""
    },
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
     GENERATED LISTINGS (LAND & HOUSE)
  ============================= */

  {
    id: 10,
    title: "2 Plot of Land For Sale",
    description: "<p>Industrial land containing many mineral resources</p>",
    type: "industrial_land",
    category: "Land",
    purpose: "Sell Land",
    pricing: {
      price: 8000000,
      currency: "NGN",
      rentDuration: null,
      installment: false,
      installmentPlan: { months: null, monthlyAmount: null }
    },
    location: {
      country: "Nigeria",
      state: "Ogun",
      lga: "Sagamu",
      city: "Sagamu",
      address: "Sagamu, Ogun State",
      source: "gps",
      geometry: { type: "Polygon", coordinates: [] }
    },
    landDetails: {
      unit: "plot",
      size: 450,
      quantity: 2,
      totalSqm: 900,
      fenced: false,
      dry: true,
      roadAccess: true,
      price: 4000000
    },
    houseDetails: null,
    media: { images: ['/images/land1.jpg', '/images/land2.jpg'], video: null },
    documents: { surveyPlan: null, titleDocument: null },
    features: [],
    user: { name: "Naheem Jinde", phone: "08031234567", location: "Lagos" },
    beds: 0, baths: 0, toilets: 0,
    images: ['/images/land1.jpg', '/images/land2.jpg']
  },

  {
    id: 11,
    title: "4 Plots of Land For Rent – Industrial Zone",
    description: "<p>Spacious industrial land available for long-term lease</p>",
    type: "industrial_land",
    category: "Land",
    purpose: "Rent Land",
    pricing: {
      price: 1200000,
      currency: "NGN",
      rentDuration: "year",
      installment: false,
      installmentPlan: { months: null, monthlyAmount: null }
    },
    location: {
      country: "Nigeria",
      state: "Lagos",
      lga: "Ikorodu",
      city: "Ikorodu",
      address: "Ikorodu Industrial Layout, Lagos",
      source: "gps",
      geometry: { type: "Polygon", coordinates: [] }
    },
    landDetails: {
      unit: "plot",
      size: 450,
      quantity: 4,
      totalSqm: 1800,
      fenced: true,
      dry: true,
      roadAccess: true,
      price: 300000
    },
    houseDetails: null,
    media: { images: ['/images/land2.jpg', '/images/land3.jpg'], video: null },
    documents: { surveyPlan: null, titleDocument: null },
    features: [],
    user: { name: "Naheem Jinde", phone: "08031234567", location: "Lagos" },
    beds: 0, baths: 0, toilets: 0,
    images: ['/images/land2.jpg', '/images/land3.jpg']
  },

  {
    id: 12,
    title: "Modern 3 Bedroom Flat For Sale",
    description: "<p>Beautifully finished modern flat in a serene environment</p>",
    type: "flat",
    category: "Flat / Apartment",
    purpose: "Sell House",
    pricing: {
      price: 45000000,
      currency: "NGN",
      rentDuration: null,
      installment: true,
      installmentPlan: { months: 12, monthlyAmount: 3750000 }
    },
    location: {
      country: "Nigeria",
      state: "Osun",
      lga: "Ife Central",
      city: "Ile-Ife",
      address: "Ife Central, Osun State",
      source: "gps",
      geometry: { type: "Point", coordinates: [4.520657, 7.519191] }
    },
    landDetails: null,
    houseDetails: {
      beds: 3,
      baths: 3,
      toilets: 4,
      floors: 1,
      parking: true,
      furnished: false
    },
    media: { images: ['/images/land3.jpg', '/images/land1.jpg'], video: null },
    documents: { surveyPlan: null, titleDocument: null },
    features: ["POP Ceiling", "Tiled Floors", "Pre-paid Meter"],
    user: { name: "Naheem Jinde", phone: "08031234567", location: "Osun" },
    beds: 3, baths: 3, toilets: 4,
    images: ['/images/land3.jpg', '/images/land1.jpg']
  },

  {
    id: 13,
    title: "3 Bedroom Flat For Rent – Ife Central",
    description: "<p>Well-maintained 3 bedroom flat available for annual rent</p>",
    type: "flat",
    category: "Flat / Apartment",
    purpose: "Rent House",
    pricing: {
      price: 600000,
      currency: "NGN",
      rentDuration: "year",
      installment: false,
      installmentPlan: { months: null, monthlyAmount: null }
    },
    location: {
      country: "Nigeria",
      state: "Osun",
      lga: "Ife Central",
      city: "Ile-Ife",
      address: "Mayfair Estate, Ife Central, Osun",
      source: "gps",
      geometry: { type: "Point", coordinates: [4.521000, 7.520000] }
    },
    landDetails: null,
    houseDetails: {
      beds: 3,
      baths: 2,
      toilets: 3,
      floors: 1,
      parking: false,
      furnished: false
    },
    media: { images: ['/images/land1.jpg', '/images/land3.jpg'], video: null },
    documents: { surveyPlan: null, titleDocument: null },
    features: ["Running Water", "Pre-paid Meter", "Security"],
    user: { name: "Naheem Jinde", phone: "08031234567", location: "Osun" },
    beds: 3, baths: 2, toilets: 3,
    images: ['/images/land1.jpg', '/images/land3.jpg']
  },

  {
    id: 14,
    title: "Commercial Land For Sale – Abuja",
    description: "<p>Prime commercial land in a high traffic business district</p>",
    type: "commercial_land",
    category: "Land",
    purpose: "Sell Land",
    pricing: {
      price: 120000000,
      currency: "NGN",
      rentDuration: null,
      installment: false,
      installmentPlan: { months: null, monthlyAmount: null }
    },
    location: {
      country: "Nigeria",
      state: "FCT",
      lga: "Abuja Municipal",
      city: "Wuse 2",
      address: "Wuse 2, Abuja FCT",
      source: "gps",
      geometry: { type: "Polygon", coordinates: [] }
    },
    landDetails: {
      unit: "sqm",
      size: 1200,
      quantity: 1,
      totalSqm: 1200,
      fenced: true,
      dry: true,
      roadAccess: true,
      price: 120000000
    },
    houseDetails: null,
    media: { images: ['/images/land2.jpg', '/images/land1.jpg'], video: null },
    documents: { surveyPlan: null, titleDocument: null },
    features: ["C of O", "Road Frontage", "Corner Piece"],
    user: { name: "Naheem Jinde", phone: "08031234567", location: "Abuja" },
    beds: 0, baths: 0, toilets: 0,
    images: ['/images/land2.jpg', '/images/land1.jpg']
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
  [...new Set(results.value.map(r => {
    // Handle both string and object location formats
    if (typeof r.location === 'object') {
      return r.location.address || r.location.city || r.location.state || ''
    }
    return r.location
  }).filter(Boolean))]
)

/* =================================
   FILTER LOGIC
================================= */

const filteredResults = computed(() =>
  results.value.filter(item => {
    // Normalize location for filtering
    const locationStr = typeof item.location === 'object'
      ? (item.location.address || item.location.city || '')
      : item.location

    const text = `${item.title} ${locationStr}`.toLowerCase()

    return (
      (!search.value || text.includes(search.value.toLowerCase())) &&
      (!location.value || locationStr === location.value) &&
      (category.value === 'All' || item.category === category.value)
    )
  })
)

// Helper to display location as a string in the template
function getLocationLabel(loc) {
  if (typeof loc === 'object') {
    return loc.address || loc.city || loc.state || 'Unknown'
  }
  return loc
}

// Helper to display price from either flat price string or pricing object
function getPriceLabel(item) {
  if (item.pricing?.price) {
    const formatted = item.pricing.price.toLocaleString('en-NG')
    const duration = item.pricing.rentDuration ? ` / ${item.pricing.rentDuration}` : ''
    return `₦${formatted}${duration}`
  }
  return item.price || 'Price on request'
}

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
<section class="relative  h-screen-80 flex items-center justify-center text-center">

  <img
    src="/images/hero.jpg"
    class="absolute inset-0 w-full h-full object-cover"
  />

  <div class="absolute inset-0 bg-black/60"></div>

  <div class="relative z-10 max-w-3xl px-6 text-white">

    <h1 class="text-2xl md:text-4xl font-semibold leading-tight">
      Find Your Perfect Property in Nigeria
    </h1>

    <p class="mt-1 text-lg text-gray-200">
      Buy land • Sell houses • Rent apartments • Discover great deals
    </p>

    <!-- SEARCH -->

    <div class="mt-8 bg-white rounded-lg shadow-xl p-2 flex flex-col md:flex-row gap-3">

      <input
        v-model="search"
        placeholder="Search land, houses, agents..."
        class="flex-1 px-2 py-1 outline-none text-gray-700"
      />

      <button
        class=" bg-secondary text-white px-6 h-fit  py-2 rounded-lg font-medium hover:bg-secondary/80"
      >
        Search
      </button>

    </div>
    <div class="flex gap-3  mt-7">
      <button
      v-for="c in categories"
      :key="c"
      @click="category = c"
      class="px-4 py-2 rounded text-sm"
      :class="category === c ? 'bg-secondary text-white' : ' bg-white/40 text'"
    >
      {{ c }}
    </button>
    </div>
        

  </div>

</section>

  <!-- FILTERS -->
  <section class="p-6 flex flex-wrap gap-3">

    <select v-model="location" class="px-4 h-11 border rounded">
      <option value="">All Locations</option>
      <option v-for="l in locationOptions" :key="l" :value="l">
        {{ l }}
      </option>
    </select>

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
                <h2 class="font-semibold">{{ item.user?.name || 'Walheed Khinde' }}</h2>
                <p class="text-xs text-gray-500">Survey • {{ item.user?.location || getLocationLabel(item.location) }}</p>
                
              </div>

            </div>

          <h2 class="font-semibold">
            {{ item.title }}
          </h2>

          <p class="text-gray-500">
            {{ getLocationLabel(item.location) }}
          </p>

          <p class="text-primary font-bold mt-1">
            {{ getPriceLabel(item) }}
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
