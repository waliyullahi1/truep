<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import 'mapbox-gl/dist/mapbox-gl.css'

/* ======================
PROPS
====================== */
const props = defineProps({
  modelValue: Object,
  type: { type: String, default: 'land' }
})

const emit = defineEmits(['update:modelValue'])

/* ======================
MAP
====================== */
const mapRef = ref(null)
let map = null
let mapboxgl = null
let marker = null
let watchId = null

/* ======================
STATE
====================== */
const accuracy = ref(9999)
const REQUIRED_ACCURACY = 5

const corners = ref([])
let lastEmitTime = 0
let lastGeoTime = 0

/* ======================
FORM
====================== */
const form = ref({
  location: {
    country: '',
    state: '',
    lga: '',
    city: '',
    address: '',
    fullAddress: '',
    source: 'gps',
    geometry: { type: 'Point', coordinates: [] }
  },
  landDetails: {
    size: 0,
    unit: 'sqm'
  }
})

/* ======================
AUTO CALC PLOTS
400sqm = 1 plot (Nigeria standard)
====================== */
const plots = computed(() =>
  Math.round(form.value.landDetails.size / 400)
)

/* ======================
SAFE EMIT (THROTTLED)
====================== */
const emitData = () => {
  const now = Date.now()
  if (now - lastEmitTime < 1500) return
  lastEmitTime = now
  emit('update:modelValue', form.value)
}

/* ======================
REVERSE GEOCODE (THROTTLED)
====================== */
const reverseGeocode = async (lng, lat) => {
  const now = Date.now()
  if (now - lastGeoTime < 5000) return
  lastGeoTime = now

  const config = useRuntimeConfig()

  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${config.public.mapboxToken}`
    )
    const data = await res.json()

    const place = data.features[0]?.place_name || ''

    form.value.location.fullAddress = place
    emitData()
  } catch {}
}

/* ======================
GPS LIVE
====================== */
const startLivePosition = () => {
  watchId = navigator.geolocation.watchPosition(
    ({ coords }) => {
      const { latitude, longitude, accuracy: acc } = coords

      accuracy.value = acc

      if (!marker) {
        marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map)
      } else {
        marker.setLngLat([longitude, latitude])
      }

      map.setCenter([longitude, latitude])

      if (props.type === 'house') {
        form.value.location.geometry = {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
        emitData()
      }

      reverseGeocode(longitude, latitude)
    },
    () => alert('Enable GPS'),
    { enableHighAccuracy: true }
  )
}

/* ======================
ADD CORNER
====================== */
const addCorner = () => {
  if (accuracy.value > REQUIRED_ACCURACY) return alert('Wait for better accuracy')

  const { lng, lat } = marker.getLngLat()
  corners.value.push([lng, lat])

  drawPolygon()
}

/* ======================
UNDO LAST POINT
====================== */
const undoCorner = () => {
  corners.value.pop()
  drawPolygon()
}

/* ======================
DRAW POLYGON
====================== */
const drawPolygon = () => {
  if (corners.value.length < 3) return

  const coords = [...corners.value, corners.value[0]]

  form.value.location.geometry = {
    type: 'Polygon',
    coordinates: [coords]
  }

  form.value.landDetails.size = Math.round(geodesicArea(coords))

  emitData()

  const geo = {
    type: 'Feature',
    geometry: form.value.location.geometry
  }

  if (map.getSource('plot')) {
    map.getSource('plot').setData(geo)
  } else {
    map.addSource('plot', { type: 'geojson', data: geo })

    map.addLayer({
      id: 'plot-fill',
      type: 'fill',
      source: 'plot',
      paint: { 'fill-color': '#00ff00', 'fill-opacity': 0.25 }
    })

    map.addLayer({
      id: 'plot-line',
      type: 'line',
      source: 'plot',
      paint: { 'line-color': '#00aa00', 'line-width': 2 }
    })
  }
}

/* ======================
AREA
====================== */
const geodesicArea = (coords) => {
  const rad = Math.PI / 180
  const latRef = coords[0][1] * rad

  const meters = coords.map(([lng, lat]) => [
    lng * 111320 * Math.cos(latRef),
    lat * 110540
  ])

  let area = 0

  for (let i = 0; i < meters.length - 1; i++) {
    const [x1, y1] = meters[i]
    const [x2, y2] = meters[i + 1]
    area += x1 * y2 - x2 * y1
  }

  return Math.abs(area / 2)
}

/* ======================
EXPORT GEOJSON
====================== */
const exportGeoJSON = () => {
  const blob = new Blob(
    [JSON.stringify(form.value.location.geometry, null, 2)],
    { type: 'application/json' }
  )

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'land.geojson'
  a.click()
}

/* ======================
INIT MAP
====================== */
onMounted(async () => {
  await nextTick()

  mapboxgl = (await import('mapbox-gl')).default
  mapboxgl.accessToken = useRuntimeConfig().public.mapboxToken

  map = new mapboxgl.Map({
    container: mapRef.value,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [3.4, 7.4],
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
  <div class="space-y-3">

    <div>Accuracy: {{ accuracy.toFixed(1) }}m</div>
    <div>Corners: {{ corners.length }}</div>
    <div>Area: {{ form.landDetails.size }} sqm</div>
    <div>Plots: {{ plots }}</div>

    <div class="flex gap-2">
      <button @click="addCorner" class="bg-green-600 text-white px-3 py-2 rounded">
        Add Corner
      </button>

      <button @click="undoCorner" class="bg-yellow-500 text-white px-3 py-2 rounded">
        Undo
      </button>

      <button @click="exportGeoJSON" class="bg-blue-600 text-white px-3 py-2 rounded">
        Export
      </button>
    </div>

    <div ref="mapRef" class="w-full h-[500px] rounded border"></div>
  </div>
</ClientOnly>
</template>