<template>
  <div>

   {{isVerify}}
    <!-- OPEN BUTTON -->
<button
  :disabled="verifyLabel === 'Loading...' || verifyLabel === 'verified'"
  @click="startverification"
  class="bg-slate-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 justify-center"
>
  <!-- Spinner -->
  <svg
    v-if="verifyLabel === 'Loading...'"
    class="animate-spin h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="white"
      stroke-width="4"
      opacity="0.3"
    />
    <path
      d="M22 12a10 10 0 00-10-10"
      stroke="white"
      stroke-width="4"
    />
  </svg>

  <!-- Check Icon -->
  <span v-if="verifyLabel === 'verified'">✅</span>

  {{ verifyLabel }}
</button>

    <!-- MODAL -->
    <div
      v-if="open"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div
        class="bg-white w-full max-w-md p-6 rounded-sm space-y-5 relative max-h-[90vh] overflow-y-auto"
      >
        <!-- CLOSE -->
        <button @click="open = false" class="absolute top-3 right-3">✖</button>

        <!-- HEADER -->
        <div class="flex items-center gap-3">
          <div class="bg-blue-100 p-2 rounded-xl">🪪</div>
          <div>
            <h2 class="text-xl font-semibold">
              KYC &
              {{ kycType === 'individual' ? 'Identity' : 'Business' }}
              Verification
            </h2>
            <p class="text-sm text-gray-500">
              Complete verification process
            </p>
          </div>
        </div>

        <!-- ================= REVIEW SECTION ================= -->
        <div v-if="step === 'review'" class="border rounded-sm p-4 space-y-3 bg-gray-50">
          <h3 class="font-semibold text-gray-800">
            Verification Progress
          </h3>

          <!-- NIN -->
          <div class="flex justify-between items-center border-b pb-2">
            <span>NIN Information</span>

            <span
              v-if="form.nin && form.phone && form.ninImage"
              class="text-green-600 font-medium"
            >
              ✅ Completed
            </span>

            <span
              v-else
              class="text-orange-500 font-medium"
            >
              ⏳ Pending
            </span>
          </div>

          <!-- FACE -->
          <div class="flex justify-between items-center border-b pb-2">
            <span>Face Verification</span>

            <span
              v-if="form.faceImage && form.faceVector"
              class="text-green-600 font-medium"
            >
              ✅ Completed
            </span>

            <span
              v-else
              class="text-orange-500 font-medium"
            >
              ⏳ Pending
            </span>
          </div>

          <!-- BUSINESS -->
          <div v-if="kycType !== 'individual'" class="flex justify-between items-center"  >
            <span>Business Verification</span>
            <span v-if=" form.businessName && form.cacNumber && form.cacImage " class="text-green-600 font-medium">
              ✅ Completed
            </span>

            <span v-else  class="text-orange-500 font-medium">  ⏳ Pending  </span>
          </div>
        </div>

        <!-- ================= PERSONAL FORM ================= -->
        <div v-if="step === 'form'" class="space-y-4">
          <input
            v-model="form.nin"
            placeholder="NIN"
            maxlength="11"
            @input="onlyNumber('nin')"
            class="w-full border rounded-sm px-4 py-2"
          />

          <input
            v-model="form.phone"
            placeholder="Phone"
            maxlength="11"
            @input="onlyNumber('phone')"
            class="w-full border rounded-sm px-4 py-2"
          />

          <!-- NIN IMAGE -->
          <div>
            <div
              v-if="!form.ninImage"
              class="h-32 border-2 border-dashed rounded-sm flex items-center justify-center cursor-pointer"
              @click="$refs.ninFile.click()"
            >
              Upload NIN
            </div>

            <div v-else class="space-y-2">
              <img
                :src="form.ninImage"
                class="h-32 w-full object-cover rounded-xl"
              />

              <div class="flex gap-2">
                <button
                  @click="$refs.ninFile.click()"
                  class="flex-1 bg-blue-600 text-white py-2 rounded-sm"
                >
                  Change
                </button>

                <button
                  @click="cancelNinImage"
                  class="flex-1 bg-red-600 text-white py-2 rounded-sm"
                >
                  Cancel
                </button>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              ref="ninFile"
              class="hidden"
              @change="handleNinUpload"
            />
          </div>

          <button
            @click="toInstruction" 
             :disabled="isLoading === 'Loading...'"
            class="w-full bg-blue-600 text-white py-2 rounded-sm"
          >
            {{ isLoading ? 'Loading...' : 'Continue' }}
          </button>
        </div>

        <!-- ================= INSTRUCTION ================= -->
        <div  v-if="step === 'instruction'"  class="text-center space-y-4" >
          <img  src="/image/face-capture-demo.png" class="mx-auto w-full max-w-xs" />

          <p class="text-gray-700 font-medium">
            Position your face within the frame and ensure good lighting
            for accurate verification.
          </p>

          <button  @click="startFace" class="w-full bg-green-600 text-white py-2 rounded-sm" > Start </button>
        </div>

        <!-- ================= FACE ================= -->
        <div v-if="step === 'face'" class="flex justify-center">
         <div v-if="onVerify" class=" ">
            <FaceVerify
                ref="faceRef"
                @completed="handleFaceResult"
              />
          </div> 
          <div v-if="!onVerify"  class="h-48 flex flex-col  justify-center items-center  w-full ">
              <div class=" mr-6"><img src="@/assets/images/icons/loading.svg" class=" w-10"/></div>
               <p> Processing.....</p>
          </div>

        </div>

        <!-- ================= BUSINESS ================= -->
        <div  v-if="step === 'business' && kycType !== 'individual'" class="space-y-4" >
          <input  v-model="form.businessName" placeholder="Business Name" class="w-full border rounded-sm px-4 py-2" />
          <input  v-model="form.cacNumber"   placeholder="CAC Registration Number" @input="onlyNumber('cacNumber')"  class="w-full border rounded-sm px-4 py-2"/>

          <!-- CAC IMAGE -->
          <div>
            <div  v-if="!form.cacImage"  class="h-32 border-2 border-dashed rounded-sm flex items-center justify-center cursor-pointer"  @click="$refs.cacFile.click()"  >
              Upload CAC Certificate
            </div>

            <div v-else class="space-y-2">
              <img :src="form.cacImage"  class="h-32 w-full object-cover rounded-sm"  />

              <div class="flex gap-2">
                <button @click="$refs.cacFile.click()" class="flex-1 bg-blue-600 text-white py-2 rounded-sm"
                >
                  Change
                </button>

                <button
                  @click="cancelCACImage"
                  class="flex-1 bg-red-600 text-white py-2 rounded-sm"
                >
                  Cancel
                </button>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              ref="cacFile"
              class="hidden"
              @change="handleCACUpload"
            />
          </div>

          <button :disabled="savingBusinessloading === 'Saving...' "
            @click="saveBusiness"
            class="w-full bg-green-600 text-white py-2 rounded-xl"
          >
         
            {{ savingBusinessloading ? 'Saving...' : 'Submit Verification' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import FaceVerify from '@/components/FaceVerify.vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const { $toast } = useNuxtApp()
const props = defineProps({
  kycType: { type: String, default: 'individual' },
  isVerify:{type: Boolean, default: false }
})

const emit = defineEmits(['update:isVerify'])
const verifyLabel = ref('')
const isLoading = ref(false)
const onVerify = ref(true)
/* ---------------- STATE ---------------- */

const open = ref(false)
const step = ref('form')
const faceRef = ref(null)
const savingBusinessloading = ref(false)
const kycStatus = ref('idle') 
// 'idle' | 'loading' | 'verified'

const form = ref({
  nin: '',
  phone: '',
  ninImage: null,
  faceImage: null,
  faceVector: null,
  businessName: '',
  cacNumber: '',
  cacImage: null
})

/* ---------------- COMPUTED BUTTON ---------------- */



watch(
  () => props.kycType,
  (newType, oldType) => {
    // ✅ do something here when kycType changes
 
    verifyLabel.value = newType === 'individual' ? 'Verify Identity' : 'Verify Business'
    // example actions:
    step.value = 'form'
    open.value = false
  },
  { immediate: true } // runs once on mount too
)


const isDisabled = computed(() =>
  kycStatus.value === 'loading' || kycStatus.value === 'verified'
)

/* ---------------- HELPERS ---------------- */

const onlyNumber = f => {
  form.value[f] = form.value[f].replace(/[^0-9]/g, '')
}

const base64ToFile = async (b64, name) => {
  const res = await fetch(b64)
  const blob = await res.blob()
  return new File([blob], name, { type: blob.type })
}

/* ---------------- START VERIFICATION ---------------- */

const startverification = async () => {
  verifyLabel.value = 'Loading...'

  try {
    const res = await useApiFetch('/kyc', { method: 'GET' })
    const data = res.data
    console.log(res);
    if (!res?.data?.nin || !res?.data?.phone || !res?.data?.ninImage) {
       step.value  =  'form'
       open.value = true 
        verifyLabel.value = props.kycType === 'individual' ? 'Verify Identity' : 'Verify Business'
       return
    }
    if (!res?.data?.faceImage || !res?.data?.phone) {
       step.value  =  'instruction'
       open.value = true 
        verifyLabel.value = props.kycType === 'individual' ? 'Verify Identity' : 'Verify Business'
       return
    }
     if (props.kycType === 'business' && !res?.data?.business?.name) {
      step.value = 'business'
      open.value = true
      verifyLabel.value = 'Verify Business'
      return
    }

     if (res?.data?.nin && res?.data?.phone && res?.data?.ninImage && res?.data?.faceImage) {
      emit('update:isVerify', true) 
      verifyLabel.value = 'verified'
      emit('update:isVerify', true)
      
      return
      
    }
    // prefill
    form.value.nin = data.nin || ''
    form.value.phone = data.phone || ''
    form.value.ninImage = data.ninImage?.url || null
    form.value.cacImage = data.cacImage?.url || null
    form.value.businessName = data.business?.name || ''
    form.value.cacNumber = data.cacNumber || ''
    form.value.faceVector = data.faceVector || null
    form.value.faceImage = data.faceImage || null

    step.value = data.currentStep || 'form'
    if (!data.currentStep) {
      step.value  =  'form'
       open.value = true 
    }
  console.log(form.value, 'ddd');
  
    if (props.kycType === 'business' && !form.value.businessName) { 
      step.value = 'business' 
      verifyLabel.value = 'Verify Business'
      open.value = true 
      return
       
    }
    if (step.value === 'review') {
      console.log(data);
      
      verifyLabel.value = 'verified'
      emit('update:isVerify', true) 
      return
    }

    if (props.kycType === 'business' && !form.value.businessName) {
      step.value = 'business'
      return
    }

    open.value = true
    verifyLabel.value = 'verified'
   emit('update:isVerify', true) 

  } catch (e) {
    console.error(e)
    verifyLabel.value = 'try again'
  }
}

/* ---------------- SEND NIN ---------------- */

const toInstruction = async () => {
  try {
      isLoading.value = true
  const fd = new FormData()
  fd.append('nin', form.value.nin)
  fd.append('phone', form.value.phone)
    if(!form.value.nin || !form.value.phone || !form.value.ninImage) {
      $toast.error('Please fill all fields and upload NIN image')
      isLoading.value = false
      return
    }
        if(form.value.nin.length !== 11 || form.value.phone.length !== 11 ) {
      $toast.error('Please fill all fields and upload NIN image')
      isLoading.value = false
      return
    }
  if (form.value.ninImage?.startsWith('data:')) {
    const ninFile = await base64ToFile(form.value.ninImage, 'nin.jpg')
    fd.append('ninImage', ninFile)
  }

  await useApiFetch('/kyc/verify', { method: 'POST', body: fd })
  isLoading.value = false
  step.value = 'instruction'
  } catch (error) {
        isLoading.value = false
    $toast.error('Failed to submit NIN information')
  }

}

/* ---------------- FACE STEP ---------------- */

const startFace = () => {
  step.value = 'face'
  setTimeout(() => faceRef.value?.startVerification(), 100)
}

const handleFaceResult = async (data) => {
  onVerify.value = false
  form.value.faceImage = data.finalImage
  form.value.faceVector = data.vector
    console.log(data.vector);
    
  const fd = new FormData()
  if (data.vector) {
      fd.append('faceVector', JSON.stringify(data.vector))

  }

  if (data.finalImage?.startsWith('data:image')) {
    const faceFile = await base64ToFile(data.finalImage, 'face.jpg')
    fd.append('faceImage', faceFile)
  }


  try {
     await useApiFetch('/kyc/verify', { method: 'POST', body: fd })

  if (props.kycType === 'individual') {
  verifyLabel.value = 'verified'
  props.isVerify = true
   onVerify.value = true
   console.log( props.isVerify);
   
    step.value = 'review'
    open.value = false
  } else {
    step.value = 'business'
  }
  } catch (error) {
    console.log(error);
      verifyLabel.value = 'try again'
      open.value = false
       onVerify.value = true
  }
 
}

/* ---------------- IMAGE UPLOADS ---------------- */

const handleNinUpload = e => {
  const file = e.target.files[0]
  if (!file) return
  const r = new FileReader()
  r.onload = () => form.value.ninImage = r.result
  r.readAsDataURL(file)
  e.target.value = ''
}

const handleCACUpload = e => {
  const file = e.target.files[0]
  if (!file) return
  const r = new FileReader()
  r.onload = () => form.value.cacImage = r.result
  r.readAsDataURL(file)
  e.target.value = ''
}

const cancelNinImage = () => form.value.ninImage = null
const cancelCACImage = () => form.value.cacImage = null

/* ---------------- SAVE BUSINESS ---------------- */

const saveBusiness = async () => {
  savingBusinessloading.value = true
  const fd = new FormData()
  fd.append('businessName', form.value.businessName)
  fd.append('cacNumber', form.value.cacNumber)
 fd.append('kycType', props.kycType)
  if (form.value.cacImage?.startsWith('data:image')) {
    const cacFile = await base64ToFile(form.value.cacImage, 'cac.jpg')
    fd.append('cacImage', cacFile)
  }
try {
 await useApiFetch('/kyc/verify', { method: 'POST', body: fd })
savingBusinessloading.value = false
  kycStatus.value = 'verified'
  props.isVerify = true
  open.value = false
} catch (error) {
  savingBusinessloading.value = false
}


}
</script>