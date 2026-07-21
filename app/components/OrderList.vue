<template>
  <!-- Orders -->
  <section class="w-full rounded-lg bg-whe mb-10 p-1 md:p-4">

    <!-- Header -->
    <div
      class="w-full py-3 border-b flex flex-wrap gap-3 justify-between items-center mb-4"
    >
      <div>
        <h3 class="text-sm font-semibold">
          My Orders
        </h3>

        <p class="text-sm text-slate-500">
          Track your property orders and payment progress.
        </p>
      </div>

      <!-- Total Orders -->
      <div class="bg-slate-100 rounded-lg px-4 py-2">
        <p class="text-xs text-slate-500">
          Total Orders
        </p>

        <p class="font-bold text-sm">
          {{ orders.length }}
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-2 mb-5">

      <button
        @click="activeFilter = 'all'"
        :class="
          activeFilter === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-100 text-slate-700'
        "
        class="px-4 py-2 rounded-lg text-sm font-medium"
      >
        All
      </button>

      <button
        @click="activeFilter = 'PENDING'"
        :class="
          activeFilter === 'PENDING'
            ? 'bg-yellow-500 text-white'
            : 'bg-slate-100 text-slate-700'
        "
        class="px-4 py-2 rounded-lg text-sm font-medium"
      >
        Pending
      </button>

      <button
        @click="activeFilter = 'ACTIVE'"
        :class="
          activeFilter === 'ACTIVE'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-100 text-slate-700'
        "
        class="px-4 py-2 rounded-lg text-sm font-medium"
      >
        Active
      </button>

      <button
        @click="activeFilter = 'COMPLETED'"
        :class="
          activeFilter === 'COMPLETED'
            ? 'bg-green-600 text-white'
            : 'bg-slate-100 text-slate-700'
        "
        class="px-4 py-2 rounded-lg text-sm font-medium"
      >
        Completed
      </button>

    </div>

    <!-- Loading -->
    <div
      v-if="pending"
      class="space-y-4"
    >
      <div
        v-for="item in 5"
        :key="item"
        class="h-40 rounded-xl bg-slate-100 animate-pulse"
      />
    </div>

    <!-- Orders -->
    <div
      v-else-if="filteredOrders.length"
      class="space-y-4 overflow-hidden "
    >

      <div
        v-for="order in filteredOrders"
        :key="order._id"
        class="border rounded-sm overflow-hidden  bg-white sm: p-2 sm:p-4 hover:shadow-md transition"
      >

        <!-- Top -->
        <div
        class="flex flex-wrap justify-between gap-3 border-b p-3"
        >
        <!-- Property -->
        <div class="min-w-0 flex-1">
            <p class="text-xs text-slate-500">
            Property
            </p>

            <p class="font-semibold text-[12px] sm:text-sm truncate">
            {{ order.property?.title || "Property" }}
            </p>
        </div>

        <!-- Order Status -->
        <span
            class="px-3 py-1 rounded-full  lowercase   sm:text-xs text-[10px]  font-semibold h-fit shrink-0"
            :class="orderStatusClass(order.orderStatus)"
        >
            {{ order?.escrowStatus.replace('_', ' ') }}
        </span>
        </div>

        <!-- Payment Summary -->
        <div class="grid grid-cols-2  md:grid-cols-4 gap-1 py-4">

          <!-- Total -->
          <div>
            <p class=" sm:text-xs text-[12px] text-slate-500">
              Total Amount
            </p>

            <p class="font-bold sm:text-xs text-[12px] text-slate-900">
              {{ formatMoney(order.totalAmount) }}
            </p>
          </div>

          <!-- Paid -->
          <div>
            <p class=" sm:text-xs text-[12px] text-slate-500">
              Amount Paid
            </p>

            <p class="font-bold sm:text-xs text-[12px] text-green-600"> {{}}
              {{ formatMoney(order.escrowAmount || order.amountPaid) }}
            </p>
          </div>

          <!-- Remaining -->
          <div>
            <p class="sm:text-xs text-[12px] text-slate-500">
              Remaining
            </p>

            <p class="font-bold  sm:text-xs text-[13px] text-orange-600">
              {{ formatMoney(order.remainingAmount) }} 
            </p>
          </div>

          <!-- Escrow -->
          <div class=" hidden ">
            <p class="text-xs text-slate-500">
              Escrow
            </p>

            <span
              class="inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold"
              :class="escrowStatusClass(order.escrowStatus)"
            >
              {{ order.escrowStatus }}
            </span>
          </div>

        </div>

        <!-- Progress -->
        <div class="mt-2  ">

          <div class="flex justify-between mb-1">

            <span class="text-sm font-medium">
              Payment Progress
            </span>

            <span class="text-sm font-bold hidden  text-blue-600">
              {{ getPaymentPercentage(order) }}%
            </span>

          </div>

          <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

            <div
              class="h-full bg-blue-600 rounded-full transition-all duration-500"
              :style="{
                width: `${getPaymentPercentage(order)}%`
              }"
            />

          </div>

        </div>

        <!-- Bottom -->
        <div
          class="flex flex-wrap justify-between items-center gap-3 mt pt-3 border-t"
        >

          <div class="text-xs text-slate-500">

            <span>
              Paid:
              {{ formatMoney(order.escrowAmount || order.amountPaid) }}
            </span>

            <span class="mx-2">
              •
            </span>

            <span>
              Created:
              {{ timeAgo(order.createdAt) }}
            </span>

          </div>

          <button
            @click="viewOrder(order)"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
          >
           {{loading?"loading...." :"View Order" }}
          </button>

        </div>

      </div>

    </div>

    <!-- Empty -->
    <div
      v-else
      class="py-16 text-center"
    >
      <div class="text-4xl mb-3">
        📦
      </div>

      <h3 class="font-semibold text-lg">
        No orders found
      </h3>

      <p class="text-sm text-slate-500 mt-1">
        You don't have any orders in this category.
      </p>
    </div>

  </section>
