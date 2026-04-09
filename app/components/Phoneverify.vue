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

        <!-- Show uploaded NIN -->
        <img v-if="ninImage" :src="ninImage" class="mt-2 rounded border" />

        <!-- Start Face Verification -->
        <button v-if="!camera" @click="startCamera" class="w-full bg-blue-600 text-white py-2 rounded">
          Start Face Verification
        </button>

        <!-- Retry Button -->
        <button v-if="faceImage" @click="resetFaceCapture"
          class="w-full bg-yellow-500 text-white py-2 rounded mt-2">
          Retry Face Capture
        </button>

        <!-- Camera Preview -->
        <div v-show="camera" class="relative mt-2">
          <video ref="video" autoplay playsinline class="w-full max-w-md rounded"></video>
          <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
        </div>

        <!-- Current Step Instruction -->
        <p class="text-center text-gray-700 font-semibold mt-2">{{ instruction }}</p>

        <!-- Show captured face -->
        <img v-if="faceImage" :src="faceImage" class="mt-2 rounded border" />

        <!-- Submit -->
        <button @click="submit" class="w-full bg-green-600 text-white py-2 rounded mt-2">
          Submit
        </button>

        <!-- Close Modal -->
        <button @click="open = false" class="absolute top-2 right-2 text-gray-600">✖</button>
      </div>
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

// Steps text
const stepsText = ['Align your face', 'Turn your head LEFT', 'Turn your head RIGHT', 'Blink your eyes']

const openModal = () => open.value = true

// Handle NIN upload
const handleNinUpload = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = () => ninImage.value = reader.result
  reader.readAsDataURL(file)
}

// Start camera
const startCamera = async () => {
  camera.value = true
  step.value = 0
  instruction.value = stepsText[0]

  await nextTick() // wait for DOM

  if (!video.value) return

  // Stop previous camera if any
  if (cam) cam.stop()
  if (faceMesh) faceMesh.close?.()

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

// Handle face mesh results
const onResults = (results) => {
  if (!results.multiFaceLandmarks?.length) {
    instruction.value = 'No face detected'
    return
  }

  const ctx = canvas.value.getContext('2d')
  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  const landmarks = results.multiFaceLandmarks[0]

  // Draw face mesh
  ctx.strokeStyle = 'lime'
  landmarks.forEach(p => {
    ctx.beginPath()
    ctx.arc(p.x * canvas.value.width, p.y * canvas.value.height, 1, 0, 2 * Math.PI)
    ctx.stroke()
  })

  const nose = landmarks[1]

  // Step logic
  if (step.value === 0) {
    instruction.value = stepsText[0]
    step.value = 1 // move to next step
  } else if (step.value === 1 && nose.x < 0.4) {
    instruction.value = stepsText[1]
    step.value = 2
  } else if (step.value === 2 && nose.x > 0.6) {
    instruction.value = stepsText[2]
    step.value = 3
  } else if (step.value === 3) {
    instruction.value = stepsText[3]
    // Blink detection
    const leftEyeTop = landmarks[159]
    const leftEyeBottom = landmarks[145]
    const eyeOpen = Math.abs(leftEyeTop.y - leftEyeBottom.y)
    if (eyeOpen < 0.01) {
      captureFace()
    }
  }
}

// Capture face image
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

// Retry capture
const resetFaceCapture = async () => {
  if (cam) cam.stop()
  camera.value = false
  faceImage.value = null
  step.value = 0
  instruction.value = stepsText[0]
  await nextTick()
  startCamera()
}

// Submit data to backend
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
  open.value = false
}
</script>

<style scoped>
video {
  border-radius: 0.5rem;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>