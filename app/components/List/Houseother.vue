<script setup>
import { computed, watch } from "vue"

/* ================= PROPS ================= */

const props = defineProps({
  purpose: {
    type: String,
    default: "sale"
  },

  type: {
    type: String,
    default: ""
  },

  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  "update:modelValue"
])

/* ================= PRICING MODEL ================= */

const pricing = computed({
  get() {
    return (
      props.modelValue.pricing || {
        price: null,
        currency: "NGN",
        paymentType: "outright",

        rent: {
          duration: {
            value: 1,
            unit: "monthly"
          }
        },

        installment: {
          months: null,
          monthlyAmount: null
        }
      }
    )
  },

  set(val) {
    emit("update:modelValue", {
      ...props.modelValue,

      pricing: {
        ...val
      }
    })
  }
})

/* ================= PRICE ================= */

const price = computed({
  get() {
    return pricing.value.price
  },

  set(val) {
    pricing.value = {
      ...pricing.value,
      price: Number(val) || null
    }
  }
})

/* ================= RENT DURATION ================= */

const rentDuration = computed({
  get() {
    return (
      pricing.value?.rent?.duration?.unit ||
      "monthly"
    )
  },

  set(val) {
    pricing.value = {
      ...pricing.value,

      paymentType: "rent",

      rent: {
        ...pricing.value.rent,

        duration: {
          ...pricing.value?.rent?.duration,
          unit: val
        }
      }
    }
  }
})

/* ================= PURPOSE WATCH ================= */

watch(
  () => props.purpose,
  (purpose) => {

    if (!purpose) return

    const expectedType =
      purpose === "sale"
        ? "outright"
        : "rent"

    if (
      pricing.value.paymentType !==
      expectedType
    ) {

      pricing.value = {
        ...pricing.value,
        paymentType: expectedType
      }
    }
  },
  {
    immediate: true
  }
)

/* ================= LABELS ================= */

const rentLabel = computed(() =>
  rentDuration.value === "monthly"
    ? "Price per Month (₦)"
    : "Price per Year (₦)"
)

const totalRentLabel = computed(() =>
  rentDuration.value === "monthly"
    ? "Monthly Rent"
    : "Yearly Rent"
)

/* ================= MONEY ================= */

const money = (v) =>
  "₦ " +
  Number(v || 0).toLocaleString()
</script>
<template>

<div class="border w-full p-5 rounded-xl  space-y-6">

<h2 v-if="type !== 'hostel'" class="section-title">
{{ purpose.split(' ')[0].toLowerCase() === "sell" ? "House Price" : "Rent Price" }}
</h2>
<h2 v-if="type === 'hostel'" class="section-title">
Hostel Rent Price
</h2>
<!-- SELL -->

<div v-if="purpose  === 'sale'" class="space-y-2">

<label class="text-sm text-gray-500">
Selling Price (₦)
</label>

<input
type="number"
v-model.number="price"
class="input w-full"
placeholder="Enter selling price"
/>

<p class="mt-4">
<span class="font-semibold">Total :</span>
{{ money(price) }}
</p>

</div>

<!-- RENT -->

<div v-else class="space-y-2">

<label class="text-sm text-gray-500">
Rent Duration
</label>

<select
v-model="rentDuration"
class="input w-full"
>
<option value="monthly">Per Month</option>
<option value="yearly">Per Year</option>
</select>

<label class="text-sm text-gray-500">
{{ rentLabel }}
</label>

<input
type="number"
v-model.number="price"
class="input w-full"
placeholder="Enter rent price"
/>

<div class="mt-2 bg-gray-50 p-3 rounded text-sm">

<span>Total {{ totalRentLabel }}:</span>

<strong>
{{ money(price) }}
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