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
    default: () => [
      "Sales",
      "Negotiation",
      "Marketing"
    ]
  }
})
</script>

<template>
  <div class="w-[800px] h-[1200px] ">
    <div 
    :style="{
    backgroundImage: `url(${avatar || '/image/profile.webp'})`
  }"

    class=" h-full w-full bg-no-repeat  bg-contain bg-center  bg-white rounded-xl overflow-hidden shadow-xl flex flex-col"
  >
    <!-- Header -->
    <div
      class="h-[180px] bg-gradient-to-r from-blue-900 to-blue-900 flex items-center justify-center"
    >
      <div class="  w-full text-center text-white">
        <h1 class="text-2xl font-medium ">
         wwww.abanise.com
        </h1>

        <p class="text-xl mt-2 opacity-90">
          Verified Property Marketplace
        </p>
      </div>
    </div>
   <div 
  class="bg-cover bg-center bg-no-repeat w-full h-full"

>
        <!-- Profile -->
       

        <!-- Skills -->
        <div class="px-10 hidden mt-">
        <h3 class="text-xl font-bold text-slate-700 mb-4">
            Skills
        </h3>

        <div class="flex flex-wrap gap-3 justify-center">
            <span
            v-for="skill in skills.slice(0, 3)"
            :key="skill"
            class="px-5 py-3 rounded-full bg-blue-100 text-blue-700 font-semibold"
            >
            {{ skill }}
            </span>
        </div>
        </div>
   </div>
    <!-- Contact -->
    <div class="mt-auto   h-[500px] bg-gradient-to-b from-transparent via-blue-900 via-[30%] to-blue-950   text-white px-10 py-8">
         <h2 class="text-5xl  font-semibold mt-6   text-white">
          {{name}}
        </h2>

        <p class="text-4xl   mb-7    text-white font-medium">
            {{ role }}
        </p>

         <div class="px-10 flex jur my-5  gap-5 items-center   mt-">
            <h3 class="text-3xl font-medium  text-white ">
                Skills
            </h3>

            <div class="flex f gap-3 justify-center">
                <span
                v-for="skill in skills"
                :key="skill"
                class="px-5 py-2 text-xl  bg-blue-100 text-blue-700 font-semibold"
                >
                {{ skill }}
                </span>
            </div>
        </div>
      <div class="spac flex justify-between  items-center  ">
        
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

      <!-- Bottom -->
      <div
        class="mt-3 border-t border-blue-700 pt-5 flex justify-between items-center"
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
  </div>
 
</template>