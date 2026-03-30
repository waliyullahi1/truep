<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { $toast } = useNuxtApp()

const propertyId = route.query?.id || ''

/* ======================
STATE
====================== */
const previews = ref(Array(6).fill(null))
const survey = ref(Array(3).fill(null))
const titleDocs = ref(Array(3).fill(null))

const loadingIndex = ref(null)
const removingIndex = ref(null)

/* ======================
HELPER
====================== */
function getState(type) {
  if (type === 'image') return previews
  if (type === 'survey') return survey
  if (type === 'titleDocs') return titleDocs
}

function refillState(data) {
  previews.value = Array.from({ length: 6 }, (_, i) => data.images?.[i] || null)
  survey.value = Array.from({ length: 3 }, (_, i) => data.survey?.[i] || null)
  titleDocs.value = Array.from({ length: 3 }, (_, i) => data.titleDocs?.[i] || null)
}

/* ======================
UPLOAD
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

  loadingIndex.value = key

  // temp preview
  state.value[index] = {
    url: URL.createObjectURL(file),
    temp: true
  }

  try {
    const formData = new FormData()
    formData.append("image", file)

    const res = await useApiFetch(`/property/upload-image/${propertyId}/${type}`, {
      method: "POST",
      body: formData
    })

    const data = res.data?.value || res.data
    if (!data) throw new Error()

    refillState(data)
    $toast.success("Uploaded")

  } catch (err) {
    console.error(err)
    $toast.error("Upload failed")
    state.value[index] = null
  }

  loadingIndex.value = null
}

/* ======================
REMOVE
====================== */
async function removeImage(index, type) {
  const state = getState(type)
  const img = state.value[index]
  if (!img?._id) return

  const key = `${type}-${index}`
  removingIndex.value = key

  try {
    const res = await useApiFetch(`/property/image/${propertyId}`, {
      method: "DELETE",
      body: { id: img._id, type }
    })

    const data = res.data?.value || res.data
    if (!data) throw new Error()

    refillState(data)
    $toast.success("Removed")

  } catch (err) {
    console.error(err)
    $toast.error("Remove failed")
  }

  removingIndex.value = null
}

/* ======================
FETCH EXISTING
====================== */
onMounted(async () => {
  if (!propertyId) return

  try {
    const res = await useApiFetch(`/property/images/${propertyId}`)
    const data = res.data?.value || res.data
    if (data) refillState(data)
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
<div class="min-h-screen py-10 px-4">
  <Container>
    <div class="space-y-10">

      <!-- ================= LAND IMAGES ================= -->
      <div>
        <h2 class="section-title">Land Images (max 6)</h2>
        <p class="text-gray-500 mb-6">Visual examples attract buyers.</p>

        <div class="flex flex-wrap gap-6">
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
              :disabled="loadingIndex === `image-${index}` || removingIndex === `image-${index}`"
            />

            <div
              v-if="loadingIndex === `image-${index}` || removingIndex === `image-${index}`"
              class="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>

            <button
              v-if="img && loadingIndex !== `image-${index}`"
              @click="removeImage(index,'image')"
              class="absolute top-2 right-2 bg-black/40 text-white w-7 h-7 flex justify-center items-center rounded-full text-xs"
            >
              <img src="/image/icon/delete.svg" class="w-5"/>
            </button>
          </div>
        </div>
      </div>

      <!-- ================= SURVEY PLAN ================= -->
      <div class="border-t pt-10">
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
              class="absolute top-2 right-2 bg-black/40 text-white w-7 h-7 flex justify-center items-center rounded-full text-xs"
            >
              <img src="/image/icon/delete.svg" class="w-5"/>
            </button>
          </div>
        </div>
      </div>

      <!-- ================= TITLE DOCS ================= -->
      <div class="border-t pt-10">
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
              class="absolute top-2 right-2 bg-black/40 text-white w-7 h-7 flex justify-center items-center rounded-full text-xs"
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