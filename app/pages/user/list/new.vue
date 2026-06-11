<template>
<div>
  <div class="min-h-screen py-10 px-0 md:px-4">
    
   <div v-if="error">
  <NetworkError
  :error="error"
  @retry="refreshData"
/>
   </div>

    <!-- ================= PAGE SKELETON ================= -->
    <div
     v-else-if="pending"
      class="min-h-screen py-10 px-4 animate-pulse"
    >
      <Container>

        <!-- STEP PROGRESS -->
        <div class="mb-12 max-w-4xl mx-auto">
          <div class="flex items-center justify-between">
            <div
              v-for="i in 4"
              :key="i"
              class="h-4 w-24 bg-gray-200 rounded"
            ></div>
          </div>

          <div class="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full w-1/3 bg-gray-300"></div>
          </div>
        </div>

        <!-- MAIN CARD -->
        <div class="max-w-4xl mx-auto bg-white md:p-6 p-2 rounded-xl border shadow-sm space-y-8">

          <!-- HEADER -->
          <div class="text-center space-y-3">
            <div class="h-8 w-72 bg-gray-300 rounded mx-auto"></div>
            <div class="h-4 w-full max-w-xl bg-gray-200 rounded mx-auto"></div>
            <div class="h-4 w-3/4 bg-gray-200 rounded mx-auto"></div>
          </div>

          <!-- PURPOSE + CATEGORY -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div class="space-y-3">
              <div class="h-5 w-24 bg-gray-300 rounded"></div>
              <div class="h-12 bg-gray-200 rounded-lg"></div>
            </div>

            <div class="space-y-3">
              <div class="h-5 w-24 bg-gray-300 rounded"></div>
              <div class="h-12 bg-gray-200 rounded-lg"></div>
            </div>

          </div>

          <!-- TABS -->
          <div class="md:space-y-6 space-x-2">

            <div class="flex gap-3">
              <div
                v-for="i in 3"
                :key="i"
                class="h-12 flex-1 bg-gray-200 rounded"
              ></div>
            </div>

            <!-- LOCATION CARD -->
            <div class="border rounded-xl md:p-5 p-0 space-y-5">

              <!-- BUTTONS -->
              <div class="flex gap-3">
                <div class="h-10 w-28 bg-gray-300 rounded"></div>
                <div class="h-10 w-36 bg-gray-200 rounded"></div>
              </div>

              <!-- MAP -->
              <div class="h-[350px] bg-gray-200 rounded-xl"></div>

              <!-- INPUTS -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div
                  v-for="i in 4"
                  :key="i"
                  class="space-y-2"
                >
                  <div class="h-4 w-24 bg-gray-300 rounded"></div>
                  <div class="h-11 bg-gray-200 rounded-lg"></div>
                </div>

              </div>

            </div>

          </div>

          <!-- FEATURES -->
          <div class="space-y-4">

            <div class="h-6 w-40 bg-gray-300 rounded"></div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="i in 6"
                :key="i"
                class="h-16 bg-gray-200 rounded-xl"
              ></div>
            </div>

          </div>

          <!-- DESCRIPTION -->
          <div class="space-y-4">

            <div class="flex justify-between items-center">
              <div class="h-6 w-40 bg-gray-300 rounded"></div>
              <div class="h-10 w-40 bg-gray-200 rounded-lg"></div>
            </div>

            <div class="h-40 bg-gray-200 rounded-xl"></div>

          </div>

          <!-- MEDIA -->
          <div class="space-y-4">

            <div class="h-6 w-32 bg-gray-300 rounded"></div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                v-for="i in 8"
                :key="i"
                class="aspect-square bg-gray-200 rounded-xl"
              ></div>
            </div>

          </div>

          <!-- FOOTER BUTTONS -->
          <div class="flex justify-between pt-4">

            <div class="h-11 w-28 bg-gray-200 rounded-lg"></div>

            <div class="h-11 w-36 bg-gray-300 rounded-lg"></div>

          </div>

        </div>

      </Container>
    </div>

  <Container v-else>

      <!-- ✅ STEP PROGRESS -->
    <div class="mb-12  max-w-4xl mx-auto ">
      <div class="flex  items-center justify-between text-sm font-medium">
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
    
   
    <button v-if="step > 1"  @click="back" class="btn-secondary">Back</button>
      <!-- ================= STEP 1 ================= -->
      <div v-if="step === 1" class="md:max-w-4xl w-full list-disc mx-auto space-y-4">
        <div class="bg-white sm:p-5 p-1 rounded  space-y-6">
          <div class="text-center space-y-2 mb-8">
            <h1 class="text-2xl font-bold">Basic Property Information</h1>
            <p class="text-gray-500 text-sm max-w-xl mx-auto">
              Select the property purpose, category, location, features, and other key details.
              This information will be used to automatically generate your title and description.
            </p>
          </div>

          <!-- PURPOSE & TYPE -->
          <div class="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-4 md:p-8 shadow-sm">
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
          <div class="mt-10 border rounded p-1 sm:p-4">

            <!-- TABS -->
            <div class="flex bg-gray-50 rounded overflow-hidden">
              <div
                class="tab flex-1"
                :class="{ active: activeSection === 'location' }"
                @click="activeSection = 'location'"
              >
                Location
                <span v-if="isCompleted('location')">✅</span>
              </div>
              <div
                class="tab flex-1"
                :class="{ active: activeSection === 'features' }"
                @click="activeSection = 'features'"
              >
                Features
                <span v-if="isCompleted('features')">✅</span>
              </div>
              <div
                class="tab flex-1"
                :class="{ active: activeSection === 'others' }"
                @click="activeSection = 'others'"
              >
                Others
                <span v-if="isCompleted('others')">✅</span>
              </div>
            </div>

            <div class="mt-6">
              <!-- LOCATION -->
              <div v-if="activeSection === 'location'">
                <div
                  v-if="propertyType === ''"
                  class="bg-gray-50 border rounded p-6 text-center"
                >
                  Select purpose first
                </div>
                <div v-if="propertyType">

                <!-- 🔥 SWITCH BUTTONS -->
                <div class="flex gap-2 mb-4">
                  <button
                    @click="setSource('gps')"
                    :class="[
                      'px-4 py-2 text-sm rounded',
                      form.location.source === 'gps'
                        ? 'bg-slate-800 text-white'
                        : 'bg-gray-200'
                    ]"
                  >
                    Use Map
                  </button>

                  <button
                    @click="setSource('manual')"
                    :class="[
                      'px-4 py-2 text-sm rounded',
                      form.location.source === 'manual'
                        ? 'bg-slate-800 text-white'
                        : 'bg-gray-200'
                    ]"
                  >
                    Enter Manually
                  </button>
                </div>

                <!-- ================= MAP ================= -->
                <!-- <div v-if="form.location.source === 'gps'">

                  <div v-if="propertyType === 'land'">
                    <ListLandMap v-model="form" />
                  </div>

                  <div v-if="propertyType === 'house' || propertyType === 'hostel' ">
                    <ListHouseLocationPicker v-model="form" />
                  </div>

                </div> -->

                <!-- ================= MANUAL ================= -->
                <div v-if="form.location.source === 'manual'">
                  <ListStateLGASelector v-model="form.location" />
                </div>

                <div  v-if="propertyType === 'hostel'">
                   <ListHostelForm  :state="form.location.state"   v-model="form.hostelDetails" /> 
                </div>
                   
                 

              </div>
              </div>

              <!-- FEATURES -->
              <div id="features-section" v-if="activeSection === 'features'">
                <ListFeature
                  :type="propertyType"
                  v-model:house="form.houseDetails"
                  v-model:features="form.features"
                />
              </div>

              <!-- OTHERS -->
              <div id="others-section" v-if="activeSection === 'others'">
                <!-- Header -->
                

              

                <!-- Other Sections -->
                <div class="mt-8">
                  <div v-if="propertyType === 'land'">
                    <ListLandother v-model="form" />
                  </div>

                  <div v-if="propertyType === 'house' || propertyType === 'hostel'">
                    <ListHouseother v-model="form" :purpose="form.purpose" :type="form.type" />
                  </div>
                  <div class="mb-6 mt-5 text">
                    <h2 class="text-lg font-semibold">Select Payment Type <span>(Optional)</span></h2>
                    <p class="text-gray-500 text-sm">Choose how this property will be paid for</p>
                  </div>
                    <ListPaymentType v-model="form.pricing" :purpose="form.purpose" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= STEP 2 ================= -->
      <div v-if="step === 2" class="max-w-5xl mx-auto space-y-8">

        <!-- HEADER -->
        <div class="text-center space-y-1">
          <h1 class="text-2xl font-bold">Property Details</h1>
          <p class="text-gray-500 text-sm">
            Review and refine your listing title and description
          </p>
        </div>

        <!-- ================= TITLE CARD ================= -->
        <div class="bg-white border rounded-xl sm:p-6 p-2 shadow-sm space-y-4">

          <!-- TITLE HEADER -->
          <div class="flex justify-between items-start">

            <div>
              <h2 class="text-lg font-semibold">Property Title</h2>
              <p class="text-xs text-gray-500">
                Auto-generated from property details
              </p>
            </div>

            <!-- EDIT BUTTON -->
            <button
              @click="EditTittle"
              class="text-sm px-3 py-1 border rounded-lg hover:bg-gray-50"
            >
              {{ editTitle ? 'Lock' : 'Edit' }}
            </button>

          </div>

          <!-- TITLE DISPLAY -->
          <div v-if="!editTitle" class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-xl font-bold uppercase tracking-wide">
              {{ form.title || 'No title generated yet' }}
            </h3>
          </div>

          <!-- TITLE EDIT -->
          <textarea
            v-else
            v-model="form.title"
            class="input text-xl font-semibold h-24"
            placeholder="Enter property title..."
          />

        </div>

        <!-- ================= DESCRIPTION CARD ================= -->
        <div class="bg-white border rounded-xl sm:p-6 p-0 shadow-sm space-y-4">

          <!-- DESCRIPTION HEADER -->
          <div class="sm:flex  block justify-between items-start">

            <div>
              <h2 class="text-lg font-semibold">Description</h2>
              <p class="text-xs text-gray-500">
                Write or generate a compelling property description
              </p>
            </div>

            <!-- AI BUTTON -->
            <button
              @click="generateAI"
              :disabled="loadingAigenerate"
              class="flex sm:text-xl text-xs items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-4 py-2 rounded-lg shadow hover:scale-[1.02] transition disabled:opacity-50"
            >
              <!-- ICON -->
              <svg v-if="!loadingAigenerate" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>

              <!-- LOADING -->
              <svg v-else class="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10"
                  stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>

              {{ loadingAigenerate ? 'Generating...' : 'Generate AI Description' }}
            </button>

          </div>

          <!-- DESCRIPTION INPUT -->
          <ListDescription v-model="form.description" />

          <!-- AI TIP -->
          <p class="text-xs text-gray-400">
            AI uses your property type, location, and features to generate professional real estate descriptions.
          </p>

        </div>

      </div>

      <!-- ================= STEP 3 ================= -->
      <div v-if="step === 3">

        <ListUpload     :purpose="form.purpose" />
          <!-- <ListUploadhouse v-model="form" /> -->
      </div>

      <!-- ================= STEP 4 ================= -->
      <div v-if="step === 4">
        <!-- <Webcan></Webcan> --> 
              <ListOwnershipSelector v-model:ownlistingType="form.ownership.listingType"  v-model:verified="verified"/> 
      </div>

      <!-- ================= STEP 5 ================= -->
      

      <!-- ================= NAVIGATION ================= -->
      <div class="flex justify-between mt-8">
        <button v-if="step > 1"  @click="back" class="btn-secondary">Back</button>
        <button v-if="step < 4" :disabled="submitloading" @click="next" class="btn-primary ml-auto"> {{ submitloading ? 'Uploading...' : 'Next' }}</button>
        <button v-if="step === 4" :disabled="submitloading" @click="submit" class="btn-primary ml-auto"> {{ submitloading ? 'Uploading...' : 'Submit' }}</button>
      </div>
    </Container>
  </div>
 
