<template>
  <div>
    <!-- OPEN BUTTON -->
    <button
      @click="startverification"
      class="bg-slate-800 text-white px-5 py-2.5 rounded-xl"
    >
      Verify Identity
    </button>

    <!-- MODAL -->
    <div v-if="open" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-md p-6  rounded-sm space-y-5 relative">

        <!-- CLOSE -->
        <button @click="open = false" class="absolute top-3 right-3">✖</button>

        <!-- HEADER -->
        <div class="flex items-center gap-3">
          <div class="bg-blue-100 p-2 rounded-xl">🪪</div>
          <div>
            <h2 class="text-xl font-semibold">KYC & Business Verification</h2>
            <p class="text-sm text-gray-500">Complete verification process</p>
          </div>
        </div>

        <!-- ================= PERSONAL FORM ================= -->
        <div v-if="step === 'form'" class="space-y-4">
          <input v-model="form.nin" placeholder="NIN" maxlength="11"
            @input="onlyNumber('nin')"
            class="w-full border  rounded-sm px-4 py-2"/>

          <input v-model="form.phone" placeholder="Phone" maxlength="11"
            @input="onlyNumber('phone')"
            class="w-full border  rounded-sm px-4 py-2"/>

          <div v-if="!form.ninImage"
            class="h-32 border-2 border-dashed  rounded-sm flex items-center justify-center cursor-pointer"
            @click="$refs.ninFile.click()">
            Upload NIN
          </div>

          <input type="file" ref="ninFile" class="hidden" @change="handleNinUpload"/>

          <img v-if="form.ninImage" :src="form.ninImage"
            class="h-32 w-full object-cover rounded-xl"/>

          <button @click="toInstruction"
            class="w-full bg-blue-600 text-white py-2  rounded-sm">
            Continue
          </button>
        </div>

        <!-- ================= INSTRUCTION ================= -->
        <div v-if="step === 'instruction'" class="text-center space-y-4">
          <div class="text-4xl">📷</div>
          <h3 class="font-semibold">Face Verification</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>✔ Look straight</li>
            <li>✔ Turn head left/right</li>
            <li>✔ Blink eyes</li>
          </ul>
          <button @click="startFace"
            class="w-full bg-green-600 text-white py-2  rounded-sm">
            Start
          </button>
        </div>

        <!-- ================= FACE ================= -->
        <div v-if="step === 'face'" class="flex justify-center">
          <FaceVerify ref="faceRef" @completed="handleFaceResult" />
        </div>

        <!-- ================= BUSINESS FORM ================= -->
        <div v-if="step === 'business'" class="space-y-4">
          <input v-model="form.businessName"
            placeholder="Business Name"
            class="w-full border  rounded-sm px-4 py-2"/>

          <input v-model="form.cacNumber"
            placeholder="CAC Registration Number"
            @input="onlyNumber('cacNumber')"
            class="w-full border  rounded-sm px-4 py-2"/>

          


          <div v-if="!form.cacImage"
            class="h-32 border-2 border-dashed  rounded-sm flex items-center justify-center cursor-pointer"
            @click="$refs.cacFile.click()">
            Upload CAC Certificate
          </div>

          <input type="file" ref="cacFile" class="hidden" @change="handleCACUpload"/>

          <img v-if="form.cacImage"
            :src="form.cacImage"
            class="h-32 w-full object-cover rounded-sm"/>

          <button @click="submit"
            class="w-full bg-green-600 text-white py-2 rounded-xl">
            Submit Verification
          </button>
        </div>

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

const form = ref({
  nin: '',
  phone: '',
  ninImage: null,
  faceImage: null,
  faceVector: null,
  businessName: '',
  cacNumber: '',
  businessType: '',
  cacImage: null
})

const onlyNumber = (field) => {
  form.value[field] = form.value[field].replace(/[^0-9]/g, '')
}

const handleNinUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => form.value.ninImage = reader.result
  reader.readAsDataURL(file)
}

const handleCACUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => form.value.cacImage = reader.result
  reader.readAsDataURL(file)
}
const startverification =  async () => {
    try {
    const res = await useApiFetch(`/kyc`, { method: 'GET' })
     console.log(res, 'sssss');
     if (res.exists== false){
      open.value = true
      
     }
  return
    // mergeForm(data)
     property.value = propertyId
  } catch (err) {
    console.error(err)
  }
  // open.value = true
}
const toInstruction = () => {
  const { nin, phone, ninImage } = form.value
  if (!nin || !phone || !ninImage) {
    alert('Complete all fields')
    return
  }
  step.value = 'instruction'
}

const startFace = () => {
  step.value = 'face'
  setTimeout(() => {
    faceRef.value?.startVerification()
  }, 300)
}

const handleFaceResult = (data) => {
  form.value.faceImage = data.image
  form.value.faceVector = data.vector
  step.value = 'business'
}




const submit = async () => {
  try {
    const fd = new FormData()

    // convert images
    const ninFile = await base64ToFile(form.value.ninImage, 'nin.jpg')
    const faceFile = await base64ToFile(form.value.faceImage, 'face.jpg')
    const cacFile = await base64ToFile(form.value.cacImage, 'cac.jpg')

    // append files
    fd.append('ninImage', ninFile)
    fd.append('faceImage', faceFile)
    fd.append('cacImage', cacFile)

    // append text fields
    fd.append('nin', form.value.nin)
    fd.append('phone', form.value.phone)
    fd.append('businessName', form.value.businessName)
    fd.append('cacNumber', form.value.cacNumber)
    fd.append('businessType', form.value.businessType)

    // append face vector
    fd.append('faceVector', JSON.stringify(form.value.faceVector))

    await axios.post('http://localhost:5000/api/kyc/verify', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    alert('Verification Completed ✅')
    open.value = false
  } catch (err) {
    console.error(err)
    alert('Upload failed')
  }
}
</script>