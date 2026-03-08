<script setup>
import { ref, computed } from "vue"

/* ================= PROPS ================= */
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(["update:modelValue"])

/* ================= SYNC WITH PARENT ================= */
const form = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit("update:modelValue", val)
  }
})

/* ================= IMAGE PREVIEWS ================= */
const previews = ref([null, null, null, null, null, null])
const surveyPreview = ref(null)
const titlePreview = ref(null)

/* ================= IMAGE / FILE UPLOAD ================= */
function handleUpload(e, index, target = "images") {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    if (target === "images") {
      previews.value[index] = reader.result

      const images = [...(form.value.media.images || [])]
      images[index] = file

      form.value = {
        ...form.value,
        media: {
          ...form.value.media,
          images
        }
      }
    }

    if (target === "survey") {
      surveyPreview.value = reader.result

      form.value = {
        ...form.value,
        documents: {
          ...form.value.documents,
          surveyPlan: file
        }
      }
    }

    if (target === "titleDocs") {
      titlePreview.value = reader.result

      form.value = {
        ...form.value,
        documents: {
          ...form.value.documents,
          titleDocument: file
        }
      }
    }
  }

  reader.readAsDataURL(file)
}

/* ================= REMOVE FILE ================= */
function removeImage(index, target = "images") {
  if (target === "images") {
    previews.value[index] = null

    const images = [...(form.value.media.images || [])]
    images[index] = null

    form.value = {
      ...form.value,
      media: {
        ...form.value.media,
        images
      }
    }
  }

  if (target === "survey") {
    surveyPreview.value = null

    form.value = {
      ...form.value,
      documents: {
        ...form.value.documents,
        surveyPlan: null
      }
    }
  }

  if (target === "titleDocs") {
    titlePreview.value = null

    form.value = {
      ...form.value,
      documents: {
        ...form.value.documents,
        titleDocument: null
      }
    }
  }
}
</script>

<template>
<div class="min-h-screen py-10 px-4">

<Container>

<!-- ================= LAND IMAGES ================= -->
<div>
<h2 class="section-title">Land Images (max 6)</h2>
<p class="text-gray-500 mb-6">Visual examples attract buyers.</p>

<div class="flex flex-wrap gap-6">

<div
v-for="(img,index) in previews"
:key="index"
class="relative w-60 h-48 border border-dashed border-gray-400 rounded-sm flex items-center justify-center hover:border-black transition"
>

<img v-if="img" :src="img" class="w-full h-full object-cover"/>

<div v-else class="text-center">
<img src="/image/icon/picture.svg" class="w-14 mx-auto opacity-50"/>

<p class="text-xs mt-2 text-gray-500">
Drag & drop or
<label
:for="'upload-'+index"
class="text-blue-600 underline cursor-pointer"
>
Browse
</label>
</p>
</div>

<input
type="file"
accept="image/*"
:hidden="true"
:id="'upload-'+index"
@change="handleUpload($event,index,'images')"
/>

<button
v-if="img"
@click="removeImage(index,'images')"
class="absolute top-2 right-2 bg-black/70 text-white w-6 h-6 rounded-full text-xs"
>
✕
</button>

</div>
</div>
</div>

<!-- ================= SURVEY PLAN ================= -->
<div class="border-t pt-10">

<h2 class="section-title">Survey Plan</h2>

<div class="relative w-60 h-48 border border-dashed border-gray-400 rounded-sm flex items-center justify-center">

<img v-if="surveyPreview" :src="surveyPreview" class="w-full h-full object-cover"/>

<div v-else class="text-center">
<img src="/image/icon/picture.svg" class="w-14 mx-auto opacity-50"/>

<label
for="upload-survey"
class="text-blue-600 underline cursor-pointer text-xs"
>
Upload Survey
</label>
</div>

<input
type="file"
accept="image/*"
id="upload-survey"
class="hidden"
@change="handleUpload($event,0,'survey')"
/>

<button
v-if="surveyPreview"
@click="removeImage(0,'survey')"
class="absolute top-2 right-2 bg-black/70 text-white w-6 h-6 rounded-full text-xs"
>
✕
</button>

</div>
</div>

<!-- ================= TITLE DOCUMENT ================= -->
<div class="border-t pt-10">

<h2 class="section-title">Title Document</h2>

<div class="relative w-60 h-48 border border-dashed border-gray-400 rounded-sm flex items-center justify-center">

<img v-if="titlePreview" :src="titlePreview" class="w-full h-full object-cover"/>

<div v-else class="text-center">
<img src="/image/icon/picture.svg" class="w-14 mx-auto opacity-50"/>

<label
for="upload-title"
class="text-blue-600 underline cursor-pointer text-xs"
>
Upload Title Doc
</label>
</div>

<input
type="file"
accept="image/*"
id="upload-title"
class="hidden"
@change="handleUpload($event,0,'titleDocs')"
/>

<button
v-if="titlePreview"
@click="removeImage(0,'titleDocs')"
class="absolute top-2 right-2 bg-black/70 text-white w-6 h-6 rounded-full text-xs"
>
✕
</button>

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
.checkpoint { @apply w-4 h-4 border-2 border-gray-400 rounded flex items-center justify-center transition; }
.checkpoint-row.active .checkpoint { @apply bg-black border-black; }
.tab {
  @apply p-3 cursor-pointer font-medium flex justify-between  ;
}

.tab.active {
  @apply border  bg-slate-300  ;
}
</style>