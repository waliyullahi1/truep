<script setup>
import { ref, onMounted, nextTick } from 'vue'

/* =========================
   REFS
========================= */
const mapRef = ref(null)

let map
let L
let myMarker
let destMarker
let routeLine

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
   DRAW ROUTE LINE
========================= */
const drawLine = () => {
  if (!myLocation || !destMarker) return

  if (routeLine) map.removeLayer(routeLine)

  const dest = destMarker.getLatLng()

  routeLine = L.polyline(
    [
      [myLocation.lat, myLocation.lng],
      [dest.lat, dest.lng]
    ],
    {
      color: 'red',
      weight: 5
    }
  ).addTo(map)
}

/* =========================
   SET DESTINATION MARKER
========================= */
const setDestination = (lat, lng) => {
  if (destMarker) map.removeLayer(destMarker)

  destMarker = L.marker([lat, lng], {
    draggable: true
  }).addTo(map)

  form.value.lat = lat.toFixed(6)
  form.value.lng = lng.toFixed(6)

  drawLine()

  destMarker.on('dragend', (e) => {
    const pos = e.target.getLatLng()
    form.value.lat = pos.lat.toFixed(6)
    form.value.lng = pos.lng.toFixed(6)
    drawLine()
  })
}

/* =========================
   SEARCH PLACE (OPTIONAL)
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
   GET EXACT GPS LOCATION
========================= */
const useMyLocation = () => {
  if (!navigator.geolocation) return

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords

      myLocation = {
        lat: latitude,
        lng: longitude
      }

      /* zoom very close (street level) */
      map.setView([latitude, longitude], 19)

      /* blue marker for YOU */
      if (myMarker) map.removeLayer(myMarker)

      myMarker = L.circleMarker([latitude, longitude], {
        radius: 10,
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.7
      }).addTo(map)
    },
    () => alert('Turn on GPS or allow location permission'),
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    }
  )
}

/* =========================
   INIT MAP
========================= */
onMounted(async () => {
  if (!process.client) return

  await nextTick()

  /* IMPORTANT: dynamic import (fix SSR window error) */
  L = (await import('leaflet')).default
  await import('leaflet/dist/leaflet.css')

  map = L.map(mapRef.value)

  /* OpenStreetMap tiles */
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '© OpenStreetMap contributors'
    }
  ).addTo(map)

  /* click anywhere → set destination */
  map.on('click', (e) => {
    setDestination(e.latlng.lat, e.latlng.lng)
  })

  /* AUTO load your location immediately */
  useMyLocation()

  map.invalidateSize()
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