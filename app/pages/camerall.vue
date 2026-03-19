<template>
  <div class="liveness-container">

    <h2>Face Verification</h2>

    <button v-if="!started" @click="startVerification">
      Start Verification
    </button>

    <div v-show="started" class="camera-frame">
      <video ref="video" autoplay playsinline muted></video>
      <div class="face-guide"></div>
    </div>

    <div v-if="started" class="status">
      <p>Step {{ currentStep + 1 }} / {{ actions.length }}</p>
      <p class="instruction">{{ instruction }}</p>

      <p v-if="noFace" class="warning">
        ⚠ Adjust your face inside the frame
      </p>
    </div>

    <p v-if="verified" class="success">✅ Verified</p>
    <p v-if="failed" class="fail">❌ Failed</p>

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

noFace:false,

/* stability */
stableCount:0,

/* blink */
blinkFrames:0,
blinkCooldown:false,

/* hold detection */
holdCount:0,

timer:null,
cameraInstance:null

}
},

methods:{

/* START */

async startVerification(){

this.started = true
await this.$nextTick()

const video = this.$refs.video

const stream = await navigator.mediaDevices.getUserMedia({
video:{ facingMode:"user" },
audio:false
})

video.srcObject = stream
await video.play()

this.generateActions()
this.updateInstruction()

const faceMesh = new FaceMesh({
locateFile:(file)=>{
return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
}
})

faceMesh.setOptions({
maxNumFaces:1,
refineLandmarks:true,
minDetectionConfidence:0.5,
minTrackingConfidence:0.5
})

faceMesh.onResults(this.onResults)

this.cameraInstance = new Camera(video,{
onFrame: async ()=>{
await faceMesh.send({image:video})
},
width:400,
height:400
})

this.cameraInstance.start()

this.startTimer()

},

/* ACTIONS */

generateActions(){
const all = ["blink","left","right","smile"]
this.actions = all.sort(()=>Math.random()-0.5).slice(0,3)
},

updateInstruction(){

const action = this.actions[this.currentStep]

if(action==="blink") this.instruction="Blink your eyes"
if(action==="left") this.instruction="Turn head LEFT"
if(action==="right") this.instruction="Turn head RIGHT"
if(action==="smile") this.instruction="Smile"

this.speak(this.instruction)

},

/* SPEECH */

speak(text){
const speech = new SpeechSynthesisUtterance(text)
window.speechSynthesis.cancel()
window.speechSynthesis.speak(speech)
},

/* TIMER */

startTimer(){
clearTimeout(this.timer)

this.timer = setTimeout(()=>{
this.failed = true
this.stopCamera()
},10000)
},

nextStep(){

clearTimeout(this.timer)
this.holdCount = 0

this.currentStep++

if(this.currentStep >= this.actions.length){
this.verified = true
this.stopCamera()
return
}

this.updateInstruction()
this.startTimer()

},

/* EAR */

getEAR(landmarks, left=true){

const eye = left
? [33,160,158,133,153,144]
: [362,385,387,263,373,380]

const v1 = Math.abs(landmarks[eye[1]].y - landmarks[eye[5]].y)
const v2 = Math.abs(landmarks[eye[2]].y - landmarks[eye[4]].y)
const h = Math.abs(landmarks[eye[0]].x - landmarks[eye[3]].x)

return (v1 + v2) / (2.0 * h)
},

/* RESULTS */

onResults(results){

if(!results.multiFaceLandmarks){
this.noFace = true
this.stableCount = 0
return
}

this.noFace = false

/* stability */
this.stableCount++
if(this.stableCount < 5) return

const landmarks = results.multiFaceLandmarks[0]

const leftEAR = this.getEAR(landmarks,true)
const rightEAR = this.getEAR(landmarks,false)
const avgEAR = (leftEAR + rightEAR)/2

const mouth = landmarks[14].y - landmarks[13].y

const leftFace = landmarks[234].x
const rightFace = landmarks[454].x
const faceCenter = (leftFace + rightFace)/2

const action = this.actions[this.currentStep]

/* BLINK */

if(action==="blink"){

if(avgEAR < 0.22){
this.blinkFrames++
}else{

if(this.blinkFrames > 2 && !this.blinkCooldown){
this.blinkCooldown = true

setTimeout(()=>{
this.blinkCooldown = false
},1000)

this.blinkFrames = 0
this.nextStep()
}

this.blinkFrames = 0
}

}

/* LEFT */

if(action==="left"){

if(faceCenter > 0.55){
this.holdCount++
}else{
this.holdCount = 0
}

if(this.holdCount > 5){
this.nextStep()
}

}

/* RIGHT */

if(action==="right"){

if(faceCenter < 0.45){
this.holdCount++
}else{
this.holdCount = 0
}

if(this.holdCount > 5){
this.nextStep()
}

}

/* SMILE */

if(action==="smile"){

if(mouth > 0.07){
this.holdCount++
}else{
this.holdCount = 0
}

if(this.holdCount > 5){
this.nextStep()
}

}

},

/* STOP */

stopCamera(){

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
max-width:420px;
margin:auto;
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
background:black;
}

.face-guide{
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
width:220px;
height:260px;
border:2px dashed white;
border-radius:50%;
}

.instruction{
font-size:18px;
font-weight:bold;
}

.warning{
color:#e67e22;
}

.success{
color:#27ae60;
font-size:20px;
}

.fail{
color:#e74c3c;
font-size:20px;
}

button{
padding:10px 20px;
margin:10px;
}

</style>