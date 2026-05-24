<template>
  <div class="relative inline-block">
    <button  @click="toggle" class="md:px-4 md:py-2 text-nowrap flex gap-2 font-normal px-2 py-1 rounded text-sm" :class="  isMap ? 'bg-tertiary text-white' : ' bg-white/40 text-tertiary border border-tertiary text'">
        <img src="@/assets/images/icons/suggest.svg" class=" w-4" alt=""> 
        <span class="capitalize">{{ selectedLabel }}</span>
    </button>
    <!-- TRIGGER -->
 

    <!-- DROPDOWN -->
    <div
      v-if="open"
      class="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-50 overflow-hidden"
    >
      <button
        v-for="item in options"
        :key="item.value"
        @click="select(item)"
        class="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition"
        :class="selected === item.value ? 'bg-gray-100 font-medium' : ''"
      >
        {{ item.label }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['update'])

const props = defineProps({
  modelValue: String
})

const open = ref(false)
const selected = ref(props.modelValue || 'suggested')

const options = [
  { label: 'Suggested', value: 'suggested' },
  { label: 'Newest', value: 'newest' },
  { label: 'Cheapest', value: 'cheapest' },
  { label: 'Most expensive', value: 'expensive' },
  { label: 'Smallest', value: 'smallest' },
  { label: 'Biggest', value: 'biggest' }
]

const selectedLabel = computed(() => {
  return options.find(o => o.value === selected.value)?.label || 'Sort'
})

const toggle = () => {
  open.value = !open.value
}

const select = (item) => {
  selected.value = item.value
  open.value = false

  // 🔥 send to parent
  emit('update', item.value)
}

// close on outside click
const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>