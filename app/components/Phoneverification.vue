<script setup>
import { ref } from 'vue'

const { $toast } = useNuxtApp()
const config = useRuntimeConfig()

/* ================= STATE ================= */
const phone = ref('')
const otp = ref('')
const loading = ref(false)
const otpSent = ref(false)

const emit = defineEmits(['close'])

const cancelPage = () => {
  emit('close')
}

/* ================= SEND OTP ================= */
const sendOtp = async () => {
  if (!phone.value) {
    $toast.error('Please enter your phone number')
    return
  }

  loading.value = true

  try {
        const response = await useApiFetch(`/profile/sendsms`, {
        method: 'POST',
        body: {details: null}
      })
    // const response = await fetch(`${config.public.api_url}/auth/send-otp`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ phone: phone.value })
    // })

    // const data = await response.json()

    // if (!response.ok) {
    //   $toast.error(data.message || 'Failed to send OTP')
    //   return
    // }

    $toast.success('OTP sent successfully')
    otpSent.value = true
  } catch (err) {
    $toast.error(err.message || 'Error sending OTP')
  } finally {
    loading.value = false
  }
}

/* ================= VERIFY OTP ================= */
const verifyOtp = async () => {
  if (!otp.value) {
    $toast.error('Enter OTP code')
    return
  }

  loading.value = true

  try {
    const response = await fetch(`${config.public.api_url}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: phone.value,
        otp: otp.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      $toast.error(data.message || 'Invalid OTP')
      return
    }

    $toast.success('Phone verified successfully')
    cancelPage()
  } catch (err) {
    $toast.error(err.message || 'Verification failed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen fixed inset-0 z-30 backdrop-blur-sm">
    <div class="w-full min-h-screen fixed flex justify-center pt-10 pb-6 px-4 bg-black/40">

      <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <!-- Close -->
        <div class="flex justify-end">
          <button @click="cancelPage" class="text-lg ">
          <img src="/image/icon/cancel.svg" class="w-4"/>
          
          </button>
        </div>

        <!-- Icon -->
        <div class="flex justify-center">
          <img src="/image/icon/phone.svg" class="w-16" />
        </div>

        <!-- Title -->
        <p class="text-xl text-center font-semibold pt-5">
          Verify your Phone Number
        </p>

        <p class="text-center mb-6 text-gray-600 text-sm">
          Enter your phone number and we'll send you an OTP code
        </p>

        <!-- FORM -->
        <form @submit.prevent class="space-y-6">

          <!-- Phone -->
          <div>
            <label class="text-sm text-gray-600">Phone Number</label>
            <input
              type="tel"
              v-model="phone"
              placeholder="08123456789"
              class="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <!-- SEND OTP BUTTON -->
          <button
            v-if="!otpSent"
            type="button"
            @click="sendOtp"
            :disabled="loading"
            class="w-full bg-slate-800 text-white py-2 text-sm rounded-sm hover:bg-slate-600 disabled:opacity-60"
          >
            {{ loading ? 'Sending...' : 'Send OTP' }}
          </button>

          <!-- OTP SECTION -->
          <div v-if="otpSent" class="space-y-4">

            <div>
              <label class="text-sm text-gray-600">Enter OTP</label>
              <input
                type="number"
                v-model="otp"
                placeholder="123456"
                class="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              type="button"
              @click="verifyOtp"
              :disabled="loading"
              class="w-full bg-green-600 text-white py-2 text-sm rounded-sm hover:bg-green-500 disabled:opacity-60"
            >
              {{ loading ? 'Verifying...' : 'Verify OTP' }}
            </button>

          </div>

        </form>

      </div>
    </div>
  </div>
</template>