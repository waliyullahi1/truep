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
const deleteId = ref(null)
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

const formatDate = (date) => {
  if (!date) return ''

  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}
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
  const pricing = item.pricing || {}

  // ================= HOUSE =================
  if (item.type === 'house') {

    // 🏠 SALE
    if (item.purpose === 'sale') {
      if (pricing.paymentType === 'installment') {
        return '/month'
      }
      return '/outright' // outright sale → no label
    }

    // 🏠 RENT
    if (item.purpose === 'rent') {
      const unit = pricing.rent?.duration

      if (!unit) return ''

      return `/ ${unit}` // e.g /month, /year, /week
    }
  }

  // ================= LAND =================
  if (item.type === 'land') {
    if (pricing.paymentType === 'outright') {
      return item.landDetails?.unit ? `/per ${item.landDetails.unit}` : ''
    }

    if (pricing.paymentType === 'installment') {
      return '/month'
    }
  }

  return ''
}

const getLocation = (item) => {
  return `${item.location?.state || ''}/${item.location?.city || ''}`
}

const getImage = (item) => {
  return item.media?.files?.[0]?.url || '/image/no-image.png'
}

/* ================= METHODS ================= */

const removeItem = async (id) => {
  console.log(id);
  
   try {
    const res = await useApiFetch(`/property/${id}`, {
      method: "DELETE",
    })

    const data = res.message?.value || res.message
       properties.value = properties.value.filter(p => p._id !== id)
   
    $toast.success(data || "Property removed")

  } catch (err) {
    console.error(err)
    $toast.error("Remove failed")
  }
  openMenuId.value = null
}

const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id
}

const editproper = (id) => {
  router.push({
       path: '/user/list/new',
        query: {
         id: id,
         },
       })

}
const viewProperty = (id) => {
  router.push({
       path: '/property',
        query: {
         id: property.value,
         preview: true,
         },
       })
  
}
const handleClickOutside = () => {
  openMenuId.value = null
}

const formatStatus = (s = '') =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

const statusClass = (s = '') => {
  const key = s.toLowerCase()

  return {
    'available': 'bg-green-100 text-green-700',
    'rented': 'bg-blue-100 text-blue-700',
    'sold': 'bg-red-100 text-red-700',
    'draft': 'bg-yellow-100 text-yellow-700',
    'pending': 'bg-purple-100 text-purple-700',
    'denied': 'bg-gray-200 text-gray-700',
    'paused': 'bg-orange-100 text-orange-700'
  }[key] || 'bg-gray-100 text-gray-600'
}

const smartMoney = (value) => {
  const num = Number(value || 0)

  if (num >= 1_000_000_000) {
    return "₦" + (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + "B"
  }

  if (num >= 1_000_000) {
    return "₦" + (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "M"
  }

  if (num >= 1_000) {
    return "₦" + (num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1) + "K"
  }

  return "₦" + num.toLocaleString()
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
<div class="min-h-screen bg-gray-50 py-8">
<ContainerUser>

  <!-- ================= HEADER ================= -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-light text-gray-800">Properties</h1>

    <button @click="router.push('/user/list/new')"
      class="bg-green-600 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition"
    >
      CREATE A NEW PROPERTY
    </button>
  </div>

  <!-- ================= STATUS TABS ================= -->
  <div class="flex gap-8 border-b text-sm mb-6 text-gray-500 font-medium">
    <button
      v-for="s in statuses"
      :key="s"
      @click="filter=s"
      class="pb-3 relative uppercase tracking-wide"
      :class="filter===s ? 'text-black border-b-2 border-black' : ''"
    >
      {{ s }}
      <span
        v-if="filter===s"
        class="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"
      ></span>
    </button>
  </div>

  <!-- ================= TABLE ================= -->
  <div class="bg-white border rounded-md ">

    <!-- HEADER -->
    <div class="grid grid-cols-12 gap-4 px-6 py-4 text-xs font-semibold text-gray-500 border-b uppercase">
      <div class="col-span-1"></div>
      <div class="col-span-5">Property</div>
      <div class="col-span-1 text-center">Views</div>
      <div class="col-span-1 text-center">Clicks</div>
      <div class="col-span-1 text-center">Amount</div>
      <div class="col-span-2 text-center">Status</div>
      <div class="col-span-1"></div>
    </div>

    <!-- EMPTY STATE -->
    <div v-if="!filteredList.length" class="py-20 text-center text-gray-400">
      No properties found
    </div>

    <!-- ROWS -->
    <div
      v-for="item in filteredList"
      :key="item._id"
      class="grid grid-cols-12 gap-4 px-6 py-5 items-center border-b hover:bg-gray-50 transition relative"
    >
      <!-- IMAGE -->
      <div class="col-span-1">
        <img
          :src="getImage(item)"
          class="w-14 h-14 object-cover rounded"
        />
      </div>

      <!-- TITLE -->
      <div class="col-span-5">
        <p class="font-medium text-gray-800 line-clamp-1">
          {{ item.title }}
        </p>
        <p class="text-xs text-gray-400 mt-1">
          {{ formatStatus(item.type) }}  for {{ formatStatus(item.purpose)  }}  at  📍 {{ getLocation(item) }} <br>
           {{ smartMoney(item.pricing.price || 0) }}{{ getPriceLabel(item) }} <br>
          createAt: {{ formatDate(item.createdAt) }}


        </p>
      </div>

      <!-- VIEWS -->
      <div class="col-span-1 text-center text-sm text-gray-600">
        {{ item.views || 0 }}
      </div>

      <!-- CLICKS -->
      <div class="col-span-1 text-center text-sm text-gray-600">
        {{ item.clicks || 0 }}
      </div>

      <!-- LEADS -->
      <div class="col-span-1 text-center text-sm text-gray-600">
        {{  smartMoney(item.pricing.price || 0 ) }}{{ getPriceLabel(item) }}
      </div>

      <!-- STATUS -->
      <div class="col-span-2 text-center">
       <span
          class="px-3 py-1 rounded-full text-xs font-medium"
          :class="statusClass(item.status)"
        >
          {{ formatStatus(item.status) }}
        </span>
      </div>

      <!-- ACTION -->
      <div class="col-span-1 flex justify-end relative">
        <button
          @click.stop="toggleMenu(item._id)"
          class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center"
        >
          ⋮
        </button>

        <!-- DROPDOWN -->
        <div
          v-if="openMenuId === item._id"
          class="absolute right-0 top-10 w-36 bg-white border rounded-md shadow-lg text-sm z-50"
        >
          <button v-if="item.status !== 'draft'" @click.stop="viewProperty(item._id)" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
            View
          </button>
          <button   @click.stop="editproper(item._id)" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Edit
          </button>
          <button
            @click.stop="removeItem(item._id)"
            class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
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