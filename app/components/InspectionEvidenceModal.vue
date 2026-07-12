<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black/35 z-[110] flex justify-center items-center p-4"
    @click.self="skip"
  >

    <div
      class="relative bg-white max-w-lg w-full h-[85vh] overflow-y-auto rounded-2xl border border-gray-200 p-4 sm:p-6"
    >

      <!-- Close -->

      <button
        @click="skip"
        class="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
      >
        <Icon
          name="heroicons:x-mark"
          class="w-6 h-6"
        />
      </button>

      <!-- Header -->

      <div class="mb-8">

        <h2 class="text-xl font-bold text-gray-900">
          Inspection Evidence
        </h2>

        <p class="text-sm text-gray-500 mt-2 leading-6">
          Upload inspection photos before requesting the release of escrow
          funds. This evidence helps protect both buyer and seller during any
          future dispute.
        </p>

      </div>

      <!-- Warning -->

      <div
        class="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-8"
      >

        <div class="flex gap-3">

          <Icon
            name="heroicons:shield-check"
            class="w-6 h-6 text-amber-600 flex-shrink-0"
          />

          <div>

            <h3 class="font-semibold text-sm text-amber-900">
              Upload Inspection Evidence
            </h3>

            <p class="text-xs text-amber-800 mt-2 leading-6">

              We recommend uploading photos taken during your inspection.
              These images may be reviewed by our support team if a dispute
              occurs after requesting the release of escrow funds.

            </p>

          </div>

        </div>

      </div>

      <!-- Buyer Photo -->

      <div class="mb-10">

        <div class="mb-4">

          <h3 class="font-semibold text-sm">
            Photo of You at the Property
          </h3>

          <p class="text-xs text-gray-500 mt-1">
            Upload a photo showing you or your representative at the property.
          </p>

        </div>

        <div
          class="relative w-48 h-36 rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50"
        >

          <img
            v-if="buyerPhoto"
            :src="buyerPhoto.url"
            class="w-full h-full object-cover"
          >

          <div
            v-else
            class="absolute inset-0 flex flex-col items-center justify-center"
          >

            <img
              src="/image/icon/picture.svg"
              class="w-10 opacity-50"
            >

            <label
              for="buyer-photo"
              class="mt-3 text-xs text-primary font-medium cursor-pointer"
            >
              Upload Photo
            </label>

          </div>

          <input
            id="buyer-photo"
            type="file"
            accept="image/*"
            class="hidden"
            :disabled="loadingMap['buyerPhoto-0']"
            @change="handleBuyerPhoto"
          >

          <!-- Loading -->

          <div
            v-if="loadingMap['buyerPhoto-0'] || removingMap['buyerPhoto-0']"
            class="absolute inset-0 bg-black/50 flex items-center justify-center"
          >

            <div
              class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"
            />

          </div>

          <!-- Remove -->

          <button
            v-if="buyerPhoto"
            @click="removeImage('buyerPhoto')"
            class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
          >
            ✕
          </button>

        </div>

      </div>

      <!-- Property Photos -->

      <div class="mb-10">

        <div class="flex justify-between items-center mb-5">

          <div>

            <h3 class="font-semibold text-sm">
              Property Inspection Photos
            </h3>

            <p class="text-xs text-gray-500 mt-1">
              Upload clear photos taken during your inspection.
            </p>

          </div>

          <div
            class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"
          >
            {{ propertyImages.filter(Boolean).length }}/6 Uploaded
          </div>

        </div>

        <div
          class="grid grid-cols-2 gap-4"
        >

          <div
            v-for="(img,index) in propertyImages"
            :key="index"
            class="relative h-36 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50"
          >

            <img
              v-if="img"
              :src="img.url"
              class="w-full h-full object-cover"
            >

            <div
              v-else
              class="absolute inset-0 flex flex-col items-center justify-center"
            >

              <img
                src="/image/icon/picture.svg"
                class="w-10 opacity-50"
              >

              <label
                :for="'property-'+index"
                class="cursor-pointer text-primary mt-3 text-xs font-medium"
              >
                Upload Photo
              </label>

            </div>

            <input
              :id="'property-'+index"
              type="file"
              class="hidden"
              accept="image/*"
              :disabled="loadingMap[`propertyPhoto-${index}`]"
              @change="handlePropertyImage($event,index)"
            >

            <!-- Loading -->

            <div
              v-if="loadingMap[`propertyPhoto-${index}`] || removingMap[`propertyPhoto-${index}`]"
              class="absolute inset-0 bg-black/50 flex items-center justify-center"
            >

              <div
                class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"
              />

            </div>

            <!-- Remove -->

            <button
              v-if="img"
              @click="removeImage('propertyPhoto',index)"
              class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
            >
              ✕
            </button>

          </div>

        </div>

      </div>


      <!-- ================= LAND AGREEMENT ================= -->

      <div
        v-if="propertyType === 'land'"
        class="mb-10"
      >

        <div class="mb-4">

          <h3 class="font-semibold text-sm">
            Land Agreement / Allocation Paper
          </h3>

          <p class="text-xs text-gray-500 mt-1 leading-6">
            Upload a clear photo of the land agreement, allocation paper,
            receipt, survey, or any official document you received during
            inspection.
          </p>

        </div>

        <div
          class="relative w-48 h-36 rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50"
        >

          <img
            v-if="agreementPhoto"
            :src="agreementPhoto.url"
            class="w-full h-full object-cover"
          >

          <div
            v-else
            class="absolute inset-0 flex flex-col items-center justify-center"
          >

            <img
              src="/image/icon/picture.svg"
              class="w-10 opacity-50"
            >

            <label
              for="agreement"
              class="cursor-pointer text-primary text-xs mt-3 font-medium"
            >
              Upload Agreement
            </label>

          </div>

          <input
            id="agreement"
            type="file"
            class="hidden"
            accept="image/*"
            :disabled="loadingMap['agreementPhoto-0']"
            @change="handleAgreement"
          >

          <!-- Loading -->

          <div
            v-if="loadingMap['agreementPhoto-0'] || removingMap['agreementPhoto-0']"
            class="absolute inset-0 bg-black/50 flex items-center justify-center"
          >

            <div
              class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"
            />

          </div>

          <!-- Remove -->

          <button
            v-if="agreementPhoto"
            @click="removeImage('agreementPhoto')"
            class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
          >
            ✕
          </button>

        </div>

      </div>

      <!-- ================= CONFIRMATION ================= -->

      <div
        class="rounded-xl border border-green-200 bg-green-50 p-4"
      >

        <label class="flex items-start gap-3 cursor-pointer">

          <input
            v-model="confirmed"
            type="checkbox"
            class="mt-1 w-5 h-5"
          >

          <span class="text-sm leading-7 text-gray-700">

            I confirm that these images were taken during my inspection of
            this property and accurately represent its current condition.
            I understand that submitting false evidence may result in my
            escrow release request being rejected or my account being
            restricted.

          </span>

        </label>

      </div>

      <!-- ================= FOOTER ================= -->

      <div class="flex justify-end gap-4 mt-8">

        <button
          @click="skip"
          class="px-6 h-12 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Skip For Now
        </button>

        <button
          :disabled="!confirmed"
          @click="continueRelease"
          class="px-8 h-12 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold transition"
        >
          Continue
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const { $toast } = useNuxtApp()

