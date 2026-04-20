<template>
  <div class="w-full max-w-3xl mx-auto space-y-8">

    <!-- ROLE CARD -->
    <div class="border p-5 rounded-xl">

      <!-- HEADER -->
      <div class="p-5 rounded-xl">
        <img src="/image/icon/icon-identity.svg" class="w-16 mb-4" />
        <h2 class="text-xl font-semibold">Identity Verification</h2>
        <p class="text-gray-500 text-sm mt-1">
          Fill in the correct details to verify your ownership or agency rights.
        </p>
      </div>

      <!-- ROLE SELECT -->
      <div class="pt-5">
        <label class="block text-sm font-semibold mb-3">
          Who are you?
        </label>

        <div class="space-y-4">

          <!-- OWNER -->
          <div class="cursor-pointer" @click="selectRole('individual')">
            <div class="flex items-start gap-3">
              <input
                type="radio"
                :checked="kycType === 'individual'"
                class="mt-3 w-5"
              />
              <div>
                <p class="font-medium text-base">Property Owner</p>
                <p class="text-xs text-gray-500">
                  You personally own this property
                </p>
              </div>
            </div>
          </div>

          <!-- AGENT -->
          <div class="cursor-pointer" @click="selectRole('business')">
            <div class="flex items-start gap-3">
              <input
                type="radio"
                :checked="kycType === 'business'"
                class="mt-3 w-5"
              />
              <div>
                <p class="font-medium text-base">Real Estate Agent</p>
                <p class="text-xs text-gray-500">
                  You are listing for the owner
                </p>
              </div>
            </div>
          </div>
          <div v-if="kycType" class=" flex justify-end w-full">
              <Verifyidentity :kycType="kycType" />
          </div>
              

        </div>
      </div>
    </div>

   

  </div>
</template>

<script setup>
import { ref } from 'vue'

/**
 * individual  -> Property Owner
 * business    -> Real Estate Agent
 */
const kycType = ref('')

const selectRole = (type) => {
  kycType.value = type
}
</script>

<style scoped>
.input {
  @apply w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.label {
  @apply text-sm font-medium;
}

.hint {
  @apply text-xs text-gray-400;
}
</style>