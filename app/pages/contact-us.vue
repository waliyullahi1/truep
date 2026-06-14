<template>
  <div class="bg-[#FEFEFE]">

    <!-- HERO -->
<header class="relative overflow-hidden py-24 hero-section">

  <div class="absolute inset-0 bg-black/50"></div>

  <Container class="relative z-10 text-center text-white">

    <div
      class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6"
    >
      <Icon
        name="heroicons:lifebuoy"
        class="w-5 h-5"
      />
      <span>Support Center</span>
    </div>

    <h1
      class="text-4xl md:text-6xl font-bold leading-tight"
    >
      How can we help you today?
    </h1>

    <p
      class="max-w-2xl mx-auto mt-4 text-lg text-white/90"
    >
      Find answers, contact support, or chat with our team.
    </p>

    <div
      class="mt-8 bg-white rounded-2xl shadow-2xl p-2 max-w-3xl mx-auto flex"
    >
      <input
        v-model="search"
        placeholder="Search for help..."
        class="flex-1 px-4 py-3 text-gray-700 outline-none"
      >

      <button
        class="bg-primary text-white px-8 rounded-xl"
      >
        Search
      </button>
    </div>

  </Container>

</header>

    <!-- CATEGORY -->
    <section class="py-16">
  <Container>

    <div
      class="grid md:grid-cols-4 gap-5"
    >

      <div
        v-for="item in categories"
        :key="item.title"
        class="
          bg-white
          rounded-2xl
          p-6
          border
          hover:border-primary
          hover:shadow-xl
          transition
          cursor-pointer
        "
      >
        <Icon
          :name="item.icon"
          class="w-10 h-10 text-primary"
        />

        <h3
          class="font-semibold mt-4"
        >
          {{ item.title }}
        </h3>

        <p
          class="text-sm text-gray-500 mt-2"
        >
          {{ item.description }}
        </p>

      </div>

    </div>

  </Container>
</section>

    <!-- CONTACT OPTIONS -->
    <section class="bg-slate-100 py-16">
      <Container>
        
        <div class="grid md:grid-cols-3 gap-6">

  <!-- Call -->
  <div class="bg-white rounded-2xl p-8 shadow-sm border">

    <div
      class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"
    >
      <Icon
        name="heroicons:phone"
        class="w-7 h-7 text-primary"
      />
    </div>

    <h3 class="font-semibold text-xl mt-5">
      Call Us
    </h3>

    <p class="text-gray-500 mt-2">
      Speak directly with support.
    </p>

    <p class="mt-4 font-medium">
      +234 800 000 0000
    </p>

  </div>

  <!-- Email -->
  <div class="bg-white rounded-2xl p-8 shadow-sm border">

    <div
      class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"
    >
      <Icon
        name="heroicons:envelope"
        class="w-7 h-7 text-primary"
      />
    </div>

    <h3 class="font-semibold text-xl mt-5">
      Email Us
    </h3>

    <p class="text-gray-500 mt-2">
      Response within 24 hours.
    </p>

    <a
      href="mailto:support@abanise.com"
      class="mt-4 block text-primary"
    >
      support@abanise.com
    </a>

  </div>

  <!-- Office -->
  <div class="bg-white rounded-2xl p-8 shadow-sm border">

    <div
      class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"
    >
      <Icon
        name="heroicons:map-pin"
        class="w-7 h-7 text-primary"
      />
    </div>

    <h3 class="font-semibold text-xl mt-5">
      Visit Office
    </h3>

    <p class="text-gray-500 mt-2">
      Meet our team in person.
    </p>

    <p class="mt-4">
      Lagos, Nigeria
    </p>

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
  {
    title: 'For Tenants',
    description: 'Find help with rentals and bookings.',
    icon: 'heroicons:home'
  },
  {
    title: 'For Landlords',
    description: 'Manage listings and tenants.',
    icon: 'heroicons:building-office'
  },
  {
    title: 'For Agents',
    description: 'Support for property agents.',
    icon: 'heroicons:user-group'
  },
  {
    title: 'Business',
    description: 'Partnership and enterprise support.',
    icon: 'heroicons:briefcase'
  }
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