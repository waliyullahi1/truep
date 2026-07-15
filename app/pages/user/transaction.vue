<template>

  <div class="min-h-screen bg-slate-50">
   <!-- {{transactions}} {{transactions.length}} -->
    <!-- ========================================================= -->
    <!-- Page Container -->
    <!-- ========================================================= -->

    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      <!-- ========================================================= -->
      <!-- Header -->
      <!-- ========================================================= -->

      <div
        class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
      >

        <div>

          <div class="flex items-center gap-3">

            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
            >
              <Icon
                name="heroicons:credit-card"
                class="h-7 w-7 text-primary"
              />
            </div>

            <div>

              <h1
                class="text-3xl font-bold tracking-tight text-slate-900"
              >
                Transaction History
              </h1>

              <p
                class="mt-1 text-[15px] text-slate-500"
              >
                Track every payment, escrow release, refund and wallet activity.
              </p>

            </div>

          </div>

        </div>

        <div
          class="flex flex-wrap items-center gap-3"
        >

          <button
            class="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
          >

            <Icon
              name="heroicons:arrow-path"
              class="h-5 w-5"
            />

            Refresh

          </button>

          <button
            class="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:opacity-90"
          >

            <Icon
              name="heroicons:arrow-down-tray"
              class="h-5 w-5"
            />

            Export

          </button>

        </div>

      </div>

      <!-- ========================================================= -->
      <!-- Statistics -->
      <!-- ========================================================= -->

      <div
        class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >

        <!-- Card -->

        <div
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          <div
            class="flex items-start justify-between"
          >

            <div>

              <p
                class="text-sm font-medium text-slate-500"
              >
                Total Transactions
              </p>

              <h2
                class="mt-3 text-4xl font-bold text-slate-900"
              >
                <!-- {{ statistics?.total  || "UNKNOWN" }} -->
              </h2>

            </div>

            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100"
            >

              <Icon
                name="heroicons:credit-card"
                class="h-7 w-7 text-blue-600"
              />

            </div>

          </div>

          <div
            class="mt-6 flex items-center gap-2 text-sm"
          >

            <Icon
              name="heroicons:arrow-trending-up"
              class="h-5 w-5 text-green-600"
            />

            <span class="font-medium text-green-600">
              +18%
            </span>

            <span class="text-slate-500">
              this month
            </span>

          </div>

        </div>

        <!-- Card -->

        <div
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          <div
            class="flex items-start justify-between"
          >

            <div>

              <p
                class="text-sm font-medium text-slate-500"
              >
                Active Escrows
              </p>

              <h2
                class="mt-3 text-4xl font-bold text-slate-900"
              >
                <!-- {{ statistics?.active  || "UNKNOWN" }} -->
              </h2>

            </div>

            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100"
            >

              <Icon
                name="heroicons:shield-check"
                class="h-7 w-7 text-amber-600"
              />

            </div>

          </div>

          <p
            class="mt-6 text-sm text-slate-500"
          >
            Waiting for buyer or admin action
          </p>

        </div>

        <!-- Card -->

        <div
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          <div
            class="flex items-start justify-between"
          >

            <div>

              <p
                class="text-sm font-medium text-slate-500"
              >
                Completed
              </p>

              <h2
                class="mt-3 text-4xl font-bold text-slate-900"
              >
                <!-- {{ statistics?.completed || "UNKNOWN" }} -->
              </h2>

            </div>

            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100"
            >

              <Icon
                name="heroicons:check-badge"
                class="h-7 w-7 text-green-600"
              />

            </div>

          </div>

          <p
            class="mt-6 text-sm text-slate-500"
          >
            Successfully completed transactions
          </p>

        </div>

        <!-- Card -->

        <div
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          <div
            class="flex items-start justify-between"
          >

            <div>

              <p
                class="text-sm font-medium text-slate-500"
              >
                Refunded
              </p>

              <h2
                class="mt-3 text-4xl font-bold text-slate-900"
              >
                {{ statistics?.refunded  || "UNKNOWN" }}
              </h2>

            </div>

            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100"
            >

              <Icon
                name="heroicons:arrow-uturn-left"
                class="h-7 w-7 text-red-600"
              />

            </div>

          </div>

          <p
            class="mt-6 text-sm text-slate-500"
          >
            Refunded payments
          </p>

        </div>

      </div>

      <!-- ========================================================= -->
      <!-- Filters -->
      <!-- ========================================================= -->

      <div
        class="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        <div
          class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between"
        >

          <!-- Search -->

          <div
            class="relative w-full xl:max-w-lg"
          >

            <Icon
              name="heroicons:magnifying-glass"
              class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            />

            <input
              v-model="search"
              type="text"
              placeholder="Search by property, reference or seller..."
              class="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white"
            >

          </div>

          <!-- Filters -->

          <div
            class="flex flex-wrap items-center gap-3"
          >

            <select
              v-model="status"
              class="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary"
            >

              <option value="">
                All Status
              </option>

              <option value="COMPLETED">
                Completed
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="FAILED">
                Failed
              </option>

              <option value="REFUNDED">
                Refunded
              </option>

            </select>

            <select
              v-model="category"
              class="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary"
            >

              <option value="">
                All Categories
              </option>

              <option value="ESCROW_DEPOSIT">
                Escrow Deposit
              </option>

              <option value="ESCROW_RELEASE">
                Escrow Release
              </option>

              <option value="ESCROW_REFUND">
                Escrow Refund
              </option>

              <option value="PROPERTY_PAYMENT">
                Property Payment
              </option>

              <option value="WALLET_FUNDING">
                Wallet Funding
              </option>

              <option value="WITHDRAWAL">
                Withdrawal
              </option>

            </select>

            <select
              v-model="sort"
              class="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary"
            >

              <option value="-createdAt">
                Newest First
              </option>

              <option value="createdAt">
                Oldest First
              </option>

              <option value="-amount">
                Highest Amount
              </option>

              <option value="amount">
                Lowest Amount
              </option>

            </select>

          </div>

        </div>

        <!-- Quick Filters -->

        <div
          class="mt-6 flex flex-wrap gap-3"
        >

          <button
            class="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white"
          >
            All
          </button>

          <button
            class="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
          >
            Money In
          </button>

          <button
            class="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
          >
            Money Out
          </button>

          <button
            class="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
          >
            Escrow
          </button>

          <button
            class="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
          >
            Refund
          </button>

          <button
            class="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
          >
            Wallet
          </button>

        </div>

      </div>

      <!-- ========================================================= -->
      <!-- Transactions -->
      <!-- ========================================================= -->

      <div
        class="mt-10"
      >

        <div
          class="mb-6 flex items-center justify-between"
        >

          <h2
            class="text-xl font-bold text-slate-900"
          >
            Recent Transactions
          </h2>

          <span
            class="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600"
          >
            {{ transaction?.length  || "UNKNOWN" }} Transactions
          </span>

        </div>

        <div
          class="space-y-6"
        >

          <!-- Transaction Card Starts Here -->
