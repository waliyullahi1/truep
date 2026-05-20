<template>
  <div class="p-6 space-y-6">

    <!-- =========================================
         PROPERTY STATS
    ========================================== -->

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      <!-- TOTAL -->
      <div class="dashboard-card">

        <div class="card-icon bg-blue-500/10">
          <Icon
            name="solar:buildings-3-bold"
            class="text-blue-400 text-2xl"
          />
        </div>

        <p class="card-label">
          TOTAL PROPERTIES
        </p>

        <h2 class="card-value">
          {{ pagination.totalProperties || 0 }}
        </h2>

        <p class="card-sub">
          Listed properties
        </p>

      </div>

      <!-- APPROVED -->
      <div class="dashboard-card">

        <div class="card-icon bg-emerald-500/10">
          <Icon
            name="solar:verified-check-bold"
            class="text-emerald-400 text-2xl"
          />
        </div>

        <p class="card-label">
          APPROVED
        </p>

        <h2 class="card-value">
          {{ approvedProperties }}
        </h2>

        <p class="card-sub">
          Active listings
        </p>

      </div>

      <!-- PENDING -->
      <div class="dashboard-card">

        <div class="card-icon bg-yellow-500/10">
          <Icon
            name="solar:clock-circle-bold"
            class="text-yellow-400 text-2xl"
          />
        </div>

        <p class="card-label">
          PENDING
        </p>

        <h2 class="card-value">
          {{ pendingProperties }}
        </h2>

        <p class="card-sub">
          Awaiting approval
        </p>

      </div>

      <!-- SOLD -->
      <div class="dashboard-card">

        <div class="card-icon bg-pink-500/10">
          <Icon
            name="solar:home-bold"
            class="text-pink-400 text-2xl"
          />
        </div>

        <p class="card-label">
          SOLD
        </p>

        <h2 class="card-value">
          {{ soldProperties }}
        </h2>

        <p class="card-sub">
          Completed sales
        </p>

      </div>

    </div>

    <!-- =========================================
         TOP BAR
    ========================================== -->

    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <!-- SEARCH -->
      <div class="relative w-full lg:max-w-sm">

        <Icon
          name="solar:magnifer-linear"
          class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl"
        />

        <input
          v-model="search"
          type="text"
          placeholder="Search properties..."
          class="input-style"
        >
      </div>

      <!-- FILTERS -->
      <div class="flex flex-wrap items-center gap-3">

        <!-- STATUS -->
        <select
          v-model="status"
          class="input-style !w-auto"
        >
          <option value="">
            All Status
          </option>

          <option value="approved">
            Approved
          </option>

          <option value="draft">
            Draft
          </option>

          <option value="sold">
            Sold
          </option>

          <option value="pending">
            Pending
          </option>
        </select>

        <!-- TYPE -->
        <select
          v-model="type"
          class="input-style !w-auto"
        >
          <option value="">
            All Types
          </option>

          <option value="house">
            House
          </option>

          <option value="land">
            Land
          </option>
        </select>

      </div>

    </div>

    <!-- =========================================
         TABLE
    ========================================== -->

    <div class="table-wrapper">

      <!-- HEADER -->
      <div class="table-header">

        <div>Property</div>

        <div>Type</div>

        <div>Purpose</div>

       

        <div>Price</div>

        <div>Status</div>

        <div>Owner</div>

        <div />
      </div>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="p-10 text-center text-gray-400"
      >
        Loading properties...
      </div>

      <!-- EMPTY -->
      <div
        v-else-if="!properties.length"
        class="p-10 text-center text-gray-500"
      >
        No properties found
      </div>

      <!-- ROW -->
      <div
        v-for="property in properties"
        :key="property._id"
        class="table-row z-10 static cursor-pointer"
       @click.stop="goToProperty(property)"
      >

        <!-- PROPERTY -->
        <div class="flex items-center gap-4">

          <img
            :src="property?.media?.files?.[0]?.url || '/image/no-image.png'"
            class=" w-24 h-20 rounded-2xl object-cover border border-white/10"
          >

          <div class="space-y-1">

            <h2 class="font-semibold text-sm line-clamp-1">
              {{ property.title }}
            </h2>

            <p class="text-sm text-gray-500 line-clamp-2">
             {{ property.location?.state }}, <br>
              {{ property.location?.city }}
            </p>

          </div>

        </div>

        <!-- TYPE -->
        <div>

          <span class="type-badge">
            {{ property.type }}
          </span>

        </div>

        <!-- PURPOSE -->
        <div class="text-sm capitalize text-gray-300">
          {{ property.purpose }}
        </div>

       

        <!-- PRICE -->
        <div class="font-semibold text-emerald-400">
          ₦{{ formatPrice(property.pricing?.price) }}
        </div>

        <!-- STATUS -->
        <div>

          <span
            class="status-badge"
            :class="statusClass(property.status)"
          >
            {{ property.status }}
          </span>

        </div>

        <!-- OWNER -->
        
          <button
            @click.stop="gotoProfile(property)"
            class="flex items-center gap-4 cursor-pointer"
          >
            <img
              :src="property.owner.avatar || `https://i.pravatar.cc/150?img=${index + 10}`"
              class="w-8 h-8 rounded-full object-cover border border-white/10"
            >

            <div>
              <p class="text-xs text-gray-500">
                @{{ property.owner.firstName || property.owner.lastName }}
              </p>
            </div>
          </button>

        <!-- ACTION -->
        <div class="flex justify-end">

          <button class="text-gray-400 hover:text-white">
            <Icon
              name="solar:menu-dots-bold"
              class="text-2xl"
            />
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()

