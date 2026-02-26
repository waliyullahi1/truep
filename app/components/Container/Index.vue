<template>
  <div
    class="w-full max-w-6xl mx-auto px-4 sm:px-6"
    :class="[addTopBottomPadding ? 'py-10 lg:py-10' : '']"
  >
    <slot />
  </div>
</template>



<script setup lang="ts">
defineProps({
  addTopBottomPadding: {
    type: Boolean,
    default: true,
  },
});
</script>
