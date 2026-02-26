<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'

/* =========================
   REFS
========================= */
const mapRef = ref(null)
let map
let L
let myMarker
let destMarker
let routePolygon
let watchId = null

/* =========================
   FORM
========================= */
const form = ref({
  lat: '',
  lng: '',
  address: ''
})

let myLocation = null

/* =========================
   DRAW RECTANGLE ROUTE
========================= */
const drawRectangle = () => {
  if (!myLocation || !destMarker) return

  // remove previous polygon
  if (routePolygon) map.removeLayer(routePolygon)

  const dest = destMarker.getLatLng()
  const lat1 = myLocation.lat
  const lng1 = myLocation.lng
  const lat2 = dest.lat
  const lng2 = dest.lng

  // rectangle corners
  const bounds = [
    [lat1, lng1],
    [lat1, lng2],
    [lat2, lng2],
    [lat2, lng1]
  ]

  routePolygon = L.polygon(bounds, {
    color: 'red',
    weight: 2,
    fillOpacity: 0.1
  }).addTo(map)
}

/* =========================
   SET DESTINATION
========================= */
const setDestination = (lat, lng) => {
  if (destMarker) map.removeLayer(destMarker)

  destMarker = L.marker([lat, lng], {
    draggable: true
  }).addTo(map)

  form.value.lat = lat.toFixed(6)
  form.value.lng = lng.toFixed(6)

  drawRectangle()

  destMarker.on('dragend', (e) => {
    const pos = e.target.getLatLng()
    form.value.lat = pos.lat.toFixed(6)
    form.value.lng = pos.lng.toFixed(6)
    drawRectangle()
  })
}

/* =========================
   SEARCH PLACE
========================= */
const searchPlace = async () => {
  if (!form.value.address) return

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${form.value.address}`
  )

  const data = await res.json()
  if (!data.length) return

  const { lat, lon } = data[0]

  map.setView([lat, lon], 19)
  setDestination(+lat, +lon)
}

/* =========================
   LIVE GPS TRACKING
========================= */
const useMyLocation = () => {
  if (!navigator.geolocation) return

  if (watchId) navigator.geolocation.clearWatch(watchId)

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords

      myLocation = { lat: latitude, lng: longitude }

      // move map smoothly
      map.setView([latitude, longitude], 19)

      // blue marker
      if (!myMarker) {
        myMarker = L.circleMarker([latitude, longitude], {
          radius: 10,
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 0.8
        }).addTo(map)
      } else {
        myMarker.setLatLng([latitude, longitude])
      }

      // update rectangle live
      drawRectangle()
    },
    () => alert('Turn on GPS or allow location permission'),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 15000
    }
  )
}

/* =========================
   INIT MAP
========================= */
onMounted(async () => {
  if (!process.client) return

  await nextTick()

  // dynamic import for SSR safety
  L = (await import('leaflet')).default
  await import('leaflet/dist/leaflet.css')

  map = L.map(mapRef.value)

  // OpenStreetMap tiles
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '© OpenStreetMap contributors'
    }
  ).addTo(map)

  // click to set destination
  map.on('click', (e) => {
    setDestination(e.latlng.lat, e.latlng.lng)
  })

  // start live GPS tracking
  useMyLocation()

  map.invalidateSize()
})

/* =========================
   CLEANUP
========================= */
onUnmounted(() => {
  if (watchId) navigator.geolocation.clearWatch(watchId)
})
</script>

<template>
<ClientOnly>
  <div class="p-4 space-y-4">

    <!-- SEARCH -->
    <div class="flex gap-2">
      <input
        v-model="form.address"
        placeholder="Search place (Iwo, Osogbo, Lagos...)"
        class="flex-1 border rounded px-3 py-2 text-sm"
      />

      <button
        @click="searchPlace"
        class="bg-blue-600 text-white px-4 rounded"
      >
        Search
      </button>

      <button
        @click="useMyLocation"
        class="bg-green-600 text-white px-4 rounded"
      >
        📍 My Location
      </button>
    </div>

    <!-- MAP -->
    <div
      ref="mapRef"
      class="w-full h-[500px] rounded-xl border shadow"
    ></div>

    <!-- COORDINATES -->
    <div class="text-xs text-gray-500">
      Destination → Lat: {{ form.lat }} | Lng: {{ form.lng }}
    </div>

  </div>
</ClientOnly>
</template>