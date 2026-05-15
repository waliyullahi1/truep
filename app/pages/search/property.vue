<script setup>
import { ref, computed, watch } from 'vue'
import { BadgeCheck, MapPin, Star } from 'lucide-vue-next'

definePageMeta({
  layout: 'main'
})

/* =============================
   STATE
============================= */
const search = ref('')
const location = ref('')
const category = ref('All')
const visibleCount = ref(9)

const selectedSkill = ref('All')
const selectedState = ref('')
const selectedCity = ref('')

const page = ref(1)
const perPage = 9

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
        state: selectedState.value || undefined,
        city: selectedCity.value || undefined,
        skill:
          selectedSkill.value !== 'All'
            ? selectedSkill.value
            : undefined
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
      selectedState,
      selectedCity,
      selectedSkill
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
   LOCATION OPTIONS
============================= */
const locationOptions = computed(() =>
  [...new Set(
    results.value
      .map(r => r.location?.state || r.location?.country)
      .filter(Boolean)
  )]
)

/* =============================
   STATE OPTIONS
============================= */
const stateOptions = computed(() =>
  [...new Set(
    results.value
      .map(r => r.location?.state)
      .filter(Boolean)
  )]
)

/* =============================
   CITY OPTIONS
============================= */
const cityOptions = computed(() => {

  const filtered = selectedState.value
    ? results.value.filter(
        i => i.location?.state === selectedState.value
      )
    : results.value

  return [...new Set(
    filtered
      .map(r => r.location?.city)
      .filter(Boolean)
  )]
})

/* =============================
   SKILLS
============================= */
const skillOptions = computed(() => [

  'All',

  ...new Set(
    results.value
      .flatMap(i =>
        (i.skills || []).map(s => s.name)
      )
      .filter(Boolean)
  )

])

/* =============================
   CATEGORY OPTIONS
============================= */
const categories = computed(() => [
  'All',
  ...new Set(results.value.map(i => i.role).filter(Boolean))
])

/* =============================
   FILTER LOGIC
============================= */
const filteredResults = computed(() =>
  results.value.filter(item => {

    const text =
      `${item.name} ${item.role}`
        .toLowerCase()

    return (

      (!search.value ||
        text.includes(search.value.toLowerCase())) &&

      (!selectedState.value ||
        item.location?.state === selectedState.value) &&

      (!selectedCity.value ||
        item.location?.city === selectedCity.value) &&

      (
        selectedSkill.value === 'All' ||

        (item.skills || []).some(
          skill =>
            skill.name === selectedSkill.value
        )
      )

    )
  })
)

/* =============================
   PAGINATION
============================= */
const displayedResults = computed(() =>
  filteredResults.value.slice(
    0,
    visibleCount.value
  )
)

const paginatedResults = computed(() => {

  const start =
    (page.value - 1) * perPage

  const end =
    start + perPage

  return displayedResults.value.slice(start, end)
})

/* =============================
   LOAD MORE
============================= */
function loadMore() {
  visibleCount.value += 9
}

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
   RESET PAGE
============================= */
watch(
  [
    search,
    location,
    category,
    selectedSkill,
    selectedState,
    selectedCity
  ],

  () => {
    visibleCount.value = 9
    page.value = 1
  }
)
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
        Connect with trusted professionals and complete your
        projects faster and professionally.
      </p>
    </Container>
  </section>

  <!-- ERROR -->
  <section v-if="error">
    <Container>

      <div
        class="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-xl flex items-center justify-between"
      >

        <p>
          {{ error?.statusMessage || 'Failed to load agents' }}
        </p>

        <button
          @click="refresh"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Retry
        </button>

      </div>

    </Container>
  </section>

  <!-- FILTERS -->
  <section>
    <Container>

      <!-- CATEGORY -->
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
      <div class="flex gap-5 mt-4">

        <input
          v-model="search"
          placeholder="Search professionals..."
          class="w-1/2 px-3 h-12 bg-white shadow rounded outline-none"
        />

        <!-- STATE -->
        <select
          v-model="selectedState"
          class="w-1/4 px-4 h-12 bg-white shadow rounded"
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
          class="w-1/4 px-4 h-12 bg-white shadow rounded"
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

      <!-- SKELETON -->
      <div
        v-if="pending"
        class="grid md:grid-cols-3 gap-5"
      >

        <div
          v-for="i in 6"
          :key="i"
          class="border p-4 rounded-md shadow-sm bg-white"
        >

          <!-- IMAGE -->
          <div
            class="w-24 h-24 rounded-full bg-gray-200 animate-pulse mx-auto"
          ></div>

          <!-- NAME -->
          <div
            class="h-5 bg-gray-200 rounded mt-5 animate-pulse"
          ></div>

          <!-- SMALL -->
          <div
            class="h-4 w-2/3 bg-gray-200 rounded mt-3 animate-pulse"
          ></div>

          <!-- LOCATION -->
          <div
            class="h-4 w-1/2 bg-gray-200 rounded mt-5 animate-pulse"
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

      <!-- EMPTY -->
      <div
        v-else-if="filteredResults.length === 0"
        class="text-center py-10 text-gray-500"
      >
        No agents found
      </div>

      <!-- DATA -->
      <div
        v-else
        class="grid md:grid-cols-3 gap-5"
      >

        <div
          v-for="item in paginatedResults"
          :key="item.userId"
          class="border p-4 rounded-md shadow-sm"
        >

          <!-- PROFILE HEADER -->
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
                  {{ item.name }}
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
            {{ item.location?.city || '' }}

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
              to="/auth?type=register-page"
              class="mt-4 bg-primary text-white px-4 py-1 rounded"
            >
              <span class="text-sm">
                Message
              </span>
            </NuxtLink>

            <NuxtLink
              to="/auth?type=register-page"
              class="mt-4 bg-secondary text-white px-4 py-1 rounded"
            >
              <span class="text-sm">
                View
              </span>
            </NuxtLink>

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

      <!-- LOAD MORE -->
      <div
        v-if="visibleCount < filteredResults.length"
        class="flex justify-center mt-8"
      >

        <button
          @click="loadMore"
          class="px-6 py-3 bg-primary text-white rounded-xl shadow hover:scale-105 transition"
        >
          View More
        </button>

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