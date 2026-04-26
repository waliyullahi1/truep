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
let tooFar = false
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
const MIN_MOUTH_OPEN = 25;
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

// pick random 3 instructions without duplicates
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

  // shuffle only first steps
  for (let i = actions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[actions[i], actions[j]] = [actions[j], actions[i]]
  }

  // ALWAYS force blink last
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

  const base = instructionText[stepsList[step]]

  if (tooFar) {
    statusMessage.value = `⚠️ Move closer to the camera `
  } else {
    statusMessage.value = base
  }
}

/* ================= CAMERA ================= */
const startCamera = async () => {
    step = 0
  leftCount = 0
  rightCount = 0
  blinkCount = 0
  mouthCount = 0
  stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 480 },
      height: { ideal: 480 },
      aspectRatio: 1, // ✅ forces square
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

  // load face-api models for embeddings
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
}

/* ================= HELPERS ================= */
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)

// head turn landmarks
const NOSE = 1
const LC = 234
const RC = 454

// eyes
const L_TOP = 386, L_BOT = 374, L_L = 263, L_R = 362
const R_TOP = 159, R_BOT = 145, R_L = 33,  R_R = 133

// mouth
const M_TOP = 0, M_BOT = 17, M_L = 61, M_R = 291

// minimal face width in pixels to consider "close enough"
const MIN_FACE_WIDTH = 100

const getHeadDirection = (face) => {
  const k = face.keypoints

  const noseX = k[NOSE].x
  const leftX = k[LC].x
  const rightX = k[RC].x

  // normalize nose position across the face
  const ratio = (noseX - leftX) / (rightX - leftX)

  // console.log('Nose ratio:', ratio.toFixed(2))

  // 👇 THESE ARE THE LINES YOU WANT
  if ( ratio > 0.8) {
    // console.log('✅ HEAD FULL LEFT REACHED')
    return 'left'
  }

  if (ratio < 0.3) {
    // console.log('✅ HEAD FULL RIGHT REACHED')
    return 'right'
  }

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
  const ratio = dist(k[M_TOP], k[M_BOT]) / dist(k[M_L], k[M_R])
  return ratio > 0.6
}

const isFaceCloseEnough = (face) => {
  const k = face.keypoints
  const left = k[33]
  const right = k[263]
  return dist(left, right) >= MIN_FACE_WIDTH
}


const isLowLight = (video) => {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  let totalBrightness = 0

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // luminance formula
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b
    totalBrightness += brightness
  }

  const avgBrightness = totalBrightness / (data.length / 4)

  console.log("Brightness:", avgBrightness)

  return avgBrightness < 60 // threshold (adjust if needed)
}

const isBlurry = (video) => {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  let variance = 0
  let mean = 0
  let values = []

  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3
    values.push(gray)
    mean += gray
  }

  mean /= values.length

  for (let v of values) {
    variance += (v - mean) ** 2
  }

  variance /= values.length

  console.log("Sharpness:", variance)

  return variance < 100 // adjust threshold
}
/* ================= DRAW ================= */
const drawMesh = (faces, ctx, width) => {
  ctx.save()
  ctx.scale(-1, 1)
  ctx.translate(-width, 0)

  for (const face of faces) {
    face.keypoints.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI)
      ctx.fillStyle = 'lime'
      ctx.fill()
    })
  }

  ctx.restore()
}

/* ================= CAPTURE ================= */
const captureFaceImage = () => {
  const img = canvas.value.toDataURL('image/png')
  capturedImages.push(img)
  console.log('Captured image', step, img)
}


/* generate embedding using face-api.js */
const getFaceVectorFromVideo = async () => {
  const detection = await faceapi
    .detectSingleFace(video.value)
    .withFaceLandmarks()
    .withFaceDescriptor()

  if (!detection) return null

  return Array.from(detection.descriptor)
}

const captureCleanImage = () => {
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = video.value.videoWidth
  tempCanvas.height = video.value.videoHeight

  const ctx = tempCanvas.getContext('2d')
  ctx.drawImage(video.value, 0, 0)

  return tempCanvas.toDataURL('image/png')
}

const resetVerification = async () => {
  // stop everything
  stopCamera()

  // reset state
  step = 0
  leftCount = 0
  rightCount = 0
  blinkCount = 0
  mouthCount = 0
  tooFar = false
started.value = false
  capturedImages.length = 0

  // pick new random steps again
  stepsList = pickRandomInstructions()

  // small delay (optional, smoother UX)
  statusMessage.value = '🔄 Restarting...'

  await new Promise(res => setTimeout(res, 1000))

  // restart
  await startVerification()
}
/* ================= DETECTION LOOP ================= */
const detect = async () => {
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

    // ================= TOO FAR CHECK =================
    if (!isFaceCloseEnough(face) ) {
      tooFar = true
      updateInstruction()

      drawMesh(faces, ctx, canvas.value.width)
      animationId = requestAnimationFrame(detect)
      return
    } else {
      if (tooFar) {
        tooFar = false
        updateInstruction()
      }
    }

    const current = stepsList[step]

    // reset counters
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

    // ================= STEP PASSED =================
    if (passed) {
      step++
      updateInstruction()

      // small delay (smooth UX)
      await new Promise(r => setTimeout(r, 400))

      // ================= FINAL STEP =================
      if (step >= stepsList.length) {
        // ✅ 1. STOP CAMERA IMMEDIATELY
        stopCamera()
        loading.value = true
        currentmessage.value = 'Processing...'
        statusMessage.value = 'Processing...'
        const finalImage = captureCleanImage()

        // ✅ GET VECTOR BEFORE STOPPING CAMERA
        let vector = await getFaceVectorFromVideo()

        // ✅ retry once if failed
        if (!vector) {
          await new Promise(r => setTimeout(r, 300))
          vector = await getFaceVectorFromVideo()
        }
        
        

        if (!vector) {
          currentmessage.value = '❌ Face not detected properly, click retry'
          statusMessage.value = '❌ Face not detected properly'
          retryCapture.value = true
          loading.value = true
          step = 0
          leftCount = 0
          rightCount = 0
          blinkCount = 0
          mouthCount = 0
            stopCamera()
          return
        }

        statusMessage.value = '✅ Verification Complete!'

        emit('completed', {
          finalImage,
          vector: Array.from(vector)
        })

        // ✅ STOP AFTER EVERYTHING
        stopCamera()

        finished.value = true
        started.value = false
      }
    }
  }

  // ================= DRAW =================
  // if (faces.length) {
  //   drawMesh(faces, ctx, canvas.value.width)
  // }

  animationId = requestAnimationFrame(detect)
}


/* ================= CLEANUP ================= */
const stopCamera = () => {
  stream?.getTracks().forEach(t => t.stop())
  cancelAnimationFrame(animationId)
}

const startVerification = async () => {
  started.value = true
  finished.value = false
  loading.value = true
  await startCamera()
  await loadModel()
  retryCapture.value = false
  currentmessage.value = 'Initializing Face Capture'
   loading.value = false 
  updateInstruction()
  detect()
}
/* ================= INIT ================= */
onMounted(async () => {
  // await startCamera()
  // await loadModel()
  // updateInstruction()
  // detect()
})

onBeforeUnmount(stopCamera)
defineExpose({
  startVerification
})
</script>

<style scoped>
.mirror {
  transform: scaleX(-1);
}
</style>