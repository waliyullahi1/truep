<template>
  <div class="pt- bg-gray-50 min-h-screen">
  hjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggfffffffffffffffffffffffffffffyggyuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
  <div v-if="isOwner">
     <div  v-if="isPreview"  class=" flex max-w-6xl px-3  pt-6 justify-between mx-auto ">
        <div class=" font-semibold ">
          Status : 
          <span 
            :class="[
              form.status === 'draft' ? 'text-gray-500 bg-gray-100' : '',
            form.status === 'pending' ? 'text-yellow-500 bg-yellow-100' : '',
            form.status === 'approved' ? 'text-green-500 bg-green-100' : '',
              form.status === 'rejected' ? 'text-red-500 bg-red-100' : '',
              !['draft','pending','approved','rejected'].includes(form.status) ? 'text-black bg-white' : ''
            ]"
            class="px-2 py-1 rounded"
          >
            {{form.status}}
         </span>
        </div >
      <div   class="flex  ">
          <UiButtonsPrimary @click="back">Edit</UiButtonsPrimary>
          <UiButtonsSecondary >Publish</UiButtonsSecondary>
      </div>

   </div>
  </div>
    <Container>
    <!-- <button @click="$router.back()" class="flex items-center mb-5 justify-between text-xl font-semibold  gap-2 text-gray-900">
            <  Back
     </button> -->
     <div class="flex  flex-col lg:flex-row gap-10">
       
        <!-- ================= LEFT ================= -->
        <div class="lg:w-3/5 space-y-12">

          <!-- TITLE -->
 
          <div>
              <div class="flex justify-between items-center">
                <h1 class="text-2xl font-semibold">
                <i class="fa-solid fa-house"></i>
                  {{ form.title }} 
                </h1>
              

                <div class="flex gap-4 text-xl">
                  <button @click="toggleWishlist">
                    {{ isWishlisted ? '❤️' : '🤍' }}
                  </button>
                  <button @click="shareProperty">🔗</button>
                </div>
              </div>

              <div class="  items-center text-gray-700 font-medium flex gap-1"> <MapPin class=" w-4" /> 
             
                 <p class=" text-sm">{{ form.location.address }},  {{ form.location.city }}, {{ form.location.state }} </p>
                 
              </div>
            </div>          <!-- AGENT -->
          <div class="flex items-center gap-3">
            <img
              :src="form.user?.avatar || '/images/default-agent.png'"
              class="w-14 h-14 rounded-full object-cover"
            />
            
            <div>

           
              <p class="font-semibold text-2xl">{{ `${form.user?.firstName} ` || 'Unknown Agent' }}</p>
              <div class="text-sm">
                <!-- ⭐ {{ form.agent?.rating || 0 }} -->
                <!-- <span class="text-gray-500">
                  ({{ form.agent?.reviews || 0 }} reviews)
                </span> -->
              </div>
              <p class="text-sm an text-gray-500">
                {{ form.user?.role || 'Property Owner' }}   || 📍 {{ form.user?.location.country || 'Nigeria' }}, {{ form.user?.location.state || 'Osun' }}
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
          <p class=" text-gray-500 mb-1  text-sm italic">
          
          Posted on {{ form.createdAt}}</p>
          
            <ImagesSlides :purpose="form.purpose" :images="form.media.images" />
          </div>

          <!-- HIGHLIGHTS -->
          <div v-if="form.houseDetails || form.landDetails" class="grid hidden grid-cols-3 gap-4 text-sm bg-white rounded-xl  p-5 text-">
          
            <div  v-if="getHouseValue('bedrooms')">🛏️ {{getHouseValue('bedrooms')}} Bedrooms</div>
            <div v-if="getHouseValue('bathrooms')">🛁 {{ getHouseValue('bathrooms') }} Bathrooms</div>
            <div v-if="getHouseValue('parking')">🚗 {{getHouseValue('parking')}} Parking</div>

            <div class=" font-semibold  text-md">Size:<div v-if="form.landDetails">📐 {{ form.landDetails.quantity }} {{ form.landDetails.unit }}<span class="text-gray-500 font-medium text-sm"> ({{ form.landDetails.size }} Sqm)</span></div> </div>
            <div class=" font-semibold" v-if="form">Quantity: <br> <span class="  font-normal"> {{ form.category.replace('_', ' ') }}</span></div>
            <div class=" font-semibold" v-if="form.landDetails">Price: <span class="  font-normal"> <br> ₦{{ (form.landDetails.price)?.toLocaleString() || 0 }}/per {{form.landDetails.unit}}</span></div>
          </div>

          <div v-if="form.houseDetails || form.landDetails" class="grid text-lg font-medium grid-cols-3 gap-4  bg-white rounded-xl  p-5 text-center">
          
            <div  class=" flex  justify-center gap-1" v-if="getHouseValue('bedroom')"><img src="/image/icon/bed.svg" class=" w-6"/> {{getHouseValue('bedroom')}} Bedrooms</div>
            <div v-if="getHouseValue('bathroom')">🛁 {{ getHouseValue('bathroom') }} Bathrooms</div>
            <div v-if="getHouseValue('parking')">🚗 {{getHouseValue('parking')}} Parking</div>
            <div v-if="getHouseValue('toilet')">🚽 {{getHouseValue('toilet')}} Toilet</div>
             <div v-if="getHouseValue('sittingRoom') ">🛋️ {{ getHouseValue('sittingRoom')}} Sitting Room</div>
            <div v-if="form.landDetails?.size > 1" class=" font-semibold  text-md">Size:<div >📐 {{ form.landDetails.quantity }} {{ form.landDetails.unit }}<span class="text-gray-500 font-medium text-sm"> ({{ form.landDetails.size }} Sqm)</span></div> </div>
            <div v-if="form.landDetails?.size > 1" class=" font-semibold">Quantity: <br> <span class="  font-normal"> {{ form.category.replace('_', ' ') }}</span></div>
            <div v-if="form.landDetails?.size > 1" class=" font-semibold" >Price: <span class="  font-normal"> <br> ₦{{ (form.landDetails.price)?.toLocaleString() || 0 }}/per {{form.landDetails.unit}}</span></div>
          </div>

          <!-- DESCRIPTION -->
          <div class="bg-white rounded-xl  p-6">
            <h3 class="font-semibold mb-2">Description</h3>
            <div ></div>
            <div v-html="showFull ? form.description : shortText" class=" max-w-none  prose-p:my-0 prose-ul:mt-2  prose-li:-my-0      prose-p:leading-tight prose-ol:mt-2 prose-ol:mb-2  prose quill-prose"/>
           
            <button class="text-blue-600 mt-2" @click="showFull = !showFull">
              {{ showFull ? 'Show less' : 'Read more' }}
            </button>
          </div>

          <!-- FEATURES -->
          <div v-if="form.features?.length" class="bg-white rounded-xl  p-6">
            <h3 class="font-semibold mb-4">Features</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
               v-for="item in form?.features?.filter(f => !['bedroom','toilet', 'parking', 'swimmingPool', 'sittingRoom', 'bathroom'].includes(f.key))" 
                :key="item._id || i"
                class="p-4 border  text-sm rounded-xl flex items-center gap-3"
              >
                <span>{{ item.icon }}</span>
                <span class=" text-xs font-bold">{{ item.label }}</span>
                
              </div>
            </div>
          </div>

          <!-- FEATURES -->
          <div v-if="form.features?.length" class="bg-white rounded-xl  p-6">
            <h3 class=" font-semibold mb-4 text-green-600 text-xl">🔒 Safety Tips</h3>
            <ul class="  list-decimal   text-sm  space-y-2"> 
               <li><span class=" font-semibold">No upfront payments: </span>Never pay before verifying ownership and documents.</li>
                <li><span class=" font-semibold">Check ownership: </span>Confirm land titles and documents with the appropriate authorities.</li>
                <li><span class=" font-semibold">Meet safely:  </span>Always inspect the land in person at a secure or public location.</li>
                <li><span class=" font-semibold">Bring a trusted person:  </span> A lawyer, surveyor, or friend can help validate details.</li>
                
            </ul> 
           <p class=" text-sm mt-4 text-red-600"> ⚠️ Disclaimer: Land.ng connects buyers with sellers and agents but does not guarantee transactions. Conduct due diligence before making payments.</p>
          </div>
  
          <!-- LOCATION -->
          <div class="bg-white rounded-xl  p-4">
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
          <div class="sticky top-24 bg-white rounded-xl   z-0 p-6 space-y-4">

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
                    <li v-if="getHouseValue('bedroom')">🛏 {{getHouseValue('bedroom')}} Bedrooms</li>
                    <li v-if="getHouseValue('bathroom')">🛁 {{ getHouseValue('bathroom') }} Bathrooms</li>
                     <li v-if="getHouseValue('sittingRoom') ">🛋️ {{ getHouseValue('sittingRoom')}} Sitting Room</li>
                     <li v-if="getHouseValue('toilet') ">🛋️ {{ getHouseValue('toilet')}} Toilet </li>
                    <li v-if="form.landDetails?.size > 1">📐 {{ form.landDetails.size }} {{ form.landDetails.unit }}</li>
                    <li v-if="form.landDetails?.quantity > 1">Quantity: {{ form.landDetails.quantity }}</li>
                    
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
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
import { MapPin, MapPinned, Home, Bed, Bath, Heart } from 'lucide-vue-next'
const isOwner = ref(false)


