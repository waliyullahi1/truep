<script setup>
import { computed } from "vue"

/* ================= PROPS ================= */

const props = defineProps({
  purpose: {
    type: String,
    default: "sell"
  },
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(["update:modelValue"])

/* ================= PRICING MODEL ================= */

const pricing = computed({
  get() {
    return props.modelValue.pricing
  },
  set(val) {
    emit("update:modelValue", {
      ...props.modelValue,
      pricing: val
    })
  }
})

/* ================= COMPUTED ================= */

const rentLabel = computed(() =>
  pricing.value?.rentDuration === "monthly"
    ? "Price per Month (₦)"
    : "Price per Year (₦)"
)

const totalRentLabel = computed(() =>
  pricing.value?.rentDuration === "monthly"
    ? "Monthly Rent"
    : "Yearly Rent"
)

const money = (v) =>
  "₦ " + Number(v || 0).toLocaleString()

</script>
<template>

<div class="border w-full p-5 rounded-xl shadow space-y-6">

<h2 class="section-title">

{{ purpose === "Sell" ? "House Price" : "Rent Price" }}
</h2>

<!-- SELL -->

<div v-if="purpose === 'Sell'" class="space-y-2">

<label class="text-sm text-gray-500">
Selling Price (₦)
</label>

<input
type="number"
v-model.number="pricing.price"
class="input w-full"
placeholder="Enter selling price"
/>
<p class=" mt-7"> <span  class="  font-semibold -6">Total :</span>
{{ money(pricing.price) }}</p>

</div>

<!-- RENT -->

<div v-else class="space-y-2">

<label class="text-sm text-gray-500">
Rent Duration
</label>

<select
v-model="pricing.rentDuration"
class="input w-full"
>

<option value="monthly">
Per Month
</option>

<option value="yearly">
Per Year
</option>

</select>

<label class="text-sm text-gray-500">
{{ rentLabel }}
</label>

<input
type="number"
v-model.number="pricing.price"
class="input w-full"
placeholder="Enter rent price"
/>

<div class="mt-2 bg-gray-50 p-3 rounded text-sm">

<span>Total {{ totalRentLabel }}:</span>

<strong>
{{ money(pricing.price) }}
</strong>

</div>

</div>

</div>

</template>
<style scoped>

.section-title{
@apply text-lg font-semibold;
}

.input{
@apply w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black;
}

</style>