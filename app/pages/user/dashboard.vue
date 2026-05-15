<template>
  <div class="min-h-screen bg-slate-50 py-4">

    <!-- ERROR -->
    <div
      v-if="error"
      class="mb-6 bg-red-50 border  border-red-200 text-red-700 px-4 py-4 rounded-xl flex items-center justify-between max-w-7xl mx-auto"
    >
      <p>{{ error }}</p>

      <button
        @click="loadProfile"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
      >
        Retry
      </button>
    </div>

    <ContainerUser>

      <div class="grid grid-cols-12 gap-8">

        <!-- ================= LEFT SIDEBAR ================= -->
        <aside class="col-span-12 lg:col-span-4 xl:col-span-3 space-y-6">

          <!-- Profile Card -->
          <div class="bg-white rounded-2xl shadow-sm p-6 text-center">

            <!-- Avatar -->
            <div
              v-if="loading"
              class="w-24 h-24 mx-auto rounded-full bg-gray-200 animate-pulse"
            ></div>

            <img
              v-else
              :src="data?.avatar || defaultAvatar"
              class="w-24 h-24 mx-auto rounded-full object-cover shadow"
            />

            <!-- Name -->
            <div
              v-if="loading"
              class="h-5 w-32 bg-gray-200 rounded mx-auto mt-4 animate-pulse"
            ></div>

            <h3
              v-else
              class="mt-4 font-semibold text-lg"
            >
              {{ data.lastName }}
            </h3>

            <!-- Username -->
            <div
              v-if="loading"
              class="h-4 w-24 bg-gray-200 rounded mx-auto mt-2 animate-pulse"
            ></div>

            <p
              v-else
              class="text-sm text-gray-500"
            >
              @{{ data.firstName }}
            </p>

            <div class="flex justify-center items-center">
              <NuxtLink
                to="/user/profile/edit"
                class="border border-slate-300 duration-300 rounded-md font-medium hover:bg-primary/10 text-sm w-full mt-3 py-2"
              >
                View Profile
              </NuxtLink>
            </div>

          </div>

          <!-- Overview -->
          <div class="rounded-2xl shadow-sm mt-5 border-slate-300 bg-white p-6">

            <h4 class="font-semibold text-gray-700">
              Overview
            </h4>

            <div class="space-y-3 mt-3">

              <!-- Status -->
              <div class="flex justify-between items-center">
                <p class="text-sm text-gray-600">
                  Status
                </p>

                <div
                  v-if="loading"
                  class="h-4 w-20 bg-gray-200 rounded animate-pulse"
                ></div>

                <p
                  v-else
                  class="font-medium text-sm text-green-700"
                >
                  {{ data.roles }}
                </p>
              </div>

              <!-- Success -->
              <div class="hidden flex justify-between items-center">
                <p class="text-sm text-gray-600">
                  Success score
                </p>

                <div
                  v-if="loading"
                  class="h-4 w-10 bg-gray-200 rounded animate-pulse"
                ></div>

                <p
                  v-else
                  class="font-medium text-sm"
                >
                  12
                </p>
              </div>

              <!-- Rating -->
              <div class="flex justify-between items-center">
                <p class="flex text-sm text-gray-600">
                  Rating
                </p>

                <div
                  v-if="loading"
                  class="h-4 w-12 bg-gray-200 rounded animate-pulse"
                ></div>

                <p
                  v-else
                  class="font-medium text-sm flex gap-1 items-center"
                >
                  <Star class="w-5 h-5 text-yellow-400" />
                  0
                </p>
              </div>

              <!-- Property -->
              <div class="flex justify-between items-center">
                <p class="text-sm text-gray-600">
                  Property
                </p>

                <div
                  v-if="loading"
                  class="h-4 w-10 bg-gray-200 rounded animate-pulse"
                ></div>

                <p
                  v-else
                  class="font-medium text-sm flex gap-1"
                >
                  {{ data.property?.length || 0 }}
                </p>
              </div>

              <!-- Project -->
              <div class="hidden flex justify-between items-center">
                <p class="text-sm text-gray-600">
                  Project
                </p>

                <div
                  v-if="loading"
                  class="h-4 w-10 bg-gray-200 rounded animate-pulse"
                ></div>

                <p
                  v-else
                  class="font-medium text-sm flex gap-1"
                >
                  12
                </p>
              </div>

              <div class="flex justify-center items-center">
                <button
                  class="border border-slate-300 duration-300 rounded-md font-medium hover:bg-primary/10 text-sm w-full mt-3 py-2"
                >
                  View Progress
                </button>
              </div>

            </div>

          </div>

          <!-- Earnings -->
          <div class="bg-white flex justify-between rounded-2xl shadow-sm p-6">

            <p class="text-sm text-gray-500">
              Earned this month
            </p>

            <div
              v-if="loading"
              class="h-7 w-16 bg-gray-200 rounded animate-pulse"
            ></div>

            <h2
              v-else
              class="text-2xl font-bold mt-1"
            >
              $0
            </h2>

          </div>

        </aside>

        <!-- ================= MAIN CONTENT ================= -->
        <main class="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6">

          <!-- Welcome -->
          <div>

            <div v-if="loading">
              <div class="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>

              <div class="h-4 w-80 bg-gray-200 rounded mt-3 animate-pulse"></div>
            </div>

            <div v-else>
              <h2 class="text-2xl font-semibold">
                Welcome back, {{ data.firstName }} 👋
              </h2>

              <p class="text-gray-500 text-sm mt-1">
                Here’s what’s happening with your account today.
              </p>
            </div>

          </div>

          <!-- Widgets -->
          <div class="grid md:grid-cols-3 gap-6">

            <!-- Active -->
            <div class="bg-white rounded-2xl shadow-sm p-6">

              <p class="text-sm text-gray-500">
                Active property
              </p>

              <div
                v-if="loading"
                class="h-7 w-14 bg-gray-200 rounded mt-3 animate-pulse"
              ></div>

              <h3
                v-else
                class="text-xl font-semibold mt-1"
              >
                {{ countByStatus(data.property, 'approved') || 0 }}
              </h3>

            </div>

            <!-- Messages -->
            <div class="bg-white rounded-2xl shadow-sm p-6">

              <p class="text-sm text-gray-500">
                Messages
              </p>

              <div
                v-if="loading"
                class="h-7 w-14 bg-gray-200 rounded mt-3 animate-pulse"
              ></div>

              <h3
                v-else
                class="text-xl font-semibold mt-1"
              >
                0
              </h3>

            </div>

            <!-- Draft -->
            <div class="bg-white rounded-2xl shadow-sm p-6">

              <p class="text-sm text-gray-500">
                Draft Property
              </p>

              <div
                v-if="loading"
                class="h-7 w-14 bg-gray-200 rounded mt-3 animate-pulse"
              ></div>

              <span
                v-else
                class="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-red-100 text-red-700"
              >
                <h3 class="text-xl font-semibold mt-1">
                  {{ countByStatus(data.property, 'draft') || 0 }}
                </h3>
              </span>

            </div>

          </div>

          <!-- Complete Profile -->
          <div
            class="bg-black text-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          >

            <div>

              <h3 class="text-xl font-semibold">
                Complete your profile
              </h3>

              <p class="text-sm text-slate-300 mt-2">
                Add your information and verification details to build trust.
              </p>

            </div>

            <NuxtLink
              to="/user/profile/edit"
              class="px-5 py-3 rounded-xl bg-white text-black text-sm font-semibold w-fit"
            >
              Update Profile
            </NuxtLink>

          </div>

          <!-- Properties -->
          <div
            class="bg-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          >

            <div>

              <h3 class="text-xl font-semibold">
                View your properties
              </h3>

              <p class="text-sm text-slate-300 mt-2">
                Manage, edit and monitor all your listed properties.
              </p>

            </div>

            <NuxtLink
              to="/user/list"
              class="px-5 py-3 rounded-xl bg-white text-black text-sm font-semibold w-fit hover:bg-slate-200 transition"
            >
              View Properties
            </NuxtLink>

          </div>

          <!-- Orders -->
          <div class="bg-white rounded-2xl shadow-sm p-6">

            <div class="flex justify-between items-center mb-4">

              <h4 class="font-semibold">
                Recent Orders
              </h4>

              <select class="border rounded-lg px-3 py-1 text-sm">
                <option>View All</option>
              </select>

            </div>

            <div
              v-if="loading"
              class="space-y-3"
            >
              <div class="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div
              v-else
              class="text-gray-400 text-sm text-center py-8"
            >
              No orders yet
            </div>

          </div>

        </main>

      </div>

    </ContainerUser>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Star } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
  access: 'seller'
})

const data = ref({})
const loading = ref(true)
const error = ref(null)

const defaultAvatar = '/image/icon/avatar.svg'

const fullName = computed(() => {
  return `${data.value?.firstName || ''} ${data.value?.lastName || ''}`.trim()
})

const countByStatus = (items = [], status = 'active') => {
  return items.filter(
    item => item.status?.toLowerCase() === status.toLowerCase()
  ).length
}

const loadProfile = async () => {

  try {

    loading.value = true
    error.value = null

    const response = await useApiFetch('/profile/me', {
      method: 'GET'
    })
    
    data.value =
      response?.data?.data ||
      response?.data ||
      {}

    const propertyResponse = await useApiFetch('/profile/property', {
      method: 'GET'
    })

    data.value.property =
      propertyResponse?.data?.data ||
      propertyResponse?.data ||
      []
    if (!response?.success) {
      error.value =  'Failed to load profile'
      throw createError({
        statusCode: 500,
        statusMessage: response?.message || 'Failed to fetch properties',
         
      })
    }
  } catch (err) {

    console.error('Load Profile Error:', err)

    error.value ='Failed to load profile'

  } finally {

    loading.value = false

  }

}

onMounted(() => {
  loadProfile()
})
</script>