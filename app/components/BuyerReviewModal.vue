
<template>
<Teleport to="body">
  <div
    v-if="show"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2"
  >
    <div class="bg-white h-[90%]  overflow-auto rounded-lg shadow-2xl max-w-8xl sm:max-w-lg w-full ">

      <!-- Header -->
      <div class="border-b hidden sm:p-6 p-3  items-center gap-4">
        <button
          @click="$emit('close')"
          class="sm:w-10 sm:h-10 h-5 w-5 rounded-full hover:bg-gray-100 flex items-center justify-center"
        >
          <Icon
            name="heroicons:arrow-left-20-solid"
            class="w-6 h-6"
          />
        </button>

        <div>
          <p class="text-sm text-gray-500">
            Feedback
          </p>

          <h2 class="sm:text-2xl text-sm  font-bold">
            Share your experience
          </h2>
        </div>
      </div>

      <!-- Seller Card -->
  
      <div class="rounded-2xl  bg-s p-2">

        <div class="flex items-center gap-4">

          <!-- Avatar -->

          <img
            :src="order?.seller?.avatar || '/images/avatar.png'"
            class="w-16 h-16 rounded-full object-cover border"
          >

          <div class="flex-1">

            <h3 class="font-bold text-sm  sm:text-lg">
              {{ order?.seller?.firstName }}
              {{ order?.seller?.lastName }}
            </h3>

            
              
          


            <p class="text-sm text-gray-500 ">
              {{ order?.seller?.roles }}
            </p>

          </div>

        </div>

        

      </div>




      <div class="sm:p-6 p-3 space-y-8">

        <!-- Rating -->

        <div>

          <h3 class="font-semibold  text-sm sm:text-lg">
            How was your experience?
          </h3>

          <p class="text-sm  text-gray-500 mt-">
            Your review helps other buyers.
          </p>

          <div class="flex justify-between mt-6">

            <button
              v-for="item in ratings"
              :key="item.value"
              @click="rating=item.value"
              class="flex flex-col items-center group"
            >

              <div
                class="sm:w-14 sm:h-14 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                :class="rating===item.value
                  ? 'border-blue-500 bg-blue-50 scale-110 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'"
              >

                <Icon
                  :name="item.icon"
                  class="sm:w-8 w-7 h-7 sm:h-8"
                  :class="rating===item.value
                    ? item.color
                    : 'text-gray-400'"
                />

              </div>

              <span
                class="text-xs mt-2"
                :class="rating===item.value
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-500'"
              >
                {{ item.label }}
              </span>

            </button>

          </div>

        </div>

        <!-- Checklist -->

        <div>

          <h3 class="font-semibold text-sm sm:text-lg mb-5">
            What impressed you?
          </h3>

          <div class="sm:space-y-3 space-y-2">

            <label
              v-for="item in options"
              :key="item.value"
              class="border rounded-sm sm:rounded-xl sm:px-4 px-2 py-1 sm:py-3 flex justify-between items-center cursor-pointer hover:border-blue-300 transition"
            >

              <div class="flex items-center gap-3">

                <div
                  class="sm:w-10 sm:h-10 h-7 w-7 sm:rounded-xl rounded-lg bg-gray-100 flex items-center justify-center"
                >
                  <Icon
                    :name="item.icon"
                    class="sm:w-5 sm:h-5 h-4 w-4 text-blue-600"
                  />
                </div>

                <span class="font-medium text-sm sm:text-lg">
                  {{ item.label }}
                </span>

              </div>

              <input
                type="checkbox"
                :value="item.value"
                v-model="selected"
                class="sm:w-5 sm:h-5 h-3 rounded-md accent-blue-600"
              />

            </label>

          </div>

        </div>

        <!-- Comment -->

        <div>

          <label class="font-semibold sm:text-lg text-sm mb-3 block">
            Additional Comment
          </label>

          <textarea
            v-model="comment"
            rows="3"
            maxlength="400"
            placeholder="Tell us about your buying experience..."
            class="w-full border rounded-sm p-2 sm:p-4 resize-none outline-none  sm:text-lg text-xs focus:border-blue-500"
          />

          <div class="text-right text-xs text-gray-400 mt-2">
            {{ comment.length }}/500
          </div>

        </div>

      </div>

      <!-- Footer -->

      <div class="border-t p-5 flex gap-3">

        <button
          @click="$emit('close')"
          class="flex-1 tex border  ftext-white rounded-sm py-2 sm:py-3  text-sm sm:text-lg font-semibold"
        >
          Cancel
        </button>

        <button
          @click="submitReview"  :disabled="loading"
          class="flex-1 bg-blue-600  hover:bg-blue-700 text-white rounded-sm py-1 sm:py-3  text-sm sm:text-lg font-semibold"
        >
          {{loading? 'Submiting....': 'Submit Review'}}
        </button>

      </div>

    </div>
  </div>
