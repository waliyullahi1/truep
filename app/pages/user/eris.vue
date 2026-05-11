<template>
  <div class="min-h-screen bg-slate-50 py-6">
    <ContainerUser>

      <!-- HEADER -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p class="text-sm text-slate-500 mt-1">
          Welcome back 👋
        </p>
      </div>

      <!-- GRID -->
      <div class="grid grid-cols-12 gap-6">

        <!-- ======================================
             SIDEBAR
        ======================================= -->
        <aside class="col-span-12 lg:col-span-4 xl:col-span-3">

          <!-- PROFILE CARD -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6">

            <div class="flex flex-col items-center text-center">

              <img
                :src="data?.avatar || defaultAvatar"
                class="w-24 h-24 rounded-full object-cover border"
              />

              <h2 class="mt-4 font-semibold text-lg text-slate-900">
                {{ fullName }}
              </h2>

              <p class="text-sm text-slate-500">
                {{ data?.roles || 'User' }}
              </p>

              <div
                class="mt-3 inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                Online
              </div>

              <button
                class="w-full mt-5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium hover:bg-slate-100 transition"
              >
                View Profile
              </button>

            </div>

          </div>

          <!-- QUICK STATS -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 mt-6">

            <h3 class="font-semibold text-slate-800 mb-4">
              Overview
            </h3>

            <div class="space-y-4">

              <div class="flex items-center justify-between">
                <p class="text-sm text-slate-500">
                  Properties
                </p>

                <p class="font-semibold">
                  0
                </p>
              </div>

              <div class="flex items-center justify-between">
                <p class="text-sm text-slate-500">
                  Orders
                </p>

                <p class="font-semibold">
                  0
                </p>
              </div>

              <div class="flex items-center justify-between">
                <p class="text-sm text-slate-500">
                  Rating
                </p>

                <div class="flex items-center gap-1">
                  <Star class="w-4 h-4 text-yellow-400" />
                  <p class="font-semibold">
                    0.0
                  </p>
                </div>
              </div>

            </div>

          </div>

        </aside>

        <!-- ======================================
             MAIN CONTENT
        ======================================= -->
        <main class="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6">

          <!-- TOP CARDS -->
          <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">

            <div
              class="bg-white rounded-2xl border border-slate-200 p-5"
            >
              <p class="text-sm text-slate-500">
                Earnings
              </p>

              <h3 class="text-2xl font-bold mt-2">
                ₦0
              </h3>
            </div>

            <div
              class="bg-white rounded-2xl border border-slate-200 p-5"
            >
              <p class="text-sm text-slate-500">
                Messages
              </p>

              <h3 class="text-2xl font-bold mt-2">
                0
              </h3>
            </div>

            <div
              class="bg-white rounded-2xl border border-slate-200 p-5"
            >
              <p class="text-sm text-slate-500">
                Active Orders
              </p>

              <h3 class="text-2xl font-bold mt-2">
                0
              </h3>
            </div>

            <div
              class="bg-white rounded-2xl border border-slate-200 p-5"
            >
              <p class="text-sm text-slate-500">
                Reviews
              </p>

              <h3 class="text-2xl font-bold mt-2">
                0
              </h3>
            </div>

          </div>

          <!-- CTA -->
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
              to="/user/profile"
              class="px-5 py-3 rounded-xl bg-white text-black text-sm font-semibold w-fit"
            >
              Update Profile
            </NuxtLink>

          </div>

          <!-- RECENT ACTIVITY -->
          <div
            class="bg-white rounded-2xl border border-slate-200 p-6"
          >

            <div class="flex items-center justify-between mb-5">

              <h3 class="font-semibold text-slate-900">
                Recent Activity
              </h3>

              <button
                class="text-sm text-primary font-medium"
              >
                View all
              </button>

            </div>

            <!-- EMPTY STATE -->
            <div
              class="border border-dashed border-slate-300 rounded-2xl py-14 text-center"
            >

              <p class="text-slate-500 text-sm">
                No recent activity yet
              </p>

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
  layout: 'auth'
})

const data = ref({})
const defaultAvatar = '/image/icon/avatar.svg'

/* =========================================
   FULL NAME
========================================= */
const fullName = computed(() => {
  return `${data.value?.firstName || ''} ${data.value?.lastName || ''}`.trim()
})

/* =========================================
   LOAD PROFILE
========================================= */
const loadProfile = async () => {
  try {

    const response = await useApiFetch('/profile/me', {
      method: 'GET'
    })

    data.value =
      response?.data?.data ||
      response?.data ||
      {}

    console.log(data.value)
    const propertyResponse = await useApiFetch('/profile/property', {
      method: 'GET'
    })
    data.value.property = propertyResponse?.data?.data || propertyResponse?.data || {}
  } catch (err) {

    console.error('Load Profile Error:', err)

  }
}

onMounted(() => {
  loadProfile()
})
</script>