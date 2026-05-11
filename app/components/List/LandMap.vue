<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue"
import "mapbox-gl/dist/mapbox-gl.css"

/* =========================
PROPS
========================= */
const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(["update:modelValue"])

/* =========================
MAP REFS
========================= */
const mapRef = ref(null)

let map = null
let mapboxgl = null
let myMarker = null
let watchId = null

/* =========================
DATA
========================= */
const corners = ref([])
const area = ref(0)
const plots = ref(0)

/* =========================
ACCURACY
========================= */
const accuracy = ref(9999)
const TEST_MODE = true

const REQUIRED_ACCURACY = TEST_MODE ? 999999 : 20
/* =========================
SAFE UPDATE PARENT
========================= */
const updateParent = (extra = {}) => {
  emit("update:modelValue", {
    ...props.modelValue,

    location: {
      ...(props.modelValue?.location || {}),
      ...(extra.location || {})
    },

    landDetails: {
      ...(props.modelValue?.landDetails || {}),
      ...(extra.landDetails || {})
    }
  })
}

/* =========================
REVERSE GEOCODE
========================= */
const reverseGeocode = async (lng, lat) => {
  try {
    const config = useRuntimeConfig()

    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${config.public.mapboxToken}`
    )

    const data = await res.json()

    const place = {
      country: "",
      state: "",
      city: "",
      lga: "",
      address: ""
    }

   data.features.forEach((f) => {
  if (f.place_type.includes("country")) {
    place.country = f.text
  }

  if (f.place_type.includes("region")) {
    place.state = f.text
  }

  if (f.place_type.includes("place")) {
    place.city = f.text
  }

  if (f.place_type.includes("district")) {
    place.lga = f.text
  }

  // AREA / ADDRESS
  if (
    f.place_type.includes("locality") ||
    f.place_type.includes("neighborhood") ||
    f.place_type.includes("address") ||
    f.place_type.includes("poi")
  ) {
    place.address = f.place_name || f.text
  }
})

    return place
  } catch (err) {
    console.log("Geocode error", err)
    return null
  }
}

/* =========================
GPS TRACKING
========================= */
const startLivePosition = () => {
  if (!navigator.geolocation) return alert("GPS not supported")

  if (watchId) navigator.geolocation.clearWatch(watchId)

  watchId = navigator.geolocation.watchPosition(
    ({ coords }) => {
      const { latitude, longitude, accuracy: acc } = coords

      accuracy.value = Number(acc.toFixed(1))

      if (!myMarker) {
        myMarker = new mapboxgl.Marker({ color: "blue" })
          .setLngLat([longitude, latitude])
          .addTo(map)
      } else {
        myMarker.setLngLat([longitude, latitude])
      }

      map.flyTo({
        center: [longitude, latitude],
        zoom: 19
      })
    },
    () => alert("Enable GPS permission"),
    { enableHighAccuracy: true }
  )
}

/* =========================
ADD CORNER
========================= */
const addCorner = async () => {
    if (hasExistingPolygon.value) {
    alert("Polygon already exists. Reset to edit.")
    return
  }
  if (!myMarker) return alert("Wait for GPS")

  if (accuracy.value > REQUIRED_ACCURACY) {
    return alert(`Low accuracy: ${accuracy.value}m`)
  }

  const { lat, lng } = myMarker.getLngLat()

  corners.value.push([lng, lat])

  const place = await reverseGeocode(lng, lat)

  if (place) {
    updateParent({
      location: place
    })
  }

  drawPolygon()
}

/* =========================
DRAW POLYGON
========================= */
const drawPolygon = () => {
  if (!map) return
  if (corners.value.length < 3) return

  const coords = [...corners.value]
  coords.push(coords[0]) // close polygon

  const geojson = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [coords]
    }
  }

  if (map.getSource("plot")) {
    map.getSource("plot").setData(geojson)
  } else {
    map.addSource("plot", { type: "geojson", data: geojson })

    map.addLayer({
      id: "plot-fill",
      type: "fill",
      source: "plot",
      paint: { "fill-color": "#ff0000", "fill-opacity": 0.2 }
    })

    map.addLayer({
      id: "plot-line",
      type: "line",
      source: "plot",
      paint: { "line-color": "#ff0000", "line-width": 3 }
    })
  }

  area.value = Math.round(geodesicAreaMeters(coords))
  plots.value = Math.round(area.value / 450)

  updateParent({
    location: {
      geometry: {
        type: "Polygon",
        coordinates: [coords]
      }
    },
    landDetails: {
      size: area.value,
      totalSqm: area.value
    }
  })
}

/* =========================
LOAD EXISTING DATA (🔥 FIX)
========================= */
watch(
  () => props.modelValue?.location?.geometry?.coordinates,
  (coords) => {
    if (!coords || !coords.length) return

    const polygon = coords[0]
    if (!polygon || polygon.length < 3) return

    // remove closing point
    corners.value = polygon.slice(0, -1)

    setTimeout(() => {
      drawPolygon()

      const [lng, lat] = corners.value[0]
      map?.flyTo({ center: [lng, lat], zoom: 18 })
    }, 500)
  },
  { immediate: true, deep: true }
)

/* =========================
AREA CALCULATION
========================= */
const geodesicAreaMeters = (coords) => {
  if (coords.length < 3) return 0

  const rad = Math.PI / 180
  const latRef = coords[0][1] * rad

  const meters = coords.map(([lng, lat]) => {
    const x = lng * 111320 * Math.cos(latRef)
    const y = lat * 110540
    return [x, y]
  })

  let area = 0

  for (let i = 0; i < meters.length; i++) {
    const [x1, y1] = meters[i]
    const [x2, y2] = meters[(i + 1) % meters.length]
    area += x1 * y2 - x2 * y1
  }

  return Math.abs(area / 2)
}

/* =========================
RESET
========================= */
const resetPlot = () => {
  corners.value = []
  area.value = 0
  plots.value = 0

  if (map?.getSource("plot")) {
    map.removeLayer("plot-fill")
    map.removeLayer("plot-line")
    map.removeSource("plot")
  }

  updateParent({
    location: {
      geometry: { type: "Polygon", coordinates: [] }
    },
    landDetails: {
      size: 0,
      totalSqm: 0
    }
  })
}

/* =========================
INIT MAP
========================= */
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
    zoom: 18
  })
map.addControl(new mapboxgl.NavigationControl(), "top-right")
map.scrollZoom.enable()
map.touchZoomRotate.enable()
  map.on("load", startLivePosition)

})

onUnmounted(() => {
  if (watchId) navigator.geolocation.clearWatch(watchId)
  if (map) map.remove()
})

const hasExistingPolygon = computed(() => {
  const coords = props.modelValue?.location?.geometry?.coordinates
  return coords && coords.length && coords[0]?.length >= 3
})
</script>

<template>
  <ClientOnly>
    <div class="md:p-4 sm:p-0 space-y-4">

      <!-- ACCURACY -->
      <div class="font-bold">
        Accuracy: {{ accuracy }} m
      </div>

      <!-- GPS STATUS -->
      <div
        v-if="accuracy > REQUIRED_ACCURACY"
        class="text-red-600"
      >
        Waiting for better GPS accuracy...
      </div>

      <div
        v-else
        class="text-green-600"
      >
        GPS Ready ✓
      </div>

      <!-- ACTION BUTTONS -->
      <div class="flex gap-2">
        <button
          @click="addCorner"
          :disabled="hasExistingPolygon"
          class="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Add Corner
        </button>

        <button
          @click="resetPlot"
          class="bg-red-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <!-- MAP -->
      <div
        ref="mapRef"
        class="w-full h-[500px] rounded-xl border shadow"
      ></div>

      <!-- LOCATION DETAILS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        <!-- STATE -->
        <div>
          <label class="block text-sm font-semibold mb-2">
            State
          </label>

          <input
            type="text"
            :value="props.modelValue?.location?.state || ''"
            readonly
            disabled
            class="w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        <!-- CITY -->
        <div>
          <label class="block text-sm font-semibold mb-2">
            City
          </label>

          <input
            type="text"
            :value="props.modelValue?.location?.city || ''"
            readonly
            disabled
            class="w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        <!-- AREA -->
        <div>
          <label class="block text-sm font-semibold mb-2">
            Area
          </label>

          <input
            type="text"
            :value="props.modelValue?.location?.address || ''"
            readonly
            disabled
            class="w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

      </div>

      <!-- EXTRA LOCATION -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- COUNTRY -->
        <div>
          <label class="block text-sm font-semibold mb-2">
            Country
          </label>

          <input
            type="text"
            :value="props.modelValue?.location?.country || ''"
            readonly
            disabled
            class="w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        <!-- LGA -->
        <div>
          <label class="block text-sm font-semibold mb-2">
            LGA
          </label>

          <input
            type="text"
            :value="props.modelValue?.location?.lga || ''"
            readonly
            disabled
            class="w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

      </div>

      <!-- LAND INFO -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- AREA SIZE -->
        <div>
          <label class="block text-sm font-semibold mb-2">
            Total Area (m²)
          </label>

          <input
            type="text"
            :value="area || 0"
            readonly
            disabled
            class="w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        <!-- PLOTS -->
        <div>
          <label class="block text-sm font-semibold mb-2">
            Estimated Plots
          </label>

          <input
            type="text"
            :value="plots || 0"
            readonly
            disabled
            class="w-full border rounded-xl px-4 py-3 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

      </div>

      <!-- SUMMARY -->
      <div class="text-sm text-gray-600 border rounded-xl p-4 bg-gray-50">
        <div>
          Corners Added:
          <span class="font-semibold">
            {{ corners.length }}
          </span>
        </div>

        <div v-if="area">
          Land Area:
          <span class="font-semibold">
            {{ area }} m²
          </span>

          (~{{ plots }} plots)
        </div>
      </div>

    </div>
  </ClientOnly>
</template>