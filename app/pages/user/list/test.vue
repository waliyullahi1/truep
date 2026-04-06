<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { $toast } = useNuxtApp()

definePageMeta({
  layout: 'auth'
})

/* ================= STATE ================= */
const filter = ref('all')
const openMenuId = ref(null)

/* ================= DATA ================= */
const properties = ref([])

/* ================= COMPUTED ================= */

const totalItems = computed(() => properties.value.length)

const filteredList = computed(() =>
  filter.value === 'all'
    ? properties.value
    : properties.value.filter(p => p.status === filter.value)
)

const statuses = computed(() => [
  'all',
  ...new Set(properties.value.map(p => p.status))
])

/* ================= HELPERS ================= */

const getPrice = (item) => {
  if (!item.pricing) return 0

  if (item.pricing.paymentType === 'outright') {
    return item.pricing.price || 0
  }

  if (item.pricing.paymentType === 'installment') {
    return item.pricing.installment?.monthlyAmount || 0
  }

  if (item.pricing.paymentType === 'rent') {
    return item.pricing.rent?.duration || 0
  }

  if (item.landDetails?.pricePerUnit) {
    return item.landDetails.pricePerUnit
  }

  return 0
}

const getPriceLabel = (item) => {
  if (item.pricing?.paymentType === 'rent') {
    return item.pricing?.rent?.period === 'yearly' ? '/year' : '/month'
  }

  if (item.landDetails?.unit) {
    return `/per ${item.landDetails.unit}`
  }

  return ''
}

const getLocation = (item) => {
  return `${item.location?.state || ''}/${item.location?.area || ''}`
}

const getImage = (item) => {
  return item.media?.files?.[0]?.url || '/images/agent-land.png'
}

/* ================= METHODS ================= */

const removeItem = (id) => {
  properties.value = properties.value.filter(p => p._id !== id)
  openMenuId.value = null
}

const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id
}

const handleClickOutside = () => {
  openMenuId.value = null
}

/* ================= FETCH ================= */

onMounted(async () => {
  window.addEventListener('click', handleClickOutside)

  try {
    const response = await useApiFetch(`/property`, { method: 'GET' })
    properties.value = response.data?.data || response.data
    console.log(properties.value)
  } catch (err) {
    console.error(err)
    $toast.error(err?.message || "Failed to load property")
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
<div class="min-h-screen bg-gray-50 p-6">
<ContainerUser>

  <!-- HEADER -->
  <div class="flex justify-between items-center mb-8">
    <div>
      <h1 class="text-2xl font-bold">My Properties</h1>
      <p class="text-sm text-gray-500">Manage your listings</p>
    </div>

    <button class="bg-black text-white px-5 py-2.5 rounded-xl text-sm shadow hover:scale-105 transition">
      + Add Property
    </button>
  </div>

  <!-- FILTER -->
  <div class="flex gap-3 mb-6 flex-wrap">
    <button
      v-for="s in statuses"
      :key="s"
      @click="filter=s"
      class="px-4 py-2 rounded-full text-sm capitalize transition"
      :class="filter===s
        ? 'bg-black text-white shadow'
        : 'bg-white border text-gray-600 hover:bg-gray-100'"
    >
      {{ s }}
    </button>
  </div>

  <!-- EMPTY -->
  <div v-if="!filteredList.length" class="text-center py-20 text-gray-400">
    No properties found
  </div>

  <!-- GRID -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

    <div
      v-for="item in filteredList"
      :key="item._id"
      class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group"
    >

      <!-- IMAGE -->
      <div class="relative">
        <img
          :src="getImage(item)"
          class="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
        />

        <!-- STATUS BADGE -->
        <span
          class="absolute top-3 left-3 px-2 py-1 text-xs rounded-full font-medium"
          :class="{
            'bg-green-100 text-green-700': item.status==='Available',
            'bg-blue-100 text-blue-700': item.status==='Rented',
            'bg-red-100 text-red-700': item.status==='Sold'
          }"
        >
          {{ item.status }}
        </span>

        <!-- ACTION BUTTON -->
        <button
          @click.stop="toggleMenu(item._id)"
          class="absolute top-3 right-3 bg-white/90 backdrop-blur w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-white"
        >
          ⋮
        </button>

        <!-- DROPDOWN -->
        <div
          v-if="openMenuId === item._id"
          class="absolute right-3 top-12 w-32 bg-white border rounded-xl shadow-lg text-sm z-50"
        >
          <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">
            View
          </button>
          <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Edit
          </button>
          <button
            class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            @click.stop="removeItem(item._id)"
          >
            Delete
          </button>
        </div>

      </div>

      <!-- CONTENT -->
      <div class="p-4 space-y-2">

        <!-- TITLE -->
        <h2 class="font-semibold text-sm line-clamp-2">
          {{ item.title }}
        </h2>

        <!-- LOCATION -->
        <p class="text-xs text-gray-500">
          📍 {{ getLocation(item) }}
        </p>

        <!-- TAGS -->
        <div class="flex gap-2 flex-wrap">
          <span class="text-xs px-2 py-1 bg-gray-100 rounded">
            {{ item.type === 'house' ? 'House' : 'Land' }}
          </span>

          <span class="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
            {{ item.purpose === 'sale' ? 'For Sale' : 'For Rent' }}
          </span>
        </div>

        <!-- PRICE -->
        <div class="pt-2 border-t mt-2 flex justify-between items-center">
          <span class="text-lg font-bold">
            ₦{{ getPrice(item).toLocaleString() }}
          </span>

          <span class="text-xs text-gray-400">
            {{ getPriceLabel(item) }}
          </span>
        </div>

      </div>

    </div>

  </div>

</ContainerUser>
</div>
</template>

<style scoped>
.badge {
  @apply px-2 py-1 rounded text-xs font-medium;
}
</style>