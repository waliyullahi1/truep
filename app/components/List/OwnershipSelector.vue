<template>
  <div class="w-full max-w-3xl mx-auto space-y-8">

    <!-- ROLE CARD -->
    <div class="border p-5 rounded-xl">

      <!-- HEADER -->
      <div class="p-5 rounded-xl">
        <img src="/image/icon/icon-identity.svg" class="w-16 mb-4" />

        <h2 class="text-xl font-semibold">
          Identity Verification
        </h2>

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
          <div
            class="cursor-pointer border rounded-xl p-4 hover:bg-gray-50"
            @click="selectRole('individual')"
          >
            <div class="flex items-start gap-3">
              <input
                type="radio"
                :checked="kycType === 'individual'"
                class="mt-1 w-5 h-5"
              />

              <div>
                <p class="font-medium text-base">
                  Property Owner
                </p>

                <p class="text-xs text-gray-500">
                  You personally own this property
                </p>
              </div>
            </div>
          </div>

          <!-- AGENT -->
          <div
            class="cursor-pointer border rounded-xl p-4 hover:bg-gray-50"
            @click="selectRole('business')"
          >
            <div class="flex items-start gap-3">
              <input
                type="radio"
                :checked="kycType === 'business'"
                class="mt-1 w-5 h-5"
              />

              <div>
                <p class="font-medium text-base">
                  Real Estate Agent
                </p>

                <p class="text-xs text-gray-500">
                  You are listing for the owner
                </p>
              </div>
            </div>
          </div>

          <!-- VERIFY BUTTON -->
          <div
            v-if="kycType"
            class="flex justify-end w-full pt-2"
           >
            <Verifyidentity :kycType="kycType"  v-model:isVerify="verifiedModel" />
          </div>
        verified {{}} {{verifiedModel}}
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  ownlistingType: {
    type: String,
    default: ''
  },
  verified: {
    type: Boolean,
    default: false
  }
})
const verifiedModel = computed({
  get: () => props.verified,
  set: (val) => emit('update:verified', val)
})

const emit = defineEmits(['update:ownlistingType', 'update:verified'])
const isVerify = ref(false)
const kycType = computed({
  get() {
    if (props.ownlistingType === 'owner') return 'individual'
    if (props.ownlistingType === 'agent') return 'business'
    verifiedModel.value = false
    return ''
  },

  set(val) {
    if (val === 'individual') {
      emit('update:ownlistingType', 'owner')
    } else if (val === 'business') {
      emit('update:ownlistingType', 'agent')
    } else {
      emit('update:ownlistingType', '')
    }
  }
})

watch(
  () => props.ownlistingType,
  () => {
    verifiedModel.value = false
  }
)

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