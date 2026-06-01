<script setup>
import { ref, computed } from 'vue'

/* ================= PROPS ================= */
const props = defineProps({
  title: String,
  price: String,
  propertyId: String
})

/* ================= FORM STATE ================= */
const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const loading = ref(false)
const success = ref(false)
const errorMsg = ref('')

/* ================= DEFAULT MESSAGE ================= */
const defaultMessage = computed(() =>
  `I'm interested in the property "${props.title}" listed for ${props.price}. Please contact me with more information.`
)

/* ================= INIT MESSAGE ================= */
form.value.message = defaultMessage.value

/* ================= VALIDATION ================= */
const validate = () => {
  if (!form.value.name) return 'Name is required'
  if (!form.value.email) return 'Email is required'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) return 'Invalid email'

  return null
}

/* ================= SUBMIT ================= */
const submitForm = async () => {
  errorMsg.value = ''

  const error = validate()
  if (error) {
    errorMsg.value = error
    return
  }

  try {
    loading.value = true

    // 🔥 Replace with your API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    success.value = true
  } catch (err) {
    errorMsg.value = 'Something went wrong. Try again.'
  } finally {
    loading.value = false
  }
}

/* ================= WHATSAPP LINK ================= */
const whatsappLink = computed(() => {
  const text = encodeURIComponent(form.value.message)
  return `https://wa.me/2348000000000?text=${text}`
})
</script>

<template>
  <div class="bg-white rounded-2xl p-3 sm:p-6 shadow-sm border">

    <!-- SUCCESS -->
    <div v-if="success" class="text-center py-10">
      <p class="text-green-600 font-semibold text-sm">
        ✅ Inquiry Sent Successfully!
      </p>
      <p class="text-gray-500 mt-2">
        The agent will contact you shortly.
      </p>
    </div>

    <!-- FORM -->
    <div v-else>
      <h2 class="text-sm font-semibold text-gray-900 mb-6">
        Interested in this property?
      </h2>

      <form @submit.prevent="submitForm" class="space-y-2">

        <!-- ERROR -->
        <p v-if="errorMsg" class="text-red-500 text-xs">
          {{ errorMsg }}
        </p>

        <!-- NAME -->
        <div>
          <label class="text-xs text-gray-700">Your Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Enter your name"
            class="w-full text-xs  border rounded-md  px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- EMAIL -->
        <div>
          <label class="text-xs text-gray-700">Your Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            class="w-full border text-xs rounded-md  px-4 py-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- PHONE -->
        <div>
          <label class="text-xs text-gray-700">Your Phone (Optional)</label>
          <input
            v-model="form.phone"
            type="text"
            placeholder="Enter your phone number"
            class="w-full border text-xs rounded-md  px-4 py-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- MESSAGE -->
        <div>
          <label class="text-xs text-gray-700">Message</label>
          <textarea
            v-model="form.message"
            rows="4"
            class="w-full  text-xs   border rounded-md px-4 py-3 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
          ></textarea>
        </div>

        <!-- BUTTONS -->
        <div class="space-y-3">

          <!-- SEND -->
          <button
            type="submit"
            :disabled="loading"
            class="w-fit  px-2 text-xs  bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {{ loading ? 'Sending...' : 'Send Inquiry' }}
          </button>

          <!-- WHATSAPP -->
         

        </div>

      </form>
    </div>
  </div>
</template>