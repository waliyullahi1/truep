<template>
<div  v-if="started" class="flex flex-col items-center justify-center w-full h-[400px]">

  <!-- START BUTTON -->
  <!-- <button
    v-if="!started && !finished"
    @click="startVerification"
    class="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
  >
    ▶ Start Verification
  </button> -->

  <!-- CAMERA -->
  <div v-if="loading" class=" z-30 mb-12 flex  flex-col justify-center items-center  bg-white absolute w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-green-400 shadow-lg">
   <div class=" flex flex-col items-center ">
   <img src="/image/icon/loading.svg"/> 
    <div>
    {{currentmessage}}
    </div>
  </div>
     <button v-if="retryCapture"
    @click="startVerification"
    class="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
  >
     Retry Capture
  </button>
  
  </div>
  <div v-if="started" class="relative w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-green-400 shadow-lg">

    <video
      ref="video"
      autoplay
      playsinline
      muted
        
      class="absolute w-full h-full object-cover mirror"
    ></video>

    <canvas
      ref="canvas"
      class="absolute w-full h-full"
    ></canvas>

  </div>

  <!-- STATUS -->
  <div v-if="started" class="mt-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded">
    {{ statusMessage }}
  </div>

  <!-- DONE MESSAGE -->
    <div v-if="finished" class="text-green-600">
    ✅ Done
  </div>
  <!-- <div v-if="finished" class="text-green-600 text-lg font-semibold">
    ✅ Verification Completed Successfully
  </div> -->

</div>
 
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'
import * as faceapi from 'face-api.js'
/* ================= REFS ================= */
const video = ref(null)
const canvas = ref(null)
const statusMessage = ref('')
const started = ref(false)
const finished = ref(false)
const loading = ref(true)
const retryCapture = ref(false)
const currentmessage = ref('Initializing Face Capture')

let stream = null
let animationId = null
let faceLandmarker = null
let modelLoaded = false
let tooFar = false

/* ================= STEP CONTROL ================= */
const STABLE_FRAMES = 10
let step = 0
let leftCount = 0
let rightCount = 0
let blinkCount = 0
let mouthCount = 0

let stepsList = []

const instructionText = {
  left: '👉 Turn your head LEFT',
  right: '👉 Turn your head RIGHT',
  mouth: '👉 OPEN your mouth',
  blink: '👉 BLINK your eyes',
  done: '✅ Verification Complete!'
}

const updateInstruction = () => {
  if (step >= stepsList.length) {
    statusMessage.value = instructionText.done
    return
  }
  statusMessage.value = tooFar
    ? '⚠️ Move closer to camera'
    : instructionText[stepsList[step]]
}


const drawMesh = (landmarks) => {
  const ctx = canvas.value.getContext('2d')
  const w = canvas.value.width
  const h = canvas.value.height

  ctx.clearRect(0, 0, w, h)

  ctx.strokeStyle = '#00FF00'
  ctx.lineWidth = 1

  for (const point of landmarks) {
    const x = (1 - point.x) * w   // mirror X
    const y = point.y * h

    ctx.beginPath()
    ctx.arc(x, y, 1.5, 0, 2 * Math.PI)
    ctx.stroke()
  }
}

const generateSteps = () => {
  const pool = ['left', 'right', 'mouth']

  // shuffle
  const shuffled = pool.sort(() => Math.random() - 0.5)

  // pick first 2 randomly
  const selected = shuffled.slice(0, 2)

  // always add blink last
  return [...selected, 'blink']
}

const getFaceVectorFromVideo = async () => {
  const detection = await faceapi
    .detectSingleFace(video.value)
    .withFaceLandmarks()
    .withFaceDescriptor()

  if (!detection) return null

  return Array.from(detection.descriptor)
}
/* ================= CAMERA ================= */
const startCamera = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'user', width: 480, height: 480 },
    audio: false
  })
  video.value.srcObject = stream
  await new Promise(r => (video.value.onloadedmetadata = r))
  canvas.value.width = video.value.videoWidth
canvas.value.height = video.value.videoHeight
}

/* ================= LOAD MODEL (ONCE) ================= */
const loadModel = async () => {
  if (modelLoaded) return

  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
  )

  faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task'
    },
    runningMode: 'VIDEO',
    numFaces: 1,
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true
  })

  modelLoaded = true
}

