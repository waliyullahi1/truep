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
   🔥 NEW: ACCURACY STATE
========================= */
const accuracy = ref(9999)
const REQUIRED_ACCURACY = 5



console.log('🚀 Component loaded')



/* =========================
   START LIVE GPS
========================= */
const startLivePosition = () => {
  console.log('📍 Starting GPS...')

  if (!navigator.geolocation) {
    alert('GPS not supported')
    return
  }

  if (watchId) navigator.geolocation.clearWatch(watchId)

  watchId = navigator.geolocation.watchPosition(
    ({ coords }) => {
      const { latitude, longitude, accuracy: acc } = coords

      // ✅ SAVE ACCURACY
      accuracy.value = Number(acc.toFixed(1))

      console.log('📡 Accuracy:', accuracy.value)

      console.log('✅ GPS position:', latitude, longitude)

      if (!myMarker) {
        myMarker = new mapboxgl.Marker({ color: 'blue' })
          .setLngLat([longitude, latitude])
          .addTo(map)
      } else {
        myMarker.setLngLat([longitude, latitude])
      }

      map.flyTo({
        center: [longitude, latitude],
        zoom: 19
      })
    },
    (err) => {
      console.log('❌ GPS error:', err)
      alert('Enable GPS permission')
    },
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
    alert('Wait for GPS first')
    return
  }

  /* ❌ BLOCK IF ACCURACY BAD */
  if (accuracy.value > REQUIRED_ACCURACY) {
    alert(`Hold on ❌ Accuracy ${accuracy.value}m\nWait until ≤ ${REQUIRED_ACCURACY}m`)
    return
  }

  const { lat, lng } = myMarker.getLngLat()

  console.log('📌 Corner added:', lat, lng)

  corners.value.push([lng, lat])

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
        'fill-color': '#ff0000',
        'fill-opacity': 0.2
      }
    })

    map.addLayer({
      id: 'plot-line',
      type: 'line',
      source: 'plot',
      paint: {
        'line-color': '#ff0000',
        'line-width': 3
      }
    })
  }

  form.value.area = Math.round(geodesicAreaMeters(coords))
  form.value.plots = Math.round(form.value.area / 450)
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
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [4.18, 7.88],
    zoom: 18
  })

  map.on('load', startLivePosition)
})

onUnmounted(() => {
  if (watchId) navigator.geolocation.clearWatch(watchId)
  if (map) map.remove()
})
</script>



<template>
<ClientOnly>
  <div class="p-4 space-y-4">

    <!-- ✅ NEW ACCURACY DISPLAY -->
    <div class="text-lg font-bold">
      Accuracy: {{ accuracy }} m
    </div>

    <div
      v-if="accuracy > REQUIRED_ACCURACY"
      class="text-red-600 font-semibold"
    >
      Hold on… wait until accuracy ≤ 2m
    </div>

    <div
      v-else
      class="text-green-600 font-semibold"
    >
      GPS Ready ✓
    </div>



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
      <div>Corners: {{ corners.length }}</div>

      <div v-if="form.area">
        Area: {{ form.area }} m² (~{{ form.plots }} plots)
      </div>
    </div>

  </div>
</ClientOnly>
</template>