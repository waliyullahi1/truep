<template>
  <div class="pt-  min-h-screen">
    <div v-if="pending" class="text-center py-10">
     <div class="pt- bg-gray-50 min-h-screen animate-pulse">
      <Container>
        <div class="flex flex-col lg:flex-row gap-10">

          <!-- LEFT -->
          <div class="lg:w-3/5 space-y-12">

            <!-- TITLE -->
            <div>
              <div class="flex justify-between items-center">
                <div class="h-6 w-2/3 bg-gray-300 rounded"></div>
                <div class="flex gap-3">
                  <div class="h-8 w-16 bg-gray-300 rounded"></div>
                  <div class="h-8 w-8 bg-gray-300 rounded"></div>
                </div>
              </div>

              <div class="h-4 w-1/2 bg-gray-200 rounded mt-3"></div>
            </div>

            <!-- AGENT -->
            <div class="flex items-center gap-3">
              <div class="w-14 h-14 bg-gray-300 rounded-full"></div>
              <div class="space-y-2">
                <div class="h-5 w-40 bg-gray-300 rounded"></div>
                <div class="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>

            <!-- IMAGES -->
            <div>
              <div class="h-4 w-32 bg-gray-200 rounded mb-3"></div>
              <div class="h-[300px] bg-gray-300 rounded-xl"></div>
            </div>

            <!-- FEATURES GRID -->
            <div class="grid grid-cols-3 gap-4 bg-white rounded-xl p-5">
              <div v-for="i in 6" :key="i" class="space-y-2 text-center">
                <div class="h-10 w-10 mx-auto bg-gray-300 rounded-full"></div>
                <div class="h-4 w-10 mx-auto bg-gray-200 rounded"></div>
                <div class="h-3 w-16 mx-auto bg-gray-200 rounded"></div>
              </div>
            </div>

            <!-- DESCRIPTION -->
            <div class="bg-white rounded-xl p-6 space-y-3">
              <div class="h-5 w-32 bg-gray-300 rounded"></div>
              <div class="h-4 w-full bg-gray-200 rounded"></div>
              <div class="h-4 w-full bg-gray-200 rounded"></div>
              <div class="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div class="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>

            <!-- FEATURES -->
            <div class="bg-white rounded-xl p-6">
              <div class="h-5 w-32 bg-gray-300 rounded mb-4"></div>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="i in 6" :key="i" class="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>

            <!-- SAFETY -->
            <div class="bg-white rounded-xl p-6 space-y-3">
              <div class="h-5 w-40 bg-gray-300 rounded"></div>
              <div v-for="i in 4" :key="i" class="h-4 w-full bg-gray-200 rounded"></div>
            </div>

            <!-- MAP -->
            <div class="bg-white rounded-xl p-4">
              <div class="h-5 w-24 bg-gray-300 rounded mb-3"></div>
              <div class="w-full h-64 bg-gray-300 rounded"></div>
            </div>

          </div>

          <!-- RIGHT -->
          <div class="lg:w-2/5">
            <div class="sticky top-24 bg-white rounded-xl p-6 space-y-4">

              <!-- PRICE -->
              <div class="h-6 w-32 bg-gray-300 rounded"></div>

              <!-- TABS -->
              <div class="flex gap-4">
                <div class="h-8 w-20 bg-gray-200 rounded"></div>
                <div class="h-8 w-20 bg-gray-200 rounded"></div>
              </div>

              <!-- DETAILS -->
              <div class="space-y-2">
                <div v-for="i in 5" :key="i" class="h-4 w-full bg-gray-200 rounded"></div>
              </div>

              <!-- BUTTONS -->
              <div class="h-10 w-full bg-gray-300 rounded"></div>
              <div class="h-10 w-full bg-gray-300 rounded"></div>

            </div>
          </div>

        </div>
      </Container>
    </div>
    </div>
    <div v-else-if="!property">
      <p class="text-red-500 text-center py-10">
        Property not available or server is down.
         
      </p>
    </div>
    <div v-else class="v-else">
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
              <div class="sm:flex block justify-between items-center">
                <div>
                  <h1 class="sm:text-2xl text-xl  font-inter font-bold">
                     {{ capitalizeFirstLetter(form.title) }}
                  </h1>
                   <div class="  items-center text-gray-600 font-normal flex gap-1"> <MapPin class=" w-4" /> 
             
                     <p class=" font-inter te text-sm sm:text-[16px]">{{ form.location.address }},  {{ form.location.city }}, {{ form.location.state }} </p>
                 
                   </div>
                </div>
                
              

                <div class="flex gap-4 text-xl">
                  <button :class="isWishlisted ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'" class=" text-[14px] flex gap-2 items-center  border px-2 sm:px-4 py-1 rounded-md text-gray-600" @click="toggleWishlist">
                     <p class=" text-[12px]">{{ isWishlisted ? '❤️' : '🤍' }}</p>
                    Save 
                  </button>
                  <button @click="shareProperty">
                    <Share2 />
                  </button>
                </div>
              </div>

             
            </div>         
             <!-- Prices -->
              
             <div class=" text-gray-600 font-normal flex flex-col gap-1">
              
              <!-- MAIN PRICE -->
               <p class="  font-semibold bg-rose-200 text-sm w-fit  text-rose-800 px-2"> For {{capitalizeFirstLetter(form.purpose)}}</p>
              <p class="font-inter text-xl font-bold text-green-600">
                {{ formattedPrice }}
                <span class="text-secondary text-lg">
                  /{{ form.pricing.paymentType }} 
                </span>
              </p>

              <!-- EXTRA DETAILS -->
              <p class="text-sm text-gray-500">
                {{ formattedPricingDetails }}
              </p>

            </div>
          

          <!-- IMAGES -->
          <div class="gap-4">
          <p class=" text-gray-500 mb-1  text-sm italic">
          
          Posted on {{ form.createdAt}}</p>
          
            <ImagesSlides :purpose="form.purpose" :images="form.media.images" />
          </div>



          <div class=" flex flex-wrap gap-4 bg-white rounded-xl p-5 text-center">

              <div
                v-for="item in houseItems"
                :key="item.key"
                class="flex flex-col items-center justify-center"
              >
                <div class="flex h-11 w-11 p-1 rounded-full bg-green-200/40 items-center justify-center">
                  
                  <!-- Icon -->
                  <component
                    v-if="typeof item.icon !== 'string'"
                    :is="item.icon"
                    class="text-green-600"
                  />
                  <span v-else>{{ item.icon }}</span>

                </div>

                <div class="leading-tight">
                  <p class="font-medium text-lg">{{ item.value }}</p>
                  <p class="text-sm font-normal text-gray-500">
                    {{ item.label }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center">
                <div class="flex h-11 w-11 p-1 rounded-full bg-green-200/40 items-center justify-center">
                  <!-- Icon -->
                  <House class=" text-green-600 w-6 text-[14px]" />
                </div>

                <div class="leading-tight">
                  <p class="font-medium font-inter text-lg">{{ capitalizeFirstLetter(form.category).replace(/_/g, ' ') }}</p>
                  <p class="text-sm font-normal text-gray-500">
                    Property Type
                  </p>
                </div>
              </div>

          </div>

          <!-- DESCRIPTION -->
          <div font-inter class="bg-white rounded-xl p-6">
            <h3 class="font-medium text-xl mb-3 text-gray-900">
              Description
            </h3>

            <div
              class="text-gray-700 text-[15px] leading-relaxed space-y-3"
            >
              <div
                v-html="showFull ? form.description : shortText"
                class="description-content"
              ></div>
            </div>

            <button
              v-if="form.description?.length > 350"
              class="text-blue-600 text-sm mt-3 font-medium hover:underline"
              @click="showFull = !showFull"
            >
              {{ showFull ? 'Show less' : 'Read more' }}
            </button>
          </div>

          <!-- FEATURES -->
          <div v-if="form.features?.length" class="bg-white rounded-xl  p-6">
           <h3 class="font-medium text-xl mb-3 text-gray-900">
              Amenities
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
               v-for="item in form?.features?.filter(f => !['bedroom','toilet', 'parking', 'swimmingPool', 'sittingRoom', 'bathroom'].includes(f.key))" 
                :key="item._id || i"
                class="p-4 border  text-sm rounded-xl flex items-center gap-3"
              >
               <div class=" w-3 h-3  bg-green-600  rounded-full"></div>
                <span class=" text-xs fond">{{ item.label }}</span>
                
              </div>
            </div>
          </div>

           <!-- Properties Details -->
          <div v-if="form.features?.length" class="bg-white rounded-xl  p-6">
           <h3 class="font-medium text-xl mb-3 text-gray-900">
              Property Details
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div flex just  class="p-4 border-b  text-sm  justify-between flex items-center gap-3">
                <span class=" text-slate-500 text-sm fond">Property ID</span>
                 <span class="  text-sm fond">C{{form.id.toLocaleUpperCase().slice(0, 7)}}</span>
              </div>
               <div    flex just  class="p-4 border-b  text-sm  justify-between flex items-center gap-3">
                <span class=" text-slate-500 text-sm fond">Property Type</span>
                 <span class="  text-sm fond">{{capitalizeFirstLetter(form.category.replace(/_/g, ' '))}}</span>
              </div>
               <div  flex just  class="p-4 border-b  text-sm  justify-between flex items-center gap-3">
                <span class=" text-slate-500 text-sm fond">Listing Type</span>
                 <span class="  text-sm fond"> For {{capitalizeFirstLetter(form.purpose)}}</span>
              </div>
               <div   :key="item" flex just  class="p-4 border-b  text-sm  justify-between flex items-center gap-3">
                <span class=" text-slate-500 text-sm fond">Status</span>
                 <span class="  text-sm fond">{{capitalizeFirstLetter(form.status)}}</span>
              </div>
            </div>
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

          <RelatedListings
            :location="form.location.state"
            :city="form.location.city"
            :type="form.type"
            :category="form.category"
            :currentId="form._id"
          />

        </div>

        <!-- ================= RIGHT ================= -->
        <div class="lg:w-2/5 ">
          <div class="     top-24   z-0 p-6 space-y-6">

          
              <div class="  border   bg-white rounded-xl    p-6 space-y-6">
                  <!-- AGENT -->
                  <div> 
                    <div class="flex items-center gap-3">
                      <img  :src="form.user?.avatar || '/images/default-agent.png'" class=" w-16 h-16 rounded-full object-cover" />
                    <div>

                    <p class=" text-xs   text-gray-700"> Listed By</p>
                    <p class=" text-sm">{{ `${form.user?.firstName}  ${form.user?.lastName}` || 'Unknown Agent' }}</p>
                  </div>
              </div>
                  </div>
              

                  <!-- ACTIONS -->
                  <button class="w-fit flex gap-1  items-center tm text-xs border py-2 px-4 rounded-lg">
                    <MessageSquareText class=" w-5" />
                    Contact  Agent
                  </button>
              </div>
              
              <PropertyInquiry :title="form.title" :price="formattedPrice" :propertyId="property?._id"/>
              
              <SafetyTips/>
              <div>
               
                <UiTypography  class="font-medium">Discover more</UiTypography>
                <DiscoverMore />
              </div>

           
          </div>

          
        </div>

      </div>
    </Container>
    </div>
     <NavigationFooter />
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MapPin,House, Toilet,  MapPinned, Share2, MessageSquareText, Home, Bed, Bath, Heart } from 'lucide-vue-next' 
definePageMeta({
  layout: 'auth'
})

