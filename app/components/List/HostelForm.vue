<template>
  <div class="border w-full p-2 sm:p-5 space-y-6 rounded-2xl">

    <!-- SCHOOL -->
    <div>
      <h2 class="section-title mb-2">
        School *
      </h2>

      <select
        v-model="schoolModel"
        class="input"
        :disabled="!state"
      >
        <option value="">
          Select School
        </option>

        <option
          v-for="item in filteredSchools"
          :key="item.abbreviation"
          :value="item.abbreviation"
        >
          {{ item.abbreviation }} - {{ item.name }}
        </option>
      </select>
    </div>

    <!-- HOSTEL TYPE -->
    <div>
      <h2 class="section-title mb-3">
        Hostel Type *
      </h2>

      <div class="flex flex-wrap gap-4 mt-2">

        <div
          v-for="item in hostelTypes"
          :key="item"
          @click="updateHostel('gender', item)"
          class="flex items-center gap-2 cursor-pointer"
        >
          <div
            :class="[
              'checkpoint',
              {
                'bg-black border-black': hostel.gender === item
              }
            ]"
          >
            <img
              v-if="hostel.gender === item"
              src="/image/icon/check.svg"
              class="w-2"
            />
          </div>

          <span class="text-sm">
            {{ item }}
          </span>
        </div>

      </div>
    </div>

    <!-- HOSTEL NAME -->
    <div>
      <h2 class="section-title mb-2">
        Hostel Name
        <span class="text-gray-400 text-xs">
          (Optional)
        </span>
      </h2>

      <input
        :value="hostel.name"
        @input="updateHostel('name', $event.target.value)"
        type="text"
        placeholder="e.g White House Hostel"
        class="input"
      />
    </div>

  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import schoolsByState from '@/data/institutions'

/* ================= HOSTEL TYPES ================= */

const hostelTypes = [
  'Mixed',
  'Male',
  'Female'
]

/* ================= DEFAULT ================= */

const defaultData = {
  school: null,
  gender: 'Mixed',
  name: ''
}

/* ================= PROPS ================= */

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },

  state: {
    type: String,
    default: ''
  }
})

/* ================= EMITS ================= */

const emit = defineEmits([
  'update:modelValue'
])

/* ================= HOSTEL MODEL ================= */

const hostel = computed(() => ({
  ...defaultData,
  ...(props.modelValue || {})
}))

/* ================= UPDATE ================= */

function updateHostel(key, value) {
  emit('update:modelValue', {
    ...hostel.value,
    [key]: value
  })
}

/* ================= FILTER SCHOOLS ================= */

const filteredSchools = computed(() => {

  if (!props.state) return []

  const stateData = schoolsByState.find(
    item =>
      item.state.toLowerCase() ===
      props.state.toLowerCase()
  )

  return stateData?.schools || []
})

/* ================= SCHOOL V-MODEL ================= */

const schoolModel = computed({

  get() {
    return hostel.value.school?.abbreviation || ''
  },

  set(abbreviation) {

    const school = filteredSchools.value.find(
      item => item.abbreviation === abbreviation
    )

    emit('update:modelValue', {
      ...hostel.value,
      school: school || null
    })
  }

})

/* ================= INITIALIZE ================= */

watch(
  () => props.modelValue,
  (val) => {

    const merged = {
      ...defaultData,
      ...(val || {})
    }

    if (
      JSON.stringify(merged) !==
      JSON.stringify(val)
    ) {
      emit('update:modelValue', merged)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

/* ================= RESET SCHOOL ON STATE CHANGE ================= */

watch(
  () => props.state,
  (newState, oldState) => {

    if (!oldState) return

    emit('update:modelValue', {
      ...hostel.value,
      school: null
    })
  }
)

</script>

<style scoped>
.input {
  @apply w-full border rounded-xl px-4 py-3 text-sm
  focus:outline-none focus:ring-2 focus:ring-black;
}

.checkpoint {
  @apply w-4 h-4 rounded-full border
  flex items-center justify-center
  transition-all duration-200;
}
</style>