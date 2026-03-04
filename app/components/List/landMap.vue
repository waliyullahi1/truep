<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import 'mapbox-gl/dist/mapbox-gl.css'

/* ======================
PROPS + MODEL
====================== */
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    default: 'land' // land | house
  }
})

const emit = defineEmits(['update:modelValue'])

/* ======================
MAP REFS
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

/* ======================
MAIN FORM (ONE OBJECT)
====================== */
const form = ref({
  location: {
    country: '',
    state: '',
    lga: '',
    city: '',
    address: '',
    source: 'gps',

    geometry: {
      type: props.type === 'house' ? 'Point' : 'Polygon',
      coordinates: []
    }
  },

  landDetails: {
    size: 0,
    unit: 'sqm',
    fenced: false,
    dry: true,
    roadAccess: false
  }
})

/* ======================
EMIT
====================== */
const emitData = () => {
  emit('update:modelValue', form.value)
}

/* ======================
REVERSE GEOCODE
====================== */
const reverseGeocode = async (lng, lat) => {
  const config = useRuntimeConfig()

  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${config.public.mapboxToken}`
  )

  const data = await res.json()

  let state = '', lga = '', city = '', country = '', road = ''

  data.features.forEach(f => {
    const t = f.place_type

    if (!road && t.includes('address')) road = f.text
    if (!city && t.includes('place')) city = f.text
    if (!lga && t.includes('district')) lga = f.text
    if (!state && t.includes('region')) state = f.text
    if (!country && t.includes('country')) country = f.text
  })

  form.value.location = {
    ...form.value.location,
    state,
    lga,
    city,
    country,
    address: road
  }

  emitData()
}

/* ======================
GPS
====================== */
const startLivePosition = () => {
  watchId = navigator.geolocation.watchPosition(
    ({ coords }) => {
      const { latitude, longitude, accuracy: acc } = coords
      accuracy.value = acc

      if (!marker) {
        marker = new mapboxgl.Marker({ color: 'blue' })
          .setLngLat([longitude, latitude])
          .addTo(map)
      } else {
        marker.setLngLat([longitude, latitude])
      }

      map.flyTo({ center: [longitude, latitude], zoom: 19 })

      /* HOUSE = POINT */
      if (props.type === 'house') {
        form.value.location.geometry = {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      }

      reverseGeocode(longitude, latitude)
      emitData()
    },
    () => alert('Enable GPS'),
    { enableHighAccuracy: true }
  )
}

/* ======================
ADD CORNER (LAND)
====================== */
const addCorner = () => {
  if (props.type === 'house') return
  if (accuracy.value > REQUIRED_ACCURACY) return

  const { lng, lat } = marker.getLngLat()

  corners.value.push([lng, lat])

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

  const area = geodesicArea(coords)

  form.value.landDetails.size = Math.round(area)

  emitData()

  if (map.getSource('plot')) {
    map.getSource('plot').setData({
      type: 'Feature',
      geometry: form.value.location.geometry
    })
  } else {
    map.addSource('plot', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: form.value.location.geometry
      }
    })

    map.addLayer({
      id: 'plot-fill',
      type: 'fill',
      source: 'plot',
      paint: { 'fill-color': '#00ff00', 'fill-opacity': 0.25 }
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
INIT
====================== */
onMounted(async () => {
  await nextTick()

  const config = useRuntimeConfig()

  mapboxgl = (await import('mapbox-gl')).default
  mapboxgl.accessToken = config.public.mapboxToken

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
})
</script>

<template>
<ClientOnly>
  <div class="space-y-4">

    <div>Accuracy: {{ accuracy.toFixed(1) }} m</div>

    <button
      v-if="type==='land'"
      @click="addCorner"
      class="bg-green-600 text-white px-4 py-2 rounded">
      Add Corner
    </button>

    <div ref="mapRef" class="w-full h-[500px] border rounded"></div>

  </div>
</ClientOnly>
</template>