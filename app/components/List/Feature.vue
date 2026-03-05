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
    type: Object,
    default: () => ({})
  }
})


/* ======================
   FEATURES DATA
====================== */

/* LAND FEATURES */
const landFeatures = [
  { key: 'dry', label: 'Dry Land' },
  { key: 'roadAccess', label: 'Good Road Access' },
  { key: 'tarredRoad', label: 'Tarred Road' },
  { key: 'fenced', label: 'Fenced' },
  { key: 'tableLand', label: 'Flat/Table Land' },
  { key: 'electricity', label: 'Electricity Available' },
  { key: 'waterSupply', label: 'Water Supply Nearby' },
  { key: 'drainage', label: 'Drainage System' },
  { key: 'boreholePossible', label: 'Borehole Possible' },
  { key: 'gatedEstate', label: 'Inside Estate' },
  { key: 'security', label: 'Security Area' },
  { key: 'cornerPiece', label: 'Corner Piece' },
  { key: 'developedArea', label: 'Developed Neighborhood' },
  { key: 'sandFilled', label: 'Sand Filled' },
  { key: 'floodFree', label: 'Flood Free' },
  { key: 'cleared', label: 'Cleared/Ready to Build' },
  { key: 'rocky', label: 'Rocky Soil' }
]


/* HOUSE FEATURES (numbers) */
const houseFeatures = [
  { key: 'bedroom', label: 'Bedroom Count', type: 'number' },
  { key: 'bathroom', label: 'Bathroom Count', type: 'number' },
  { key: 'sittingRoom', label: 'Sitting Room Count', type: 'number' },
  { key: 'parking', label: 'Parking Space', type: 'number' },
  { key: 'toilet', label: 'Toilet Count', type: 'number' },
  { key: 'swimmingPool', label: 'Swimming Pool Count', type: 'number' }
]


/* HOUSE BOOLEAN FEATURES */
const otherHouseFeatures = [
  { key: 'airConditioning', label: 'Air Conditioning' },
  { key: 'borehole', label: 'Borehole Water' },
  { key: 'popCeiling', label: 'POP Ceiling' },
  { key: 'tiledFloor', label: 'Tiled Floor' },
  { key: 'kitchenCabinet', label: 'Kitchen Cabinet' },
  { key: 'electricity', label: 'Stable Electricity' },
  { key: 'generator', label: 'Generator' },
  { key: 'solarPower', label: 'Solar Power' },
  { key: 'waterHeater', label: 'Water Heater' },
  { key: 'drainage', label: 'Good Drainage' },
  { key: 'wardrobe', label: 'Wardrobe' },
  { key: 'balcony', label: 'Balcony' },
  { key: 'storeRoom', label: 'Store Room' },
  { key: 'security', label: 'Security Guard' },
  { key: 'cctv', label: 'CCTV Cameras' },
  { key: 'gatedEstate', label: 'Gated Estate' }
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

const toggleFeature = (key) => {

  if (props.modelValue[key]) {
    delete props.modelValue[key]
  } else {
    props.modelValue[key] = true
  }

}

const handleNumberInput = (key) => {

  if (
    props.modelValue[key] === 0 ||
    props.modelValue[key] === '' ||
    props.modelValue[key] === null
  ) {
    delete props.modelValue[key]
  }

}
</script>



<template>
<div class="border w-full p-5 rounded-xl shadow space-y-6">

  <!-- TITLE -->
  <h2 class="section-title">
    {{ type === 'house' ? 'House Features' : 'Land Features' }}
  </h2>

  <!-- LAND FEATURES -->
  <div v-if="type === 'land'" class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div
      v-for="f in features"
      :key="f.key"
      class="feature-card"
      :class="{ active: modelValue[f.key] }"
      @click="toggleFeature(f.key)"
    >
      <span class="text-sm">{{ f.label }}</span>
      <span v-if="modelValue[f.key]">✓</span>
    </div>
  </div>


  <!-- HOUSE FEATURES -->
  <div v-if="type === 'house'" class="space-y-6">

    <!-- number inputs -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="f in features" :key="f.key">
        <label class="text-sm text-gray-500">{{ f.label }}</label>

        <input
          type="number"
          min="0"
          v-model.number="modelValue[f.key]"
          @input="handleNumberInput(f.key)"
          class="input mt-1"
        />
      </div>
    </div>


    <!-- boolean features -->
    <div>
      <h3 class="font-semibold mb-3">Other Features</h3>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="f in otherHouseFeatures"
          :key="f.key"
          class="feature-card"
          :class="{ active: modelValue[f.key] }"
          @click="toggleFeature(f.key)"
        >
          <span class="text-xs">{{ f.label }}</span>
          <span v-if="modelValue[f.key]">✓</span>
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
    <p class="text-sm mt-1">
      Please select property type first.
    </p>
  </div>

</div>
</template>



<style scoped>
.section-title { @apply text-lg font-semibold; }

.input {
  @apply w-full border rounded-lg px-4 py-2 text-sm
         focus:outline-none focus:ring-2 focus:ring-black;
}

.feature-card {
  @apply p-3 border rounded-lg cursor-pointer
         flex justify-between items-center
         bg-white transition;
}

.feature-card:hover { @apply border-black; }

.feature-card.active {
  @apply bg-black text-white border-black;
}
</style>