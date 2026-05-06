<script setup>
import { ref } from 'vue'
import { ShieldCheck, HelpCircle, ChevronDown } from 'lucide-vue-next'

const isOpen = ref(true)

const tips = [
  "Do not make any inspection fee without seeing the agent and property.",
  "Only pay rental fee, sales fee or any upfront payment after you verify the landlord.",
  "Ensure you meet the agent in an open, public location.",
  "It's safer not to pay ahead for inspections.",
  "Ask friends or somebody you trust to accompany you for viewing.",
  "Look around the property to ensure it meets your expectations.",
  "Don't pay beforehand if they won't let you move in immediately.",
  "Verify that the account details belong to the right property owner before initiating payment."
]
</script>

<template>
  <div class="bg-blue-50 border border-blue-200 rounded-2xl p-5">

    <!-- HEADER -->
    <div
      class="flex items-center justify-between cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <div class="flex items-center gap-2 text-blue-700 font-semibold text-sm">
        <ShieldCheck class="w-5 h-5" />
        Safety Tips
        <HelpCircle class="w-4 h-4 text-blue-400" />
      </div>

      <ChevronDown
        :class="[
          'w-5 h-5 text-blue-500 transition-transform',
          isOpen ? 'rotate-180' : ''
        ]"
      />
    </div>

    <!-- CONTENT -->
    <transition name="fade">
      <div v-if="isOpen" class="mt-4">

        <ol class="space-y-3 text-blue-800 text-[12px] leading-relaxed">
          <li
            v-for="(tip, index) in tips"
            :key="index"
            class="flex gap-3"
          >
            <span class="font-semibold">{{ index + 1 }}.</span>
            <span>{{ tip }}</span>
          </li>
        </ol>

        <!-- DISCLAIMER -->
        <p class="text-xs text-blue-600 italic mt-4">
          Abanise is not liable for any monetary transaction between you and the agent/owner.
        </p>

      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>