<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'

const mapRef = ref(null)

let map
let L
let myMarker
let polygon = null
let baseLayers = {}

const currentLayer = ref('Hybrid')

const corners = ref([])
const watchId = ref(null)

const form = ref({
  area: 0,
  plots: 0
})

/* ================= GPS ================= */
const startLivePosition = () => {
  if (!navigator.geolocation) return alert('GPS not supported')

  watchId.value = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords

      if (!myMarker) {
        myMarker = L.circleMarker([latitude, longitude], {
          radius: 8,
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 0.8
        }).addTo(map)
      } else {
        myMarker.setLatLng([latitude, longitude])
      }

      map.setView([latitude, longitude], 22)
    },
    () => alert('Enable GPS + High accuracy'),
    { enableHighAccuracy: true }
  )
}

/* ================= ADD CORNER ================= */
const addCorner = () => {
  if (!myMarker) return

  const pos = myMarker.getLatLng()
  corners.value.push([pos.lat, pos.lng])
  drawPolygon()
}

/* ================= POLYGON ================= */
const drawPolygon = () => {
  if (polygon) map.removeLayer(polygon)

  if (corners.value.length < 2) return

  polygon = L.polygon(corners.value, {
    color: 'red',
    weight: 3,
    fillOpacity: 0.2
  }).addTo(map)

  map.fitBounds(polygon.getBounds(), { padding: [40, 40] })

  form.value.area = Math.round(geodesicAreaMeters(corners.value))
  form.value.plots = Math.round(form.value.area / 450)
}

/* ================= AREA ================= */
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
    area += x1 * y2 - x2 * y1
  }

  return Math.abs(area / 2)
}

/* ================= RESET ================= */
const resetPlot = () => {
  corners.value = []
  if (polygon) map.removeLayer(polygon)
  polygon = null
  form.value.area = 0
  form.value.plots = 0
}

/* ================= LAYER SWITCH ================= */
const changeLayer = (type) => {
  Object.values(baseLayers).forEach(l => map.removeLayer(l))
  baseLayers[type].addTo(map)
  currentLayer.value = type
}

/* ================= INIT MAP ================= */
onMounted(async () => {
  if (!process.client) return
  await nextTick()

  L = (await import('leaflet')).default
  await import('leaflet/dist/leaflet.css')

  map = L.map(mapRef.value, {
    zoomControl: true,
    maxZoom: 22
  })

  /* ===== ESRI LAYERS ===== */

  const satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  )

  const labels = L.tileLayer(
    'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
  )

  const streets = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  )

  const hybrid = L.layerGroup([satellite, labels])

  baseLayers = {
    Satellite: satellite,
    Hybrid: hybrid,
    Map: streets
  }

  hybrid.addTo(map)

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

    <!-- Buttons -->
    <div class="flex gap-2 flex-wrap">

      <button @click="addCorner" class="bg-green-600 text-white px-4 py-2 rounded">
        ➕ Add Corner
      </button>

      <button @click="resetPlot" class="bg-red-600 text-white px-4 py-2 rounded">
        🔄 Reset
      </button>

      <!-- 🔥 Layer Toggle -->
      <button @click="changeLayer('Hybrid')" class="bg-blue-600 text-white px-3 py-2 rounded">
        Hybrid
      </button>

      <button @click="changeLayer('Satellite')" class="bg-gray-700 text-white px-3 py-2 rounded">
        Satellite
      </button>

      <button @click="changeLayer('Map')" class="bg-yellow-600 text-white px-3 py-2 rounded">
        Map
      </button>
    </div>

    <!-- Map -->
    <div ref="mapRef" class="w-full h-[500px] rounded-xl border shadow"></div>

    <!-- Info -->
    <div class="text-sm text-gray-700">
      Corners: {{ corners.length }} |
      Area: {{ form.area }} m² (~{{ form.plots }} plots) |
      Mode: {{ currentLayer }}
    </div>

  </div>
</ClientOnly>
</template>