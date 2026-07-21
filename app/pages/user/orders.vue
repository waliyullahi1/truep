<script setup>
import { ref, computed, onMounted,  onBeforeUnmount } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const type = ref("in")
const router = useRouter()
const route = useRoute()
const { $toast } = useNuxtApp()

definePageMeta({
  layout: 'auth',
  access: 'seller',
   sellerOnly: true
})


// const smartMoney = (value) => {

//   const num = Number(value || 0)

//   if (num >= 1_000_000_000) {
//     return "₦" +
//       (
//         num / 1_000_000_000
//       ).toFixed(1) +
//       "B"
//   }

//   if (num >= 1_000_000) {
//     return "₦" +
//       (
//         num / 1_000_000
//       ).toFixed(1) +
//       "M"
//   }

//   if (num >= 1_000) {
//     return "₦" +
//       (
//         num / 1_000
//       ).toFixed(1) +
//       "K"
//   }

//   return "₦" +
//     num.toLocaleString()
// }
/* ================= STATE ================= */
const filter = ref('all')
const search = ref('')
const statusFilter = ref('')
const sortBy = ref('-createdAt')
const openMenuId = ref(null)
const deleteId = ref(null)
const changingStatus = ref(null)


/* ================= DATA ================= */
// const properties = ref([])

/* ================= COMPUTED ================= */
const totalItems = computed(() => orders.value.length)

const filteredList = computed(() => {
  let list = [...orders.value]

  if (filter.value !== 'all') {
    list = list.filter(
      item =>
        item.escrowStatus?.toLowerCase() ===
        filter.value.toLowerCase()
    )
  }

  if (statusFilter.value) {
    list = list.filter(
      item =>
        item.paymentStatus === statusFilter.value
    )
  }

  if (search.value.trim()) {
    const keyword = search.value.toLowerCase()

    list = list.filter(item =>
      item.orderNumber?.toLowerCase().includes(keyword) ||
      item.property?.title?.toLowerCase().includes(keyword) ||
      `${item.buyer?.firstName} ${item.buyer?.lastName}`
        .toLowerCase()
        .includes(keyword)
    )
  }

  return list
})

const statuses = [
  'all',
  'NOT_FUNDED',
  'PARTIALLY_FUNDED',
  'FUNDED',
  'RELEASED',
  'REFUNDED'
]

/* ================= HELPERS ================= */
const formatDate = (date) => {

  if (!date) return ''

  return new Date(date)
    .toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    )
}

const getPrice = (item) => {

  if (!item?.pricing) return 0

  if (
    item.pricing.paymentType ===
    'outright'
  ) {
    return item.pricing.price || 0
  }

  if (
    item.pricing.paymentType ===
    'installment'
  ) {
    return item.pricing.installment
      ?.monthlyAmount || 0
  }

  if (
    item.pricing.paymentType ===
    'rent'
  ) {
    return item.pricing.price || 0
  }

  return 0
}

const getImage = (item) => {

  return (
    item?.media?.files?.[0]?.url ||
    '/image/no-image.png'
  )
}
const smartMoney = (value) => {

  const num = Number(value || 0)

  if (num >= 1_000_000_000) {
    return "₦" +
      (
        num / 1_000_000_000
      ).toFixed(1) +
      "B"
  }

  if (num >= 1_000_000) {
    return "₦" +
      (
        num / 1_000_000
      ).toFixed(1) +
      "M"
  }

  if (num >= 1_000) {
    return "₦" +
      (
        num / 1_000
      ).toFixed(1) +
      "K"
  }

  return "₦" +
    num.toLocaleString()
}

const progress = item => {
  if (!item.totalAmount) return 0

  return Math.round(
    ((item.amountPaid ||  item.escrowAmount ) / item.totalAmount) * 100
  )
}
const getLocation = (item) => {

  return `${
    item?.location?.state || ''
  }/${
    item?.location?.city || ''
  }`
}



const formatStatus = (s = '') =>
  s.charAt(0).toUpperCase() +
  s.slice(1).toLowerCase()

/* ================= METHODS ================= */

const getPriceLabel = (item) => {

  const pricing = item?.pricing || {}

  if (item?.type === 'house'   || item?.type === 'hostel' ) {

    if (item?.purpose === 'sale') {

      if (
        pricing.paymentType ===
        'installment'
      ) {
        return '/monthly payment'
      }

      return '/outright'
    }

    if (item?.purpose === 'rent') {

      const unit =
        pricing.rent?.duration?.unit

      return unit
        ? `/${unit}`
        : ''
    }
  }

  if (item?.type === 'land') {

    if (
      pricing.paymentType ===
      'outright'
    ) {

      return item.landDetails?.unit
        ? `/per ${item.landDetails.unit}`
        : ''
    }

    if (
      pricing.paymentType ===
      'installment'
    ) {

      return `/per ${
        item.landDetails?.unit ||
        'plot'
      } /monthly`
    }
  }

  return ''
}

const toggleMenu = (id) => {

  openMenuId.value =
    openMenuId.value === id
      ? null
      : id
}

