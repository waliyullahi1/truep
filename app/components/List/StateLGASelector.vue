<template>
  <div class="border w-full space-y-6 p-5 rounded shadow">

    <!-- STATE SELECTION -->
    <div>
      <div class="bg-slate-100 px-4 py-4 font-semibold mb-1">
        State *
      </div>

      <div v-if="loadingStates">
        Loading states...
      </div>

      <div v-else class="grid mt-5 gap-5 grid-cols-2 md:grid-cols-4">

        <div
          v-for="state in states"
          :key="state"
          @click="selectState(state)"
          :class="[
            'checkpoint-row flex gap-2 cursor-pointer',
            { 'active': location.state === state }
          ]"
        >
          <div class="checkpoint">
            <img
              v-if="location.state === state"
              src="/image/icon/check.svg"
              class="w-3"
            />
          </div>

          <span class="text-xs">{{ state }}</span>
        </div>

      </div>
    </div>


    <!-- LGA SELECTION -->
    <div v-if="location.state">
      <h2 class="section-title mb-2">
        Local Government Area *
      </h2>

      <select
        v-model="location.city"
        class="input mt-2"
        :disabled="loadingLgas"
      >
        <option value="">
          {{ loadingLgas ? 'Loading...' : 'Select LGA' }}
        </option>

        <option
          v-for="lga in lgas"
          :key="lga"
          :value="lga"
        >
          {{ lga }}
        </option>

      
      </select>
    
             <div class=" mt-8"></div> <input
          v-model="location.address"
          placeholder="School name"
          class="border w-full p-2 rounded"
        />
    </div>

  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import loadstates from '@/data/nigeria-states.js'

/* =========================
   V-MODEL (OBJECT)
========================= */

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      state: '',
      city: '',
      address: ''
    })
  }
})

const emit = defineEmits(['update:modelValue'])

const location = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})


/* =========================
   LOCAL STATE
========================= */

const states = ref([])
const lgas = ref([])
const loadingStates = ref(false)
const loadingLgas = ref(false)


/* =========================
   LOAD STATES
========================= */

onMounted(() => {
  loadingStates.value = true
  states.value = loadstates.map(s => s.name)
  loadingStates.value = false

  // Load LGAs if state already exists (edit mode)
  if (location.value.state) {
    loadLGAs(location.value.state)
  }
})


/* =========================
   LOAD LGAS
========================= */

function loadLGAs(stateName) {
  if (!stateName) return

  loadingLgas.value = true

  const data =
    loadstates.find(s => s.name === stateName)?.lgas || []

  lgas.value = data

  loadingLgas.value = false
}


/* =========================
   SELECT STATE
========================= */

function selectState(name) {
  location.value = {
    ...location.value,
    state: name,
    city: '',
    address: ''
  }

  lgas.value = []
  loadLGAs(name)
}
</script>


<style scoped>
.input {
  @apply w-full border rounded-lg px-4 py-2 text-sm
  focus:outline-none focus:ring-2 focus:ring-black;
}

.checkpoint {
  @apply w-4 h-4 border-2 border-gray-400 rounded
  flex items-center justify-center transition;
}

.checkpoint-row.active .checkpoint {
  @apply bg-black border-black;
}
</style>