const router = useRouter()
const route = useRoute()

/* ================= FORM STATE ================= */
const form = ref({
  title: '',
  type:'',
  id: '',
  description: '',
  purpose: '',
  pricing: { price: 0, currency: 'NGN', paymentType: 'outright' },
  location: { city: '', state: '', address: '' },
  category: '',
  houseDetails: {},
  landDetails: {
    size: 0,
    unit: '',
    quantity: 0,
    price: 0,
    
  },
  createdAt: '',
  media: { images: [] },
  features: [],
  status: '',
  user: {}
})

/* ================= UI STATE ================= */
const showFull = ref(false)
const isWishlisted = ref(false)
const activeTab = ref('Details')
const tabs = ['Details', 'Area Guide']

/* ================= FETCH (SSR SAFE) ================= */
const { data, pending, error } = await useAsyncData(
  `property-${route.params.slogan}`,
  async () => {
    try {
      const slogan = route.params.slogan
      if (!slogan) return null

      const res = await useApiFetch(`/property/${slogan}`)

      // ✅ Extract ONLY plain JSON
      const safe = res?.data?.data || res?.data || null

      // ✅ Prevent "non-POJO" error
      return JSON.parse(JSON.stringify(safe))
    } catch (err) {
      console.error('Fetch failed:', err)
      return null
    }
  }
)

