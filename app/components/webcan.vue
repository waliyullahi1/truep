<template>
  <div class="flex flex-col items-center justify-center relative w-full h-[500px]">
    <!-- VIDEO -->
    <video
      ref="video"
      autoplay
      playsinline
      muted
      class="absolute w-[640px] h-[480px] mirror rounded-lg"
    ></video>

    <!-- CANVAS -->
    <canvas
      ref="canvas"
      class="absolute w-[640px] h-[480px]"
    ></canvas>

    <!-- STATUS -->
    <div class="absolute bottom-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
      {{ statusMessage }}
    </div>
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

let stream = null
let detector = null
let animationId = null

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

stepsList = pickRandomInstructions()

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
  stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 480, facingMode: 'user' },
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

  console.log('Nose ratio:', ratio.toFixed(2))

  // 👇 THESE ARE THE LINES YOU WANT
  if ( ratio > 0.8) {
    console.log('✅ HEAD FULL LEFT REACHED')
    return 'left'
  }

  if (ratio < 0.1) {
    console.log('✅ HEAD FULL RIGHT REACHED')
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
  return ratio > 0.88
}

const isFaceCloseEnough = (face) => {
  const k = face.keypoints
  const left = k[33]
  const right = k[263]
  return dist(left, right) >= MIN_FACE_WIDTH
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
const getFaceVector = async (imgBase64) => {
  const img = new Image()
  img.src = imgBase64
  await img.decode()
  const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
  return detection?.descriptor || null
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

     if (!isFaceCloseEnough(face)) {
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

    const current = stepsList[step]

      // reset counts for non-relevant actions
      if (current !== 'left') leftCount = 0
      if (current !== 'right') rightCount = 0
      if (current !== 'blink') blinkCount = 0
      if (current !== 'mouth') mouthCount = 0

      let passed = false
      if (current === 'left' && getHeadDirection(face) === 'left') {
        leftCount++
        if (leftCount > STABLE_FRAMES) passed = true
      }
      if (current === 'right' && getHeadDirection(face) === 'right') {
        rightCount++
        if (rightCount > STABLE_FRAMES) passed = true
      }
      if (current === 'blink' && isBlink(face)) {
        blinkCount++
        if (blinkCount > STABLE_FRAMES) passed = true
      }
      if (current === 'mouth' && isMouthOpen(face)) {
        mouthCount++
        if (mouthCount > STABLE_FRAMES) passed = true
      }

      if (passed) {
       
        step++
        updateInstruction()

        // if finished all steps, send last image + vector to backend
      if (step >= stepsList.length) {
        // ✅ Capture ONLY ONCE here
        const finalImage = canvas.value.toDataURL('image/png')

        const vector = await getFaceVector(finalImage)

        await fetch('/api/verify-face', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: finalImage,
            vector: Array.from(vector || [])
          })
        })

        statusMessage.value = '✅ Verification Complete!'
        console.log('Only ONE face image sent to backend')
      }
      }
    }
  }

  drawMesh(faces, ctx, canvas.value.width)
  animationId = requestAnimationFrame(detect)
}

/* ================= CLEANUP ================= */
const stopCamera = () => {
  stream?.getTracks().forEach(t => t.stop())
  cancelAnimationFrame(animationId)
}

/* ================= INIT ================= */
onMounted(async () => {
  await startCamera()
  await loadModel()
  updateInstruction()
  detect()
})

onBeforeUnmount(stopCamera)
</script>

<style scoped>
.mirror {
  transform: scaleX(-1);
}
</style>