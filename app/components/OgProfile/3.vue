
<script setup>
defineProps({
  avatar: {
    type: String,
    default: "/image/fhwfcidzkgchgvhx0jcd.jpg"
  },
  location:{
     type: String,
    default: "osun osogbo"
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
  <div class="w-[800px] h-[1200px]">
    <div
      :style="{
        backgroundImage: `url(${avatar || '/image/profile.webp'})`
      }"
      class="relative h-full w-full bg-cover bg-center rounded-[50px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.45)]"
    >
      <!-- Dark Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70"
      />

      <!-- Header -->
      <div
        class="absolute top-0 left-0 right-0 h-[180px] bg-gradient-to-r from-black/80 via-black/50 to-transparent backdrop-blur-md z-10 flex items-center justify-center"
      >
        <div class="text-center text-white">
         
          <div class="flex justify-center i items-center gap-4 text-white">
              <Icon
                name="heroicons:globe-alt"
                class="w-7 h-7"
              />

              <span class="text-xl">
                www.abanise.com
              </span>
            </div>

          <p class="text-2xl mt-3 opacity-80">
            Verified Real Estate Professionals
          </p>
        </div>
      </div>

      <!-- Bottom Glass Card -->
      <div class="info-card">
        <div class="relative z-10">
          <!-- Name -->
          <h2
            class="text-6xl font-bold tracking-tight text-white drop-shadow-lg"
          >
            {{ name }}
          </h2>

          <!-- Role -->
          <p class="text-3xl mt-3 text-white/90">
            {{ role }}
          </p>
                  <div v-if="location.state"  class=" flex items-center jus text-2xl font-medium text-black">
          <Icon  class="  font-bold text-4xl" name="heroicons:map-pin" /> {{ location }} state
        </div>
       

          <!-- Verified Badge -->
         

          <!-- Skills -->
          <div class="flex flex-wrap gap-3 mt-8">
            <span
              v-for="skill in skills"
              :key="skill"
              class="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-lg font-medium"
            >
              {{ skill }}
            </span>
             <div
            class="inline-flex items-center gap-2 px-5 py-2 mt-6 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-md"
          >
            <Icon
              name="heroicons:check-badge"
              class="w-6 h-6 text-green-400"
            />

            <span class="text-lg text-white">
              Verified Agent
            </span>
          </div>
          </div>

          <!-- Contact -->
          <div class="mt-10  flex gap-4">
            <div class="flex items-center gap-4 text-white">
              <Icon
                name="heroicons:phone"
                class="w-7 h-7"
              />

              <span class="text-xl">
                {{ phone }}
              </span>
            </div>

            <div class="flex items-center gap-4 text-white">
              <Icon
                name="heroicons:envelope"
                class="w-7 h-7"
              />

              <span class="text-xl">
                {{ name.replace(/\s+/g, '').toLowerCase() }}@abanise.com
              </span>
            </div>

            
          </div>

          <!-- Bottom -->
          <div
            class="mt-10 pt-6 border-t border-white/20 flex justify-between items-center"
          >
            <div>
              <p class="text-lg text-white/70">
                Agent ID
              </p>

              <p class="text-2xl font-semibold text-white">
                AB-2026
              </p>
            </div>

            <div
              class="w-24 h-24 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md"
            >
              <Icon
                name="heroicons:qr-code"
                class="w-14 h-14 text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Branding -->
      <div
        class="absolute bottom-8 left-0 right-0 text-center text-white/40 text-lg tracking-[8px]"
      >
        TRUST • VERIFY • CONNECT
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-card {
  position: absolute;
  left: 50px;
  bottom: 90px;

  width: 700px;

  padding: 40px;

  border-radius: 40px;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.22),
    rgba(255, 255, 255, 0.08)
  );

  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);

  border: 1px solid rgba(255, 255, 255, 0.3);

  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.25),
    inset 0 1px 1px rgba(255, 255, 255, 0.5),
    inset 0 -1px 1px rgba(255, 255, 255, 0.1);

  overflow: hidden;
}

.info-card::before {
  content: "";

  position: absolute;

  top: -50%;
  left: -20%;

  width: 350px;
  height: 350px;

  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.4),
    transparent 70%
  );

  pointer-events: none;
}

.info-card::after {
  content: "";

  position: absolute;

  inset: 0;

  border-radius: 40px;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.12),
    transparent
  );

  pointer-events: none;
}
</style>

