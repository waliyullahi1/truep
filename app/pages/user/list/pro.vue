<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

definePageMeta({
  layout: 'auth'
})

/* ================= STATE ================= */
const filter = ref('all')
const openMenuId = ref(null) // 👈 track opened dropdown

/* ================= DATA ================= */
const properties = ref([
  {
    id: 1,
    title: '3 Bedroom Duplex',
    purpose: 'Sell',
    location: 'Abuja/Gbajualada',
    price: 35000000,
    beds: 3,
    status: 'Available',
    image: '/images/agent-land.png'
  },
  {
    id: 2,
    title: '2 Bedroom Flat',
    purpose: 'Rent',
    location: 'Ilorin/Tippa road',
    price: 12000000,
    beds: 2,
    status: 'Rented',
    image: '/images/agent-land.png'
  },
  {
    id: 3,
    title: 'Commercial Land',
    purpose: 'Sell',
    location: 'Lagos/Ikeja',
    price: 80000000,
    beds: 0,
    status: 'Sold',
    image: '/images/agent-land.png'
  }
])

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

/* ================= METHODS ================= */

const removeItem = (id) => {
  properties.value = properties.value.filter(p => p.id !== id)
  openMenuId.value = null
}

/* ✅ toggle dropdown */
const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id
}

/* ✅ close when clicking outside */
const handleClickOutside = () => {
  openMenuId.value = null
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>



<template>
<div class="min-h-screen bg-gray-50 p-8">
<ContainerUser>

  <!-- HEADER -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-semibold">My Properties</h1>

    <button class="bg-green-600 text-white px-5 py-2 rounded-lg text-sm">
      + Add Property
    </button>
  </div>



  <!-- FILTER TABS -->
  <div class="flex gap-6 border-b mb-4 text-sm font-medium">
    <button
      v-for="s in statuses"
      :key="s"
      @click="filter=s"
      :class="filter===s
        ? 'border-b-2 border-black pb-2 capitalize'
        : 'text-gray-500 pb-2 capitalize'"
    >
      {{ s }}
    </button>
  </div>



  <!-- TABLE -->
  <div class="bg-white pb-24 border rounded-xl overflow-hidden">

    <!-- header -->
    <div class="grid grid-cols-12 gap-4 bg-gray-100 text-sm font-semibold px-5 py-3">
      <div class="col-span-4">Property</div>
      <div class="col-span-1">Purpose</div>
      <div class="col-span-2">Location</div>
      <div class="col-span-2">Price</div>
      <div class="col-span-2">Status</div>
      <div class="col-span-1 text-right">Action</div>
    </div>


    <!-- rows -->
    <div
      v-for="item in filteredList"
      :key="item.id"
      class="grid grid-cols-12 gap-4 px-5 py-4 border-t text-sm items-center hover:bg-gray-50"
    >

      <div class="flex gap-3 items-center col-span-4">
        <img :src="item.image" class="w-12 h-12 rounded-lg object-cover"/>
        {{ item.title }}
      </div>

      <div class="col-span-1 font-semibold">
        {{ item.purpose }}
      </div>

      <div class="col-span-2">
        {{ item.location }}
      </div>

      <div class="col-span-2 font-semibold">
        ₦{{ item.price.toLocaleString() }}
      </div>

      <!-- STATUS -->
      <div class="col-span-2">
        <span
          class="badge"
          :class="{
            'bg-green-100 text-green-700': item.status==='Available',
            'bg-blue-100 text-blue-700': item.status==='Rented',
            'bg-red-100 text-red-700': item.status==='Sold'
          }"
        >
          {{ item.status }}
        </span>
      </div>


      <!-- ACTION DROPDOWN -->
      <div class="col-span-1 text-right relative">

        <!-- More button -->
        <button
          class="border px-3 py-1 rounded"
          @click.stop="toggleMenu(item.id)"
        >
          ⋮
        </button>

        <!-- Dropdown -->
        <div
          v-if="openMenuId === item.id"
          class="absolute z-30 right-0 mt-2 w-24 bg-white border rounded shadow text-xs"
        >
          <button class="block w-full text-left px-3 py-2 hover:bg-gray-100">View</button>
          <button class="block w-full text-left px-3 py-2 hover:bg-gray-100">Edit</button>
          <button
            class="block w-full text-left px-3 py-2 hover:bg-red-50 text-red-600"
            @click.stop="removeItem(item.id)"
          >
            Delete
          </button>
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
