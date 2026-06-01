<script setup>
import { computed } from "vue"
import PaymentType from "./PaymentType.vue"

/* ================= PROPS ================= */

const props = defineProps({
  purpose: {
    type: String,
    default: "sell"
  },
  type: {
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
    return props.modelValue.pricing || {
      price: 0,
      currency: "NGN",
      rentDuration: "monthly"
    }
  },
  set(val) {
    emit("update:modelValue", {
      ...props.modelValue,
      pricing: val
    })
  }
})

/* ================= EDITABLE FIELDS ================= */

const price = computed({
  get: () => pricing.value.price,
  set: (val) => {
    pricing.value = {
      ...pricing.value,
      price: val
    }
  }
})

const rentDuration = computed({
  get: () => pricing.value?.rent?.duration?.unit || "monthly",

  set: (val) => {
    pricing.value = {
      ...pricing.value,
      PaymentType:'rent',
      rent: {
        ...pricing.value.rent,

        duration: {
          ...pricing.value.rent?.duration,
          unit: val
        }
      }
    }
  }
})

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


watchEffect(() => {
  if (props.purpose !== "sale") {
    pricing.value = {
      ...pricing.value,
      PaymentType: "rent"
    }
  }
})
/* ================= MONEY FORMAT ================= */



const money = (v) =>
  "₦ " + Number(v || 0).toLocaleString()
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