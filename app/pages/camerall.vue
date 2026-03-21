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
    <p v-if="failed" class="fail">❌ Failed</p>

  </div>
</template>

<script>
import * as faceMeshPkg from "@mediapipe/face_mesh"
import * as cameraUtils from "@mediapipe/camera_utils"

const { FaceMesh } = faceMeshPkg

export default {

data(){
return{

started:false,
verified:false,
failed:false,

instruction:"Initializing...",

camera:null,
stream:null,

isFaceValid:false,

/* detection */
prevEAR:0,
blinkCount:0,
blinkFrames:0,
blinkCooldown:false,

baseEAR:0,
calibrationFrames:0,
calibrating:true,
blinkThreshold:0,

timeout:null

}
},

methods:{

async startVerification(){

try{

this.started = true
this.instruction = "Starting camera..."

await this.$nextTick()

/* ✅ SAFARI CHECK */
if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
this.failed = true
this.instruction = "Camera not supported"
return
}

/* ✅ GET CAMERA (LOW RES FOR MOBILE) */
this.stream = await navigator.mediaDevices.getUserMedia({
video:{
facingMode:"user",
width:{ ideal: 320 },
height:{ ideal: 320 }
},
audio:false
})

const video = this.$refs.video
video.srcObject = this.stream

/* ✅ SAFARI SAFE PLAY */
await new Promise((resolve)=>{
video.onloadedmetadata = () => {
video.play().then(resolve).catch(resolve)
}
})

/* ✅ INIT MEDIAPIPE */
const faceMesh = new FaceMesh({
locateFile:(file)=>`https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
})

faceMesh.setOptions({
maxNumFaces:1,
refineLandmarks:true,
minDetectionConfidence:0.5,
minTrackingConfidence:0.5
})

faceMesh.onResults(this.onResults)

/* ✅ CAMERA LOOP (FIXED) */
this.camera = new cameraUtils.Camera(video,{
onFrame: async ()=>{
if(video.readyState >= 2){
await faceMesh.send({image:video})
}
},
width:320,
height:320
})

this.camera.start()

this.startTimeout()

}catch(err){
console.log(err)
this.failed = true
this.instruction = "Camera error"
}

},

/* GLOBAL TIMEOUT */
startTimeout(){
this.timeout = setTimeout(()=>{
if(!this.verified){
this.failed = true
this.stopCamera()
}
},30000)
},

/* EAR */
getEAR(landmarks){

const eye = [33,160,158,133,153,144]

const v1 = Math.abs(landmarks[160].y - landmarks[144].y)
const v2 = Math.abs(landmarks[158].y - landmarks[153].y)
const h = Math.abs(landmarks[33].x - landmarks[133].x)

return (v1 + v2)/(2*h)
},

/* RESULTS */
onResults(results){

if(!results.multiFaceLandmarks){
this.instruction = "Show your face"
this.isFaceValid = false
return
}

const landmarks = results.multiFaceLandmarks[0]

/* FACE SIZE CHECK */
const faceWidth = Math.abs(landmarks[234].x - landmarks[454].x)

if(faceWidth < 0.15){
this.instruction = "Move closer"
return
}

if(faceWidth > 0.5){
this.instruction = "Move back"
return
}

/* CENTER CHECK */
const centerX = (landmarks[234].x + landmarks[454].x)/2

if(centerX < 0.35 || centerX > 0.65){
this.instruction = "Center your face"
this.isFaceValid = false
return
}

this.isFaceValid = true

/* EAR */
const ear = this.getEAR(landmarks)
const smoothEAR = (this.prevEAR*0.7)+(ear*0.3)
this.prevEAR = smoothEAR

/* CALIBRATION */
if(this.calibrating){

this.baseEAR += smoothEAR
this.calibrationFrames++

this.instruction = "Stay still..."

if(this.calibrationFrames > 30){

this.baseEAR /= this.calibrationFrames
this.blinkThreshold = this.baseEAR * 0.75

this.calibrating = false
this.instruction = "Blink 2 times"
}

return
}

/* BLINK DETECTION */
if(smoothEAR < this.blinkThreshold){
this.blinkFrames++
}else{

if(this.blinkFrames > 1 && !this.blinkCooldown){

this.blinkCooldown = true
setTimeout(()=>this.blinkCooldown=false,800)

this.blinkCount++

this.instruction = `Blink count: ${this.blinkCount}`

if(this.blinkCount >= 2){
this.verified = true
this.instruction = "Verified ✅"
clearTimeout(this.timeout)
this.stopCamera()
}
}

this.blinkFrames = 0
}

},

stopCamera(){

if(this.camera){
this.camera.stop()
}

if(this.stream){
this.stream.getTracks().forEach(t=>t.stop())
}

clearTimeout(this.timeout)

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
width:300px;
height:300px;
margin:auto;
border-radius:50%;
overflow:hidden;
border:3px solid green;
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
width:200px;
height:240px;
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