
<script setup>
defineProps({
  avatar: {
    type: String,
    default: "/image/profile.webp"
  },

  name: {
    type: String,
    default: "Waliu Waheed"
  },

  role: {
    type: String,
    default: "Property Consultant"
  },

  id: {
    type: String,
    default: "ABA2025001"
  },

  website: {
    type: String,
    default: "abanise.com"
  }
})
</script>

<template>
  <div
    class="w-[800px] h-[1200px] bg-[#f3f3f3] rounded-[45px] overflow-hidden relative shadow-2xl"
  >
    <!-- Logo -->
    <div class="absolute top-14 left-12">
      <div
        class="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center"
      >
        <span class="text-white text-2xl font-black">
          {{name[0]}}
        </span>
      </div>
    </div>

    <!-- Brand -->
    <div class="absolute top-16 right-12 text-right">
      <h1
        class="text-4xl font-bold text-zinc-900"
      >
        ABANISE
      </h1>

      <p
        class="text-zinc-500 text-lg"
      >
        Verified Agent
      </p>
    </div>

    <!-- Portrait -->
    <div
      class="absolute left-12 right-12 top-[180px]"
    >
      <div
        class="relative overflow-hidden rounded-[35px]"
      >
        <img
          :src="avatar"
          class="w-full h-[620px] object-cover"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
        />
      </div>
    </div>

    <!-- White Info Area -->
    <div
      class="absolute bottom-0 left-0 right-0 h-[340px] bg-white rounded-t-[70px]"
    >
      <!-- Curve Decoration -->
      <div
        class="absolute -top-24 right-0 w-[320px] h-[180px] bg-white rounded-bl-[120px]"
      />

      <div
        class="relative z-10 px-12 pt-16"
      >
        <h2
          class="text-6xl font-bold text-zinc-900 leading-tight"
        >
          {{ name }}
        </h2>

        <p
          class="text-2xl text-zinc-500 mt-4"
        >
          {{ role }}
        </p>

        <!-- Verified -->
        <div
          class="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-red-50 border border-red-100"
        >
          <Icon
            name="heroicons:check-badge"
            class="w-6 h-6 text-red-600"
          />

          <span
            class="font-medium text-red-600"
          >
            Verified by Abanise
          </span>
        </div>

        <!-- Footer -->
        <div
          class="mt-12 flex justify-between items-end"
        >
          <div>
            <p
              class="text-zinc-400 text-sm"
            >
              AGENT ID
            </p>

            <p
              class="font-semibold text-zinc-800"
            >
              {{ id }}
            </p>
          </div>

          <div
            class="text-right"
          >
            <p
              class="text-zinc-400 text-sm"
            >
              WEBSITE
            </p>

            <p
              class="font-semibold text-zinc-800"
            >
              {{ website }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Vertical Verified -->
    <div
      class="absolute right-0 top-[650px] bg-red-600 text-white px-4 py-8 rounded-l-2xl"
      style="writing-mode:vertical-rl"
    >
      VERIFIED
    </div>
  </div>
</template>

