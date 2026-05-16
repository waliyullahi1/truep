<script setup>
import { ref, computed, watch } from 'vue'
import { BadgeCheck, MapPin, Star } from 'lucide-vue-next'
import statesData from '@/data/nigeria-states'

definePageMeta({
  layout: 'auth',
})

/* =============================
   STATE
============================= */
const search = ref('')
const selectedSkill = ref('All')
const selectedState = ref('')
const selectedCity = ref('')

const page = ref(1)
const perPage = 9






const seoTitle = computed(() => {
  if (selectedCity.value && selectedState.value) {
    return `Verified Agents in ${selectedCity.value}, ${selectedState.value} | Hire Professionals in Nigeria`
  }

  if (selectedState.value) {
    return `Verified Agents in ${selectedState.value} | Skilled Workers & Property Agents`
  }

  return 'Hire Verified Agents and Skilled Workers Across Nigeria'
})

const seoDescription = computed(() => {
  if (selectedCity.value && selectedState.value) {
    return `Browse verified agents and professionals in ${selectedCity.value}, ${selectedState.value}. View profiles, skills, and contact trusted experts near you.`
  }

  if (selectedState.value) {
    return `Find trusted and verified agents in ${selectedState.value}. Connect with skilled professionals for your projects.`
  }

  return 'Connect with trusted real estate agents and skilled professionals across Nigeria. View profiles, ratings, and locations.'
})

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDescription.value,

  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDescription.value,
  ogType: 'website',
  ogUrl: () => `https://yourdomain.com/agents`,

  twitterCard: 'summary_large_image',
  twitterTitle: () => seoTitle.value,
  twitterDescription: () => seoDescription.value
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://yourdomain.com/agents`
    }
  ]
})

/* =============================
   NORMALIZE
============================= */
const normalize = (str = '') =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s-_]+/g, '')

/* =============================
   FETCH DATA
============================= */
const {
  data: resultsData,
  pending,
  error,
  refresh
} = await useAsyncData(
  'agents',

  async () => {

    const res = await useApiFetch('/profile/agents', {
      method: 'GET',
      params: {
        search: search.value || undefined,
        skill:
          selectedSkill.value !== 'All'
            ? selectedSkill.value
            : undefined,
        state: selectedState.value || undefined,
        city: selectedCity.value || undefined
      }
    })

    // THROW ERROR
    if (!res?.success) {
      throw createError({
        statusCode: 500,
        statusMessage:
          res?.message || 'Failed to fetch agents'
      })
    }

    const safe =
      res?.data?.data ||
      res?.data ||
      []

    console.log('SAFE:', safe)

    return safe
  },

  {
    lazy: true,
    server: true,
    watch: [
      search,
      selectedSkill,
      selectedState,
      selectedCity
    ]
  }
)

/* =============================
   RESULTS
============================= */
const results = computed(() => {
  return resultsData.value || []
})

/* =============================
   REFRESH
============================= */
const refreshData = async (stopLoading) => {

  await refresh()

  if (stopLoading) {
    stopLoading()
  }
}

/* =============================
   SKILL OPTIONS
============================= */
const skillOptions = computed(() => [
  'All',
  ...new Set(
    results.value.flatMap(r =>
      (r.skills || []).map(s => s.name)
    )
  )
])

/* =============================
   STATE OPTIONS
============================= */
const stateOptions = computed(() =>
  statesData.map(s => s.name)
)

/* =============================
   CITY OPTIONS
============================= */
const cityOptions = computed(() => {

  if (!selectedState.value) return []

  const state = statesData.find(
    s => s.name === selectedState.value
  )

  return state ? state.lgas : []
})

/* =============================
   FILTER LOGIC
============================= */
const filteredResults = computed(() =>
  results.value.filter(item => {

    const text =
      `${item.name}`
        .toLowerCase()

    const itemState =
      normalize(item.location?.state)

    const itemCity =
      normalize(item.location?.city)

    const selectedStateNorm =
      normalize(selectedState.value)

    const selectedCityNorm =
      normalize(selectedCity.value)

    const selectedSkillNorm =
      normalize(selectedSkill.value)

    return (

      // SEARCH
      (!search.value ||
        text.includes(search.value.toLowerCase())
      ) &&

      // STATE
      (!selectedState.value ||
        itemState === selectedStateNorm
      ) &&

      // CITY
      (!selectedCity.value ||
        itemCity === selectedCityNorm
      ) &&

      // SKILL
      (
        selectedSkill.value === 'All' ||

        (item.skills || []).some(
          s =>
            normalize(s.name) === selectedSkillNorm
        )
      )

    )
  })
)

