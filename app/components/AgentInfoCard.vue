<script setup>
import { Phone, MessageCircle, MapPin, Briefcase, Calendar } from 'lucide-vue-next'

const props = defineProps({
  agent: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white  text-black rounded-xl shadow-sm border p-4">
    
    <!-- TITLE -->
    <h2 class="text-[16px] font-semibold mb-4">Agent Information</h2>

    <div class="grid md:grid-cols-2 gap-8">

      <!-- LEFT SIDE -->
      <div class="space-y-6">

        <!-- CONTACT -->
        <div class=" text-sm">
          <h3 class="font-medium text-[16px] mb-3">Contact Information</h3>

          <div class="flex items-center  t gap-2 text-gray-700 mb-2">
            <Phone class="w-4 h-4" />
            <span>{{ agent.whatsapp_no  || "07068393706"  }}</span>
          </div>

          <div class="flex   items-center gap-2 text-gray-800">
            <MessageCircle class="w-3" />
            <span>WhatsApp: {{ agent.whatsapp_no || agent.phone || "07068393706"   }}</span>
          </div>
        </div>

        <!-- PROFESSIONAL -->
        <div>
          <h3 class="font-medium mb-3">Professional Details</h3>

          <div class="flex items-center gap-2 text-gray-700 mb-2">
            <Briefcase class="w-3" />
            <span>Agency: {{ agent.agency || 'N/A' }}</span>
          </div>

          <div class="ml-6 text-gray-700 mb-2">
            License: {{ agent.license || 'N/A' }}
          </div>

          <div class="flex items-center gap-2 text-gray-700">
            <Calendar class="w-4 h-4" />
            <span>Experience: {{ agent.yearOfExperience || `3 year` }} </span>
          </div>
        </div>

      </div>

      <!-- RIGHT SIDE -->
      <div class="space-y-6">

        <!-- AREA -->
        <div>
          <h3 class="font-medium mb-3">Areas Served</h3>

          <div class="flex items-center gap-2 text-gray-700">
            <MapPin class="w-4 h-4" />
            <span>
              Based in {{ agent.location?.city }}, {{ agent.location?.state }}
            </span>
          </div>

          <p class="text-gray-500 text-sm mt-1">
            Also serves:
            {{ agent.serves?.join(', ') || 'N/A' }}
          </p>
        </div>

        <!-- LANGUAGES -->
        <div>
          <h3 class="font-medium mb-3">Languages</h3>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="lang in agent.languages || []"
              :key="lang"
              class="px-3 py-1 text-sm border rounded-full bg-gray-50"
            >
              {{ lang }}
            </span>
          </div>
        </div>

        <!-- SOCIAL -->
        <div>
          <h3 class="font-medium mb-3">Social Media & Website</h3>

             <div class="mt-6 flex gap-6 text-2xl">

          <a v-if="agent.social_media.facebook" :href="agent.social_media.facebook" target="_blank">
            <Icon name="mdi:facebook" class="hover:text-blue-600" />
          </a>

          <a v-if="agent.social_media.instagram" :href="agent.social_media.instagram" target="_blank">
            <Icon name="mdi:instagram" class="hover:text-pink-600" />
          </a>

            <a v-if="agent.social_media.tiktok" :href="agent.social_media.tiktok" target="_blank">
            <Icon name="simple-icons:tiktok" class="text-black" />
            </a>

          <a v-if="agent.social_media.youtube" :href="agent.social_media.youtube" target="_blank">
            <Icon name="mdi:youtube" class="hover:text-red-600" />
          </a>

          <a v-if="agent.social_media.whatsapp" :href="agent.social_media.whatsapp" target="_blank">
            <Icon name="mdi:whatsapp" class="hover:text-green-600" />
          </a>

        

        </div>
        </div>

      </div>

    </div>
  </div>
</template>