definePageMeta({
  layout: 'auth'
})


const route = useRoute()

/* ================= FORM STATE ================= */
const form = ref({
  title: '',
  description: '',
  pricing: { price: 0, currency: 'NGN',  paymentType: 'outright', },
  location: { city: '', state: '', address: '' },
  category: '',
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
    paymentType: 'outright',
  },
  createAt:'',
  media: { files: [] },
  features: [],
  status:'',
  agent: {},
})


const isPreview = computed(() => {
  const q = route.query.preview
  return q === '' || q === 'true' || q === '1'
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
const property = ref('')

/* ================= ACTIONS ================= */
const toggleWishlist = () => (isWishlisted.value = !isWishlisted.value)
const shareProperty = () => navigator.clipboard.writeText(window.location.href)
const back =() =>{

  
   router.push({
       path: '/user/list/new',
        query: {
         id: property.value,
          step:3
         },
       })
    
}
/* ================= HELPER: MERGE BACKEND DATA ================= */
const mergeForm = (data) => {
  if (!data) return
 
  form.value.status = data.status  || ''
  form.value.title = data.title || ''
  form.value.description = data.description || ''
  console.log(data.createdAt,' data.createdAt');
  form.status = data.status  || ''
  form.value.createdAt = new  Date(data.createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          });
          console.log(form.value.createdAt, 'form.value.createdAt');
  form.value.category = data.category || ''
  form.value.pricing = {
    ...form.value.pricing,
    ...data.pricing,
  }
  form.value.user = {
    ...form.value.user,
    ...data.userId,
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
   isOwner.value = res.isOwner
    mergeForm(data)
     property.value = propertyId
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
</style>