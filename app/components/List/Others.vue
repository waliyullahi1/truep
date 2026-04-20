<script setup>
import { ref, watch } from 'vue'


/* ======================
   PROPS
====================== */
const props = defineProps({
  type: {
    type: String,
    default: 'house' // land | house
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

/* ======================
   LOCAL STATE
====================== */
const local = ref({ ...props.modelValue })

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
    {{ props.type === 'house' ? 'House Other Features' : 'Land Other Features' }}
  </h2>

  <!-- LAND OTHER FEATURES -->
  <div v-if="props.type === 'land'" class="gap-4">
    <ListLandother v-model="local" />
  </div>

  <!-- HOUSE OTHER FEATURES -->
  <div v-if="props.type === 'house'" class="">
    <
    <ListHouseother v-model="local" />
  </div>

  <!-- NOTHING SELECTED -->
  <div v-else>
    <h3>Nothing selected</h3>
  </div>
</div>
</template>

<style scoped>
.section-title {
  @apply text-lg font-semibold;
}
</style>