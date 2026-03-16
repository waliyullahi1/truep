<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'auth'
})

/* =============================
   STATE
============================= */

const search = ref('')
const category = ref('')
const type = ref('')
const location = ref('')

/* =============================
   SAMPLE DATA
============================= */

const names = [
  'Mr. Adewale','Mrs. Adebayo','Mr. Bello','Mrs. Kemi','Mr. Hassan',
  'Miss Fatima','Mr. Tunde','Mrs. Funke','Mr. Chinedu','Mrs. Grace'
]

const cities = [
  'Ilorin','Lekki','Abuja','Ibadan','Port Harcourt',
  'Kano','Enugu','Abeokuta','Osogbo','Akure'
]

const results = ref(
  Array.from({ length: 60 }, (_, i) => {
    const mod = i % 4

    if (mod === 0) {
      return {
        id: i,
        category: 'property',
        name: names[i % names.length],
        type: i % 2 ? 'house' : 'land',
        title: 'Property for Sale',
        price: `₦${(Math.random() * 900 + 50).toFixed(0)}m`,
        images: ['/images/land1.jpg'], // ✅ fixed path
        description: 'Well located property with good access road.',
        location: cities[i % cities.length]
      }
    }

    if (mod === 1) {
      return {
        id: i,
        category: 'service',
        name: names[i % names.length],
        type: 'survey',
        title: 'Land Survey Service',
        price: 80000,
        rating: 4.7,
        images: ['/images/land1.jpg'], // ✅ fixed
        location: cities[i % cities.length]
      }
    }

    if (mod === 2) {
      return {
        id: i,
        category: 'profile',
        name: names[i % names.length],
        type: 'agent',
        avatar: '/images/avatar.png', // ✅ fixed
        location: cities[i % cities.length]
      }
    }

    return {
      id: i,
      category: 'history',
      title: 'Previous transaction',
      date: '2 days ago',
      location: cities[i % cities.length]
    }
  })
)

/* =============================
   OPTIONS
============================= */

const typeOptions = computed(() => {
  const map = {
    property: ['land', 'house', 'rent', 'buy'],
    service: ['survey', 'construction', 'agent', 'worker'],
    profile: ['agent', 'worker']
  }
  return map[category.value] || []
})

const locationOptions = computed(() =>
  [...new Set(results.value.map(r => r.location).filter(Boolean))]
)

/* =============================
   FILTER LOGIC
============================= */

const filteredResults = computed(() => {
  const q = search.value.toLowerCase()

  return results.value.filter(item => {
    const text = `${item.title ?? ''} ${item.name ?? ''} ${item.description ?? ''}`.toLowerCase()

    return (
      (!q || text.includes(q)) &&
      (!category.value || item.category === category.value) &&
      (!type.value || item.type === type.value) &&
      (!location.value || item.location === location.value)
    )
  })
})

/* =============================
   AUTO COMPONENT MAP
   (Nuxt auto-imports components)
============================= */

const componentMap = {
  service: 'ServiceCard',
  property: 'PropertyCard',
  profile: 'ProfileCard',
  history: 'HistoryCard'
}
</script>


<template>
  <div>
    <div class="  bg-[url('/images/hero.jpg')]  bg-cover bg-no-repeat  h-screen-60  bg-center header ">

      <div class="  w-full h-full bg-black/50 flex items-center justify-center">
        <div>
          <h1 class="text-2xl font-normal md:text-3xl text-white ">Discover Your Perfect Property in Nigeria</h1>
          <p class=" text-white">Buy land • Sell property • Rent homes • List your property today.</p>
        </div>
      </div>
    </div>
    <div class=" relative bottom-16">
      <Container>
        <div class="  flex gap-5 shadow-xl  rounded-md  h-20 w-full  px-4 py-4 bg-white">
          <input type="text" placeholder="Search services, property, profiles..." class=" border outline-none border-gray-700 bg-white rounded-md  h-full  px-4    w-full ">
          <div class=" flex justify-center items-center gap-3" >
            <button class="bg-slate-200 rounded-md font-medium py-3 px-4 h-fit" type="button">Filter</button>
            <button class="bg-green-700 text-white rounded-md font-medium py-3 h-fit px-4" type="button">Search</button>
          </div>
        </div>
      </Container>
    </div>
     <Container class="min-h-screen mt-16 bg-gray-50 p-6">

    <!-- TOP BAR -->
    <div class="max-w-6xl mx-auto space-y-4">

      <input
        v-model="search"
        placeholder="Search services, property, profiles..."
        class="w-full px-5 py-3 rounded-2xl shadow bg-white outline-none"
      />

      <!-- Tabs -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="c in ['', 'service', 'property', 'profile', 'history']"
          :key="c"
          @click="category = c; type=''; location=''"
          class="px-5 py-2 rounded-xl text-sm font-medium transition"
          :class="category === c
            ? 'bg-blue-600 text-white shadow'
            : 'bg-white hover:bg-gray-100'"
        >
          {{ c || 'All' }}
        </button>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3">

        <select
          v-if="typeOptions.length"
          v-model="type"
          class="px-4 py-2 rounded-xl bg-white shadow"
        >
          <option value="">All Types</option>
          <option v-for="t in typeOptions" :key="t">{{ t }}</option>
        </select>

        <select
          v-if="locationOptions.length"
          v-model="location"
          class="px-4 py-2 rounded-xl bg-white shadow"
        >
          <option value="">All Locations</option>
          <option v-for="l in locationOptions" :key="l">{{ l }}</option>
        </select>

      </div>
    </div>

    <!-- GRID -->
    <div class="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      <component
        v-for="item in filteredResults"
        :key="item.id"
        :is="componentMap[item.category]"
        :data="item"
      />

      <div
        v-if="!filteredResults.length"
        class="col-span-full text-center py-20 text-gray-400"
      >
        No results found
      </div>

    </div>
  </Container>

  </div>
 
</template>

<style>
header {
  background: linear-gradient(rgba(31, 31, 31, 0.838), rgba(41, 41, 41, 0.7)), url('/images/hero.jpg');
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}



.cta {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/unilorin_gate.jpg');
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-size: cover;
 
  background-position: top;
}

.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #b78d46;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #9e7636;
}
</style>