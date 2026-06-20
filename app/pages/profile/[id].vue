<script setup>
import { ref, watch } from 'vue'
import { BadgeCheck, Link, Phone, MapPin, Star } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

definePageMeta({ layout: 'auth' })

const route = useRoute()
const agent = ref({})
const activeTab = ref('about')

/* =============================
   ASYNC DATA (SSR)
============================= */
const { data, pending, error, refresh } = await useAsyncData(
  `agent-${route.params.id}`,
  async () => {
    try {
      const res = await useApiFetch(`/profile/agents/${route.params.id}`, {
        method: 'GET'
      })

      if (!res?.success) {
        throw new Error(res?.message || 'Failed')
      }

      return res?.data?.data || {}
    } catch (err) {
      throw err
    }
  },
  {  server: true }
)

/* keep agent reactive like before */
watch(
  data,
  (val) => {
    agent.value = val || {}
  },
  { immediate: true }
)


const contactLink = computed(() => {
  const social = agent.value?.social_media || {}
  const phone = agent.value?.whatsapp_no || ''

  // 1) If WhatsApp already provided
  if (social.whatsapp) {
    return {
      url: social.whatsapp,
      type: 'whatsapp'
    }
  }

  // 2) If phone exists, convert to WhatsApp
  if (phone) {
    let cleaned = phone.replace(/\D/g, '')

    // convert 080 → 23480
    if (cleaned.startsWith('0')) {
      cleaned = '234' + cleaned.slice(1)
    }

    return {
      url: `https://wa.me/${cleaned}`,
      type: 'phone'
    }
  }

  return null
})
const shareProfile = async () => {
  try {
    const url = window.location.href
    const title = agent.value?.name || 'Agent Profile'
    const text = `Check out ${title}'s real estate profile`

    // If browser supports native share
    if (navigator.share) {
      await navigator.share({ title, text, url })
    } else {
      // Fallback: copy link
      await navigator.clipboard.writeText(url)
      alert('Profile link copied to clipboard')
    }
  } catch (err) {
    console.log(err)
  }
}



/* ...your existing code above... */

/* =============================
   SEO / SOCIAL SHARE
============================= */

const siteUrl = 'https://abanise.com'

const profileUrl = computed(() => {
  return `${siteUrl}${route.fullPath}`
})

console.log(data.value);

const profileImage = computed(() => {
  const img =  data.value?.avatar
const ogimage =  data?.value?.ogImage 
  if (ogimage) { 
    return ogimage.replace(
    '/upload/',
    '/upload/w_800,h_1200,c_fill,q_auto,f_auto/'
  )
  }
  if(!img){
    return '/image/ogimage.png'
  }

  return img.replace(
    '/upload/',
    '/upload/w_1200,h_630,c_fill,q_auto,f_auto/'
  )
})
console.log(profileImage.value,'gdsdsdfasdfas');
const profileTitle = computed(() => {
  if (!data.value) return 'Agent Profile'

  return `${data.value.name || 'Agent'} | Verified Real Estate Agent`
})

const profileDescription = computed(() => {
  const about =
    data.value?.about?.replace(/<[^>]*>/g, '') || ''

  return (
    about.slice(0, 120) ||
    `View ${data.value?.name || 'this agent'} profile, listings and contact details.`
  )
})

/* =============================
   OPEN GRAPH / WHATSAPP
============================= */

useSeoMeta({
  title: () => profileTitle.value,

  description: () => profileDescription.value,

  ogTitle: () => profileTitle.value,

  ogDescription: () => profileDescription.value,

  ogImage: () => profileImage.value,

  ogImageSecureUrl: () => profileImage.value,

  ogImageWidth: '1200',

  ogImageHeight: '630',

  ogType: 'profile',

  ogUrl: () => profileUrl.value,

  twitterCard: 'summary_large_image',

  twitterTitle: () => profileTitle.value,

  twitterDescription: () => profileDescription.value,

  twitterImage: () => profileImage.value
})
const favicon = computed(() => {

  const img = data.value?.avatar

  if (!img) {
    return '/images/abanise.png'
  }

  return img.replace(
    '/upload/',
    '/upload/w_64,h_64,c_fill,g_face,q_auto,f_auto/'
  )

})
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: profileUrl.value
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: favicon.value
    }
  ]
}))

