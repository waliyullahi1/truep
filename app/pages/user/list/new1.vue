<script setup>
import { ref, onMounted } from 'vue'
import loadstates from '@/data/nigeria-states.js'
import Feature from '~/components/List/Feature.vue'

definePageMeta({
  layout: 'auth'
})

/* ======================
   STATE
====================== */
const step = ref(1)

const activeSection = ref('location')
const form = ref({

  description: '',
  title: '',
  type: "land",         
  purpose: "sell",     
  pricing: {
    price: 5000000,
    currency: "NGN",

    rentDuration: null,      // "monthly" | "yearly" (only for rent)
    installment: false,

    installmentPlan: null
    // example:
    // {
    //   months: 12,
    //   monthlyAmount: 500000
    // }
  },
  /* ================= LOCATION ================= */
  location: {
    country: "",
    state: "",
    lga: "",
    city: "",
    address: "",

    source: "gps", // "gps" | "manual"

    // ⭐ GEOJSON (important)
    geometry: {
      type: "Polygon",   // "Point" for house | "Polygon" for land
      coordinates: []
    }
  },
  landDetails: {
    size: 600,
    unit: "sqm",
    fenced: true,
    dry: true,
    roadAccess: true
  },
  houseDetails: null,
  media: {
    images: [],
    video: null
  },
  documents: {
    surveyPlan: null,
    titleDocument: null
  },
  features:[
   
    
    
  ],
  /* ================= CONTACT ================= */
  contact: {
    name: "",
    phone: "",
    whatsapp: ""
  },


  createdAt: new Date(),
  updatedAt: new Date()
})
const type = ref('')
/* ======================
   LOCATION DATA
====================== */

const loadingStates = ref(false)
const loadingLgas = ref(false)




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

/* ======================
   STEP NAVIGATION
====================== */
const next = () => { if (step.value < 5) step.value++ }
const back = () => { if (step.value > 1) step.value-- }

/* ======================
   IMAGE / FILE UPLOAD
====================== */


/* ======================
   COMPLETION CHECKS
====================== */
function isCompleted(section) {
  if (section === 'location'){
    
    
    return form.value.location.address && form.value.location.state  && form.value.location.lga  && form.value.location.city && form.value.location.address
    }
 if (section === 'features') {
  const count = Object.keys(form.value.features || {}).length

  console.log(count > 2)

  return count > 2
}
  if (section === 'size')
    return form.value.size && form.value.price

  return false
}

const options = computed(() => {
  if (form.value.purpose === 'Sell Land'){
    type.value= 'land'
   return landType 
  } 
  if (form.value.purpose === 'Sell House') {
    type.value= 'house'
   return houseType 
  } 
  if (form.value.purpose === 'Rent House') {
    type.value= 'house'
   return houseType 
  } 
})
/* ======================
   SUBMIT
====================== */
function submit() {
  console.log('Form Data:', form.value)
  alert('Land submitted successfully ✅')
}

//  
const firstcanSubmit = computed(() => {
  return (
    form.value.description.trim().length > 0 &&
    form.value.purpose.trim().length > 0
  )
})
</script>

