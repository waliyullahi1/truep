<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  useRouter,
  useRoute
} from 'vue-router'

const router = useRouter()
const route = useRoute()
const { $toast } = useNuxtApp()

definePageMeta({
  layout: 'auth',
  access: 'seller',
   sellerOnly: true
})

/* ================= STATE ================= */
const filter = ref('all')
const openMenuId = ref(null)
const deleteId = ref(null)
const changingStatus = ref(null)

/* ================= TRANSITION RULES ================= */
const allowedTransitions = {
  draft: ['approved'],
  approved: ['sold', 'rented', 'off_market', 'draft'],
  off_market: ['approved'],
  sold: [],
  rented: []
}

/* ================= DATA ================= */
// const properties = ref([])

/* ================= COMPUTED ================= */
const totalItems = computed(() => properties.value.length)

const filteredList = computed(() =>
  filter.value === 'all'
    ? properties.value
    : properties.value.filter(
        p => p.status === filter.value
      )
)

const statuses = computed(() => [
  'all',
  ...new Set(
    (properties.value || []).map(
      p => p.status
    )
  )
])

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

const getLocation = (item) => {

  return `${
    item?.location?.state || ''
  }/${
    item?.location?.city || ''
  }`
}

const getImage = (item) => {

  return (
    item?.media?.files?.[0]?.url ||
    '/image/no-image.png'
  )
}

const formatStatus = (s = '') =>
  s.charAt(0).toUpperCase() +
  s.slice(1).toLowerCase()

