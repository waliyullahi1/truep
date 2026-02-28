<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mapRef = ref(null)

let map
let marker
let mapboxgl
let watchId = null

const corners = ref([])
const accuracy = ref(0)
const area = ref(0)
const plots = ref(0)

/* =========================
   AREA CALCULATION
========================= */
function polygonArea(coords) {
  let sum = 0
  for (let i = 0; i < coords.length; i++) {
    const [x1, y1] = coords[i]
    const [x2, y2] = coords[(i + 1) % coords.length]
    sum += x1 * y2 - x2 * y1
  }
  return Math.abs(sum / 2)
}

function updateArea() {
  if (corners.value.length < 3) return

  const coords = corners.value.map(c => [c.lng, c.lat])

  area.value = polygonArea(coords)

  // 1 plot ≈ 506 m²
  plots.value = (area.value / 506).toFixed(2)
}

/* =========================
   DRAW POLYGON
========================= */
function drawPolygon() {
  if (map.getSource('poly')) {
    map.getSource('poly').setData({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[...corners.value.map(c => [c.lng, c.lat]), [corners.value[0].lng, corners.value[0].lat]]]
      }
    })
  }
}

/* =========================
   ADD CORNER
========================= */
function addCorner() {
  if (!marker) return

  const lngLat = marker.getLngLat()

  corners.value.push({
    lat: lngLat.lat,
    lng: lngLat.lng
  })

  new mapboxgl.Marker({ color: 'red' })
    .setLngLat(lngLat)
    .addTo(map)

  drawPolygon()
  updateArea()
}

/* =========================
   CLEAR
========================= */
function clearAll() {
  corners.value = []
  area.value = 0
  plots.value = 0
  map.removeLayer('poly-layer')
  map.removeSource('poly')
}

/* =========================
   GPS
========================= */
function startGPS() {
  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy: acc } = pos.coords
      accuracy.value = acc.toFixed(1)

      const lngLat = [longitude, latitude]

      marker.setLngLat(lngLat)
      map.flyTo({ center: lngLat })

    },
    console.error,
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 20000
    }
  )
}

/* =========================
   INIT
========================= */
onMounted(async () => {
  mapboxgl = (await import('mapbox-gl')).default

  mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'

  map = new mapboxgl.Map({
    container: mapRef.value,
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    zoom: 18
  })

  marker = new mapboxgl.Marker({ color: 'blue' })
    .setLngLat([0, 0])
    .addTo(map)

  map.on('load', () => {
    map.addSource('poly', {
      type: 'geojson',
      data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [] } }
    })

    map.addLayer({
      id: 'poly-layer',
      type: 'fill',
      source: 'poly',
      paint: {
        'fill-color': '#00ff00',
        'fill-opacity': 0.3
      }
    })
  })

  startGPS()
})

onUnmounted(() => {
  navigator.geolocation.clearWatch(watchId)
})
</script>

<template>
  <div class="w-full h-screen relative">

    <div ref="mapRef" class="w-full h-full"></div>

    <!-- UI -->
    <div class="absolute bottom-5 left-0 right-0 flex justify-center gap-3">

      <button @click="addCorner" class="bg-green-600 text-white px-4 py-2 rounded">
        Add Corner
      </button>

      <button @click="clearAll" class="bg-red-600 text-white px-4 py-2 rounded">
        Clear
      </button>
    </div>

    <!-- Info -->
    <div class="absolute top-4 left-4 bg-white p-3 rounded shadow text-sm space-y-1">
      <div>Accuracy: {{ accuracy }} m</div>
      <div>Area: {{ area.toFixed(2) }} m²</div>
      <div>Plots: {{ plots }}</div>
    </div>

  </div>
</template>