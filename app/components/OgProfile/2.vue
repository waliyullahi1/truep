<script setup>
defineProps({
  avatar: {
    type: String,
    default: "/images/avatar.jpg"
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
    default: () => [
      "Sales",
      "Negotiation",
      "Marketing"
    ]
  }
})
</script>

<template>
  <div
    class="w-[800px] h-[1200px] bg-white rounded-xl overflow-hidden shadow-xl flex flex-col"
  >
    <!-- Header -->
    <div
      class="h-[180px] bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center"
    >
      <div class="text-center text-white">
        <h1 class="text-5xl font-bold">
          ABANISE
        </h1>

        <p class="text-lg mt-2 opacity-90">
          Verified Property Marketplace
        </p>
      </div>
    </div>

    <!-- Profile -->
    <div class="flex flex-col items-center -mt-20">
      <div
        class="w-64 h-64 rounded-full overflow-hidden border-[10px] border-blue-600 bg-white"
      >
        <img
          :src="avatar"
          class="w-full h-full object-cover"
        />
      </div>

      <h2 class="text-5xl font-bold mt-6 text-slate-800">
        {{ name }}
      </h2>

      <p class="text-2xl text-blue-600 font-medium">
        {{ role }}
      </p>
    </div>

    <!-- Skills -->
    <div class="px-10 mt-10">
      <h3 class="text-xl font-bold text-slate-700 mb-4">
        Skills
      </h3>

      <div class="flex flex-wrap gap-3 justify-center">
        <span
          v-for="skill in skills"
          :key="skill"
          class="px-5 py-3 rounded-full bg-blue-100 text-blue-700 font-semibold"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- Contact -->
    <div class="mt-auto bg-blue-900 text-white px-10 py-8">
      <div class="space-y-5">
        <div class="flex items-center gap-4">
          <Icon
            name="heroicons:phone"
            class="w-7 h-7"
          />

          <span class="text-xl">
            {{ phone }}
          </span>
        </div>

        <div class="flex items-center gap-4">
          <Icon
            name="heroicons:envelope"
            class="w-7 h-7"
          />

          <span class="text-xl">
            {{ email }}
          </span>
        </div>

        <div class="flex items-center gap-4">
          <Icon
            name="heroicons:globe-alt"
            class="w-7 h-7"
          />

          <span class="text-xl">
            {{ website }}
          </span>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="mt-8 border-t border-blue-700 pt-5 flex justify-between items-center"
      >
        <span class="text-lg">
          Agent ID: AB-2026
        </span>

        <Icon
          name="heroicons:qr-code"
          class="w-16 h-16"
        />
      </div>
    </div>
  </div>
</template>