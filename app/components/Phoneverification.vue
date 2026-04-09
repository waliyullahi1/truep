<template>
  <div>
    <!-- Open Modal -->
    <button @click="openModal" class="bg-slate-800 text-white px-4 py-2 rounded-lg">
      Verify Identity
    </button>

    <!-- Modal -->
    <div v-if="open" overflow-y-scroll  class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white  h-80  overflow-y-scroll w-full max-w-md p-6 rounded-xl space-y-4 relative">

        <h2 class="text-lg font-semibold">KYC Verification</h2>

        <!-- Inputs -->
        <input v-model="nin" placeholder="Enter NIN" maxlength="11"
          @input="nin = nin.replace(/[^0-9]/g, '')"
          class="w-full border p-2 rounded" />

        <input v-model="phone" placeholder="Phone Number" maxlength="11"
          @input="phone = phone.replace(/[^0-9]/g, '')"
          class="w-full border p-2 rounded" />

        <!-- NIN Upload -->
        <input type="file" accept="image/*" @change="handleNinUpload" />
        <img v-if="ninImage" :src="ninImage" class="rounded border mt-2" />

        <!-- Start Camera -->
        <button v-if="!camera" @click="startCamera"
          class="w-full bg-blue-600 text-white py-2 rounded">
          Start Face Verification
        </button>

        <!-- Retry -->
        <button v-if="faceImage" @click="resetFace"
          class="w-full bg-yellow-500 text-white py-2 rounded">
          Retry
        </button>

        <!-- Camera -->
        <div v-show="camera" class="relative">
          <video ref="video" autoplay playsinline class="w-full rounded"></video>
          <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
        </div>

        <!-- Instruction -->
        <p class="text-center font-semibold">{{ instruction }}</p>

        <!-- Result -->
        <img v-if="faceImage" :src="faceImage" class="rounded border" />

        <!-- Submit -->
        <button @click="submit"
          class="w-full bg-green-600 text-white py-2 rounded">
          Submit
        </button>

        <button @click="open = false"
          class="absolute top-2 right-2">✖</button>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { FaceMesh } from '@mediapipe/face_mesh'
import { Camera } from '@mediapipe/camera_utils'
import * as faceapi from 'face-api.js'

/* ================= STATE ================= */
const open = ref(false)
const camera = ref(false)
const nin = ref('')
const phone = ref('')
const ninImage = ref(null)
const faceImage = ref(null)
const faceVector = ref(null)

const video = ref(null)
const canvas = ref(null)

let faceMesh = null
let cam = null

/* ================= ACTIONS ================= */
const actions = [
  { name: 'LEFT', text: 'Turn your head LEFT' },
  { name: 'RIGHT', text: 'Turn your head RIGHT' },
  { name: 'BLINK', text: 'Blink BOTH eyes' },
  { name: 'MOUTH', text: 'Open your mouth' }
]

const sequence = ref([])
const currentIndex = ref(0)
const instruction = ref('Align your face inside the box')

/* ================= LOAD MODELS ================= */
onMounted(async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
})

/* ================= UI ================= */
const openModal = () => open.value = true

const handleNinUpload = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = () => ninImage.value = reader.result
  reader.readAsDataURL(file)
}

/* ================= START CAMERA ================= */
const startCamera = async () => {
  stopCamera()
  camera.value = true
  faceImage.value = null
  await nextTick()

  sequence.value = [...actions].sort(() => 0.5 - Math.random()).slice(0, 3)
  currentIndex.value = 0
  instruction.value = sequence.value[0].text

  if (!faceMesh) {
    faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    })
    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true })
    faceMesh.onResults(onResults)
  }

  cam = new Camera(video.value, {
    onFrame: async () => await faceMesh.send({ image: video.value }),
    width: 640,
    height: 480
  })
  cam.start()
}

/* ================= STOP CAMERA ================= */
const stopCamera = () => {
  if (cam) {
    cam.stop()
    cam = null
  }
  if (video.value?.srcObject) {
    video.value.srcObject.getTracks().forEach(t => t.stop())
    video.value.srcObject = null
  }
}

