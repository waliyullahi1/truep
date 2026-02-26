<script setup>
import { ref, onMounted, nextTick } from 'vue'

const mapRef = ref(null)

let map
let marker
let L

const form = ref({
  lat: '',
  lng: '',
  address: ''
})

/* =========================
   SEARCH FUNCTION
========================= */
const searchPlace = async () => {
  if (!form.value.address) return

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${form.value.address}`
  )
  const data = await res.json()

  if (!data.length) return

  const { lat, lon } = data[0]

  map.setView([lat, lon], 18)
  setMarker(lat, lon)
}

/* =========================
   SET MARKER
========================= */
const setMarker = (lat, lng) => {
  if (marker) map.removeLayer(marker)

  marker = L.marker([lat, lng], { draggable: true }).addTo(map)

  form.value.lat = Number(lat).toFixed(6)
  form.value.lng = Number(lng).toFixed(6)

  marker.on('dragend', (e) => {
    const pos = e.target.getLatLng()
    form.value.lat = pos.lat.toFixed(6)
    form.value.lng = pos.lng.toFixed(6)
  })
}

/* =========================
   CURRENT LOCATION (HIGH ACCURACY)
========================= */
const useMyLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation not supported by your browser')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords
      map.setView([latitude, longitude], 18) // zoom closer
      setMarker(latitude, longitude)
    },
    (err) => {
      alert('Could not get your exact location. Make sure GPS is on.')
      console.log(err)
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  )
}

/* =========================
   MAP INIT
========================= */
onMounted(async () => {
  if (!process.client) return

  await nextTick()

  L = (await import('leaflet')).default
  await import('leaflet/dist/leaflet.css')

  map = L.map(mapRef.value).setView([9.0820, 8.6753], 6) // default Nigeria center

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  map.on('click', (e) => {
    setMarker(e.latlng.lat, e.latlng.lng)
  })

  map.invalidateSize()
})
</script>

<template>
<ClientOnly>
  <div class="space-y-4">

    <!-- SEARCH -->
    <div class="flex gap-2">
      <input
        v-model="form.address"
        placeholder="Search location (Lagos, Abuja...)"
        class="flex-1 border rounded-lg px-3 py-2 text-sm"
      />

      <button
        @click="searchPlace"
        class="bg-blue-600 text-white px-4 rounded-lg"
      >
        Search
      </button>

      <button
        @click="useMyLocation"
        class="bg-green-600 text-white px-4 rounded-lg"
      >
        📍 My Location
      </button>
    </div>

    <!-- MAP -->
    <div
      ref="mapRef"
      class="w-full h-[350px] rounded-xl border shadow"
    ></div>

    <!-- COORDS -->
    <div class="text-xs text-gray-500">
      Lat: {{ form.lat }} | Lng: {{ form.lng }}
    </div>

  </div>
</ClientOnly>
</template>