cxm'd;klmcs'dvkmsdnasdklfn'sdkl'
          <div
            v-for="transaction in orders"
            :key="transaction._id"
          >

          <!-- ===========================================================
PART 1B
Transaction Cards + Action Menu + Pagination + Loading + Empty
=========================================================== -->

<!-- ===========================
Loading
=========================== -->
dfg'sjdfpogqjd;foasdjfka/ljdsfklansdklafnl dsfsdmfkd/fnsdkf/sdnfs,k
<div
  v-if="pending"
  class="space-y-5 mt-8"
>
  <div
    v-for="i in 6"
    :key="i"
    class="animate-pulse rounded-3xl border bg-white p-6"
  >
    <div class="flex items-center gap-5">

      <div
        class="h-14 w-14 rounded-full bg-slate-200"
      />

      <div class="flex-1">

        <div
          class="h-5 w-56 rounded bg-slate-200"
        />

        <div
          class="mt-3 h-4 w-80 rounded bg-slate-100"
        />

      </div>

      <div
        class="h-10 w-24 rounded-xl bg-slate-200"
      />

    </div>

  </div>
</div>

<!-- ===========================
Empty State
=========================== -->

<div
  v-else-if="transactions?.length === 0"
  class="mt-10 rounded-3xl border bg-white p-16 text-center"
