<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue"
import "mapbox-gl/dist/mapbox-gl.css"
import Location from "../Ui/Icons/Location.vue"

const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(["update:modelValue"])

const mapRef = ref(null)

let map = null
let mapboxgl = null
let marker = null
let watchId = null

const accuracy = ref(9999)

/* ================= UPDATE PARENT ================= */

const updateParent = (data) => {

  emit("update:modelValue", {
    ...props.modelValue,

    location: {
      ...props.modelValue.location,
      ...data
    }

  })

}

/* ================= REVERSE GEOCODE ================= */

const reverseGeocode = async (lng, lat) => {

  const config = useRuntimeConfig()

  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${config.public.mapboxToken}`

  const res = await fetch(url)
  const data = await res.json()

  const place = {
    country: "",
    state: "",
    city: "",
    lga: "",
    address: ""
  }

  data.features.forEach((f) => {

    if (f.place_type.includes("country"))
      place.country = f.text

    if (f.place_type.includes("region"))
      place.state = f.text

    if (f.place_type.includes("place"))
      place.city = f.text

    if (f.place_type.includes("district"))
      place.lga = f.text

    if (f.place_type.includes("locality"))
      place.address = f.text

  })

  return place
}

/* ================= SAVE LOCATION ================= */

const saveLocation = async (lng, lat) => {

  const place = await reverseGeocode(lng, lat)

  updateParent({

    country: place.country,
    state: place.state,
    city: place.city,
    lga: place.lga,
    address: place.address,

    source: "gps",

    geometry: {
      type: "Point",
      coordinates: [lng, lat]
    }

  })

}

/* ================= START GPS ================= */

const startGPS = () => {

  if (!navigator.geolocation) {
    alert("GPS not supported")
    return
  }

  watchId = navigator.geolocation.watchPosition(

    ({ coords }) => {

      const { latitude, longitude, accuracy: acc } = coords

      accuracy.value = Number(acc.toFixed(1))

      if (!marker) {

        marker =
          new mapboxgl.Marker({
            draggable: true,
            color: "red"
          })
            .setLngLat([longitude, latitude])
            .addTo(map)

        marker.on("dragend", () => {

          const { lng, lat } = marker.getLngLat()

          saveLocation(lng, lat)

        })

      } else {

        marker.setLngLat([longitude, latitude])

      }

      map.flyTo({
        center: [longitude, latitude],
        zoom: 18
      })

      saveLocation(longitude, latitude)

    },

    () => alert("Enable GPS permission"),

    {
      enableHighAccuracy: true
    }

  )

}

/* ================= INIT MAP ================= */

onMounted(async () => {

  if (!process.client) return

  await nextTick()

  const config = useRuntimeConfig()

  mapboxgl = (await import("mapbox-gl")).default

  mapboxgl.accessToken = config.public.mapboxToken

  map = new mapboxgl.Map({

    container: mapRef.value,

    style: "mapbox://styles/mapbox/streets-v12",

    center: [3.9, 7.4],

    zoom: 15

  })

  map.on("load", startGPS)

})

/* ================= CLEANUP ================= */

onUnmounted(() => {

  if (watchId)
    navigator.geolocation.clearWatch(watchId)

  if (map)
    map.remove()

})
</script>

<template>

<ClientOnly>

<div class="p-4 space-y-4">

<div class="font-bold">
GPS Accuracy: {{ accuracy }} m
</div>

<div
ref="mapRef"
class="w-full h-[500px] rounded-xl border shadow">
</div>
<input v-model="Location.address" placeholder="Address" class="input"/>
<div class="text-sm text-gray-600">
Drag the marker to the house location.
</div>


</div>

</ClientOnly>

</template>
<style scoped>
.input { @apply w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black; }
</style>