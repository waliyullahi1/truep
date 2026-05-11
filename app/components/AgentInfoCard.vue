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
            <span>{{ agent.phone  || "07068393706"  }}</span>
          </div>

          <div class="flex   items-center gap-2 text-gray-800">
            <MessageCircle class="w-3" />
            <span>WhatsApp: {{ agent.whatsapp || agent.phone || "07068393706"   }}</span>
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
            <span>Experience: {{ agent.experience || 0 }} years</span>
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

          <div class="flex gap-4 text-gray-600">
            <a v-if="agent.socials?.instagram" :href="agent.socials.instagram" target="_blank">
              <i class="i-lucide-instagram text-xl"></i>
            </a>

            <a v-if="agent.socials?.linkedin" :href="agent.socials.linkedin" target="_blank">
              <i class="i-lucide-linkedin text-xl"></i>
            </a>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>