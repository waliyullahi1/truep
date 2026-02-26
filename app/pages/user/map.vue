<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'

const mapRef = ref(null)
let map
let L
let myMarker
let polygon = null
const corners = ref([])
const watchId = ref(null)

const form = ref({
  area: 0,      // land area in m²
  plots: 0      // land area in plots (1 plot = 450 m²)
})

/* =========================
   START LIVE GPS
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
  if (corners.value.length > 2) polygonPoints.push(corners.value[0])

  polygon = L.polygon(polygonPoints, { color: 'red', weight: 3, fillOpacity: 0.1 }).addTo(map)

  // Calculate area using corrected formula
  form.value.area = Math.round(geodesicAreaMeters(corners.value))
  form.value.plots = Math.round(form.value.area / 450)
}

/* =========================
   CORRECT AREA FORMULA FOR SMALL PLOTS
========================= */
const geodesicAreaMeters = (coords) => {
  if (coords.length < 3) return 0

  const rad = Math.PI / 180
  const latRef = coords[0][0] * rad
  const meters = coords.map(([lat, lng]) => {
    const x = lng * 111320 * Math.cos(latRef)
    const y = lat * 110540
    return [x, y]
  })

  let area = 0
  for (let i = 0; i < meters.length; i++) {
    const [x1, y1] = meters[i]
    const [x2, y2] = meters[(i + 1) % meters.length]
    area += (x1 * y2 - x2 * y1)
  }

  return Math.abs(area / 2)
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

    <!-- BUTTONS -->
    <div class="flex gap-2">
      <button @click="addCorner" class="bg-green-600 text-white px-4 py-2 rounded">
        ➕ Add Corner
      </button>

      <button @click="resetPlot" class="bg-red-600 text-white px-4 py-2 rounded">
        🔄 Reset
      </button>
    </div>

    <!-- MAP -->
    <div ref="mapRef" class="w-full h-[500px] rounded-xl border shadow"></div>

    <!-- INFO -->
    <div class="text-sm text-gray-600">
      <div>Number of Corners: {{ corners.length }}</div>
      <div v-if="form.area">Land Area: {{ form.area }} m² (~{{ form.plots }} plots)</div>
    </div>

  </div>
</ClientOnly>
</template>