<template>
  <div class="min-h-screen bg-slate-50">

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- =========================
          Summary
      ========================== -->

      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div class="rounded-2xl bg-white border p-6 shadow-sm">
          <div class="flex items-center justify-between">

            <div>

              <p class="text-slate-500 text-sm">
                Total Orders
              </p>

              <h2 class="mt-2 text-3xl font-bold">
                {{ statistics.total }}
              </h2>

            </div>

            <div
              class="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center"
            >
              <Icon
                name="heroicons:squares-2x2"
                class="w-7 h-7 text-blue-600"
              />
            </div>

          </div>
        </div>

        <div class="rounded-2xl bg-white border p-6 shadow-sm">
          <div class="flex items-center justify-between">

            <div>

              <p class="text-slate-500 text-sm">
                Active Escrows
              </p>

              <h2 class="mt-2 text-3xl font-bold">
                {{ statistics.active }}
              </h2>

            </div>

            <div
              class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center"
            >
              <Icon
                name="heroicons:shield-check"
                class="w-7 h-7 text-green-600"
              />
            </div>

          </div>
        </div>

        <div class="rounded-2xl bg-white border p-6 shadow-sm">
          <div class="flex items-center justify-between">

            <div>

              <p class="text-slate-500 text-sm">
                Completed
              </p>

              <h2 class="mt-2 text-3xl font-bold">
                {{ statistics.completed }}
              </h2>

            </div>

            <div
              class="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center"
            >
              <Icon
                name="heroicons:check-badge"
                class="w-7 h-7 text-purple-600"
              />
            </div>

          </div>
        </div>

        <div class="rounded-2xl bg-white border p-6 shadow-sm">
          <div class="flex items-center justify-between">

            <div>

              <p class="text-slate-500 text-sm">
                Refunded
              </p>

              <h2 class="mt-2 text-3xl font-bold">
                {{ statistics.refunded }}
              </h2>

            </div>

            <div
              class="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center"
            >
              <Icon
                name="heroicons:arrow-uturn-left"
                class="w-7 h-7 text-orange-600"
              />
            </div>

          </div>
        </div>

      </div>

      <!-- =========================
            Search
      ========================== -->

      <div
        class="bg-white rounded-2xl border shadow-sm mt-8 p-6"
      >

        <div
          class="grid gap-4 lg:grid-cols-3"
        >

          <div class="relative">

            <Icon
              name="heroicons:magnifying-glass"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            />

            <input
              v-model="search"
              placeholder="Search property..."
              class="w-full h-14 rounded-xl border pl-12 pr-4 outline-none"
            />

          </div>

          <select
            v-model="status"
            class="h-14 rounded-xl border px-4"
          >

            <option value="">
              All Status
            </option>

            <option value="NOT_FUNDED">
              Not Funded
            </option>

            <option value="PARTIALLY_FUNDED">
              Partially Funded
            </option>

            <option value="FUNDED">
              Funded
            </option>

            <option value="RELEASE_PENDING">
              Release Pending
            </option>

            <option value="RELEASED">
              Released
            </option>

            <option value="REFUND_PENDING">
              Refund Pending
            </option>

            <option value="REFUNDED">
              Refunded
            </option>

          </select>

          <select
            v-model="sort"
            class="h-14 rounded-xl border px-4"
          >

            <option value="-createdAt">
              Newest First
            </option>

            <option value="createdAt">
              Oldest First
            </option>

          </select>

        </div>

      </div>

      <!-- =========================
            Loading
      ========================== -->

      <div
        v-if="pending"
        class="grid xl:grid-cols-2 gap-8 mt-8"
      >

        <div
          v-for="i in 6"
          :key="i"
          class="animate-pulse bg-white rounded-3xl border p-5"
        >

          <div class="bg-slate-200 rounded-xl h-64"></div>

          <div class="space-y-3 mt-5">

            <div class="h-6 w-3/4 bg-slate-200 rounded"></div>

            <div class="h-4 w-1/2 bg-slate-200 rounded"></div>

            <div class="h-4 w-full bg-slate-200 rounded"></div>

            <div class="h-4 w-2/3 bg-slate-200 rounded"></div>

          </div>

        </div>

      </div>

      <!-- =========================
           Empty
      ========================== -->

      <div
        v-else-if="orders.length === 0"
        class="rounded-3xl bg-white border p-20 text-center mt-8"
      >

        <div
          class="mx-auto w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center"
        >

          <Icon
            name="heroicons:home-modern"
            class="w-12 h-12 text-slate-400"
          />

        </div>

        <h2
          class="text-3xl font-bold mt-8"
        >
          No Property Orders
        </h2>

        <p
          class="text-slate-500 mt-3 max-w-lg mx-auto"
        >
          You haven't purchased any property yet.
          Browse available listings and make your
          first investment.
        </p>

        <NuxtLink
          to="/property"
          class="inline-flex mt-8 h-12 px-8 rounded-xl bg-primary text-white items-center"
        >
          Browse Properties
        </NuxtLink>

      </div>

      <!-- =========================
             Orders
      ========================== -->

      <div
        v-else
        class="grid xl:grid-cols-2 gap-8 mt-8"
      >

        <div
          v-for="order in orders"
          :key="order._id"
          class="bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-lg transition"
        >

          <!-- Image -->

          <div class="relative">

            <!-- <img
              :src="order.property.media.images[0].url"
              class="h-72 w-full object-cover"
            > -->

            <div
              class="absolute top-5 right-5"
            >
              <PropertyEscrowStatusBadge
                :status="order.escrowStatus"
              />
            </div>

          </div>

          <div class="p-6">

            <!-- title -->

            <div
              class="flex justify-between gap-5"
            >

              <div>

                <h2
                  class="text-2xl font-bold line-clamp-2"
                >
                  {{ order.property.title }}
                </h2>

                <div
                  class="flex items-center gap-2 text-slate-500 mt-2"
                >

                  <Icon
                    name="heroicons:map-pin"
                  />

                  <span>

                    {{ order.property.location.address }}

                  </span>

                </div>

              </div>

            </div>

            <!-- seller -->

            <div
              class="mt-6 flex items-center gap-4"
            >

              <img
                :src="order.seller.profileImage"
                class="w-14 h-14 rounded-full object-cover"
              >

              <div>

                <p class="font-semibold">
                  {{ order.seller.firstName }}
                  {{ order.seller.lastName }}
                </p>

                <p class="text-slate-500 text-sm">
                  Seller
                </p>

              </div>

            </div>

            <!-- payment -->

            <div class="mt-8">

              <div
                class="flex justify-between text-sm"
              >

                <span>
                  Payment Progress
                </span>

                <strong>

                  {{ order.progress }}%

                </strong>

              </div>

              <div
                class="h-3 rounded-full bg-slate-200 mt-3 overflow-hidden"
              >

                <div
                  class="h-full bg-green-500 rounded-full"
                  :style="{
                    width: order.progress + '%'
                  }"
                />

              </div>

            </div>

            <!-- Amount -->

            <div
              class="grid grid-cols-3 gap-4 mt-8"
            >

              <div>

                <p
                  class="text-xs uppercase text-slate-500"
                >
                  Paid
                </p>

                <h3 class="font-bold mt-1">
                  ₦{{ formatNaira(order.amountPaid) }}
                </h3>

              </div>

              <div>

                <p
                  class="text-xs uppercase text-slate-500"
                >
                  Remaining
                </p>

                <h3 class="font-bold mt-1">
                  ₦{{ formatNaira(order.remainingAmount) }}
                </h3>

              </div>

              <div>

                <p
                  class="text-xs uppercase text-slate-500"
                >
                  Total
                </p>

                <h3 class="font-bold mt-1">
                  ₦{{ formatNaira(order.totalAmount) }}
                </h3>

              </div>

            </div>

            <!-- footer -->

            <div
              class="flex gap-4 mt-8"
            >

              <NuxtLink
                :to="`/property/payment/${order.property.slug}`"
                class="flex-1 h-12 rounded-xl border flex items-center justify-center font-semibold"
              >
                View Order
              </NuxtLink>

              <NuxtLink
                v-if="order.remainingAmount > 0"
                :to="`/property/payment/${order.property.slug}`"
                class="flex-1 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-semibold"
              >
                Continue Payment
              </NuxtLink>

              <NuxtLink
                v-else
                :to="`/property/payment/${order.property.slug}`"
                class="flex-1 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center font-semibold"
              >
                View Details
              </NuxtLink>

            </div>

          </div>

        </div>

      </div>

      <!-- =========================
             Pagination
      ========================== -->

      <div
        v-if="orders.length"
        class="flex justify-center mt-12"
      >

        <Pagination
          v-model="page"
          :total-pages="totalPages"
        />

      </div>

    </div>

  </div>
