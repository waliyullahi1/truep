<template>
  <div class="pt-24 bg-gray-50 min-h-screen">

    <Container>
      <div class="flex flex-col lg:flex-row gap-8">

        <!-- ================= LEFT CONTENT ================= -->
        <div class="lg:w-3/5 space-y-6">

          <!-- TITLE -->
          <h1 class="text-2xl font-semibold">
            5 Bedroom Detached Duplex for Sale
          </h1>


          <!-- PROFILE -->
          <div class="flex items-center gap-3">
            <img
              src="/images/4T2A1567.png"
              class="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <p class="font-semibold">Abdul Sammad</p>

              <div class="flex items-center gap-1 text-sm">
                ⭐⭐⭐⭐⭐
                <span class="text-gray-500">4.7 (300 reviews)</span>
              </div>

              <p class="text-xs text-gray-500">
                Surveyor
                <span class="bg-green-600 text-white px-2 py-0.5 rounded ml-2 text-[11px]">
                  Verified
                </span>
              </p>
            </div>
          </div>


          <!-- IMAGE SLIDER -->
          <Images_slides />


          <!-- ================= TABS ================= -->
          <div class="bg-white rounded-xl shadow">

            <!-- Tab Buttons -->
            <div class="grid grid-cols-3 border-b">
              <button
                v-for="tab in tabs"
                :key="tab"
                @click="activeTab = tab"
                :class="[
                  'py-4 text-sm font-medium',
                  activeTab === tab
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-500'
                ]"
              >
                {{ tab }}
              </button>
            </div>

            <!-- Tab Content -->
            <div class="p-6 text-sm text-gray-700">

              <!-- DETAILS -->
              <div v-if="activeTab === 'Details'">
                <p class="mb-4">
                  Beautiful modern duplex located in Lekki with good road
                  access, security and steady electricity.
                </p>

                <ul class="space-y-2">
                  <li>📍 Lekki, Lagos</li>
                  <li>🛏 5 Bedrooms</li>
                  <li>🛁 5 Bathrooms</li>
                  <li>🚽 5 Toilets</li>
                  <li>📐 1400 sqm</li>
                </ul>
              </div>

              <!-- MAP -->
              <div v-if="activeTab === 'Map'">
                <div class="h-48 bg-gray-200 rounded flex items-center justify-center">
                  Map coming soon
                </div>
              </div>

              <!-- AREA -->
              <div v-if="activeTab === 'Area Guide'">
                <p>
                  Close to schools, shopping malls, hospital and major roads.
                  Perfect for family living.
                </p>
              </div>

            </div>
          </div>
        </div>



        <!-- ================= RIGHT SIDEBAR ================= -->
        <div class="lg:w-2/5">

          <div class="sticky top-24 bg-white rounded-xl shadow-lg p-6 space-y-5">

            <!-- PRICE -->
            <h2 class="text-2xl font-bold text-green-600">
              ₦750,000,000
            </h2> 

            <p class="text-sm text-gray-500">
              Negotiable
            </p>

            <!-- ACTION BUTTONS -->
            <div class="space-y-3">

              <button
                @click="openChat"
                class="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
              >
                Chat Agent
              </button>

              <a
                href="tel:+2348000000000"
                class="block w-full text-center border py-3 rounded-lg hover:bg-gray-50"
              >
                Call Agent
              </a>

              <button
                @click="scheduleVisit"
                class="w-full border py-3 rounded-lg hover:bg-gray-50"
              >
                Schedule Visit
              </button>

            </div>

            <!-- SMALL INFO -->
            <div class="text-xs text-gray-500 pt-4 border-t">
              Updated 18 Jan 2026
            </div>

          </div>
        </div>

      </div>
    </Container>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const tabs = ['Details', 'Map', 'Area Guide']
const activeTab = ref('Details')

const openChat = () => {
  if (window.Tawk_API) {
    window.Tawk_API.maximize()
  }
}

const scheduleVisit = () => {
  alert('Visit scheduled successfully!')
}
</script>
