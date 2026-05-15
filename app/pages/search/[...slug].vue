<script setup>
import { ref, computed, watch, watchEffect, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import loadstates from '@/data/nigeria-states.js'
import { propertyTypes } from '@/data/property-types'


definePageMeta({
  layout: 'auth'
})
const route = useRoute()
const router = useRouter()

/* =================================
   STATE
================================= */
const search = ref('')
const location = ref('')
const category = ref('All')
const visibleCount = ref(9)
const isMap = ref(false)

const isFixed = ref(false)
const isShrink = ref(false)
const searchRef = ref(null)
const searchTop = ref(0)
const selectedState = ref('')
const selectedCity = ref('')

const page = ref(1)
const perPage = 20
const showFilter = ref(false)
const sortType = ref('suggested')

const filters = ref({})

const selectedFilter = ref({
  type: '',
  category: '',
  city: '',
  state: '',
  purpose: ''
})

/* =================================
   🔥 NORMALIZE (MASTER FIX)
================================= */
const normalize = (str = '') =>
  decodeURIComponent(str)
    .toString()
    .toLowerCase()
    .replace(/[\s-_]/g, '') // removes space, dash, underscore

/* =================================
   🔥 ROUTE SEGMENTS
================================= */
const segments = computed(() => {
  const slug = route.params.slug
  return Array.isArray(slug) ? slug : slug ? [slug] : []
})

/* =================================
   STATE PARAM
================================= */
const stateParam = computed(() => {
  return segments.value.find(seg =>
    loadstates.some(s => normalize(s.name) === normalize(seg))
  ) || ''
})

/* =================================
   CITY PARAM
================================= */
const cityOptions = computed(() => {
  if (!stateParam.value) return []

  const state = loadstates.find(
    s => normalize(s.name) === normalize(stateParam.value)
  )

  return state ? state.lgas : []
})

const cityParam = computed(() => {
  if (!stateParam.value) return ''

  return segments.value.find(seg =>
    cityOptions.value.some(city => normalize(city) === normalize(seg))
  ) || ''
})

/* =================================
   TYPE PARAM
================================= */
const typeParam = computed(() =>
  segments.value.find(s => ['land', 'house'].includes(normalize(s))) || ''
)

/* =================================
   CATEGORY PARAM
================================= */
const categoryOptions = computed(() => {
  const type = normalize(typeParam.value)
  return propertyTypes[type] || []
})

const categoryParam = computed(() => {
  return segments.value.find(seg =>
    categoryOptions.value.some(c =>
      normalize(c.key) === normalize(seg)
    )
  ) || ''
})

const finalCategory = computed(() => {
  const found = categoryOptions.value.find(c =>
    normalize(c.key) === normalize(categoryParam.value)
  )
  return found?.key || ''
})

/* =================================
   PURPOSE PARAM
================================= */
const purposeParam = computed(() => {
  return segments.value.find(seg =>
    ['sale', 'rent'].includes(normalize(seg))
  ) || ''
})

/* =================================
   SORT
================================= */
const handleSort = (type) => {
  sortType.value = type
}

const stateOptions = computed(() =>
  loadstates.map(s => s.name)
)

/* =================================
   🔥 FETCH DATA
================================= */
/* =================================
   🔥 FETCH DATA
================================= */


const {
  data: resultsData,
  pending,
  error,
  refresh
} = await useAsyncData(
  'properties',
  async () => {

    const res = await useApiFetch('/property/all', {
      method: 'GET',
      params: {
        purpose: purposeParam.value || undefined,
        search: search.value || undefined,
        type: typeParam.value || undefined,
        category: finalCategory.value || undefined,
        city: cityParam.value || undefined,
        state: stateParam.value || undefined
      }
    })

    // throw error properly
    if (!res?.success) {
      throw createError({
        statusCode: 500,
        statusMessage: res?.message || 'Failed to fetch properties'
      })
    }

    const safe = res?.data?.data || res?.data || []
    console.log(safe);
    
    

    return safe
  },
  {
    lazy: true,
    server: true
  }
)

const refreshData = async (stopLoading) => {
  await refresh()   // or your API call
  stopLoading()     // tell child to stop loading
}

const results = computed(() => resultsData.value || [])

/* =================================
   🔥 SYNC ROUTE → STATE
================================= */
watch(
  () => route.fullPath,
  () => {
    selectedState.value = stateParam.value || ''
    selectedCity.value = cityParam.value || ''

    selectedFilter.value = {
      type: typeParam.value || '',
      category: finalCategory.value || '',
      city: cityParam.value || '',
      state: stateParam.value || '',
      purpose: purposeParam.value || ''
    }

    refresh()
  },
  { immediate: true }
)

watch([selectedState, selectedCity], () => {
  const path = [
    selectedState.value,
    selectedCity.value,
    typeParam.value,
    finalCategory.value,
    purposeParam.value
  ].filter(Boolean).join('/')

  const newPath = `/search/${path}`

  if (route.fullPath !== newPath) {
    router.push(newPath)
  }
})
/* reset city when state changes */
watch(selectedState, () => {
  selectedCity.value = ''
})
/* DEBUG */
watchEffect(() => {
  // console.log('SEGMENTS:', segments.value)
  // console.log('STATE:', stateParam.value)
  // console.log('CITY:', cityParam.value)
  // console.log('TYPE:', typeParam.value)
  // console.log('CATEGORY:', categoryParam.value)
  // console.log('FINAL CATEGORY:', finalCategory.value)
})

/* =================================
   FILTER
================================= */
const filteredResults = computed(() =>
  results.value.filter(item => {
    const itemState = normalize(item.location?.state)
    const itemCity = normalize(item.location?.city)

    return (
      (!search.value || `${item.title}`.toLowerCase().includes(search.value.toLowerCase())) &&

      // ✅ STATE FILTER
      (!selectedState.value || itemState === normalize(selectedState.value)) &&

      // ✅ CITY FILTER
      (!selectedCity.value || itemCity === normalize(selectedCity.value)) &&

      // ✅ TYPE
      (!selectedFilter.value.type || item.type === selectedFilter.value.type) &&

      // ✅ CATEGORY
      (!selectedFilter.value.category || item.category === selectedFilter.value.category)
    )
  })
)

/* =================================
   SORTED RESULTS (FIXED ORDER)
================================= */
const sortedResults = computed(() => {
  let data = [...filteredResults.value]

  switch (sortType.value) {
    case 'newest':
      return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    case 'cheapest':
      return data.sort((a, b) => getPrice(a) - getPrice(b))

    case 'expensive':
      return data.sort((a, b) => getPrice(b) - getPrice(a))

    case 'smallest':
      return data.sort((a, b) => (a.size || 0) - (b.size || 0))

    case 'biggest':
      return data.sort((a, b) => (b.size || 0) - (a.size || 0))

    default:
      return data
  }
})

/* =================================
   PAGINATION (NOW USE SORTED ✅)
================================= */
const paginatedResults = computed(() => {
  const start = (page.value - 1) * perPage
  return sortedResults.value.slice(start, start + perPage)
})

const displayedResults = computed(() =>
  sortedResults.value.slice(0, visibleCount.value)
)

function loadMore() {
  visibleCount.value += 9
}

/* =================================
   RESET FILTERS
================================= */
const handleResetFilters = () => {
  search.value = ''
  location.value = ''
  sortType.value = 'suggested'
  selectedFilter.value = {
    type: '',
    category: '',
    city: '',
    state: '',
    purpose: ''
  }

  router.push('/search')
}

/* =================================
   SCROLL
================================= */
function handleScroll() {
  const scrollY = window.scrollY
  isFixed.value = scrollY > searchTop.value
  isShrink.value = scrollY > searchTop.value + 100
}

/* =================================
   CATEGORY CLICK
================================= */
const selectCategory = (c) => {
  let type = ''
  let cat = ''

  if (c === 'Land') type = 'land'
  else if (c === 'House') type = 'house'
  else if (c === 'Flat / Apartment') {
    type = 'house'
    cat = 'flat'
  } else if (c !== 'All') {
    cat = normalize(c)
  }

  const path = [
    stateParam.value,
    cityParam.value,
    type,
    cat
  ].filter(Boolean).join('/')

  router.push(`/search/${path}`)
}

const isActive = (c) => {
  if (c === 'All') return !typeParam.value && !categoryParam.value
  if (c === 'Land') return normalize(typeParam.value) === 'land'
  if (c === 'House') return normalize(typeParam.value) === 'house' && !categoryParam.value
  if (c === 'Flat / Apartment') {
    return normalize(typeParam.value) === 'house' && normalize(categoryParam.value) === 'flat'
  }
  return normalize(categoryParam.value) === normalize(c)
}

/* =================================
   LOCATION OPTIONS
================================= */
const locationOptions = computed(() =>
  [...new Set(results.value.map(r =>
    r.location?.state || r.location?.city || r.location?.address
  ).filter(Boolean))]
)

/* =================================
   HELPERS
================================= */
const getPrice = (item) => {
  if (!item?.pricing) return 0
  if (item.pricing.paymentType === 'outright') return item.pricing.price || 0
  if (item.pricing.paymentType === 'installment') return item.pricing.installment?.monthlyAmount || 0
  if (item.pricing.paymentType === 'rent') return item.pricing.price || 0
  return 0
}

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

const smartMoney = (value) => {
  const num = Number(value || 0)

  if (num >= 1_000_000_000) return "₦" + (num / 1_000_000_000).toFixed(1) + "B"
  if (num >= 1_000_000) return "₦" + (num / 1_000_000).toFixed(1) + "M"
  if (num >= 1_000) return "₦" + (num / 1_000).toFixed(1) + "K"

  return "₦" + num.toLocaleString()
}

/* =================================
   MOUNT
================================= */
onMounted(async () => {
  await nextTick()

  if (searchRef.value) {
    searchTop.value = searchRef.value.offsetTop
  }

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

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
</script>
<template>
<div>

      <div v-if="isFixed"   class="fixed  z-100 top-0 h-fit left-0 w-full   backdrop-blur bg-white/90"   ref="searchRef">
        <div class="   border  border-secondary  mx-2 mt-1   h-fit   bg-white items-center overflow-hidden rounded-md -xl  p- flex">
          <div class="  w-8  flex justify-center items-center  md:h-6 h-7  -0">
            
            <img src="@/assets/images/icons/searchb.svg" alt="" class=" w-3 md:w-5" srcset="">
          </div>
          <input
            v-model="search"
            placeholder="Search land, houses, agents..."
            class="flex-1  text-sm font-normal sm:text-md  outline-none text-gray-700"
          />
          <div class=" bg-secondary text-sm h-full  -0">
              <PropertyFilterModal
              v-model="showFilter"
              :initialFilters="filters"
              @apply="(data) => {
                filters = data
               
              }"
            />
               <button @click="showFilter = true" class=" bg-secondary flex items-center justify-center gap-2 text-white px-2 h-full  py-2  font-normal hover:bg-secondary/80">
                <img src="@/assets/images/icons/list.svg" alt="" class=" w-5" srcset="">
                <p>Filters</p> 
              </button>
          </div>
          

        </div>
        <div class="flex gap-3  overflow-x-auto  px-1 py-1 border-t-2 mt-1">
            <button
            v-for="c in categories"
            :key="c"
            @click="selectCategory(c)"
            class="md:px-4 md:py-2 text-nowrap  px-2 py-1 rounded text-sm"
            :class="isActive(c) ? 'bg-secondary text-white' : ' bg-white/40 text-secondary border border-secondary text'"
          >
            {{ c }}
          </button>
        </div>
    </div>
    
          <Container    class="  z-100 top-0 h-fit left-0 w-full   backdrop-blur bg-white/90"   ref="searchRef">
              <div v-if="!isFixed"  ref="searchRef" class="   border  border-secondary  mx-2 mt-1   h-fit   bg-white items-center overflow-hidden rounded-md -xl  p- flex">
                <div class="  w-8  flex justify-center items-center  md:h-6 h-7  -0">
                  
                  <img src="@/assets/images/icons/searchb.svg" alt="" class=" w-3 md:w-5" srcset="">
                </div>
                <input
                  v-model="search"
                  placeholder="Search land, houses, agents..."
                  class="flex-1  text-sm font-normal sm:text-md  outline-none text-gray-700"
                />
                <div class=" bg-secondary text-sm h-full  -0">
                    <PropertyFilterModal
                    v-model="showFilter"
                    :initialFilters="filters"
                    @apply="(data) => {
                      filters = data
                    
                    }"
                  />
                    <button @click="showFilter = true" class=" bg-secondary flex items-center justify-center gap-2 text-white px-2 h-full  py-2  font-normal hover:bg-secondary/80">
                      <img src="@/assets/images/icons/list.svg" alt="" class=" w-5" srcset="">
                      <p>Filters</p> 
                    </button>
                </div>
                

              </div>
              <div class="flex gap-3  overflow-x-auto  px-1 py-1 border-t-2 mt-1">
                  <button
                  v-for="c in categories"
                  :key="c"
                  @click="selectCategory(c)"
                  class="md:px-4 md:py-2 text-nowrap  px-2 py-1 rounded text-sm"
                  :class="isActive(c) ? 'bg-secondary text-white' : ' bg-white/40 text-secondary border border-secondary text'"
                >
                  {{ c }}
                </button>
              </div>

             
          </Container>
  <!-- HERO -->
  <section class="relative z-10 hidden  h-screen-80 flex items-center justify-center text-center">

    <img
      src="/images/hero.jpg"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <div class="absolute inset-0 bg-black/60"></div>

    <div class="relative z-10 max-w-3xl px-6 text-white">

      <h1 class="text-3xl md:text-4xl font-semibold leading-tight">
        Find Your Perfect Property in Nigeria
      </h1>

      <p class="mt-1 text-sm  sm:text-lg text-gray-200">
        Buy land • Sell houses • Rent apartments • Discover great deals
      </p>
          <!-- PLACEHOLDER -->
      <div v-if="isFixed" class="h-[90px]"></div>
      <!-- SEARCH -->
      <div v-if="!isFixed"  class=""   ref="searchRef"
          
      >
          <div class="mt-8     bg-white  overflow-hidden rounded-lg -xl shadow-xl p- flex ">
            <div class="  w-8  flex justify-center items-center  h-12  -0">
              
              <img src="@/assets/images/icons/searchb.svg" alt="" class=" w-5" srcset="">
            </div>
            <input
              v-model="search"
              placeholder="Search land, houses, agents..."
              class="flex-1   outline-none text-gray-700"
            />
            <div class="  -0">
              
              <button  @click="showFilter = true" class=" bg-secondary flex items-center justify-center gap-2 text-white px-2 h-full  py-2  font-normal hover:bg-secondary/80">
                  <img src="@/assets/images/icons/list.svg" alt="" class=" w-5" srcset="">
                  <p>Filter</p> 
                </button>
            </div>
            

          </div>
          <div class="flex gap-3  items-center justify-center  flex-wrap mt-7">
              <button
              v-for="c in categories"
              :key="c"
             @click="selectCategory(c)"
              class="px-4 py-2 rounded text-sm"
              :class="isActive(c) ? 'bg-secondary text-white' : ' bg-white/40 text'"
            >
              {{ c }} 
            </button>
          </div>
      </div> 
      

    </div>

  </section>

     <div v-if="error">
      <NetworkError
      :error="error"
      @retry="refreshData"
    />
    </div>

    <!-- SKELETON -->
<section v-if="pending" class="">
  <Container>

    <!-- TOP TEXT -->
    <div class="mb-4">
      <div class="h-6 w-72 bg-gray-200 rounded animate-pulse mb-3"></div>

      <div class="flex justify-between items-center">
        <div class="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>

        <div class="flex gap-3">
          <div class="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- PROPERTY GRID -->
    <div class="grid md:grid-cols-3 gap-6">

      <div
        v-for="i in 9"
        :key="i"
        class="border rounded-xl overflow-hidden"
      >

        <!-- IMAGE -->
        <div class="relative">
          <div class="h-44 w-full bg-gray-200 animate-pulse"></div>

          <!-- BADGES -->
          <div class="absolute top-2 left-2 h-6 w-20 bg-gray-300 rounded animate-pulse"></div>

          <div class="absolute top-2 right-2 h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <!-- CONTENT -->
        <div class="p-4">

          <!-- PROFILE -->
          <div class="flex gap-3 items-center mb-4">

            <div class="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>

            <div class="flex-1">
              <div class="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div class="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>

          </div>

          <!-- TITLE -->
          <div class="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>

          <!-- LOCATION -->
          <div class="h-4 w-full bg-gray-200 rounded animate-pulse mb-3"></div>

          <!-- PRICE -->
          <div class="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>

          <!-- DETAILS -->
          <div class="flex gap-3">

            <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>

            <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>

            <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>

          </div>

        </div>

      </div>

    </div>

  </Container>
</section>
    <div v-else class="v-else">
  <!-- FILTERS -->
      <section class="p-6 flex flex-wrap gap-3">

        <div class="flex gap-3 flex-wrap">

          <select v-model="selectedState" class="px-4 h-11 border rounded">
            <option value="">All States</option>
            <option v-for="s in stateOptions" :key="s" :value="s">
              {{ s }}
            </option>
          </select>

          <!-- CITY -->
          <select v-model="selectedCity" class="px-4 h-11 border rounded">
            <option value="">All Cities</option>
            <option v-for="c in cityOptions" :key="c" :value="c">
              {{ c }}
            </option>
          </select>

        </div>

      </section>
    <div  v-if="!filteredResults.length">
      <EmptyPropertyState @reset="handleResetFilters" />
    </div>
    
      <!-- CARDS -->
      <section  class="">
        <Container>
          <div class=" text-secondary">
            <UiTypographyH3><span class=" text-secondary  font-semibold  sm:text-lg text-sm">10,000 available properties for sale/rent worldwide</span></UiTypographyH3>
              <div  class=" flex justify-between items-center py-3">
                <p  class="  sm:text-lg text-sm "> <span class="font-semibold ">10000</span> results </p> 
                <div class=" flex ">
                  
                  <div class="flex gap-3   px-1 py-1 ">
                    <SortDropdown @update="handleSort" />


                        <button  class="md:px-4 md:py-2 text-nowrap flex gap-2 font-normal px-2 py-1 rounded text-sm" :class="  isMap ? 'bg-secondary text-white' : ' bg-white/40 text-secondary border border-secondary text'">
                        <img src="@/assets/images/icons/map.svg" class=" w-4" alt=""> Map
                      </button>
                  </div>
                </div>
              </div>
          </div>
                
          <div class="  grid md:grid-cols-3 gap-6">
          
            <NuxtLink :to="`/property/${item.slug}`"
              v-for="item in paginatedResults"
              :key="item._id"
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
          </div>
        </Container>
      </section>

  <Paginat v-model="page" :total="filteredResults.length" :perPage="perPage"/>
    
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

   <NavigationFooter />
</div>
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
