<template>

  <!-- Floating Wallet -->
  <div class="fixed bottom-0 right-0 z-[100]">

    <!-- Floating Button -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >

      <button
        v-if="!open"
        @click="open = true"
        class="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-green-300"
      >

        <Icon
          name="lucide:wallet"
          class="h-8 w-8"
        />

        <!-- Notification -->
        <span
          class="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
        >
          {{ notifications }}
        </span>

        <!-- Ping -->
        <span
          class="absolute inset-0 animate-ping rounded-2xl bg-green-500 opacity-20"
        />

      </button>

    </Transition>

    <!-- Wallet Card -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-6 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-6 scale-95"
    >

      <div
        v-if="open"
        class="w-[390px] overflow-hidden rounded-3xl border border-white/30 bg-white shadow-[0_30px_80px_rgba(0,0,0,.18)] backdrop-blur-xl"
      >

        <!-- Header -->
        <div
          class="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 p-6 text-white"
        >

          <!-- Decorative -->
          <div
            class="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10"
          />

          <div
            class="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/10"
          />

          <!-- Close -->
          <button
            @click="open=false"
            class="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 transition hover:bg-white/25"
          >
            <Icon
              name="lucide:x"
              class="h-5 w-5"
            />
          </button>

          <div class="relative">

            <div class="flex items-center gap-3">

              <div
                class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20"
              >
                <Icon
                  name="lucide:wallet"
                  class="h-8 w-8"
                />
              </div>

              <div>

                <p class="text-sm text-green-100">
                  Wallet Balance
                </p>

                <h2 class="mt-1 text-3xl font-bold">
                  {{ formatMoney(balance) }}
                </h2>

              </div>

            </div>

            <div class="mt-6 flex items-center justify-between">

              <div>

                <p class="text-xs text-green-100">
                  Wallet Status
                </p>

                <div
                  class="mt-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1"
                >

                  <span
                    class="h-2 w-2 rounded-full bg-green-300"
                  />

                  <span class="text-xs font-medium">
                    Active
                  </span>

                </div>

              </div>

              <div class="text-right">

                <p class="text-xs text-green-100">
                  Currency
                </p>

                <p class="mt-2 font-semibold">
                  NGN
                </p>

              </div>

            </div>

          </div>

        </div>

        <!-- Body -->
        <div class="p-6">

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 gap-4">

            <div
              class="rounded-2xl border bg-green-50 p-4"
            >

              <div class="flex items-center justify-between">

                <p class="text-sm text-gray-500">
                  Incoming
                </p>

                <Icon
                  name="lucide:arrow-down-left"
                  class="h-5 w-5 text-green-600"
                />

              </div>

              <h3
                class="mt-3 text-2xl font-bold text-green-700"
              >
                {{ incoming }}
              </h3>

            </div>

            <div
              class="rounded-2xl border bg-red-50 p-4"
            >

              <div class="flex items-center justify-between">

                <p class="text-sm text-gray-500">
                  Outgoing
                </p>

                <Icon
                  name="lucide:arrow-up-right"
                  class="h-5 w-5 text-red-500"
                />

              </div>

              <h3
                class="mt-3 text-2xl font-bold text-red-500"
              >
                {{ outgoing }}
              </h3>

            </div>

          </div>

          <!-- Quick Actions -->
          <div class="mt-6">

            <div
              class="grid grid-cols-4 gap-3"
            >

              <button
                class="flex flex-col items-center gap-2 rounded-2xl border p-4 transition hover:border-green-300 hover:bg-green-50"
              >

                <div
                  class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100"
                >
                  <Icon
                    name="lucide:plus"
                    class="h-6 w-6 text-green-600"
                  />
                </div>

                <span class="text-xs font-medium">
                  Deposit
                </span>

              </button>

              <button
                class="flex flex-col items-center gap-2 rounded-2xl border p-4 transition hover:border-blue-300 hover:bg-blue-50"
              >

                <div
                  class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100"
                >
                  <Icon
                    name="lucide:send"
                    class="h-6 w-6 text-blue-600"
                  />
                </div>

                <span class="text-xs font-medium">
                  Transfer
                </span>

              </button>

              <button
                class="flex flex-col items-center gap-2 rounded-2xl border p-4 transition hover:border-orange-300 hover:bg-orange-50"
              >

                <div
                  class="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100"
                >
                  <Icon
                    name="lucide:history"
                    class="h-6 w-6 text-orange-500"
                  />
                </div>

                <span class="text-xs font-medium">
                  History
                </span>

              </button>

              <button
                class="flex flex-col items-center gap-2 rounded-2xl border p-4 transition hover:border-purple-300 hover:bg-purple-50"
              >

                <div
                  class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100"
                >
                  <Icon
                    name="lucide:settings"
                    class="h-6 w-6 text-purple-600"
                  />
                </div>

                <span class="text-xs font-medium">
                  Settings
                </span>

              </button>

            </div>

          </div>

          <!-- Divider -->
          <div class="my-6 border-t"></div>

          <!-- Recent Transactions -->
          <div>

            <div
              class="mb-4 flex items-center justify-between"
            >

              <h3
                class="text-lg font-semibold text-gray-800"
              >
                Recent Activity
              </h3>

              <button
                class="text-sm font-medium text-green-600 hover:underline"
              >
                View all
              </button>

            </div>

            <div class="space-y-3">

              <div
                v-for="item in transactions"
                :key="item.id"
                class="flex items-center justify-between rounded-2xl border p-3 transition hover:bg-gray-50"
              >

                <div class="flex items-center gap-3">

                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-xl"
                    :class="item.type==='credit'
                      ? 'bg-green-100'
                      : 'bg-red-100'"
                  >

                    <Icon
                      :name="item.type==='credit'
                        ? 'lucide:arrow-down-left'
                        : 'lucide:arrow-up-right'"
                      class="h-6 w-6"
                      :class="item.type==='credit'
                        ? 'text-green-600'
                        : 'text-red-500'"
                    />

                  </div>

                  <div>

                    <h4
                      class="font-medium text-gray-800"
                    >
                      {{ item.title }}
                    </h4>

                    <p
                      class="text-xs text-gray-400"
                    >
                      {{ item.date }}
                    </p>

                  </div>

                </div>

                <div class="text-right">

                  <p
                    class="font-semibold"
                    :class="item.type==='credit'
                      ? 'text-green-600'
                      : 'text-red-500'"
                  >
                    {{ item.amount }}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Transition>

  </div>

