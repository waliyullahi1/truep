<script setup>
import { ref, computed, watch } from 'vue'

definePageMeta({
  layout: 'auth'
})

/* ======================
STEP CONTROL
====================== */

const step = ref(1)
const activeSection = ref('location')

const next = () => {
  if (step.value < 5) step.value++
}

const back = () => {
  if (step.value > 1) step.value--
}

/* ======================
FORM DATA
====================== */

const form = ref({

  title: '',
  description: '',

  type: '',
  purpose: '',

  pricing: {
    price: null,
    currency: "NGN",
    rentDuration: null,
    installment: false,
    installmentPlan: {
      months: null,
      monthlyAmount: null
    }
  },

  location: {
    country: "Nigeria",
    state: "",
    lga: "",
    city: "",
    address: "",
    source: "gps",

    geometry: {
      type: "Polygon",
      coordinates: []
    }
  },

  landDetails: {
    unit: "plot",
    size: null,
    quantity: 1,
    totalSqm: null,
    fenced: false,
    dry: false,
    roadAccess: false
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

  features: [],

  contact: {
    name: "",
    phone: "",
    whatsapp: ""
  },

  createdAt: new Date(),
  updatedAt: new Date()

})

/* ======================
PROPERTY TYPES
====================== */

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
AUTO PROPERTY TYPE
====================== */

const propertyType = computed(() => {

  if (form.value.purpose === 'Sell Land') return 'land'

  if (
    form.value.purpose === 'Sell House' ||
    form.value.purpose === 'Rent House'
  ) return 'house'

  return ''
})

/* ======================
OPTIONS BASED ON TYPE
====================== */

const options = computed(() => {

  if (propertyType.value === 'land') return landType

  if (propertyType.value === 'house') return houseType

  return []

})

/* ======================
CHANGE GEO TYPE
====================== */

watch(propertyType, (type) => {

  if (type === 'house') {
    form.value.location.geometry.type = "Point"
  }

  if (type === 'land') {
    form.value.location.geometry.type = "Polygon"
  }

})

/* ======================
SECTION COMPLETION
====================== */

function isCompleted(section) {

  if (section === 'location') {

    const loc = form.value.location

    return (
      loc.state &&
      loc.city &&
      loc.address
    )
  }

  if (section === 'features') {
    return form.value.features.length >= 3
  }

  if (section === 'others') {

    if (propertyType.value === 'land') {
      return form.value.landDetails.size
    }

    if (propertyType.value === 'house') {
      return form.value.houseDetails
    }

  }

  return false
}

/* ======================
SUBMIT
====================== */

function submit() {

  console.log('Form Data:', form.value)

  alert('Property submitted successfully ✅')

}
</script>
<template>
  <div class="min-h-screen py-10 px-4">

    <Container>

      <!-- ====================== -->
      <!-- STEP 1 -->
      <!-- ====================== -->
      {{ form }}
      <div v-if="step === 1" class="max-w-4xl mx-auto space-y-4">

        <div class="bg-white p-5 rounded shadow space-y-6">

          <!-- PROPERTY TITLE -->

          <div class="flex gap-5">
           
            <div class="w-1/3">
              <h2 class="section-title">Property Title</h2>
              <p class="text-gray-500 text-sm">
                Add a clear title for your property
              </p>
            </div>

            <div class="w-2/3">
              <textarea
                v-model="form.title"
                placeholder="Example: 2 Plots of Land in Lekki"
                class="input h-20"
              />
            </div>

          </div>


          <!-- PURPOSE & TYPE -->

          <div class="flex gap-5">

            <div class="flex-1">
              <h2 class="section-title">Purpose</h2>

              <select v-model="form.purpose" class="input">
                <option disabled value="">Select Purpose</option>
                <option>Sell Land</option>
                <option>Sell House</option>
                <option>Rent House</option>
              </select>
            </div>

            <div class="flex-1">

              <h2 class="section-title">Type</h2>

              <select v-model="form.type" class="input">
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

                <div v-if="propertyType === 'land'">
                  <ListLandMap v-model="form" />
                </div>

                <div v-if="propertyType === 'house'">
                  <ListHouseLocationPicker v-model="form" />
                </div>

              </div>


              <!-- FEATURES -->

              <div v-if="activeSection === 'features'">

                <ListFeature
                  :type="propertyType"
                  v-model="form.features"
                />

              </div>


              <!-- OTHERS -->

              <div v-if="activeSection === 'others'">

                <div v-if="propertyType === 'land'">
                  <ListLandother v-model="form" />
                </div>

                <div v-if="propertyType === 'house'">
                  <ListHouseother
                    v-model="form"
                    :purpose="form.purpose"
                  />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      <!-- ====================== -->
      <!-- STEP 2 -->
      <!-- ====================== -->

      <div v-if="step === 2">
        <ListDescription v-model="form.description" />
      </div>


      <!-- ====================== -->
      <!-- STEP 3 -->
      <!-- ====================== -->

      <div v-if="step === 3">
        <ListUpload v-model="form" />
      </div>


      <!-- ====================== -->
      <!-- STEP 4 -->
      <!-- ====================== -->

      <div v-if="step === 4">

        <h2 class="section-title">Contact</h2>

        <input
          v-model="form.contact.phone"
          placeholder="Phone"
          class="input"
        />

        <input
          v-model="form.contact.whatsapp"
          placeholder="WhatsApp"
          class="input"
        />

      </div>


      <!-- ====================== -->
      <!-- STEP 5 -->
      <!-- ====================== -->

      <div v-if="step === 5" class="text-center">

        <h2 class="section-title">Review & Submit</h2>

        <p class="text-gray-500">
          Confirm details before submitting
        </p>

      </div>


      <!-- ====================== -->
      <!-- NAVIGATION -->
      <!-- ====================== -->

      <div class="flex justify-between mt-8">

        <button
          v-if="step > 1"
          @click="back"
          class="btn-secondary"
        >
          Back
        </button>

        <button
          v-if="step < 5"
          @click="next"
          class="btn-primary ml-auto"
        >
          Next
        </button>

        <button
          v-if="step === 5"
          @click="submit"
          class="btn-primary ml-auto"
        >
          Submit
        </button>

      </div>

    </Container>

  </div>
</template>
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
@apply bg-gray-200;
}

</style>