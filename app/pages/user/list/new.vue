<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'auth'
})

/* ======================
   STEP
====================== */
const step = ref(1)

/* ======================
   IMAGE STATE (3)
====================== */
const previews = ref([null, null, null])

/* ======================
   DOCUMENT TYPES (6)
====================== */
const documentTypes = [
  'Certificate of Occupancy (C of O)',
  'Land Agreement',
  'Survey Plan',
  'Deed of Assignment',
  'Allocation Letter',
  'Other Document'
]

const docs = ref(Array(6).fill(null))
const docNames = ref(Array(6).fill(null))

/* ======================
   FORM
====================== */
const form = ref({
  title: '',
  purpose: 'Sell',
  price: '',
  size: '',
  state: '',
  city: '',
  address: '',
  description: '',
  fenced: false,
  roadAccess: false,
  dry: false,
  phone: '',
  whatsapp: '',
  images: [],
  documents: []
})

/* ======================
   NAVIGATION
====================== */
const next = () => step.value++
const back = () => step.value--

/* ======================
   IMAGE UPLOAD
====================== */
const handleUpload = (e, index) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    previews.value[index] = reader.result
    form.value.images[index] = file
  }

  reader.readAsDataURL(file)
}

const removeImage = (index) => {
  previews.value[index] = null
  form.value.images[index] = null
}

/* ======================
   DOCUMENT UPLOAD
====================== */
const handleDoc = (e, index) => {
  const file = e.target.files[0]
  if (!file) return

  if (file.type !== 'application/pdf') {
    alert('Only PDF allowed')
    return
  }

  docs.value[index] = file
  docNames.value[index] = file.name
  form.value.documents[index] = file
}

const removeDoc = (index) => {
  docs.value[index] = null
  docNames.value[index] = null
  form.value.documents[index] = null
}

/* ======================
   SUBMIT
====================== */
const submit = () => {
  const formData = new FormData()

  form.value.images.forEach(i => i && formData.append('images', i))
  form.value.documents.forEach(d => d && formData.append('documents', d))

  console.log(form.value)

  alert('Land submitted successfully ✅')
}
</script>



<template>
<div class="min-h-screen py-10 px-4">
<div class="max-w-4xl mx-auto">

  <!-- STEP INDICATOR -->
  <div class="flex gap-3 mb-10">
    <div
      v-for="n in 5"
      :key="n"
      class="h-10 w-10 rounded-full flex items-center justify-center text-sm"
      :class="step >= n ? 'bg-black text-white' : 'bg-gray-200'"
    >
      {{ n }}
    </div>
  </div>


  <!-- ================= STEP 1 ================= -->
  <div v-if="step===1" class="space-y-10">

    <!-- IMAGES -->
    <div>
      <h2 class="section-title">Land Images (max 3)</h2>

      <div class="flex gap-6 mt-4">
        <div
          v-for="(img,index) in previews"
          :key="index"
          class="relative w-56 h-40 border border-dashed border-gray-400 rounded-md overflow-hidden flex items-center justify-center hover:border-black"
        >

          <img v-if="img" :src="img" class="w-full h-full object-cover"/>

          <div v-else class="text-center text-gray-400 text-sm">
            Upload Image
          </div>

          <input
            type="file"
            accept="image/*"
            :id="'img-'+index"
            class="hidden"
            @change="handleUpload($event,index)"
          />

          <label :for="'img-'+index" class="absolute inset-0 cursor-pointer"></label>

          <button
            v-if="img"
            @click="removeImage(index)"
            class="absolute top-2 right-2 bg-black text-white w-6 h-6 rounded-full text-xs"
          >
            ✕
          </button>

        </div>
      </div>
    </div>


    <!-- DOCUMENTS -->
    <div class="border-t pt-10">
      <h2 class="section-title">Ownership Documents (PDF only)</h2>

      <div class="grid grid-cols-2 gap-6 mt-4">

        <div
          v-for="(label,index) in documentTypes"
          :key="index"
          class="relative border border-dashed border-gray-400 rounded-md h-28 flex items-center justify-center hover:border-black"
        >

          <div v-if="docs[index]" class="text-center text-sm px-3">
            📄
            <p class="font-medium">{{ label }}</p>
            <p class="text-xs truncate">{{ docNames[index] }}</p>
          </div>

          <div v-else class="text-center text-gray-400 text-sm">
            {{ label }}
          </div>

          <input
            type="file"
            accept="application/pdf"
            :id="'doc-'+index"
            class="hidden"
            @change="handleDoc($event,index)"
          />

          <label :for="'doc-'+index" class="absolute inset-0 cursor-pointer"></label>

          <button
            v-if="docs[index]"
            @click="removeDoc(index)"
            class="absolute top-2 right-2 bg-black text-white w-6 h-6 rounded-full text-xs"
          >
            ✕
          </button>

        </div>

      </div>
    </div>
  </div>



  <!-- ================= STEP 2 ================= -->
  <div v-if="step===2" class="space-y-4">
    <h2 class="section-title">Location</h2>
    <input v-model="form.state" placeholder="State" class="input"/>
    <input v-model="form.city" placeholder="City" class="input"/>
    <input v-model="form.address" placeholder="Address" class="input"/>
  </div>



  <!-- ================= STEP 3 ================= -->
  <div v-if="step===3" class="space-y-4">
    <h2 class="section-title">Land Features</h2>

    <textarea v-model="form.description" class="input h-28"/>

    <label><input type="checkbox" v-model="form.fenced"/> Fenced</label>
    <label><input type="checkbox" v-model="form.roadAccess"/> Road Access</label>
    <label><input type="checkbox" v-model="form.dry"/> Dry Land</label>
  </div>



  <!-- ================= STEP 4 ================= -->
  <div v-if="step===4" class="space-y-4">
    <h2 class="section-title">Contact Info</h2>
    <input v-model="form.phone" class="input" placeholder="Phone"/>
    <input v-model="form.whatsapp" class="input" placeholder="WhatsApp"/>
  </div>



  <!-- ================= STEP 5 ================= -->
  <div v-if="step===5" class="text-center">
    <button @click="submit" class="btn-primary">Submit</button>
  </div>



  <!-- NAV BUTTONS -->
  <div class="flex justify-between mt-10">
    <button v-if="step>1" @click="back" class="btn-secondary">Back</button>
    <button v-if="step<5" @click="next" class="btn-primary ml-auto">Next</button>
  </div>

</div>
</div>
</template>



<style scoped>
.input {
  @apply w-full border rounded-lg px-4 py-2;
}

.section-title {
  @apply text-lg font-semibold;
}

.btn-primary {
  @apply bg-black text-white px-6 py-2 rounded-lg;
}

.btn-secondary {
  @apply border px-6 py-2 rounded-lg;
}
</style>