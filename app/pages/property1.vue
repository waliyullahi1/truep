
<template>
  <div class="pt-24 bg-gray-50 min-h-screen">

    <Container>
      <div class="flex flex-col lg:flex-row gap-10">

        <!-- ================================================= -->
        <!-- LEFT SIDE https://www.fiverr.com/hire/business-card-design -->
        <!-- ================================================= -->
        <div class="lg:w-3/5 space-y-8">

          <!-- ================= TITLE + ACTIONS ================= -->
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold">
              {{ form.title }}
            </h1>

            <div class="flex gap-4 text-xl">
              <button @click="toggleWishlist">
                {{ isWishlisted ? '❤️' : '🤍' }}
              </button>
              <button @click="shareProperty">🔗</button>
            </div>
          </div>


          <!-- PROFILE -->
          <div class="flex items-center gap-3">
            <img
              src="/images/4T2A1567.png"
              class="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <p class="font-semibold">Abdul Sammad</p>

              <div class="flex items-center gap-1 text-sm">
                ⭐⭐⭐⭐⭐
                <span class="text-gray-500">4.7 (300 reviews)</span>
              </div>

              <p class="text-xs text-gray-500">
                Surveyor
                <span class="bg-green-600 text-white px-2 py-0.5 rounded ml-2 text-[11px]">
                  Verified
                </span>
              </p>
            </div>
          </div>

          <!-- ================= IMAGE SLIDER ================= -->
          <Images_slides />


          <!-- ================= HIGHLIGHTS ================= -->
          <div
            class="grid grid-cols-3 gap-4 bg-white rounded-xl shadow p-5 text-center"
          >
            <div
              v-for="item in highlights"
              :key="item.label"
              class="flex flex-col items-center"
            >
              <span class="text-2xl">{{ item.icon }}</span>
              <span class="font-semibold">{{ item.value }}</span>
              <span class="text-sm text-gray-500">{{ item.label }}</span>
            </div>
          </div>


          <!-- ================= DESCRIPTION + READ MORE ================= -->
          <div class="bg-white rounded-xl shadow p-6">
            <h3 class="font-semibold mb-2">Description</h3>

            <p class="text-gray-600">
              {{ showFull ? form.description : shortText }}
            </p>

            <button
              class="text-blue-600 mt-2"
              @click="showFull = !showFull"
            >
              {{ showFull ? 'Show less' : 'Read more' }}
            </button>
          </div>


          <!-- ================= AMENITIES ================= -->
          <div class="bg-white rounded-xl shadow p-6">
            <h3 class="font-semibold mb-4">Amenities</h3>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">

              <div
                v-for="(item,i) in amenities"
                :key="i"
                class="p-4 rounded-xl border hover:shadow-lg transition hover:-translate-y-1 flex items-center gap-3"
              >
                <span class="text-xl">{{ item.icon }}</span>
                <span>{{ item.name }}</span>
              </div>

            </div>
          </div>


          <!-- ================= GOOGLE MAP ================= -->
          <div class="bg-white rounded-xl shadow p-4">
            <h3 class="font-semibold mb-3">Location</h3>

            <iframe
              class="w-full h-64 rounded"
              loading="lazy"
              src="https://maps.google.com/maps?q=Lekki%20Lagos&t=&z=13&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>


          <!-- ================= SIMILAR PROPERTIES ================= -->
          <div>
            <h3 class="font-semibold mb-3">Similar Properties</h3>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">

              <div
                v-for="(item,i) in similarProperties"
                :key="i"
                class="bg-white rounded-lg shadow hover:shadow-xl transition cursor-pointer"
              >
                <img :src="item.image" class="h-32 w-full object-cover" />
                <div class="p-3 text-sm font-medium">
                  {{ item.price }}
                </div>
              </div>

            </div>
          </div>

        </div>



        <!-- ================================================= -->
        <!-- RIGHT SIDEBAR -->
        <!-- ================================================= -->
        <div class="lg:w-2/5">
         <div class="sticky top-24 bg-white rounded-xl shadow-lg p-6 space-y-4">

            <h2 class="text-2xl font-bold text-green-600">
              {{ property.price }}
            </h2>
             <div class="bg-white ">

            <!-- Tab Buttons -->
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

            <!-- Tab Content -->
            <div class="p-6 text-sm text-gray-700">

              <!-- DETAILS -->
              <div v-if="activeTab === 'Details'">                                                             
                <p class="mb-4">
                  Beautiful modern duplex located in Lekki with good road
                  access, security and steady electricity.
                </p>

                <ul class="space-y-2">
                  <li>📍 Lekki, Lagos</li>
                  <li>🛏 5 Bedrooms</li>
                  <li>🛁 5 Bathrooms</li>
                  <li>🚽 5 Toilets</li>
                  <li>📐 1400 sqm</li>
                </ul>
              </div>

             

              <!-- AREA -->
              <div v-if="activeTab === 'Area Guide'">
                <p>
                  Close to schools, shopping malls, hospital and major roads.
                  Perfect for family living.
                </p>
              </div>

            </div>
          </div>
          
            <button
              @click="openChat"
              class="w-full bg-black text-white py-3 rounded-lg"
            >
              Chat Me
            </button>

            <a
              :href="whatsappLink"
              target="_blank"
              class="block text-center w-full bg-green-600 text-white py-3 rounded-lg"
            >
             Continue
            </a>

           

          </div>
        </div>

      </div>
    </Container>



    <!-- ================================================= -->
    <!-- BOOKING MODAL -->
    <!-- ================================================= -->
    <div
      v-if="showBooking"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-96 rounded-xl p-6 space-y-4">

        <h3 class="font-semibold text-lg">Schedule Visit</h3>

        <input v-model="booking.name" placeholder="Name" class="input"/>
        <input v-model="booking.phone" placeholder="Phone" class="input"/>
        <input type="date" v-model="booking.date" class="input"/>

        <div class="flex gap-3">
          <button @click="submitBooking" class="btn-primary flex-1">
            Submit
          </button>
          <button @click="showBooking=false" class="btn-border flex-1">
            Cancel
          </button>
        </div>
      </div>
    </div>

  </div>
