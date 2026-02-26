<script setup>
import { ref, computed, watch } from 'vue'
const route = useRoute()
definePageMeta({
  layout: 'main'
})
const keyword = ref(route.query.q || '')
const types = ref(route.query.type || 'all')
import ServiceCard from '~/components/cards/ServiceCard.vue'
import PropertyCard from '~/components/cards/PropertyCard.vue'
import ProfileCard from '~/components/cards/ProfileCard.vue'
import HistoryCard from '~/components/cards/HistoryCard.vue'



/* =============================
   STATE
============================= */
const search = ref('')
const category = ref('')
const type = ref('')
const location = ref('')

/* =============================
   SAMPLE DATA (mixed categories)
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

    /* PROPERTY */
    if (mod === 0) {
      return {
        id: i,
        category: 'property',
        name: names[i % names.length],
        role: 'Agent',
        type: i % 2 ? 'house' : 'land',
        title: 'Property for Sale',
        price: `₦${(Math.random() * 900 + 50).toFixed(0)}m`,
        images: ['/image/land1.jpg'],
        description: 'Well located property with good access road.',
        location: cities[i % cities.length]
      }
    }

    /* SERVICE */
    if (mod === 1) {
      return {
        id: i,
        category: 'service',
        name: names[i % names.length],
        type: 'survey',
        title: 'Land Survey Service',
        price: 80000,
        duration: '2 weeks',
        rating: 4.7,
        images: ['/image/land1.jpg'],
        location: cities[i % cities.length]
      }
    }

    /* PROFILE */
    if (mod === 2) {
      return {
        id: i,
        category: 'profile',
        name: names[i % names.length],
        type: 'agent',
        avatar: '/image/avatar.png',
        location: cities[i % cities.length]
      }
    }

    /* HISTORY */
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
   RESET FILTERS WHEN CATEGORY CHANGES
============================= */
watch(category, () => {
  type.value = ''
  location.value = ''
})

/* =============================
   DYNAMIC OPTIONS
============================= */
const typeOptions = computed(() => {
  switch (category.value) {
    case 'property':
      return ['land', 'house', 'rent', 'buy']

    case 'service':
      return ['survey', 'construction', 'agent', 'worker']

    case 'profile':
      return ['agent', 'worker']

    default:
      return []
  }
})

const locationOptions = computed(() => {
  return [...new Set(results.value.map(r => r.location).filter(Boolean))]
})

/* =============================
   FILTER LOGIC (FASTER)
============================= */
const filteredResults = computed(() => {
  return results.value.filter(item => {
    const text = `${item.title ?? ''} ${item.name ?? ''} ${item.description ?? ''}`
      .toLowerCase()

    return (
      (!search.value || text.includes(search.value.toLowerCase())) &&
      (!category.value || item.category === category.value) &&
      (!type.value || item.type === type.value) &&
      (!location.value || item.location === location.value)
    )
  })
})

/* =============================
   CARD MAPPER
============================= */
const componentMap = {
  service: ServiceCard,
  property: PropertyCard,
  profile: ProfileCard,
  history: HistoryCard
}
</script>

<template>
  <Container class="min-h-screen mt-16 bg-gray-50 p-6">

    <!-- ================= TOP FILTER BAR ================= -->
    <div class="max-w-6xl mx-auto space-y-4">

      <!-- Search input -->
      <input
        v-model="search"
        placeholder="Search services, property, profiles..."
        class="w-full px-5 py-3 rounded-2xl shadow bg-white outline-none"
      />

      <!-- Facebook style tabs -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="c in ['', 'service', 'property', 'profile', 'history']"
          :key="c"
          @click="category = c"
          class="px-5 py-2 rounded-xl text-sm font-medium transition"
          :class="category === c
            ? 'bg-blue-600 text-white shadow'
            : 'bg-white hover:bg-gray-100'"
        >
          {{ c || 'All' }}
        </button>
      </div>

      <!-- Filters row -->
      <div class="flex flex-wrap gap-3">

        <select
          v-if="typeOptions.length"
          v-model="type"
          class="px-4 py-2 rounded-xl bg-white shadow"
        >
          <option value="">All Types</option>
          <option v-for="t in typeOptions" :key="t" :value="t">
            {{ t }}
          </option>
        </select>

        <select
          v-if="locationOptions.length"
          v-model="location"
          class="px-4 py-2 rounded-xl bg-white shadow"
        >
          <option value="">All Locations</option>
          <option v-for="l in locationOptions" :key="l" :value="l">
            {{ l }}
          </option>
        </select>

      </div>
    </div>

    <!-- ================= RESULTS GRID ================= -->
    <div
      class="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <component
        v-for="item in filteredResults"
        :key="item.id"
        :is="componentMap[item.category]"
        :data="item"
      />

      <!-- Empty state -->
      <div
        v-if="!filteredResults.length"
        class="col-span-full text-center py-20 text-gray-400"
      >
        No results found
      </div>
    </div>

  </Container>
</template>
