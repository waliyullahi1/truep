<template>
  <div class="pt-24 bg-gray-50 min-h-screen">
    <Container>
      <div class="flex flex-col lg:flex-row gap-10">

        <!-- ================= LEFT ================= -->
        <div class="lg:w-3/5 space-y-8">

          <!-- TITLE -->
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

          <!-- AGENT -->
          <div class="flex items-center gap-3">
            <img
              :src="form.userId?.avatar || '/images/default-agent.png'"
              class="w-14 h-14 rounded-full object-cover"
            />
            {{form.userId}}
            <div>
              <p class="font-semibold">{{ `${form.userId?.firstName} ${form.userId?.lastName}` || 'Unknown Agent' }}</p>
              <div class="text-sm">
                ⭐ {{ form.agent?.rating || 0 }}
                <span class="text-gray-500">
                  ({{ form.agent?.reviews || 0 }} reviews)
                </span>
              </div>
              <p class="text-xs text-gray-500">
                {{ form.agent?.role || 'Agent' }}
                <span
                  v-if="form.agent?.verified"
                  class="bg-green-600 text-white px-2 py-0.5 rounded ml-2 text-[11px]"
                >
                  Verified
                </span>
              </p>
            </div>
          </div>

          <!-- IMAGES -->
          <div class="gap-4">
         
          
            <ImagesSlides :images="form.media.images" />
          </div>

          <!-- HIGHLIGHTS -->
          <div v-if="form.houseDetails || form.landDetails" class="grid grid-cols-3 gap-4 bg-white rounded-xl shadow p-5 text-center">
          
            <div v-if="getHouseValue('bedrooms')">🛏️ {{getHouseValue('bedrooms')}} Bedrooms</div>
            <div v-if="getHouseValue('bathrooms')">🛁 {{ getHouseValue('bathrooms') }} Bathrooms</div>
            <div v-if="getHouseValue('parking')">🚗 {{getHouseValue('parking')}} Parking</div>

            <div v-if="form.landDetails">📐 {{ form.landDetails.quantity }} {{ form.landDetails.unit }}<span class="text-gray-500 font-medium text-sm"> ({{ form.landDetails.size }} Sqm)</span></div>
            <div v-if="form.landDetails">Quantity: {{ form.landDetails.quantity }}</div>
            <div v-if="form.landDetails">Price: ₦{{ (form.landDetails.price)?.toLocaleString() || 0 }}/per {{form.landDetails.unit}}</div>
          </div>

          <!-- DESCRIPTION -->
          <div class="bg-white rounded-xl shadow p-6">
            <h3 class="font-semibold mb-2">Description</h3>
            <div ></div>
            <div v-html="showFull ? form.description : shortText" class=" max-w-none  prose-p:my-0 prose-ul:mt-2  prose-li:-my-0      prose-p:leading-tight prose-ol:mt-2 prose-ol:mb-2  prose quill-prose"/>
           
            <button class="text-blue-600 mt-2" @click="showFull = !showFull">
              {{ showFull ? 'Show less' : 'Read more' }}
            </button>
          </div>

          <!-- FEATURES -->
          <div v-if="form.features?.length" class="bg-white rounded-xl shadow p-6">
            <h3 class="font-semibold mb-4">Features</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="(item, i) in form.features"
                :key="item._id || i"
                class="p-4 border rounded-xl flex items-center gap-3"
              >
                <span>{{ item.icon }}</span>
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>
  
          <!-- LOCATION -->
          <div class="bg-white rounded-xl shadow p-4">
            <h3 class="font-semibold mb-3">Location</h3>
            <iframe
              class="w-full h-64 rounded"
              loading="lazy"
              :src="mapUrl"
            ></iframe>
          </div>

        </div>

        <!-- ================= RIGHT ================= -->
        <div class="lg:w-2/5">
          <div class="sticky top-24 bg-white rounded-xl shadow-lg p-6 space-y-4">

            <!-- PRICE -->
            <h2 class="text-2xl font-bold text-green-600">
              {{ formattedPrice }}
            </h2>

            <!-- TABS -->
            <div>
              <div class="grid grid-cols-2 border-b">
                <button
                  v-for="tab in tabs"
                  :key="tab"
                  @click="activeTab = tab"
                  :class="['py-3', activeTab === tab ? 'border-b-2 border-black' : '']"
                >
                  {{ tab }}
                </button>
              </div>

              <div class="p-4 text-sm">

                <!-- DETAILS -->
                <div v-if="activeTab === 'Details'">
                  <ul class="space-y-2">
                    <li>📍 {{ form.location.city }}, {{ form.location.state }}</li>
                    <li v-if="form.pricing.price >1">🛏 {{ form.houseDetails.bedrooms }} Bedrooms</li>
                    <li v-if="form.pricing.price >1">🛁 {{ form.houseDetails.bathrooms }} Bathrooms</li>
                    <li v-if="form.pricing.price >1">🚗 {{ form.houseDetails.parking }} Parking</li>
                    <li v-if="form.pricing.price >1">📐 {{ form.houseDetails.size }} sqm</li>

                    <li v-if="form.landDetails">📐 {{ form.landDetails.size }} {{ form.landDetails.unit }}</li>
                    <li v-if="form.landDetails">Quantity: {{ form.landDetails.quantity }}</li>
                    <li v-if="form.landDetails">Price: ₦{{ form.landDetails.price?.toLocaleString() || 0 }}</li>
                  </ul>
                </div>

                <!-- AREA -->
                <div v-if="activeTab === 'Area Guide'">
                  <p>Good road, schools, hospital nearby.</p>
                </div>

              </div>
            </div>

            <!-- ACTIONS -->
            <button class="w-full bg-black text-white py-3 rounded-lg">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'



