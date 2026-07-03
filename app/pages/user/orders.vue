<!-- pages/dashboard/analytics.vue -->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div
      class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h1 class="text-4xl font-bold text-gray-900">
          Orders Analytics
        </h1>

        <p class="mt-2 text-gray-500">
          Track your property sales, rentals, and performance insights.
        </p>
      </div>

      <div
        class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
      >
        <Icon name="lucide:calendar-days" class="h-5 w-5 text-gray-500" />

        <span class="text-sm font-medium text-gray-700">
          Apr 11 - May 10, 2026
        </span>

        <Icon name="lucide:chevron-down" class="h-4 w-4 text-gray-400" />
      </div>
    </div>

    <!-- Tabs -->
    <div
      class="mb-8 flex flex-wrap items-center gap-8 border-b border-gray-200"
    >
      <button
        v-for="tab in tabs"
        :key="tab"
        class="border-b-2 pb-4 text-sm font-semibold transition"
        :class="
          activeTab === tab
            ? 'border-green-600 text-green-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        "
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Stats -->
    <div
      class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5"
    >
      <div
        v-for="item in stats"
        :key="item.title"
        class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full"
            :class="item.bg"
          >
            <Icon
              :name="item.icon"
              class="h-7 w-7"
              :class="item.color"
            />
          </div>

          <Icon
            name="lucide:help-circle"
            class="h-4 w-4 text-gray-400"
          />
        </div>

        <div class="mt-5">
          <p class="text-sm text-gray-500">
            {{ item.title }}
          </p>

          <h2 class="mt-2 text-4xl font-bold" :class="item.color">
            {{ item.value }}
          </h2>

          <p class="mt-2 text-sm font-medium text-green-600">
            {{ item.change }}
          </p>
        </div>
      </div>
    </div>

    <!-- Overview Chart -->
    <div
      class="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div
        class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            Overview
          </h2>

          <div class="mt-4 flex flex-wrap gap-6">
            <div
              v-for="legend in legends"
              :key="legend.label"
              class="flex items-center gap-2"
            >
              <span
                class="h-3 w-3 rounded-full"
                :class="legend.dot"
              />

              <span class="text-sm font-medium text-gray-600">
                {{ legend.label }}
              </span>

              <span class="font-bold text-gray-900">
                {{ legend.value }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3"
        >
          <span class="text-sm font-medium text-gray-700">
            Last 30 days
          </span>

          <Icon
            name="lucide:chevron-down"
            class="h-4 w-4 text-gray-400"
          />
        </div>
      </div>

      <!-- Fake chart -->
      <div
        class="relative h-[420px] overflow-hidden rounded-2xl bg-gradient-to-b from-green-50 to-white"
      >
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:80px_80px]"
        />

        <!-- Green -->
        <svg
          class="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
        >
          <path
            d="M0,260
            C80,240 120,180 180,200
            C240,220 300,100 360,160
            C420,220 520,180 580,170
            C640,160 700,200 760,180
            C820,160 900,100 1000,60"
            fill="none"
            stroke="#10b981"
            stroke-width="4"
          />
        </svg>

        <!-- Blue -->
        <svg
          class="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
        >
          <path
            d="M0,300
            C100,270 180,250 240,260
            C320,270 380,240 460,250
            C520,260 620,280 700,260
            C800,240 900,260 1000,220"
            fill="none"
            stroke="#3b82f6"
            stroke-width="4"
          />
        </svg>
      </div>
    </div>

    <!-- Bottom cards -->
    <div class="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
      <!-- Sales -->
      <div
        class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">
            Sales Overview
          </h3>

          <button class="text-sm font-semibold text-green-600">
            View all
          </button>
        </div>

        <div class="space-y-5">
          <div
            v-for="sale in salesOverview"
            :key="sale.label"
            class="flex items-center justify-between"
          >
            <span class="text-gray-500">
              {{ sale.label }}
            </span>

            <div class="text-right">
              <div class="font-bold text-gray-900">
                {{ sale.value }}
              </div>

              <div class="text-sm text-green-600">
                {{ sale.change }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rentals -->
      <div
        class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">
            Rentals Overview
          </h3>

          <button class="text-sm font-semibold text-green-600">
            View all
          </button>
        </div>

        <div class="space-y-5">
          <div
            v-for="rent in rentalsOverview"
            :key="rent.label"
            class="flex items-center justify-between"
          >
            <span class="text-gray-500">
              {{ rent.label }}
            </span>

            <div class="text-right">
              <div class="font-bold text-gray-900">
                {{ rent.value }}
              </div>

              <div class="text-sm text-green-600">
                {{ rent.change }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Properties -->
      <div
        class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">
            Top Performing Properties
          </h3>

          <button class="text-sm font-semibold text-green-600">
            View all
          </button>
        </div>

        <div class="space-y-5">
          <div
            v-for="property in properties"
            :key="property.name"
            class="flex items-center gap-4"
          >
            <img
              :src="property.image"
              class="h-16 w-20 rounded-xl object-cover"
            />

            <div class="flex-1">
              <h4 class="font-semibold text-gray-900">
                {{ property.name }}
              </h4>

              <p class="text-sm text-gray-500">
                {{ property.price }}
              </p>
            </div>

            <span
              class="rounded-full px-3 py-1 text-xs font-bold"
              :class="
                property.status === 'Sold'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              "
            >
              {{ property.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity -->
    <div
      class="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div class="mb-6 flex items-center justify-between">
        <h3 class="text-2xl font-bold text-gray-900">
          Recent Activity
        </h3>

        <button class="text-sm font-semibold text-green-600">
          View all
        </button>
      </div>

      <div
        class="grid grid-cols-1 gap-6 lg:grid-cols-4"
      >
        <div
          v-for="activity in activities"
          :key="activity.title"
          class="flex items-start gap-4 rounded-2xl bg-gray-50 p-4"
        >
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full"
            :class="activity.bg"
          >
            <Icon
              :name="activity.icon"
              class="h-6 w-6"
              :class="activity.color"
            />
          </div>

          <div>
            <p class="text-sm text-gray-500">
              {{ activity.type }}
            </p>

            <h4 class="mt-1 font-bold text-gray-900">
              {{ activity.title }}
            </h4>

            <p class="mt-1 text-sm text-gray-500">
              {{ activity.amount }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div > 
       <!-- <OverlayMaintanance />  -->
    </div>
     
    
  </div>
</template>

<script setup>
const activeTab = ref("Overview")

definePageMeta({
  layout: 'auth',
  access: 'seller',
   sellerOnly: true
})
const tabs = [
  "Overview",
  "Sales",
  "Rentals",
  "Properties",
  "Leads",
  "Reports"
]

const stats = [
  {
    title: "Total Earnings",
    value: "$24,680",
    change: "+12.5% vs previous month",
    icon: "lucide:badge-dollar-sign",
    color: "text-green-600",
    bg: "bg-green-100"
  },
  {
    title: "Sales Earnings",
    value: "$16,420",
    change: "+10.3% vs previous month",
    icon: "lucide:shopping-cart",
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    title: "Rental Earnings",
    value: "$8,260",
    change: "+15.7% vs previous month",
    icon: "lucide:key-round",
    color: "text-orange-500",
    bg: "bg-orange-100"
  },
  {
    title: "Properties Listed",
    value: "28",
    change: "+4 new properties",
    icon: "lucide:building-2",
    color: "text-purple-600",
    bg: "bg-purple-100"
  },
  {
    title: "Total Views",
    value: "12,456",
    change: "+8.2% this month",
    icon: "lucide:eye",
    color: "text-cyan-600",
    bg: "bg-cyan-100"
  }
]

const legends = [
  {
    label: "Sales Earnings",
    value: "$16,420",
    dot: "bg-green-500"
  },
  {
    label: "Rental Earnings",
    value: "$8,260",
    dot: "bg-blue-500"
  },
  {
    label: "Sold Properties",
    value: "8",
    dot: "bg-violet-500"
  },
  {
    label: "Rented Properties",
    value: "12",
    dot: "bg-orange-500"
  }
]

const salesOverview = [
  {
    label: "Total Sales",
    value: "$16,420",
    change: "+10.3%"
  },
  {
    label: "Properties Sold",
    value: "8",
    change: "+5.0%"
  },
  {
    label: "Avg. Sale Price",
    value: "$205,250",
    change: "+7.6%"
  },
  {
    label: "New Sales Listings",
    value: "14",
    change: "+16.7%"
  }
]

const rentalsOverview = [
  {
    label: "Total Rental Income",
    value: "$8,260",
    change: "+15.7%"
  },
  {
    label: "Properties Rented",
    value: "12",
    change: "+20%"
  },
  {
    label: "Avg. Monthly Rent",
    value: "$688",
    change: "+6.3%"
  },
  {
    label: "Occupancy Rate",
    value: "92%",
    change: "+3.2%"
  }
]

const properties = [
  {
    name: "Luxury Villa in Downtown",
    price: "$850,000",
    status: "Sold",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200"
  },
  {
    name: "Modern Apartment",
    price: "$1,200 / month",
    status: "Rented",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200"
  },
  {
    name: "Beachfront Condo",
    price: "$620,000",
    status: "Sold",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200"
  }
]

const activities = [
  {
    type: "Property Sold",
    title: "Luxury Villa in Downtown",
    amount: "$850,000 • May 5, 2026",
    icon: "lucide:shopping-cart",
    color: "text-green-600",
    bg: "bg-green-100"
  },
  {
    type: "Property Rented",
    title: "Modern Apartment",
    amount: "$1,200/month • May 1, 2026",
    icon: "lucide:key-round",
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    type: "Property Sold",
    title: "Beachfront Condo",
    amount: "$620,000 • Apr 28, 2026",
    icon: "lucide:shopping-cart",
    color: "text-green-600",
    bg: "bg-green-100"
  },
  {
    type: "Property Rented",
    title: "City Center Studio",
    amount: "$850/month • Apr 25, 2026",
    icon: "lucide:key-round",
    color: "text-blue-600",
    bg: "bg-blue-100"
  }
]
</script>