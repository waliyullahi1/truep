<script setup>
import { ref, watch } from 'vue'

/* ================= PROPS ================= */
const props = defineProps({
  modelValue: Boolean, // for v-model (open/close)
  initialFilters: {
    type: Object,
    default: () => ({})
  }
})

/* ================= EMITS ================= */
const emit = defineEmits(['update:modelValue', 'apply'])

/* ================= STATE ================= */
const filters = ref({
  type: '',
  minPrice: '',
  maxPrice: '',
  minSize: '',
  maxSize: '',
  minRooms: '',
  maxRooms: '',
  alert: false
})

/* ================= INIT ================= */
watch(
  () => props.initialFilters,
  (val) => {
    filters.value = { ...filters.value, ...val }
  },
  { immediate: true }
)

/* ================= OPTIONS ================= */
const propertyTypes = [
  { label: 'Room', value: 'room' },
  { label: 'House', value: 'house' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Studio', value: 'studio' },
  { label: 'Student apartment', value: 'student' }
]

/* ================= METHODS ================= */
const close = () => {
  emit('update:modelValue', false)
}

const selectType = (type) => {
  filters.value.type = type
}

const applyFilters = () => {
  emit('apply', { ...filters.value })
  close()
}

const resetFilters = () => {
  filters.value = {
    type: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    minRooms: '',
    maxRooms: '',
    alert: false
  }
}
</script>

<template>
<div v-if="modelValue" class="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">

  <div class="bg-white w-full max-w-4xl rounded-xl p-6 relative">

    <!-- CLOSE -->
    <button @click="close" class="absolute right-4 top-4 text-xl">✕</button>
       <div class=" flex  overflow-x-auto  gap-5 mt-4">
            <DiscoverMore />    
        </div>
    <!-- TITLE -->
    <h2 class="text-2xl font-bold mb-6">Abanise</h2>

    <!-- PROPERTY TYPE -->
    <div class="mb-6">
      <h3 class="font-semibold mb-3">Property Type</h3>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="t in propertyTypes"
          :key="t.value"
          @click="selectType(t.value)"
          class="px-4 py-2 rounded-full border text-sm"
          :class="filters.type === t.value
            ? 'bg-teal-800 text-white'
            : 'bg-white text-gray-700'"
        >
          {{ t.label }}
        </button>
      </div>
    </div>

    <!-- PRICE -->
    <div class="mb-6">
      <h3 class="font-semibold mb-3">Total Rent</h3>
      <div class="grid grid-cols-2 gap-4">
        <input v-model="filters.minPrice" placeholder="Min" class="border rounded px-4 py-3"/>
        <input v-model="filters.maxPrice" placeholder="Max" class="border rounded px-4 py-3"/>
      </div>
    </div>

    <!-- SIZE -->
    <div class="mb-6">
      <h3 class="font-semibold mb-3">Size (m²)</h3>
      <div class="grid grid-cols-2 gap-4">
        <input v-model="filters.minSize" placeholder="Min" class="border rounded px-4 py-3"/>
        <input v-model="filters.maxSize" placeholder="Max" class="border rounded px-4 py-3"/>
      </div>
    </div>

    <!-- ROOMS -->
    <div class="mb-6">
      <h3 class="font-semibold mb-3">Number of Rooms</h3>
      <div class="grid grid-cols-2 gap-4">
        <select v-model="filters.minRooms" class="border rounded px-4 py-3">
          <option value="">Min</option>
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>

        <select v-model="filters.maxRooms" class="border rounded px-4 py-3">
          <option value="">Max</option>
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
    </div>

    <!-- ALERT -->
    <div class="flex items-center gap-2 mb-6">
      <input type="checkbox" v-model="filters.alert" />
      <span>🔔 Get alerts for this search</span>
    </div>

    <!-- ACTION -->
    <div class="flex gap-3">
      <button @click="resetFilters" class="flex-1 border py-3 rounded">
        Reset
      </button>

      <button @click="applyFilters" class="flex-1 bg-green-600 text-white py-3 rounded">
        Update results
      </button>
    </div>

  </div>
</div>
</template>