const viewOrder = (id) =>{
 router.push(`/property/payment/${id}`)
}


const handleClickOutside = () => {

  openMenuId.value = null
}

/* ================= FETCH ================= */

const { data, pending, error, refresh } = await useAsyncData(
  'orders',
  async () => {
    const res = await useApiFetch("/order",{
    query:{
        type:type.value
    }
    })
  console.log(res);
  
    if (!res.success) {
      throw createError({
        statusCode: res.status || 500,
        statusMessage: res.message
      })
    }

    return res.data.orders || []
  },
  {
    lazy: true,
    server: true
  }
)
const getStatusCount = status => {
  if (status === 'all')
    return orders.value.length

  return orders.value.filter(
    o => o.escrowStatus === status
  ).length
}
const orders = computed(() => data.value || [])
watch(type, () => {
    refresh()
})

onMounted(() => {

  window.addEventListener(
    'click',
    handleClickOutside
  )

  
})

onBeforeUnmount(() => {

  window.removeEventListener(
    'click',
    handleClickOutside
  )
})
</script>
<template>
<div class="min-h-screen bg-gray-50 py-8">

  <ContainerUser>

    <!-- HEADER -->
    <div class="flex  justify-between flex-col sm:flex-row gap-3">
            <h1 class="text-2xl sm:text-3xl font-light text-gray-800">
        Orders
      </h1>
     

      <button
        @click="refresh()"
        class="px-5 py-2 rounded-md bg-primary text-white hover:primarytransition"
      >
        Refresh
      </button>

    </div>

    <div class="flex items-center gap-8 border-b mb-6">

  <button
    @click="type='in'"
    class="pb-3 font-medium relative"
    :class="type==='in'
      ? 'text-primary border-b-2 border-primary'
      : 'text-gray-500'"
  >
    Incoming Orders

    <span
      v-if="type==='in'"
      class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45"
    />
  </button>

  <button
    @click="type='out'"
    class="pb-3 font-medium relative"
    :class="type==='out'
      ? 'text-primary border-b-2 border-primary'
      : 'text-gray-500'"
  >
    Outgoing Orders

    <span
      v-if="type==='out'"
      class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45"
    />
  </button>

</div>

    <!-- STATUS TABS -->
    <div
      class="flex gap-8 border-b text-sm mb-6 text-gray-500 font-medium overflow-x-auto whitespace-nowrap scrollbar-hide"
    >
      <button
        v-for="s in statuses"
        :key="s"
        @click="filter=s"
        class="pb-3 relative uppercase tracking-wide shrink-0"
        :class="filter===s ? 'text-black border-b-2 border-black' : ''"
      >
        {{ s }} {{ getStatusCount(s) }}

        <span
          v-if="filter===s"
          class="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"
        ></span>
      </button>
    </div>

    <!-- TABLE WRAPPER -->
    <div class="bg-white border rounded-md overflow-x-auto">

      <!-- MIN WIDTH FOR MOBILE -->
      <div class="min-w-[950px]">

        <!-- TABLE HEADER -->
<!-- TABLE HEADER -->
<div
  class="grid grid-cols-12 gap-4 px-4 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b bg-gray-50"
>

  <!-- Order
  <div class="col-span-2">
    Order
  </div> -->

    <!-- Property -->
  <div class="col-span-4">
    Property
  </div>

  <!-- Buyer -->
<div class="col-span-2">
    {{ type === "in" ? "Buyer" : "Seller" }}
</div>



  

  <!-- Paid -->
  <div class="col-span-1 text-center">
    Paid
  </div>

  <!-- Remaining -->
  <div class="col-span-1 text-center">
    Remaining
  </div>

 
<div class="col-span-1 text-center">
    Progress
  </div>
  <!-- Escrow -->
  <div class="col-span-2 text-center">
    Escrow
  </div>

  <!-- Actions -->
  <div class="col-span-1 text-right">
    Actions
  </div>

