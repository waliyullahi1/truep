<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'auth'
})

/* =========================
   STATE
========================= */

const filter = ref('all')
const openId = ref(null) // 👈 track opened row


/* =========================
   PROPERTIES
========================= */

const properties = ref([
  {
    id: 1,
    title: '3 Bedroom Duplex',
    purpose: 'Sell',
    location: 'Abuja/Gbajualada',
    price: 35000000,
    beds: 3,
    status: 'Available',
    description: 'Modern duplex with parking space, borehole and security.',
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
    description: 'Clean apartment close to main road.',
    image: '/images/agent-land.png'
  }
])


/* =========================
   COMPUTED
========================= */

const totalItems = computed(() => properties.value.length)

const filteredList = computed(() => {
  if (filter.value === 'Available')
    return properties.value.filter(p => p.status === 'Available')

  if (filter.value === 'Approve')
    return properties.value.filter(p => p.status === 'Approve')
  if (filter.value === 'Denied')
    return properties.value.filter(p => p.status === 'Denied')
    if (filter.value === 'Paused')
    return properties.value.filter(p => p.status === 'Approve')
    if (filter.value === 'Process for Buyer')
    return properties.value.filter(p => p.status === ' Process for Buyer')
    if (filter.value === 'sold')
    return properties.value.filter(p => p.status === 'Verify Of Property process for Buyer')

  return properties.value
})


/* =========================
   METHODS
========================= */

const removeItem = (id) => {
  properties.value = properties.value.filter(p => p.id !== id)
}

const toggle = (id) => {
  openId.value = openId.value === id ? null : id
}
</script>



<template>
<div class="min-h-screen bg-gray-50 p-8">
<ContainerUser>

  <h1 class="text-3xl font-semibold mb-6">My Properties</h1>


  <!-- TABLE -->
  <div class="bg-white border rounded-xl overflow-hidden">

    <!-- header -->
    <div class="grid grid-cols-12 gap-4 bg-gray-100 text-sm font-semibold px-5 py-3">
      <div class="col-span-4">Property</div>
      <div class="col-span-2">Purpose</div>
      <div class="col-span-2">Location</div>
      <div class="col-span-2">Price</div>
      <div class="col-span-1"></div>
    </div>


    <!-- rows -->
    <div v-for="item in filteredList" :key="item.id">

      <!-- ===== MAIN ROW ===== -->
      <div
        @click="toggle(item.id)"
        class="grid grid-cols-12 gap-4 px-5 py-4 border-t text-sm items-center cursor-pointer hover:bg-gray-50"
      >

        <div class="flex gap-3 items-center col-span-4">
          <img :src="item.image" class="w-12 h-12 rounded-lg object-cover"/>
          {{ item.title }}
        </div>

        <div class="col-span-2 font-medium">
          {{ item.purpose }}
        </div>

        <div class="col-span-2">
          {{ item.location }}
        </div>

        <div class="col-span-2 font-semibold">
          ₦{{ item.price.toLocaleString() }}
        </div>

        <div class="col-span-1">
          {{ item.status }}
        </div>

        <div class="col-span-1 text-right text-gray-400">
          {{ openId === item.id ? '▲' : '▼' }}
        </div>
      </div>



      <!-- ===== EXPAND DETAILS ===== -->
      <transition name="fade">
        <div
          v-if="openId === item.id"
          class="bg-gray-50 px-6 py-5 border-t"
        >

          <div class="grid grid-cols-3 gap-6">

            <div>
              <p class="text-xs text-gray-500">Bedrooms</p>
              <p class="font-semibold">{{ item.beds }}</p>
            </div>

            <div>
              <p class="text-xs text-gray-500">Full Address</p>
              <p class="font-semibold">{{ item.location }}</p>
            </div>

            <div>
              <p class="text-xs text-gray-500">Description</p>
              <p class="font-semibold">{{ item.description }}</p>
            </div>

          </div>

          <!-- actions -->
          <div class="mt-4 flex gap-4">
            <button class="px-4 py-2 bg-black text-white rounded">
              Edit
            </button>

            <button
              class="px-4 py-2 bg-red-500 text-white rounded"
              @click.stop="removeItem(item.id)"
            >
              Delete
            </button>
          </div>

        </div>
      </transition>

    </div>

  </div>

</ContainerUser>
</div>
</template>



<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
