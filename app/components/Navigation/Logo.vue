<template>
  <button @click="$emit('logoClicked')" class="flex items-center font-bold gap-3 text-2xl text-secondary marcellus">
    <!-- <img src="@/assets/images/unilorin.png" alt="Logo" class=" w-12 object-contain" /> -->
      Abanise

      <div class=" relative  t right-2 h-2 w-2  bg-primary  rounded-full"></div>
     </button>
</template>

<script setup>
const config = useRuntimeConfig()
const projectName = config.public.projectName
</script>