<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const { $toast } = useNuxtApp()

const propertyId = route.query?.id || ""

const props = defineProps({
  purpose: {
    type: String,
    default: "Sale"
  }
})

/* ======================
STATE
====================== */
const MAX_IMAGES = 10

const previews = ref([null, null, null, null, null])
const survey = ref(Array(3).fill(null))
const titleDocs = ref(Array(3).fill(null))

const loadingMap = ref({})
const removingMap = ref({})

/* ======================
UTIL
====================== */
function optimizeCloudinary(url, width = 600) {
  if (!url || !url.includes("res.cloudinary.com")) return url
  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width},c_fill/`
  )
}

function getState(type) {
  if (type === "image") return previews
  if (type === "survey") return survey
  if (type === "titleDocs") return titleDocs
}

/* ======================
REFILL DATA
====================== */
function refillState(data) {
  previews.value = (data.images || []).map(i => ({
    _id: i._id,
    url: optimizeCloudinary(i.url),
    original: i.url
  }))

  while (previews.value.length < 5) previews.value.push(null)

  survey.value = Array.from({ length: 3 }, (_, i) => {
    const item = data.survey?.[i]
    return item
      ? { _id: item._id, url: optimizeCloudinary(item.url) }
      : null
  })

  titleDocs.value = Array.from({ length: 3 }, (_, i) => {
    const item = data.titleDocs?.[i]
    return item
      ? { _id: item._id, url: optimizeCloudinary(item.url) }
      : null
  })
}

/* ======================
UPLOAD SINGLE FILE (SERVER SAFE)
====================== */
async function uploadSingleFile(file, index, type) {
  const key = `${type}-${index}`
  loadingMap.value[key] = true

  try {
    const formData = new FormData()
    formData.append("image", file)

    const res = await useApiFetch(
      `/property/upload-image/${propertyId}/${type}`,
      {
        method: "POST",
        body: formData
      }
    )

    const response = res.data?.value || res.data
    const list = response?.data?.[type] || response?.data?.images || []
    const latest = list[list.length - 1]

    const state = getState(type)

    if (latest) {
      state.value[index] = {
        _id: latest._id,
        url: optimizeCloudinary(latest.url),
        original: latest.url
      }
    }

  } catch (err) {
    console.log(err)

    const state = getState(type)
    state.value[index] = null

    $toast.error("Upload failed")
  }

  loadingMap.value[key] = false
}

/* ======================
MAIN UPLOAD HANDLER (TIKTOK STYLE)
====================== */
async function handleUpload(event, index, type) {
  const files = Array.from(event.target.files || [])

  if (!files.length) return

  if (!propertyId) {
    $toast.error("Save property first")
    return
  }

  const state = getState(type)

  const uploadTasks = []

  for (const file of files) {

    // find empty slot per section
    let slot = state.value.findIndex(x => !x)

    if (slot === -1) {
      state.value.push(null)
      slot = state.value.length - 1
    }

    // instant preview (TikTok feel)
    state.value[slot] = {
      url: URL.createObjectURL(file),
      temp: true
    }

    // upload queue (single file per request)
    uploadTasks.push(uploadSingleFile(file, slot, type))
  }

  try {
    await Promise.all(uploadTasks)
    $toast.success("Upload completed")
  } catch (err) {
    console.log(err)
    $toast.error("Some uploads failed")
  }

  event.target.value = ""
}

/* ======================
REMOVE FILE (ALL TYPES)
====================== */
async function removeImage(index, type) {
  const state = getState(type)
  const img = state.value[index]

  if (!img?._id) return

  const key = `${type}-${index}`
  removingMap.value[key] = true

  try {
    await useApiFetch(`/property/image/${propertyId}`, {
      method: "DELETE",
      body: {
        id: img._id,
        type
      }
    })

    state.value[index] = null
    $toast.success("Removed")

  } catch (err) {
    console.log(err)
    $toast.error("Remove failed")
  }

  removingMap.value[key] = false
}

/* ======================
LOAD DATA
====================== */
const loadMedia = async () => {
  if (!propertyId) return

  try {
    const res = await useApiFetch(`/property/images/${propertyId}`)
    const response = res.data?.value || res.data

    if (response?.data) {
      refillState(response.data)
    }

  } catch (err) {
    console.log(err)
  }
}

/* ======================
INIT
====================== */
onMounted(loadMedia)
</script>
<template>
<div class="min-h-screen bg-gray-50 py-8">
  <Container>

    <div class="max-w-7xl mx-auto space-y-8">

      <!-- PAGE HEADER -->
      <div>
        <h1 class="sm:text-3xl text-xl font-bold text-gray-900">
          Property Media
        </h1>

        <p class="text-gray-500 md:text-lg text-sm mt-2">
          Upload photos, survey plans, title documents and property videos.
        </p>
      </div>

      <!-- ================= PROPERTY IMAGES ================= -->
      <div class="bg-white rounded-xl border border-gray-200 p-2 sm:p-6">

        <div class="flex sm:flex-row flex-col items-start justify-between mb-6">

          <div>
            <h2 class="text-xl font-semibold">
              Property Photos
            </h2>

            <p class="text-gray-500 text-sm mt-1">
              Upload up to 10 high-quality photos of your property.
            </p>
          </div>

          <div class="flex md:w-fit w-full justify-end">
            <div class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {{ previews.filter(x => x).length }}/10 Uploaded
            </div>
          </div>

        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-5 gap-2">

          <div
            v-for="(img,index) in previews"
            :key="'img-'+index"
            class="relative aspect-square rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 hover:border-primary transition"
          >

            <img
              v-if="img"
              :src="img.url"
              class="w-full h-full object-cover"
            />

            <div
              v-else
              class="absolute inset-0 flex flex-col items-center justify-center"
            >
              <img
                src="/image/icon/picture.svg"
                class="w-10 opacity-50"
              >

              <label
                :for="'upload-image-'+index"
                class="text-sm text-primary mt-3 cursor-pointer font-medium"
              >
                Upload Image
              </label>
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              :id="'upload-image-'+index"
              @change="handleUpload($event,index,'image')"
            />

            <div
              v-if="loadingMap[`image-${index}`] || removingMap[`image-${index}`]"
              class="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"/>
            </div>

            <button
              v-if="img"
              @click="removeImage(index,'image')"
              class="absolute top-2 right-2 bg-white shadow-md w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

          </div>

          <!-- ADD BOX -->
          <div
            v-if="previews.length < MAX_IMAGES"
            @click="openImagePicker"
            class="aspect-square rounded-2xl border-2 border-dashed border-gray-300 cursor-pointer flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition"
          >
            <div class="text-4xl font-light">+</div>
            <div class="text-sm text-gray-500">Add Photo</div>
          </div>

        </div>

      </div>

      <!-- ================= SURVEY ================= -->
      <div
        v-if="purpose === 'sale'"
        class="bg-white rounded-2xl border border-gray-200 p-2 md:p-6"
      >

        <h2 class="text-xl font-semibold">Survey Plan</h2>

        <p class="text-gray-500 text-sm mt-1 mb-5">
          Upload official survey plan documents.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">

          <div
            v-for="(img,index) in survey"
            :key="'survey-'+index"
            class="relative aspect-square rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 hover:border-primary transition"
          >

            <img
              v-if="img"
              :src="img.url"
              class="w-full h-full object-cover"
            />

            <div
              v-else
              class="absolute inset-0 flex flex-col items-center justify-center"
            >
              <img
                src="/image/icon/picture.svg"
                class="w-10 opacity-50"
              >

              <label
                :for="'upload-survey-'+index"
                class="text-sm text-primary mt-3 cursor-pointer font-medium"
              >
                Upload Survey
              </label>
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              :id="'upload-survey-'+index"
              @change="handleUpload($event,index,'survey')"
            />

            <div
              v-if="loadingMap[`survey-${index}`] || removingMap[`survey-${index}`]"
              class="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"/>
            </div>

            <button
              v-if="img"
              @click="removeImage(index,'survey')"
              class="absolute top-2 right-2 bg-white shadow-md w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

          </div>

        </div>
      </div>

      <!-- ================= TITLE DOCS ================= -->
      <div
        v-if="purpose === 'sale'"
        class="bg-white rounded-2xl border border-gray-200 p-2 sm:p-6"
      >

        <h2 class="text-xl font-semibold">Title Documents</h2>

        <p class="text-gray-500 text-sm mt-1 mb-5">
          C of O, Gazette, Deed of Assignment, Governor Consent, etc.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-5">

          <div
            v-for="(img,index) in titleDocs"
            :key="'title-'+index"
            class="relative aspect-square rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden"
          >

            <img
              v-if="img"
              :src="img.url"
              class="w-full h-full object-cover"
            />

            <div
              v-else
              class="absolute inset-0 flex flex-col items-center justify-center"
            >
              <label
                :for="'upload-title-'+index"
                class="cursor-pointer text-primary font-medium"
              >
                Upload Document
              </label>
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              :id="'upload-title-'+index"
              @change="handleUpload($event,index,'titleDocs')"
            />

            <div
              v-if="loadingMap[`titleDocs-${index}`] || removingMap[`titleDocs-${index}`]"
              class="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"/>
            </div>

            <button
              v-if="img"
              @click="removeImage(index,'titleDocs')"
              class="absolute top-2 right-2 bg-white shadow-md w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

          </div>

        </div>
      </div>

    </div>

  </Container>
</div>
</template>
<style scoped>
.input { @apply w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black; }
.section-title { @apply text-lg font-semibold; }
.btn-primary { @apply bg-black text-white px-6 py-2 rounded-lg; }
.btn-secondary { @apply border px-6 py-2 rounded-lg; }
</style>