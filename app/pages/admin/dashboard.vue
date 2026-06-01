<template>
    <div>
            <div class="p-6  h-[calc(100vh-80px)]">

        <!-- STATS -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >

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
              {{ dashboard.users.totalUsers }}
            </h2>

            <p class="card-sub">
              +{{ dashboard.users.usersToday }} today
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
              {{ dashboard.users.totalVerifiedUsers }}
            </h2>

            <p class="card-sub">
              Trusted accounts
            </p>

          </div>

          <!-- PROPERTIES -->
          <div class="dashboard-card">

            <div class="card-icon bg-orange-500/10">
              <Icon
                name="solar:buildings-3-bold"
                class="text-orange-400 text-2xl"
              />
            </div>

            <p class="card-label">
              TOTAL PROPERTIES
            </p>

            <h2 class="card-value">
              {{ dashboard.properties.totalProperties }}
            </h2>

            <p class="card-sub">
              {{ dashboard.properties.propertiesToday }}
              added today
            </p>

          </div>

          <!-- FEATURED -->
          <div class="dashboard-card">

            <div class="card-icon bg-pink-500/10">
              <Icon
                name="solar:star-bold"
                class="text-pink-400 text-2xl"
              />
            </div>

            <p class="card-label">
              FEATURED LISTINGS
            </p>

            <h2 class="card-value">
              {{ dashboard.properties.totalFeaturedProperties }}
            </h2>

            <p class="card-sub">
              Premium properties
            </p>

          </div>

        </div>

        <!-- SECOND GRID -->
        <div
          class="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6"
        >

          <!-- PROPERTY STATS -->
          <div
            class="xl:col-span-2 rounded-3xl border border-white/10 bg-[#12121d] p-6"
          >

            <div class="flex items-center justify-between">

              <div>

                <p class="text-gray-400">
                  PROPERTY OVERVIEW
                </p>

                <h2 class="text-4xl font-bold mt-2">
                  {{ dashboard.properties.totalProperties }}
                </h2>

              </div>

              <div
                class="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center"
              >
                <Icon
                  name="solar:chart-square-bold"
                  class="text-emerald-400 text-3xl"
                />
              </div>

            </div>

            <!-- STATS -->
            <div
              class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
            >

              <div class="mini-stat">
                <p class="mini-label">
                  Active
                </p>

                <h3 class="mini-value text-emerald-400">
                  {{ dashboard.properties.totalActiveProperties }}
                </h3>
              </div>

              <div class="mini-stat">
                <p class="mini-label">
                  Pending
                </p>

                <h3 class="mini-value text-yellow-400">
                  {{ dashboard.properties.totalPendingProperties }}
                </h3>
              </div>

              <div class="mini-stat">
                <p class="mini-label">
                  Sold
                </p>

                <h3 class="mini-value text-blue-400">
                  {{ dashboard.properties.totalSoldProperties }}
                </h3>
              </div>

              <div class="mini-stat">
                <p class="mini-label">
                  Featured
                </p>

                <h3 class="mini-value text-pink-400">
                  {{ dashboard.properties.totalFeaturedProperties }}
                </h3>
              </div>

            </div>

          </div>

          <!-- ROLES -->
          <div
            class="rounded-3xl border border-white/10 bg-[#12121d] p-6"
          >

            <div class="flex items-center justify-between">

              <div>

                <p class="text-gray-400">
                  USER ROLES
                </p>

                <h2 class="text-2xl font-bold mt-1">
                  Platform Roles
                </h2>

              </div>

              <Icon
                name="solar:shield-user-bold"
                class="text-4xl text-emerald-400"
              />

            </div>

            <div class="space-y-5 mt-8">

              <div class="role-item">
                <span>Agents</span>

                <strong>
                  {{ dashboard.roles.totalAgents }}
                </strong>
              </div>

              <div class="role-item">
                <span>Landlords</span>

                <strong>
                  {{ dashboard.roles.totalLandlords }}
                </strong>
              </div>

              <div class="role-item">
                <span>Property Owners</span>

                <strong>
                  {{ dashboard.roles.totalPropertyOwners }}
                </strong>
              </div>

              <div class="role-item">
                <span>Admins</span>

                <strong>
                  {{ dashboard.roles.totalAdmins }}
                </strong>
              </div>

            </div>

          </div>

        </div>

        <!-- THIRD GRID -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
        >

          <!-- USERS -->
          <div class="dashboard-panel">

            <div class="panel-header">

              <h2>
                User Statistics
              </h2>

              <Icon
                name="solar:user-bold"
                class="text-2xl text-blue-400"
              />

            </div>

            <div class="space-y-5 mt-6">

              <div class="panel-item">
                <span>Total Verified</span>

                <strong>
                  {{ dashboard.users.totalVerifiedUsers }}
                </strong>
              </div>

              <div class="panel-item">
                <span>Total Unverified</span>

                <strong>
                  {{ dashboard.users.totalUnverifiedUsers }}
                </strong>
              </div>

              <div class="panel-item">
                <span>New Users Today</span>

                <strong>
                  {{ dashboard.users.usersToday }}
                </strong>
              </div>

            </div>

          </div>

          <!-- PROPERTY USERS -->
          <div class="dashboard-panel">

            <div class="panel-header">

              <h2>
                Property Analytics
              </h2>

              <Icon
                name="solar:home-bold"
                class="text-2xl text-orange-400"
              />

            </div>

            <div class="space-y-5 mt-6">

              <div class="panel-item">
                <span>Users With Properties</span>

                <strong>
                  {{ dashboard.properties.usersWithProperties }}
                </strong>
              </div>

              <div class="panel-item">
                <span>Properties Added Today</span>

                <strong>
                  {{ dashboard.properties.propertiesToday }}
                </strong>
              </div>

              <div class="panel-item">
                <span>Featured Listings</span>

                <strong>
                  {{ dashboard.properties.totalFeaturedProperties }}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  <!-- <AdminStatsDashboard /> -->
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  adminOnly: true
})


