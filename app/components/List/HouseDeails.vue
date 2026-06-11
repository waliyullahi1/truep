<script setup>
import { computed } from 'vue'

/* ======================
   PROPS
====================== */
const props = defineProps({
  house: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    default: 'house'
  }
})

const emit = defineEmits(['update:house'])

/* ======================
   PROPERTY DETAILS
====================== */
const houseDetails = [
  { key: 'bedroom', label: 'Bedrooms', icon: '🛏️' },
  { key: 'bathroom', label: 'Bathrooms', icon: '🛁' },
  { key: 'sittingRoom', label: 'Living Rooms', icon: '🛋️' },
  { key: 'parking', label: 'Parking', icon: '🚗' },
  { key: 'toilet', label: 'Toilets', icon: '🚽' },
  { key: 'swimmingPool', label: 'Swimming Pools', icon: '🏊' }
]

const featuresList = computed(() => houseDetails)

/* ======================
   METHODS
====================== */
const handleNumberInput = (feature, value) => {
  const cleaned = String(value).replace(/\D/g, '')

  const newHouse = {
    ...props.house
  }

  if (cleaned) {
    newHouse[feature.key] = Number(cleaned)
  } else {
    delete newHouse[feature.key]
  }

  emit('update:house', newHouse)
}
</script>

<template>
  <div class="border w-full p-5 rounded-xl space-y-6">
{{  }}
    <!-- TITLE -->
    <h2 class="text-lg font-semibold">
      {{
        type === 'house'
          ? 'House Features'
          : type === 'hostel'
          ? 'Hostel Features'
          : 'Land Features'
      }}
    </h2>

    <!-- PROPERTY INPUTS -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">

      <div
        v-for="feature in featuresList"
        :key="feature.key"
      >
        <label class="text-sm text-gray-500 block mb-1">
          {{ feature.icon }} {{ feature.label }}
        </label>
        <input
  type="number"
  min="0"
  class="input"
  :placeholder="`Enter ${feature.label}`"
/>
        <input
         type="number"
         min="0"
          step="1"
          class="input"
          :placeholder="`Enter ${feature.label}`"
          :value="house?.[feature.key] || ''"
          @input="
            handleNumberInput(
              feature,
              $event.target.value
            )
          "
        />
      </div>

    </div>

  </div>
</template>

<style scoped>
.input {
  @apply w-full border rounded-sm px-4 py-2 text-sm
         focus:outline-none focus:ring-2 focus:ring-black;
}
</style>