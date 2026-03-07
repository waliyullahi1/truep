<script setup>
import { ref, watch, computed } from "vue"

/* ================= PROPS ================= */

const props = defineProps({
  purpose: {
    type: String,
    default: "sell"
  },
  modelValue: {
    type: Object,
    default: () => ({
      price: 0,
      currency: "NGN",
      rentDuration: null
    })
  }
})

const emit = defineEmits(["update:modelValue"])

/* ================= LOCAL STATE ================= */

const pricing = ref({ ...props.modelValue })

watch(pricing, () => {
  emit("update:modelValue", pricing.value)
}, { deep: true })

watch(() => props.modelValue, (v) => {
  pricing.value = { ...v }
})

/* ================= COMPUTED ================= */

const rentLabel = computed(() =>
  pricing.value.rentDuration === "monthly"
    ? "Price per Month (₦)"
    : "Price per Year (₦)"
)

const totalRentLabel = computed(() =>
  pricing.value.rentDuration === "monthly"
    ? "Monthly Rent"
    : "Yearly Rent"
)

const money = (v) =>
  "₦ " + Number(v || 0).toLocaleString()

</script>

<template>

<div class="border w-full p-5 rounded-xl shadow space-y-6">

<!-- TITLE -->

<h2 class="section-title">
{{ purpose === "sell" ? "House Price" : "Rent Price" }}
</h2>

<!-- SELL PRICE -->

<div v-if="purpose === 'sell'" class="space-y-2">

<label class="text-sm text-gray-500">
Selling Price (₦)
</label>

<input
type="number"
v-model.number="pricing.price"
class="input w-full"
placeholder="Enter selling price"
/>

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