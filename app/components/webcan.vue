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
     {{ loadingretrybutton? "Retry Capture" : 'processing' }}
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as faceapi from 'face-api.js'

let tooFar = false
const loadingretrybutton = ref(true)

/* ================= NEW: MODEL STATE ================= */
const modelsLoaded = ref(false)
let modelLoadingStarted = false

/* ================= REFS ================= */
const video = ref(null)
const canvas = ref(null)
const statusMessage = ref('Loading camera...')
const started = ref(false)
const finished = ref(false)
const currentmessage = ref('initializing Face Capture')
let stream = null
let detector = null
let animationId = null
const loading = ref(true)
const retryCapture = ref(false)

/* ================= STEP CONTROL ================= */
const STABLE_FRAMES = 10
const MIN_MOUTH_OPEN = 25
let step = 0
let stepsList = []

let leftCount = 0
let rightCount = 0
let blinkCount = 0
let mouthCount = 0
const capturedImages = []

/* ================= EMIT ================= */
const emit = defineEmits(['completed'])

/* ================= INSTRUCTIONS ================= */
const ALL_INSTRUCTIONS = ['left', 'right', 'blink', 'mouth']

const pickRandomInstructions = () => {
  const arr = [...ALL_INSTRUCTIONS]
  const result = []
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * arr.length)
    result.push(arr[idx])
    arr.splice(idx, 1)
  }
  return result
}

const generateSteps = () => {
  const actions = ['left', 'right', 'mouth']
  for (let i = actions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[actions[i], actions[j]] = [actions[j], actions[i]]
  }
  return [...actions, 'blink']
}

stepsList = generateSteps()

const instructionText = {
  left: '👉 Turn your head LEFT',
  right: '👉 Turn your head RIGHT',
  blink: '👉 BLINK your eyes',
  mouth: '👉 OPEN your mouth',
  done: '✅ Verification Complete!'
}

const updateInstruction = () => {
  if (step >= stepsList.length) {
    statusMessage.value = instructionText.done
    return
  }

  statusMessage.value = tooFar
    ? '⚠️ Move closer to the camera'
    : instructionText[stepsList[step]]
}

/* ================= CAMERA ================= */
const startCamera = async () => {
  step = 0
  leftCount = rightCount = blinkCount = mouthCount = 0

  stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 320 }, // 🔥 reduced for speed
      height: { ideal: 320 },
      aspectRatio: 1,
      facingMode: 'user'
    },
    audio: false
  })

  video.value.srcObject = stream
  return new Promise(resolve => {
    video.value.onloadedmetadata = resolve
  })
}

/* ================= MODEL ================= */
const loadModel = async () => {
  if (modelsLoaded.value) return

  const tf = await import('@tensorflow/tfjs')
  const faceLandmarksDetection = await import('@tensorflow-models/face-landmarks-detection')

  await tf.ready()

  detector = await faceLandmarksDetection.createDetector(
    faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
    {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
      refineLandmarks: true,
      maxFaces: 1
    }
  )

  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models')
  ])

  modelsLoaded.value = true
}

/* ================= NEW: BACKGROUND PRELOAD ================= */
const preloadModels = async () => {
  if (modelLoadingStarted) return
  modelLoadingStarted = true
  loadModel()
}

/* ================= HELPERS ================= */
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)

const NOSE = 1, LC = 234, RC = 454
const L_TOP = 386, L_BOT = 374, L_L = 263, L_R = 362
const R_TOP = 159, R_BOT = 145, R_L = 33, R_R = 133
const M_TOP = 0, M_BOT = 17, M_L = 61, M_R = 291
const MIN_FACE_WIDTH = 100

const getHeadDirection = (face) => {
  const k = face.keypoints
  const ratio = (k[NOSE].x - k[LC].x) / (k[RC].x - k[LC].x)
  if (ratio > 0.8) return 'left'
  if (ratio < 0.3) return 'right'
  return 'center'
}

