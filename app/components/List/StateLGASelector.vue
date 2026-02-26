<template>
  <div class="border w-full space-y-6 p-5 rounded shadow">
    <!-- STATE SELECTION -->
    <div>
      <div class="bg-slate-100 px-4 py-4 font-semibold mb-1">State *</div>
      <div v-if="loadingStates">Loading  states...</div>
      <div v-else class="grid mt-5 gap-5 grid-cols-2 md:grid-cols-4">
        <div v-for="state in states" :key="state"
             @click="selectState(state)"
             :class="['checkpoint-row flex gap-2 cursor-pointer', { 'active': selectedState === state }]">
          <div class="checkpoint">
            <img v-if="selectedState === state" src="/image/icon/check.svg" class="w-3" />
          </div>
          <span class="text-xs">{{ state }}</span>
        </div>
      </div>
    </div>

    <!-- LGA SELECTION -->
    <div v-if="selectedState">
      <h2 class="section-title mb-2">Local Government Area *</h2>
      <select v-model="selectedLGA" class="input mt-2" :disabled="loadingLgas">
        <option value="">{{ loadingLgas ? 'Loading...' : 'Select LGA' }}</option>
        <option v-for="lga in lgas" :key="lga" :value="lga">{{ lga }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue'
import loadstates from '@/data/nigeria-states.js'

// Emits to parent component
const emit = defineEmits(['update:selectedState', 'update:selectedLGA'])

// Local reactive values
const states = ref([])
const lgas = ref([])
const loadingStates = ref(false)
const loadingLgas = ref(false)

const selectedState = ref('')
const selectedLGA = ref('')

// Load states on mount
onMounted(() => {
  loadingStates.value = true
  states.value = loadstates.map(s => s.name)
  loadingStates.value = false
})

// Watch selected state to emit changes
watch(selectedState, (newVal) => {
  emit('update:selectedState', newVal)
})

// Watch selected LGA to emit changes
watch(selectedLGA, (newVal) => {
  emit('update:selectedLGA', newVal)
})

// Load LGAs for the selected state
function loadLGAs(stateName) {
  if (!stateName) return
  loadingLgas.value = true
  try {
    const data = loadstates.find(s => s.name === stateName)?.lgas || []
    lgas.value = data
  } catch (e) {
    console.error(e)
    lgas.value = []
  }
  loadingLgas.value = false
}

// Select state
function selectState(name) {
  selectedState.value = name
  selectedLGA.value = ''
  lgas.value = []
  loadLGAs(name)
}
</script>

<style scoped>
.input { @apply w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black; }
.checkpoint { @apply w-4 h-4 border-2 border-gray-400 rounded flex items-center justify-center transition; }
.checkpoint-row.active .checkpoint { @apply bg-black border-black; }
</style>