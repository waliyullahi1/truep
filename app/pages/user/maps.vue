<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'

/* =========================
   REFS
========================= */
const mapRef = ref(null)
let map
let L
let myMarker
let pathLine
let trackCoordinates = []
let watchId = null
const tracking = ref(false)

/* =========================
   FORM
========================= */
const form = ref({
  address: '',
  distance: 0,
  area: 0
})

/* =========================
   DRAW TRACK
========================= */
const updateTrack = (lat, lng) => {
  // add new coordinate
  trackCoordinates.push([lat, lng])

  // remove previous polyline
  if (pathLine) map.removeLayer(pathLine)

  // draw new polyline
  pathLine = L.polyline(trackCoordinates, {
    color: 'red',
    weight: 3
  }).addTo(map)

  // calculate distance
  form.value.distance = Math.round(calculateDistance(trackCoordinates))
}

/* =========================
   DISTANCE CALCULATION
========================= */
const calculateDistance = (coords) => {
  let dist = 0
  for (let i = 1; i < coords.length; i++) {
    dist += map.distance(coords[i-1], coords[i])
  }
  return dist // in meters
}

/* =========================
   AREA CALCULATION (optional)
========================= */
const calculateArea = (coords) => {
  if (coords.length < 3) return 0
  const polygon = L.polygon(coords)
  return Math.round(L.GeometryUtil.geodesicArea(polygon.getLatLngs()[0])) // m²
}

/* =========================
   LIVE GPS TRACKING
========================= */
const startTracking = () => {
  if (!navigator.geolocation) {
    alert('GPS not supported')
    return
  }
  if (tracking.value) return
  tracking.value = true
  trackCoordinates = []

  if (watchId) navigator.geolocation.clearWatch(watchId)

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords

      // update marker
      if (!myMarker) {
        myMarker = L.circleMarker([latitude, longitude], {
          radius: 7,
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 0.7
        }).addTo(map)
      } else {
        myMarker.setLatLng([latitude, longitude])
      }

      map.setView([latitude, longitude], 19)

      updateTrack(latitude, longitude)
    },
    (err) => alert('Allow GPS access'),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 15000
    }
  )
}

/* =========================
   STOP TRACKING
========================= */
const stopTracking = () => {
  if (watchId) navigator.geolocation.clearWatch(watchId)
  tracking.value = false
  form.value.area = Math.round(calculateArea(trackCoordinates))
}

/* =========================
   INIT MAP
========================= */
onMounted(async () => {
  if (!process.client) return

  await nextTick()
  L = (await import('leaflet')).default
  await import('leaflet/dist/leaflet.css')

  map = L.map(mapRef.value)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  map.invalidateSize()
})

/* =========================
   CLEANUP
========================= */
onUnmounted(() => {
  if (watchId) navigator.geolocation.clearWatch(watchId)
})
</script>

<template>
<ClientOnly>
  <div class="p-4 space-y-4">

    <!-- BUTTONS -->
    <div class="flex gap-2">
      <button
        v-if="!tracking"
        @click="startTracking"
        class="bg-green-600 text-white px-4 py-2 rounded"
      >
        🚦 Start Tracking
      </button>

      <button
        v-if="tracking"
        @click="stopTracking"
        class="bg-red-600 text-white px-4 py-2 rounded"
      >
        🛑 Stop Tracking
      </button>
    </div>

    <!-- MAP -->
    <div ref="mapRef" class="w-full h-[500px] rounded-xl border shadow"></div>

    <!-- INFO -->
    <div class="text-sm text-gray-600">
      <div>Distance Traveled: {{ form.distance }} meters</div>
      <div v-if="form.area">Approx. Area: {{ form.area }} m²</div>
    </div>

  </div>
</ClientOnly>
</template>