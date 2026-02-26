<script setup>
import { ref, computed } from 'vue'
import loadstates from '@/data/nigeria-states.js'

definePageMeta({ layout: 'auth' })

/* ======================
   STEP CONTROL
====================== */
const step = ref(1)

const steps = [
  'Details',
  'Location',
  'Uploads',
  'Contact',
  'Review'
]

/* ======================
   FORM
====================== */
const form = ref({
  title: '',
  purpose: 'Sell Land',
  type: '',
  price: '',
  size: '',
  state: '',
  city: '',
  address: '',
  description: '',
  phone: '',
  whatsapp: ''
})

/* ======================
   TYPES
====================== */
const houseType = [
  { key: 'duplex', label: 'Duplex' },
  { key: 'flat', label: 'Flat' },
  { key: 'bungalow', label: 'Bungalow' }
]

const landType = [
  { key: 'residential_land', label: 'Residential Land' },
  { key: 'commercial_land', label: 'Commercial Land' }
]

const options = computed(() =>
  form.value.purpose.includes('Land') ? landType : houseType
)

/* ======================
   CURRENCY FORMAT
====================== */
const formatMoney = (v) =>
  '₦' + Number(v.replace(/[^\d]/g, '')).toLocaleString()

const handleMoney = (e) =>
  (form.value.price = formatMoney(e.target.value))

/* ======================
   NAV
====================== */
const next = () => step.value < 5 && step.value++
const back = () => step.value > 1 && step.value--

const submit = () => {
  console.log(form.value)
  alert('Submitted successfully ✅')
}
</script>



<template>
<div class="min-h-screen bg-gray-50 py-10">

  <div class="max-w-6xl mx-auto flex gap-8">

    <!-- ================= SIDEBAR ================= -->
    <div class="w-64 bg-white rounded-2xl shadow p-6 h-fit sticky top-6">

      <h2 class="font-bold text-lg mb-6">Create Listing</h2>

      <div
        v-for="(s,i) in steps"
        :key="i"
        class="flex items-center gap-3 mb-5"
      >
        <div
          class="w-7 h-7 rounded-full text-sm flex items-center justify-center"
          :class="step>=i+1 ? 'bg-black text-white' : 'bg-gray-200'"
        >
          {{ i+1 }}
        </div>

        <span
          :class="step===i+1 ? 'font-semibold text-black' : 'text-gray-500'"
        >
          {{ s }}
        </span>
      </div>
    </div>



    <!-- ================= MAIN CARD ================= -->
    <div class="flex-1 bg-white rounded-2xl shadow p-8 space-y-6">

      <!-- STEP 1 -->
      <div v-if="step===1" class="space-y-5">
        <h2 class="title">Property Details</h2>

        <input v-model="form.title" class="input" placeholder="Title"/>

        <select v-model="form.purpose" class="input">
          <option>Sell Land</option>
          <option>Sell House</option>
          <option>Rent House</option>
        </select>

        <select v-model="form.type" class="input">
          <option
            v-for="item in options"
            :key="item.key"
            :value="item.key"
          >
            {{ item.label }}
          </option>
        </select>

        <input
          :value="form.price"
          @input="handleMoney"
          class="input"
          placeholder="Price"
        />
      </div>


      <!-- STEP 2 -->
      <div v-if="step===2" class="space-y-5">
        <h2 class="title">Location</h2>

        <input v-model="form.state" class="input" placeholder="State"/>
        <input v-model="form.city" class="input" placeholder="City"/>
        <input v-model="form.address" class="input" placeholder="Address"/>
      </div>


      <!-- STEP 3 -->
      <div v-if="step===3">
        <h2 class="title mb-4">Upload Images</h2>

        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="n in 6"
            :key="n"
            class="upload-box"
          >
            +
          </div>
        </div>
      </div>


      <!-- STEP 4 -->
      <div v-if="step===4" class="space-y-5">
        <h2 class="title">Contact</h2>
        <input v-model="form.phone" class="input" placeholder="Phone"/>
        <input v-model="form.whatsapp" class="input" placeholder="WhatsApp"/>
      </div>


      <!-- STEP 5 -->
      <div v-if="step===5" class="text-center space-y-4">
        <h2 class="title">Review</h2>
        <pre class="bg-gray-100 p-4 rounded text-xs text-left">
{{ form }}
        </pre>
      </div>


      <!-- NAVIGATION -->
      <div class="flex justify-between pt-6 border-t">
        <button v-if="step>1" @click="back" class="btn-outline">Back</button>
        <button v-if="step<5" @click="next" class="btn-primary ml-auto">Next</button>
        <button v-if="step===5" @click="submit" class="btn-primary ml-auto">Submit</button>
      </div>

    </div>
  </div>
</div>
</template>



<style scoped>
.title { @apply text-xl font-semibold; }
.input { @apply w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black; }

.btn-primary { @apply bg-black text-white px-6 py-3 rounded-xl; }
.btn-outline { @apply border px-6 py-3 rounded-xl; }

.upload-box {
  @apply border-2 border-dashed rounded-xl h-32 flex items-center justify-center text-3xl text-gray-400 cursor-pointer hover:border-black;
}
</style>