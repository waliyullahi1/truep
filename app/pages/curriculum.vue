<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import 'mapbox-gl/dist/mapbox-gl.css'

/* =========================
   REFS
========================= */
const mapRef = ref(null)

let map = null
let mapboxgl = null
let myMarker = null
let watchId = null

const corners = ref([])

const form = ref({
  area: 0,
  plots: 0
})

/* =========================
   GPS ACCURACY SETTINGS
========================= */
const accuracy = ref(9999)
const gpsReady = ref(false)

// 🔥 change to 3 or 5 if too strict
const REQUIRED_ACCURACY = 3



/* =========================
   START LIVE GPS
========================= */
const startLivePosition = () => {
  if (!navigator.geolocation) {
    alert('GPS not supported')
    return
  }

  if (watchId) navigator.geolocation.clearWatch(watchId)

  watchId = navigator.geolocation.watchPosition(
    ({ coords }) => {
      const { latitude, longitude, accuracy: acc } = coords

      accuracy.value = Number(acc.toFixed(1))

      // ❌ Ignore terrible accuracy (cell tower)
      if (accuracy.value > 50) {
        gpsReady.value = false
        return
      }

      // ✅ Only allow when very accurate
      gpsReady.value = accuracy.value <= REQUIRED_ACCURACY

      const color = gpsReady.value ? 'green' : 'orange'

      if (!myMarker) {
        myMarker = new mapboxgl.Marker({ color })
          .setLngLat([longitude, latitude])
          .addTo(map)
      } else {
        myMarker.setLngLat([longitude, latitude])
        myMarker.getElement().style.backgroundColor = color
      }

      map.flyTo({
        center: [longitude, latitude],
        zoom: 19
      })
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
   ADD CORNER
========================= */
const addCorner = () => {
  if (!myMarker) {
    alert('Wait for GPS...')
    return
  }

  if (!gpsReady.value) {
    alert(`Accuracy too low (${accuracy.value}m). Wait ≤ ${REQUIRED_ACCURACY}m`)
    return
  }

  const { lat, lng } = myMarker.getLngLat()

  corners.value.push([lng, lat])

  new mapboxgl.Marker({ color: 'red' })
    .setLngLat([lng, lat])
    .addTo(map)

  drawPolygon()
}



/* =========================
   DRAW POLYGON
========================= */
const drawPolygon = () => {
  if (corners.value.length < 2) return

  const coords = [...corners.value]

  if (coords.length > 2) coords.push(coords[0])

  const geojson = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [coords]
    }
  }

  if (map.getSource('plot')) {
    map.getSource('plot').setData(geojson)
  } else {
    map.addSource('plot', { type: 'geojson', data: geojson })

    map.addLayer({
      id: 'plot-fill',
      type: 'fill',
      source: 'plot',
      paint: {
        'fill-color': '#00ff00',
        'fill-opacity': 0.25
      }
    })

    map.addLayer({
      id: 'plot-line',
      type: 'line',
      source: 'plot',
      paint: {
        'line-color': '#008000',
        'line-width': 3
      }
    })
  }

  form.value.area = Math.round(geodesicAreaMeters(coords))

  // 1 plot ≈ 506 m²
  form.value.plots = (form.value.area / 506).toFixed(2)
}



/* =========================
   AREA CALCULATION
========================= */
const geodesicAreaMeters = (coords) => {
  if (coords.length < 3) return 0

  const rad = Math.PI / 180
  const latRef = coords[0][1] * rad

  const meters = coords.map(([lng, lat]) => {
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



/* =========================
   RESET
========================= */
const resetPlot = () => {
  corners.value = []
  form.value.area = 0
  form.value.plots = 0

  if (map.getSource('plot')) {
    map.removeLayer('plot-fill')
    map.removeLayer('plot-line')
    map.removeSource('plot')
  }
}



/* =========================
   INIT MAP
========================= */
onMounted(async () => {
  if (!process.client) return

  await nextTick()

  const config = useRuntimeConfig()

  mapboxgl = (await import('mapbox-gl')).default

  mapboxgl.accessToken = config.public.mapboxToken

  map = new mapboxgl.Map({
    container: mapRef.value,
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [4.18, 7.88],
    zoom: 18
  })

  map.on('load', () => {
    startLivePosition()
  })
})

onUnmounted(() => {
  if (watchId) navigator.geolocation.clearWatch(watchId)
  if (map) map.remove()
})
</script>



<template>
<ClientOnly>
  <div class="p-4 space-y-4">

    <div class="flex gap-3">
      <button
        @click="addCorner"
        class="bg-green-600 text-white px-4 py-2 rounded"
      >
        ➕ Add Corner
      </button>

      <button
        @click="resetPlot"
        class="bg-red-600 text-white px-4 py-2 rounded"
      >
        🔄 Reset
      </button>
    </div>

    <div ref="mapRef" class="w-full h-[500px] rounded-xl border shadow"></div>

    <div class="text-sm space-y-1">

      <div>📡 Accuracy: {{ accuracy }} m</div>

      <div v-if="!gpsReady" class="text-red-600">
        Waiting for strong GPS… go outside
      </div>

      <div v-else class="text-green-600">
        GPS locked ✓ Ready
      </div>

      <div>Corners: {{ corners.length }}</div>

      <div v-if="form.area">
        Area: {{ form.area }} m² (~ {{ form.plots }} plots)
      </div>

    </div>

  </div>
</ClientOnly>
</template>