</template>



<script setup>
import { ref, computed } from 'vue'
definePageMeta({
  layout: 'auth'
})

/* ================= PROPERTY DATA ================= */

const form = ref({
  id: null,
  title: '5 Bedroom Detached Duplex for Sale',
    
  description: `State-of-Art 5Bed Detached Duplex with swimming pool, rooftop & cinema room located in Chevron Lekki. 
     Well finished contemporary design with modern fittings and 4 car parking space.`,
  category: '',
  type: 'land',
  purpose: 'sale',

  pricing: {
    price: '₦750000000',
    currency: "NGN",
    rentDuration: null,
    installment: false,
    installmentPlan: { months: null, monthlyAmount: null }
  },

  location: {
    
    country: "Nigeria",
    state: "osun",
    lga: "",
    city: "iwo",
    address: "ile alaadprun area",
    source: "gps",
    geometry: { type: "Polygon", coordinates: [] }
  },

  landDetails: { unit: "plot", size: null, quantity: 1, totalSqm: null, price:"₦750000000" },
  houseDetails: null,
  media: { images: [], video: null },
  documents: { surveyPlan: null, titleDocument: null },
  features: [],
  contact: { name: "", phone: "", whatsapp: "" }
})
const property = {
  title: '5 Bedroom Detached Duplex for Sale',
  price: '₦750,000,000',
  description:
    `State-of-Art 5Bed Detached Duplex with swimming pool, rooftop & cinema room located in Chevron Lekki. 
     Well finished contemporary design with modern fittings and 4 car parking space.`
}


/* ================= HIGHLIGHTS ================= */
const highlights = [
  { icon: '🛏️', value: 5, label: 'Bedrooms' },
  { icon: '🛁', value: 6, label: 'Bathrooms' },
  { icon: '🚗', value: 4, label: 'Parking' }
]


/* ================= AMENITIES ================= */
const amenities = [
  { icon: '🏊', name: 'Swimming Pool' },
  { icon: '🎬', name: 'Cinema Room' },
  { icon: '🏠', name: 'Rooftop' },
  { icon: '🔥', name: 'Water Heater' },
  { icon: '🔊', name: 'In-built Speakers' },
  { icon: '🚿', name: 'Walk-in Shower' },
  { icon: '🍳', name: 'Microwave & Oven' },
  { icon: '👕', name: 'Walk-in Closet' }
]


/* ================= DESCRIPTION ================= */
const showFull = ref(false)
const shortText = computed(() =>
  property.description.slice(0, 120) + '...'
)

const tabs = ['Details',  'Area Guide']
const activeTab = ref('Details')
/* ================= WISHLIST ================= */
const isWishlisted = ref(false)
const toggleWishlist = () =>
  (isWishlisted.value = !isWishlisted.value)


/* ================= SHARE ================= */
const shareProperty = () =>
  navigator.clipboard.writeText(window.location.href)


/* ================= WHATSAPP ================= */
const whatsappLink =
  `https://wa.me/2348000000000?text=Hi I am interested in this property`


/* ================= BOOKING ================= */
const showBooking = ref(false)

const booking = ref({
  name: '',
  phone: '',
  date: ''
})

const submitBooking = () => {
  alert('Visit scheduled!')
  showBooking.value = false
}


/* ================= SIMILAR ================= */
const similarProperties = [
  { image: '/images/land1.jpg', price: '₦500M' },
  { image: '/images/land2.jpg', price: '₦420M' },
  { image: '/images/land1.jpg', price: '₦390M' }
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
  
