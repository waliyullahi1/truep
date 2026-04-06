<template>
  <div>
    <!-- OPEN BUTTON -->
    <button @click="openModal" class="bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h4l2-2h6l2 2h4v10H3V7z" />
      </svg>
      Verify Identity
    </button>

    <!-- MODAL -->
    <div v-if="open" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-md rounded-2xl p-6 space-y-5 shadow-xl">

        <!-- HEADER -->
        <div class="flex justify-between items-center">
          <h2 class="font-semibold text-lg">KYC Verification</h2>
          <button @click="open = false">✕</button>
        </div>

        <!-- INPUTS -->
        <input v-model="nin" placeholder="Enter NIN" maxlength="11"
          @input="nin = nin.replace(/[^0-9]/g, '')"
          class="w-full border rounded-lg p-2" />

        <input v-model="phone" placeholder="Phone Number" maxlength="11"
          @input="phone = phone.replace(/[^0-9]/g, '')"
          class="w-full border rounded-lg p-2" />

        <!-- NIN UPLOAD -->
        <div>
          <label class="text-sm">Upload NIN Slip</label>
          <input type="file" accept="image/*" @change="handleNinUpload" />
        </div>

        <!-- FACE CAPTURE BUTTON -->
        <button @click="startCamera" class="w-full bg-blue-600 text-white py-2 rounded-lg">
          Start Face Capture
        </button>

        <!-- PREVIEW -->
        <img v-if="ninImage" :src="ninImage" class="rounded-lg" />
        <img v-if="faceImage" :src="faceImage" class="rounded-lg" />

        <!-- SUBMIT -->
        <button @click="submit" class="w-full bg-green-600 text-white py-2 rounded-lg">
          Submit Verification
        </button>
      </div>
    </div>

    <!-- CAMERA -->
    <div v-if="camera" class="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <video ref="video" autoplay playsinline class="w-full max-w-md rounded-lg"></video>

      <p class="text-white mt-3">Face Capture ({{ captureCount }}/3)</p>

      <button @click="capture" class="mt-4 bg-white px-6 py-2 rounded-lg">
        Capture
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
const camera = ref(false)

const nin = ref('')
const phone = ref('')

const ninImage = ref(null)
const faceImages = ref([])
const faceImage = ref(null)

const captureCount = ref(0)

const video = ref(null)
let stream = null

const openModal = () => open.value = true

/* NIN UPLOAD */
const handleNinUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    ninImage.value = reader.result
  }
  reader.readAsDataURL(file)
}

/* START CAMERA */
const startCamera = async () => {
  camera.value = true
  captureCount.value = 0
  faceImages.value = []

  stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
  video.value.srcObject = stream
}

/* CAPTURE 3 TIMES */
const capture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = video.value.videoWidth
  canvas.height = video.value.videoHeight

  const ctx = canvas.getContext('2d')
  ctx.drawImage(video.value, 0, 0)

  const img = canvas.toDataURL('image/png')

  faceImages.value.push(img)
  captureCount.value++

  if (captureCount.value === 3) {
    faceImage.value = faceImages.value[2] // last one
    stream.getTracks().forEach(t => t.stop())
    camera.value = false
  }
}

/* SUBMIT */
const submit = async () => {
  if (!ninImage.value || !faceImage.value) {
    alert('Upload NIN and capture face')
    return
  }

  await fetch('/api/kyc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nin,
      phone,
      ninImage: ninImage.value,
      faceImage: faceImage.value
    })
  })
}
</script>
