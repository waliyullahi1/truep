<template>
  <div class="bg-white border shadow-sm rounded-md p-6">

    <!-- Header -->
    <div class="flex items-center gap-3">
      <div
        class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"
      >
        <Icon
          name="heroicons:shield-check"
          class="w-7 h-7 text-green-600"
        />
      </div>

      <div>
        <h2 class="font-bold text-xl">
          Payment Completed
        </h2>

        <p class="text-slate-500 text-sm">
          Your payment has been received and is safely held in escrow.
        </p>
      </div>
    </div>

    <!-- Warning -->
    <div
      class="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5"
    >
      <div class="flex gap-3">

        <Icon
          name="heroicons:exclamation-triangle"
          class="w-6 h-6 text-amber-600 mt-1 flex-shrink-0"
        />

        <div>

          <h3 class="font-semibold text-amber-900">
            Verify the Property Before Releasing Funds
          </h3>

          <p class="text-sm text-amber-800 mt-2 leading-7">
            Please inspect the property carefully before releasing the escrow
            payment.

            <br /><br />

            Once you release the funds, the money will be transferred to the
            seller.

            <br /><br />

            If you discover any issue with the property, do not release the
            payment. Instead, request a refund or raise a dispute.
          </p>

        </div>

      </div>
    </div>

    <!-- Confirmation -->
    <label
      class="mt-6 flex items-start gap-3 cursor-pointer"
    >

      <input
        v-model="confirmed"
        type="checkbox"
        class="mt-1 w-5 h-5"
      />

      <span class="text-sm leading-6">
        I confirm that I have inspected this property and I authorize the
        platform to release the escrow payment to the seller.
      </span>

    </label>

    <!-- Actions -->
    <div class="grid md:grid-cols-2 gap-4 mt-8">

      <button
        :disabled="!confirmed"
        @click="$emit('release')"
        class="h-14 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-semibold transition"
      >
        <Icon
          name="heroicons:banknotes"
          class="w-5 h-5 inline mr-2"
        />
        Release Money
      </button>

      <button
        @click="$emit('refund')"
        class="h-14 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-semibold transition"
      >
        <Icon
          name="heroicons:arrow-uturn-left"
          class="w-5 h-5 inline mr-2"
        />
        Request Refund
      </button>

    </div>

  </div>
</template>

<script setup>
const confirmed = ref(false)

defineEmits([
  "release",
  "refund"
])
</script>