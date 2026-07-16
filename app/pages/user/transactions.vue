<template>
  <div class="max-w-5xl mx-auto py-8 px-4 space-y-8">

    <!-- Header -->
    <div>

      <h1 class="text-3xl font-bold">
        My Funds
      </h1>

      <p class="text-slate-500 mt-2">
        Track all money received, held in escrow, available for withdrawal and completed payouts.
      </p>

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
          @click="openBankModal"
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
          @click="withdrawFunds"
          class="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Withdraw Now
        </button>

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
          ₦2,450,000
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
          ₦850,000
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
          ₦1,250,000
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
          ₦350,000
        </h2>

      </div>

    </div>

    <!-- Money Flow -->

    <div class="rounded-2xl border bg-white p-8">

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

    </div>

    <!-- Recent Fund Activities -->

    <div class="rounded-2xl border bg-white">

      <div class="border-b px-6 py-4">

        <h2 class="font-bold text-lg">
          Recent Fund Activity
        </h2>

      </div>

      <div class="divide-y">

        <div
          v-for="item in 5"
          :key="item"
          class="flex items-center justify-between px-6 py-5"
        >

          <div class="flex items-center gap-4">

            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">

              <Icon
                name="lucide:arrow-down-left"
                class="w-6 h-6 text-green-600"
              />

            </div>

            <div>

              <h3 class="font-semibold">
                Escrow Payment Received
              </h3>

              <p class="text-sm text-slate-500">
                Green Estate • Today
              </p>

            </div>

          </div>

          <div class="text-right">

            <p class="font-bold text-green-600">
              + ₦350,000
            </p>

            <p class="text-xs text-slate-400">
              In Escrow
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Star } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
  access: 'seller',
   sellerOnly: true
})

</script>