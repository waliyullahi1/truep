<template>
<div class="min-h-screen py-14 px-4 bg-gradient-to-b from-gray-50 to-white">
  <Container>

    <!-- ✅ STEP PROGRESS -->
    <div class="mb-12">
      <div class="flex items-center justify-between text-sm font-medium">
        <div :class="step >= 1 ? 'text-black' : 'text-gray-400'">Basic Info</div>
        <div :class="step >= 2 ? 'text-black' : 'text-gray-400'">Details</div>
        <div :class="step >= 3 ? 'text-black' : 'text-gray-400'">Media</div>
        <div :class="step >= 4 ? 'text-black' : 'text-gray-400'">Ownership</div>
      </div>
      <div class="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-black transition-all duration-500"
          :style="{ width: (step / 4) * 100 + '%' }"
        />
      </div>
    </div>

    <!-- ================= STEP 1 ================= -->
    <div v-if="step === 1" class="max-w-5xl mx-auto space-y-10">

      <!-- PURPOSE & CATEGORY -->
      <div class="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 class="section-title">Purpose</h2>
            <select v-model="formSelection" @change="onCategoryChange" class="input">
              <option disabled value="">Select Purpose</option>
              <option v-for="item in purposeOptions" :key="item.label" :value="item.value">
                {{ item.label }}
              </option>
            </select>
          </div>

          <div>
            <h2 class="section-title">Category</h2>
            <select v-model="form.category" class="input">
              <option disabled value="">Select Type</option>
              <option v-for="item in options" :key="item.key" :value="item.key">
                {{ item.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- LOCATION / FEATURES / OTHERS -->
      <div class="border border-gray-200 rounded-2xl p-8 bg-gray-50">

        <!-- TABS -->
        <div class="flex bg-gray-100 rounded-xl p-1">
          <div class="tab flex-1" :class="{ active: activeSection === 'location' }" @click="activeSection = 'location'">
            Location <span v-if="isCompleted('location')">✅</span>
          </div>
          <div class="tab flex-1" :class="{ active: activeSection === 'features' }" @click="activeSection = 'features'">
            Features <span v-if="isCompleted('features')">✅</span>
          </div>
          <div class="tab flex-1" :class="{ active: activeSection === 'others' }" @click="activeSection = 'others'">
            Others <span v-if="isCompleted('others')">✅</span>
          </div>
        </div>

        <div class="mt-8">
          <!-- LOCATION -->
          <div v-if="activeSection === 'location'">
            <div class="flex gap-3 mb-6">
              <button @click="setSource('gps')" :class="form.location.source === 'gps' ? 'btn-dark' : 'btn-light'">Use Map</button>
              <button @click="setSource('manual')" :class="form.location.source === 'manual' ? 'btn-dark' : 'btn-light'">Enter Manually</button>
            </div>

            <div v-if="form.location.source === 'gps'">
              <ListLandMap v-if="propertyType === 'land'" v-model="form" />
              <ListHouseLocationPicker v-if="propertyType === 'house'" v-model="form" />
            </div>

            <div v-if="form.location.source === 'manual'">
              <ListStateLGASelector v-model="form.location" />
            </div>
          </div>

          <!-- FEATURES -->
          <div v-if="activeSection === 'features'">
            <ListFeature :type="propertyType" v-model="form.features" />
          </div>

          <!-- OTHERS -->
          <div v-if="activeSection === 'others'" class="space-y-8">
            <ListLandother v-if="propertyType === 'land'" v-model="form" />
            <ListHouseother v-if="propertyType === 'house'" v-model="form" :purpose="form.purpose" />
            <ListPaymentType v-model="form.pricing" :purpose="form.purpose" />
          </div>
        </div>
      </div>
    </div>

    <!-- ================= STEP 2 ================= -->
    <div v-if="step === 2" class="max-w-5xl mx-auto space-y-10">

      <!-- TITLE -->
      <div class="card">
        <div class="flex justify-between">
          <div>
            <h2 class="text-xl font-semibold">Property Title</h2>
            <p class="text-xs text-gray-500">Auto-generated from property details</p>
          </div>
          <button @click="EditTittle" class="btn-light">
            {{ editTitle ? 'Lock' : 'Edit' }}
          </button>
        </div>

        <div v-if="!editTitle" class="preview-box">
          {{ form.title || 'No title generated yet' }}
        </div>

        <textarea v-else v-model="form.title" class="input h-24"/>
      </div>

      <!-- DESCRIPTION -->
      <div class="card">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold">Description</h2>
            <p class="text-xs text-gray-500">AI can generate this for you</p>
          </div>

          <button @click="generateAI" :disabled="loadingAigenerate" class="btn-dark">
            {{ loadingAigenerate ? 'Generating...' : 'Generate AI Description' }}
          </button>
        </div>

        <ListDescription v-model="form.description" />
      </div>
    </div>

    <!-- ================= STEP 3 ================= -->
    <div v-if="step === 3" class="max-w-5xl mx-auto">
      <ListUpload :purpose="form.purpose" />
    </div>

    <!-- ================= STEP 4 ================= -->
    <div v-if="step === 4" class="max-w-5xl mx-auto">
      <ListOwnershipSelector v-model:ownlistingType="form.ownership.listingType" />
    </div>

    <!-- NAVIGATION -->
    <div class="flex justify-between items-center mt-14 pt-8 border-t">
      <button v-if="step > 1" @click="back" class="btn-light">Back</button>

      <button v-if="step < 4" @click="next" class="btn-dark ml-auto">
        Continue
      </button>

      <button v-if="step === 4" @click="submit" class="btn-dark ml-auto">
        Submit Listing
      </button>
    </div>

  </Container>
</div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const ownershipType = ref('')
const agentName = ref('')
const loading = ref(true)
const loadingAigenerate = ref(false)
const editTitle = ref(false)
const router = useRouter()
const route = useRoute()
const { $toast } = useNuxtApp()

definePageMeta({ layout: 'auth' })

/* ================= STEP CONTROL ================= */
const step = ref(Number(route.query.step) || 1)
const activeSection = ref('location')
const loginloading = ref(false)
/* ================= FORM DATA ================= */
const form = ref({
  id: null,
  title: '',
  description: '',
  category: '',
  type: '',
  purpose: '',
pricing: {
  price: null,               // Total price
  currency: "NGN",           // Currency
  negotiable: false,         // Is price negotiable
  paymentType: 'outright',   // "outright" | "installment" | "rent"

  // ✅ RENT STRUCTURE
  rent: {
    duration: {
      value: null,           // e.g. 1, 2, 6
      unit: null             // "day" | "week" | "month" | "year"
    }
  },

  // ✅ INSTALLMENT STRUCTURE
  installment: {
    months: null,            // Number of months to pay
    monthlyAmount: null      // Amount per month
  }
},

ownership: {
  listingType:'business',
  ownerId: '',
  agentId: '',

},

   

  location: {
    
    country: "Nigeria",
    state: "",
    lga: "",
    city: "",
    address: "",
    source: "gps",
    geometry: { type: "Polygon", coordinates: [] }
  },
  paymentType: 'outright',
  landDetails: { unit: "plot", size: null, quantity: 1, totalSqm: null,  },
  houseDetails: null,
 
  media: { images: [], video: null },
  documents: { surveyPlan: null, titleDocument: null },
  features: [],
  contact: { name: "", phone: "", whatsapp: "" }
})

/* ================= PURPOSE OPTIONS ================= */
const purposeOptions = [
  { label: 'Sell Land', value: { purpose: 'sale', type: 'land' } },
  { label: 'Sell House', value: { purpose: 'sale', type: 'house' } },
  { label: 'Rent House', value: { purpose: 'rent', type: 'house' } }
]

const formSelection = ref(null)
watch(formSelection, val => {
  if (val) {
    form.value.purpose = val.purpose
    form.value.type = val.type
    }
})

const setSource = (type) => {
  form.value.location.source = type
}
/* ================= PROPERTY TYPE ================= */
const propertyType = computed(() => form.value.type)

/* ================= OPTIONS BASED ON TYPE ================= */
const houseType = [
  { key: 'self_contain', label: 'Self Contain' },
  { key: 'duplex', label: 'Duplex' },
  { key: 'flat', label: 'Flat' },
  { key: 'mansion', label: 'Mansion' },
  { key: 'bungalow', label: 'Bungalow' },
  { key: 'villa', label: 'Villa' },
  { key: 'shop', label: 'Shop' },
  { key: 'office_space', label: 'Office Space' }
]

const landType = [
  { key: 'commercial_land', label: 'Commercial Land' },
  { key: 'residential_land', label: 'Residential Land' },
  { key: 'industrial_land', label: 'Industrial Land' },
  { key: 'mixed_use_land', label: 'Mixed-use Land' },
  { key: 'family_land', label: 'Family Land' },
  { key: 'other_land', label: 'Other Land' }
]

const options = computed(() => {
  if (propertyType.value === 'land') return landType
  if (propertyType.value === 'house') return houseType
  return []
})

/* ================= WATCH TYPE TO UPDATE GEO ================= */
watch(propertyType, type => {
  form.value.location.geometry.type = type === 'house' ? 'Point' : 'Polygon'
})
function generateRandomLand() {
  // Iwo, Osun base coordinates
  const baseLng = 4.18 + (Math.random() - 0.5) * 0.02
  const baseLat = 7.63 + (Math.random() - 0.5) * 0.02

  const size = 0.001 + Math.random() * 0.001

  const corners = [
    [baseLng, baseLat],
    [baseLng + size, baseLat],
    [baseLng + size, baseLat + size],
    [baseLng, baseLat + size],
    [baseLng, baseLat]
  ]

  return {
    country: "Nigeria",
    state: "Osun",
    lga: "Iwo",
    city: "Iwo",
    address: "Iwo Test Land (Near Bowen Area)",
    source: "manual",
    geometry: {
      type: "Polygon",
      coordinates: [corners]
    }
  }
}

function onCategoryChange() {
  const selected = formSelection.value

  if (!selected) return

  // prevent loop safety
  if (form.value.type === selected.type && form.value.purpose === selected.purpose) {
    return
  }

  form.value.purpose = selected.purpose
  form.value.type = selected.type

  const isHouse = selected.type === 'house'

  form.value.landDetails = {
    unit: "plot",
    size: null,
    quantity: 1,
    totalSqm: null
  }

  form.value.houseDetails = null
  form.value.features = []
  form.value.category = ''

  form.value.location = {
    country: "Nigeria",
    state: "",
    lga: "",
    city: "",
    address: "",
    source: "gps",
    geometry: {
      type: isHouse ? "Point" : "Polygon",
      coordinates: []
    }
  }

  form.value.pricing = {
    price: null,
    currency: "NGN",
    negotiable: false,
    paymentType: "outright",
    rent: {
      duration: { value: null, unit: null }
    },
    installment: {
      months: null,
      monthlyAmount: null
    }
  }
}
/* ================= SECTION COMPLETION ================= */
function isCompleted(section) {
  if (section === 'location') {
    const loc = form.value.location
    return loc.state && loc.city && loc.address
  }
  if (section === 'features') return form.value.features.length >= 3
  if (section === 'others') {
    if (propertyType.value === 'land') return form.value.landDetails.size
    if (propertyType.value === 'house') return form.value.houseDetails
  }
  return false
}

/* ================= DEEP MERGE HELPER ================= */
function mergeForm(property) {
  if (!property) return
  
  
  form.value.title = property.title ?? form.value.title
  form.value.description = property.description ?? form.value.description
  form.value.category = property.category ?? 'category'
  form.value.type = property.type ?? form.value.type
  form.value.purpose = property.purpose ?? form.value.purpose

  form.value.pricing = { ...form.value.pricing, ...(property.pricing || {}) }
  form.value.location = { ...form.value.location, ...(property.location || {}) }
  form.value.location.geometry = { ...(property.location?.geometry || form.value.location.geometry) }
  form.value.landDetails = { ...form.value.landDetails, ...(property.landDetails || {}) }
  form.value.houseDetails = property.houseDetails ?? form.value.houseDetails
  form.value.media = { ...form.value.media, ...(property.media || {}) }
  form.value.documents = { ...form.value.documents, ...(property.documents || {}) }
  form.value.contact = { ...form.value.contact, ...(property.contact || {}) }
  form.value.ownership ={ ...form.value.ownership, ...(property.ownership || {}) }
  form.value.features = Array.isArray(property.features) ? [...property.features] : form.value.features

  form.value.id = property._id ?? form.value.id
 
  if (property.purpose && property.type) {
    formSelection.value = { purpose: property.purpose, type: property.type }
  }

  form.value.location = generateRandomLand()
}

function generateTitle(data){
    if(data.type === 'land'){
    return `${data.landDetails.quantity} ${data.landDetails.unit} OF LAND FOR SALE AT ${data.location.city} ${data.location.state}`.toUpperCase()
    }

    if(data.category === 'office_space'){
    return `${data.landDetails.size} SQM OFFICE SPACE IN ${data.location.city} ${data.location.state}`.toUpperCase()
    }
  const bedroom = form.value.features.find(
  item => item.key === 'bedroom'
  )?.value
    return `${bedroom || 0} BEDROOM ${data.category} AT ${data.location.city} ${data.location.state}`.toUpperCase()

}

/* ================= NAVIGATION ================= */
const next = async () => {
  loginloading.value = true
  if (step.value === 1 || step.value === 2) {
  if (step.value === 1) {
    if(!form.value.purpose){
       $toast.error("Please select purpose.")
       loginloading.value = false
       return
    }else if(!form.value.category ){
        $toast.error("Please select Category.")
        loginloading.value = false
        return
    }else if ( !form.value.location.state || !form.value.location.city ){
       $toast.error("Please  select location using your location or enter manual .")
       loginloading.value = false
       return
    }else if(!form.value.features < 2  ){
      if (type == 'House') {
        $toast.error("Please  select bed and other furture in in house( bedroom )")
      }
      if (type == 'Land') {
        $toast.error("Please  select  atleast 3")
      }
    } else if (!form.value.pricing.price){
       $toast.error("Please select add price to your property.")
       loginloading.value = false
       return
    } 

  }
    
    try { 

      form.value.title = generateTitle(form.value)
      console.log(form.value);
       
      // if(!form.value.tittle){
      //   form.value.tit  generateTitle
      // }
      const response = await useApiFetch(`/property/${form.value.id || null}`, {
        method: 'POST',
        body: {details: form.value}
      })
      console.log(response);
      
      const property = response.data?.data || response.data
      mergeForm(property)

      if (property?._id) {
        router.replace({ query: { ...route.query, id: property._id } })
      }
      if (property?._id) {
        router.replace({
          query: {
            ...route.query,
            id: property._id,
            step: step.value + 1
          }
        })
      }
      $toast.success("Saved successfully")
      loginloading.value = false
    } catch (err) {
      console.error(err)
      $toast.error(err?.message || "Something went wrong")
      loginloading.value = false
      return
    }
  }
   if (step.value === 7  ) {
   loginloading.value = true
    try {
    const res = await useApiFetch(`/property/${form.value.id || null}`, { method: 'GET' })
    const data = res.data?.data || res.data
    const imageCount = data.media.files?.filter(f => f.type === 'image').length || 0
    if (imageCount < 6) {
       $toast.error("Please upload at least 6 images.")
        return
      }

       router.push({
       path: '/property',
        query: {
         id: form.value.id,
         preview: true,
         },
       })
     loginloading.value = true
  } catch (err) {
    console.error(err)
  }
  }

  if (step.value < 5) step.value++
}

const back = () => { if (step.value > 1) {
   router.replace({
          query: {
            ...route.query,
    
            step: step.value - 1
          }
        })
  step.value--
   }}
const submit =  async() => { 
   loginloading.value = true
    try {
    const res = await useApiFetch(`/property/${form.value.id || null}`, { method: 'GET' })
    const data = res.data?.data || res.data
    console.log(data.ownership.verifiedOwner);
    
    if (data.ownership.verifiedOwner === false) {
       $toast.error("Please upload at least 6 images.")
        loginloading.value = true
        return
      }

       router.push({
       path: '/property',
        query: {
         id: form.value.id,
         preview: true,
         },
       })
     loginloading.value = true
  } catch (err) {
    console.error(err)
  }
 
  
   }


/* ================= LOAD EXISTING FORM ================= */
const propertyId = computed(() => route.query.id)


const { data, pending, error, refresh } = await useAsyncData(
  'property-edit',
  async () => {
    if (!propertyId.value) return null

    return await useApiFetch(`/property/${propertyId.value}`, {
      method: 'GET'
    })
  }
)
// const loadingdata = async () => {
//   const propertyId = route.query?.id

//   if (!propertyId) {
//     loading.value = false
//     return
//   }

//   try {
//     const response = await useApiFetch(`/property/${propertyId}`, {
//       method: 'GET'
//     })

//     const property = response.data?.data || response.data
//     mergeForm(property)

//   } catch (err) {
//     console.error(err)
//     error.value = err?.message || "Failed to load property"
//   } finally {
//     loading.value = false
//   }
// }

watchEffect(() => {
  if (data.value?.data) {
    mergeForm(data.value.data)
  }
})

//  await loadingdata()

 const generateAI = async () => {
  try {
    loadingAigenerate.value = true 
    const reform = form.value
    reform.description = ''
   
    const res = await $fetch('/api/ai/property-generate', {
      method: 'POST',
      body: {form: reform}
      
    })
  console.log(res);

     reform.description = res.data
    form.value.description = res.data
    console.log(form.value, 'form');
    console.log(reform, 'reform');
    
   loadingAigenerate.value = false 
  } catch (err) {
    console.log(err,'');
     loadingAigenerate.value = false 
    console.error(err)
  }
}
// onMounted(async () => {
//   const propertyId = route.query?.id
  
//   if (!propertyId) return
//   try {
//     const response = await useApiFetch(`/property/${propertyId}`, { method: 'GET' })
//     const property = response.data?.data || response.data
//     mergeForm(property)
//   } catch (err) {
//     console.error(err)
//     $toast.error(err?.message || "Failed to load property")
//   }
// })
</script>

<style scoped>
.input{
  @apply w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black;
}
.section-title{
  @apply text-lg font-semibold;
}
.btn-primary{
  @apply bg-black text-white px-6 py-2 rounded-lg;
}
.btn-secondary{
  @apply border px-6 py-2 rounded-lg;
}
.tab{
  @apply p-3 cursor-pointer font-medium flex justify-between;
}
.tab.active{
  @apply border-blue-500 border bg-blue-50;
}
</style> 