>

  <div
    class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100"
  >
    <Icon
      name="heroicons:receipt-refund"
      class="h-12 w-12 text-slate-400"
    />
  </div>

  <h2
    class="mt-6 text-2xl font-bold text-slate-900"
  >
    No Transactions Yet
  </h2>

  <p
    class="mx-auto mt-3 max-w-lg text-slate-500 leading-7"
  >
    Once you fund your wallet, pay for a property, receive
    escrow funds, request a refund or withdraw money,
    every activity will appear here.
  </p>

</div>

<!-- ===========================
Transaction List
=========================== -->

<div
  v-else
  class="mt-8 space-y-5"
>
 
  <div
    v-for="transaction in transactions"
    :key="transaction._id"
    class="rounded-3xl border bg-white p-6 transition hover:shadow-lg"
  >

    <!-- =======================
Top Row
======================= -->

    <div
      class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"
    >

      <!-- Left -->

      <div class="flex gap-5">

        <!-- Icon -->

        <div
          class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
          :class="iconBackground(transaction)"
        >
          <Icon
            :name="iconName(transaction)"
            class="h-7 w-7"
            :class="iconColor(transaction)"
          />
        </div>

        <!-- Details -->

        <div>

          <div
            class="flex flex-wrap items-center gap-3"
          >

            <h2
              class="text-lg font-bold text-slate-900"
            >
              {{ transaction.description }}
            </h2>

            <span
              class="rounded-full px-3 py-1 text-xs font-semibold"
              :class="statusBadge(transaction.status)"
            >
              {{ transaction.status }}
            </span>

            <span
              class="rounded-full px-3 py-1 text-xs font-semibold"
              :class="typeBadge(transaction.type)"
            >
              {{ transaction.type }}
            </span>

          </div>

          <p
            class="mt-2 text-sm text-slate-500"
          >
            {{ transaction.reference }}
          </p>

          <p
            class="mt-1 text-sm text-slate-500"
          >
            {{ formatDate(transaction.createdAt) }}
          </p>

        </div>

      </div>

      <!-- Amount -->

      <div
        class="text-right"
      >

        <div
          class="text-2xl font-extrabold"
          :class="transaction.type === 'CREDIT'
            ? 'text-green-600'
            : 'text-red-600'"
        >
          {{ transaction.type === "CREDIT" ? "+" : "-" }}

          ₦{{ formatMoney(transaction.amount) }}

        </div>

        <div
          class="mt-2 text-sm text-slate-500"
        >
          Balance

          <span class="font-semibold">

            ₦{{ formatMoney(transaction.balanceAfter) }}

          </span>

        </div>

      </div>

    </div>

    <!-- =======================
Middle Grid
======================= -->

    <div
      class="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
    >

      <!-- Category -->

      <div>

        <p
          class="text-xs uppercase tracking-wide text-slate-400"
        >
          Category
        </p>

        <p
          class="mt-2 font-semibold capitalize"
        >
          {{ niceCategory(transaction.category) }}
        </p>

      </div>

      <!-- Wallet -->

      <div>

        <p
          class="text-xs uppercase tracking-wide text-slate-400"
        >
          Wallet
        </p>

        <p
          class="mt-2 font-semibold"
        >
          {{ transaction.wallet?.currency }}
        </p>

      </div>

      <!-- Previous -->

      <div>

        <p
          class="text-xs uppercase tracking-wide text-slate-400"
        >
          Previous Balance
        </p>

        <p
          class="mt-2 font-semibold"
        >
          ₦{{ formatMoney(transaction.balanceBefore) }}
        </p>

      </div>

      <!-- Current -->

      <div>

        <p
          class="text-xs uppercase tracking-wide text-slate-400"
        >
          New Balance
        </p>

        <p
          class="mt-2 font-semibold text-primary"
        >
          ₦{{ formatMoney(transaction.balanceAfter) }}
        </p>

      </div>

    </div>

    <!-- =======================
