<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { $toast } = useNuxtApp()

const propertyId = route.query?.id || ''

const props = defineProps({
  purpose: {
    type: String,
    default: 'Sale'
  }
})

/* ======================
STATE
====================== */
const MAX_IMAGES = 10
const previews = ref([null, null, null, null, null])
const survey = ref(Array(3).fill(null))
const titleDocs = ref(Array(3).fill(null))

// ✅ FIX: independent loaders
const loadingMap = ref({})
const removingMap = ref({})

/* ======================
CLOUDINARY OPTIMIZER
====================== */
function optimizeCloudinary(url, width = 600) {
  if (!url || !url.includes('res.cloudinary.com')) return url

  return url.replace(
    '/upload/',
    `/upload/f_auto,q_auto,w_${width},c_fill/`
  )
}

/* ======================
HELPER
====================== */
function getState(type) {
  if (type === 'image') return previews
  if (type === 'survey') return survey
  if (type === 'titleDocs') return titleDocs
}

/* ======================
REFILL STATE
====================== */
function refillState(data) {
  const imgs = (data.images || []).map(f => ({
    _id: f._id,
    url: optimizeCloudinary(f.url),
    original: f.url
  }))

  previews.value = imgs

  while (previews.value.length < Math.max(imgs.length, 3)) {
    previews.value.push(null)
  }

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
UPLOAD (KEY FIX 🚀)
====================== */
async function handleUpload(event, index, type) {
  const file = event.target.files[0]
  if (!file) return

  if (!propertyId) {
    $toast.error("Save property first")
    return
  }

  const state = getState(type)
  const key = `${type}-${index}`

  // ✅ independent loading
  loadingMap.value[key] = true

  // TEMP preview (isolated)
  const tempUrl = URL.createObjectURL(file)
  state.value[index] = {
    url: tempUrl,
    temp: true
  }

  try {
    const formData = new FormData()
    formData.append("image", file)

    const res = await useApiFetch(`/property/upload-image/${propertyId}/${type}`, {
      method: "POST",
      body: formData
    })

    const response = res.data?.value || res.data

    // ✅ get latest uploaded item ONLY
    const list = response?.data?.[type] || response?.data?.images || []
    const latest = list[list.length - 1]

    if (latest) {
      state.value[index] = {
        _id: latest._id,
        url: optimizeCloudinary(latest.url),
        original: latest.url
      }
    }

    $toast.success("Uploaded")

  } catch (err) {
    console.error(err)
    $toast.error("Upload failed")
    state.value[index] = null
  }

  loadingMap.value[key] = false
  event.target.value = ''
}

/* ======================
REMOVE (KEY FIX 🚀)
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
      body: { id: img._id, type }
    })

    // ✅ only clear that index (no reload!)
    state.value[index] = null

    $toast.success("Removed")

  } catch (err) {
    console.error(err)
    $toast.error("Remove failed")
  }

  removingMap.value[key] = false
}

/* ======================
ADD IMAGE BOX
====================== */
function addImageBox() {
  if (previews.value.length >= MAX_IMAGES) {
    $toast.error("Maximum 10 images allowed")
    return
  }
  previews.value.push(null)
}

/* ======================
LOAD MEDIA
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
    console.error(err)
  }
}

/* ======================
INIT
====================== */
onMounted(() => {
  loadMedia()
})
</script>
<template>
<div class="min-h-screen py-10 px-4">
  <Container>
    <div class="space-y-10">
 
      <!-- ================= LAND IMAGES ================= -->
      <div class="flex flex-wrap gap-6 items-start">

        <!-- IMAGE BOXES -->
        <div
          v-for="(img,index) in previews"
          :key="'img-'+index"
          class="relative w-56 h-48 border border-dashed border-gray-400 rounded-sm flex items-center justify-center hover:border-black transition overflow-hidden"
        >
          <img v-if="img" :src="img.url" class="w-full h-full object-cover"/>

          <div v-else class="text-center">
            <img src="/image/icon/picture.svg" class="w-14 mx-auto opacity-50"/>
            <p class="text-xs mt-2 text-gray-500">
              <label :for="'upload-image-'+index" class="text-blue-600 underline cursor-pointer">
                Browse
              </label>
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            class="hidden"
            :id="'upload-image-'+index"
            @change="handleUpload($event,index,'image')"
            :disabled="loadingMap[`image-${index}`] || removingMap[`image-${index}`]"
          />

          <div
          v-if="loadingMap[`image-${index}`] || removingMap[`image-${index}`]"
            class="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>

          <button
            v-if="img && loadingIndex !== `image-${index}`"
            @click="removeImage(index,'image')"
            class="absolute top-2 right-2 bg-slate-400/40 text-white w-7 h-7 flex justify-center items-center rounded-full text-xs"
          >
            <img src="/image/icon/delete.svg" class="w-5"/>
          </button>
        </div>

        <!-- ➕ ADD BOX -->
        <div
          v-if="previews.length < MAX_IMAGES"
          @click="addImageBox"
          class="w-56 h-48 border-2 border-dashed border-gray-400 rounded-sm flex items-center justify-center cursor-pointer hover:border-black transition"
        >
          <div class="text-center text-gray-500">
            <div class="text-4xl font-light">+</div>
            <p class="text-xs">Add more</p>
          </div>
        </div>

      </div>

      <!-- ================= SURVEY PLAN ================= -->
      <div v-if="purpose === 'sale'" class="border-t pt-10">
        <h2 class="section-title">Survey Plan (Required)</h2>
        <p class="text-gray-500 mb-4">Upload official survey plan.</p>

        <div class="flex flex-wrap gap-6">
          <div
            v-for="(img,index) in survey"
            :key="'survey-'+index"
            class="relative w-56 h-48 border border-dashed border-gray-400 rounded-sm flex items-center justify-center hover:border-black transition overflow-hidden"
          >
            <img v-if="img" :src="img.url" class="w-full h-full object-cover"/>

            <div v-else class="text-center">
              <img src="/image/icon/picture.svg" class="w-14 mx-auto opacity-50"/>
              <p class="text-xs mt-2 text-gray-500">
                <label :for="'upload-survey-'+index" class="text-blue-600 underline cursor-pointer">
                  Browse
                </label>
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              class="hidden"
              :id="'upload-survey-'+index"
              @change="handleUpload($event,index,'survey')"
              :disabled="loadingIndex === `survey-${index}` || removingIndex === `survey-${index}`"
            />

            <div
              v-if="loadingIndex === `survey-${index}` || removingIndex === `survey-${index}`"
              class="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>

            <button
              v-if="img && loadingIndex !== `survey-${index}`"
              @click="removeImage(index,'survey')"
              class="absolute top-2 right-2   bg-slate-500 text-white w-7 h-7 flex justify-center items-center rounded-full text-xs"
            >
              <img src="/image/icon/delete.svg" class="w-5"/>
            </button>
          </div>
        </div>
      </div>

      <!-- ================= TITLE DOCS ================= -->
      <div v-if="purpose === 'sale'" class="border-t pt-10">
        <h2 class="section-title">Title Document (Required)</h2>
        <p class="text-gray-500 mb-3">C of O, Deed, Gazette, etc.</p>

        <div class="flex flex-wrap gap-6">
          <div
            v-for="(img,index) in titleDocs"
            :key="'title-'+index"
            class="relative w-56 h-48 border border-dashed border-gray-400 rounded-sm flex items-center justify-center hover:border-black transition overflow-hidden"
          >
            <img v-if="img" :src="img.url" class="w-full h-full object-cover"/>

            <div v-else class="text-center">
              <img src="/image/icon/picture.svg" class="w-14 mx-auto opacity-50"/>
              <p class="text-xs mt-2 text-gray-500">
                <label :for="'upload-title-'+index" class="text-blue-600 underline cursor-pointer">
                  Browse
                </label>
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              class="hidden"
              :id="'upload-title-'+index"
              @change="handleUpload($event,index,'titleDocs')"
              :disabled="loadingIndex === `titleDocs-${index}` || removingIndex === `titleDocs-${index}`"
            />

            <div
              v-if="loadingIndex === `titleDocs-${index}` || removingIndex === `titleDocs-${index}`"
              class="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>

            <button
              v-if="img && loadingIndex !== `titleDocs-${index}`"
              @click="removeImage(index,'titleDocs')"
              class="absolute top-2 right-2 bg-slate-400/40 text-white w-7 h-7 flex justify-center items-center rounded-full text-xs"
            >
              <img src="/image/icon/delete.svg" class="w-5"/>
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