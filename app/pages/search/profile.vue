<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/pagination'
import 'swiper/css'
import 'swiper/css/navigation'

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
const about =
  'Professional with years of experience in construction, site supervision and project execution for residential and commercial projects.'

/* =============================
   SAMPLE PROFESSIONAL DATA
============================= */
const names = [
  'Abdul Sammad','John Adewale','Kemi Adebayo','Tunde Bello','Grace Hassan',
  'Sodiq Lawal','Mary Okafor','Ibrahim Musa','Chioma Nwosu','Daniel James'
]

const roles = [
  'Surveyor','Civil Engineer','Architect','Plumber','Agent',
  'Electrician','Painter','Supervisor','Builder','Technician'
]

const cities = [
  'Ilorin','Abuja','Lagos','Ibadan','Port Harcourt',
  'Kano','Enugu','Abeokuta','Osogbo','Akure'
]

const skillsMap = {
  Surveyor: ['Surveying','AutoCAD','Mapping'],
  'Civil Engineer': ['Concrete','Site Mgmt','Structural'],
  Architect: ['Design','3D Model','Planning'],
  Plumber: ['Pipe Fixing','Repairs','Installation'],
  Agent: ['Sales','Marketing','Negotiation'],
  Electrician: ['Wiring','Solar','Maintenance'],
  Painter: ['Interior','Exterior','Finishing'],
  Supervisor: ['Team Lead','Planning','Inspection'],
  Builder: ['Blocks','Cement','Construction'],
  Technician: ['Tools','Repairs','Installation']
}

const results = ref(
  Array.from({ length: 40 }, (_, i) => {
    const role = roles[i % roles.length]

    return {
      id: i + 1,
      name: names[i % names.length],
      role,
      category: role,
      location: cities[i % cities.length],
      rating: +(Math.random() * 1 + 4).toFixed(1), // 4.0–5.0
      reviews: Math.floor(Math.random() * 300) + 20,
      avatar: '/image/profile.webp', // ✅ public/images
      skills: [...skillsMap[role].slice(0, 2), `+${Math.floor(Math.random()*12)+3}`],
      images: ['/images/land1.jpg', '/images/land2.jpg', '/images/land1.jpg',]
    }
  })
)


/* =============================
   LOCATION OPTIONS
============================= */
const locationOptions = computed(() =>
  [...new Set(results.value.map(r => r.location))]
)

/* =============================
   CATEGORY LIST
============================= */
const categories = [
  'All',
  'Surveyor',
  'Civil Engineer',
  'Architect',
  'Plumber',
  'Agent'
]

/* =============================
   FILTER LOGIC
============================= */
const filteredResults = computed(() =>
  results.value.filter(item => {
    const text = `${item.name} ${item.role}`.toLowerCase()

    return (
      (!search.value || text.includes(search.value.toLowerCase())) &&
      (!location.value || item.location === location.value) &&
      (category.value === 'All' || item.category === category.value)
    )
  })
)

/* =============================
   LOAD MORE LOGIC
============================= */
const displayedResults = computed(() =>
  filteredResults.value.slice(0, visibleCount.value)
)

function loadMore() {
  visibleCount.value += 9
}

/* reset when filter changes */
watch([search, location, category], () => {
  visibleCount.value = 9
})
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

      <!-- CATEGORY -->
      <div>
        <button
          v-for="c in categories"
          :key="c"
          @click="category = c"
          class="px-5 py-2 mx-2 my-3 rounded-xl text-sm transition"
          :class="category === c ? ' bg-primary text-white' : 'bg-gray-200'"
        >
          {{ c }}
        </button>
      </div>

      <!-- SEARCH + LOCATION -->
      <div class="flex gap-5 mt-4">

        <input
          v-model="search"
          placeholder="Search professionals..."
          class="w-1/2 px-3 h-12 bg-white shadow rounded outline-none"
        />

        <select
          v-model="location"
          class="w-1/3 px-4 h-12 bg-white shadow rounded"
        >
          <option value="">All Locations</option>
          <option v-for="l in locationOptions" :key="l" :value="l">
            {{ l }}
          </option>
        </select>

      </div>
    </Container>
  </section>

  <!-- CARDS -->
  <section class="mt-4">
    <Container>

      <div class="grid md:grid-cols-3 gap-5">

        <div
          v-for="item in displayedResults"
          :key="item.id"
          class="border p-4 rounded-md shadow-sm"
        >

          <!-- PROFILE HEADER -->
          <div class="flex gap-4 items-center bg-priary/10 p-3 rounded">

            <img
              :src="item.avatar"
              class="w-20 h-20 rounded-full object-cover"
            />

            <div class=" text-xs ">
              <h2 class="font-semibold">{{ item.name }}</h2>
              <p class="text-xs text-gray-500">{{ item.role }} • {{ item.location }}</p>
              ⭐ {{ item.rating }} ({{ item.reviews }} reviews)
            </div>

          </div>

          <!-- ABOUT -->
          <p class="text-xs mt-3">
            {{ about.slice(0, 80) }}...
          </p>

          <!-- SKILLS -->
          <div class="mt-3">
            <span
              v-for="skill in item.skills"
              :key="skill"
              class="text-xs bg-gray-200 px-3 py-1 mr-2 rounded"
            >
              {{ skill }}
            </span>
          </div>

          <!-- IMAGES -->
          <Swiper
            :modules="[Navigation, Pagination]"
            :slides-per-view="1"
            :space-between="10"
            :navigation="{
               prevEl: `.prev-${item.id}`,
               nextEl: `.next-${item.id}`
            }"
             :pagination="{ clickable: true }"
            class="mt-4"
          >
            <SwiperSlide v-for="img in item.images" :key="img">
              <div
                class="h-36 rounded bg-cover bg-center"
                :style="{ backgroundImage: `url(${img})` }"
              />
            </SwiperSlide>
          </Swiper>
          
            <div class=" relative  flex justify-between items-center w-full  h-3 z-30  ">
              <div class=" absolute px-4  -top-24 flex justify-between items-center w-full">
                <button :class="`prev-${item.id}`" class="custom-prev        transition duration-300 bg-white/60 shadow-lg rounded-full w-7 h-7 flex items-center justify-center text-xl font-bold" > ‹ </button>
                <button :class="`next-${item.id}`" class="custom-next   -top-24      transition duration-300 bg-white/60 shadow-lg rounded-full w-7 h-7 flex items-center justify-center text-xl font-bold"  > › </button>
              </div>
            </div>
            <!-- <div class=" relative ">
              <div :class="`pagination-${item.id}`" class="flex absolute z-30 justify-center gap-2 mt-3" ></div>
            </div> -->
                      <!-- BUTTON -->
           <div class=" flex w-full justify-between ">
            <UiButtonsTertiary><span class=" text-sm">see profile</span></UiButtonsTertiary>
            
          <!-- <button class="mt-4 bg-primary text-white px-4 py-1 rounded">
              <span class=" text-sm">View Profile</span>
          </button> -->

          <!-- <button class="mt-4 bg-primary text-white px-4 py-1 rounded">
              <span class=" text-sm">Message</span>
          </button> -->
          </div>
        </div>

      </div>
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


