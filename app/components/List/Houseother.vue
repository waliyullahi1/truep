<script setup>
import { ref, watch, computed } from 'vue'

/* ======================
   PROPS
====================== */
const props = defineProps({
  purpose:{
    type: String,
    default: 'Sell' // Sell | Rent
  },
  modelValue: {
    type: Object,
    default: () => ({
      purpose: 'Sell', // Sell | Rent
      price: '',
      rentType: 'perMonth' // perMonth | perYear
    })
  }
})

const emit = defineEmits(['update:modelValue'])

/* ======================
   LOCAL STATE
====================== */
const local = ref({ ...props.modelValue })

watch(local, () => {
  emit('update:modelValue', local.value)
}, { deep: true })

watch(() => props.modelValue, (v) => {
  local.value = { ...v }
})

/* ======================
   COMPUTED
====================== */
const rentLabel = computed(() => local.value.rentType === 'perMonth' ? 'Price per Month (₦)' : 'Price per Year (₦)')
const totalRentLabel = computed(() => local.value.rentType === 'perMonth' ? 'Monthly Rent' : 'Yearly Rent')
</script>

<template>
<div class="border w-full p-5 rounded-xl shadow space-y-6">

  <!-- TITLE -->
  <h2 class="section-title">  {{ props.purpose === 'Sell' ? 'House Price' : 'Rent Price' }}</h2>
  {{ props.purpose }}
  <!-- PURPOSE SELECT -->


  <!-- SELL PRICE -->
  <div v-if="props.purpose === 'Sell'" class="space-y-2">
    <label class="text-sm text-gray-500">Selling Price (₦)</label>
    <input type="number" v-model.number="local.price" class="input w-full" placeholder="Enter selling price" />
  </div>

  <!-- RENT PRICE -->
  <div v-else class="space-y-2">
    <label class="text-sm text-gray-500">Rent Type</label>
    <select v-model="local.rentType" class="input w-full">
      <option value="perMonth">Per Month</option>
      <option value="perYear">Per Year</option>
    </select>

    <label class="text-sm text-gray-500">{{ rentLabel }}</label>
    <input type="number" v-model.number="local.price" class="input w-full" placeholder="Enter rent price" />

    <div class="mt-2 bg-gray-50 p-3 rounded text-sm">
      <span>Total {{ totalRentLabel }}: </span>
      <strong>₦ {{ Number(local.price || 0).toLocaleString() }}</strong>
    </div>
  </div>

</div>
</template>

<style scoped>
.section-title {
  @apply text-lg font-semibold;
}
.input {
  @apply w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black;
}
</style>