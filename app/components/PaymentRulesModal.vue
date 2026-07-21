<template>
    <Teleport  to="body">
            
        <Transition name="fade">

            <div
                v-if="modelValue"
                class="fixed inset-0 z-[9999] bg-black/60 flex justify-center items-center p-4"
            >

                <div
                    class="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hdden"
                >

                    <!-- Header -->

                    <div
                        class="border-b p-3"
                    >

                        <h2 class="text-lg font-bold">
                            Payment Terms & Escrow Rules
                        </h2>

                        <p class="text-slate-500 text-sm mt-">
                            Please read these terms carefully before making payment.
                        </p>

                    </div>

                    <!-- Rules -->

                    <div
                        class="p-4 overflow-y-auto max-h-[80vh]"
                    >

                        <div
                            v-for="rule in rules"
                            :key="rule.title"
                            class="flex gap-4 mb-4"
                        >

                           

                            <div>

                                <h3 class="font-semibold  text-sm flex items-center  gap-2">
                                 <Icon
                                :name="rule.icon"
                                :class="rule.color"
                                class="w-6 h-6 mt-1"
                            />
                                    {{ rule.title }}

                                </h3>

                                <p class="text-slate-600 text-justify text-sm mt-">
                                    {{ rule.description }}
                                </p>

                            </div>

                        </div>

                        <div
                        class="border-t p-2"
                    >

                        <label class="flex gap-3">

                            <input
                                v-model="agree"
                                type="checkbox"
                            >

                            <span class=" text-xs">
                                I have read and agree to the Payment Terms,
                                Escrow Rules, Refund Policy and Terms of Service.
                            </span>

                        </label>

                        <div
                            class="flex justify-end gap-3 mt-6"
                        >

                            <button
                                @click="close"
                                class="px-5 h-11 rounded-lg border"
                            >
                                Cancel
                            </button>

                            <button
                                :disabled="!agree"
                                @click="continuePayment"
                                class="px-6 h-11 rounded-lg bg-indigo-600 text-white disabled:bg-slate-300"
                            >
                                Continue to Payment
                            </button>

                        </div>

                    </div>

                    </div>

                    <!-- Footer -->

                    

                </div>

            </div>

        </Transition>

    </Teleport>
</template>

<script setup>

const props = defineProps({
    modelValue:Boolean
})

const emit = defineEmits([
    'update:modelValue',
    'continue'
])

const agree = ref(false)

const close = () => {
    agree.value = false
    emit('update:modelValue', false)
}

const continuePayment = () => {
    emit('continue')
    close()
}

