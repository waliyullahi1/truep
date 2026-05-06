<script setup>
import { ref } from 'vue'
import { BadgeCheck, Link, Phone,  MapPin, Star } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id 
const agent = ref({})

definePageMeta({
  layout: 'main'
})

const loadData = async () => {
  try {
    const response = await useApiFetch(`/profile/agents/${id}`, {
      method: 'GET'
    })
   
    console.log(response?.data?.data);
    
     agent.value = response?.data?.data || []
  } catch (err) {
    console.error('API ERROR:', err)
  }
}
loadData()
/* =============================
   SAMPLE DATA (REPLACE WITH API)
============================= */
const agents = ref({
  name: "AnuOluwapo Makinde",
  company: "Freeman Urban Homes",
  bn: "6978",
  rating: 0.0,
  reviews: 0,
  yearsExperience: 5,
  totalProperties: 1,
  location: {
    city: "Abeokuta",
    state: "Ogun"
  },
  about: `Rotarian Makinde Anuoluwapo is my name. MD of Freeman Urban Homes. I'm a Real Estate Investor, Consultant, Agent, Broker and Entrepreneur in Ogun State, Nigeria.

We Help You Find Your Perfect Home, Invest And Build Wealth, We are Expert in high-end real estate in Nigeria Offering bespoke luxury properties that captivate senses. We are registered company, incorporated with cooperate affairs commission of federal republic of Nigeria to carry out the business of real estate.`,
  skills: [
    "Residential",
    "Commercial",
    "Land",
    "Luxury",
    "Investment",
    "Property Management",
    "New Developments",
    "Rentals"
  ],
  avatar: "/image/profile.webp"
})

const activeTab = ref('reviews')
</script>

<template>
<div class="mt-20">

  <Container>

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row gap-6 items-start">

      <!-- LOGO -->
      <div class="sm:w-1/4  flex justify-center items-center  w-full">
       <img :src="agent?.avatar || '/image/abuja.png'"  class="w-full object-contain" />
      </div>

      <!-- INFO -->
      <div class="flex-1">

        <!-- NAME -->
        <div class="flex items-center gap-2">
          <h1 class="text-2xl font-semibold">
            
            {{ agent?.name  }}
          </h1>
          <BadgeCheck class="text-blue-500" />
        </div>

        <!-- BN -->
        <p class="text-sm text-gray-500">
          BN: {{ agent?.bn   ||  32733 }}
        </p>

        <!-- RATING -->
        <div class="flex items-center gap-2 mt-1 text-sm text-gray-500">
          <Star class="w-4" />
          {{ agent?.rating }} ({{ agent?.reviews }} reviews)
        </div>

        <!-- LOCATION -->
        <div class="flex items-center gap-2 mt-1 text-sm text-gray-500">
          <MapPin class="w-4" />
          {{ agent?.location?.city  || "Osun" }}, {{ agent?.location?.state  ||  "Iwo" }}
        </div>

        <!-- SKILLS -->
        <div class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="skill in agent?.skills"
            :key="skill"
            class="text-xs bg-gray-200 px-3 py-1 rounded"
          >
            {{ skill.name }}
          </span>
        </div>

        <!-- ABOUT -->
        <p class="text-sm text-gray-600 mt-4 leading-relaxed">
          {{ agent?.about }}
        </p>

        <!-- BUTTONS -->
        <div class="flex text-sm gap-3 mt-4">
          <button class="bg-secondary flex  gap-3 text-white px-4 py-2 rounded">
            <Phone class=" w-4 text-white" /> Contact Agent
          </button>

          <button class="border flex  gap-3 px-4 py-2 rounded">
          <Star class="w-4 text-gray-600" />  Write a Review
          </button>

          <button class="border flex  gap-3 px-4 py-2 rounded">
           <Link class="w-4 text-gray-600" />  Share Profile
          </button>
        </div>

      </div>
    </div>

    <!-- STATS -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

      <div class="border rounded-lg p-6 text-center">
        <h2 class="text-2xl font-bold">
          {{ agent?.properties?.length || 0 }}
        </h2>
        <p class="text-sm text-gray-500">Properties</p>
      </div>

      <div class="border rounded-lg p-6 text-center">
        <h2 class="text-2xl font-bold">
          {{ agent?.yearsExperience || 3 }}
        </h2>
        <p class="text-sm text-gray-500">Years Experience</p>
      </div>
     
      <div class="border rounded-lg p-6 text-center">
        <h2 class="text-2xl font-bold">
          {{ agent?.rating || 0 }}
        </h2>
        <p class="text-sm text-gray-500">Rating</p>
      </div>

      <div class="border rounded-lg p-6 text-center">
        <h2 class="text-2xl font-bold">
          {{ agent?.reviews || 0 }}
        </h2>
        <p class="text-sm text-gray-500">Reviews</p>
      </div>

    </div>

    <!-- TABS -->
    <div class="flex gap-6 mt-10 border-b pb-2 text-sm">
      <button
        @click="activeTab = 'about'"
        :class="activeTab === 'about' ? 'border-b-2 border-green-600 pb-1' : ''"
      >
        About
      </button>

      <button
        @click="activeTab = 'properties'"
        :class="activeTab === 'properties' ? 'border-b-2 border-green-600 pb-1' : ''"
      >
        Properties
      </button>

      <button
        @click="activeTab = 'reviews'"
        :class="activeTab === 'reviews' ? 'border-b-2 border-green-600 pb-1' : ''"
      >
        Reviews
      </button>
    </div>

    <!-- CONTENT -->
    <div class="border rounded-lg p-10 mt-4 text-center">

      <!-- REVIEWS -->
      <div v-if="activeTab === 'reviews'">

        <div class="flex flex-col items-center text-gray-500">
          <div class="text-4xl mb-3">💬</div>
          <p class="font-medium">No reviews yet</p>
          <p class="text-sm">Be the first to review this agent.</p>

          <button class="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Write a Review
          </button>
        </div>

      </div>

      <!-- ABOUT TAB -->
      <div v-if="activeTab === 'about'" class="text-left">
        <p class="text-gray-600 leading-relaxed">
          {{ agent?.about }}
        </p>
      </div>

      <!-- PROPERTIES TAB -->
      <div v-if="activeTab === 'properties'">
        <p class="text-gray-500">
          No properties uploaded yet.
        </p>
         
         <div  class="grid md:grid-cols-3 gap-6">
          
            <PropertyCard
            v-for="item in agent.properties"
            :key="item._id"
            :item="item"
          />

        </div>
      </div>

    </div>

  </Container>

</div>
</template>

<style scoped>
button {
  transition: 0.2s ease;
}
button:hover {
  opacity: 0.9;
}
</style>