/* ================= COMPUTED ================= */
const property = computed(() => data.value || null)

const isOwner = computed(() => {
  return data.value?.isOwner || false
})

const isPreview = computed(() => {
  const q = route.query.preview
  return q === '' || q === 'true' || q === '1'
})

const formattedPrice = computed(() => {
  const housePrice = form.value.houseDetails?.price
  const landPrice = form.value.landDetails?.price
  const pricingPrice = form.value.pricing?.price

  if (pricingPrice) return `₦${pricingPrice.toLocaleString()}`
  if (housePrice) return `₦${housePrice.toLocaleString()}`
  if (landPrice)
    return `₦${landPrice.toLocaleString()} / ${form.value.landDetails.unit}`

  return 'Price Not Set'
})

const shortText = computed(() =>
  form.value.description
    ? form.value.description.slice(0, 350) + '...'
    : ''
)

const mapUrl = computed(() =>
  `https://maps.google.com/maps?q=${form.value.location?.city || ''}&output=embed`
)

const whatsappLink = computed(() =>
  `https://wa.me/2348000000000?text=Hi I am interested in ${form.value.title}`
)

/* ================= HELPERS ================= */
const capitalizeFirstLetter = (text) => {
  if (!text) return ''

  const lower = text.toLowerCase() // ✅ step 1: make everything lowercase

  return lower.replace(/[a-z]/i, (char) => char.toUpperCase()) // ✅ step 2: capitalize first letter
}

