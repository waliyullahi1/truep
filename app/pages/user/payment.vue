<template>
  <div class="rounded-xl border bg-white shadow-sm">
  <ContainerUser>
    <!-- ================= Header ================= -->
    <div
      class="flex flex-col gap-3 border-b px-6 py-5 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h2 class="text-xl font-bold text-gray-900">
        Payment
        </h2>

        <p class="mt-1 text-sm text-gray-500">
          View all payment transactions.
        </p>
      </div>

      <slot name="headerAction" />
    </div>

    <!-- ================= Table ================= -->

    <div class="overflow-x-auto">

      <div class="min-w-[1100px]">
            <!-- =========================
           SUMMARY CARDS
      ========================== -->
      <div  
        class="
          mb-8
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        <!-- Total Transactions -->
        <div class="rounded-xl border bg-white p-5">
          <p class="text-sm text-gray-500">
            Total Transactions
          </p>

          <h3 class="mt-2 text-2xl font-semibold">
            {{ transactions.length }}
          </h3>
        </div>

        <!-- Completed -->
        <div class="rounded-xl border bg-white p-5">
          <p class="text-sm text-gray-500">
            Completed
          </p>

          <h3
            class="
              mt-2
              text-2xl
              font-semibold
              text-green-600
            "
          >
            {{ getTransactionCount('SUCCESS') }}
          </h3>
        </div>

        <!-- Pending -->
        <div class="rounded-xl border bg-white p-5">
          <p class="text-sm text-gray-500">
            Pending
          </p>

          <h3
            class="
              mt-2
              text-2xl
              font-semibold
              text-yellow-600
            "
          >
            {{ getTransactionCount('PENDING') }}
          </h3>
        </div>

        <!-- Total Amount -->
        <div class="rounded-xl border bg-white p-5">
          <p class="text-sm text-gray-500">
            Total Amount
          </p>

          <h3 class="mt-2 text-2xl font-semibold">
            {{ formatAmount(totalAmount/100) }}
          </h3>
        </div>
      </div>

        <!-- ================= Header Row ================= -->

        <div
          class="grid grid-cols-12 gap-4 border-b bg-gray-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500"
        >
          <div class="col-span-2">
            Date
          </div>

          <div class="col-span-3">
            Property
          </div>

          <div class="col-span-2">
            Transaction
          </div>

          <div class="col-span-2">
            Customer
          </div>

          <div class="col-span-1">
            Amount
          </div>

          <div class="col-span-1">
            Status
          </div>

          <div class="col-span-1 text-right">
            Action
          </div>
        </div>

        <!-- ================= Error ================= -->

        <div
          v-if="error"
          class="p-10"
        >
          <NetworkError
            :error="error"
            @retry="$emit('retry')"
          />
        </div>

        <!-- ================= Loading ================= -->

        <div
          v-else-if="pending"
          class="divide-y"
        >
          <div
            v-for="i in 8"
            :key="i"
            class="grid grid-cols-12 gap-4 px-6 py-5 animate-pulse"
          >
            <div class="col-span-2">
              <div class="h-4 w-24 rounded bg-gray-200" />
            </div>

            <div class="col-span-3 space-y-2">
              <div class="h-4 w-44 rounded bg-gray-200" />
              <div class="h-3 w-24 rounded bg-gray-100" />
            </div>

            <div class="col-span-2">
              <div class="h-4 w-24 rounded bg-gray-200" />
            </div>

            <div class="col-span-2">
              <div class="h-4 w-36 rounded bg-gray-200" />
              <div class="mt-2 h-3 w-28 rounded bg-gray-100" />
            </div>

            <div class="col-span-1">
              <div class="h-4 w-16 rounded bg-gray-200" />
            </div>

            <div class="col-span-1">
              <div class="h-6 w-20 rounded-full bg-gray-200" />
            </div>

            <div class="col-span-1 flex justify-end">
              <div class="h-8 w-8 rounded-full bg-gray-200" />
            </div>

          </div>
        </div>

        <!-- ================= Empty ================= -->

        <div
          v-else-if="!transactions.length"
          class="flex flex-col items-center justify-center py-20"
        >
          <div
            class="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl"
          >
            💳
          </div>

          <h3 class="mt-6 text-lg font-semibold text-gray-800">
            No Transactions
          </h3>

          <p class="mt-2 text-sm text-gray-500">
            There are no transactions available.
          </p>
        </div>

        <!-- ================= Rows ================= -->

        <div
          v-else
          class="divide-y"
        >
          <div
            v-for="transaction in transactions.slice(0, 8)"
            :key="transaction._id"
            class="relative grid grid-cols-12 items-center gap-4 px-6 py-5 transition hover:bg-gray-50"
          >

            <!-- Date -->

            <div class="col-span-2">
              <p class="text-sm font-medium">
                {{ formatDate(transaction.createdAt) }}
                <br> <span class="text-xs text-gray-500">{{ formattime(transaction.createdAt) }} </span>
              </p>
            </div>

            <!-- Property -->

            <div class="col-span-3">

              <p
                class="line-clamp-1 font-semibold text-gray-800"
              >
                {{ transaction.property?.title || "-" }}
              </p>

              <p class="mt-1 text-xs text-gray-400">
                {{ transaction.property?.location?.city }},  {{ transaction.property?.location?.state }}
              </p>

            </div>

            <!-- Transaction -->

            <div class="col-span-2">

              <span
                class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
              >
                {{ formatTransactionType(transaction.purpose) }}
              </span>

            </div>

            <!-- Customer -->

            <div class="col-span-2">

              <p class="font-medium">
                {{ transaction.payer?.firstName }}
                {{ transaction.payer?.lastName }}
              </p>

              <p class="mt-1 text-xs text-gray-400">
                {{ transaction.payer?.phone ||  "UNKNOWN" }}
              </p>

            </div>

            <!-- Amount -->

            <div class="col-span-1 font-semibold">
             {{ formatAmount(transaction.paidAmount/100) }}
            </div>

            <!-- Status -->

            <div class="col-span-1">

              <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :class="paymentClass(transaction.status)"
              >
                {{ transaction.status }}
              </span>

            </div>

            <!-- Action -->

            <div class="relative col-span-1 flex justify-end">

              <button
                class="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
                @click.stop="toggleMenu(transaction._id)"
              >
                <Icon
                  name="heroicons:ellipsis-vertical"
                  class="h-5 w-5"
                />
              </button>

              <!-- Dropdown -->

              <Transition
                enter-active-class="transition duration-150"
                leave-active-class="transition duration-100"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
              >

                <div
                  v-if="openMenuId === transaction._id"
                  class="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-xl border bg-white shadow-xl"
                >

                  <button
                    class="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-gray-50"
                    @click="$emit('viewReceipt', transaction)"
                  >
                    <Icon
                      name="heroicons:document-text"
                      class="h-5 w-5"
                    />

                    View Receipt
                  </button>

                  <button
                    class="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-gray-50"
                    @click="$emit('downloadInvoice', transaction)"
                  >
                    <Icon
                      name="heroicons:arrow-down-tray"
                      class="h-5 w-5"
                    />

                    Download Invoice
                  </button>

                </div>

              </Transition>

            </div>

          </div>
        </div>

      </div>

    </div>
  </ContainerUser>
  </div>
