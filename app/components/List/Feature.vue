<script setup>
import { ref, watch, computed } from 'vue'

/* ======================
   PROPS
====================== */
const props = defineProps({
  type: {
    type: String,
    default: 'land' // land | house
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])


/* ======================
   FEATURES DATA
====================== */

/* LAND */
 const landFeatures = [

  // ⭐ MOST IMPORTANT (show first)
  { key: 'dry', label: 'Dry Land' },
  { key: 'roadAccess', label: 'Good Road Access' },
  { key: 'tarredRoad', label: 'Tarred Road' },
  { key: 'fenced', label: 'Fenced' },
  { key: 'tableLand', label: 'Flat/Table Land' },

  // ⚡ utilities
  { key: 'electricity', label: 'Electricity Available' },
  { key: 'waterSupply', label: 'Water Supply Nearby' },
  { key: 'drainage', label: 'Drainage System' },
  { key: 'boreholePossible', label: 'Borehole Possible' },

  // 🏘 estate/location
  { key: 'gatedEstate', label: 'Inside Estate' },
  { key: 'security', label: 'Security Area' },
  { key: 'cornerPiece', label: 'Corner Piece' },
  { key: 'developedArea', label: 'Developed Neighborhood' },

  // 🌱 condition
  { key: 'sandFilled', label: 'Sand Filled' },
  { key: 'floodFree', label: 'Flood Free' },
  { key: 'cleared', label: 'Cleared/Ready to Build' },
  { key: 'rocky', label: 'Rocky Soil' }
]


/* HOUSE (numbers only) */
const houseFeatures = [
  { key: 'bedroom', label: 'Bedroom Count', type: 'number' },
  { key: 'bathroom', label: 'Bathroom Count', type: 'number' },
  { key: 'sittingRoom', label: 'Sitting Room Count', type: 'number' },
  { key: 'parking', label: 'Parking Space', type: 'number' },
  { key: 'toilet', label: 'Toilet Count', type: 'number' },
  { key: 'swimmingPool', label: 'Swimming Pool Count', type: 'number' }
]


/* HOUSE (boolean checkboxes) */
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
   LOCAL STATE
====================== */

const local = ref({ ...props.modelValue })


/* toggle checkbox */
const toggleFeature = (key) => {
  local.value[key] = !local.value[key]
}


/* sync parent */
watch(local, () => {
  emit('update:modelValue', local.value)
}, { deep: true })

watch(() => props.modelValue, (v) => {
  local.value = { ...v }
})
</script>



<template>
<div class="border w-full p-5 rounded-xl shadow space-y-6">

  <!-- TITLE -->
  <h2 class="section-title">
    {{ type === 'house' ? 'House Features' : 'Land Features' }}
  </h2>


  <!-- ======================
        LAND FEATURES
  ======================= -->
  <div
    v-if="type === 'land'"
    class="grid grid-cols-2 md:grid-cols-3 gap-4"
  >
  
    <div
      v-for="f in features"
      :key="f.key"
      class="feature-card"
      :class="{ active: local[f.key] }"
      @click="toggleFeature(f.key)"
    >
      <span class=" text-sm">{{ f.label }}</span>
      <span v-if="local[f.key]">✓</span>
    </div>
  </div>



  <!-- ======================
        HOUSE FEATURES
  ======================= -->
  <div v-if="type === 'house'" class="space-y-6">

    <!-- number inputs -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="f in features" :key="f.key">
        <label class="text-sm text-gray-500">
          {{ f.label }}
        </label>

        <input
          type="number"
          min="0"
          v-model.number="local[f.key]"
          class="input mt-1"
        />
      </div>
    </div>


    <!-- other features -->
    <div>
      <h3 class="font-semibold mb-3">Other Features</h3>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="f in otherHouseFeatures"
          :key="f.key"
          class="feature-card"
          :class="{ active: local[f.key] }"
          @click="toggleFeature(f.key)"
        >
          <span class="text-xs">{{ f.label }}</span>
          <span v-if="local[f.key]">✓</span>
        </div>
      </div>
    </div>

  </div>
  
  <div v-else class="bg-gray-50 border rounded-xl p-8 text-center text-gray-500">
    <p class="text-lg font-medium">No property selected</p>
    <p class="text-sm mt-1">Please select a listing purpose and property type to continue.</p>
  </div>
</div>
</template>



<style scoped>
.section-title {
  @apply text-lg font-semibold;
}

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