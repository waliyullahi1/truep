<script setup>
definePageMeta({
  layout: 'main',
  fixed: false
})

import { ref, onMounted } from 'vue'
import { useRouter, useRoute, useRuntimeConfig } from '#app'

const { $toast } = useNuxtApp()

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()

const loading = ref(false)

const form = ref({
  password: '',
  confirm_password: ''
})

/* =========================
   VERIFY TOKEN
========================= */

const verifyToken = async () => {
  const token = route.query.token

  if (!token) {
    router.push('/')
    return
  }

  try {
    const response = await fetch(`${config.public.api_url}/auth/verify-reset-token`, {
      method: "GET",
      headers: {
        "x-reset-token": token
      }
    })

    const data = await response.json()

    if (!response.ok) {
      $toast.error(data.message || "Invalid or expired token")
      router.push('/')
    }

  } catch (err) {
    $toast.error("Token verification failed")
    router.push('/')
  }
}

onMounted(() => {
  verifyToken()
})

/* =========================
   RESET PASSWORD
========================= */

const handleResetPassword = async () => {
  const token = route.query.token

  if (!form.value.password || !form.value.confirm_password) {
    $toast.error("Please fill all fields")
    return
  }

  if (form.value.password !== form.value.confirm_password) {
    $toast.error("Passwords do not match")
    return
  }

  loading.value = true

  try {
    const response = await fetch(`${config.public.api_url}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-reset-token': token
      },
      body: JSON.stringify({
        password: form.value.password
      })
    })

    const data = await response.json()

    if (!response.ok) {
      $toast.error(data.message || 'Password reset failed')
      return
    }

    $toast.success(data.message || 'Password reset successful')

    setTimeout(() => {
      router.push('/auth')
    }, 1000)

  } catch (err) {
    $toast.error(err.message || 'An error occurred')
  } finally {
    loading.value = false
  }
}
</script>

<template>
<div class="min-h-screen bg-gray-50">

  <div class="min-h-screen flex items-center justify-center bg-black/80">

    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

      <p class="text-xl font-semibold">
        Reset Password
      </p>

      <p class="mb-8 text-gray-600 text-sm">
        This reset link expires within 15 minutes
      </p>

      <!-- FORM -->
      <form @submit.prevent="handleResetPassword" class="space-y-6">

        <!-- Password -->
        <FormInput
          type="password"
          v-model:inputValue="form.password"
          label="New Password"
        />

        <!-- Confirm Password -->
        <FormInput
          type="password"
          v-model:inputValue="form.confirm_password"
          label="Confirm Password"
        />

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-slate-800 text-white py-2 text-sm font-medium hover:bg-slate-600 rounded-sm transition disabled:opacity-60"
        >
          {{ loading ? 'Resetting...' : 'Reset Password' }}
        </button>

      </form>

    </div>

  </div>

</div>
</template>