</div>
</template>

<script setup>
import { Form } from 'lucide-vue-next'
import { ref, computed, watch, nextTick,  onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const ownershipType = ref('')
const agentName = ref('')
const router = useRouter()
const route = useRoute()
const hasError = computed(() => !!error.value)
const { $toast } = useNuxtApp()
// definePageMeta({
//   layout: 'auth',
//   access: 'seller',
//    isPrivateRoute : true
// })
 const verified = ref(false)
/* ================= STEP CONTROL ================= */
const step = ref(Number(route.query.step) || 1)
const activeSection = ref('location')
const loadingAigenerate = ref(false)
const editTitle = ref(false)
const istittleEdite = ref(false)
const storeprevioustitle = ref('')
const submitloading = ref(false)
const originalForm = ref(null)
 const propertyId = route.query?.id

/* ================= FORM DATA ================= */
const form = ref({
  id: null,
  title: '',
  description: '',
  category: '',
  type: '',
  slug: '',
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
  listingType:'owner',
  ownerId: '',
  agentId: '',

},
   

  location: {
    
    country: "Nigeria",
    state: "",
    lga: "",
    city: "",
    address: "",
    source: "manual",
    geometry: { type: "Polygon", coordinates: [] }
  },

  landDetails: { unit: "plot", size: null, quantity: 1, totalSqm: null,  },
  houseDetails: {},
   hostelDetails: {
   school: null,
    gender: 'Mixed',
    name: ''
 },
  media: { images: [], video: null },
  documents: { surveyPlan: null, titleDocument: null },
  features: [],

})
/* ================= PURPOSE OPTIONS ================= */
const purposeOptions = [
  { label: 'Sell Land', value: { purpose: 'sale', type: 'land' } },
  { label: 'Sell House', value: { purpose: 'sale', type: 'house' } },
  { label: 'Rent House', value: { purpose: 'rent', type: 'house' } },
  { label: 'Rent Hostel', value: { purpose: 'rent', type: 'hostel' } },
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
  { key: 'single_room', label: 'Single Room' },
  { key: 'mini_flat', label: 'Mini Flat' },
  { key: 'room_and_parlour', label: 'Room and Parlour' },
  { key: 'studio_apartment', label: 'Studio Apartment' },

  { key: 'flat', label: 'Flat' },
  { key: 'apartment', label: 'Apartment' },
  { key: 'penthouse', label: 'Penthouse' },
  { key: 'duplex', label: 'Duplex' },
  { key: 'terrace_duplex', label: 'Terrace Duplex' },
  { key: 'semi_detached_duplex', label: 'Semi Detached Duplex' },
  { key: 'detached_duplex', label: 'Detached Duplex' },

  { key: 'bungalow', label: 'Bungalow' },
  { key: 'detached_bungalow', label: 'Detached Bungalow' },
  { key: 'semi_detached_bungalow', label: 'Semi Detached Bungalow' },

  { key: 'mansion', label: 'Mansion' },
  { key: 'villa', label: 'Villa' },
  { key: 'townhouse', label: 'Townhouse' },
  { key: 'cottage', label: 'Cottage' },

  { key: 'shop', label: 'Shop' },
  { key: 'office_space', label: 'Office Space' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'commercial_property', label: 'Commercial Property' },
  { key: 'plaza', label: 'Plaza' },
  { key: 'hotel', label: 'Hotel' },

]

