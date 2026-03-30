<script setup>
import { computed } from 'vue'

/* ======================
   PROPS
====================== */
const props = defineProps({
  type: {
    type: String,
    default: 'land'
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])


/* ======================
   FEATURES DATA
====================== */

/* LAND FEATURES */
const landFeatures = [
  { key: 'dry', label: 'Dry Land', icon: '🌵' },
  { key: 'roadAccess', label: 'Good Road Access', icon: '🛣️' },
  { key: 'tarredRoad', label: 'Tarred Road', icon: '🚧' },
  { key: 'fenced', label: 'Fenced', icon: '🧱' },
  { key: 'tableLand', label: 'Flat/Table Land', icon: '📏' },
  { key: 'electricity', label: 'Electricity Available', icon: '⚡' },
  { key: 'waterSupply', label: 'Water Supply Nearby', icon: '💧' },
  { key: 'drainage', label: 'Drainage System', icon: '🚿' },
  { key: 'boreholePossible', label: 'Borehole Possible', icon: '🕳️' },
  { key: 'gatedEstate', label: 'Inside Estate', icon: '🏘️' },
  { key: 'security', label: 'Security Area', icon: '🛡️' },
  { key: 'cornerPiece', label: 'Corner Piece', icon: '📍' },
  { key: 'developedArea', label: 'Developed Neighborhood', icon: '🏙️' },
  { key: 'sandFilled', label: 'Sand Filled', icon: '🏖️' },
  { key: 'floodFree', label: 'Flood Free', icon: '🌊' },
  { key: 'cleared', label: 'Cleared/Ready to Build', icon: '🧹' },
  { key: 'rocky', label: 'Rocky Soil', icon: '🪨' }
]

/* HOUSE NUMBER FEATURES */
const houseFeatures = [
  { key: 'bedroom', label: 'Bedrooms', icon: '🛏️' },
  { key: 'bathroom', label: 'Bathrooms', icon: '🛁' },
  { key: 'sittingRoom', label: 'Living Rooms', icon: '🛋️' },
  { key: 'parking', label: 'Parking', icon: '🚗' },
  { key: 'toilet', label: 'Toilets', icon: '🚽' },
  { key: 'swimmingPool', label: 'Swimming Pools', icon: '🏊' }
]

/* HOUSE BOOLEAN FEATURES */
const otherHouseFeatures = [
  { key: 'airConditioning', label: 'Air Conditioning', icon: '❄️' },
  { key: 'borehole', label: 'Borehole Water', icon: '💧' },
  { key: 'popCeiling', label: 'POP Ceiling', icon: '🏠' },
  { key: 'tiledFloor', label: 'Tiled Floor', icon: '🧱' },
  { key: 'kitchenCabinet', label: 'Kitchen Cabinet', icon: '🍳' },
  { key: 'electricity', label: 'Stable Electricity', icon: '⚡' },
  { key: 'generator', label: 'Generator', icon: '🔌' },
  { key: 'solarPower', label: 'Solar Power', icon: '☀️' },
  { key: 'waterHeater', label: 'Water Heater', icon: '🔥' },
  { key: 'drainage', label: 'Good Drainage', icon: '🚿' },
  { key: 'wardrobe', label: 'Wardrobe', icon: '👕' },
  { key: 'balcony', label: 'Balcony', icon: '🏡' },
  { key: 'storeRoom', label: 'Store Room', icon: '📦' },
  { key: 'security', label: 'Security Guard', icon: '🛡️' },
  { key: 'cctv', label: 'CCTV Cameras', icon: '📹' },
  { key: 'gatedEstate', label: 'Gated Estate', icon: '🏘️' }
]

/* ======================
   COMPUTED
====================== */
const features = computed(() =>
  props.type === 'house' ? houseFeatures : landFeatures
)

/* ======================
   METHODS
====================== */

/* Toggle boolean feature */
const toggleFeature = (feature) => {
  const exists = props.modelValue.find(f => f.key === feature.key)
  let newArray = [...props.modelValue]

  if (exists) {
    newArray = newArray.filter(f => f.key !== feature.key)
  } else {
    newArray.push({
      key: feature.key,
      label: feature.label,
      icon: feature.icon,
      value: true
    })
  }

  emit('update:modelValue', newArray)
}

/* Handle number input */
const handleNumberInput = (feature, value) => {
  let newArray = props.modelValue.filter(f => f.key !== feature.key)

  if (value !== null && value !== '' && value >= 0) {
    newArray.push({
      key: feature.key,
      label: feature.label,
      icon: feature.icon,
      value: value
    })
  }

  emit('update:modelValue', newArray)
}
</script>

<template>
  <div class="border w-full p-5 rounded-xl shadow space-y-6">

    <!-- TITLE -->
    <h2 class="text-lg font-semibold">
      {{ type === 'house' ? 'House Features' : 'Land Features' }}
    </h2>

    <!-- LAND FEATURES -->
    <div v-if="type === 'land'" class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="f in features"
        :key="f.key"
        class="feature-card"
        :class="{ active: modelValue.some(v => v.key === f.key) }"
        @click="toggleFeature(f)"
      >
        <span>{{ f.icon }} {{ f.label }}</span>
        <span v-if="modelValue.some(v => v.key === f.key)">✓</span>
      </div>
    </div>

    <!-- HOUSE FEATURES -->
    <div v-if="type === 'house'" class="space-y-6">

      <!-- NUMBER INPUTS -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="f in features" :key="f.key">
          <label class="text-sm text-gray-500">
            {{ f.icon }} {{ f.label }}
          </label>

          <input
            type="number"
            min="0"
            :value="modelValue.find(v => v.key === f.key)?.value || ''"
            @input="handleNumberInput(f, $event.target.valueAsNumber)"
            class="input mt-1"
          />
        </div>
      </div>

      <!-- BOOLEAN FEATURES -->
      <div>
        <h3 class="font-semibold mb-3">Other Features</h3>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="f in otherHouseFeatures"
            :key="f.key"
            class="feature-card"
            :class="{ active: modelValue.some(v => v.key === f.key) }"
            @click="toggleFeature(f)"
          >
            <span>{{ f.icon }} {{ f.label }}</span>
            <span v-if="modelValue.some(v => v.key === f.key)">✓</span>
          </div>
        </div>
      </div>

    </div>

    <!-- NO TYPE -->
    <div
      v-if="type === ''"
      class="bg-gray-50 border rounded-xl p-8 text-center text-gray-500"
    >
      <p class="text-lg font-medium">No property selected</p>
      <p class="text-sm mt-1">Please select property type first.</p>
    </div>

  </div>
</template>

<style scoped>
.input {
  @apply w-full border rounded-lg px-4 py-2 text-sm
         focus:outline-none focus:ring-2 focus:ring-black;
}

.feature-card {
  @apply p-3 border rounded-lg cursor-pointer
         flex justify-between items-center
         bg-white transition;
}

.feature-card:hover {
  @apply border-black;
}

.feature-card.active {
  @apply bg-black text-white border-black;
}
</style>