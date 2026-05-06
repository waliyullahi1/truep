<template>
  <div class="bg-[#FEFEFE]">

    <!-- HERO -->
    <header class="h-[60vh] hero-section flex items-center">
      <Container class="text-white text-center">
        
        <h1 class="text-2xl sm:text-4xl font-semibold">
          How can we help you today?
        </h1>

        <!-- Search -->
        <div class="mt-6 w-full sm:w-[60%] mx-auto bg-white rounded-lg shadow-lg p-2 flex gap-2">
          <input
            v-model="search"
            placeholder="Search land, houses, agents..."
            class="flex-1 px-3 py-2 outline-none text-gray-700"
          />
          <button
            @click="router.push('/search')"
            class="bg-primary text-white px-6 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

      </Container>
    </header>

    <!-- CATEGORY -->
    <section class="py-10">
      <Container>
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="(item, i) in categories"
            :key="i"
            class="px-5 py-2 border border-primary rounded-lg hover:bg-primary hover:text-white transition"
          >
            {{ item }}
          </button>
        </div>
      </Container>
    </section>

    <!-- CONTACT OPTIONS -->
    <section class="bg-slate-100 py-16">
      <Container>
        
        <div class="text-center mb-10">
          <UiTypographyH1>Contact Support</UiTypographyH1>
          <UiTypographyP>Choose how you want to reach us</UiTypographyP>
        </div>

        <div class="grid md:grid-cols-3 gap-6">

          <!-- PHONE -->
          <div class="bg-white p-6 rounded-xl shadow text-center space-y-3">
            <div class="text-3xl">📞</div>
            <h3 class="font-semibold text-lg">Call Us</h3>
            <p class="text-sm text-gray-600">Speak directly with support</p>
            <p class="font-medium">+234 800 000 0000</p>
          </div>

          <!-- EMAIL -->
          <div class="bg-white p-6 rounded-xl shadow text-center space-y-3">
            <div class="text-3xl">📧</div>
            <h3 class="font-semibold text-lg">Email</h3>
            <p class="text-sm text-gray-600">We reply within 24 hours</p>
            <a href="mailto:support@abanise.com" class="text-primary underline">
              support@abanise.com
            </a>
          </div>

          <!-- ADDRESS -->
          <div class="bg-white p-6 rounded-xl shadow text-center space-y-3">
            <div class="text-3xl">📍</div>
            <h3 class="font-semibold text-lg">Office</h3>
            <p class="text-sm text-gray-600">Visit our office</p>
            <p>Lagos, Nigeria</p>
          </div>

        </div>

      </Container>
    </section>

    <!-- CHATBOT / LIVE CHAT -->
    <section class="py-16">
      <Container>
        
        <div class="grid md:grid-cols-2 gap-10 items-center">

          <!-- TEXT -->
          <div>
            <UiTypographyH2>Chat with us instantly</UiTypographyH2>
            <UiTypographyP class="mt-3">
              Need quick help? Our chatbot is available 24/7 to assist you with finding properties, managing listings, and answering your questions.
            </UiTypographyP>

            <button
              @click="openChat = true"
              class="mt-5 bg-primary text-white px-6 py-2 rounded-lg"
            >
              Start Chat
            </button>
          </div>

          <!-- CHAT UI MOCK -->
          <div class="bg-white shadow rounded-xl p-4 h-72 flex flex-col">
            <div class="flex-1 overflow-y-auto text-sm space-y-2">
              <div class="bg-gray-100 p-2 rounded w-fit">
                👋 Hi! How can I help you today?
              </div>
              <div class="bg-primary text-white p-2 rounded w-fit ml-auto">
                I want to find a house
              </div>
              <div class="bg-gray-100 p-2 rounded w-fit">
                Sure! Which location are you interested in?
              </div>
            </div>

            <div class="mt-3 flex gap-2">
              <input
                placeholder="Type a message..."
                class="flex-1 border rounded px-2 py-1"
              />
              <button class="bg-primary text-white px-3 rounded">
                Send
              </button>
            </div>
          </div>

        </div>

      </Container>
    </section>
    
 <NavigationFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
definePageMeta({
  layout: 'main'
}) 
const router = useRouter()
const search = ref('')
const openChat = ref(false)

const categories = [
  'For Tenants',
  'For Landlords',
  'For Agents',
  'Business Inquiries'
]
</script>

<style>
header {
  background: linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.2)),
    url('assets/images/hero.webp');
  background-size: cover;
  background-position: center;
}
</style>