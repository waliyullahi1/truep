<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'

const mapRef = ref(null)
let map
let L
let myMarker
const corners = ref([]) // saved corner points
let polygon = null
const watchId = ref(null)

const form = ref({
  distance: 0,
  area: 0,
  plots: 0
})

/* =========================
   HIGH-ACCURACY LIVE LOCATION
========================= */
const startLivePosition = () => {
  if (!navigator.geolocation) return alert('GPS not supported')

  if (watchId.value) navigator.geolocation.clearWatch(watchId.value)

  watchId.value = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords

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
   ADD CORNER
========================= */
const addCorner = () => {
  if (!myMarker) return alert('Live position not ready yet')
  const pos = myMarker.getLatLng()
  corners.value.push([pos.lat, pos.lng])
  drawPolygon()
}

/* =========================
   DRAW POLYGON & CALCULATE AREA
========================= */
const drawPolygon = () => {
  if (polygon) map.removeLayer(polygon)

  if (corners.value.length < 2) return

  const polygonPoints = [...corners.value]
  if (corners.value.length > 2) polygonPoints.push(corners.value[0]) // close polygon

  polygon = L.polygon(polygonPoints, { color: 'red', weight: 3, fillOpacity: 0.1 }).addTo(map)

  // Calculate area in m² using geodesic formula
  form.value.area = Math.round(geodesicArea(corners.value))
  form.value.plots = Math.round(form.value.area / 450)
}

/* =========================
   GEODESIC AREA
========================= */
const geodesicArea = (coords) => {
  if (coords.length < 3) return 0

  const rad = Math.PI / 180
  let area = 0
  const R = 6378137 // earth radius in meters

  for (let i = 0; i < coords.length; i++) {
    const [lat1, lon1] = coords[i]
    const [lat2, lon2] = coords[(i + 1) % coords.length]
    area += (lon2 - lon1) * (2 + Math.sin(lat1 * rad) + Math.sin(lat2 * rad))
  }

  return Math.abs(area * R * R / 2)
}

/* =========================
   RESET
========================= */
const resetPlot = () => {
  corners.value = []
  if (polygon) map.removeLayer(polygon)
  polygon = null
  form.value.area = 0
  form.value.plots = 0
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

  startLivePosition()
})

onUnmounted(() => {
  if (watchId.value) navigator.geolocation.clearWatch(watchId.value)
})
</script>

<template>
<ClientOnly>
  <div class="p-4 space-y-4">

    <div class="flex gap-2">
      <button @click="addCorner" class="bg-green-600 text-white px-4 py-2 rounded">
        ➕ Add Corner
      </button>

      <button @click="resetPlot" class="bg-red-600 text-white px-4 py-2 rounded">
        🔄 Reset
      </button>
    </div>

    <div ref="mapRef" class="w-full h-[500px] rounded-xl border shadow"></div>

    <div class="text-sm text-gray-600">
      <div>Number of Corners: {{ corners.length }}</div>
      <div v-if="form.area">Land Area: {{ form.area }} m² (~{{ form.plots }} plots)</div>
    </div>

  </div>
</ClientOnly>
</template>