<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'main'
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
</template>