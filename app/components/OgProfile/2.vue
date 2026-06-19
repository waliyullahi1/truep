<script setup>
defineProps({
  avatar: {
    type: String,
    default: "/image/fhwfcidzkgchgvhx0jcd.jpg"
  },

  name: {
    type: String,
    default: "Waliu Waheed"
  },

  role: {
    type: String,
    default: "Property Agent"
  },

  phone: {
    type: String,
    default: "+234 800 000 0000"
  },

  email: {
    type: String,
    default: "hello@abanise.com"
  },

  website: {
    type: String,
    default: "abanise.com"
  },

  skills: {
    type: Array,
    default: () => ["Sales", "Negotiation", "Marketing"]
  }
})
</script>

<template>
  <div
    class="w-[800px] h-[1200px] relative overflow-hidden rounded-[40px] bg-gradient-to-br from-sky-100 via-white to-blue-100 shadow-2xl flex flex-col"
  >
    <!-- soft blue glow blobs -->
    <div class="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-400 blur-[120px] opacity-30 rounded-full"></div>
    <div class="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-sky-500 blur-[140px] opacity-30 rounded-full"></div>

    <!-- Header -->
    <div class="relative h-[200px] flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-5xl font-extrabold tracking-widest text-blue-900">
          ABANISE
        </h1>
        <p class="text-blue-600 mt-2 text-lg font-medium">
          Verified Property Marketplace
        </p>
      </div>
    </div>

    <!-- Glass Card -->
    <div class="relative mx-auto w-[90%] backdrop-blur-xl bg-white/40 border border-white/60 shadow-xl rounded-[35px] p-10 flex flex-col items-center">
      
      <!-- Avatar -->
      <div class="relative">
        <div class="absolute inset-0 rounded-full bg-blue-400 blur-xl opacity-40"></div>

        <div class="w-52 h-52 rounded-full p-2 bg-white shadow-xl relative">
          <img
            :src="avatar"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <!-- Name -->
      <h2 class="mt-6 text-4xl font-bold text-slate-800 tracking-tight">
        {{ name }}
      </h2>

      <p class="text-blue-600 text-xl font-medium mt-1">
        {{ role }}
      </p>
              <div class=" flex items-center jus text-2xl font-medium text-black">
          <Icon  class="  font-bold text-4xl" name="heroicons:map-pin" /> {{ location }} state
        </div>
       

      <!-- Divider -->
      <div class="w-full h-[1px] bg-white/60 my-8"></div>

      <!-- Skills -->
      <div class="flex flex-wrap justify-center gap-3">
        <span
          v-for="skill in skills"
          :key="skill"
          class="px-5 py-2 rounded-full bg-blue-100/70 text-blue-800 text-sm font-semibold backdrop-blur-md border border-blue-200"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- Contact Glass Panel -->
    <div class="mt-auto mx-6 mb-8 rounded-[30px] backdrop-blur-xl bg-blue-900/80 border border-white/10 text-white p-8 shadow-xl">
      
      <div class="space-y-6">
        <div class="flex items-center gap-4">
          <Icon name="heroicons:phone" class="w-6 h-6 text-blue-200" />
          <span class="text-lg tracking-wide">{{ phone }}</span>
        </div>

        <div class="flex items-center gap-4">
          <Icon name="heroicons:envelope" class="w-6 h-6 text-blue-200" />
          <span class="text-lg tracking-wide">{{ email }}</span>
        </div>

        <div class="flex items-center gap-4">
          <Icon name="heroicons:globe-alt" class="w-6 h-6 text-blue-200" />
          <span class="text-lg tracking-wide">{{ website }}</span>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-8 pt-6 border-t border-white/20 flex justify-between items-center">
        <span class="text-sm tracking-widest text-blue-200">
          AGENT ID • AB-2026
        </span>

        <div class="p-2 bg-white/10 rounded-xl backdrop-blur-md">
          <Icon name="heroicons:qr-code" class="w-12 h-12 text-white" />
        </div>
      </div>
    </div>
  </div>
</template>