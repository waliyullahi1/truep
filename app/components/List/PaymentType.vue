<template>
  <!-- Payment Options -->
  <div v-if="purpose == 'sale' " class="grid grid-cols-1 md:grid-cols-3 gap-4">

    <!-- Outright -->
    <label
      class="cursor-pointer border rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition"
      :class="pricing.paymentType === 'outright' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
    >
      <input type="radio" value="outright" v-model="pricing.paymentType" class="hidden" />
      <span class="text-lg">💰</span>
      <span class="font-semibold">Outright</span>
      <span class="text-sm text-gray-500">Full payment at once</span>
    </label>

    <!-- Installment -->
    <label
      class="cursor-pointer border rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition"
      :class="pricing.paymentType === 'installment' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
    >
      <input type="radio" value="installment" v-model="pricing.paymentType" class="hidden" />
      <span class="text-lg">🏦</span>
      <span class="font-semibold">Installment</span>
      <span class="text-sm text-gray-500">Pay gradually over time</span>
    </label>

    <!-- Rent -->
    <label v-if="purpose == 'rent' " 
      class="cursor-pointer border rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition"
      :class="pricing.paymentType === 'rent' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
     >
      <input type="radio" value="rent" v-model="pricing.paymentType" class="hidden" />
      <span class="text-lg">🏠</span>
      <span class="font-semibold">Rent</span>
      <span class="text-sm text-gray-500">Pay monthly or yearly</span>
    </label>

  </div>

  <!-- Extra Fields -->
  <div class="mt-6" v-if="purpose == 'sale' ">

    <!-- Rent Period -->
    <div v-if="pricing.paymentType === 'rent'">
      <label class="block mb-2 font-medium">Rent Period</label>
      <select v-model="pricing.period" class="w-full border rounded-lg p-2">
        <option value="">Select period</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>

    <!-- Installment Duration -->
    <div v-if="pricing.paymentType === 'installment'" class="bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <h3 class="text-lg font-semibold text-gray-800">Installment Plan</h3>
        <p class="text-sm text-gray-500">Set how the client will pay in installments.</p>

        <!-- Duration Input -->
        <div>
            <label class="block text-gray-700 font-medium mb-1">Duration (Months)</label>
            <input
            type="number"
            v-model="pricing.installment.months"
            min="1"
            placeholder="e.g., 6"
            class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            <p class="text-xs text-gray-400 mt-1">How many months will the client pay?</p>
        </div>

        <!-- Monthly Amount Input -->
        <div>
            <label class="block text-gray-700 font-medium mb-1">Monthly Payment (₦)</label>
            <input
            type="number"
            v-model="pricing.installment.monthlyAmount"
            min="0"
            placeholder="e.g., 50,000"
            class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            <p class="text-xs text-gray-400 mt-1">How much the client pays per month.</p>
        </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  purpose: {
    type: String,
    default: 'Sale'
  }
})

const emit = defineEmits(['update:modelValue'])

// 🔥 This is the magic
const pricing = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>