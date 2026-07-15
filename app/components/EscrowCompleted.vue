<template>
  <div class="bg-white border shadow-sm rounded-md p-2">
    <InspectionEvidenceModal
      v-model="showInspectionModal"
      :order = props.order
      @continue="handleInspectionContinue"
      @skip="handleSkipInspection"
    />
  
   

    <!-- Warning -->
    <div
      class="mt-2 rounded-xl border border-amber-200 bg-amber-50 p-2"
    >
      <div class="flex gap-3">

        

        <div>

          <h3 class="font-semibold flex gap-1 items-center text-amber-900">
          <Icon
          name="heroicons:exclamation-triangle"
          class="w-6 h-6 text-amber-600 mt-1 flex-shrink-0"
        />
            Verify the Property Before Releasing Funds
          </h3>

          <p class="text-sm text-amber-800 mt-1 leading-5">
            Please inspect the property carefully before releasing the escrow
            payment.

            <br />

            Once you release the funds, the money will be transferred to the
            seller.

            <br />

            If you discover any issue with the property, do not release the
            payment. Instead, request a refund or raise a dispute.
          </p>

        </div>

      </div>
    </div>

    <!-- Confirmation -->
    <label
      class="mt-6 flex items-start gap-3 cursor-pointer"
    >

      <input
        v-model="confirmed"
        type="checkbox"
        class="mt-1 w-5 h-5"
      />

      <span class="text-sm leading-6">
        I confirm that I have inspected this property and I authorize the
        platform to release the escrow payment to the seller.
      </span>

    </label>

    <!-- Actions -->
    <div class="grid md:grid-cols-2 gap-4 mt-8">

      <button
        :disabled="!confirmed || releasing"
        @click="openInspection"
        class="h-14 rounded-lg bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white flex items-center justify-center gap-2"
      >

        <svg
          v-if="releasing"
          class="w-5 h-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>

        <span>
          {{ releasing ? "Loading..." : "Release Money" }}
        </span>

      </button>

      <button
        @click="$emit('refund')"
        class="h-14 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-semibold transition"
      >
        <Icon
          name="heroicons:arrow-uturn-left"
          class="w-5 h-5 inline mr-2"
        />
        Request Refund
      </button>

    </div>

    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter, useRoute, useRuntimeConfig } from '#app'

const { $toast } = useNuxtApp()
const confirmed = ref(false)
const showInspectionModal = ref(false)
const releasing = ref(false)

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  "release",
  "refund"
])
const updateStatus = async (action) =>{
  try {
     const data  = await useApiFetch(
      `/order/status/${props.order._id}/${action}`,
      {
        method: "POST",
        
      }
    )
   if(!data.success){
    $toast.error(data?.message || "Something went wrong.")
     releasing.value = false
    return
   }
    
    return data
  } catch (err) {
    console.log("Error object:", err)
  console.log("Status:", err.status)
  console.log("Backend response:", err.data)

  $toast.error(err.data?.message || "Something went wrong.")
     releasing.value = false
  }
  

   
    
}

const  handleInspectionContinue =  async() => {
  showInspectionModal.value = false
  releasing.value  = true
  const load = await updateStatus('requestRelease')
  // Continue to release escrow
  window.location.reload();
  releasing.value = false
  emit("release")
}



function handleSkipInspection() {
  showInspectionModal.value = false

  // Still allow release if user skips
  emit("release")
}


async function openInspection() {

  releasing.value = true
 showInspectionModal.value = true

  releasing.value = false
  // try {

  //   await useApiFetch(`/orders/${props.order}/escrow`, {
  //     method: "PATCH",
  //     body: {
  //       action: "requestRelease"
  //     }
  //   })

   

  // } finally {

  //   releasing.value = false

  // }

}
</script>