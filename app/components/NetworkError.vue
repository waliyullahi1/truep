<template>
  <div class="flex flex-col items-center justify-center py-32 text-center">
    
    <div class="text-6xl mb-4">
      <Network class=" w-24" />
    </div>

    <h2 class="text-xl font-semibold text-gray-800">
      {{ title }}
    </h2>

    <p class="text-gray-500 mt-2 max-w-md">
      {{ message }}
    </p>

    <button
      v-if="showRetry"
      :disabled="loading"
      @click="handleRetry"
      class="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
    >
      <span v-if="!loading">{{ retryText }}</span>

      <span v-else class="flex items-center gap-2">
        <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4" opacity="0.3"/>
          <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor"/>
        </svg>
        Loading...
      </span>
    </button>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Network } from 'lucide-vue-next' 
const props = defineProps({
  title: { type: String, default: 'Failed to load data' },
  message: { type: String, default: 'Something went wrong.' },
  showRetry: { type: Boolean, default: true },
  retryText: { type: String, default: 'Retry' }
})

const emit = defineEmits(['retry'])

const loading = ref(false)

const handleRetry = () => {
  loading.value = true

  // emit retry + pass callback to stop loading
  emit('retry', stopLoading)
}

const stopLoading = () => {
  loading.value = false
}
</script>