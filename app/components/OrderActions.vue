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
        v-if="canRefund" :disabled="loading"
        @click="openModal('requestRefund')"
        class="px-4 py-2 rounded border border-amber-300 text-amber-600 hover:bg-amber-50"
      >
        Request Refund
      </button>

      <!-- Reactivate -->
      <button :disabled="loading"
        v-if="canReactivate"
        @click="reactivateOrder"
        class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
      >
        {{loading ? 'Activating....': 'Reactivate Order'}} 
      </button>

      <!-- Cancel Refund -->
      <button :disabled="loading"
        v-if="canCancelRefund"
        @click="cancelRefundRequest"
        class="px-4 py-2 rounded border"
      >
       {{loading ? 'loading..' : 'Cancel Refund Request'}}
      </button>

    </div>
  </div>
<Teleport to="body">
  <!-- Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 z-50  bg-black/40 flex items-center justify-center p-4"
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

        <button :disabled="loading"
          @click="showModal=false"
          class="px-4 py-2 border rounded"
        >
          Close
        </button>

        <button :disabled="loading"
          @click="submitAction"
          class="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {{loading ? 'Submitiing....': 'Submit'}} 
         
        </button>

      </div>

    </div>
    
  </div>
  </Teleport>
</template>

<script setup>



const showModal = ref(false)
const action = ref("")
const reason = ref("")
const submitting = ref(true)
const status = computed(() => props.order?.escrowStatus)
const { $toast } = useNuxtApp()

const loading = ref(false)
const props = defineProps({
  order: Object
})

const emit = defineEmits([
  "cancel",
  "requestRefund",
  "reactivate",
  "cancelRefund"
])


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
function closeModal() {
  showModal.value = false
}

defineExpose({
  
  closeModal,
 
})

const updateStatus = async (action, reason) =>{
  try {
    console.log(action);
    
    
     const data  = await useApiFetch(
      `/order/status/${props.order._id}/${action}`,
      {
        method: "POST",
        body:{
          reason
        }
      }
    )
   if(!data.success){
    $toast.error(data?.message || "Something went wrong.")
    loading.value = false
     window.location.reload();
    return
   }
    
    return data
  } catch (err) {
   
loading.value = false
  $toast.error(err.data?.message || "Something went wrong.")
     loading.value = false
      window.location.reload();
  }
  

   
    
}
const submitAction = async () => {
  try {
    loading.value = true

    if (!reason.value.trim()) {
      loading.value = false
      return
    }
    console.log('property o');
    
    const data = await updateStatus(action.value, reason.value)

    if (!data?.success) {
      console.log(' error the page not found');
      
      loading.value = false
      return
    }
  console.log(action.value, 'action.value');
  
   if (action.value === "cancel") {
  emit("cancel", reason.value)
} else if (action.value === "requestRefund") {
  console.log(action.value, 'action.value');
  
  emit("requestRefund", reason.value)
}

    showModal.value = false
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}
async function reactivateOrder () {
  loading.value = true
  
  
   const actio = await updateStatus('reactivate')
  setTimeout(() => {

}, 5000);
  emit("reactivate")
  
}

async function cancelRefundRequest() {
   loading.value = true
  emit("cancelRefund")
  const actio = updateStatus('cancelRefund')
}
</script>