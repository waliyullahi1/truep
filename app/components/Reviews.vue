<template>
  <div class="space-y-5">

    <!-- Summary -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">

      <div class="border rounded-xl p-5 text-center">
        <p class="text-3xl font-bold text-yellow-500">4.9</p>
        <div class="flex justify-center mt-1">
          <Icon
            v-for="i in 5"
            :key="i"
            name="heroicons:star-solid"
            class="w-4 h-4 text-yellow-400"
          />
        </div>
        <p class="text-sm text-slate-500 mt-2">
          Average Rating
        </p>
      </div>

      <div class="border rounded-xl p-5 text-center">
        <p class="text-3xl font-bold">
          28
        </p>
        <p class="text-sm text-slate-500">
          Reviews
        </p>
      </div>

      <div class="border rounded-xl p-5 text-center">
        <p class="text-3xl font-bold">
          142
        </p>
        <p class="text-sm text-slate-500">
          Properties Sold
        </p>
      </div>

      <div class="border rounded-xl p-5 text-center">
        <p class="text-3xl font-bold">
          98%
        </p>
        <p class="text-sm text-slate-500">
          Buyer Satisfaction
        </p>
      </div>

    </div>

    <!-- Reviews -->

    <div
      v-for="review in reviews"
      :key="review.id"
      class="border rounded-2xl p-6 bg-white"
    >

      <div class="flex justify-between">

        <div class="flex gap-4">

          <img
            :src="review.avatar"
            class="w-14 h-14 rounded-full object-cover"
          >

          <div>

            <div class="flex items-center gap-2">

              <h3 class="font-semibold">
                {{ review.name }}
              </h3>

              <span
                class="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs"
              >
                Verified Buyer
              </span>

            </div>

            <p class="text-sm text-slate-500">
              Purchased
              <b>{{ review.property }}</b>
            </p>

            <div class="flex items-center gap-1 mt-2">

              <Icon
                v-for="i in 5"
                :key="i"
                name="heroicons:star-solid"
                class="w-4 h-4"
                :class="
                  i <= review.rating
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                "
              />

              <span class="text-sm text-slate-500 ml-2">
                {{ review.date }}
              </span>

            </div>

          </div>

        </div>

        <div class="text-right">

          <p class="font-bold text-green-600">
            ₦{{ review.amount }}
          </p>

          <p class="text-xs text-slate-500">
            Purchase Amount
          </p>

        </div>

      </div>

      <p class="mt-5 leading-7 text-slate-700">
        {{ review.comment }}
      </p>

      <!-- Tags -->

      <div class="flex flex-wrap gap-2 mt-5">

        <span
          v-for="tag in review.tags"
          :key="tag"
          class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
        >
          {{ tag }}
        </span>

      </div>

      <!-- Footer -->

      <div
        class="border-t mt-6 pt-4 flex justify-between text-sm text-slate-500"
      >

        <div class="flex items-center gap-5">

          <span class="flex items-center gap-2">
            <Icon
              name="heroicons:home"
              class="w-4 h-4"
            />
            {{ review.propertyType }}
          </span>

          <span class="flex items-center gap-2">
            <Icon
              name="heroicons:map-pin"
              class="w-4 h-4"
            />
            {{ review.location }}
          </span>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
const reviews = [
  {
    id: 1,
    name: "Aisha Bello",
    avatar: "https://i.pravatar.cc/150?img=5",
    property: "2 Plots of Land",
    propertyType: "Land",
    amount: "8,500,000",
    rating: 5,
    date: "2 weeks ago",
    location: "Osun State",
    comment:
      "The seller was very professional from the inspection stage until ownership transfer. Documentation was complete and communication was excellent. I highly recommend this seller.",
    tags: [
      "Fast Response",
      "Verified Documents",
      "Friendly",
      "Professional"
    ]
  },

  {
    id: 2,
    name: "John Michael",
    avatar: "https://i.pravatar.cc/150?img=12",
    property: "3 Bedroom Duplex",
    propertyType: "House",
    amount: "65,000,000",
    rating: 4,
    date: "1 month ago",
    location: "Lagos",
    comment:
      "Inspection was smooth and the house matched the listing. The seller answered all my questions promptly.",
    tags: [
      "Accurate Listing",
      "Good Communication"
    ]
  },

  {
    id: 3,
    name: "Grace Samuel",
    avatar: "https://i.pravatar.cc/150?img=20",
    property: "Residential Land",
    propertyType: "Land",
    amount: "5,200,000",
    rating: 5,
    date: "3 months ago",
    location: "Abuja",
    comment:
      "One of the easiest property purchases I've made. Everything was transparent and secure through escrow.",
    tags: [
      "Secure Escrow",
      "Professional",
      "Recommended"
    ]
  }
]
</script>