const isBlink = (face) => {
  const k = face.keypoints
  const ear = (
    dist(k[L_TOP], k[L_BOT]) / dist(k[L_L], k[L_R]) +
    dist(k[R_TOP], k[R_BOT]) / dist(k[R_L], k[R_R])
  ) / 2
  return ear < 0.23
}

const isMouthOpen = (face) => {
  const k = face.keypoints
  return dist(k[M_TOP], k[M_BOT]) / dist(k[M_L], k[M_R]) > 0.6
}

const isFaceCloseEnough = (face) => {
  const k = face.keypoints
  return dist(k[33], k[263]) >= MIN_FACE_WIDTH
}

/* ================= CAPTURE ================= */
const getFaceVectorFromVideo = async () => {
  const detection = await faceapi
    .detectSingleFace(video.value)
    .withFaceLandmarks()
    .withFaceDescriptor()

  return detection ? Array.from(detection.descriptor) : null
}

const captureCleanImage = () => {
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = video.value.videoWidth
  tempCanvas.height = video.value.videoHeight
  tempCanvas.getContext('2d').drawImage(video.value, 0, 0)
  return tempCanvas.toDataURL('image/png')
}

/* ================= DETECT ================= */
const detect = async () => {
  if (!video.value || video.value.readyState !== 4) {
    animationId = requestAnimationFrame(detect)
    return
  }

  const faces = await detector.estimateFaces(video.value)

  if (faces.length && step < stepsList.length) {
    const face = faces[0]

    if (!isFaceCloseEnough(face)) {
      tooFar = true
      updateInstruction()
      return requestAnimationFrame(detect)
    }

    tooFar = false

    const current = stepsList[step]
    let passed = false

    if (current === 'left' && getHeadDirection(face) === 'left') passed = ++leftCount > STABLE_FRAMES
    if (current === 'right' && getHeadDirection(face) === 'right') passed = ++rightCount > STABLE_FRAMES
    if (current === 'blink' && isBlink(face)) passed = ++blinkCount > STABLE_FRAMES
    if (current === 'mouth' && isMouthOpen(face)) passed = ++mouthCount > STABLE_FRAMES

    if (passed) {
      step++
      updateInstruction()
      await new Promise(r => setTimeout(r, 300))

      if (step >= stepsList.length) {

        // 🔥 STOP CAMERA FIRST
        stopCamera()

        // 🔥 SHOW LOADING
        loading.value = true
        currentmessage.value = 'Processing...'
        await new Promise(r => setTimeout(r, 50))

        // 🔥 WAIT FOR MODEL IF NOT READY
        if (!modelsLoaded.value) {
          currentmessage.value = 'Preparing AI...'
          while (!modelsLoaded.value) {
            await new Promise(r => setTimeout(r, 100))
          }
        }

        const finalImage = captureCleanImage()

        let vector = await getFaceVectorFromVideo()

        if (!vector) {
          retryCapture.value = true
          return
        }

        emit('completed', { finalImage, vector })

        finished.value = true
        started.value = false
      }
    }
  }

  animationId = requestAnimationFrame(detect)
}

/* ================= CLEANUP ================= */
const stopCamera = () => {
  stream?.getTracks().forEach(t => t.stop())
  cancelAnimationFrame(animationId)
}

/* ================= START ================= */
const startVerification = async () => {
  loadingretrybutton.value = true
  started.value = true
  finished.value = false
  loading.value = true

  // 🔥 START MODEL LOADING IN BACKGROUND
  preloadModels()

  await startCamera()

  loading.value = false
  retryCapture.value = false
  currentmessage.value = 'Initializing Face Capture'

  updateInstruction()
  loadingretrybutton.value = false

  detect()
}

/* ================= INIT ================= */
onMounted(() => {
  preloadModels() // 🔥 preload immediately
})

onBeforeUnmount(stopCamera)

defineExpose({ startVerification })
</script>

<style scoped>
.mirror {
  transform: scaleX(-1);
}
</style>