</template>

<script setup>
import { ref, computed } from "vue"

/* ===========================================
STATE
=========================================== */

const open = ref(false)

const notifications = ref(3)

const wallet = ref({
  balance: 28500000, // Kobo
  currency: "NGN",
  status: "ACTIVE"
})

/* ===========================================
SUMMARY
=========================================== */

const incoming = ref(15400000)

const outgoing = ref(9800000)

/* ===========================================
RECENT TRANSACTIONS
=========================================== */

const transactions = ref([
  {
    id: 1,
    title: "Escrow Deposit",
    amount: 2500000,
    date: "Today • 10:25 AM",
    type: "credit"
  },
  {
    id: 2,
    title: "Funds Released",
    amount: 1200000,
    date: "Yesterday",
    type: "debit"
  },
  {
    id: 3,
    title: "Refund Processed",
    amount: 350000,
    date: "2 days ago",
    type: "credit"
  },
  {
    id: 4,
    title: "Withdrawal",
    amount: 600000,
    date: "3 days ago",
    type: "debit"
  }
])

/* ===========================================
COMPUTED
=========================================== */

const balance = computed(() => wallet.value.balance)

const walletStatusColor = computed(() => {
  switch (wallet.value.status) {
    case "ACTIVE":
      return "bg-green-500"

    case "SUSPENDED":
      return "bg-red-500"

    case "PENDING":
      return "bg-yellow-500"

    default:
      return "bg-gray-400"
  }
})

const hasTransactions = computed(() => {
  return transactions.value.length > 0
})

/* ===========================================
FORMATTERS
=========================================== */

const formatMoney = value => {
  return (Number(value || 0) / 100).toLocaleString(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2
    }
  )
}

/* ===========================================
QUICK ACTIONS
=========================================== */

const deposit = () => {
  console.log("Deposit")
}

const transfer = () => {
  console.log("Transfer")
}

const openHistory = () => {
  console.log("History")
}

const openSettings = () => {
  console.log("Settings")
}

const viewAllTransactions = () => {
  console.log("View All")
}

/* ===========================================
TRANSACTION CLICK
=========================================== */

const openTransaction = transaction => {
  console.log(transaction)
}

/* ===========================================
WALLET
=========================================== */

const toggleWallet = () => {
  open.value = !open.value
}

const closeWallet = () => {
  open.value = false
}

/* ===========================================
SIMULATE LIVE UPDATE
(Delete this when connecting API)
=========================================== */

// Example:
//
// const { data } = await useAsyncData(
//   "wallet",
//   () => useApiFetch("/wallet")
// )
//
// watch(data, () => {
//   wallet.value = data.value.wallet
//   transactions.value = data.value.transactions
// })

</script>