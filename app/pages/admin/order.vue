<template>
  <div class="space-y-6 text-black">
                  <AdminEscrow 
                   v-if="showOrderModal"
                    :order="selectedOrder"
                    @close="closeOrder"
                    />
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">
          Bank Account Verification
        </h1>

        <p class="text-sm text-slate-500 mt-1">
          Review and approve users' withdrawal bank accounts.
        </p>
      </div>

      <div class="flex gap-3">

        <div class="rounded-lg border bg-white px-4 py-3 text-center">
          <p class="text-xs text-slate-500">Pending</p>
          <p class="text-xl font-bold text-amber-600">
            {{ pendingCount }}
          </p>
        </div>

        <div class="rounded-lg border bg-white px-4 py-3 text-center">
          <p class="text-xs text-slate-500">Verified</p>
          <p class="text-xl font-bold text-green-600">
            {{ verifiedCount }}
          </p>
        </div>

      </div>
    </div>

    <!-- Search -->

    <div class="rounded-xl border bg-white p-4">

      <input
        v-model="search"
        placeholder="Search user..."
        class="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-500"
      >

    </div>

    <!-- Table -->

    <div class="  overflow-scroll rounded-xl border bg-white">

     <table class="w-full  overflow-x-auto">
        <thead class="bg-slate-50">
            <tr>
            <th class="px-6 py-4">Order</th>
            <th class="px-6 py-4">Buyer</th>
            <th class="px-6 py-4">Property</th>
            <th class="px-6 py-4">Amount</th>
            <th class="px-6 py-4">Payment</th>
            <th class="px-6 py-4">Escrow</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-right">
                Action
            </th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="order in filteredOrders"
            :key="order._id"
            class="border-t hover:bg-slate-50"
            >
            <td class="px-6 py-4">
                <div class="font-semibold">
                {{ order.orderNumber }}
                </div>

                <div class="text-xs text-slate-500">
                {{ formatDate(order.createdAt) }}
                </div>
            </td>

            <td class="px-6 py-4">
                <div class="font-semibold">
                {{ order.buyer.firstName }}
                {{ order.buyer.lastName }}
                </div>

                <div class="text-sm text-slate-500">
                {{ order.buyer.email }}
                </div>
            </td>

            <td class="px-6 py-4">
                {{ order.property.title }}
            </td>

            <td class="px-6 py-4">
                ₦{{ formatMoney(order.totalAmount) }}
            </td>

            <td class="px-6 py-4">
                <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :class="paymentClass(order.paymentStatus)"
                >
                {{ order.paymentStatus }}
                </span>
            </td>

            <td class="px-6 py-4">
                <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :class="escrowClass(order.escrowStatus)"
                >
                {{ order.escrowStatus }}
                </span>
            </td>

            <td class="px-6 py-4">
                <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :class="statusClass(order.orderStatus)"
                >
                {{ order.orderStatus }}
                </span>
            </td>

            <td class="px-6 py-4 text-right">
                <button
                class="rounded-lg bg-green-600 px-4 py-2 text-white"
                @click="openOrder(order)"
                >
                View
                </button>
            </td>
            </tr>

            <tr v-if="filteredOrders.length === 0">
            <td
                colspan="8"
                class="py-16 text-center text-slate-500"
            >
                No orders found.
            </td>
            </tr>
        </tbody>
    </table>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

// definePageMeta({
//   layout: "admin",
//   adminOnly: true,
// })

const search = ref("")
const orders = ref([])

const pendingCount = computed(() =>
  orders.value.filter(order => order.orderStatus === "PENDING").length
)

const activeCount = computed(() =>
  orders.value.filter(order => order.orderStatus === "ACTIVE").length
)

const completedCount = computed(() =>
  orders.value.filter(order => order.orderStatus === "COMPLETED").length
)

const filteredOrders = computed(() => {
  if (!search.value) return orders.value

  const keyword = search.value.toLowerCase()

  return orders.value.filter(order =>
    order.orderNumber?.toLowerCase().includes(keyword) ||
    order.buyer?.firstName?.toLowerCase().includes(keyword) ||
    order.buyer?.lastName?.toLowerCase().includes(keyword) ||
    order.buyer?.email?.toLowerCase().includes(keyword) ||
    order.seller?.firstName?.toLowerCase().includes(keyword) ||
    order.seller?.lastName?.toLowerCase().includes(keyword) ||
    order.property?.title?.toLowerCase().includes(keyword)
  )
})

const loadOrders = async () => {
  try {
    const res = await useApiFetch("/order/admin/orders")

    console.log(res.data)

    orders.value = res.data?.orders || []
  } catch (error) {
    console.error(error)
  }
}

const showOrderModal = ref(false)
const selectedOrderId = ref(null)

const selectedOrder = ref(null)


const openOrder = (order) => {
  selectedOrder.value = order
  showOrderModal.value = true
}

const closeOrder = () => {
  showOrderModal.value = false
  selectedOrder.value = null
}

const formatMoney = (amount) => {
  return Number(amount || 0).toLocaleString("en-NG")
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const paymentClass = (status) => ({
  "bg-red-100 text-red-700": status === "UNPAID",
  "bg-yellow-100 text-yellow-700": status === "PARTIALLY_PAID",
  "bg-green-100 text-green-700": status === "FULLY_PAID",
  "bg-blue-100 text-blue-700": status === "OVERPAID",
  "bg-gray-100 text-gray-700": status === "REFUNDED",
})

const escrowClass = (status) => ({
  "bg-gray-100 text-gray-700": status === "NOT_FUNDED",
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
    status === "REFUNDED",
})

const statusClass = (status) => ({
  "bg-yellow-100 text-yellow-700": status === "PENDING",
  "bg-blue-100 text-blue-700": status === "ACTIVE",
  "bg-green-100 text-green-700":
    status === "PAID" ||
    status === "COMPLETED",
  "bg-red-100 text-red-700":
    status === "CANCELLED" ||
    status === "EXPIRED",
})
loadOrders()
// onMounted(loadOrders)
</script>