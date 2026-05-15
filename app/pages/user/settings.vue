<template>
  <div class="min-h-screen bg-[#f5f5f5] py-10 px-4">
    <div
      class="max-w-5xl mx-auto bg-white border border-gray-200 rounded-sm p-8"
    >
    <h1></h1>
      <!-- CHANGE PASSWORD -->
      <section class="pb-10 border-b border-gray-200">

       <p class=" mb-4">{{hiddenEmail}}</p>
        <h2
          class="text-[15px] font-bold uppercase text-gray-700 mb-10 tracking-wide"
        >
          Change Password
        </h2>

        <div class="space-y-6">
         
          <!-- Current Password -->
          <div  v-if="auth?.user?.password"
            class="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4"
          >
            <label class="text-sm font-semibold text-gray-700">
              Current Password
            </label>

            <input
              v-model="form.currentPassword"
              type="password"
              class="h-11 w-full border border-gray-300 rounded-sm px-4 outline-none focus:border-green-500"
            />
          </div>
            <div
              v-if="!auth?.user?.password"
              class="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-md p-4"
            >
              Your account is connected with Google authentication.
              You can set a password below for additional login options.
            </div>
          <!-- New Password -->
          <div
            class="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4"
          >
            <label class="text-sm font-semibold text-gray-700">
              New Password
            </label>

            <input 
              v-model="form.newPassword"
              type="password"
              class="h-11 w-full border border-gray-300 rounded-sm px-4 outline-none focus:border-green-500"
            />
          </div>

          <!-- Confirm Password -->
          <div
            class="grid grid-cols-1 md:grid-cols-[220px_1fr] items-start gap-4"
          >
            <label class="text-sm font-semibold text-gray-700 pt-3">
              Confirm Password
            </label>

            <div>
              <input
                v-model="form.confirmPassword"
                type="password"
                class="h-11 w-full border border-gray-300 rounded-sm px-4 outline-none focus:border-green-500"
              />

              <p class="text-sm text-gray-500 mt-3 leading-6">
                8 characters or longer. Combine upper and lowercase letters and
                numbers.
              </p>

              <div class="flex justify-end mt-5">
              <button
                @click="handleupdatePassword"
                :disabled="loading || form.newPassword !== form.confirmPassword || !form.newPassword"
                :class="[
                  'text-white text-sm font-semibold px-6 h-10 rounded-sm transition',
                  loading || form.newPassword !== form.confirmPassword || !form.newPassword
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#22c55e] hover:bg-[#16a34a]'
                ]"
              >
                {{ loading ? 'Saving...' : 'Save Changes' }}
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PHONE VERIFICATION -->
      <section
        class="py-8 border-b border-gray-200 grid grid-cols-1 md:grid-cols-[220px_1fr_auto] gap-6 items-start"
      >
        <h3 class="text-sm font-bold uppercase text-gray-700">
          Phone Verification
        </h3>

        <p class="text-gray-500 text-sm leading-6 max-w-xl">
          Phone verification will be available after you place your first order.
        </p>

        <button
          disabled
          class="bg-gray-200 text-gray-500 text-sm font-semibold px-5 h-10 rounded-sm cursor-not-allowed"
        >
          Verify Now
        </button>
      </section>

      <!-- SECURITY QUESTION -->
      <section
        class="py-8 border-b border-gray-200 grid grid-cols-1 md:grid-cols-[220px_1fr_auto] gap-6 items-start"
      >
        <h3 class="text-sm font-bold uppercase text-gray-700">
          Security Question
        </h3>

        <p class="text-gray-500 text-sm leading-6 max-w-xl">
          By creating a security question, you will add an additional layer of
          protection for your revenue withdrawals and for changing your
          password.
        </p>

        <button
          class="bg-[#22c55e] hover:bg-[#16a34a] text-white text-sm font-semibold px-5 h-10 rounded-sm transition"
        >
          Set
        </button>
      </section>

      <!-- TWO FACTOR -->
      <section
        class="py-8 border-b border-gray-200 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start"
      >
        <div>
          <h3 class="text-sm font-bold uppercase text-gray-700">
            Two Factor Authentication
          </h3>

          <span class="text-[#22c55e] text-[11px] font-bold uppercase">
            Recommended
          </span>
        </div>

        <div>
          <!-- Toggle -->
          <button
            @click="twoFactor = !twoFactor"
            :class="[
              'relative w-12 h-7 rounded-full transition duration-300',
              twoFactor ? 'bg-green-500' : 'bg-gray-300'
            ]"
          >
            <span
              :class="[
                'absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition duration-300',
                twoFactor ? 'translate-x-5' : ''
              ]"
            />
          </button>

          <p class="text-sm text-gray-500 leading-6 mt-4 max-w-2xl">
            To help keep your account secure, we'll ask you to submit a code
            when using a new device to log in. We'll send the code via email or
            Fiverr notification.
            <span class="text-[#22c55e] font-medium cursor-pointer">
              Verify your mobile phone
            </span>
            to be able to receive the code via SMS.
          </p>
        </div>
      </section>

      <!-- CONNECTED DEVICES -->
      <section class="pt-8">
        <h3 class="text-sm font-bold uppercase text-gray-700">
          Connected Devices
        </h3>
      </section>
    </div>
  </div>
</template>

<script setup>

import { useRouter, useRoute, useRuntimeConfig } from '#app'

const { $toast } = useNuxtApp()


const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const auth = useAuth()
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()


const hiddenEmail = computed(() => {
  if(!auth?.value?.user?.email) return 'none'
  const [name, domain] = auth.value?.user?.email?.split('@')
  
  // keep first 4 characters
  const visiblePart = name.slice(0, 4)

  // replace remaining with *****
  const hiddenPart = '*'.repeat(Math.max(name.length - 4, 5))

  return `${visiblePart}${hiddenPart}@${domain}`
})



const handleupdatePassword = async () => {

  loading.value = true
  try {
    const response = await fetch(`${config.public.api_url}/auth/update-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
    })

    const data = await response.json()

    if (!response.ok) {
      $toast.error(data.message || 'update password failed')

      return
    }
    
    

    $toast.success(data.message || 'Password updated successfully')
    
    
 
  } catch (err) {
    
    loading.value = false
    $toast.error(err.message || 'An error occurred')
  } finally {
    loading.value = false
  }
}


definePageMeta({
  layout: 'auth',
  access: 'seller'
})
const twoFactor = ref(false)
</script>