<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { BadgeCheck, MapPin, Star } from 'lucide-vue-next'
import statesData from '@/data/nigeria-states' // ✅ FIXED IMPORT

definePageMeta({
  layout: 'main'
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

const results = ref([])


const normalize = (str = '') =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s-_]+/g, '') // remove spaces, dash, underscore 
/* =============================
   FETCH DATA
============================= */
const loadData = async () => {
  try {
    const response = await useApiFetch('/profile/agents', {
      method: 'GET'
    })

    console.log('API:', response)

    results.value = response?.data?.data || []
  } catch (err) {
    console.error('API ERROR:', err)
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
   STATE OPTIONS (FROM FILE)
============================= */
const stateOptions = computed(() =>
  statesData.map(s => s.name)
)

/* =============================
   CITY OPTIONS (FROM FILE)
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
    console.log(item);
    
    const text = `${item.name}`.toLowerCase()

    const itemState = normalize(item.location?.state)
    const itemCity = normalize(item.location?.city)

    const selectedStateNorm = normalize(selectedState.value)
    const selectedCityNorm = normalize(selectedCity.value)
    const selectedSkillNorm = normalize(selectedSkill.value)
        console.log(itemState, 'itemState');
        console.log(itemCity, 'itemCity');
    return (
      // 🔍 SEARCH
      (!search.value ||
        text.includes(search.value.toLowerCase())
      ) &&

      // 📍 STATE (normalized)
      (!selectedState.value ||
        itemState === selectedStateNorm
      ) &&

      // 📍 CITY (normalized)
      (!selectedCity.value ||
        itemCity === selectedCityNorm
      ) &&

      // 🛠 SKILL
      (selectedSkill.value === 'All' ||
        (item.skills || []).some(
          s => normalize(s.name) === selectedSkillNorm
        )
      )
    )
  })
)

/* =============================
   PAGINATION
============================= */
const paginatedResults = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredResults.value.slice(start, start + perPage)
})

/* =============================
   WATCH
============================= */
watch([search, selectedSkill, selectedState, selectedCity], () => {
  page.value = 1
})

/* RESET CITY WHEN STATE CHANGES */
watch(selectedState, () => {
  selectedCity.value = ''
})

onMounted(loadData)
</script>
<template>
<div>

  <!-- HERO -->
  <section class="mt-20 bg-primary py-8">
    <Container>
      <h1 class="text-3xl font-bold text-white leading-relaxed">
        Hire Verified Agents and Skilled <br> Workers Across Nigeria
      </h1>
      <p class="text-white mt-2">
        Connect with trusted professionals and complete your projects faster and professionally.
      </p>
    </Container>
  </section>

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
          :class="selectedSkill === c ? ' bg-primary text-white' : 'bg-gray-200'"
        >
          {{ c }}
        </button>
      </div>

      <!-- SEARCH + LOCATION -->
      <div class="flex gap-5 mt-4">

        <!-- SEARCH -->
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
          <option value="">All States</option>
          <option v-for="s in stateOptions" :key="s" :value="s">
            {{ s }}
          </option>
        </select>

        <!-- CITY -->
        <select
          v-model="selectedCity"
          class="w-1/4 px-4 h-12 bg-white shadow rounded"
        >
          <option value="">All Cities</option>
          <option v-for="c in cityOptions" :key="c" :value="c">
            {{ c }}
          </option>
        </select>

      </div>
    </Container>
  </section>

  <!-- CARDS -->
  <section class="mt-4">
    <Container>

      <!-- EMPTY STATE (SMART FIX ✅) -->
      <div v-if="filteredResults.length === 0" class="text-center py-10 text-gray-500">

        <p v-if="selectedCity && selectedState">
          No agents found in <b>{{ selectedCity }}, {{ selectedState }}</b>
        </p>

        <p v-else-if="selectedState">
          No agents found in <b>{{ selectedState }}</b>
        </p>

        <p v-else>
          No agents found
        </p>

      </div>

      <!-- CARDS GRID -->
      <div v-else class="grid md:grid-cols-3 gap-5">

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
                  {{ item.name || (item.firstName + ' ' + item.lastName) }}
                </h2>
                <BadgeCheck class="text-green-600" />
              </div>

              <!-- STATS -->
              <div class="flex items-center gap-1">
                <div v-for="star in 5" :key="star">
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
            {{ item.about?.slice(0, 120) || 'No description available' }}...
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
            <NuxtLink to="/auth?type=register-page" class="mt-4 bg-primary text-white px-4 py-1 rounded">
              <span class="text-sm">Message</span>
            </NuxtLink>

            <NuxtLink to="/auth?type=register-page" class="mt-4 bg-secondary text-white px-4 py-1 rounded">
              <span class="text-sm">View</span>
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

    </Container>
  </section>

</div>
</template>
<style scoped>
/* move dots inside image */
:deep(.swiper-pagination) {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-10%);
  display: flex;
  gap: 6px;
  z-index: 10;
}

/* small dots */
:deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  background: white;
  opacity: 0.5;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

/* active dot bigger */
:deep(.swiper-pagination-bullet-active) {
  width: 14px;
  height: 6px;
  opacity: 1;
}
</style>