const statusClass = (s = '') => {

  const key = s.toLowerCase()

  return {
    available:
      'bg-green-100 text-green-700',

    rented:
      'bg-blue-100 text-blue-700',

    sold:
      'bg-red-100 text-red-700',

    draft:
      'bg-yellow-100 text-yellow-700',

    pending:
      'bg-purple-100 text-purple-700',

    denied:
      'bg-gray-200 text-gray-700',

    paused:
      'bg-orange-100 text-orange-700',

    approved:
      'bg-green-100 text-green-700',

    off_market:
      'bg-gray-100 text-gray-700'

  }[key] ||
  'bg-gray-100 text-gray-600'
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

/* ================= STATUS HELPERS ================= */
const getAllowedStatuses = (
  currentStatus
) => {

  return (
    allowedTransitions[
      currentStatus
    ] || []
  )
}

/* ================= METHODS ================= */
const removeItem = async (id) => {

  try {

    await useApiFetch(
      `/property/${id}`,
      {
        method: "DELETE"
      }
    )

    properties.value =
      properties.value.filter(
        p => p._id !== id
      )

    $toast.success(
      "Property removed"
    )

  } catch (err) {

    $toast.error(
      "Remove failed"
    )
  }

  openMenuId.value = null
}

const changeStatus = async (
  item,
  newStatus
) => {

  try {

    changingStatus.value =
      item._id

    const res =
      await useApiFetch(
        `/property/${item._id}/status`,
        {
          method: 'PATCH',

          body: {
            status: newStatus
          }
        }
      )

    if (!res.success) {

      throw new Error(
        res.message ||
        'Failed to update'
      )
    }

    item.status = newStatus

    $toast.success(
      `Status changed to ${newStatus}`
    )

  } catch (err) {

    $toast.error(
      err?.message ||
      'Failed to change status'
    )

  } finally {

    changingStatus.value = null
    openMenuId.value = null
  }
}

const toggleMenu = (id) => {

  openMenuId.value =
    openMenuId.value === id
      ? null
      : id
}

const editproper = (id) => {

  router.push({
    path: '/user/list/new',

    query: {
      id: id,
    },
  })
}

const viewProperty = (slug) => {

  router.push(
    `/property/${slug}`
  )
}

const handleClickOutside = () => {

  openMenuId.value = null
}

/* ================= FETCH ================= */

const {
  data,
  pending,
  error,
  refresh
} = await useAsyncData(
  'properties',

  async () => {

    const res =
      await useApiFetch(
        '/property'
      )

    // ✅ THROW ERROR
    if (!res.success) {

      throw createError({
        statusCode:
          res.status || 500,

        statusMessage:
          res.message ||
          'Failed to load properties'
      })
    }

    // ✅ SAFE SERIALIZABLE DATA
    return JSON.parse(
      JSON.stringify(
        res.data?.data ||
        res.data ||
        []
      )
    )
  },

  {
    lazy: true,
    server: true
  }
)

const getStatusCount = (status) => {
  if (status === 'all') {
    return properties.value.length
  }

  return properties.value.filter(
    p => p.status === status
  ).length
}
const properties = computed(
  () => data.value || []
)


// const getPrice = (item) => {

//   if (!item?.pricing) return 0

//   if (
//     item.pricing.paymentType ===
//     'outright'
//   ) {
//     return item.pricing.price || 0
//   }

//   if (
//     item.pricing.paymentType ===
//     'installment'
//   ) {
//     return item.pricing.installment
//       ?.monthlyAmount || 0
//   }

//   if (
//     item.pricing.paymentType ===
//     'rent'
//   ) {
//     return item.pricing.price || 0
//   }

//   return 0
// }
/* ================= LIFECYCLE ================= */

onMounted(() => {

  window.addEventListener(
    'click',
    handleClickOutside
  )

  console.log(properties)
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
    <div
      class="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-6"
    >
      <h1 class="text-2xl sm:text-3xl font-light text-gray-800">
        Properties
      </h1>

      <button
        @click="router.push('/user/list/new')"
        class="w-full sm:w-auto bg-green-600 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition"
      >
        CREATE A NEW PROPERTY
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
        <div
          class="grid grid-cols-12 gap-4 px-4 sm:px-6 py-4 text-xs font-semibold text-gray-500 border-b uppercase"
        >
          <div class="col-span-1"></div>

          <div class="col-span-5">
            Property
          </div>

          <div class="col-span-1 text-center">
            Views
          </div>

          <div class="col-span-1 text-center">
            Clicks
          </div>

          <div class="col-span-1 text-center">
            Amount
          </div>

          <div class="col-span-2 text-center">
            Status
          </div>

          <div class="col-span-1"></div>
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
            No properties found
          </div>

          <div
            v-for="item in filteredList"
            :key="item._id"
            class="grid grid-cols-12 gap-4 px-4 sm:px-6 py-5 items-center border-b hover:bg-gray-50 transition relative"
          >

            <!-- IMAGE -->
            <div class="col-span-1">
              <img
                :src="getImage(item)"
                class="w-14 h-14 object-cover rounded"
              />
            </div>

            <!-- PROPERTY -->
            <div class="col-span-5">
              <p class="font-medium text-gray-800 line-clamp-1">
                {{ item.title }}
              </p>

              <p class="text-xs text-gray-400 mt-1">
                {{ formatStatus(item.type) }}
                for
                {{ formatStatus(item.purpose) }}

                at 📍 {{ getLocation(item) }}

                <br>

                {{ smartMoney(item.pricing.price || 0) }}
                {{ getPriceLabel(item) }}

                <br>

                Created:
                {{ formatDate(item.createdAt) }}
              </p>
            </div>

            <!-- VIEWS -->
            <div
              class="col-span-1 text-center text-sm text-gray-600"
            >
              {{ item.views || 0 }}
            </div>

            <!-- CLICKS -->
            <div
              class="col-span-1 text-center text-sm text-gray-600"
            >
              {{ item.clicks || 0 }}
            </div>

            <!-- AMOUNT -->
            <div
              class="col-span-1 text-center text-sm text-gray-600"
            >
              {{ smartMoney(item.pricing.price || 0) }}
              {{ getPriceLabel(item) }}
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
            <div
              class="col-span-1 flex justify-end relative"
            >

              <button
                @click.stop="toggleMenu(item._id)"
                class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center"
              >
                ⋮
              </button>

              <div
                v-if="openMenuId === item._id"
                class="absolute right-0 top-10 w-52 bg-white border rounded-md shadow-lg text-sm z-50 overflow-hidden"
              >

                <button
                  v-if="item.status !== 'draft'"
                  @click.stop="viewProperty(item._id)"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  View
                </button>

                <button
                  @click.stop="editproper(item._id)"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Edit
                </button>

                <div
                  v-if="getAllowedStatuses(item.status).length"
                  class="border-t"
                >

                  <div
                    class="px-4 py-2 text-[11px] uppercase text-gray-400 font-semibold"
                  >
                    Change Status
                  </div>

                  <button
                    v-for="status in getAllowedStatuses(item.status)"
                    :key="status"
                    @click.stop="changeStatus(item,status)"
                    :disabled="changingStatus === item._id"
                    class="block w-full text-left px-4 py-2 hover:bg-gray-100 capitalize disabled:opacity-50"
                  >
                    <span
                      v-if="changingStatus === item._id"
                    >
                      Updating...
                    </span>

                    <span v-else>
                      Mark as
                      {{ status.replace('_',' ') }}
                    </span>
                  </button>

                </div>

                <button
                  @click.stop="removeItem(item._id)"
                  class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 border-t"
                >
                  Delete
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