Metadata
======================= -->

    <div
      v-if="transaction.metadata"
      class="mt-7 rounded-2xl bg-slate-50 p-5"
    >

      <div
        class="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >

        <div
          v-if="transaction.metadata.gateway"
        >

          <p class="text-xs text-slate-400">
            Gateway
          </p>

          <p class="mt-1 font-semibold">
            {{ transaction.metadata.gateway }}
          </p>

        </div>

        <div
          v-if="transaction.metadata.channel"
        >

          <p class="text-xs text-slate-400">
            Channel
          </p>

          <p class="mt-1 font-semibold">
            {{ transaction.metadata.channel }}
          </p>

        </div>

        <div
          v-if="transaction.metadata.customerEmail"
        >

          <p class="text-xs text-slate-400">
            Customer
          </p>

          <p class="mt-1 font-semibold">
            {{ transaction.metadata.customerEmail }}
          </p>

        </div>

        <div
          v-if="transaction.metadata.gatewayFee"
        >

          <p class="text-xs text-slate-400">
            Gateway Fee
          </p>

          <p class="mt-1 font-semibold">
            ₦{{ formatMoney(transaction.metadata.gatewayFee) }}
          </p>

        </div>

      </div>

    </div>

    <!-- =======================
Footer
======================= -->

    <div
      class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-5"
    >

      <div
        class="flex flex-wrap gap-3"
      >

        <button
          class="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-slate-100"
        >
          View Details
        </button>

        <button
          v-if="transaction.order"
          class="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-slate-100"
        >
          View Order
        </button>

        <button
          v-if="transaction.payment"
          class="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-slate-100"
        >
          Payment Receipt
        </button>

      </div>

      <!-- Dropdown -->

      <Menu
        as="div"
        class="relative"
      >

        <MenuButton
          class="rounded-xl border px-4 py-3 hover:bg-slate-100"
        >
          <Icon
            name="heroicons:ellipsis-horizontal"
            class="h-5 w-5"
          />
        </MenuButton>

        <transition
          enter-active-class="transition duration-150"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-100"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >

          <MenuItems
            class="absolute right-0 z-20 mt-3 w-56 rounded-2xl border bg-white p-2 shadow-xl"
          >

            <MenuItem v-slot="{ active }">

              <button
                class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left"
                :class="active && 'bg-slate-100'"
              >
                <Icon
                  name="heroicons:document-text"
                  class="h-5 w-5"
                />

                Receipt

              </button>

            </MenuItem>

            <MenuItem v-slot="{ active }">

              <button
                class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left"
                :class="active && 'bg-slate-100'"
              >
                <Icon
                  name="heroicons:arrow-down-tray"
                  class="h-5 w-5"
                />

                Download

              </button>

            </MenuItem>

            <MenuItem v-slot="{ active }">

              <button
                class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left"
                :class="active && 'bg-slate-100'"
              >
                <Icon
                  name="heroicons:share"
                  class="h-5 w-5"
                />

                Share

              </button>

            </MenuItem>

          </MenuItems>

        </transition>

      </Menu>

    </div>

  </div>

</div>

<!-- ===========================
Pagination
=========================== -->

<div
 
  class="mt-10 flex flex-col gap-5 rounded-3xl border bg-white p-6 lg:flex-row lg:items-center lg:justify-between"
>

  <p
    class="text-sm text-slate-500"
  >
    Showing

    <span class="font-semibold">

      {{ transactions?.length || "UNKNOWN"  }}

    </span>

    of

    <span class="font-semibold">

      {{ totalTransactions }}

    </span>

    transactions
  </p>

  <div
    class="flex items-center gap-3"
  >

    <button
      :disabled="page === 1"
      @click="page--"
      class="rounded-xl border px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Previous
    </button>

    <div
      class="rounded-xl bg-slate-100 px-5 py-3 font-semibold"
    >
      {{ page }}

      /

      {{ totalPages }}
    </div>

    <button
      :disabled="page >= totalPages"
      @click="page++"
      class="rounded-xl border px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Next
    </button>

  </div>