</template>
<script setup>
import { ref, computed, watch } from "vue"

const page = ref(1)
const limit = ref(10)

const search = ref("")
const status = ref("")
const sort = ref("-createdAt")

/* ------------------------------------
Fetch Orders
------------------------------------ */

const query = computed(() => ({
  page: page.value,
  limit: limit.value,
  search: search.value,
  status: status.value,
  sort: sort.value
}))

const {
  data,
  pending,
  error,
  refresh
} = await useApiFetch("/order", {
  query: query.value
})

/* ------------------------------------
Reload Filters
------------------------------------ */

watch(
  [search, status, sort, page],
  () => refresh()
)

/* ------------------------------------
Safe API Response
------------------------------------ */

const response = computed(() => data ?? {})

 /* ------------------------------------
Orders
------------------------------------ */
console.log(response.value)
const orders = computed(() => {

  const list = response.value?.orders

  return Array.isArray(list) ? list : []
})

/* ------------------------------------
Pagination
------------------------------------ */

const pagination = computed(() => {
  return response.value?.pagination ?? {}
})

const totalPages = computed(() => {
  return Number(pagination.value?.totalPages ?? 1)
})

const totalOrders = computed(() => {
  return Number(pagination.value?.total ?? 0)
})

/* ------------------------------------
Statistics
------------------------------------ */

const statistics = computed(() => {

  const list = orders.value

  return {

    total: totalOrders.value,

    active: list.filter(order =>
      [
        "PARTIALLY_FUNDED",
        "FUNDED",
        "RELEASE_PENDING",
        "REFUND_PENDING"
      ].includes(order.escrowStatus)
    ).length,

    completed: list.filter(
      order => order.escrowStatus === "RELEASED"
    ).length,

    refunded: list.filter(
      order => order.escrowStatus === "REFUNDED"
    ).length

  }

})

/* ------------------------------------
Format Money
------------------------------------ */

const formatNaira = (value = 0) => {

  return (Number(value) / 100).toLocaleString(
    "en-NG",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  )

}

/* ------------------------------------
Progress
------------------------------------ */

const getProgress = (order = {}) => {

  const total = Number(order.totalAmount || 0)
  const paid = Number(order.amountPaid || 0)

  if (!total) return 0

  return Math.min(
    100,
    Math.round((paid / total) * 100)
  )

}

/* ------------------------------------
Orders With Progress
------------------------------------ */

const orderList = computed(() => {

  return orders.value.map(order => ({
    ...order,
    progress: getProgress(order)
  }))

})
</script>