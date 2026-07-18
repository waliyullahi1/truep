<template>
  <div class="max-w-5xl mx-auto py-8 px-4 space-y-8">
 <!-- <PaymentWithdraw
   v-model:show="showWithdrawal"
    @withdraw="withdraw"
    @edit-account="showModal = true"
 />
 {{dashboard}}
 <!--{{data.data}} 

   <ProfileAccountdetails  v-if="showModal"
    :user-id="selectedUserId"
    @close="closeModal"
    @updated="refreshAccounts"/> -->

      <!-- Header -->

      <!-- {{data.data}} -->
    <div>

      <h1 class="text-3xl font-bold">
        My Funds
      </h1>

      <p class="text-slate-500 mt-2">
        Track all money received, held in escrow, available for withdrawal and completed payouts.
      </p>

    </div>
 <!-- Summary -->

    <div class="grid md:grid-cols-4 gap-5">

      <div class="rounded-2xl bg-white border p-6">

        <div class="flex items-center justify-between">

          <span class="text-slate-500 text-sm">
            Total Received
          </span>

          <Icon
            name="lucide:arrow-down-left"
            class="w-5 h-5 text-green-600"
          />

        </div>

        <h2 class="mt-4 text-2xl font-bold">
          {{formatMoney(data?.data?.summary?.totalCredit)}}
        </h2>

      </div>

      <div class="rounded-2xl bg-white border p-6">

        <div class="flex items-center justify-between">

          <span class="text-slate-500 text-sm">
            In Escrow
          </span>

          <Icon
            name="lucide:shield-check"
            class="w-5 h-5 text-blue-600"
          />

        </div>

        <h2 class="mt-4 text-2xl font-bold">
         {{formatMoney(data?.data?.summary?.totalEscrow)}}
        </h2>

      </div>

      <div class="rounded-2xl bg-white border p-6">

        <div class="flex items-center justify-between">

          <span class="text-slate-500 text-sm">
            Available
          </span>

          <Icon
            name="lucide:wallet"
            class="w-5 h-5 text-emerald-600"
          />

        </div>

        <h2 class="mt-4 text-2xl font-bold">
          {{formatMoney(auth?.user?.wallet?.balance)}}
        </h2>

      </div>

      <div class="rounded-2xl bg-white border p-6">

        <div class="flex items-center justify-between">

          <span class="text-slate-500 text-sm">
            Withdrawn
          </span>

          <Icon
            name="lucide:banknote"
            class="w-5 h-5 text-orange-500"
          />

        </div>

        <h2 class="mt-4 text-2xl font-bold">
          {{formatMoney(data?.data?.summary?.totalWithdrawal)}}
        </h2>

      </div>

    </div>

    <!-- Money Flow -->

    <!-- <div class="rounded-2xl border bg-white p-8">

      <h2 class="font-bold text-xl">
        How Your Money Moves
      </h2>

      <div class="grid md:grid-cols-4 gap-6 mt-8">

        <div class="text-center">

          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">

            <Icon
              name="lucide:credit-card"
              class="w-8 h-8 text-blue-600"
            />

          </div>

          <h3 class="font-semibold mt-4">
            Buyer Pays
          </h3>

          <p class="text-sm text-slate-500 mt-2">
            Buyer pays securely through the platform.
          </p>

        </div>

        <div class="text-center">

          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">

            <Icon
              name="lucide:shield"
              class="w-8 h-8 text-yellow-600"
            />

          </div>

          <h3 class="font-semibold mt-4">
            Escrow
          </h3>

          <p class="text-sm text-slate-500 mt-2">
            Funds remain protected until the transaction is completed.
          </p>

        </div>

        <div class="text-center">

          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">

            <Icon
              name="lucide:badge-check"
              class="w-8 h-8 text-green-600"
            />

          </div>

          <h3 class="font-semibold mt-4">
            Approved
          </h3>

          <p class="text-sm text-slate-500 mt-2">
            Once approved, funds become available for withdrawal.
          </p>

        </div>

        <div class="text-center">

          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">

            <Icon
              name="lucide:landmark"
              class="w-8 h-8 text-purple-600"
            />

          </div>

          <h3 class="font-semibold mt-4">
            Withdrawal
          </h3>

          <p class="text-sm text-slate-500 mt-2">
            Withdraw funds directly to your verified bank account.
          </p>

        </div>

      </div>

    </div> -->

    <!-- Recent Fund Activities -->

  
  <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden">

    <!-- Header -->
    <div class="px-6 py-5 border-b">
      <h2 class="text-lg font-bold text-slate-900">
        Recent Fund Activity
      </h2>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">

      <table class="min-w-full">

        <thead class="bg-slate-50 border-b">

          <tr>

            <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Transaction
            </th>

            <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Property
            </th>

            <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Amount
            </th>

            <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Status
            </th>

            <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          <!-- Loading -->
          <template v-if="pending">

            <tr
              v-for="i in 6"
              :key="i"
              class="border-b animate-pulse"
            >
              <td class="px-6 py-5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-slate-200"></div>

                  <div class="space-y-2">
                    <div class="h-4 w-40 rounded bg-slate-200"></div>
                    <div class="h-3 w-28 rounded bg-slate-100"></div>
                  </div>
                </div>
              </td>

              <td class="px-6">
                <div class="h-4 w-32 rounded bg-slate-200"></div>
              </td>

              <td class="px-6">
                <div class="h-4 w-24 rounded bg-slate-200"></div>
              </td>

              <td class="px-6">
                <div class="h-7 w-20 rounded-full bg-slate-200"></div>
              </td>

              <td class="px-6">
                <div class="h-4 w-28 rounded bg-slate-200"></div>
              </td>

            </tr>

          </template>

          <!-- Empty -->
          <tr
            v-else-if="!data?.data?.transactions?.length"
          >
            <td
              colspan="5"
              class="py-16 text-center"
            >

              <Icon
                name="lucide:receipt"
                class="w-12 h-12 mx-auto text-slate-300"
              />

              <h3 class="mt-4 font-semibold text-slate-700">
                No Transactions
              </h3>

              <p class="text-slate-500 mt-1">
                Your transaction history will appear here.
              </p>

            </td>
          </tr>

          <!-- Data -->
          <tr
            v-else
            v-for="item in data.data.transactions"
            :key="item._id"
            class="border-b hover:bg-slate-50 transition"
          >

            <!-- Transaction -->
            <td class="px-6 py-5">

              <div class="flex items-center gap-3">

                <div
                  class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center"
                >
                  <Icon
                    :name="getLedgerCategory(item.category).icon"
                    class="w-5 h-5 text-indigo-600"
                  />
                </div>

                <div>

                  <p class="font-semibold whitespace-nowrap">
                    {{ getLedgerCategory(item.category).title }}
                  </p>

                  <p class="text-xs whitespace-nowrap text-slate-500">
                    {{ item.reference }}
                  </p>

                </div>

              </div>

            </td>

            <!-- Property -->
            <td class="px-6 py-5">
                <span v-if="item.order?.property">
                  {{ item.order.property.title }}
                </span>

                <span v-else-if="item.category === 'WITHDRAWAL'">
                  {{ item.metadata?.bankName }} • ****{{ item.metadata?.last4 }}
                </span>

                <span v-else-if="item.category === 'WALLET_FUNDING'">
                  {{ item.metadata?.gateway || 'Wallet Funding' }}
                </span>

                <span v-else>
                  —
                </span>
              </td>

            <!-- Amount -->
            <td class="px-6 py-5">

              <span
                class="font-bold whitespace-nowrap"
                :class="item.type === 'CREDIT'
                  ? 'text-green-600'
                  : 'text-red-600'"
              >
                {{ item.type === "CREDIT" ? "+" : "-" }}
                {{ formatMoney(item.amount) }}
              </span>

            </td>

            <!-- Status -->
            <td class="px-6 py-5">

              <span
                :class="[
                  'inline-flex rounded-full whitespace-nowrap px-3 py-1 text-xs font-semibold',
                  statusClass(item.status)
                ]"
              >
                {{ item.status }}
              </span>

            </td>

            <!-- Date -->
            <td class="px-6 py-5 whitespace-nowrap text-sm text-slate-500">

              {{ formatDate(item.createdAt) }}

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>


       <!-- Upload Bank Account Widget -->
      <div
        class="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div class="flex items-start gap-4">

          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
            <Icon
              name="lucide:landmark"
              class="h-7 w-7 text-amber-600"
            />
          </div>

          <div>

            <h3 class="text-lg font-bold text-slate-800">
              Add Your Withdrawal Bank Account
            </h3>

            <p class="mt-2 text-sm text-slate-600 max-w-lg">
              Before you can receive money from completed property sales, you need to
              add and verify your bank account. Your account details must match the
              information on your verified NIN.
            </p>

          </div>

        </div>

        <button
          @click="showModal = true"
          class="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Upload Bank Account
        </button>

      </div>

         <!--  Bank Account Widget -->
      <div
        class="rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div class="flex items-start gap-4">

          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
            <Icon
              name="lucide:wallet"
              class="h-7 w-7 text-green-600"
            />
          </div>

          <div>

            <h3 class="text-lg font-bold text-slate-800">
              Withdraw Your Available Funds
            </h3>

            <p class="mt-2 text-sm text-slate-600 max-w-lg">
              Funds released from escrow are now available in your wallet. Withdraw
              them directly to your verified bank account.
            </p>

          </div>

        </div>

        <button
          @click="withdraw"
          class="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Withdraw Now
        </button>

      </div>

   


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Star } from 'lucide-vue-next'
import { getLedgerCategory } from "~/utils/ledger";

definePageMeta({
  layout: 'auth',
  access: 'seller',
   sellerOnly: true
})
const auth = useAuth()

const showWithdrawal = ref(false)
const showModal = ref(false)


const openModal = (userId) => {
  selectedUserId.value = userId
  showModal.value = true
}

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
const closeModal = () => {
  showModal.value = false
  selectedUserId.value = null
}




const withdraw = (amount) => {
  console.log("Withdraw:", amount);

  showWithdrawal.value = true;
};
const {
  data,
  pending,
  error,
  refresh
} = await useApiFetch("/transactions/wallet/dashboard", {

})

// watch(
//   [page, search, status, category, sort],
//   () => refresh()
// )

/* =====================================
TRANSACTIONS
===================================== */



const editAccount = () => {
  console.log("Edit Account");
};


const formatDate = (date) => {
  return new Date(date).toLocaleString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const statusClass = (status) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
</script>