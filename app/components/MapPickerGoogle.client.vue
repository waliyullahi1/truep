<script setup>
import { ref, onMounted } from 'vue'
import { useLoadGoogleMaps } from '@fawmi/vue-google-maps'

const form = ref({
  lat: null,
  lng: null,
  address: ''
})

const mapRef = ref(null)
const markerRef = ref(null)

const mapOptions = {
  zoom: 16,
  center: { lat: 9.082, lng: 8.675 },
}

const gmaps = useLoadGoogleMaps()

/* ================= Current Location ================= */
const useMyLocation = async () => {
  if (!navigator.geolocation) {
    alert('GPS not supported')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords
      form.value.lat = latitude
      form.value.lng = longitude
      mapRef.value.panTo({ lat: latitude, lng: longitude })
      markerRef.value.setPosition({ lat: latitude, lng: longitude })
    },
    (err) => {
      alert('Cannot get GPS location, make sure GPS is on')
      console.log(err)
    },
    { enableHighAccuracy: true }
  )
}

/* ================= Search Place ================= */
const searchPlace = () => {
  const input = document.getElementById('gmap-search')
  const searchBox = new google.maps.places.SearchBox(input)
  
  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces()
    if (!places || !places.length) return

    const place = places[0]
    const location = place.geometry.location
    mapRef.value.panTo(location)
    markerRef.value.setPosition(location)
    form.value.lat = location.lat()
    form.value.lng = location.lng()
    form.value.address = place.formatted_address
  })
}

onMounted(() => {
  if (!process.client) return

  gmaps().then(() => {
    // initialize marker
    markerRef.value = new google.maps.Marker({
      map: mapRef.value,
      draggable: true,
    })

    // update form on drag
    markerRef.value.addListener('dragend', (e) => {
      form.value.lat = e.latLng.lat()
      form.value.lng = e.latLng.lng()
    })

    // auto search
    searchPlace()
  })
})
</script>

<template>
<ClientOnly>
  <div class="space-y-4">

    <input
      id="gmap-search"
      type="text"
      placeholder="Search location"
      class="border rounded-lg px-3 py-2 w-full"
    />

    <button @click="useMyLocation"
      class="bg-green-600 text-white px-4 rounded-lg">
      📍 My Location
    </button>

    <GMapMap
      ref="mapRef"
      :center="{ lat: 9.082, lng: 8.675 }"
      :zoom="16"
      style="width: 100%; height: 350px"
    >
      <GMapMarker
        :position="{ lat: form.lat || 9.082, lng: form.lng || 8.675 }"
        :draggable="true"
        @dragend="e => {
          form.lat = e.latLng.lat();
          form.lng = e.latLng.lng();
        }"
      />
    </GMapMap>

    <p class="text-xs text-gray-500">
      Lat: {{ form.lat }} | Lng: {{ form.lng }} | Address: {{ form.address }}
    </p>
  </div>
</ClientOnly>
</template>