const rules = [
  {
    icon: "heroicons:shield-check",
    color: "text-green-600",
    title: "Escrow Protection",
    description:
      "All payments are held securely in escrow until the buyer confirms satisfaction or the transaction is resolved through the platform's dispute process."
  },

  {
    icon: "heroicons:banknotes",
    color: "text-indigo-600",
    title: "Reservation Deposit",
    description:
      "Your first payment reserves the property and prevents unnecessary commitments from both the buyer and seller."
  },

 

  {
    icon: "heroicons:check-circle",
    color: "text-emerald-600",
    title: "Full Refund Eligibility",
    description:
      "The buyer will receive a 100% refund if the seller provides false information, fraudulent documents, incorrect property details, misleading photos or videos, or if the property materially differs from the advertised listing."
  },

  {
    icon: "heroicons:home",
    color: "text-blue-600",
    title: "Property Inspection Required",
    description:
      "Before requesting the release of escrow funds, the buyer must physically inspect the property whenever possible."
  },

  {
    icon: "heroicons:video-camera",
    color: "text-purple-600",
    title: "Inspection Evidence",
    description:
      "The buyer and seller may both be required to upload inspection photos and videos showing that the property was visited before escrow funds are released."
  },

  {
    icon: "heroicons:document-check",
    color: "text-cyan-600",
    title: "Release Confirmation",
    description:
      "Escrow funds will only be released after the buyer confirms that the property matches the listing and all agreed conditions have been met."
  },



  {
    icon: "heroicons:exclamation-triangle",
    color: "text-yellow-600",
    title: "Dispute Process",
    description:
      "If a dispute is opened, the escrow funds will remain locked while both buyer and seller are contacted by our support team for evidence and clarification."
  },

  {
    icon: "heroicons:clock",
    color: "text-orange-600",
    title: "Dispute Timeline",
    description:
      "Disputes are typically reviewed within 5 business days. Complex cases may require additional time, but most are resolved within 7 business days."
  },
     {
    icon: "heroicons:arrow-uturn-left",
    color: "text-red-600",
    title: "Buyer Cancellation",
    description:
      "If the buyer cancels the transaction within 7 days without a valid reason, a cancellation fee will apply. The fee is 10% of the total amount paid, subject to a minimum charge of ₦1,000 and a maximum charge of ₦7,000. This fee will be paid to the seller as compensation for the time, effort, and opportunity lost."
  },
  {
    icon: "heroicons:scale",
    color: "text-indigo-500",
    title: "Seller Refuses Refund",
    description:
      "If our investigation determines that the buyer's complaint is valid and the seller refuses to cooperate, the buyer will receive a full refund from the escrow funds."
  },

  {
    icon: "heroicons:arrows-right-left",
    color: "text-teal-600",
    title: "Transfer to Another Property",
    description:
      "Instead of requesting a refund, buyers may transfer their escrow balance to another property owned by the same seller at no additional platform charge."
  },

  {
    icon: "heroicons:credit-card",
    color: "text-sky-600",
    title: "Bank & Payment Charges",
    description:
      "Payment gateway charges, bank transfer fees, and other third-party processing fees may be deducted from refunds where applicable, since these charges are not refundable to the platform."
  },

  {
    icon: "heroicons:lock-closed",
    color: "text-green-700",
    title: "Pay Only Through the Platform",
    description:
      "Never make payments directly to a seller outside the platform. Payments made outside the platform are not protected by escrow and cannot be recovered by the platform."
  },

  {
    icon: "heroicons:clipboard-document-list",
    color: "text-pink-600",
    title: "Evidence Submission",
    description:
      "During any dispute, buyers and sellers may be asked to provide payment receipts, chat records, contracts, photos, videos, location evidence, and any other documents relevant to the transaction."
  },

  {
    icon: "heroicons:user-group",
    color: "text-violet-600",
    title: "Identity Verification",
    description:
      "Both buyer and seller may be required to complete identity verification before high-value transactions or escrow releases are approved."
  },

  {
    icon: "heroicons:no-symbol",
    color: "text-red-700",
    title: "Fraud Prevention",
    description:
      "Attempting to submit fake documents, false inspection evidence, impersonate another person, or manipulate the escrow process may result in account suspension, permanent banning, and possible legal action."
  },

  {
    icon: "heroicons:check-badge",
    color: "text-blue-700",
    title: "Agreement",
    description:
      "By continuing, you confirm that you have read, understood, and agreed to these Escrow Rules, Refund Policy, Terms of Service, and Privacy Policy."
  },

  {
  icon: "heroicons:calendar-days",
  color: "text-indigo-600",
  title: "Minimum Installment Payment",
  description:
    "For properties purchased through an installment plan, buyers must pay at least the minimum monthly installment amount specified by the seller. Payments below the required monthly amount may not be accepted."
},
{
  icon: "heroicons:clock",
  color: "text-orange-600",
  title: "Monthly Payment Deadline",
  description:
    "Monthly installment payments must be made on or before the agreed due date. Failure to make the required payment may place the installment plan at risk."
},
{
  icon: "heroicons:exclamation-circle",
  color: "text-red-600",
  title: "Missed Monthly Payments",
  description:
    "If the required monthly installment is not paid within 10 days after the due date, the seller may cancel the installment agreement and relist the property for sale on the marketplace."
},
{
  icon: "heroicons:receipt-percent",
  color: "text-yellow-600",
  title: "Effect of Cancellation",
  description:
    "If an installment plan is cancelled because the buyer failed to meet the payment terms, any refund will be processed according to the platform's Refund Policy and applicable cancellation charges."
}
];

</script>