/* ================= HELPERS ================= */
const isCentered = (nose, w, h) => {
  const x = nose.x * w
  const y = nose.y * h
  return x > w * 0.3 && x < w * 0.7 && y > h * 0.3 && y < h * 0.7
}

const faceSizeOk = (landmarks) => {
  const left = landmarks[234]
  const right = landmarks[454]
  const width = Math.abs(right.x - left.x)
  return width > 0.25
}

const getYaw = (landmarks) => {
  const nose = landmarks[1]
  const left = landmarks[234]
  const right = landmarks[454]
  const leftDist = nose.x - left.x
  const rightDist = right.x - nose.x
  return leftDist / (leftDist + rightDist)
}

const blinkDetected = (landmarks) => {
  const leftEye = Math.abs(landmarks[159].y - landmarks[145].y)
  const rightEye = Math.abs(landmarks[386].y - landmarks[374].y)
  return leftEye < 0.008 && rightEye < 0.008
}

const mouthOpenDetected = (landmarks) => {
  const mouth = Math.abs(landmarks[13].y - landmarks[14].y)
  return mouth > 0.06
}

/* ================= DETECTION ================= */
const onResults = (results) => {
  if (!results.multiFaceLandmarks?.length) {
    instruction.value = 'No face detected'
    return
  }

  const ctx = canvas.value.getContext('2d')
  const w = video.value.videoWidth
  const h = video.value.videoHeight
  canvas.value.width = w
  canvas.value.height = h
  ctx.clearRect(0, 0, w, h)

  const landmarks = results.multiFaceLandmarks[0]
  const nose = landmarks[1]

  // draw guide box
  ctx.strokeStyle = 'yellow'
  ctx.strokeRect(w * 0.3, h * 0.3, w * 0.4, h * 0.4)

  if (!isCentered(nose, w, h)) {
    instruction.value = 'Center your face'
    return
  }

  if (!faceSizeOk(landmarks)) {
    instruction.value = 'Move closer to camera'
    return
  }

  const action = sequence.value[currentIndex.value]
  if (!action) return

  const yaw = getYaw(landmarks)

  if (action.name === 'LEFT' && yaw < 0.38) nextStep()
  else if (action.name === 'RIGHT' && yaw > 0.62) nextStep()
  else if (action.name === 'BLINK' && blinkDetected(landmarks)) nextStep()
  else if (action.name === 'MOUTH' && mouthOpenDetected(landmarks)) nextStep()
}

/* ================= NEXT STEP ================= */
const nextStep = () => {
  currentIndex.value++
  if (currentIndex.value >= sequence.value.length) {
    saveFaceData()
  } else {
    instruction.value = sequence.value[currentIndex.value].text
  }
}

/* ================= FACE VECTOR ================= */
const saveFaceData = async () => {
  instruction.value = 'Capturing face...'

  const detection = await faceapi
    .detectSingleFace(video.value)
    .withFaceLandmarks()
    .withFaceDescriptor()

  if (!detection) {
    instruction.value = 'Face not clear. Retry'
    return
  }

  faceVector.value = Array.from(detection.descriptor)
  captureFace()
}

/* ================= CAPTURE ================= */
const captureFace = () => {
  const c = document.createElement('canvas')
  c.width = video.value.videoWidth
  c.height = video.value.videoHeight
  c.getContext('2d').drawImage(video.value, 0, 0)
  faceImage.value = c.toDataURL('image/png')
  stopCamera()
  camera.value = false
  instruction.value = 'Face captured ✅'
}

/* ================= RETRY ================= */
const resetFace = async () => {
  faceImage.value = null
  await nextTick()
  startCamera()
}

/* ================= SUBMIT ================= */
const submit = async () => {
  if (!nin.value || !phone.value || !ninImage.value || !faceImage.value) {
    alert('Complete all steps')
    return
  }

  await fetch('/api/kyc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nin: nin.value,
      phone: phone.value,
      ninImage: ninImage.value,
      faceImage: faceImage.value,
      faceVector: faceVector.value
    })
  })

  alert('Submitted successfully')
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