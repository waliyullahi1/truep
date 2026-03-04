<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import 'mapbox-gl/dist/mapbox-gl.css'

/* ===============================
   EMITS
=============================== */
const emit = defineEmits(['update'])

/* ===============================
   REFS
=============================== */
const mapRef = ref(null)
let map = null
let mapboxgl = null
let marker = null
let watchId = null

/* ===============================
   STATE
=============================== */
const accuracy = ref(9999)
const REQUIRED_ACCURACY = 5

const corners = ref([])

const form = ref({
  area: 0,
  plots: 0
})

const address = ref({
  building: '',
  road: '',
  company: '',
  landmark: '',
  area: '',
  lga: '',
  state: '',
  country: '',
  full: ''
})

/* ===============================
   EMIT TO PARENT
=============================== */
const emitData = () => {
  emit('update', {
    corners: corners.value,
    area: form.value.area,
    plots: form.value.plots,
    address: address.value
  })
}

/* ===============================
   REVERSE GEOCODE
=============================== */
const reverseGeocode = async (lng, lat) => {
  try {
    const config = useRuntimeConfig()
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${config.public.mapboxToken}`
    )
    const data = await res.json()

    let building = '', road = '', company = '', landmark = '', areaName = '', lga = '', state = '', country = ''
    const pois = []

    data.features.forEach(f => {
      const t = f.place_type
      if (t.includes('poi')) pois.push(f.text)
      if (!building && t.includes('address')) {
        building = f.address || ''
        road = f.text
      }
      if (!areaName && t.includes('neighborhood')) areaName = f.text
      if (!lga && t.includes('place')) lga = f.text
      if (!state && t.includes('region')) state = f.text
      if (!country && t.includes('country')) country = f.text
    })

    company = pois[0] || ''
    landmark = pois[1] || ''

    const full = `${building ? building + ' ' : ''}${road}` +
      `${company ? ` (${company}${landmark ? ', opposite ' + landmark : ''})` : ''}` +
      `, ${lga || areaName}, ${state}, ${country}`

    address.value = { building, road, company, landmark, area: areaName, lga, state, country, full }
    emitData()
  } catch (err) {
    console.error('Reverse geocode failed', err)
  }
}

/* ===============================
   GPS LIVE
=============================== */
const startLivePosition = () => {
  if (!navigator.geolocation) return alert('GPS not supported')

  if (watchId) navigator.geolocation.clearWatch(watchId)

  watchId = navigator.geolocation.watchPosition(
    ({ coords }) => {
      const { latitude, longitude, accuracy: acc } = coords
      accuracy.value = Number(acc.toFixed(1))

      if (!marker) {
        marker = new mapboxgl.Marker({ color: 'blue' })
          .setLngLat([longitude, latitude])
          .addTo(map)
      } else {
        marker.setLngLat([longitude, latitude])
      }

      map.flyTo({ center: [longitude, latitude], zoom: 19 })
      reverseGeocode(longitude, latitude)
    },
    () => alert('Enable GPS permission'),
    { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
  )
}

/* ===============================
   ADD CORNER
=============================== */
const addCorner = () => {
  if (!marker) return alert('Wait for GPS')
  if (accuracy.value > REQUIRED_ACCURACY)
    return alert(`Wait… accuracy ${accuracy.value} m`)

  const { lat, lng } = marker.getLngLat()
  corners.value.push([lng, lat])
  drawPolygon()
}

/* ===============================
   DRAW POLYGON
=============================== */
const drawPolygon = () => {
  if (corners.value.length < 2) return

  const coords = [...corners.value]
  if (coords.length > 2) coords.push(coords[0]) // close polygon

  const geojson = {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [coords] }
  }

  // Add or update source & layer safely
  if (map.getSource('plot')) {
    map.getSource('plot').setData(geojson)
  } else {
    map.addSource('plot', { type: 'geojson', data: geojson })

    map.addLayer({
      id: 'plot-fill',
      type: 'fill',
      source: 'plot',
      paint: { 'fill-color': '#00ff00', 'fill-opacity': 0.2 }
    })

    map.addLayer({
      id: 'plot-line',
      type: 'line',
      source: 'plot',
      paint: { 'line-color': '#00aa00', 'line-width': 3 }
    })
  }

  // Calculate area & plots
  form.value.area = Math.round(geodesicArea(coords))
  form.value.plots = Math.round(form.value.area / 450)
  emitData()
}

/* ===============================
   GEODESIC AREA
=============================== */
const geodesicArea = (coords) => {
  const rad = Math.PI / 180
  const latRef = coords[0][1] * rad
  const meters = coords.map(([lng, lat]) => [
    lng * 111320 * Math.cos(latRef),
    lat * 110540
  ])

  let area = 0
  for (let i = 0; i < meters.length; i++) {
    const [x1, y1] = meters[i]
    const [x2, y2] = meters[(i + 1) % meters.length]
    area += x1 * y2 - x2 * y1
  }
  return Math.abs(area / 2)
}

/* ===============================
   RESET PLOT
=============================== */
const resetPlot = () => {
  corners.value = []
  form.value.area = 0
  form.value.plots = 0

  if (map.getSource('plot')) {
    if (map.getLayer('plot-fill')) map.removeLayer('plot-fill')
    if (map.getLayer('plot-line')) map.removeLayer('plot-line')
    map.removeSource('plot')
  }

  emitData()
}

/* ===============================
   INIT MAP
=============================== */
onMounted(async () => {
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
  <div class="space-y-4">
    <div>Accuracy: {{ accuracy }} m</div>

    <div class="bg-gray-100 p-3 rounded text-sm">
      📍 {{ address.full || 'Waiting for GPS...' }}
    </div>

    <div class="flex gap-2">
      <button @click="addCorner" class="bg-green-600 text-white px-4 py-2 rounded">Add Corner</button>
      <button @click="resetPlot" class="bg-red-600 text-white px-4 py-2 rounded">Reset</button>
    </div>

    <div ref="mapRef" class="w-full h-[500px] border rounded"></div>

    <div v-if="form.area">
      Area: {{ form.area }} m² (~{{ form.plots }} plots)
    </div>
  </div>
</ClientOnly>
</template>