</div>

        <!-- ERROR -->
        <div v-if="error">
          <NetworkError
            :error="error"
            @retry="refreshData"
          />
        </div>

        <!-- LOADING -->
        <div
          v-else-if="pending"
          class="animate-pulse"
        >

          <div
            v-for="i in 6"
            :key="i"
            class="grid grid-cols-12 gap-4 px-4 sm:px-6 py-5 items-center border-b"
          >
            <div class="col-span-1">
              <div class="w-14 h-14 bg-gray-300 rounded"></div>
            </div>

            <div class="col-span-5 space-y-2">
              <div class="h-4 bg-gray-300 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>

            <div class="col-span-1 flex justify-center">
              <div class="h-4 w-10 bg-gray-200 rounded"></div>
            </div>

            <div class="col-span-1 flex justify-center">
              <div class="h-4 w-10 bg-gray-200 rounded"></div>
            </div>

            <div class="col-span-1 flex justify-center">
              <div class="h-4 w-16 bg-gray-300 rounded"></div>
            </div>

            <div class="col-span-2 flex justify-center">
              <div class="h-6 w-20 bg-gray-300 rounded-full"></div>
            </div>

            <div class="col-span-1 flex justify-end">
              <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>

        </div>

        <!-- DATA -->
       <div v-else>

            <div
              v-if="!filteredList.length"
              class="py-20 text-center text-gray-400"
            >
              No orders found
            </div>

            <div
              v-for="item in filteredList"
              :key="item._id"
              class="grid grid-cols-12 gap-4 px-4 sm:px-6 py-5 items-center border-b hover:bg-gray-50 transition relative"
            >
             
              <div class="col-span-1">
                <img
                  :src="getImage(item)"
                  class="w-14 h-14 object-cover rounded"
                />
              </div>
              <!-- PROPERTY -->
              <div class="col-span-3">
                <p class="font-medium text-gray-800 line-clamp-1">
                  <!-- {{ item?.property?.title }} -->
                </p>

                <p class="text-xs text-gray-400 mt-1">
                  {{ formatStatus(item?.property?.type) }}
                  for
                  {{ formatStatus(item?.property?.purpose) }}

                  at 📍 {{ getLocation(item?.property) }}

                  <br>

                  {{ smartMoney(item.totalAmount/100|| 0) }}
                  {{ getPriceLabel(item?.property) }}

                  <br>

                  Created:
                  {{ formatDate(item.createdAt) }}
                </p>
              </div>
              <!-- ORDER ID -->
              <!-- <div class="col-span-2">

                <p class="font-semibold text-gray-900">
                  #{{ item.orderNumber }}
                </p>

                <p class="text-xs text-gray-400 mt-1">
                  {{ formatDate(item.createdAt) }}
                </p>

              </div> -->

              <!-- BUYER -->
              <div class="col-span-2">

                  <template v-if="type==='in'">

                      {{ item.buyer.firstName }}
                      {{ item.buyer.lastName }}

                  </template>

                  <template v-else>

                      {{ item.seller.firstName }}
                      {{ item.seller.lastName }}

                  </template>

              </div>

              <!-- PROPERTY -->
             

              
              <!-- PAID -->
              <div class="col-span-1 text-center">
                 
                <p class="font-semibold text-green-600">
                  {{ smartMoney(item.escrowAmount/100 || item.amountPaid || 0) }}
                </p>

              </div>

              <!-- REMAINING -->
              <div class="col-span-1 text-center">

                <p class="font-semibold text-red-500">
                  {{ smartMoney(item.remainingAmount/100 || 0) }}
                </p>

              </div>

              <!-- PROGRESS -->
              <div class="col-span-1">

                <div class="w-full">

                  <div class="flex justify-between text-[11px] mb-1">

                    <span class="text-gray-500">
                      Progress
                    </span>

                    <span class="font-medium">
                      {{ progress(item)  || 0 }}%
                    </span>

                  </div>

                  <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      class="h-full bg-green-500 rounded-full"
                      :style="{ width: `${progress(item)  || 0}%` }"
                    />

                  </div>

                </div>

              </div> 

              <!-- ESCROW STATUS -->
              <div class="col-span-2 text-center">

                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-yellow-100 text-yellow-700': item.escrowStatus === 'NOT_FUNDED',
                    'bg-blue-100 text-blue-700': item.escrowStatus === 'PARTIALLY_FUNDED',
                    'bg-green-100 text-green-700': item.escrowStatus === 'FUNDED',
                    'bg-purple-100 text-purple-700': item.escrowStatus === 'RELEASED',
                    'bg-red-100 text-red-700': item.escrowStatus === 'REFUNDED'
                  }"
                >
                  {{ item.escrowStatus }}
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

                <div
                  v-if="openMenuId === item._id"
                  class="absolute right-0 top-10 w-56 bg-white border rounded-xl shadow-lg text-sm z-50 overflow-hidden"
                >

                  <button
                    @click.stop="viewOrder(item.property.slug)"
                    class="block w-full text-left px-4 py-3 hover:bg-gray-50"
                  >
                    View Order
                  </button>
            
                  <button
                    v-if="item.escrowStatus === 'FUNDED'"
                    @click.stop="viewOrder(item.slug)"
                    class="block w-full text-left px-4 py-3 hover:bg-gray-50"
                  >
                    Release Funds
                  </button>

                  <button
                    @click.stop="viewOrder(item.slug)"
                    class="block w-full text-left px-4 py-3 hover:bg-gray-50"
                  >
                    Payment History
                  </button>

                  <button
                    v-if="item.paymentStatus !== 'PAID'"
                    @click.stop="viewOrder(item.slug)"
                    class="block w-full text-left px-4 py-3 hover:bg-gray-50"
                  >
                    Send Reminder
                  </button>

                  <button
                    v-if="item.refundRequested"
                    @click.stop="reviewRefund(item)"
                    class="block w-full text-left px-4 py-3 hover:bg-gray-50"
                  >
                    Review Refund
                  </button>

                </div>

              </div>

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
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>