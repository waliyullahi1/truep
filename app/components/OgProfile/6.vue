
<script setup>
defineProps({
  avatar: {
    type: String,
    default: "/image/profile.webp"
  },
  location:{
    type: String,
    default: "osun, iwo "
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
    default: "+2348000000000"
  },

  website: {
    type: String,
    default: "abanise.com"
  }
})
</script>

<template>
  <div
    class="w-[800px] h-[1200px] bg-[#f8f8f8] rounded-[50px] overflow-hidden relative shadow-2xl"
  >

    <!-- Top Hole -->
    <div
      class="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-zinc-700 z-20"
    />

    <!-- Brand -->
    <div
      class="pt-32 px-16"
    >
      <h1
        class="text-[90px] leading-[80px] font-black uppercase text-zinc-900"
      >
        {{ name.split(' ')[0] }}
      </h1>

      <h1
        class="text-[90px] leading-[80px] font-black uppercase text-zinc-900"
      >
        {{ name.split(' ').slice(1).join(' ') }}
      </h1>
    </div>

    <!-- Side Tag -->
    <div
      class="absolute right-0 top-[420px] bg-red-600 text-white px-4 py-8"
      style="writing-mode:vertical-rl"
    >
      VERIFIED
    </div>

    <!-- Image -->
    <div
      class="mt-12 px-16"
    >
      <div
        class="relative w-[420px] h-[520px] overflow-hidden rounded-[30px]"
      >
        <img
          :src="avatar"
          class="w-full h-full object-cover"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
        />
      </div>
    </div>

    <!-- Glass Card -->
    <div
      class="absolute left-10 right-10 bottom-10 glass-card"
    >

      <div class="flex justify-between items-start">

        <div>
          <h2
            class="text-4xl font-bold text-zinc-900"
          >
            {{ role }}
          </h2>

         
            <div v-if="location.state"  class=" flex items-center jus text-2xl font-medium text-black">
          <Icon  class="  font-bold text-4xl" name="heroicons:map-pin" /> {{ location }} state
        </div>
        

          <p
            class="text-xl text-zinc-600 mt-2"
          >
            {{ phone }}
          </p>
        </div>

        <div
          class="verified-badge"
        >
          <Icon
            name="heroicons:check-badge"
            class="w-10 h-10 text-red-500"
          />
        </div>

      </div>

    </div>

    <!-- Footer -->
    <div
      class="absolute bottom-4 left-0 right-0 text-center text-zinc-500 tracking-[8px]"
    >
      ABANISE • VERIFIED PROPERTY AGENT
    </div>

  </div>
</template>

<style scoped>
.glass-card{
  padding:30px;

  border-radius:32px;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,.9),
      rgba(255,255,255,.6)
    );

  backdrop-filter:
    blur(30px)
    saturate(180%);

  -webkit-backdrop-filter:
    blur(30px)
    saturate(180%);

  border:
    1px solid rgba(255,255,255,.7);

  box-shadow:
    0 10px 40px rgba(0,0,0,.15);
}

.verified-badge{
  width:80px;
  height:80px;

  display:flex;
  align-items:center;
  justify-content:center;

  border-radius:24px;

  background:
    rgba(255,255,255,.7);

  backdrop-filter:blur(20px);
}
</style>