/* refresh if route changes */
watch(() => route.params.id, () => refresh())
</script>
<template>
<div class="">
  <Container>
    <NavigationBackArrow/>
{{ agent }}
    <!-- ================= SKELETON ================= -->
    <div v-if="pending" class="animate-pulse">
      <div class="flex flex-col md:flex-row gap-6 items-start">
        <div class="sm:w-1/4 w-full h-40 bg-gray-200 rounded"></div>

        <div class="flex-1 space-y-3">
          <div class="h-6 bg-gray-200 w-1/3 rounded"></div>
          <div class="h-4 bg-gray-200 w-1/4 rounded"></div>
          <div class="h-4 bg-gray-200 w-1/5 rounded"></div>
          <div class="h-20 bg-gray-200 w-full rounded"></div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4 mt-10">
        <div class="h-24 bg-gray-200 rounded"></div>
        <div class="h-24 bg-gray-200 rounded"></div>
        <div class="h-24 bg-gray-200 rounded"></div>
        <div class="h-24 bg-gray-200 rounded"></div>
      </div>
    </div>

    <!-- ================= REAL CONTENT ================= -->
    <div v-else>

      <!-- HEADER -->
      <div class="flex flex-col md:flex-row gap-6 items-start">

        <!-- LOGO -->
        <div class="sm:w-1/4  flex justify-center items-center  w-full">
          <img :src="agent?.avatar || '/image/no-image.png'"  class="w-full object-contain" />
        </div>

        <!-- INFO -->
        <div class="flex-1">

          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-semibold">
              {{ agent?.name }}
            </h1>
            <BadgeCheck class="text-blue-500" />
          </div>

          <p class="text-sm text-gray-500">
            BN: {{ agent?.bn || 32733 }}
          </p>

          <div class="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <Star class="w-4" />
            {{ agent?.rating }} ({{ agent?.reviews }} reviews)
          </div>

          <div class="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <MapPin class="w-4" />
            {{ agent?.location?.city || "Osun" }}, {{ agent?.location?.state || "Iwo" }}
          </div>

          <div class="flex flex-wrap gap-2 mt-3">
            <span
              v-for="skill in agent?.skills"
              :key="skill"
              class="text-xs bg-gray-200 px-3 py-1 rounded"
            >
              {{ skill.name }}
            </span>
          </div>

          <p class="text-sm text-gray-600 mt-4 leading-relaxed">
            {{ agent?.about }}
          </p>

          <div class="flex text-sm gap-3 mt-4">
              <a v-if="contactLink" :href="contactLink.url"target="_blank" class="bg-secondary flex gap-3 text-white px-4 py-2 rounded" >
                <Phone class="w-4 text-white" />
                {{ contactLink.type === 'whatsapp' ? 'Chat on WhatsApp' : 'Contact Agent' }}
              </a>

              <button v-else disabled class="bg-gray-300 flex gap-3 text-white px-4 py-2 rounded cursor-not-allowed">
                  <Phone class="w-4 text-white" />
                  No Contact Available
              </button>

            <button class="border flex gap-3 px-4 py-2 rounded">
              <Star class="w-4 text-gray-600" />  Write a Review
            </button>

            <button  @click="shareProfile" class="border flex gap-3 px-4 py-2 rounded">
              <Link class="w-4 text-gray-600" />  Share Profile
            </button>
          </div>

        </div>
      </div>

      <!-- STATS -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">

        <div class="border rounded-lg p-6 text-center">
          <h2 class="text-2xl font-bold">
            {{ agent?.properties?.length || 0 }}
          </h2>
          <p class="text-sm text-gray-500">Properties</p>
        </div>

        <div class="border rounded-lg p-6 text-center">
          <h2 class="text-2xl font-bold">
            {{ agent?.yearOfExperience || 3 }}
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
      <div class="border rounded-lg sm:p-10 p-4 mt-4 text-center">

        <div v-if="activeTab === 'reviews'">
          <div class="flex flex-col items-center text-gray-500">
            <div class="text-4xl mb-3">💬</div>
            <p class="font-medium">No reviews yet</p>
            <p class="text-sm">Be the first to review this agent.</p>

            <NuxtLink to="/auth?type=register-page" class="mt-4 bg-green-600 text-white px-4 py-2 rounded">
              Write a Review
            </NuxtLink>
          </div>
        </div>

        <div v-if="activeTab === 'about'" class="text-left">
          <AgentInfoCard :agent="agent" />
        </div>

        <div v-if="activeTab === 'properties'">
          <p v-if="!agent?.properties?.length" class="text-gray-500">
            No properties uploaded yet.
          </p>

          <div v-else class="grid md:grid-cols-3 gap-6">
            <PropertyCard
              v-for="item in agent.properties"
              :key="item._id"
              :item="item"
            />
          </div>
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