const loading = ref(false)

const properties = ref([])

const search = ref(route.query.search || '')

const status = ref(route.query.status || '')

const type = ref(route.query.type || '')

const pagination = ref({
  totalProperties: 0,
  currentPage: 1,
  totalPages: 1
})

/* =========================================
   FETCH PROPERTIES
========================================= */

const fetchProperties = async () => {
  try {

    loading.value = true

    const query = new URLSearchParams({
      page: route.query.page || 1,
      search: search.value,
      status: status.value,
      type: type.value
    })

    const res = await useApiFetch(
      `/admin/properties?${query.toString()}`
    )

    console.log(res)

    if (!res?.success) return

    properties.value = res.data?.data || []

    pagination.value = res.data?.pagination || {}

  } catch (err) {

    console.log(err)

  } finally {

    loading.value = false

  }
}

/* =========================================
   STATS
========================================= */

const approvedProperties = computed(() => {
  return properties.value.filter(
    item => item.status === 'approved'
  ).length
})

const pendingProperties = computed(() => {
  return properties.value.filter(
    item => item.status === 'draft'
  ).length
})

const soldProperties = computed(() => {
  return properties.value.filter(
    item => item.status === 'sold'
  ).length
})

/* =========================================
   NAVIGATION
========================================= */

const goToProperty = property => {
    router.push({
       path: `/property/${property.slug}`,
        query: {
         preview: true,
         },
       })
 
}
const gotoProfile = property =>{
     router.push(`/profile/${property.userId}`)
}
/* =========================================
   FORMAT PRICE
========================================= */

const formatPrice = price => {
  return new Intl.NumberFormat().format(price || 0)
}

/* =========================================
   STATUS CLASS
========================================= */

const statusClass = status => {
  switch (status) {

    case 'approved':
      return 'status-green'

    case 'pending':
      return 'status-yellow'

    case 'sold':
      return 'status-blue'

    case 'draft':
      return 'status-red'

    default:
      return 'status-default'
  }
}

/* =========================================
   WATCH
========================================= */

watch(
  [search, status, type],
  () => {

    router.push({
      query: {
        search: search.value || undefined,
        status: status.value || undefined,
        type: type.value || undefined
      }
    })

  }
)

watch(
  () => route.query,
  () => {
    fetchProperties()
  },
  {
    deep: true
  }
)

onMounted(() => {
  fetchProperties()
})
</script>

<style scoped>
.dashboard-card {
  @apply rounded-3xl border border-white/10 bg-[#12121d] p-6;
}

.card-icon {
  @apply h-14 w-14 rounded-2xl flex items-center justify-center mb-5;
}

.card-label {
  @apply text-sm text-gray-400 uppercase tracking-wider;
}

.card-value {
  @apply text-4xl font-bold mt-2;
}

.card-sub {
  @apply text-sm text-gray-500 mt-3;
}

.input-style {
  @apply w-full h-12 rounded-2xl border border-white/10 bg-[#11111b] px-4 text-white outline-none focus:border-emerald-500;
}

.table-wrapper {
  @apply rounded-3xl border border-white/10 overflow-hidden bg-[#11111b];
}

.table-header {
  @apply grid grid-cols-[3fr_1fr_1fr_1.5fr_1fr_1fr_1fr_60px] items-center px-6 h-16 border-b border-white/5 text-gray-400 text-sm font-medium;
}

.table-row {
  @apply grid grid-cols-[3fr_1fr_1fr_1.5fr_1fr_1fr_1fr_60px] items-center px-6 min-h-[110px] border-b border-white/5 hover:bg-white/[0.03] transition-all;
}

.status-badge {
  @apply px-4 py-2 rounded-xl text-xs font-semibold border capitalize;
}

.status-green {
  @apply bg-emerald-500/10 text-emerald-400 border-emerald-500/20;
}

.status-yellow {
  @apply bg-yellow-500/10 text-yellow-400 border-yellow-500/20;
}

.status-red {
  @apply bg-red-500/10 text-red-400 border-red-500/20;
}

.status-blue {
  @apply bg-blue-500/10 text-blue-400 border-blue-500/20;
}

.status-default {
  @apply bg-white/5 text-gray-300 border-white/10;
}

.type-badge {
  @apply px-4 py-2 rounded-xl text-xs bg-pink-500/10 text-pink-400 border border-pink-500/20 capitalize;
}
</style>