<template>
<div class="min-h-screen py-10 px-4">
  <Container>
   <button
      :disabled="!firstcanSubmit"
      @click="submitForm"
    >
      Submit
    </button>
    <!-- STEP 1: Land Details -->
    <div v-if="step === 1" class="max-w-4xl mx-auto space-y-4">
      <div class="bg-white gap-2 p-5 rounded shadow">
        <div class="flex gap-5">
          <div class="w-1/3">
            <h2 class="section-title">Land Title</h2>
            <p class="text-gray-500 text-sm mb-3">
              A clear, concise title attracts more buyers. Include size, location, and key features.
            </p>
          </div>
          <div class="w-2/3">
            <textarea v-model="form.title" placeholder="Land Title (e.g. 2 Acres in Lekki)" class="input w-full h-20" />
          </div>
        </div>

        <div class=" flex gap-5 w-full">
          <div class=" flex-1">
          <h2 class="section-title mt-4">Purpose</h2>
          <p class="text-gray-500 text-sm mb-3">Select the purpose of your listing.</p>
          <select v-model="form.purpose" class="input w-full">
            <option>Sell Land</option>
            <option>Sell House</option>
            <option>Rent House</option>
          </select>
        </div>

        <div class=" flex-1 ">
          <h2 class="section-title mt-4">Type</h2>
          <p class="text-gray-500 text-sm mb-3">Select the type of your listing.</p>
          <select v-model="form.type" class="input w-full">
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
        

        <!-- Location -->
        <div class=" mt-20  w-full p-2 min-h-96 border  gap-2">

          
           <div class=" flex  overflow-hidden rounded-md bg-slate-50 border   h-fit  space-y- shadow-sm">

            <div
              @click="activeSection='location'"
              class="tab flex-1"
              :class="{ active: activeSection==='location' }"
            >
              Location
              <span v-if="isCompleted('location')">✅</span>
            </div>

              

            <div
              @click="activeSection='features'"
              class="tab flex-1"
              :class="{ active: activeSection==='features' }"
            >
              Features
              <span v-if="isCompleted('features')">✅</span>
            </div>

            <div
              @click="activeSection='others'"
              class="tab flex-1"
              :class="{ active: activeSection==='others' }"
            >
              Others
              <span v-if="isCompleted('others')">✅</span>
            </div>

          </div>
          <div class="w-full mt-7 h-full">
            <div :class="activeSection==='location'? 'block':'hidden'">
               <div v-if="type===''" class=" bg-gray-50 border rounded-xl p-8 text-center text-gray-500"  >
                 <p class="text-lg font-medium">No property selected</p>
                <p class="text-sm mt-1">Please select a listing purpose and property type to continue.</p>
             
              </div> 
              <div v-if="type==='land'" >
               {{ form.location }}
                <ListLandMap v-model="form" />
              </div> 


               <div v-if="type==='house'" >
                
                <ListHouseLocationPicker/>
              </div> 
               
                <!-- <ListStateLGASelector v-model:selectedState="form.state"  v-model:selectedLGA="form.city"/> -->
            </div>
             <div  :class="activeSection==='features'? 'block':'hidden'" >
                 {{ form.location }}<ListFeature :type="type"  v-model="form.features" />
                {{ form.features }}
                 {{ isCompleted('features')  }}
            </div>
           
             <div  :class="activeSection==='others'? 'block':'hidden'" >
               {{ form.location }}
              <div v-if="type==='land'">
                 <ListLandother></ListLandother>
              </div>
              <div v-if="type==='house'">
                 <ListHouseother  :purpose="form.purpose.split(' ')[0]"></ListHouseother>
              </div>
              
                
            </div>
           
           
          </div>
            
        </div>
      </div>
    </div>

    <!-- STEP 2: Upload Images & Documents -->
    <div v-if="step === 2" class="space-y-10">
       
                <ListDescription v-model="form.description" />
          
      
    </div>

    <!-- STEP 3: Land Features -->
    <div v-if="step === 3" class="space-y-4">
      
      <ListUpload v-model="form"/>
    </div>

    <!-- STEP 4: Contact Info -->
    <div v-if="step === 4" class="space-y-4">
      <h2 class="section-title">Contact Info</h2>
      <input v-model="form.phone" placeholder="Phone Number" class="input"/>
      <input v-model="form.whatsapp" placeholder="WhatsApp Number" class="input"/>
    </div>

    <!-- STEP 5: Review & Submit -->
    <div v-if="step === 5" class="space-y-4 text-center">
      <h2 class="section-title">Review & Submit</h2>
      <p class="text-gray-500">Click submit to finish.</p>
    </div>

    <!-- STEP NAVIGATION -->
    <div class="flex justify-between mt-8">
      <button v-if="step > 1" @click="back" class="btn-secondary">Back</button>
      <button v-if="step < 5" @click="next" class="btn-primary ml-auto">Next</button>
      <button v-if="step === 5" @click="submit" class="btn-primary ml-auto">Submit</button>
    </div>
  </Container>
</div>
</template>

<style scoped>
.input { @apply w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black; }
.section-title { @apply text-lg font-semibold; }
.btn-primary { @apply bg-black text-white px-6 py-2 rounded-lg; }
.btn-secondary { @apply border px-6 py-2 rounded-lg; }
.checkpoint { @apply w-4 h-4 border-2 border-gray-400 rounded flex items-center justify-center transition; }
.checkpoint-row.active .checkpoint { @apply bg-black border-black; }
.tab {
  @apply p-3 cursor-pointer font-medium flex justify-between  ;
}

.tab.active {
  @apply border  bg-slate-300  ;
}
</style>