
<script setup>
defineProps({
  avatar: {
    type: String,
    default: "/image/profile.webp"
  },

  location:{
    type: String,
    default: "lagos ilefe"
  },

  name: {
    type: String,
    default: "Waliu Waheed"
  },

  role: {
    type: String,
    default: "Senior Property Consultant"
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
      "Leasing",
      "Marketing"
    ]
  }
})
</script>

<template>
  <div
    class="w-[800px] h-[1200px] overflow-hidden rounded-[50px] relative bg-white"
  >
    <!-- PHOTO -->
    <img
      :src="avatar"
      class="absolute inset-0 w-full h-full object-cover"
    >

    <!-- DARK OVERLAY -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80"
    />

    <!-- RED BRAND BAR -->
    <div
      class="absolute left-0 top-0 h-full w-6 bg-gradient-to-b from-red-500 to-red-700 z-20"
    />

    <!-- TOP BRAND -->
    <div
      class="absolute top-10 left-12 right-12 z-20 flex justify-between items-center"
    >
      <div>
        <h1
          class="text-white text-4xl font-black tracking-wider"
        >
          ABANISE
        </h1>

        <p
          class="text-white/80 text-lg"
        >
          Verified Property Agent
        </p>
      </div>

      <div
        class="px-5 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10"
      >
        <div class="flex items-center gap-2 text-white">
          <Icon
            name="heroicons:globe-alt"
            class="w-5 h-5"
          />

          <span>
            {{ website }}
          </span>
        </div>
      </div>
    </div>

    <!-- APPLE GLOW -->
    <div
      class="absolute -top-32 right-[-100px] w-[400px] h-[400px] rounded-full bg-white/10 blur-[120px]"
    />

    <!-- GLASS CARD -->
    <div class="glass-card">

      <div class="relative z-10">

        <!-- VERIFIED -->
        <div
          class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-red-500/20 border border-red-400/20 backdrop-blur-xl"
        >
          <Icon
            name="heroicons:check-badge"
            class="w-6 h-6 text-red-400"
          />

          <span class="text-white font-medium">
            Verified Agent
          </span>
        </div>

        <!-- NAME -->
        <h2
          class="mt-6 text-6xl font-black text-white leading-none"
        >
          {{ name }}
        </h2>

        <!-- ROLE -->
        <p
          class="mt-3 text-3xl text-white/80"
        >
          {{ role }}
        </p>
         <div v-if="location.state"  class=" flex items-center jus text-2xl font-medium text-black">
          <Icon  class="  font-bold text-4xl" name="heroicons:map-pin" /> {{ location }} state
        </div>
        <!-- SKILLS -->
        

        <!-- CONTACT -->
        <div
          class="mt-5    flex    justify-between "
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
              {{ name.replace(/\s+/g,'').toLowerCase() }}@abanise.com
            </span>
          </div>
        </div>
        
        <!-- FOOTER -->
        <div
          class="mt-10 pt-6 border-t border-white/10 flex justify-between items-center"
        >
          <div>
            <p
              class="text-white/60"
            >
              Powered By
            </p>

            <h3
              class="text-white text-3xl font-bold"
            >
              ABANISE
            </h3>
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

    <!-- BOTTOM TEXT -->
    <div
      class="absolute bottom-5 left-0 right-0 text-center text-white/40 tracking-[10px] text-sm"
    >
      TRUST • VERIFY • CONNECT
    </div>
  </div>
</template>

<style scoped>
.glass-card{
  position:absolute;

  left:25px;
  right:25px;
  bottom:25px;

  padding:45px;

  border-radius:40px;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,.22),
      rgba(255,255,255,.05)
    );

  backdrop-filter:
    blur(40px)
    saturate(200%);

  -webkit-backdrop-filter:
    blur(40px)
    saturate(200%);

  border:
    1px solid rgba(255,255,255,.2);

  box-shadow:
    0 15px 50px rgba(0,0,0,.35);

  overflow:hidden;
}

.glass-card::before{
  content:"";

  position:absolute;

  top:-120px;
  right:-120px;

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

.glass-card::after{
  content:"";

  position:absolute;

  inset:0;

  border-radius:40px;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.12),
      transparent
    );

  pointer-events:none;
}
</style>