const getHouseValue = (key) => {
  return form.value.features?.find(i => i.key === key)?.value ?? 0
}

const formattedPricingDetails = computed(() => {
  const pricing = form.value.pricing
  if (!pricing) return ''

  // Installment
  if (pricing.paymentType === 'installment') {
    const months = pricing.installment?.months
    const monthly = pricing.installment?.monthlyAmount

    return `${months} months • ₦${monthly?.toLocaleString()}/month`
  }

  // Rent
  if (pricing.paymentType === 'rent') {
    const value = pricing.rent?.duration?.value
    const unit = pricing.rent?.duration?.unit

    return `${value || ''} ${unit || ''}`.trim()
  }

  // Default (outright)
  return 'One-time payment'
})

const houseItems = computed(() => {
  const h = form.value.houseDetails || {}

  return [
    {
      key: 'bedroom',
      label: 'Bedrooms',
      value: h.bedroom,
      icon: Bed
    },
    {
      key: 'bathroom',
      label: 'Bathrooms',
      value: h.bathroom,
      icon: Bath
    },
        {
      key: 'toilet',
      label: 'Toilets',
      value: h.toilet,
      icon: Toilet
    },
   
    
    
  ].filter(item => item.value > 0) // ✅ only show valid ones
})
/* ================= ACTIONS ================= */
const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
}

const shareProperty = () => {
  navigator.clipboard.writeText(window.location.href)
}

const back = () => {
  router.push({
    path: '/user/list/new',
    query: {
      id: property.value?._id,
      step: 3
    }
  })
}

/* ================= MERGE BACKEND DATA ================= */
const mergeForm = (data) => {
  if (!data) return
  console.log(data);
  form.value.id = data._id || ''
  form.value.status = data.status || ''
  form.value.type = data.type || ''
  form.value.title = data.title || ''
  form.value.description = data.description || ''
  form.value.paymentType = data.paymentType || ''
  form.value.purpose = data.purpose || ''
   form.value.category = data.category || ''
  form.value.createdAt = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : ''

  form.value.category = data.category || ''

  form.value.pricing = {
    ...form.value.pricing,
    ...data.pricing
  }

  form.value.user = {
    ...form.value.user,
    ...data.userId
  }

  form.value.location = {
    ...form.value.location,
    ...data.location
  }

  form.value.houseDetails = {
    ...form.value.houseDetails,
    ...data.houseDetails
  }

  form.value.landDetails = {
    ...form.value.landDetails,
    ...data.landDetails
  }

  form.value.media.images =
    (data.media?.files || [])
      .filter(f => f.type === 'image')
      .map(f => f.url)

  form.value.features = data.features || []
}

/* ================= WATCH ================= */
watchEffect(() => {
  if (!property.value) return
  mergeForm(property.value)
})
</script>
<style scoped>

.description-content p {
  margin: 0.5rem 0;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
}

.description-content ul,
.description-content ol {
  padding-left: 1.2rem;
  margin: 0.5rem 0;
   font-family: 'Inter', sans-serif;
}

.description-content li {
  margin: 0.25rem 0;
   font-family: 'Inter', sans-serif;
}

.description-content strong {
  font-weight: 600;
  color: #111827;
   font-family: 'Inter', sans-serif;
}

.description-content h1,
.description-content h2,
.description-content h3 {
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
   font-family: 'Inter', sans-serif;
}
</style>