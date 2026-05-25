<template>
  <div class="relative p group">
    <!-- Swiper -->
  <section class="">
    <div  class="  grid md:grid-cols-3 gap-6">
      <button  @click="router.push('/search')" 
        v-for="item in results"
        :key="item.id"
         class=" #rounded-2xl   transition overflow-hidden"
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
                class="h-44 bg-cover bg-slate-800 rounded-lg bg-center"
                :style="{ backgroundImage: `url(${img})` }"
              />
            </SwiperSlide>
          </Swiper>

        </div>

        <!-- CONTENT -->
        <div class="p-4 flex flex-col items-start justify-start text-sm">


          <h2 class="font-medium text-left text-sm text-pink-600">
            {{ item.title }}
          </h2>
          <p class="text-primary  text-md font-semibold mt-1">
            {{ getPriceLabel(item) }}
          </p>

          <p class="text-gray-500 text-left">
            {{ getLocationLabel(item.location) }}
          </p>

          

          <!-- hide for land -->
         

         

        </div>
      </button>
    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

definePageMeta({
  layout: 'auth'
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
  {
    id: 1,
    title: 'BEDROOM TERRACE DUPLEX AT ORCHID LEKKI LAGOS',
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
      price: 130000000,
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
    images: ['/images/land1.jpg', '/images/land2.jpg', '/images/land11.jpg', '/images/land111.jpeg' ]
  },
  {
    id: 2,
    title: ' BEDROOM SEMI DETACHED DUPLEX LOCATED AT AJAH LAGOS',
    category: 'Duplex',
    location: {
    country: "Nigeria",
    state: "Lagos",
    lga: "",
    city: "Lekki ",
    address: " Ajah, Lekki, Lagos",
    source: "gps",

    geometry: {
      type: "Polygon",
      coordinates: []
    }
  },
     pricing: {
    price: 222000000,
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
    images: ['/images/land22.jpeg','/images/land222.jpeg','/images/land22222.jpeg', '/images/land2222.jpeg' ]
  },

  /* =============================
     LAND FOR SALE (NEW)
  ============================= */

  {
    id: 100,
    title: 'Full plot of land 60×100 for sale at feru',
    category: 'Land',
    location: 'Feru town , peace estate , after lafenwa, ado-odo Ogun state, Ado-Odo/Ota, Ogun',
    price: '₦110,000,000',
    beds: 0,
    baths: 0,
    toilets: 0,
    purpose: 'Sale',
    images: ['/images/land33.jpg','/images/land333.jpeg', '/images/land3333.jpeg', "/images/land333.jpeg"]
  },
])
const resultss = ref([
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
