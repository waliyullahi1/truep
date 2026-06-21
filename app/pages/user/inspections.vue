<template>
  <div class="p-4 md:p-6 space-y-6">

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 class="text-2xl font-bold">
        Property Inspections
      </h1>

      <!-- TABS -->
      <div class="flex bg-gray-100 rounded-xl p-1">
        <button
          @click="changeTab('in')"
          class="px-4 py-2 rounded-lg transition"
          :class="activeTab === 'in' ? 'bg-white shadow font-medium' : ''"
        >
          Incoming
        </button>

        <button
          @click="changeTab('out')"
          class="px-4 py-2 rounded-lg transition"
          :class="activeTab === 'out' ? 'bg-white shadow font-medium' : ''"
        >
          Outgoing
        </button>
      </div>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-10">
      Loading inspections...
    </div>

    <!-- EMPTY -->
    <div v-else-if="!inspections.length" class="bg-white border rounded-xl p-8 text-center">
      No inspections found.
    </div>

    <!-- MOBILE VIEW -->
    <div v-else class="grid gap-4 md:hidden">
      <div
        v-for="item in inspections"
        :key="item._id"
        class="bg-white border rounded-xl p-4"
      >
        <!-- USER -->
        <div class="flex items-center gap-3">
          
          <img
            :src="person(item).avatar || '/image/no-image-profile.png'"
            class="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 class="font-semibold">
              {{ fullName(person(item)) }}
            </h3>
            <p class="text-xs text-gray-500">
              {{ person(item).email }}
            </p>
          </div>
        </div>

        <!-- PROPERTY -->
        <div class="mt-4">
          <p class="font-medium">
            {{ item.property?.title }}
          </p>
          <p class="text-sm text-gray-500">
            {{ item.property?.location.state }},   {{ item.property?.location.city }}
          </p>
        </div>

        <!-- DATE -->
        <div class="flex justify-between mt-3 text-sm">
          <span>{{ formatDate(item.inspectionDate) }}</span>
          <span>{{ item.inspectionTime }}</span>
        </div>

        <!-- STATUS -->
        <div class="mt-3">
          <span
            class="px-3 py-1 text-xs rounded-full"
            :class="statusClass(item.status)"
          >
            {{ item.status }}
          </span>
        </div>

        <!-- ACTIONS -->
        <div
          v-if="activeTab === 'in' && item.status === 'pending'"
          class="grid grid-cols-2 gap-2 mt-4"
        >
          <button
            @click="updateStatus(item._id, 'approved')"
            class="bg-green-600 text-white py-2 rounded-lg"
          >
            Accept
          </button>

          <button
            @click="updateStatus(item._id, 'rejected')"
            class="bg-red-600 text-white py-2 rounded-lg"
          >
            Reject
          </button>
        </div>
      </div>
    </div>

    <!-- DESKTOP VIEW -->
    <div v-if="inspections.length" class="hidden md:block bg-white border rounded-xl overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-4 text-left">User</th>
            <th class="text-left">Property</th>
            <th class="text-left">Date</th>
            <th class="text-left">Time</th>
            <th class="text-left">Status</th>
            <th class="text-right p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in inspections"
            :key="item._id"
            class="border-t"
          >
            <!-- USER -->
            <td class="p-4">
              <div class="flex items-center gap-3">
                <img
                  :src="person(item).avatar || '/image/no-image-profile.png'"
                  class="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <div class="font-medium">
                    {{ fullName(person(item)) }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ item.phone }}
                  </div>
                </div>
              </div>
            </td>

            <!-- PROPERTY -->
            <td>
              <div class="font-medium">
                {{ item.property?.title }}
              </div>
              <div class="text-xs text-gray-500">
                {{item.property?.location.state}}, {{item.property?.location.city}}, {{item.property?.location.city}}
              </div>
            </td>

            <!-- DATE -->
            <td>{{ formatDate(item.inspectionDate) }}</td>

            <!-- TIME -->
            <td>{{ item.inspectionTime }}</td>

            <!-- STATUS -->
            <td>
              <span
                class="px-3 py-1 text-xs rounded-full"
                :class="statusClass(item.status)"
              >
                {{ item.status }}
              </span>
            </td>

            <!-- ACTION -->
            <td class="text-right p-4">
              <div
                v-if="activeTab === 'in' && item.status === 'pending'"
                class="flex justify-end gap-2"
              >
               <button
                  @click="updateStatus(item._id, 'approved')"
                  :disabled="actionLoading === `${item._id}-approved`"
                  class="px-3 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span
                    v-if="actionLoading === `${item._id}-approved`"
                  >
                    Accepting...
                  </span>

                  <span v-else>
                    Accept
                  </span>
                </button>

                <button
                    @click="updateStatus(item._id, 'rejected')"
                    :disabled="actionLoading === `${item._id}-rejected`"
                    class="px-3 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span
                      v-if="actionLoading === `${item._id}-rejected`"
                    >
                      Rejecting...
                    </span>

                    <span v-else>
                      Reject
                    </span>
                  </button>
              </div>

              <span v-else class="text-gray-400">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
<script setup>

import { useRuntimeConfig } from '#app'
definePageMeta({
  layout: 'auth',
  access: 'seller',
  isPrivateRoute: true
})

const activeTab = ref('in')
const actionLoading = ref(null)
const config = useRuntimeConfig()
const { $toast } = useNuxtApp()
/* =========================
   SSR FETCH (FIXED)
========================= */
const { data } = await useAsyncData(
  'inspection-ssr',
  async () => {
    const [inRes, outRes] = await Promise.all([
      useApiFetch('/inspection/in'),
      useApiFetch('/inspection/out')
    ])

    
    return {
      inInspections: inRes.data.inspections || [],
      outInspections: outRes.data.data || []
    }
  }
)
console.log(data,'dfgfgf dfdfgd fdgdf the nan');

/* =========================
   COMPUTED LIST (SAFE)
========================= */
const inspections = computed(() => {
  if (!data.value) return []

  return activeTab.value === 'in'
    ? data.value.inInspections
    : data.value.outInspections
})

/* =========================
   SWITCH TAB
========================= */
const changeTab = (tab) => {
  activeTab.value = tab
}

/* =========================
   PERSON
========================= */
const person = (item) => {
  return activeTab.value === 'in'
    ? item.buyer || {}
    : item.seller || {}
}

const fullName = (user) => {
  return `${user.firstName || ''} ${user.lastName || ''}`
}

/* =========================
   UPDATE STATUS
========================= */


const updateStatus = async (id, status) => {
  try {
    actionLoading.value = `${id}-${status}`

    const res = await useApiFetch(
      `/inspection/${id}/status`,
      {
        method: 'PATCH',
        body: { status }
      }
    )

    if (res.success) {
      $toast.success(`Inspection ${status}`)

      const target =
        activeTab.value === 'in'
          ? data.value.inInspections
          : data.value.outInspections

      const item = target.find(
        i => i._id === id
      )

      if (item) {
        item.status = status
      }
    }

  } catch (err) {
    $toast.error(
      err?.message || 'Failed to update'
    )
  } finally {
    actionLoading.value = null
  }
}

/* =========================
   HELPERS
========================= */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const statusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700'
    case 'approved':
      return 'bg-green-100 text-green-700'
    case 'rejected':
      return 'bg-red-100 text-red-700'
    case 'completed':
      return 'bg-blue-100 text-blue-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
</script>