</template>


<script setup>
const { timeAgo } = useTimeAgo()
import {
  ref,
  computed
} from "vue"


/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/
const loading = ref(false)
const activeFilter = ref("all")


/*
|--------------------------------------------------------------------------
| Fetch Orders
|--------------------------------------------------------------------------
*/

const {
  data,
  pending,
  refresh,
  error
} = await useAsyncData(
  "my-orders",

  async () => {

    const response = await useApiFetch(
      "/order"
    )

    if (!response.success) {
      throw createError({
        statusCode: 500,
        statusMessage: response.message
      })
    }

    return response.data

  }
)


/*
|--------------------------------------------------------------------------
| Orders
|--------------------------------------------------------------------------
*/

const orders = computed(() => {

  return data.value?.orders || []

})


/*
|--------------------------------------------------------------------------
| Filter Orders
|--------------------------------------------------------------------------
*/

const filteredOrders = computed(() => {

  if (activeFilter.value === "all") {

    return orders.value.slice(0, 4)

  }

  return orders.value.slice(0, 5).filter(
    order =>
      order.orderStatus === activeFilter.value
  )

})


/*
|--------------------------------------------------------------------------
| Payment Percentage
|--------------------------------------------------------------------------
*/

const getPaymentPercentage = (order) => {

  const total = Number(order.totalAmount || 0)

const paid = Number(
  order.escrowAmount || order.amountPaid || 0
)

  if (!total) {

    return 0

  }

  const percentage =
    (paid / total) * 100

  return Math.min(
    Math.round(percentage),
    100
  )

}


/*
|--------------------------------------------------------------------------
| Format Money
|--------------------------------------------------------------------------
*/

const formatMoney = (amount) => {

  return `₦${Number(
    amount/100 || 0
  ).toLocaleString("en-NG")}`

}


/*
|--------------------------------------------------------------------------
| Format Date
|--------------------------------------------------------------------------
*/

const formatDate = (date) => {

  if (!date) {

    return "-"

  }

  return new Date(
    date
  ).toLocaleDateString(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  )

}


/*
|--------------------------------------------------------------------------
| Order Status
|--------------------------------------------------------------------------
*/

const orderStatusClass = (status) => {

  return {

    "bg-yellow-100 text-yellow-700":
      status === "PENDING",

    "bg-blue-100 text-blue-700":
      status === "ACTIVE",

    "bg-green-100 text-green-700":
      status === "PAID" ||
      status === "COMPLETED",

    "bg-red-100 text-red-700":
      status === "CANCELLED" ||
      status === "EXPIRED"

  }

}


/*
|--------------------------------------------------------------------------
| Escrow Status
|--------------------------------------------------------------------------
*/

const escrowStatusClass = (status) => {

  return {

    "bg-slate-100 text-slate-700":
      status === "NOT_FUNDED",

    "bg-yellow-100 text-yellow-700":
      status === "PARTIALLY_FUNDED" ||
      status === "HELD" ||
      status === "RELEASE_PENDING" ||
      status === "REFUND_PENDING",

    "bg-green-100 text-green-700":
      status === "FUNDED" ||
      status === "RELEASED",

    "bg-blue-100 text-blue-700":
      status === "PARTIALLY_RELEASED",

    "bg-red-100 text-red-700":
      status === "CANCELLED" ||
      status === "REFUNDED"

  }

}


/*
|--------------------------------------------------------------------------
| View Order
|--------------------------------------------------------------------------
*/

const viewOrder = (order) => {
    loading.value = true
  console.log(
    "Selected order:",
    order
  )

  // Example:
  navigateTo(`/property/payment/${order.property._id}`)

}

</script>