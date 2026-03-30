<script setup>
import { ref, computed } from 'vue'

/* ================= PROPS ================= */
const props = defineProps({
  modelValue: { type: Object, required: true }
})

const emit = defineEmits(["update:modelValue"])

/* ================= STATE ================= */
const previews = ref(Array(8).fill(null)) // max 8 house images
const videoPreview = ref(null)
const titlePreview = ref(null)

/* ================= HELPERS ================= */
const updateParent = (data) => {
  emit("update:modelValue", {
    ...props.modelValue,
    ...data
  })
}

/* ================= CONDITIONS ================= */


/* ================= IMAGE UPLOAD ================= */
function handleImage(e, index) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    previews.value[index] = reader.result

    const images = [...(props.modelValue.media?.images || [])]
    images[index] = file

    updateParent({
      media: {
        ...props.modelValue.media,
        images
      }
    })
  }

  reader.readAsDataURL(file)
}

/* ================= VIDEO ================= */
function handleVideo(e) {
  const file = e.target.files[0]
  if (!file) return

  videoPreview.value = URL.createObjectURL(file)

  updateParent({
    media: {
      ...props.modelValue.media,
      video: file
    }
  })
}

/* ================= TITLE DOC ================= */
function handleTitle(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    titlePreview.value = reader.result

    updateParent({
      documents: {
        ...props.modelValue.documents,
        titleDocument: file
      }
    })
  }

  reader.readAsDataURL(file)
}

/* ================= REMOVE ================= */
function removeImage(index) {
  previews.value[index] = null

  const images = [...(props.modelValue.media?.images || [])]
  images[index] = null

  updateParent({
    media: {
      ...props.modelValue.media,
      images
    }
  })
}

function removeVideo() {
  videoPreview.value = null

  updateParent({
    media: {
      ...props.modelValue.media,
      video: null
    }
  })
}

function removeTitle() {
  titlePreview.value = null

  updateParent({
    documents: {
      ...props.modelValue.documents,
      titleDocument: null
    }
  })
}
</script>
<template>
<div class="space-y-10">

  <!-- 🏠 HOUSE IMAGES -->
  <div>
    <h2 class="section-title">House Images (min 5)</h2>
    <p class="text-gray-500 mb-6">
      Living room, bedroom, kitchen, bathroom, exterior
    </p>

    <div class="flex flex-wrap gap-6">
      <div v-for="(img,index) in previews" :key="index"
           class="relative w-60 h-48 border border-dashed rounded flex items-center justify-center">

        <img v-if="img" :src="img" class="w-full h-full object-cover"/>

        <div v-else class="text-center">
          <p class="text-xs">Upload Image</p>
        </div>

        <input type="file" accept="image/*" class="hidden"
               :id="'img-'+index"
               @change="handleImage($event,index)" />

        <label :for="'img-'+index" class="absolute inset-0 cursor-pointer"></label>

        <button v-if="img" @click="removeImage(index)"
                class="absolute top-2 right-2 bg-black text-white w-6 h-6 rounded-full">✕</button>
      </div>
    </div>
  </div>

  <!-- 🎥 VIDEO -->
  <div class="border-t pt-10">
    <h2 class="section-title">Video (Optional)</h2>

    <div class="w-60 h-48 border flex items-center justify-center relative">
      <video v-if="videoPreview" :src="videoPreview" controls class="w-full h-full"/>
      
      <input type="file" accept="video/*" class="hidden" id="video"
             @change="handleVideo"/>

      <label for="video" class="absolute inset-0 cursor-pointer"></label>

      <button v-if="videoPreview" @click="removeVideo"
              class="absolute top-2 right-2 bg-black text-white w-6 h-6 rounded-full">✕</button>
    </div>
  </div>

  <!-- 📄 TITLE DOC (ONLY FOR SALE) -->
  <div v-if="isSale" class="border-t pt-10">
    <h2 class="section-title">Title Document (Required for Sale)</h2>

    <div class="w-60 h-48 border flex items-center justify-center relative">

      <img v-if="titlePreview" :src="titlePreview" class="w-full h-full object-cover"/>

      <input type="file" accept="image/*,application/pdf"
             class="hidden" id="title"
             @change="handleTitle"/>

      <label for="title" class="absolute inset-0 cursor-pointer"></label>

      <button v-if="titlePreview" @click="removeTitle"
              class="absolute top-2 right-2 bg-black text-white w-6 h-6 rounded-full">✕</button>
    </div>
  </div>

</div>
</template>