<template>
  <div class="pt-24 bg-gray-50 min-h-screen">

    <Container>
      <div class="flex flex-col lg:flex-row gap-10">

        <!-- ================================================= -->
        <!-- LEFT SIDE -->
        <!-- ================================================= -->
        <div class="lg:w-3/5 space-y-12">

          <!-- ================= PROFILE ================= -->
          <div class="flex items-center gap-6">

            <img
              src="/image/profile.webp"
              class="w-40 h-40 rounded-full object-cover border"
            />

            <div>
              <h2 class="text-2xl font-bold">Abdul Sammad</h2>
              <p class="text-gray-500 text-sm">@Sammad • Surveyor</p>

              <div class="flex items-center gap-2 text-sm mt-1">
                ⭐ 4.7 (300 reviews)
                <span class="bg-green-600 text-white px-2 py-0.5 rounded text-xs">
                  Verified
                </span>
              </div>

              <div class="flex gap-4 mt-2 text-sm text-gray-500">
                <span>📍 Pakistan</span>
                <span>🌐 English</span>
              </div>
            </div>
          </div>



          <!-- ================= ABOUT ================= -->
          <div>
            <h3 class="text-lg font-semibold mb-2">About</h3>

            <p class="text-sm text-gray-600">
              {{ showFull ? about : shortText }}
            </p>

            <button
              class="text-blue-600 text-sm mt-1"
              @click="showFull = !showFull"
            >
              {{ showFull ? 'Show less' : 'Read more' }}
            </button>
          </div>



          <!-- ================= SKILLS ================= -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Skills</h3>

            <div class="flex flex-wrap gap-3">
              <span
                v-for="skill in skills"
                :key="skill"
                class="border px-4 py-1 rounded-full text-sm bg-white hover:bg-gray-100"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-3 border-b">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="activeTab = tab"
              :class="[
                'py-4 text-sm font-medium',
                activeTab === tab
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500'
              ]"
            >
              {{ tab }}
            </button>
          </div>
          <!-- ================================================= -->
          <!-- 🔵 PAST PROJECTS (PORTFOLIO) -->
           <div class="mt-" v-if="activeTab === 'Services'">

            <h2 class="text-2xl font-bold mb-1">Past Projects</h2>
            <p class="text-sm text-gray-500 mb-6">
              Completed works by this professional
            </p>

            <!-- Masonry layout -->
            <div class=" grid  gap-6 space-y-6">

              <!-- <div
                v-for="project in projects"
                :key="project.id"
                class="break-inside-avoid group cursor-pointer"
                @click="selected = project"
              >
                <div
                  class="bg-white flex rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl duration-300"
                >
                  <div>

                  <img
                    :src="project.image"
                    class="w-full object-cover group-hover:scale-105 duration-500"
                  />
                  </div>

                  <div class="p-4">
                    <h3 class="font-semibold">{{ project.title }}</h3>
                    <p class="text-xs text-gray-500">{{ project.location }}</p>
                    <p class="text-sm text-gray-600 line-clamp-2">
                      {{ project.desc }}
                    </p>
                  </div>
                </div>
              </div> -->
              <ProjectShowcase
              v-for="p in projects1.slice(0,3)"
                :key="p.title"
                  :project="p"
                  
                  />

                  <div class=" w-full flex justify-end "> <UiButtonsTertiary class=" hover:text-primary   cursor-pointer tex"> View more ></UiButtonsTertiary></div>
            </div>
          </div>

          <div v-if="activeTab === 'Property'" >
             <h2 class="text-xl font-bold mb-1 mt-14">Properties For Sale</h2>
            <p class="text-sm text-gray-500 mb-6">
              Lands and buildings currently available
            </p>
            <div>
              <ProfileListProperty></ProfileListProperty>
            </div>
          </div>

         
        </div>



        <!-- ================================================= -->
        <!-- RIGHT SIDEBAR -->
        <!-- ================================================= -->
        <div class="lg:w-2/5">

          <div class="sticky top-24 bg-white rounded-xl shadow-lg p-6 space-y-4">

            <h3 class="font-semibold">Details</h3>

            <div class="space-y-2 text-sm text-gray-600">
              <p>🏢 Company: Zaheen Legal</p>
              <p>💰 Service Fee: ₦14,809</p>
              <p>📅 Joined: 2025</p>
              <p>🏆 Achievements & Qualifications</p>
            </div>

            <button
              class="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
            >
              Contact Me
            </button>

          </div>

        </div>

      </div>
    </Container>


     <!-- ================================================= -->
          <!-- 🔵 PAST PROJECTS (PORTFOLIO) -->
          <!-- ================================================= -->
           <Container>
              <UiTypographyH3>Reviews</UiTypographyH3>
              <div class=" mt-5  mb-7 w-full gap-5 grid grid-cols-2">
                <div v-for="value in 5" class=" border rounded-lg  p-4">
                  <div class=" border-b flex gap-3 items-center  pb-4 ">
                    <div class=" rounded-full overflow-hidden flex justify-center items-center bg-slate-900 w-14 h-14">
                      <img src="/images/59.jpg" class=" "  alt="" srcset="">
                    </div>
                    <div class=" leading-tight">
                      <UiTypographyP>ebukaosuorah <br> <small class=" land-agent px-2 py-0.5 bg-green-700  rounded-md  text-white">Trader</small></UiTypographyP>
                     
                    </div>
                    
                  </div>
                  <div  class=" b py-1 mt-2">
                    <div class=" items-center  flex gap-1 ">
                      <img  v-for="value in 5" src="/image/icon/black_star.svg" class=" g w-4" alt="">5
                      <div class="  mx-2 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                      <span class=" text-gray-500 text-sm">Feb 2025</span>
                    </div>
                    <div class=" mt-3">
                       <UiTypographyP class=" pb-2 font-semibold"><span class=" text-sm">Project: Residential Land Boundary Survey</span></UiTypographyP>
                      <UiTypographyP class=" text-gray-500">Gideon certainly has exceeded my expectations. He is very helpful and goes extra miles to fix issues. Very happy with the service and second order is placed already. </UiTypographyP>
                    </div>

                    <div class=" flex items-end gap-2 ">
                     <div class=" mt-3">
                      <small class=" text-gray-500">Prices</small>
                      <UiTypographyP class=" font-semibold">$400-$600</UiTypographyP>
                     </div>
                     <div class=" w-0.5  h-6 mx-5 bg-slate-400"></div>
                     <div class=" mt-3">
                      <small class=" text-gray-500">Durations</small>
                      <UiTypographyP class=" font-semibold">3 days</UiTypographyP>
                     </div>
                    </div>
                  </div>
                </div>
              </div>
              <UiButtonsSecondary >Show More</UiButtonsSecondary>
           </Container>
         



   
    <div
      v-if="selected"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      @click.self="selected = null"
    >
      <div class="bg-white rounded-2xl max-w-3xl w-full overflow-hidden">

        <img :src="selected.image" class="w-full h-80 object-cover" />

        <div class="p-6">
          <h3 class="text-xl font-bold">{{ selected.title }}</h3>
          <p class="text-gray-500">{{ selected.location }}</p>
          <p class="text-gray-600">{{ selected.desc }}</p>

          <button
            class="mt-4 bg-black text-white px-4 py-2 rounded"
            @click="selected = null"
          >
            Close
          </button>
        </div>

      </div>
    </div>

  </div>
