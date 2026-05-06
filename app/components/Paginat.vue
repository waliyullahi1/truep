<script setup>
import { computed } from 'vue'

const props = defineProps({
  total: Number,        // total items
  perPage: Number,      // items per page
  modelValue: Number    // current page (v-model)
})

const emit = defineEmits(['update:modelValue'])

const totalPages = computed(() =>
  Math.ceil(props.total / props.perPage)
)

const currentPage = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const pages = computed(() => {
  const arr = []
  for (let i = 1; i <= totalPages.value; i++) {
    arr.push(i)
  }
  return arr
})

const goTo = (p) => {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
}
</script>

<template>
  <div class="flex items-center justify-center gap-4 py-6 text-sm">

    <!-- BACK -->
    <button
      @click="goTo(currentPage - 1)"
      :disabled="currentPage === 1"
      class="flex font-semibold items-center gap-1 text-gray-400 disabled:opacity-40"
    >
      ← Back
    </button>

    <!-- PAGE NUMBERS -->
    <div class="flex items-center gap-2">

      <button
        v-for="p in pages"
        :key="p"
        @click="goTo(p)"
        class="w-10 font-semibold h-10 rounded-md flex items-center justify-center"
        :class="p === currentPage
          ? 'bg-red-500 text-white'
          : 'text-gray-500 hover:bg-gray-100'"
      >
        {{ p }}
      </button>

    </div>

    <!-- NEXT -->
    <button
      @click="goTo(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="flex items-center font-semibold gap-1 text-red-500 disabled:opacity-40"
    >
      Next →
    </button>

  </div>
</template>