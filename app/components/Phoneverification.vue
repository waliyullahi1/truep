<template>
  <div>
    <!-- Open KYC Modal Button -->
    <button @click="openModal" class="bg-slate-800 text-white px-4 py-2 rounded-lg">
      Verify Identity
    </button>

    <!-- KYC Modal -->
    <div v-if="open" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-md p-6 rounded-xl space-y-4">

        <h2 class="text-lg font-semibold">KYC Verification</h2>

        <!-- NIN Input -->
        <input v-model="nin" placeholder="Enter NIN" maxlength="11"
          @input="nin = nin.replace(/[^0-9]/g, '')"
          class="w-full border p-2 rounded" />

        <!-- Phone Input -->
        <input v-model="phone" placeholder="Phone Number" maxlength="11"
          @input="phone = phone.replace(/[^0-9]/g, '')"
          class="w-full border p-2 rounded" />

        <!-- Upload NIN Image -->
        <input type="file" accept="image/*" @change="handleNinUpload" />

        <!-- Start Face Verification -->
        <button @click="startCamera" class="w-full bg-blue-600 text-white py-2 rounded">
          Start Face Verification
        </button>

        <!-- Preview Images -->
        <img v-if="ninImage" :src="ninImage" class="mt-2" />
        <img v-if="faceImage" :src="faceImage" class="mt-2" />

        <!-- Submit -->
        <button @click="submit" class="w-full bg-green-600 text-white py-2 rounded">
          Submit
        </button>
      </div>
    </div>

    <!-- Camera Section -->
    <div v-show="camera" class="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div class="relative">
        <video ref="video" autoplay playsinline class="w-full max-w-md rounded"></video>
        <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
      </div>
      <p class="text-white mt-3 text-center">{{ instruction }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { FaceMesh } from '@mediapipe/face_mesh'
import { Camera } from '@mediapipe/camera_utils'

const open = ref(false)
const camera = ref(false)

const nin = ref('')
const phone = ref('')
const ninImage = ref(null)
const faceImage = ref(null)

const video = ref(null)
const canvas = ref(null)
let faceMesh, cam

const step = ref(0)
const instruction = ref('Align your face')

const openModal = () => open.value = true

const handleNinUpload = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = () => ninImage.value = reader.result
  reader.readAsDataURL(file)
}

const startCamera = async () => {
  camera.value = true
  step.value = 0
  instruction.value = 'Align your face'

  await nextTick() // wait for video element

  if (!video.value) {
    console.error('Video element not ready')
    return
  }

  faceMesh = new FaceMesh({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
  })

  faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true })
  faceMesh.onResults(onResults)

  cam = new Camera(video.value, {
    onFrame: async () => {
      await faceMesh.send({ image: video.value })
    },
    width: 640,
    height: 480
  })

  cam.start()
}

const onResults = (results) => {
  const ctx = canvas.value.getContext('2d')
  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  if (!results.multiFaceLandmarks.length) {
    instruction.value = 'No face detected'
    return
  }

  const landmarks = results.multiFaceLandmarks[0]

  // Draw Face Mesh
  ctx.strokeStyle = 'lime'
  landmarks.forEach(p => {
    ctx.beginPath()
    ctx.arc(p.x * canvas.value.width, p.y * canvas.value.height, 1, 0, 2 * Math.PI)
    ctx.stroke()
  })

  const nose = landmarks[1]

  // Head Turn Detection
  if (step.value === 0 && nose.x < 0.4) {
    instruction.value = 'Turn head LEFT detected'
    step.value = 1
  } else if (step.value === 1 && nose.x > 0.6) {
    instruction.value = 'Turn head RIGHT detected'
    step.value = 2
  }

  // Blink Detection
  else if (step.value === 2) {
    instruction.value = 'Blink your eyes'
    const leftEyeTop = landmarks[159]
    const leftEyeBottom = landmarks[145]
    const eyeOpen = Math.abs(leftEyeTop.y - leftEyeBottom.y)
    if (eyeOpen < 0.01) {
      captureFace()
    }
  }
}

const captureFace = () => {
  const imgCanvas = document.createElement('canvas')
  imgCanvas.width = video.value.videoWidth
  imgCanvas.height = video.value.videoHeight
  const ictx = imgCanvas.getContext('2d')
  ictx.drawImage(video.value, 0, 0)
  faceImage.value = imgCanvas.toDataURL('image/png')

  cam.stop()
  camera.value = false
  instruction.value = 'Face captured ✅'
}

const submit = async () => {
  if (!nin.value || !phone.value || !ninImage.value || !faceImage.value) {
    alert('Please complete all verification steps')
    return
  }

  await fetch('/api/kyc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nin: nin.value, phone: phone.value, ninImage: ninImage.value, faceImage: faceImage.value })
  })
  alert('KYC submitted successfully')
}
</script>