/* ================= CAPTURE ================= */
const captureCleanImage = () => {
  const c = document.createElement('canvas')
  c.width = video.value.videoWidth
  c.height = video.value.videoHeight
  c.getContext('2d').drawImage(video.value, 0, 0)
  return c.toDataURL('image/png')
}

const isMouthOpen = (face) => {
  const topLip = face[13]
  const bottomLip = face[14]
  return Math.abs(bottomLip.y - topLip.y) > 0.045
}

const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)

const isBlinking = (face) => {
  // LEFT EYE
  const leftTop = face[159]
  const leftBottom = face[145]
  const leftOuter = face[33]
  const leftInner = face[133]

  const leftEAR =
    dist(leftTop, leftBottom) / dist(leftOuter, leftInner)

  // RIGHT EYE
  const rightTop = face[386]
  const rightBottom = face[374]
  const rightOuter = face[263]
  const rightInner = face[362]

  const rightEAR =
    dist(rightTop, rightBottom) / dist(rightOuter, rightInner)

  const avgEAR = (leftEAR + rightEAR) / 2

  // blink threshold
  return avgEAR < 0.20
}

/* ================= DETECTION LOOP ================= */
const detect = () => {
  if (!video.value || video.value.readyState !== 4) {
    animationId = requestAnimationFrame(detect)
    return
  }

  const now = performance.now()
  const results = faceLandmarker.detectForVideo(video.value, now)

  if (!results.faceLandmarks.length) {
    animationId = requestAnimationFrame(detect)
    return
  }

  const face = results.faceLandmarks[0]
  drawMesh(face)
  const blend = results.faceBlendshapes[0].categories
  const matrix = results.facialTransformationMatrixes[0].data

  /* ===== Distance check (normalized coords) ===== */
  const left = face[33]
  const right = face[263]
  const faceWidth = Math.abs(left.x - right.x)

  if (faceWidth < 0.25) {
    tooFar = true
    updateInstruction()
    animationId = requestAnimationFrame(detect)
    return
  } else if (tooFar) {
    tooFar = false
    updateInstruction()
  }

  /* ===== Signals from MediaPipe ===== */
  const yaw = matrix[8]
  const isLeft = yaw > 0.35
  const isRight = yaw < -0.35

  const score = n => blend.find(b => b.categoryName === n)?.score || 0
  console.log('mouthOpen score:', score('mouthOpen'))
  const isBlink = isBlinking(face)
  const isMouth = isMouthOpen(face)

  const current = stepsList[step]

  if (current !== 'left') leftCount = 0
  if (current !== 'right') rightCount = 0
  if (current !== 'blink') blinkCount = 0
  if (current !== 'mouth') mouthCount = 0

  let passed = false

  if (current === 'left' && isLeft && ++leftCount > STABLE_FRAMES) passed = true
  if (current === 'right' && isRight && ++rightCount > STABLE_FRAMES) passed = true
  if (current === 'blink' && isBlink && ++blinkCount > STABLE_FRAMES) passed = true
if (current === 'mouth') {
  if (isMouth) {
    mouthCount++
    if (mouthCount > STABLE_FRAMES) passed = true
  } else {
    mouthCount = 0
  }
}

  if (passed) {
    step++
    updateInstruction()

    setTimeout(() => {
      if (step >= stepsList.length) {
        stopCamera()
        const finalImage = captureCleanImage()
    
        statusMessage.value = '✅ Verification Complete!'
        finished.value = true
        started.value = false

        emit('completed', { finalImage })
      }
    }, 400)
  }

  animationId = requestAnimationFrame(detect)
}

/* ================= CONTROL ================= */
const stopCamera = () => {
  stream?.getTracks().forEach(t => t.stop())
  cancelAnimationFrame(animationId)
}

const emit = defineEmits(['completed'])

const startVerification = async () => {
  started.value = true
  finished.value = false
  loading.value = true
  stepsList = generateSteps()
  step = 0

  console.log('Steps:', stepsList) // debug
  await loadModel()
  await startCamera()

  loading.value = false
  updateInstruction()
  detect()
}

onBeforeUnmount(stopCamera)

defineExpose({ startVerification })
</script>

<style scoped>
.mirror {
  transform: scaleX(-1);
}
</style>