<template>
  <div class="liveness-container">

    <h2>Face Verification</h2>

    <button v-if="!started" @click="startVerification">
      Start Verification
    </button>

    <div v-show="started" class="camera-frame">
      <video ref="video" autoplay playsinline muted></video>
      <div class="face-guide" :class="{ valid: isFaceValid }"></div>
    </div>

    <p class="instruction">{{ instruction }}</p>

    <p v-if="verified" class="success">✅ Verified</p>
    <p v-if="failed" class="fail">❌ Failed (Time expired)</p>

  </div>
</template>

<script>
import * as faceMeshPkg from "@mediapipe/face_mesh"
import * as cameraUtils from "@mediapipe/camera_utils"

const { Camera } = cameraUtils
const { FaceMesh } = faceMeshPkg

export default {

data(){
return{

started:false,

actions:[],
currentStep:0,
instruction:"",

verified:false,
failed:false,

/* calibration */
calibrating:true,
calibrationFrames:0,

baseEAR:0,
baseMouth:0,

blinkThreshold:0,
smileThreshold:0,

/* detection */
blinkFrames:0,
blinkCount:0,
requiredBlinks:2,
blinkCooldown:false,
holdCount:0,

prevEAR:0,

cameraInstance:null,

/* UX */
isFaceValid:false,

/* GLOBAL TIMEOUT */
timeoutTimer:null,
maxTime:30000,

/* STEP TIMER (NEW) */
stepTimer:null,
stepTimeLimit:7000 // 7 seconds per action

}
},

methods:{

async startVerification(){

this.started = true
await this.$nextTick()

this.startGlobalTimeout()

const video = this.$refs.video

const stream = await navigator.mediaDevices.getUserMedia({
video:{ facingMode:"user" },
audio:false
})

video.srcObject = stream
await video.play()

this.generateActions()

const faceMesh = new FaceMesh({
locateFile:(file)=>`https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
})

faceMesh.setOptions({
maxNumFaces:1,
refineLandmarks:true,
minDetectionConfidence:0.6,
minTrackingConfidence:0.6
})

faceMesh.onResults(this.onResults)

this.cameraInstance = new Camera(video,{
onFrame: async ()=> await faceMesh.send({image:video}),
width:400,
height:400
})

this.cameraInstance.start()
},

/* GLOBAL FAIL ONLY */
startGlobalTimeout(){
this.timeoutTimer = setTimeout(()=>{
if(!this.verified){
this.failed = true
this.stopCamera()
}
}, this.maxTime)
},

/* STEP RETRY SYSTEM */
startStepTimer(){
clearTimeout(this.stepTimer)

this.stepTimer = setTimeout(()=>{
// ⛔ DO NOT FAIL — just guide user
this.instruction = "Try again... " + this.instruction
this.startStepTimer() // restart timer
}, this.stepTimeLimit)
},

generateActions(){
const all = ["blink","left","right","smile"]
this.actions = all.sort(()=>Math.random()-0.5).slice(0,3)
},

updateInstruction(){
const action = this.actions[this.currentStep]

if(action==="blink") this.instruction=`Blink ${this.requiredBlinks} times`
if(action==="left") this.instruction="Turn LEFT"
if(action==="right") this.instruction="Turn RIGHT"
if(action==="smile") this.instruction="Smile"

this.startStepTimer()
},

/* POSITION CHECK */
checkFacePosition(landmarks){

const left = landmarks[234].x
const right = landmarks[454].x
const top = landmarks[10].y
const bottom = landmarks[152].y

const centerX = (left + right)/2
const centerY = (top + bottom)/2

const isCentered =
centerX > 0.4 && centerX < 0.6 &&
centerY > 0.35 && centerY < 0.65

const eyeDiffY = Math.abs(
landmarks[33].y - landmarks[263].y
)

const isStraight = eyeDiffY < 0.02

return isCentered && isStraight
},

getEAR(landmarks, left=true){

const eye = left
? [33,160,158,133,153,144]
: [362,385,387,263,373,380]

const v1 = Math.abs(landmarks[eye[1]].y - landmarks[eye[5]].y)
const v2 = Math.abs(landmarks[eye[2]].y - landmarks[eye[4]].y)
const h = Math.abs(landmarks[eye[0]].x - landmarks[eye[3]].x)

return (v1 + v2) / (2.0 * h)
},

onResults(results){

/* ❌ NO FACE */
if(!results.multiFaceLandmarks){
this.instruction = "No face detected"
this.isFaceValid = false
return
}

const landmarks = results.multiFaceLandmarks[0]

/* 📏 DISTANCE CHECK */
const faceWidth = Math.abs(landmarks[234].x - landmarks[454].x)

if(faceWidth < 0.15){
this.instruction = "Move closer"
return
}

if(faceWidth > 0.45){
this.instruction = "Move back"
return
}

/* 🎯 POSITION */
const valid = this.checkFacePosition(landmarks)
this.isFaceValid = valid

if(!valid){
this.instruction = "Center your face"
return
}

/* EAR */
const avgEAR = (
this.getEAR(landmarks,true) +
this.getEAR(landmarks,false)
)/2

const smoothEAR = (this.prevEAR * 0.7) + (avgEAR * 0.3)
this.prevEAR = smoothEAR

/* SMILE */
const mouthWidth = Math.abs(landmarks[61].x - landmarks[291].x)

/* TURN */
const left = landmarks[234].x
const right = landmarks[454].x
const nose = landmarks[1].x
const turnRatio = (nose - (left+right)/2)/(right-left)

/* CALIBRATION */
if(this.calibrating){

this.baseEAR += smoothEAR
this.baseMouth += mouthWidth
this.calibrationFrames++

this.instruction = "Stay still..."

if(this.calibrationFrames > 40){

this.baseEAR /= this.calibrationFrames
this.baseMouth /= this.calibrationFrames

this.blinkThreshold = this.baseEAR * 0.85
this.smileThreshold = this.baseMouth * 1.2

this.calibrating = false
this.updateInstruction()
}

return
}

/* ACTION */
const action = this.actions[this.currentStep]

/* BLINK */
if(action==="blink"){

if(smoothEAR < this.blinkThreshold){
this.blinkFrames++
}else{

if(this.blinkFrames > 1 && !this.blinkCooldown){

this.blinkCooldown = true
setTimeout(()=>this.blinkCooldown=false,800)

this.blinkCount++

if(this.blinkCount >= this.requiredBlinks){
this.blinkCount = 0
this.nextStep()
}

}

this.blinkFrames = 0
}
}

/* LEFT */
if(action==="left"){
if(turnRatio > 0.15) this.holdCount++
else this.holdCount=0

if(this.holdCount > 5) this.nextStep()
}

/* RIGHT */
if(action==="right"){
if(turnRatio < -0.15) this.holdCount++
else this.holdCount=0

if(this.holdCount > 5) this.nextStep()
}

/* SMILE */
if(action==="smile"){
if(mouthWidth > this.smileThreshold) this.holdCount++
else this.holdCount=0

if(this.holdCount > 5) this.nextStep()
}

},

nextStep(){

clearTimeout(this.stepTimer)

this.holdCount = 0
this.currentStep++

if(this.currentStep >= this.actions.length){
this.verified = true
clearTimeout(this.timeoutTimer)
this.stopCamera()
return
}

this.updateInstruction()
},

stopCamera(){

clearTimeout(this.stepTimer)

if(this.cameraInstance){
this.cameraInstance.stop()
}

const video = this.$refs.video
if(video && video.srcObject){
video.srcObject.getTracks().forEach(track=>track.stop())
}

}

}
}
</script>

<style scoped>
.liveness-container{
text-align:center;
font-family:Arial;
}

.camera-frame{
width:320px;
height:320px;
margin:auto;
border-radius:50%;
overflow:hidden;
border:4px solid green;
position:relative;
}

video{
width:100%;
height:100%;
object-fit:cover;
}

.face-guide{
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
width:220px;
height:260px;
border:2px dashed red;
border-radius:50%;
}

.face-guide.valid{
border:2px solid #00ff88;
}

.instruction{
font-size:18px;
font-weight:bold;
margin-top:10px;
}

.success{ color:green; }
.fail{ color:red; }
</style>