</Teleport>

</template>



<script setup>
import { ref, watch } from "vue"

const { $toast } = useNuxtApp()

const props = defineProps({
  show: Boolean,
  order: Object
})

const emit = defineEmits([
  "submit",
  "update:show"
])

/* -----------------------------------------
   Form State
------------------------------------------ */

const loading = ref(false)
const loadingReview = ref(false)

const rating = ref(5)
const selected = ref([])
const comment = ref("")

const review = ref(null)
const seller = ref(null)
const property = ref(null)

/* -----------------------------------------
   Rating Options
------------------------------------------ */

const ratings = [
  {
    value: 1,
    label: "Terrible",
    icon: "mdi:emoticon-angry",
    color: "text-red-600"
  },
  {
    value: 2,
    label: "Poor",
    icon: "mdi:emoticon-sad",
    color: "text-orange-500"
  },
  {
    value: 3,
    label: "Average",
    icon: "mdi:emoticon-neutral",
    color: "text-yellow-500"
  },
  {
    value: 4,
    label: "Good",
    icon: "mdi:emoticon-happy",
    color: "text-green-500"
  },
  {
    value: 5,
    label: "Excellent",
    icon: "mdi:emoticon-excited",
    color: "text-blue-600"
  }
]

/* -----------------------------------------
   Review Checklist
------------------------------------------ */

const options = [
  {
    value: "communication",
    label: "Seller Communication",
    icon: "heroicons:chat-bubble-left-right"
  },
  {
    value: "property",
    label: "Property Accuracy",
    icon: "heroicons:home"
  },
  // {
  //   value: "payment",
  //   label: "Payment Process",
  //   icon: "heroicons:credit-card"
  // },
  // {
  //   value: "inspection",
  //   label: "Inspection Experience",
  //   icon: "heroicons:clipboard-document-check"
  // },
  // {
  //   value: "support",
  //   label: "Customer Support",
  //   icon: "heroicons:lifebuoy"
  // },
  {
    value: "speed",
    label: "Fast Response",
    icon: "heroicons:bolt"
  },
  {
    value: "trust",
    label: "Trustworthy Seller",
    icon: "heroicons:shield-check"
  },
  // {
  //   value: "documentation",
  //   label: "Documentation",
  //   icon: "heroicons:document-text"
  // }
]

/* -----------------------------------------
   Load Existing Review
------------------------------------------ */

const loadReview = async () => {
  if (!props.order?._id) return

  loadingReview.value = true

  const res = await useApiFetch(`/review/${props.order._id}`)

  loadingReview.value = false

  if (!res.success) {
    review.value = null
    seller.value = props.order?.seller
    property.value = props.order?.property
    resetForm()
    return
  }

  review.value = res.data.review || null
  seller.value = res.data.seller || props.order?.seller
  property.value = res.data.property || props.order?.property

  if (!review.value) {
    resetForm()
    return
  }

  rating.value = review.value.rating || 5
  comment.value = review.value.comment || ""

  selected.value = []

  if (review.value.liked?.communication) {
    selected.value.push("communication")
  }

  if (review.value.liked?.propertyAccuracy) {
    selected.value.push("property")
  }

  if (review.value.liked?.fastResponse) {
    selected.value.push("speed")
  }

  if (review.value.liked?.trustworthySeller) {
    selected.value.push("trust")
  }
}

/* -----------------------------------------
   Reset Form
------------------------------------------ */

const resetForm = () => {
  rating.value = 5
  comment.value = ""
  selected.value = []
}

/* -----------------------------------------
   Watch Modal
------------------------------------------ */

watch(
  () => props.show,
  async (show) => {
    if (!show) return

    await loadReview()
  },
  {
    immediate: true
  }
)

/* -----------------------------------------
   Submit Review
------------------------------------------ */

const submitReview = async () => {
  loading.value = true

  const payload = {
    orderId: props.order._id,
    rating: rating.value,
    liked: {
      communication: selected.value.includes("communication"),
      propertyAccuracy: selected.value.includes("property"),
      fastResponse: selected.value.includes("speed"),
      trustworthySeller: selected.value.includes("trust")
    },
    comment: comment.value
  }

  const res = await useApiFetch("/review", {
    method: "POST",
    body: payload
  })

  loading.value = false

  if (!res.success) {
    return $toast.error(res.message)
  }

  $toast.success(res.data.message)

  // Refresh review after save
  await loadReview()
  props.show = false
  // emit("submit", review.value)
 emit("update:show", false)
}


</script>