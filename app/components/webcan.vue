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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as faceapi from 'face-api.js'

/* ================= REFS ================= */
const video = ref(null)
const canvas = ref(null)
const statusMessage = ref('Loading camera...')
const started = ref(false)
const finished = ref(false)
const currentmessage = ref('Initializing Face Capture...')

let stream = null
let detector = null
let animationId = null

const loading = ref(true)
const retryCapture = ref(false)

/* ================= PERFORMANCE ================= */
let lastRun = 0
const FPS = 12

/* ================= STEP CONTROL ================= */
const STABLE_FRAMES = 8
let step = 0
let stepsList = []

let leftCount = 0
let rightCount = 0
let blinkCount = 0
let mouthCount = 0

let tooFar = false

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

stepsList = pickRandomInstructions()

const instructionText = {
  left: '👉 Turn your head LEFT',
  right: '👉 Turn your head RIGHT',
  blink: '👉 BLINK your eyes',
  mouth: '👉 OPEN your mouth',
  done: '✅ Verification Complete!'
}

const updateInstruction = () => {
  let newMessage = ''

  if (step >= stepsList.length) {
    newMessage = instructionText.done
  } else if (tooFar) {
    newMessage = '⚠️ Move closer to the camera'
  } else {
    newMessage = instructionText[stepsList[step]]
  }

  if (statusMessage.value !== newMessage) {
    statusMessage.value = newMessage
  }
}

/* ================= CAMERA ================= */
const startCamera = async () => {
  step = 0
  leftCount = rightCount = blinkCount = mouthCount = 0

  stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 320 },
      height: { ideal: 320 },
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

  // face-api loads (only used at the end)
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
}

/* ================= HELPERS ================= */
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)

const NOSE = 1
const LC = 234
const RC = 454

const L_TOP = 386, L_BOT = 374, L_L = 263, L_R = 362
const R_TOP = 159, R_BOT = 145, R_L = 33,  R_R = 133

const M_TOP = 0, M_BOT = 17, M_L = 61, M_R = 291

const MIN_FACE_WIDTH = 80

const getHeadDirection = (face) => {
  const k = face.keypoints
  const ratio = (k[NOSE].x - k[LC].x) / (k[RC].x - k[LC].x)

  if (ratio > 0.8) return 'left'
  if (ratio < 0.3) return 'right'
  return 'center'
}

const isBlink = (face) => {
  const k = face.keypoints
  const rightEAR = dist(k[L_TOP], k[L_BOT]) / dist(k[L_L], k[L_R])
  const leftEAR  = dist(k[R_TOP], k[R_BOT]) / dist(k[R_L], k[R_R])
  return ((leftEAR + rightEAR) / 2) < 0.23
}

const isMouthOpen = (face) => {
  const k = face.keypoints
  return dist(k[M_TOP], k[M_BOT]) / dist(k[M_L], k[M_R]) > 0.8
}

const isFaceCloseEnough = (face) => {
  const k = face.keypoints
  return dist(k[33], k[263]) >= MIN_FACE_WIDTH
}

/* ================= DRAW LIGHT ================= */
const drawBox = (face, ctx) => {
  const box = face.box
  ctx.strokeStyle = 'lime'
  ctx.lineWidth = 2
  ctx.strokeRect(box.xMin, box.yMin, box.width, box.height)
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

  const ctx = tempCanvas.getContext('2d')
  ctx.drawImage(video.value, 0, 0)

  return tempCanvas.toDataURL('image/png')
}

/* ================= DETECT LOOP ================= */
const detect = async (time) => {
  if (time - lastRun < 1000 / FPS) {
    animationId = requestAnimationFrame(detect)
    return
  }

  lastRun = time

  if (!video.value || video.value.readyState !== 4) {
    animationId = requestAnimationFrame(detect)
    return
  }

  const faces = await detector.estimateFaces(video.value)

  const ctx = canvas.value.getContext('2d')
  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  if (faces.length && step < stepsList.length) {
    const face = faces[0]

    if (!isFaceCloseEnough(face)) {
      tooFar = true
      updateInstruction()
      animationId = requestAnimationFrame(detect)
      return
    } else {
      tooFar = false
    }

    const current = stepsList[step]

    if (current !== 'left') leftCount = 0
    if (current !== 'right') rightCount = 0
    if (current !== 'blink') blinkCount = 0
    if (current !== 'mouth') mouthCount = 0

    let passed = false

    if (current === 'left' && getHeadDirection(face) === 'left') {
      if (++leftCount > STABLE_FRAMES) passed = true
    }

    if (current === 'right' && getHeadDirection(face) === 'right') {
      if (++rightCount > STABLE_FRAMES) passed = true
    }

    if (current === 'blink' && isBlink(face)) {
      if (++blinkCount > STABLE_FRAMES) passed = true
    }

    if (current === 'mouth' && isMouthOpen(face)) {
      if (++mouthCount > STABLE_FRAMES) passed = true
    }

    if (passed) {
      step++
      updateInstruction()

      await new Promise(r => setTimeout(r, 400))

      if (step >= stepsList.length) {
        loading.value = true
        currentmessage.value = 'Processing...'

        const finalImage = captureCleanImage()

        // STOP camera BEFORE heavy AI
        stopCamera()

        const vector = await getFaceVectorFromVideo()

        if (!vector) {
          currentmessage.value = '❌ Face not detected properly, click retry'
          retryCapture.value = true
          loading.value = true
          return
        }

        emit('completed', { finalImage, vector })

        finished.value = true
        started.value = false
        loading.value = false
      }
    }

    drawBox(face, ctx)
  }

  animationId = requestAnimationFrame(detect)
}

/* ================= CONTROL ================= */
const stopCamera = () => {
  stream?.getTracks().forEach(t => t.stop())
  cancelAnimationFrame(animationId)
}

const startVerification = async () => {
  started.value = true
  finished.value = false
  loading.value = true
  retryCapture.value = false

  stepsList = pickRandomInstructions()

  await startCamera()
  await loadModel()

  loading.value = false
  updateInstruction()
  detect()
}

/* ================= INIT ================= */
onBeforeUnmount(stopCamera)

defineExpose({ startVerification })
</script>

<style scoped>
.mirror {
  transform: scaleX(-1);
}
</style>