const landType = [
  { key: 'commercial_land', label: 'Commercial Land' },
  { key: 'residential_land', label: 'Residential Land' },
  { key: 'industrial_land', label: 'Industrial Land' },
  { key: 'mixed_use_land', label: 'Mixed-use Land' },
  { key: 'family_land', label: 'Family Land' },
   { key: 'estate_land', label: 'Estate Land' },
  { key: 'other_land', label: 'Other Land' }
]

const hostelCategory = [

  {key: 'selfcon', label: 'Self Contain'},
  { key: 'single_room',  label: 'Single Room' },
  {  key: 'one_room',  label: 'One Room'},
  {  key: 'one_room_parlour', label: 'One Room & Parlour' },
  { key: 'two_bedroom', label: '2 Bedroom Flat' },
  { key: 'three_bedroom',  label: '3 Bedroom Flat' },
  { key: 'shared_room', label: 'Shared Room' },
  { key: 'bunk_space',  label: 'Bunk Space' },
  {key: 'private_hostel', label: 'Private Hostel'},
  { key: 'school_hostel', label: 'School Hostel'},
  { key: 'apartment_hostel', label: 'Hostel Apartment'},
  { key: 'luxury_hostel', label: 'Luxury Hostel'},
  { key: 'boys_quarters',  label: 'Boys Quarters (BQ)'},
  { key: 'mini_flat', label: 'Mini Flat'},
  { key: 'studio_apartment', label: 'Studio Apartment'},
  
  { key: 'other', label: 'Other' }
]

