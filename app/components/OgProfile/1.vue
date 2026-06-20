
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
  location:{
     type: String,
    default: "Osogbo, osun"
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
  <div class="w-[800px] h-[1200px]">
    <div
      :style="{
        backgroundImage: `url(${avatar || '/image/profile.webp'})`
      }"
      class="relative h-full w-full bg-cover bg-center bg-no-repeat rounded-[40px] overflow-hidden shadow-2xl flex flex-col"
    >
      <!-- Dark Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50"
      />

      <!-- Website -->
      <div
        class="absolute top-8 left-8 z-20 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10"
      >
        <div class="flex items-center gap-2 text-white">
          <Icon
            name="heroicons:globe-alt"
            class="w-5 h-5"
          />

          <span class="text-lg font-medium">
            {{ website }}
          </span>
        </div>
      </div>

      <!-- Header -->
      <div
        class="absolute top-8 right-8 z-20 text-right text-white"
      >
        <h1 class="text-2xl font-bold">
          ABANISE
        </h1>

        <p class="text-lg opacity-80">
          Verified Property Marketplace
        </p>
      </div>

      <!-- Bottom Apple Glass Panel -->
      <div class="mt-auto glass-panel text-white px-10 py-8 relative z-10">

        <!-- Glow -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 pointer-events-none"
        />

        <!-- Name -->
        <h2
          class="text-6xl font-bold text-white relative z-10"
        >
          {{ name }}
        </h2>
        
        <!-- Role -->
        <p
          class="text-3xl mt-3 text-white/80 relative z-10"
        >
          {{ role }}
        </p>
        <div v-if="location.state" class=" flex items-center jus text-2xl font-medium text-black">
          <Icon  class="  font-bold text-4xl" name="heroicons:map-pin" /> {{ location }} state
        </div>
       
        <!-- Skills + Verified -->
        <div
          class="flex flex-wrap gap-3 mt-8 items-center relative z-10"
        >
          <span
            v-for="skill in skills"
            :key="skill"
            class="px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white text-lg"
          >
            {{ skill }}
          </span>

          <div
            class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/20 backdrop-blur-xl"
          >
            <Icon
              name="heroicons:check-badge"
              class="w-6 h-6 text-emerald-400"
            />

            <span class="text-white">
              Verified Agent
            </span>
          </div>
        </div>

        <!-- Contact -->
        <div
          class="flex justify-between items-center mt-10 relative z-10"
        >
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
              {{ name.replace(/\s+/g, '').toLowerCase() }}@abanise.com
            </span>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="mt-6 pt-6 border-t border-white/10 flex justify-between items-center relative z-10"
        >
          <div>
            <p class="text-white/60 text-lg">
              Agent ID
            </p>

            <p class="text-2xl font-semibold">
              AB-2026
            </p>
          </div>

          <div
            class="w-24 h-24 rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center"
          >
            <Icon
              name="heroicons:qr-code"
              class="w-14 h-14 text-white"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-panel{
  min-height:420px;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,.18),
      rgba(255,255,255,.05)
    );

  backdrop-filter:
    blur(40px)
    saturate(200%);

  -webkit-backdrop-filter:
    blur(40px)
    saturate(200%);

  border-top:
    1px solid rgba(255,255,255,.25);

  box-shadow:
    0 -20px 60px rgba(0,0,0,.25);

  overflow:hidden;

  position:relative;
}

.glass-panel::before{
  content:"";

  position:absolute;

  top:-120px;
  right:-100px;

  width:350px;
  height:350px;

  border-radius:50%;

  background:
    radial-gradient(
      circle,
      rgba(255,255,255,.25),
      transparent 70%
    );

  filter:blur(20px);

  pointer-events:none;
}

.glass-panel::after{
  content:"";

  position:absolute;

  inset:0;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.12),
      transparent 40%
    );

  pointer-events:none;
}
</style>