const { $toast } = useNuxtApp()

const dashboard = ref({
  users: {
    totalUsers: 3200,
    totalVerifiedUsers: 2400,
    totalUnverifiedUsers: 800,
    usersToday: 42
  },

  roles: {
    totalAgents: 300,
    totalLandlords: 120,
    totalPropertyOwners: 80,
    totalAdmins: 5
  },

  properties: {
    totalProperties: 1580,
    totalActiveProperties: 1200,
    totalSoldProperties: 210,
    totalPendingProperties: 170,
    totalFeaturedProperties: 92,
    propertiesToday: 18,
    usersWithProperties: 410
  }
})

const loadData = async () => {
  try {
    const res = await useApiFetch('/admin/dashboard', {
      method: 'GET'
    })

    console.log('DASHBOARD RESPONSE:', res)

    // CHECK SUCCESS
    if (!res?.success) {
      $toast.error(res?.message || 'Failed to load dashboard')
      return
    }

    // GET API DATA
    const data = res?.data?.data

    console.log('DASHBOARD DATA:', data)

    // UPDATE DASHBOARD
    if (data) {
      dashboard.value = {
        users: {
          ...dashboard.value.users,
          ...data.users
        },

        roles: {
          ...dashboard.value.roles,
          ...data.roles
        },

        properties: {
          ...dashboard.value.properties,
          ...data.properties
        }
      }
    }
  } catch (err) {
    console.log(err)

    $toast.error('Failed to load dashboard')
  }
}

onMounted(() => {
  loadData()
})
</script>
<style scoped>
.sidebar-link {
  @apply flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300;
}

.dashboard-card {
  @apply rounded-3xl border border-white/10 bg-[#12121d] p-6;
}

.card-icon {
  @apply h-14 w-14 rounded-2xl flex items-center justify-center mb-6;
}

.card-label {
  @apply text-sm text-gray-400 uppercase tracking-wider;
}

.card-value {
  @apply text-4xl font-bold mt-2;
}

.card-sub {
  @apply text-sm text-gray-400 mt-3;
}

.mini-stat {
  @apply rounded-2xl bg-white/5 p-4 border border-white/5;
}

.mini-label {
  @apply text-sm text-gray-400;
}

.mini-value {
  @apply text-xl font-bold mt-2;
}

.role-item {
  @apply flex items-center justify-between border-b border-white/5 pb-4 text-gray-300;
}

.dashboard-panel {
  @apply rounded-3xl border border-white/10 bg-[#12121d] p-6;
}

.panel-header {
  @apply flex items-center justify-between;
}

.panel-header h2 {
  @apply text-xl font-bold;
}

.panel-item {
  @apply flex items-center justify-between border-b border-white/5 pb-4 text-gray-300;
}
</style>