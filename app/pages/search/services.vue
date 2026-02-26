<script setup>
import { ref, computed, watch } from 'vue'

/* =================================
   STATE
================================= */
const search = ref('')
const location = ref('')
const category = ref('All')
const visibleCount = ref(6)
definePageMeta({
  layout: 'main'
}) 
/* =================================
   PROJECT DATA
================================= */

const projects = ref([
  {
    title: "Residential Land Boundary Survey",
    description: "Accurate boundary identification and beacon placement for a 600sqm residential plot including official survey plan documentation.",
    duration: "3 days",
    budget: "120,000",
    location: "Ilorin",
    date: "Feb 2025",
    rating: 4.9,
    categories: ["Survey"],
    images: ["/image/land1.jpg", "/image/land2.jpg"]
  },

  {
    title: "Topographic Survey for Road Construction",
    description: "Detailed elevation mapping for engineers.",
    duration: "1 week",
    budget: "350,000",
    location: "Abuja",
    date: "Jan 2025",
    rating: 4.8,
    categories: ["Survey"],
    images: ["/image/land1.jpg", "/image/land2.jpg"]
  },

  {
    title: "Estate Layout & Subdivision Survey",
    description: "Subdivision of 5 hectares into plots.",
    duration: "2 weeks",
    budget: "850,000",
    location: "Lagos",
    date: "Dec 2024",
    rating: 4.9,
    categories: ["Planning"],
    images: ["/image/land1.jpg", "/image/land2.jpg"]
  },

  {
    title: "Construction Site Setting-Out",
    description: "Setting-out for building construction.",
    duration: "4 days",
    budget: "200,000",
    location: "Ibadan",
    date: "Nov 2024",
    rating: 4.7,
    categories: ["Construction"],
    images: ["/image/land1.jpg", "/image/land2.jpg"]
  },

  {
    title: "Drone Aerial Mapping",
    description: "High-resolution drone mapping.",
    duration: "5 days",
    budget: "500,000",
    location: "Port Harcourt",
    rating: 4.8,
    categories: ["Mapping"],
    images: ["/image/land1.jpg", "/image/land2.jpg"]
  }
])

/* =================================
   FILTER OPTIONS
================================= */

const categories = ['All', 'Survey', 'Construction', 'Mapping', 'Planning']

const locationOptions = computed(() =>
  [...new Set(projects.value.map(p => p.location))]
)

/* =================================
   FILTER LOGIC
================================= */

const filteredResults = computed(() =>
  projects.value.filter(p => {
    const text = `${p.title} ${p.description}`.toLowerCase()

    return (
      (!search.value || text.includes(search.value.toLowerCase())) &&
      (!location.value || p.location === location.value) &&
      (category.value === 'All' || p.categories.includes(category.value))
    )
  })
)

const displayedResults = computed(() =>
  filteredResults.value.slice(0, visibleCount.value)
)

function loadMore() {
  visibleCount.value += 6
}

watch([search, location, category], () => {
  visibleCount.value = 6
})
</script>

<template>
<div>

  <!-- HERO -->
  <section class="mt-20 bg-primary py-12 text-white text-center">
    <Container>
      <h1 class="text-3xl font-bold">Find Survey & Engineering Projects</h1>
      <p class="mt-2 text-sm">Survey • Mapping • Construction • Planning</p>
    </Container>
  </section>


  <!-- FILTERS -->
  <section class="p-6 flex flex-wrap gap-3">

    <!-- Search -->
    <input
      v-model="search"
      placeholder="Search project..."
      class="px-4 h-11 border rounded"
    />

    <!-- Location -->
    <select v-model="location" class="px-4 h-11 border rounded">
      <option value="">All Locations</option>
      <option v-for="l in locationOptions" :key="l">
        {{ l }}
      </option>
    </select>

    <!-- Categories -->
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


  <!-- PROJECT CARDS -->
  <section>
    <Container class="grid md:grid-cols-2 lg:grid-cols-2 gap-6">

      <ProjectShowcase
        v-for="p in displayedResults"
        :key="p.title"
        :project="p"
      />

    </Container>
  </section>


  <!-- LOAD MORE -->
  <div
    v-if="visibleCount < filteredResults.length"
    class="flex justify-center py-10"
  >
    <button
      @click="loadMore"
      class="px-6 py-3 bg-primary text-white rounded"
    >
      Load More
    </button>
  </div>

</div>
</template>
