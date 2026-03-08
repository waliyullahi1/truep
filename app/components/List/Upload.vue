<script setup>
import { ref } from 'vue'
// your state/LGA component



/* ======================
   STEP MANAGEMENT
====================== */
const step = ref(1)
const previews = ref([null, null, null, null, null, null]) // land images
const survey = ref([null]) // survey plan
const titleDocs = ref([null]) // title document

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["update:modelValue"]);


/* ======================
   STEP NAVIGATION
====================== */

/* ======================
   IMAGE / FILE UPLOAD
====================== */
function handleUpload(e, index, target = 'images') {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    if (target === 'images') {
      previews.value[index] = reader.result
      form.value.images[index] = file
    } else if (target === 'survey') {
      survey.value[index] = reader.result
      form.value.documents = file
    } else if (target === 'titleDocs') {
      titleDocs.value[index] = reader.result
      form.value.documents = file
    }
  }
  reader.readAsDataURL(file)
}

function removeImage(index, target = 'images') {
  if (target === 'images') {
    previews.value[index] = null
    form.value.images[index] = null
  } else if (target === 'survey') {
    survey.value[index] = null
    form.value.documents = null
  } else if (target === 'titleDocs') {
    titleDocs.value[index] = null
    form.value.documents = null
  }
}

/* ======================
   REVIEW COMPLETION
====================== */
const locationRef = ref(null)
const featuresRef = ref(null)
const sizeRef = ref(null)

function isCompleted(section) {
  if (section === 'location') return form.value.state && form.value.city && form.value.address
  if (section === 'features') return form.value.fenced || form.value.roadAccess || form.value.dry || form.value.description
  if (section === 'size') return form.value.size && form.value.price && form.value.purpose
  return false
}



/* ======================
   SUBMIT
====================== */
function submit() {
  console.log('Form Data:', form.value)
  alert('Land submitted successfully ✅')
}
</script>

<template>
<div class="min-h-screen py-10 px-4">
  <Container>


    <!-- STEP 2: Upload Images & Documents -->
    <div  class="space-y-10">

      <!-- Land Images -->
      <div>
        <h2 class="section-title">Land Images (max 6)</h2>
        <p class="text-gray-500 mb-6">Visual examples attract buyers.</p>
        <div class="flex flex-wrap gap-6">
          <div v-for="(img,index) in previews" :key="index"
               class="relative w-60 h-48 border border-dashed border-gray-400 rounded-sm flex items-center justify-center hover:border-black transition">
            <img v-if="img" :src="img" class="w-full h-full object-cover"/>
            <div v-else class="text-center">
              <img src="/image/icon/picture.svg" class="w-14 mx-auto opacity-50"/>
              <p class="text-xs mt-2 text-gray-500">Drag & drop or 
                <label :for="'upload-'+index" class="text-blue-600 underline cursor-pointer">Browse</label>
              </p>
            </div>
            <input type="file" accept="image/*" :id="'upload-'+index" class="hidden" 
                   @change="handleUpload($event,index,'images')"/>
            <button v-if="img" @click="removeImage(index,'images')" 
                    class="absolute top-2 right-2 bg-black/70 text-white w-6 h-6 rounded-full text-xs">✕</button>
          </div>
        </div>
      </div>

      <!-- Survey Plan -->
      <div class="border-t pt-10">
        <h2 class="section-title">Survey Plan (Required)</h2>
        <p class="text-gray-500 mb-4">Upload official survey plan.</p>
        <div class="flex flex-wrap gap-6">
          <div v-for="(img,index) in survey" :key="index"
               class="relative w-60 h-48 border border-dashed border-gray-400 rounded-sm flex items-center justify-center hover:border-black transition">
            <img v-if="img" :src="img" class="w-full h-full object-cover"/>
            <div v-else class="text-center">
              <img src="/image/icon/picture.svg" class="w-14 mx-auto opacity-50"/>
              <p class="text-xs mt-2 text-gray-500">Drag & drop or 
                <label :for="'upload-survey-'+index" class="text-blue-600 underline cursor-pointer">Browse</label>
              </p>
            </div>
            <input type="file" accept="image/*" :id="'upload-survey-'+index" class="hidden" 
                   @change="handleUpload($event,index,'survey')"/>
            <button v-if="img" @click="removeImage(index,'survey')" 
                    class="absolute top-2 right-2 bg-black/70 text-white w-6 h-6 rounded-full text-xs">✕</button>
          </div>
        </div>
      </div>

      <!-- Title Document -->
      <div class="border-t pt-10">
        <h2 class="section-title">Title Document (Required)</h2>
        <p class="text-gray-500 mb-3">C of O, Deed, Gazette, etc.</p>
        <div class="flex flex-wrap gap-6">
          <div v-for="(img,index) in titleDocs" :key="index"
               class="relative w-60 h-48 border border-dashed border-gray-400 rounded-sm flex items-center justify-center hover:border-black transition">
            <img v-if="img" :src="img" class="w-full h-full object-cover"/>
            <div v-else class="text-center">
              <img src="/image/icon/picture.svg" class="w-14 mx-auto opacity-50"/>
              <p class="text-xs mt-2 text-gray-500">Drag & drop or 
                <label :for="'upload-title-'+index" class="text-blue-600 underline cursor-pointer">Browse</label>
              </p>
            </div>
            <input type="file" accept="image/*" :id="'upload-title-'+index" class="hidden" 
                   @change="handleUpload($event,index,'titleDocs')"/>
            <button v-if="img" @click="removeImage(index,'titleDocs')" 
                    class="absolute top-2 right-2 bg-black/70 text-white w-6 h-6 rounded-full text-xs">✕</button>
          </div>
        </div>
      </div>
    </div>

    

 
  </Container>
</div>
</template>

<style scoped>
.input { @apply w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black; }
.section-title { @apply text-lg font-semibold; }
.btn-primary { @apply bg-black text-white px-6 py-2 rounded-lg; }
.btn-secondary { @apply border px-6 py-2 rounded-lg; }
</style>