// const orderId = route.query.order || ""

const props = defineProps({
  modelValue: Boolean,
  order: {
    type: Object,
    required: true
  },

  propertyType: {
    type: String,
    default: "house"
  }
})

const emit = defineEmits([
  "update:modelValue",
  "continue",
  "skip"
])

/* =====================================
STATE
===================================== */

const confirmed = ref(false)

const buyerPhoto = ref(null)

const agreementPhoto = ref(null)

const propertyImages = ref([
  null,
  null,
  null,
  null,
  null,
  null
])

const loadingMap = ref({})
const removingMap = ref({})

/* =====================================
UTILS
===================================== */

function optimizeCloudinary(url, width = 700) {

  if (!url) return url

  if (!url.includes("res.cloudinary.com"))
    return url

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width},c_fill/`
  )

}

function getState(type) {

  switch (type) {

    case "buyerPhoto":
      return buyerPhoto

    case "agreementPhoto":
      return agreementPhoto

    case "propertyPhoto":
      return propertyImages

    default:
      return null

  }

}

/* =====================================
REFILL FROM DATABASE
===================================== */

function refillState(data) {

  buyerPhoto.value = data.buyerPhoto
    ? {
        _id: data.buyerPhoto._id,
        url: optimizeCloudinary(data.buyerPhoto.url)
      }
    : null

  agreementPhoto.value = data.agreementPhoto
    ? {
        _id: data.agreementPhoto._id,
        url: optimizeCloudinary(data.agreementPhoto.url)
      }
    : null

  propertyImages.value = (data.propertyImages || []).map(item => ({
    _id: item._id,
    url: optimizeCloudinary(item.url)
  }))

  while (propertyImages.value.length < 6) {
    propertyImages.value.push(null)
  }

}

/* =====================================
UPLOAD SINGLE IMAGE
===================================== */

async function uploadSingle(file, index, type) {

  const key = `${type}-${index}`

  loadingMap.value[key] = true

  try {

    const formData = new FormData()

    formData.append("file", file)

    const { data } = await useApiFetch(
      `/order/evidence/upload/${props.order._id}/${type}`,
      {
        method: "POST",
        body: formData
      }
    )

    const response = data.value || data

    refillState(response.data)

    $toast.success("Image uploaded successfully.")

  }
  catch (err) {

    console.log(err)

    const state = getState(type)

    if (state) {

      if (Array.isArray(state.value)) {

        state.value[index] = null

      } else {

        state.value = null

      }

    }

    $toast.error("Upload failed.")

  }
  finally {

    loadingMap.value[key] = false

  }

}


/* =====================================
BUYER PHOTO
===================================== */

function handleBuyerPhoto(event) {

  const file = event.target.files?.[0]

  if (!file) return

  buyerPhoto.value = {
    url: URL.createObjectURL(file),
    temp: true
  }

  uploadSingle(file, 0, "buyerPhoto")

  event.target.value = ""

}

/* =====================================
PROPERTY PHOTOS
===================================== */

function handlePropertyImage(event, index) {

  const file = event.target.files?.[0]

  if (!file) return

  propertyImages.value[index] = {
    url: URL.createObjectURL(file),
    temp: true
  }

  uploadSingle(file, index, "propertyPhoto")

  event.target.value = ""

}

/* =====================================
AGREEMENT PHOTO
===================================== */

function handleAgreement(event) {

  const file = event.target.files?.[0]

  if (!file) return

  agreementPhoto.value = {
    url: URL.createObjectURL(file),
    temp: true
  }

  uploadSingle(file, 0, "agreementPhoto")

  event.target.value = ""

}

/* =====================================
REMOVE IMAGE
===================================== */

async function removeImage(type, index = 0) {

  const state = getState(type)

  if (!state) return

  const image = Array.isArray(state.value)
    ? state.value[index]
    : state.value

  if (!image?._id) return

  const key = `${type}-${index}`

  removingMap.value[key] = true

  try {

    const { data } = await useApiFetch(
      `/order/evidence/${props.order._id}`,
      {
        method: "DELETE",
        body: {
          id: image._id
        }
      }
    )

    const response = data.value || data

    refillState(response.data)

    $toast.success("Image removed successfully.")

  }
  catch (err) {

    console.log(err)

    $toast.error("Unable to remove image.")

  }
  finally {

    removingMap.value[key] = false

  }

}

/* =====================================
LOAD EVIDENCE
===================================== */

async function loadEvidence() {

  if (!props.order._id) return

  try {

    const { data } = await useApiFetch(
      `/order/evidence/${props.order._id}`
    )

    const response = data.value || data

    if (response?.success) {

      refillState(response.data)

    }

  }
  catch (err) {

    console.log(err)

  }

}

/* =====================================
BUTTONS
===================================== */

function skip() {

  emit("skip")

  emit("update:modelValue", false)

}

function continueRelease() {

  if (!confirmed.value) {

    $toast.error("Please confirm before continuing.")

    return

  }

  emit("continue", {
    buyerPhoto: buyerPhoto.value,
    agreementPhoto: agreementPhoto.value,
    propertyImages: propertyImages.value.filter(Boolean)
  })

  emit("update:modelValue", false)

}

/* =====================================
INIT
===================================== */

onMounted(() => {

  loadEvidence()

})
</script>

