<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'auth'
})

/* =========================
   STATE
========================= */

const filter = ref('all')

/* =========================
   PROPERTIES DATA
========================= */

const properties = ref([
  {
    id: 1,
    title: '3 Bedroom Duplex',
    purpose: 'Sell',
    location: 'Abuja/gbajualada',
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
    location: 'Lagos/ikeja',
    price: 80000000,
    beds: 0,
    status: 'Sold',
    image: '/images/agent-land.png'
  }
])

/* =========================
   COMPUTED
========================= */

const totalItems = computed(() => properties.value.length)

const filteredList = computed(() => {
  if (filter.value === 'sell')
    return properties.value.filter(p => p.purpose === 'Sell')

  if (filter.value === 'rent')
    return properties.value.filter(p => p.purpose === 'Rent')

  return properties.value
})

/* =========================
   METHODS
========================= */

const removeItem = (id) => {
  properties.value = properties.value.filter(p => p.id !== id)
}
</script>



<template>
<div class="min-h-screen bg-gray-50 p-8">
<ContainerUser>

  <!-- ================= HEADER ================= -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-semibold">My Properties</h1>

    <button
      class="bg-green-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-green-700"
    >
      + Add Property
    </button>
  </div>



  <!-- ================= STATS ================= -->
  <div class="grid grid-cols-3 gap-5 mb-8">

    <div class="bg-white border rounded-lg p-5">
      <p class="text-gray-500 text-sm">Total Listings</p>
      <h2 class="text-xl font-bold">{{ totalItems }}</h2>
    </div>

    <div class="bg-white border rounded-lg p-5">
      <p class="text-gray-500 text-sm">For Sale</p>
      <h2 class="text-xl font-bold">
        {{ properties.filter(p => p.purpose==='Sell').length }}
      </h2>
    </div>

    <div class="bg-white border rounded-lg p-5">
      <p class="text-gray-500 text-sm">For Rent</p>
      <h2 class="text-xl font-bold">
        {{ properties.filter(p => p.purpose==='Rent').length }}
      </h2>
    </div>

  </div>



  <!-- ================= FILTER TABS ================= -->
  <div class="flex gap-6 border-b mb-4 text-sm font-medium">

    <button
      @click="filter='all'"
      :class="filter==='all'
        ? 'border-b-2 border-black pb-2'
        : 'text-gray-500 pb-2'"
    >
      All
    </button>

    <button
      @click="filter='sell'"
      :class="filter==='sell'
        ? 'border-b-2 border-black pb-2'
        : 'text-gray-500 pb-2'"
    >
      For Sale
    </button>

    <button
      @click="filter='rent'"
      :class="filter==='rent'
        ? 'border-b-2 border-black pb-2'
        : 'text-gray-500 pb-2'"
    >
      For Rent
    </button>

  </div>



  <!-- ================= TABLE ================= -->
  <div class="bg-white border rounded-xl overflow-hidden">

    <!-- header -->
    <div class="grid grid-cols-12 gap-4 bg-gray-100 text-sm font-semibold px-5 py-3">

      <div class="col-span-4">Property</div>
      <div class="col-span-1">Purpose</div>
      <div class="col-span-2">Location</div>
      <div class="col-span-2">Price</div>
      <div class="col-span-1">Status</div>
      <div class="col-span-1 text-right">Action</div>

    </div>



    <!-- rows -->
     <div  v-for="item in filteredList"
          :key="item.id">
       <div class="grid grid-cols-12 gap-4 px-5 py-4 border-t text-sm items-center hover:bg-gray-50" >

          <!-- title -->
          <div class="flex gap-3 items-center col-span-4">
            <img
              :src="item.image"
              class="w-12 h-12 rounded-lg object-cover"
            />
            <span class="font-medium">{{ item.title }}</span>
          </div>

          <!-- purpose -->
          <div class="col-span-1">
            <span
              :class="item.purpose === 'Sell'
                ? 'text-green-600 font-semibold'
                : 'text-blue-600 font-semibold'"
            >
              {{ item.purpose }}
            </span>
          </div>

          <!-- location -->
          <div class="col-span-2">
            {{ item.location }}
          </div>

          <!-- price -->
          <div class="col-span-2 font-semibold">
            ₦{{ item.price.toLocaleString() }}
          </div>

        

          <!-- status -->
          <div class="col-span-1">
            <span
              :class="[
                'px-2 py-1 rounded text-xs font-medium',
                item.status==='Available' && 'bg-green-100 text-green-700',
                item.status==='Sold' && 'bg-red-100 text-red-700',
                item.status==='Rented' && 'bg-blue-100 text-blue-700'
              ]"
            >
              {{ item.status }}
            </span>
          </div>

          <!-- action -->
          <div class="col-span-1 text-right">
            <button
              class="text-red-500 hover:underline"
              @click="removeItem(item.id)"
            >
              Delete
            </button>
          </div>

        </div>
        <div>
         more information about the property
        </div>

     </div>
    

  </div>

</ContainerUser>
</div>
</template>