/* =============================
   PAGINATION
============================= */
const paginatedResults = computed(() => {

  const start =
    (page.value - 1) * perPage

  return filteredResults.value.slice(
    start,
    start + perPage
  )
})

/* =============================
   WATCH
============================= */
watch(
  [
    search,
    selectedSkill,
    selectedState,
    selectedCity
  ],

  () => {
    page.value = 1
  }
)


const getContactLink = (item) => {

  const social = item?.social_media || {}
  const phone = item?.whatsapp_no || ''

  // WhatsApp link from social media
  if (social.whatsapp) {
    return {
      url: social.whatsapp,
      type: 'whatsapp'
    }
  }

  // Phone → WhatsApp
  if (phone) {

    let cleaned = phone.replace(/\D/g, '')

    // 08012345678 → 2348012345678
    if (cleaned.startsWith('0')) {
      cleaned = '234' + cleaned.slice(1)
    }

    return {
      url: `https://wa.me/${cleaned}`,
      type: 'phone'
    }
  }

  // Facebook
  if (social.facebook) {
    return {
      url: social.facebook,
      type: 'facebook'
    }
  }

  // Instagram
  if (social.instagram) {
    return {
      url: social.instagram,
      type: 'instagram'
    }
  }

  return null
}

/* RESET CITY */
watch(selectedState, () => {
  selectedCity.value = ''
})




</script>