</template>



<script setup>
import { ref, computed } from 'vue'
definePageMeta({
  layout: 'main'
}) 
/* ================= ABOUT ================= */
const about =
  "Professional surveyor with 5+ years experience in land mapping, site supervision and construction measurement for residential and commercial projects."

const showFull = ref(false)

const shortText = computed(() =>
  about.slice(0, 150) + '...'
)


const tabs = [  'Services', 'Property',]
const activeTab = ref('Services')  
const projects1 = [
  {
    title: "Residential Land Boundary Survey",
    description: "Accurate boundary identification and beacon placement for a 600sqm residential plot including official survey plan documentation.",
    duration: "3 days",
    budget: "120,000",
    location: "Ilorin",
    date: "Feb 2025",
    rating: 4.9,
    review: "Very precise measurements and delivered the survey plan quickly.",
    categories: ["Survey"],
    tools: ["Total Station", "GPS", "AutoCAD"],
    images: ["/image/land1.jpg", "/image/land2.jpg"]
  },

  {
    title: "Topographic Survey for Road Construction",
    description: "Detailed topographic mapping with elevation data to assist engineers in planning a new access road project.",
    duration: "1 week",
    budget: "350,000",
    location: "Abuja",
    date: "Jan 2025",
    rating: 4.8,
    review: "Professional team with clean and accurate contour mapping.",
    categories: ["Survey"],
    tools: ["Drone Mapping", "GIS", "Civil 3D"],
    images: ["/image/land1.jpg", "/image/land2.jpg"]
  },

  {
    title: "Estate Layout & Subdivision Survey",
    description: "Subdivision of 5 hectares of land into residential plots with proper layout design and government-compliant documentation.",
    duration: "2 weeks",
    budget: "850,000",
    location: "Lagos",
    date: "Dec 2024",
    rating: 4.9,
    review: "Clear layout design and smooth approval process. Highly recommended.",
    categories: ["Survey"],
    tools: ["AutoCAD Civil 3D", "GPS RTK", "Mapping"],
    images: ["/image/land1.jpg", "/image/land2.jpg"]
  },

  {
    title: "Construction Site Setting-Out",
    description: "Precise setting-out of building corners, foundation lines, and control points for a commercial construction site.",
    duration: "4 days",
    budget: "200,000",
    location: "Ibadan",
    date: "Nov 2024",
    rating: 4.7,
    review: "Accurate marking helped reduce construction errors significantly.",
    categories: ["Survey"],
    tools: ["Total Station", "Laser Level", "Control Points"],
    images: ["/image/land1.jpg", "/image/land2.jpg"]
  },

  {
    title: "Drone Aerial Mapping & Orthophoto Survey",
    description: "High-resolution drone aerial survey producing orthophotos and 3D terrain models for land analysis and planning.",
    duration: "5 days",
    budget: "500,000",
    location: "Port Harcourt",
    date: "Oct 2024",
    rating: 4.8,
    review: "Modern equipment and very detailed aerial results.",
    categories: ["Survey"],
    tools: ["Drone", "Photogrammetry", "GIS Software"],
    images: ["/image/land1.jpg", "/image/land2.jpg"]
  }
]