</div>
</div>
</div>
</div>
</div>
</div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"

const router = useRouter()

/* =====================================
STATE
===================================== */

const page = ref(1)
const limit = ref(20)

const search = ref("")
const status = ref("")
const category = ref("")
const sort = ref("-createdAt")

/* =====================================
QUERY
===================================== */

const query = computed(() => ({
  page: page.value,
  limit: limit.value,
  search: search.value || undefined,
  status: status.value || undefined,
  category: category.value || undefined,
  sort: sort.value
}))

/* =====================================
FETCH
===================================== */

const {
  data,
  pending,
  error,
  refresh
} = await useApiFetch("/transactions", {
  query
})

watch(
  [page, search, status, category, sort],
  () => refresh()
)

/* =====================================
TRANSACTIONS
===================================== */

const transactions = computed(() => {
  return Array.isArray(data.value)
    ? data.value
    : []
})

/* =====================================
STATS
===================================== */

const statistics = computed(() => ({
  total: transactions.value.length,
  completed: transactions.value.filter(
    t => t.status === "SUCCESS"
  ).length,
  refunded: transactions.value.filter(
    t => t.status === "REFUNDED"
  ).length,
  active: transactions.value.filter(
    t => t.status === "PENDING"
  ).length
}))

/* =====================================
PAGINATION
===================================== */

const totalTransactions = computed(
  () => transactions.value.length
)

const totalPages = computed(() =>
  Math.max(
    1,
    Math.ceil(
      totalTransactions.value / limit.value
    )
  )
)

/* =====================================
FORMATTERS
===================================== */

const formatMoney = value => {
  return Number(value || 0).toLocaleString(
    "en-NG"
  )
}

const formatDate = value => {
  if (!value) return "-"

  return new Date(value).toLocaleString(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }
  )
}

/* =====================================
BADGES
===================================== */

const statusBadge = status => {
  switch (status) {
    case "SUCCESS":
      return "bg-green-100 text-green-700"

    case "FAILED":
      return "bg-red-100 text-red-700"

    case "PENDING":
      return "bg-yellow-100 text-yellow-700"

    default:
      return "bg-slate-100 text-slate-700"
  }
}

const typeBadge = purpose => {
  switch (purpose) {
    case "PROPERTY_DEPOSIT":
      return "bg-blue-100 text-blue-700"

    case "WALLET_FUNDING":
      return "bg-green-100 text-green-700"

    case "WITHDRAWAL":
      return "bg-red-100 text-red-700"

    default:
      return "bg-slate-100 text-slate-700"
  }
}

/* =====================================
ICONS
===================================== */

const iconName = transaction => {
  switch (transaction.purpose) {
    case "PROPERTY_DEPOSIT":
      return "heroicons:home"

    case "WALLET_FUNDING":
      return "heroicons:wallet"

    case "WITHDRAWAL":
      return "heroicons:arrow-up-circle"

    default:
      return "heroicons:credit-card"
  }
}

const iconBackground = transaction => {
  return transaction.status === "SUCCESS"
    ? "bg-green-100"
    : "bg-red-100"
}

const iconColor = transaction => {
  return transaction.status === "SUCCESS"
    ? "text-green-700"
    : "text-red-700"
}

const niceCategory = value => {
  if (!value) return "-"

  return value
    .replaceAll("_", " ")
    .toLowerCase()
}

/* =====================================
ACTIONS
===================================== */

const viewDetails = transaction => {
  router.push(
    `/user/transactions/${transaction._id}`
  )
}

const downloadReceipt = transaction => {
  router.push(
    `/user/transactions/${transaction._id}/receipt`
  )
}

/* =====================================
DEBUG
===================================== */

watchEffect(() => {
  console.log("Transactions:", transactions.value)
})
</script>