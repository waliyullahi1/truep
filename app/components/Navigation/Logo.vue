<template>
  <button :class=" big?'text-4xl':' text-xl'" @click="handleLogoClick" class="flex items-center font-bold gap-3 text-4xl text-secondary marcellus">
    <!-- <img src="@/assets/images/unilorin.png" alt="Logo" class=" w-12 object-contain" /> -->
      Abanise

      <div class=" relative  t right-2 h-2 w-2  bg-primary  rounded-full"></div>
     </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const projectName = config.public.projectName
defineProps({
 big:{
  type:String,
  default: false
  
 }
})

const handleLogoClick = () => {
  
  
  router.push('/')
}
</script>