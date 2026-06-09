<template>
  <div class="p-4 md:p-6 space-y-6">

    <!-- HEADER -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl md:text-2xl font-semibold">
        My Inspections
      </h1>
    </div>

    <!-- MOBILE VIEW (CARD LIST) -->
    <div class="grid gap-4 md:hidden">

      <div
        v-for="item in inspections"
        :key="item._id"
        class="bg-white shadow-sm border rounded-xl p-4 space-y-2"
      >

        <div class="flex justify-between items-center">
          <h2 class="font-semibold text-sm">
            {{ item.property.title }}
          </h2>

          <span
            class="text-xs px-2 py-1 rounded-full"
            :class="statusClass(item.status)"
          >
            {{ item.status }}
          </span>
        </div>

        <p class="text-xs text-gray-500">
          {{ item.property.location }}
        </p>

        <div class="flex justify-between text-xs text-gray-600">
          <span>{{ item.inspectionDate }}</span>
          <span>{{ item.inspectionTime }}</span>
        </div>

        <button
          class="w-full mt-2 py-2 text-sm rounded-lg bg-blue-600 text-white"
        >
          View Details
        </button>

      </div>

    </div>

    <!-- DESKTOP VIEW (TABLE) -->
    <div class="hidden md:block bg-white border rounded-xl overflow-x-auto">

      <table class="w-full text-sm">

        <thead class="bg-gray-50 text-left">
          <tr>
            <th class="p-4">Property</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th class="text-right p-4">Action</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="item in inspections"
            :key="item._id"
            class="border-t"
          >

            <td class="p-4">
              <div class="font-medium">
                {{ item.property.title }}
              </div>
              <div class="text-xs text-gray-500">
                {{ item.property.location }}
              </div>
            </td>

            <td>{{ item.inspectionDate }}</td>
            <td>{{ item.inspectionTime }}</td>

            <td>
              <span
                class="text-xs px-3 py-1 rounded-full"
                :class="statusClass(item.status)"
              >
                {{ item.status }}
              </span>
            </td>

            <td class="text-right p-4">
              <button class="text-blue-600 text-sm">
                View
              </button>
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const inspections = ref([
  {
    _id: '1',
    property: {
      title: '2 Bedroom Apartment',
      location: 'Lekki, Lagos'
    },
    inspectionDate: '2026-06-10',
    inspectionTime: '10:00 AM',
    status: 'pending'
  },
  {
    _id: '2',
    property: {
      title: 'Duplex Villa',
      location: 'Ajah, Lagos'
    },
    inspectionDate: '2026-06-12',
    inspectionTime: '2:00 PM',
    status: 'approved'
  }
])

const statusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700'
    case 'approved':
      return 'bg-green-100 text-green-700'
    case 'rejected':
      return 'bg-red-100 text-red-700'
    case 'awaiting_email_verification':
      return 'bg-blue-100 text-blue-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
</script>