const options = computed(() => {
  if (propertyType.value === 'land') return landType
  if (propertyType.value === 'house') return houseType
   if (propertyType.value === 'hostel') return hostelCategory
  return []
})

/* ================= WATCH TYPE TO UPDATE GEO ================= */
watch(propertyType, type => {
  form.value.location.geometry.type = type === 'house' ? 'Point' : 'Polygon'
})


const refreshData = async (stopLoading) => {
  await refresh()   // or your API call
  stopLoading()     // tell child to stop loading
}

function onCategoryChange(e) {
  const value = e.target.value
  
    form.value.landDetails = { unit: "plot", size: null, quantity: 1, totalSqm: null }
  form.value.houseDetails = {}
  form.value.features = []
  form.value.location.geometry = val === 'house' ? { type: 'Point', coordinates: [] } : { type: 'Polygon', coordinates: [] }
  form.value.pricing = { price: null, currency: "NGN", rentDuration: null, installment: false, installmentPlan: { months: null, monthlyAmount: null } }
  form.value.location = { country: "", state: "", lga: "", city: "", address: "", source: "gps", geometry: form.value.location.geometry }
  form.value.category = ''
  // // do anything here
  // if (value === 'duplex') {
  //   form.value.houseDetails = { rooms: 5 }
  // }
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

function EditTittle(){
  editTitle.value = !editTitle.value

  
}
/* ================= DEEP MERGE HELPER ================= */
function mergeForm(property) {
  if (!property) return
 
  
  form.value.title = property.title ?? form.value.title
  form.value.slug = property.slug ?? form.value.slug
  form.value.description = property.description ?? form.value.description
  form.value.category = property.category ?? 'category'
  form.value.type = property.type ?? form.value.type
  form.value.purpose = property.purpose ?? form.value.purpose

  form.value.pricing = { ...form.value.pricing, ...(property.pricing || {}) }
  form.value.location = { ...form.value.location, ...(property.location || {}) }
  form.value.location.geometry = { ...(property.location?.geometry || form.value.location.geometry) }
  form.value.landDetails = { ...form.value.landDetails, ...(property.landDetails || {}) }
  form.value.houseDetails = property.houseDetails ?? form.value.houseDetails
  form.value.hostelDetails = property.hostelDetails ?? form.value.hostelDetails
  form.value.media = { ...form.value.media, ...(property.media || {}) }
  form.value.documents = { ...form.value.documents, ...(property.documents || {}) }
  form.value.contact = { ...form.value.contact, ...(property.contact || {}) }

  form.value.features = Array.isArray(property.features) ? [...property.features] : form.value.features
  form.value.ownership  = { ...form.value.ownership, ...(property.ownership || {}) }
  form.value.id = property._id ?? form.value.id

  if (property.purpose && property.type) {
    formSelection.value = { purpose: property.purpose, type: property.type }
  }
   originalForm.value = JSON.parse(JSON.stringify(form.value))
  form.value.location = form.value.location || { country: "", state: "", lga: "", city: "", address: "", source: "gps", geometry: form.value.location.geometry }
}

const safeClone = (obj) => JSON.parse(JSON.stringify(obj))
const generateAI = async () => {
  try {
    loadingAigenerate.value = true

    // ✅ SAFE COPY (VERY IMPORTANT)
    const payload = safeClone(form.value)

    const res = await $fetch('/api/ai/property-generate', {
      method: 'POST',
      body: { form: payload }
    })

    

    // ✅ DO NOT overwrite blindly
    const newDescription = res.data
       form.value.description = newDescription

   
       
    // // If old description exists, append OR replace intelligently
    // if (form.value.description && form.value.description.trim()) {
    //   form.value.description = newDescription
    // } else {
    //   form.value.description = newDescription
    // }

  } catch (err) {
    console.error(err)
  } finally {
    loadingAigenerate.value = false
  }
}
function generateTitle(data) {

  const city =
    data?.location?.city || ''

  const state =
    data?.location?.state || ''

  const category =
    data?.category
      ?.replace(/_/g, ' ')
      ?.toUpperCase() || ''

  /* ---------- LAND ---------- */

  if (data?.type === 'land') {

    return `${data?.landDetails?.quantity || 1}
${data?.landDetails?.unit || 'PLOT'}
OF LAND FOR SALE AT
${city}
${state}`
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase()
  }

  /* ---------- HOSTEL ---------- */

  if (data?.type === 'hostel') {

    const school =
      data?.hostelDetails?.school?.abbreviation
      ||
      data?.hostelDetails?.school?.name
      ||
      ''

    const gender =
      data?.hostelDetails?.gender
      || 'Mixed'

    const hostelName =
      data?.hostelDetails?.name
      || ''

    return `
${hostelName ? hostelName + ' - ' : ''}
${gender}
HOSTEL FOR RENT
${school ? 'NEAR ' + school : ''}
${state}
`
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase()
  }

  /* ---------- OFFICE ---------- */

  if (
    data?.category ===
    'office_space'
  ) {

    return `
${data?.landDetails?.size || 0}
SQM OFFICE SPACE
IN
${city}
${state}
`
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase()
  }

  /* ---------- HOUSE ---------- */

  const bedroom =
    data?.houseDetails?.bedroom || 0

  return `
${bedroom}
BEDROOM
${category}
AT
${city}
${state}
FOR
${data?.purpose || ''}
`
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()
}

// function generateTitle(data){
//   const category = data.category?.replace(/_/g, ' ')|| ''
//     if(data.type === 'land'){
//     return `${data.landDetails.quantity} ${data.landDetails.unit} OF LAND FOR SALE AT ${data.location.city} ${data.location.state}`.toUpperCase()
//     }

//     if(data.category === 'office_space'){
//     return `${data.landDetails.size} SQM OFFICE SPACE IN ${data.location.city} ${data.location.state}`.toUpperCase()
//     }

// const bedroom = form.value.houseDetails?.bedroom 
//     return `${bedroom || 0} BEDROOM ${category} AT ${data.location.city} ${data.location.state} For ${data.purpose}`.toUpperCase()

// }


/* ================= NAVIGATION ================= */
const next = async () => {
  // Prevent double click
  if (submitloading.value) return

  submitloading.value = true

  try {
    /* ================= STEP 1 VALIDATION ================= */
    if (step.value === 1) {

      if (!form.value.purpose) {
        $toast.error("Please select purpose.")
        return
      }

      if (!form.value.category) {
        $toast.error("Please select category.")
        return
      }

      if (
        !form.value.location?.state ||
        !form.value.location?.city
      ) {
        activeSection.value = "location"

        await nextTick()

        $toast.error(
          "Please select location or enter manually."
        )

        return
      }

      const featureCount =
        form.value.features?.filter(Boolean).length || 0

      if (featureCount < 1) {

        activeSection.value = "features"

        await nextTick()

        document
          .getElementById("features-section")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          })

        $toast.error(
          "Please select at least one feature."
        )

        return
      }

      if (
        form.value.type === "house" &&
        featureCount < 2
      ) {
        activeSection.value = "features"

        $toast.error(
          "Please select bedroom and one more feature."
        )

        return
      }

      if (
        form.value.type === "land" &&
        featureCount < 3
      ) {
        activeSection.value = "features"

        $toast.error(
          "Please select at least 3 land features."
        )

        return
      }

      if (!form.value.pricing?.price) {

        activeSection.value = "others"

        await nextTick()

        document
          .getElementById("others-section")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          })

        $toast.error(
          "Please add property price."
        )

        return
      }
    }

    /* ================= AUTO TITLE ================= */

    if (!form.value.title) {
      try {
      form.value.title =  generateTitle(form.value)
       } catch (e) {
       console.log(e)
    } 
    }

    /* ================= SAVE ================= */

    const response = await useApiFetch(
      `/property/${form.value.id || "undefine"}`,
      {
        method: "POST",
        body: {
          details: form.value
        }
      }
    )

    if (!response?.success) {
      throw new Error(
        response?.message ||
        "Save failed"
      )
    }

    const property =
      response.data?.data ||
      response.data

    /* ================= STEP 3 MEDIA ================= */

    if (step.value === 3) {

      const imageCount =
        property?.media?.files
          ?.filter(
            f => f.type === "image"
          )
          .length || 0

      if (imageCount < 3) {

        $toast.error(
          "Upload at least 3 images."
        )

        return
      }
    }

    mergeForm(property)

    /* ================= MOVE STEP ================= */

    if (step.value < 4) {

      step.value++

      await router.replace({
        query: {
          ...route.query,
          id: property._id,
          step: step.value
        }
      })
    }

    $toast.success(
      "Saved successfully"
    )

  } catch (err) {

    console.error(err)

    $toast.error(
      err?.message ||
      "Something went wrong"
    )

  } finally {

    submitloading.value = false

  }
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
  submitloading.value = true
        if (!verified.value) {
          
         $toast.error("Pls Click Verify Identity or Business to before you can procced ")
         submitloading.value = false
         return
      }
  
   submitloading.value = true

   
    try {
    const res = await useApiFetch(`/property/${form.value.id || null}`, { method: 'GET' })
    
    
      if (!res.success) {

        $toast.error("An Error occure")
         submitloading.value = false
         return
      }


       router.push({
       path: `/property/${form.value.slug}`,
        query: {
         preview: true,
         },
       })
     submitloading.value = true
  } catch (err) {
    console.error(err)
  }
 
  
   }


/* ================= LOAD EXISTING FORM ================= */
const { data, pending, error, refresh } = await useAsyncData(
  `property-${route.params.id}`,
  async () => {
    try {
      const propertyId = route.query?.id
      if (!propertyId)  return

      const res = await useApiFetch(`/property/${propertyId}`)

      if (!res.success) {
        throw new Error(res.message || 'Failed')
      }
       const safe = res?.data?.data || res?.data || null
       mergeForm(safe)
      // return res.data?.data || null
    } catch (err) {
      throw err
    }
  },
  { lazy: true, server: true }
)

watch(
  () => form.value.purpose,
  (purpose) => {
    if (purpose === "rent") {
      form.value.pricing.paymentType = "rent"
    }
  },
  { immediate: true }
)
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