const route = useRoute()

/* ================= FORM STATE ================= */
const form = ref({
  title: '',
  description: '',
  pricing: { price: 0, currency: 'NGN' },
  location: { city: '', state: '', address: '' },

  houseDetails: {
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    size: 0,
  },

  landDetails: {
    size: 0,
    unit: '',
    quantity: 0,
    price: 0,
  },

  media: { files: [] },
  features: [],
  agent: {},
})



/* ================= COMPUTED ================= */
const formattedPrice = computed(() => {
  const housePrice = form.value.houseDetails.price
  const landPrice = form.value.landDetails.price
  const pricingPrice = form.value.pricing.price

  if (pricingPrice) return `₦${pricingPrice.toLocaleString()}`
  if (housePrice) return `₦${housePrice.toLocaleString()}`
  if (landPrice)
    return `₦${landPrice.toLocaleString()} / ${form.value.landDetails.unit}`

  return 'Price Not Set'
})

const getHouseValue = (key) => {
  return form.value.features?.find(i => i.key === key)?.value ?? 0
}
const shortText = computed(() =>
  form.value.description ? form.value.description.slice(0, 350) + '...' : ''
)

const mapUrl = computed(() =>
  `https://maps.google.com/maps?q=${form.value.location.city || ''}&output=embed`
)

const whatsappLink = computed(() =>
  `https://wa.me/2348000000000?text=Hi I am interested in ${form.value.title}`
)

/* ================= UI STATE ================= */
const showFull = ref(false)
const isWishlisted = ref(false)
const activeTab = ref('Details')
const tabs = ['Details', 'Area Guide']

/* ================= ACTIONS ================= */
const toggleWishlist = () => (isWishlisted.value = !isWishlisted.value)
const shareProperty = () => navigator.clipboard.writeText(window.location.href)

/* ================= HELPER: MERGE BACKEND DATA ================= */
const mergeForm = (data) => {
  if (!data) return

  form.value.title = data.title || ''
  form.value.description = data.description || ''

  form.value.pricing = {
    ...form.value.pricing,
    ...data.pricing,
  }

  form.value.location = {
    ...form.value.location,
    ...data.location,
  }

  form.value.houseDetails = {
    ...form.value.houseDetails,
    ...data.houseDetails,
  }

  form.value.landDetails = {
    ...form.value.landDetails,
    ...data.landDetails,
  }
  console.log(data);
  
  form.value.agent = data.userId || {}

  form.value.media.images =
    (data.media?.files || [])
      .filter(f => f.type === 'image')
      .map(f => f.url)


  form.value.features = data.features || []
}
/* ================= FETCH PROPERTY ================= */
onMounted(async () => {
  const propertyId = route.query?.id
  if (!propertyId) return

  try {
    const res = await useApiFetch(`/property/${propertyId}`, { method: 'GET' })
    const data = res.data?.data || res.data

    mergeForm(data)
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
</style>