</template>

<script setup>


const openMenuId = ref(null)
 definePageMeta({
   layout: 'auth',
   access: 'seller',
    isPrivateRoute : true
   })
/*
|--------------------------------------------------------------------------
| Fetch Transactions
|--------------------------------------------------------------------------
*/
console.log('fff');

const {
  data,
  pending,
  error,
  refresh
} = await useAsyncData(

  () => `transaction`,

  async () => {

    

const response =await useApiFetch("/payment")
   
   console.log(response);
   
    
    return response.data.data || []

  },



)

/*
|--------------------------------------------------------------------------
| Computed
|--------------------------------------------------------------------------
*/

const transactions = computed(() => {
  return data.value || []
})

/*
|--------------------------------------------------------------------------
| Dropdown
|--------------------------------------------------------------------------
*/

const toggleMenu = (id) => {

  openMenuId.value =
    openMenuId.value === id
      ? null
      : id

}

const closeMenu = () => {
  openMenuId.value = null
}

const getTransactionCount=(status)=>{


if(status==="all"){
  return transactions.value.length
  }
return transactions.value.filter(item=> item.status===status).length


}

onMounted(() => {
  window.addEventListener("click", closeMenu)
})

onUnmounted(() => {
  window.removeEventListener("click", closeMenu)
})

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const formatAmount = amount => {

  return `₦${Number(amount || 0).toLocaleString("en-NG")}`

}

const formatDate = date => {

  if (!date) return "-"

  return new Date(date).toLocaleDateString(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  )

}
const totalAmount = computed(()=>{


return transactions.value.reduce((total,item)=>{
return total + Number(item.amount || 0)},0)
})


const formattime = (date) => {
  if (!date) return "-"

  return new Date(date).toLocaleString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit", // optional
    hour12: true // false for 24-hour format
  })
}

const formatTransactionType = type => {

  const types = {
    PROPERTY_PAYMENT: "Property Payment",
    ESCROW: "Escrow Payment",
    RELEASE: "Money Released",
    REFUND: "Refund",
    WITHDRAWAL: "Withdrawal",
    DEPOSIT: "Deposit"
  }

  return types[type] || type

}

const paymentClass = status => {

  switch (status) {

    case "SUCCESSFUL":
      return "bg-green-100 text-green-700"

    case "PENDING":
      return "bg-yellow-100 text-yellow-700"

    case "FAILED":
      return "bg-red-100 text-red-700"

    case "REFUNDED":
      return "bg-orange-100 text-orange-700"

    case "RELEASED":
      return "bg-blue-100 text-blue-700"

    default:
      return "bg-gray-100 text-gray-600"

  }

}

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/


const viewReceipt = transaction => {
  console.log("View Receipt", transaction)
}

const downloadInvoice = transaction => {
  console.log("Download Invoice", transaction)
}
</script>