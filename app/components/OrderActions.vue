<template>
  <div class="bg-white rounded-lg  p-2 mt-5">
  

    <div class="flex flex-wrap gap-3">

      <!-- Cancel -->
      <button
        v-if="canCancel"
        @click="openModal('cancel')"
        class="px-4 py-2 rounded border border-red-300 text-red-600 hover:bg-red-50"
      >
        Cancel Order
      </button>

      <!-- Refund -->
      <button
        v-if="canRefund"
        @click="openModal('refund')"
        class="px-4 py-2 rounded border border-amber-300 text-amber-600 hover:bg-amber-50"
      >
        Request Refund
      </button>

      <!-- Reactivate -->
      <button
        v-if="canReactivate"
        @click="reactivateOrder"
        class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
      >
        Reactivate Order
      </button>

      <!-- Cancel Refund -->
      <button
        v-if="canCancelRefund"
        @click="cancelRefundRequest"
        class="px-4 py-2 rounded border"
      >
        Cancel Refund Request
      </button>

    </div>
  </div>

  <!-- Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg w-full max-w-md p-5">

      <h3 class="font-bold text-lg mb-2">
        {{ action === 'cancel' ? 'Cancel Order' : 'Request Refund' }}
      </h3>

      <p class="text-sm text-slate-500 mb-4">
        Please tell us why.
      </p>

      <textarea
        v-model="reason"
        rows="4"
        class="w-full border rounded p-3"
        placeholder="Enter your reason..."
      />

      <div class="flex justify-end gap-3 mt-5">

        <button
          @click="showModal=false"
          class="px-4 py-2 border rounded"
        >
          Close
        </button>

        <button
          @click="submitAction"
          class="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Submit
        </button>

      </div>

    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  order: Object
})

const emit = defineEmits([
  "cancel",
  "refund",
  "reactivate",
  "cancelRefund"
])

const showModal = ref(false)
const action = ref("")
const reason = ref("")

const status = computed(() => props.order?.escrowStatus)

const canCancel = computed(() =>
  ["NOT_FUNDED", "PARTIALLY_FUNDED", "FUNDED", "HELD"].includes(status.value)
)

const canRefund = computed(() =>
  ["PARTIALLY_FUNDED", "FUNDED", "HELD", "PARTIALLY_RELEASED"].includes(status.value)
)

const canReactivate = computed(() =>
  status.value === "CANCELLED"
)

const canCancelRefund = computed(() =>
  status.value === "REFUND_PENDING"
)

function openModal(type) {
  action.value = type
  reason.value = ""
  showModal.value = true
}

function submitAction() {
  if (!reason.value.trim()) return

  emit(action.value, reason.value)

  showModal.value = false
}

function reactivateOrder() {
  emit("reactivate")
}

function cancelRefundRequest() {
  emit("cancelRefund")
}
</script>