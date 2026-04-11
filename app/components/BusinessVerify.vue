<template>
  <div>
    <!-- OPEN BUTTON -->
    <button 
      @click="open=true"
      class="bg-slate-800 text-white px-5 py-2.5 rounded-xl"
    >
      Verify Business
    </button>

    <!-- MODAL -->
    <div v-if="open" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div class="bg-white w-full max-w-md p-6 rounded-2xl space-y-5 relative">

        <!-- CLOSE -->
        <button @click="open = false" class="absolute top-3 right-3">✖</button>

        <!-- HEADER -->
        <div class="flex items-center gap-3">
          <div class="bg-green-100 p-2 rounded-xl">
            🏢
          </div>
          <div>
            <h2 class="text-xl font-semibold">Business Verification</h2>
            <p class="text-sm text-gray-500">Upload your CAC details</p>
          </div>
        </div>

        <!-- ================= STEP CONTENT ================= -->
        <div>

          <!-- ================= FORM ================= -->
          <div v-if="step === 'form'" class="space-y-4">

            <!-- BUSINESS NAME -->
            <input v-model="formData.businessName"
              placeholder="Business Name"
              class="w-full border rounded-xl px-4 py-2"/>

            <!-- CAC NUMBER -->
            <input v-model="formData.cacNumber"
              placeholder="CAC Registration Number"
              @input="onlyNumber('cacNumber')"
              class="w-full border rounded-xl px-4 py-2"/>

            <!-- BUSINESS TYPE -->
            <select v-model="formData.businessType"
              class="w-full border rounded-xl px-4 py-2">
              <option value="">Select Business Type</option>
              <option>Enterprise</option>
              <option>Limited Company</option>
              <option>NGO</option>
            </select>

            <!-- CAC UPLOAD -->
            <div v-if="!formData.cacImage"
              class="h-32 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer"
              @click="$refs.cacFile.click()">
              Upload CAC Certificate
            </div>

            <input type="file" ref="cacFile" class="hidden" @change="handleCACUpload"/>

            <img v-if="formData.cacImage"
              :src="formData.cacImage"
              class="h-32 w-full object-cover rounded-xl"/>

            <button @click="goToInstruction"
              class="w-full bg-blue-600 text-white py-2 rounded-xl">
              Continue
            </button>
          </div>

          <!-- ================= INSTRUCTION ================= -->
          <div v-if="step === 'instruction'" class="text-center space-y-4">

            <div class="text-4xl">📷</div>

            <h3 class="font-semibold">Owner Face Verification</h3>

            <ul class="text-sm text-gray-600 space-y-1">
              <li>✔ Look straight</li>
              <li>✔ Turn head left/right</li>
              <li>✔ Blink eyes</li>
            </ul>

            <button @click="startFaceFlow"
              class="w-full bg-green-600 text-white py-2 rounded-xl">
              Start Verification
            </button>
          </div>

          <!-- ================= FACE ================= -->
          <div v-if="step === 'face'" class="flex justify-center">
            <FaceVerify ref="faceRef" @completed="handleResult" />
          </div>

        </div>

        <!-- SUBMIT -->
        <button 
          v-if="step === 'faceDone'"
          @click="submit"
          class="w-full bg-green-600 text-white py-2 rounded-xl"
        >
          Submit Business Verification
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FaceVerify from '@/components/FaceVerify.vue'

const open = ref(false)
const step = ref('form')
const faceRef = ref(null)

/* ================= FORM DATA ================= */
const formData = ref({
  businessName: '',
  cacNumber: '',
  businessType: '',
  cacImage: null,
  faceImage: null,
  faceVector: null
})

/* ================= HELPERS ================= */
const onlyNumber = (field) => {
  formData.value[field] = formData.value[field].replace(/[^0-9]/g, '')
}

const handleCACUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => formData.value.cacImage = reader.result
  reader.readAsDataURL(file)
}

/* ================= FLOW ================= */
const goToInstruction = () => {
  const { businessName, cacNumber, businessType, cacImage } = formData.value

  if (!businessName || !cacNumber || !businessType || !cacImage) {
    alert('Complete all business details')
    return
  }

  step.value = 'instruction'
}

const startFaceFlow = () => {
  step.value = 'face'
  setTimeout(() => {
    faceRef.value?.startVerification()
  }, 300)
}

const handleResult = (data) => {
  formData.value.faceImage = data.finalImage
  formData.value.faceVector = data.vector
  step.value = 'faceDone'
}

const submit = () => {
  console.log('BUSINESS DATA:', formData.value)

  alert('Business Verification Completed ✅')
  open.value = false
}
</script>