/* ================= SKILLS ================= */
const skills = [
  "Surveying",
  "Mapping",
  "AutoCAD",
  "Construction Planning",
  "Site Supervision"
]


/* ================= PROJECTS ================= */
const selected = ref(null)

const projects = [
  {
    id: 1,
    title: "Modern Duplex Construction",
    location: "Abuja",
    image: "/image/service1.webp",
    desc: "Full building design and supervision."
  },
  {
    id: 2,
    title: "Land Survey & Mapping",
    location: "Lagos",
    image: "/image/service1.webp",
    desc: "Topographic mapping and measurement."
  },
  {
    id: 3,
    title: "Interior Renovation",
    location: "Ilorin",
    image: "/image/service1.webp",
    desc: "Interior redesign and finishing."
  }
]


/* ================= PROPERTIES ================= */
const properties = [
  {
    id: 1,
    title: "2 Plots of Land",
    location: "Ilorin",
    price: "5,000,000",
    image: "/image/land1.jpg"
  },
  {
    id: 2,
    title: "4 Bedroom Duplex",
    location: "Abuja",
    price: "45,000,000",
    image: "/image/house1.jpg"
  },
  {
    id: 3,
    title: "Commercial Shop",
    location: "Lagos",
    price: "18,000,000",
    image: "/image/shop1.jpg"
  }
]
</script>


<style scoped>
.input{
  @apply border w-full p-2 rounded;
}

.btn-primary{
  @apply bg-black text-white py-2 rounded;
}

.btn-border{
  @apply border py-2 rounded;
}
</style>
  