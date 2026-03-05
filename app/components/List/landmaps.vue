<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'
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
let map
let mapboxgl
let marker
let watchId

/* ======================
STATE
====================== */
const accuracy = ref(9999)
const REQUIRED_ACCURACY = 5
const corners = ref([])

let lastEmit = 0
let lastGPS = 0
let lastGeo = 0

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
    geometry: {
      type: 'Point',
      coordinates: []
    }
  },
  landDetails: {
    size: 0,
    unit: 'sqm'
  }
})

/* ======================
SYNC PARENT → CHILD
====================== */
watch(
  () => props.modelValue,
  (val) => {
    if (!val) return
    form.value = JSON.parse(JSON.stringify(val))
  },
  { deep: true, immediate: true }
)

/* ======================
COMPUTED
====================== */
const plots = computed(() =>
  Math.round(form.value.landDetails.size / 400)
)

const hectares = computed(() =>
  (form.value.landDetails.size / 10000).toFixed(3)
)

/* ======================
SAFE EMIT
====================== */
const emitData = () => {

  const now = Date.now()

  if (now - lastEmit < 1500) return
  lastEmit = now

  const data = JSON.parse(JSON.stringify(form.value))

  emit('update:modelValue', data)

}

/* ======================
REVERSE GEOCODE
====================== */
const reverseGeocode = async (lng, lat) => {

  const now = Date.now()

  if (now - lastGeo < 5000) return
  lastGeo = now

  const config = useRuntimeConfig()

  try {

    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${config.public.mapboxToken}`
    )

    const data = await res.json()

    const feature = data.features[0]

    if (!feature) return

    form.value.location.fullAddress = feature.place_name

    feature.context?.forEach((ctx) => {

      if (ctx.id.includes('country'))
        form.value.location.country = ctx.text

      if (ctx.id.includes('region'))
        form.value.location.state = ctx.text

      if (ctx.id.includes('place'))
        form.value.location.city = ctx.text

      if (ctx.id.includes('district'))
        form.value.location.lga = ctx.text

    })

    form.value.location.address = feature.text

    emitData()

  } catch (e) {
    console.log('Geocode error', e)
  }
}

/* ======================
GPS TRACKING
====================== */
const startGPS = () => {

  watchId = navigator.geolocation.watchPosition(

    ({ coords }) => {

      const now = Date.now()

      if (now - lastGPS < 3000) return
      lastGPS = now

      const { latitude, longitude, accuracy: acc } = coords

      accuracy.value = acc

      if (!marker) {

        marker = new mapboxgl.Marker({ draggable: true })
          .setLngLat([longitude, latitude])
          .addTo(map)

        marker.on('dragend', () => {

          const pos = marker.getLngLat()

          updatePoint(pos.lng, pos.lat)

        })
      }

      marker.setLngLat([longitude, latitude])

      map.setCenter([longitude, latitude])

      updatePoint(longitude, latitude)

    },

    () => alert('Please enable GPS'),

    { enableHighAccuracy: true }

  )
}

/* ======================
UPDATE POINT
====================== */
const updatePoint = (lng, lat) => {

  if (props.type === 'house') {

    form.value.location.geometry = {
      type: 'Point',
      coordinates: [lng, lat]
    }

    reverseGeocode(lng, lat)

    emitData()

  }

}

/* ======================
ADD CORNER
====================== */
const addCorner = () => {

  if (accuracy.value > REQUIRED_ACCURACY)
    return alert('Wait for better GPS accuracy')

  const { lng, lat } = marker.getLngLat()

  corners.value.push([lng, lat])

  drawPolygon()

}

/* ======================
UNDO
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

  reverseGeocode(coords[0][0], coords[0][1])

  emitData()

  const geo = {
    type: 'Feature',
    geometry: form.value.location.geometry
  }

  if (map.getSource('land')) {

    map.getSource('land').setData(geo)

  } else {

    map.addSource('land', { type: 'geojson', data: geo })

    map.addLayer({
      id: 'land-fill',
      type: 'fill',
      source: 'land',
      paint: {
        'fill-color': '#00ff88',
        'fill-opacity': 0.25
      }
    })

    map.addLayer({
      id: 'land-line',
      type: 'line',
      source: 'land',
      paint: {
        'line-color': '#00aa55',
        'line-width': 3
      }
    })

  }

}

/* ======================
AREA CALC
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
SATELLITE TOGGLE
====================== */
const toggleSatellite = () => {

  const style = map.getStyle().sprite.includes('satellite')
    ? 'mapbox://styles/mapbox/streets-v12'
    : 'mapbox://styles/mapbox/satellite-streets-v12'

  map.setStyle(style)

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

  map.on('load', startGPS)

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

<div>Hectares: {{ hectares }}</div>

<div class="flex gap-2">

<button
@click="addCorner"
class="bg-green-600 text-white px-3 py-2 rounded">
Add Corner
</button>

<button
@click="undoCorner"
class="bg-yellow-500 text-white px-3 py-2 rounded">
Undo
</button>

<button
@click="toggleSatellite"
class="bg-purple-600 text-white px-3 py-2 rounded">
Satellite
</button>

<button
@click="exportGeoJSON"
class="bg-blue-600 text-white px-3 py-2 rounded">
Export
</button>

</div>

<div
ref="mapRef"
class="w-full h-[500px] rounded border">
</div>

</div>

</ClientOnly>
</template>