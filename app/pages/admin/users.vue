<template>
  <div class="p-6 space-y-6">

    <!-- =========================================
         STATS
    ========================================== -->

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      <!-- TOTAL USERS -->
      <div class="dashboard-card">

        <div class="card-icon bg-blue-500/10">
          <Icon
            name="solar:users-group-rounded-bold"
            class="text-blue-400 text-2xl"
          />
        </div>

        <p class="card-label">
          TOTAL USERS
        </p>

        <h2 class="card-value">
          {{ pagination.totalUsers || 0 }}
        </h2>

        <p class="card-sub">
          Registered accounts
        </p>

      </div>

      <!-- VERIFIED -->
      <div class="dashboard-card">

        <div class="card-icon bg-emerald-500/10">
          <Icon
            name="solar:verified-check-bold"
            class="text-emerald-400 text-2xl"
          />
        </div>

        <p class="card-label">
          VERIFIED USERS
        </p>

        <h2 class="card-value">
          {{ verifiedUsers }}
        </h2>

        <p class="card-sub">
          Trusted accounts
        </p>

      </div>

      <!-- ADMINS -->
      <div class="dashboard-card">

        <div class="card-icon bg-orange-500/10">
          <Icon
            name="solar:shield-user-bold"
            class="text-orange-400 text-2xl"
          />
        </div>

        <p class="card-label">
          ADMINS
        </p>

        <h2 class="card-value">
          {{ adminUsers }}
        </h2>

        <p class="card-sub">
          Platform admins
        </p>

      </div>

      <!-- PROPERTY OWNERS -->
      <div class="dashboard-card">

        <div class="card-icon bg-pink-500/10">
          <Icon
            name="solar:buildings-3-bold"
            class="text-pink-400 text-2xl"
          />
        </div>

        <p class="card-label">
          PROPERTY OWNERS
        </p>

        <h2 class="card-value">
          {{ propertyOwners }}
        </h2>

        <p class="card-sub">
          Users with properties
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
          placeholder="Search users..."
          class="input-style"
        >
      </div>

      <!-- FILTERS -->
      <div class="flex flex-wrap items-center gap-3">

        <!-- ROLE -->
        <select
          v-model="role"
          class="input-style !w-auto"
        >
          <option value="">
            All Roles
          </option>

          <option value="admin">
            Admin
          </option>

          <option value="agent">
            Agent
          </option>

          <option value="landlord">
            Landlord
          </option>
        </select>

        <!-- VERIFIED -->
        <select
          v-model="verified"
          class="input-style !w-auto"
        >
          <option value="">
            Verification
          </option>

          <option value="true">
            Verified
          </option>

          <option value="false">
            Unverified
          </option>
        </select>

        <!-- DELETE -->
        <button
          class="delete-btn"
        >
          <Icon
            name="solar:trash-bin-trash-bold"
            class="text-xl"
          />

          <span>Delete</span>

          <span class="delete-count">
            {{ selectedIds.length }}
          </span>
        </button>

      </div>

    </div>

    <!-- =========================================
         TABLE
    ========================================== -->

    <div class="table-wrapper">

      <!-- TABLE HEADER -->
      <div
        class="table-header text-sm"
      >

        <div>
          <input
            v-model="selectAll"
            type="checkbox"
            class="checkbox"
            @change="toggleAll"
          >
        </div>

        <div>ID</div>

        <div>User</div>

        <div>Email</div>
        <div class=" text-center">location</div>
        <div>Role</div>

        <div>Properties</div>

        <div>Verified</div>

        <div />
      </div>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="p-10 text-center text-gray-400"
      >
        Loading users...
      </div>

      <!-- EMPTY -->
      <div
        v-else-if="!users.length"
        class="p-10 text-center text-gray-500"
      >
        No users found
      </div>

      <!-- USERS -->
      <div
        v-for="(user, index) in users"
        :key="user._id"
        class="table-row"
         @click="goToProfile(user)"
      >

        <!-- CHECKBOX -->
        <div>
          <input
            v-model="selectedIds"
            type="checkbox"
            :value="user._id"
            class="checkbox"
          >
        </div>

        <!-- ID -->
        <div class="text-sm text-gray-400">
          {{ index + 1 }}
        </div>

        <!-- USER -->
        <div class="flex items-center gap-4">

          <img
            :src="user.avatar || `https://i.pravatar.cc/150?img=${index + 10}`"
            class="w-10 h-10 rounded-full object-cover border border-white/10"
          >

          <div>

           

            <p class="text-sm text-gray-500">
              @{{ user.firstName || user.lastName }}
            </p>

          </div>

        </div>

        <!-- EMAIL -->
        <div class="text-sm text-gray-400">
          {{ user.email }}
        </div>
        <!-- EMAIL -->
        <div class="text-sm text-center text-gray-400">
          {{ user.location.state }}, {{ user.location.city }}
        </div>

        <!-- ROLE -->
        <div>

          <span class="role-badge">
            {{ user.roles || 'user' }}
          </span>

        </div>

        <!-- PROPERTIES -->
        <div class="text-sm text-center font-semibold">
          {{ user.totalProperties || 0 }}
        </div>

        <!-- VERIFIED -->
        <div>

          <span
            class="status-badge"
            :class="user.emailVerified ? 'status-green' : 'status-red'"
          >
            {{ user.emailVerified ? 'Verified' : 'Unverified' }}
          </span>

        </div>

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

    <!-- =========================================
         PAGINATION
    ========================================== -->

    <div class="flex items-center justify-between">

      <p class="text-sm text-gray-400">
        Showing page {{ pagination.currentPage }}
        of {{ pagination.totalPages }}
      </p>

      <div class="flex items-center gap-3">

        <button
          :disabled="pagination.currentPage <= 1"
          class="pagination-btn"
          @click="changePage(pagination.currentPage - 1)"
        >
          Prev
        </button>

        <button
          :disabled="pagination.currentPage >= pagination.totalPages"
          class="pagination-btn"
          @click="changePage(pagination.currentPage + 1)"
        >
          Next
        </button>

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

