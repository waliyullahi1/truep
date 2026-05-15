<script setup>
defineProps({
  title: {
    type: String,
    default: 'Under Maintenance'
  },

  message: {
    type: String,
    default:
      'We’re currently improving this page to give you a better experience. Some features may be temporarily unavailable while development is in progress.'
  },

  buttonText: {
    type: String,
    default: 'Go Back'
  },

  showButton: {
    type: Boolean,
    default: true
  }
})

const goBack = () => {
  window.history.back()
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
  >
    <div
      class="w-full max-w-lg rounded-3xl border border-white/10 bg-white/10 p-10 text-center text-white shadow-2xl backdrop-blur-xl"
    >
      <!-- Icon -->
      <div
        class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
          />
        </svg>
      </div>

      <!-- Title -->
      <h1 class="mb-3 text-3xl font-bold tracking-wide">
        {{ title }}
      </h1>

      <!-- Description -->
      <p class="mb-6 text-sm leading-7 text-gray-300">
        {{ message }}
      </p>

      <!-- Status -->
      <div
        class="mb-8 inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-4 py-2 text-sm text-yellow-300"
      >
        <span class="h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
        Development in Progress
      </div>

      <!-- Button -->
      <div
        v-if="showButton"
        class="flex justify-center"
      >
        <button
          @click="goBack"
          class="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 hover:bg-gray-200"
        >
          {{ buttonText }}
        </button>
      </div>


    </div>

    
  </div>
</template>