<template>
  <div class="min-h-screen py-10 px-4">
    
    
    <Container>
    
   
    <button v-if="step > 1"  @click="back" class="btn-secondary">Back</button>
      <!-- ================= STEP 1 ================= -->
      <div v-if="step === 1" class="max-w-4xl list-disc mx-auto space-y-4">
        <div class="bg-white p-5 rounded shadow space-y-6">

          <!-- PROPERTY TITLE -->
          <div class="flex gap-5">
            <div class="w-1/3">
              <h2 class="section-title">Property Title</h2>
              <p class="text-gray-500 text-sm">Add a clear title for your property</p>
            </div>
            <div class="w-2/3">
              <textarea
                v-model="form.title"
                placeholder="Example: 2 Plots of Land in Lekki"
                class="input h-16 font-semibold text-2xl"
              />
            </div>
          </div>

          <!-- PURPOSE & TYPE -->
          <div class="flex gap-5">
            <div class="flex-1">
              <h2 class="section-title">Purpose</h2>
              <select @change="onCategoryChange" v-model="formSelection" class="input">
                <option disabled value="">Select Purpose</option>
                <option
                  v-for="item in purposeOptions"
                  :key="item.label"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>

            <div class="flex-1">
              <h2 class="section-title">Category</h2>
              <select v-model="form.category" class="input">
                <option disabled value="">Select Type</option>
                <option
                  v-for="item in options"
                  :key="item.key"
                  :value="item.key"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- LOCATION / FEATURES / OTHERS -->
          <div class="mt-10 border rounded p-4">

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
                <div v-if="form.location.source === 'gps'">

                  <div v-if="propertyType === 'land'">
                    <ListLandMap v-model="form" />
                  </div>

                  <div v-if="propertyType === 'house'">
                    <ListHouseLocationPicker v-model="form" />
                  </div>

                </div>

                <!-- ================= MANUAL ================= -->
                <div v-if="form.location.source === 'manual'">
                  <ListStateLGASelector v-model="form.location" />
                </div>

              </div>
              </div>

              <!-- FEATURES -->
              <div v-if="activeSection === 'features'">
                <ListFeature :type="propertyType" v-model="form.features" />
              </div>

              <!-- OTHERS -->
              <div v-if="activeSection === 'others'">
                <!-- Header -->
                

              

                <!-- Other Sections -->
                <div class="mt-8">
                  <div v-if="propertyType === 'land'">
                    <ListLandother v-model="form" />
                  </div>

                  <div v-if="propertyType === 'house'">
                    <ListHouseother v-model="form" :purpose="form.purpose" />
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
      <div v-if="step === 2">
        <ListDescription v-model="form.description" />
      </div>

      <!-- ================= STEP 3 ================= -->
      <div v-if="step === 3">

        <ListUpload     :purpose="form.purpose" />
         <!-- <ListUploadhouse v-model="form" /> -->
      </div>

      <!-- ================= STEP 4 ================= -->
      <div v-if="step === 4">
        <!-- <Webcan></Webcan> -->
        <ListOwnershipSelector v-model="ownershipType"
    @update:agentName="agentName = $event"></ListOwnershipSelector>
      </div>

      <!-- ================= STEP 5 ================= -->
      

      <!-- ================= NAVIGATION ================= -->
      <div class="flex justify-between mt-8">
        <button v-if="step > 1"  @click="back" class="btn-secondary">Back</button>
        <button v-if="step < 4" :disabled="loginloading" @click="next" class="btn-primary ml-auto"> {{ loginloading ? 'Uploading...' : 'Next' }}</button>
        <button v-if="step === 4" :disabled="loginloading" @click="submit" class="btn-primary ml-auto"> {{ loginloading ? 'Uploading...' : 'Next' }}</button>
      </div>
    </Container>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const ownershipType = ref('')
const agentName = ref('')
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

function onCategoryChange(e) {
  const value = e.target.value
  console.log('Selected:', value)
    form.value.landDetails = { unit: "plot", size: null, quantity: 1, totalSqm: null }
  form.value.houseDetails = null
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

/* ================= DEEP MERGE HELPER ================= */
function mergeForm(property) {
  if (!property) return
  console.log(property.category);
  
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

  form.value.features = Array.isArray(property.features) ? [...property.features] : form.value.features

  form.value.id = property._id ?? form.value.id

  if (property.purpose && property.type) {
    formSelection.value = { purpose: property.purpose, type: property.type }
  }

  form.value.location = generateRandomLand()
}

/* ================= NAVIGATION ================= */
const next = async () => {
  if (step.value === 1 || step.value === 2) {
    loginloading.value = true
    try { 
      console.log(form.value);
      
      const response = await useApiFetch(`/property/${form.value.id || null}`, {
        method: 'POST',
        body: {details: form.value}
      })
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


/* ================= LOAD EXISTING FORM ================= */
onMounted(async () => {
  const propertyId = route.query?.id
  
  if (!propertyId) return
  try {
    const response = await useApiFetch(`/property/${propertyId}`, { method: 'GET' })
    const property = response.data?.data || response.data
    mergeForm(property)
  } catch (err) {
    console.error(err)
    $toast.error(err?.message || "Failed to load property")
  }
})
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