<template>
<div>

  <!-- HERO -->
  <section class="mt-20 bg-primary py-8">
    <Container>

      <h1 class="text-3xl font-bold text-white leading-relaxed">
        Hire Verified Agents and Skilled <br>
        Workers Across Nigeria
      </h1>

      <p class="text-white mt-2">
        Connect with trusted professionals and complete your projects faster and professionally.
      </p>

    </Container>
  </section>

  <!-- ERROR -->
     
  <!-- FILTERS -->
  <section>
    <Container>

      <!-- SKILLS -->
      <div>

        <button
          v-for="c in skillOptions"
          :key="c"
          @click="selectedSkill = c"
          class="px-5 py-2 mx-2 my-3 rounded-xl text-sm transition"
          :class="
            selectedSkill === c
              ? 'bg-primary text-white'
              : 'bg-gray-200'
          "
        >
          {{ c }}
        </button>

      </div>

      <!-- SEARCH -->
      <div class="sm:flex block gap-5 mt-4">

        <!-- SEARCH -->
         <div>
        <input
          v-model="search"
          placeholder="Search professionals..."
          class="md:w-1/2 w-full px-3 h-12 bg-white border  rounded outline-none"
        />
          </div>
        <!-- STATE -->
        
        <select
          v-model="selectedState"
          class="md:w-1/4  w-1/2 px-4 h-12 bg-white border rounded"
        >

          <option value="">
            All States
          </option>

          <option
            v-for="s in stateOptions"
            :key="s"
            :value="s"
          >
            {{ s }}
          </option>

        </select>
       
        <!-- CITY -->
        
        <select
          v-model="selectedCity"
          class=" md:w-1/4  w-1/2 px-4 mt-5 md:mt-0  h-12 bg-white border rounded"
        >

          <option value="">
            All Cities
          </option>

          <option
            v-for="c in cityOptions"
            :key="c"
            :value="c"
          >
            {{ c }}
          </option>

        </select>
       
      </div>

    </Container>
  </section>

  <!-- CARDS -->
  <section class="mt-4">
    <Container>
      <div v-if="error">
      <NetworkError
      :error="error"
      @retry="refreshData"
    />
    </div>
      <!-- SKELETON -->
      <div
        v-else-if="pending"
        class="grid md:grid-cols-3 gap-5"
      >

        <div
          v-for="i in 6"
          :key="i"
          class="border p-4 rounded-md shadow-sm bg-white"
        >

          <!-- AVATAR -->
          <div
            class="w-28 h-28 rounded-full bg-gray-200 animate-pulse mx-auto"
          ></div>

          <!-- NAME -->
          <div
            class="h-5 bg-gray-200 rounded mt-5 animate-pulse"
          ></div>

          <!-- STARS -->
          <div
            class="h-4 w-2/3 bg-gray-200 rounded mt-3 animate-pulse"
          ></div>

          <!-- LOCATION -->
          <div
            class="h-4 w-1/2 bg-gray-200 rounded mt-4 animate-pulse"
          ></div>

          <!-- ABOUT -->
          <div
            class="h-3 bg-gray-200 rounded mt-5 animate-pulse"
          ></div>

          <div
            class="h-3 bg-gray-200 rounded mt-2 animate-pulse"
          ></div>

          <div
            class="h-3 w-2/3 bg-gray-200 rounded mt-2 animate-pulse"
          ></div>

          <!-- TAGS -->
          <div class="flex gap-2 mt-5">

            <div
              class="h-7 w-16 bg-gray-200 rounded animate-pulse"
            ></div>

            <div
              class="h-7 w-16 bg-gray-200 rounded animate-pulse"
            ></div>

          </div>

          <!-- BUTTONS -->
          <div class="flex justify-between mt-5">

            <div
              class="h-10 w-24 bg-gray-200 rounded animate-pulse"
            ></div>

            <div
              class="h-10 w-24 bg-gray-200 rounded animate-pulse"
            ></div>

          </div>

        </div>

      </div>
      <div        v-else>

      
          <!-- EMPTY -->
          <div
            v-if="filteredResults.length === 0"
            class="text-center py-10 text-gray-500"
          >

            <p v-if="selectedCity && selectedState">
              No agents found in
              <b>{{ selectedCity }}, {{ selectedState }}</b>
            </p>

            <p v-else-if="selectedState">
              No agents found in
              <b>{{ selectedState }}</b>
            </p>

            <p v-else>
              No agents found
            </p>

          </div>

          <!-- GRID -->
          <div
     
            class="grid md:grid-cols-3 gap-5"
          >

            <div
              v-for="item in paginatedResults"
              :key="item.userId"
              class="border p-4 rounded-md shadow-sm"
            >

              <!-- PROFILE -->
              <div class="gap-4 bg-priary/10 p-3 rounded">

                <!-- AVATAR -->
                <div class="flex flex-col items-center">

                  <img
                    :src="item.avatar || '/image/profile.webp'"
                    class="w-1/2 rounded-full object-cover"
                  />

                </div>

                <!-- NAME -->
                <div class="mt-3 text-xs flex flex-col text-left">

                  <div class="flex items-center gap-3">

                    <h2 class="font-normal text-lg sm:text-xl">
                      {{
                        item.name ||
                        (item.firstName + ' ' + item.lastName)
                      }}
                    </h2>

                    <BadgeCheck class="text-green-600" />

                  </div>

                  <!-- STATS -->
                  <div class="flex items-center gap-1">

                    <div
                      v-for="star in 5"
                      :key="star"
                    >
                      <Star class="w-4 text-gray-400" />
                    </div>

                    <div>
                      ({{ item.totalProperties || 0 }} properties)
                    </div>

                  </div>

                </div>

              </div>

              <!-- LOCATION -->
              <p class="text-sm flex gap-2 items-center text-gray-500">

                <MapPin class="w-4 text-gray-400" />

                {{ item.location?.state || '—' }},
                {{ item.location?.city || '' }},
                {{ item.location?.address || '' }}

              </p>

              <!-- ABOUT -->
              <p class="text-xs mt-3">
                {{
                  item.about?.slice(0, 120) ||
                  'No description available'
                }}...
              </p>

              <!-- SKILLS -->
              <div class="mt-3">

                <span
                  v-for="skill in item.skills || []"
                  :key="skill.name"
                  class="text-xs bg-gray-200 px-3 py-1 mr-2 rounded"
                >
                  {{ skill.name }}
                </span>

              </div>

              <!-- BUTTONS -->
              <div class="flex w-full justify-between">

              <NuxtLink
                v-if="getContactLink(item)"
                :to="getContactLink(item).url"
                target="_blank"
                class="mt-4 bg-primary text-white px-4 py-1 rounded"
              >
                <span class="text-sm">
                  Message
                </span>
              </NuxtLink>
                
                <NuxtLink
                  :to="`/profile/${item.userId}`"
                  class="mt-4 bg-secondary text-white px-4 py-1 rounded"
                >
                  <span class="text-sm">
                    View
                  </span>
                </NuxtLink>

              </div>

            </div>

          </div>
     </div>
      <!-- PAGINATION -->
      <div class="mt-10">

        <Paginat
          v-model="page"
          :total="filteredResults.length"
          :perPage="perPage"
        />

      </div>

    </Container>
  </section>

</div>
</template>

<style scoped>
:deep(.swiper-pagination) {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-10%);
  display: flex;
  gap: 6px;
  z-index: 10;
}

:deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  background: white;
  opacity: 0.5;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  width: 14px;
  height: 6px;
  opacity: 1;
}
</style>