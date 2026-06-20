
<script setup>
defineProps({
  avatar: {
    type: String,
    default: "/image/profile.webp"
  },
  location:{
   type: String,
    default: "Lagos Ipaja area"
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
        backgroundImage: `url(${avatar})`
      }"
      class="relative w-full h-full overflow-hidden rounded-[50px] bg-cover bg-center"
    >
      <!-- Dark Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90"
      />

      <!-- Glow -->
      <div
        class="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/10 blur-[120px]"
      />

      <!-- Website -->
      <div
        class="absolute top-10 right-10 z-20 px-6 py-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/10"
      >
        <div class="flex items-center gap-2 text-white">
          <Icon
            name="heroicons:globe-alt"
            class="w-5 h-5"
          />
          <span class="text-lg">
            {{ website }}
          </span>
        </div>
      </div>

      <!-- Bottom Glass Card -->
      <div class="info-card">
        <div class="relative z-10">
          <!-- Name -->
          <h1
            class="text-6xl font-black text-white leading-none tracking-tight"
          >
            {{ name }}
          </h1>

          <!-- Role -->
           <div class=" flex items-center gap-4">
             <p
              class="mt-4 text-3xl text-white/80"
              >
               {{ role }}
             </p>

            
       

              <!-- Verified -->
          <div
            class="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-emerald-500/15 border border-emerald-400/20 backdrop-blur-xl"
          >
            <Icon
              name="heroicons:check-badge"
              class="w-7 h-7 text-emerald-400"
            />

            <span class="text-white font-medium">
              Verified Agent
            </span>
          </div>
           </div>
         

          <div v-if="location.state"  class=" flex items-center jus text-2xl font-medium text-black">
          <Icon  class="  font-bold text-4xl" name="heroicons:map-pin" /> {{ location }} state
        </div>

          <!-- Skills -->
         
          <!-- Contact -->
          <div
            class="mt-5 flex flex-  justify-between gap-5"
          >
            <div
              class="flex items-center gap-4 text-white"
            >
              <Icon
                name="heroicons:phone"
                class="w-6 h-6"
              />

              <span class="text-2xl">
                {{ phone }}
              </span>
            </div>

            <div
              class="flex items-center gap-4 text-white"
            >
              <Icon
                name="heroicons:envelope"
                class="w-6 h-6"
              />

              <span class="text-2xl">
                {{ name.replace(/\s+/g, '').toLowerCase() }}@abanise.com
              </span>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="mt-10 pt-3 border-t border-white/10 flex justify-between items-center"
          >
            <div>
              <p class="text-white/60 text-lg">
                Powered by
              </p>

              <p
                class="text-white text-2xl font-bold"
              >
                ABANISE
              </p>
            </div>

            <div
              class="w-24 h-24 rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center"
            >
              <Icon
                name="heroicons:qr-code"
                class="w-14 h-14 text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Branding -->
      <div
        class="absolute bottom-5 left-0 right-0 text-center text-white/40 text-sm tracking-[10px]"
      >
        TRUST • VERIFY • CONNECT
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-card{
  position:absolute;

  left:0;
  right:0;
  bottom:0;

  padding:50px;

  border-radius:45px 45px 0 0;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.18),
      rgba(255,255,255,.06)
    );

  backdrop-filter:
    blur(35px)
    saturate(200%);

  -webkit-backdrop-filter:
    blur(35px)
    saturate(200%);

  border-top:
    1px solid rgba(255,255,255,.25);

  box-shadow:
    0 -10px 50px rgba(0,0,0,.35);

  overflow:hidden;
}

.info-card::before{
  content:"";

  position:absolute;

  top:-100px;
  left:-100px;

  width:300px;
  height:300px;

  border-radius:50%;

  background:
    radial-gradient(
      circle,
      rgba(255,255,255,.25),
      transparent 70%
    );

  pointer-events:none;
}

.info-card::after{
  content:"";

  position:absolute;

  inset:0;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.12),
      transparent
    );

  pointer-events:none;
}
</style>

