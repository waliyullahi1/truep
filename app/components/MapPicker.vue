<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const emit = defineEmits(['update'])

const mapRef = ref(null)
let map
let marker

onMounted(() => {
  map = L.map(mapRef.value).setView([8.9, 7.4], 6) // Nigeria center

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map)

  map.on('click', (e) => {
    const { lat, lng } = e.latlng

    if (marker) map.removeLayer(marker)

    marker = L.marker([lat, lng]).addTo(map)

    emit('update', { lat, lng }) // send to parent
  })
})
</script>

<template>
  <div ref="mapRef" class="h-80 w-full rounded-xl border"></div>
</template>