const { $toast } = useNuxtApp()

/* =========================================
   STATE
========================================= */
const totaluser = ref(Number)
const loading = ref(false)

const users = ref([])

const selectedIds = ref([])

const selectAll = ref(false)

const search = ref(route.query.search || '')

const role = ref(route.query.role || '')

const verified = ref(route.query.verified || '')

const pagination = ref({
  totalUsers: 0,
  currentPage: 1,
  totalPages: 1,
  limit: 10
})

/* =========================================
   FETCH USERS
========================================= */

const fetchUsers = async () => {
  try {
    loading.value = true

    const query = new URLSearchParams({
      page: route.query.page || 1,
      limit: 10,
      search: search.value,
      role: role.value,
      verified: verified.value
    })

    const res = await useApiFetch(
      `/admin/users?${query.toString()}`,
      {
        method: 'GET'
      }
    )

    console.log('USERS:', res)

    if (!res?.success) {
      $toast.error(res?.message || 'Failed to fetch users')
      return
    }

    users.value = res.data?.data || []
    console.log(res.data.pagination);
    
    pagination.value = res.data.pagination || {
      totalUsers: 0,
      currentPage: 1,
      totalPages: 1,
      limit: 10
    }
 console.log(pagination.value)
  } catch (err) {

    console.log(err)

    $toast.error('Something went wrong')

  } finally {

    loading.value = false

  }
}

const goToProfile = user => {
  router.push(`/profile/${user._id}`)
}
/* =========================================
   STATS
========================================= */

const verifiedUsers = computed(() => {
  return users.value.filter(
    item => item.emailVerified
  ).length
})

const adminUsers = computed(() => {
  return users.value.filter(
    item => item.role === 'admin'
  ).length
})

const totalUsers = computed(() => {
  return users.value.filter(
    item => item.role === 'admin'
  ).length
})

const propertyOwners = computed(() => {
  return users.value.filter(
    item => item.totalProperties > 0
  ).length
})

/* =========================================
   SELECT ALL
========================================= */

const toggleAll = () => {
  if (selectAll.value) {
    selectedIds.value = users.value.map(
      item => item._id
    )
  } else {
    selectedIds.value = []
  }
}

/* =========================================
   PAGE CHANGE
========================================= */

const changePage = page => {
  router.push({
    query: {
      ...route.query,
      page
    }
  })
}

/* =========================================
   FILTER WATCH
========================================= */

watch(
  [search, role, verified],
  () => {

    router.push({
      query: {
        page: 1,
        search: search.value || undefined,
        role: role.value || undefined,
        verified: verified.value || undefined
      }
    })

  }
)

/* =========================================
   ROUTE WATCH
========================================= */

watch(
  () => route.query,
  () => {
    fetchUsers()
  },
  {
    deep: true
  }
)

/* =========================================
   INIT
========================================= */

onMounted(() => {
  fetchUsers()
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
  @apply grid grid-cols-[40px_50px_2fr_2fr_2fr_1fr_1fr_1fr_60px] items-center px-6 h-16 border-b border-white/5 text-gray-400 text-sm font-medium;
}

.table-row {
  @apply grid grid-cols-[40px_50px_2fr_2fr_2fr_1fr_1fr_1fr_60px]  items-center px-6 min-h-[90px] border-b border-white/5 hover:bg-white/[0.03] transition-all;
}

.checkbox {
  @apply h-4 w-4 rounded border border-white/10 bg-transparent accent-emerald-400;
}

.status-badge {
  @apply px-4 py-2 rounded-xl text-xs font-semibold border;
}

.status-green {
  @apply bg-emerald-500/10 text-emerald-400 border-emerald-500/20;
}

.status-red {
  @apply bg-red-500/10 text-red-400 border-red-500/20;
}

.role-badge {
  @apply px-4 py-2 rounded-xl text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 capitalize;
}

.delete-btn {
  @apply h-12 px-5 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400 flex items-center gap-3;
}

.delete-count {
  @apply h-7 min-w-7 px-2 rounded-lg bg-black/40 flex items-center justify-center text-sm;
}

.pagination-btn {
  @apply px-4 h-10 rounded-xl bg-white/5 border border-white/10 disabled:opacity-40;
}
</style>