<script setup>
const loading = ref(false)
const { $toast } = useNuxtApp()
const props = defineProps({
    order: {
        type: Object,
        required: true
    },
    isSeller: {
        type: Boolean,
        default: false
    }
})

const statusMap = {
    UNPAID: {
        buyer: {
            icon: "heroicons:credit-card",
            color: "yellow",
            title: "Payment Required",
            description:
                "Your order has been created. Complete your payment to fund the escrow account."
        },
        seller: {
            icon: "heroicons:clock",
            color: "yellow",
            title: "Waiting for Buyer",
            description:
                "The buyer has not yet completed payment."
        }
    },

    FUNDED: {
        buyer: {
            icon: "heroicons:shield-check",
            color: "green",
            title: "Payment Completed",
            description:
                "Your payment is safely held in escrow. Please inspect the property before releasing the funds."
        },
        seller: {
            icon: "heroicons:banknotes",
            color: "blue",
            title: "Escrow Funded",
            description:
                "The buyer has funded the escrow account. Wait for the buyer to inspect the property and release the payment."
        }
    },

    RELEASED: {
        buyer: {
            icon: "heroicons:check-badge",
            color: "green",
            title: "Escrow Released",
            description:
                "You have successfully released the payment to the seller."
        },
        seller: {
            icon: "heroicons:wallet",
            color: "green",
            title: "Funds Released",
            description:
                "The buyer has approved the transaction. Your money is now available in your wallet."
        }
    },

    REFUND_PENDING: {
        buyer: {
            icon: "heroicons:arrow-uturn-left",
            color: "orange",
            title: "Refund Requested",
            description:
                "Your refund request has been submitted. Our support team will review it shortly."
        },
        seller: {
            icon: "heroicons:exclamation-circle",
            color: "orange",
            title: "Refund Requested",
            description:
                "The buyer has requested a refund. Please review the request and respond if necessary."
        }
    },

    DISPUTE: {
        buyer: {
            icon: "heroicons:scale",
            color: "red",
            title: "Dispute Open",
            description:
                "A dispute has been opened. Please submit any requested evidence."
        },
        seller: {
            icon: "heroicons:scale",
            color: "red",
            title: "Dispute Open",
            description:
                "A dispute has been opened. Please submit any requested evidence."
        }
    },

    REFUNDED: {
        buyer: {
            icon: "heroicons:check-circle",
            color: "green",
            title: "Refund Completed",
            description:
                "Your payment has been refunded successfully."
        },
        seller: {
            icon: "heroicons:x-circle",
            color: "red",
            title: "Buyer Refunded",
            description:
                "The escrow payment has been returned to the buyer."
        }
    },

    CANCELLED: {
        buyer: {
            icon: "heroicons:x-circle",
            color: "gray",
            title: "Order Cancelled",
            description:
                "This order has been cancelled."
        },
        seller: {
            icon: "heroicons:x-circle",
            color: "gray",
            title: "Order Cancelled",
            description:
                "This order has been cancelled."
        }
    },

RELEASE_PENDING: {
  buyer: {
    icon: "heroicons:clock",
    color: "blue",
    title: "Escrow Release Under Review",
    description:
      "Your request to release the escrow funds has been submitted successfully. Our team is reviewing the transaction, inspection evidence, and supporting documents from both parties. The funds will be released to the seller once the review is completed."
  },

  seller: {
    icon: "heroicons:shield-check",
    color: "blue",
    title: "Escrow Release Pending",
    description:
      "The buyer has requested the release of the escrow funds. Our team is currently reviewing the transaction and any submitted inspection evidence. Once the review is approved, the funds will be credited to your wallet."
  },

  admin: {
    icon: "heroicons:clipboard-document-check",
    color: "purple",
    title: "Release Approval Required",
    description:
      "The buyer has requested to release the escrow funds. Review all submitted evidence, confirm the transaction details, and approve or reject the release request."
  }
},
}

const current = computed(() => {
  const status = props.order?.escrowStatus || "UNPAID";

  const config = statusMap[status];

  if (!config) {
    console.warn("Unknown escrow status:", status);
    return statusMap.UNPAID[props.isSeller ? "seller" : "buyer"];
  }

  return config[props.isSeller ? "seller" : "buyer"];
});

const colorClass = computed(() => ({
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  yellow: "bg-yellow-100 text-yellow-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600",
  gray: "bg-slate-100 text-slate-600",

  // You must add this
  purple: "bg-purple-100 text-purple-600"

}[current.value.color]))



const updateStatus = async (action) =>{
  try {
    loading.value = true
    
     const data  = await useApiFetch(
      `/order/status/${props.order._id}/${action}`,
      {
        method: "POST",
       
      }
    )
   if(!data.success){
    $toast.error(data?.message || "Something went wrong.")
    loading.value = false
     window.location.reload();
    return
   }
     window.location.reload();
    return data
  } catch (err) {
   
loading.value = false
  $toast.error(err.data?.message || "Something went wrong.")
     loading.value = false
      window.location.reload();
  }
  

   
    
}
</script>

<template>

<div class="rounded-2xl border bg-white sm:p-6  p-2 shadow-sm">

    <div class="flex gap-4">

       

        <div class="flex-1">

            <div class="font-bold flex gap-1 items-center text-sm  sm:text-xl">
             <div  class="sm:w-14 sm:h-14 h-7 w-7 rounded-full flex justify-center items-center" :class="colorClass" >
                    <Icon   :name="current.icon"   class="w-7 h-7"  />
                </div>
               <span> {{ current?.title }} </span>
            </div>

            <p class="text-slate-600 mt-2 text-sm sm:text-[16px]  leading-6 sm:leading-7 ">
                {{ current?.description }}
            </p>
        <div  v-if="!isSeller &&  order.escrowStatus === 'REFUND_PENDING'" class=" flex justify-end">
                <button 
                    :disabled="loading"
                    @click="updateStatus('cancelRefund')"
                    class="px-4 py-2 rounded border mt-4  text-amber-400 bg-primary hover:bg-primary/90"
                >
                    {{loading ? 'Loading....' : 'Cancel Refund Request'}}
                </button>
        </div>

        </div>

    </div>

</div>

</template>