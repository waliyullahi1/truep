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
  distance: 0, // meters
  area: 0 // m²
})

/* =========================
   HELPER: SMOOTH COORDINATES
========================= */
const smoothCoordinate = (lat, lng, buffer = 3) => {
  if (!smoothCoordinate.cache) smoothCoordinate.cache = []
  const cache = smoothCoordinate.cache

  cache.push([lat, lng])
  if (cache.length > buffer) cache.shift()

  const avgLat = cache.reduce((sum, c) => sum + c[0], 0) / cache.length
  const avgLng = cache.reduce((sum, c) => sum + c[1], 0) / cache.length

  return [avgLat, avgLng]
}

/* =========================
   DISTANCE CALCULATION
========================= */
const calculateDistance = (coords) => {
  let dist = 0
  for (let i = 1; i < coords.length; i++) {
    dist += map.distance(coords[i - 1], coords[i])
  }
  return dist
}

/* =========================
   AREA CALCULATION (Geodesic Polygon)
========================= */
const calculateGeodesicArea = (coords) => {
  if (coords.length < 3) return 0

  const rad = Math.PI / 180
  let area = 0
  const R = 6378137 // radius of Earth in meters

  for (let i = 0; i < coords.length; i++) {
    const [lat1, lon1] = coords[i]
    const [lat2, lon2] = coords[(i + 1) % coords.length]
    area += (lon2 - lon1) * (2 + Math.sin(lat1 * rad) + Math.sin(lat2 * rad))
  }

  return Math.abs(area * R * R / 2) // m²
}

/* =========================
   UPDATE TRACK
========================= */
const updateTrack = (lat, lng) => {
  const [sLat, sLng] = smoothCoordinate(lat, lng)

  const prev = trackCoordinates[trackCoordinates.length - 1]
  if (prev) {
    const dist = map.distance(prev, [sLat, sLng])
    if (dist > 30) return // ignore GPS jumps
  }

  trackCoordinates.push([sLat, sLng])

  // Remove previous polyline
  if (pathLine) map.removeLayer(pathLine)

  // Draw polyline (if >2 points, show polygon)
  if (trackCoordinates.length >= 3) {
    const polygon = [...trackCoordinates, trackCoordinates[0]] // auto-close
    pathLine = L.polygon(polygon, { color: 'red', weight: 3, fillOpacity: 0.1 }).addTo(map)
    form.value.area = Math.round(calculateGeodesicArea(trackCoordinates))
  } else {
    pathLine = L.polyline(trackCoordinates, { color: 'red', weight: 3 }).addTo(map)
    form.value.area = 0
  }

  // Distance always calculated
  form.value.distance = Math.round(calculateDistance(trackCoordinates))
}

/* =========================
   START TRACKING
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

      // Add/update marker
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
    (err) => alert('Allow GPS access and enable high accuracy'),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 20000
    }
  )
}

/* =========================
   STOP TRACKING
========================= */
const stopTracking = () => {
  if (watchId) navigator.geolocation.clearWatch(watchId)
  tracking.value = false
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

onUnmounted(() => {
  if (watchId) navigator.geolocation.clearWatch(watchId)
})
</script>

<template>
<ClientOnly>
  <div class="p-4 space-y-4">

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

    <div ref="mapRef" class="w-full h-[500px] rounded-xl border shadow"></div>

    <div class="text-sm text-gray-600">
      <div>Distance Traveled: {{ form.distance }} meters</div>
      <div v-if="form.area">Land Area: {{ form.area }} m²</div>
    </div>

  </div>
</ClientOnly>
</template>