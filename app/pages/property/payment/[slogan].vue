<template>
  <div class="min-h-screen bg-slate-50">
    <!-- ================= Header ================= -->
    <!-- ================= Sign ================= -->

    <Verifyidentity  ref="kycRef" kycType="individual"  :hiddenButton="true" :reload="true" v-model:isVerify="verifiedModel" v-model:open="showVerification" />
                <button @click="openVerification">
          
        </button>
    <!-- ================= Loading ================= -->
    <div
      v-if="loading"
      class="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-pulse"
    >
      <div class="bg-white rounded-3xl p-6">
        <div class="h-60 rounded-2xl bg-slate-200"></div>

        <div class="mt-5 h-7 w-64 bg-slate-200 rounded"></div>
        <div class="mt-3 h-4 w-48 bg-slate-200 rounded"></div>

        <div class="grid grid-cols-3 gap-4 mt-8">
          <div class="h-24 rounded-2xl bg-slate-200"></div>
          <div class="h-24 rounded-2xl bg-slate-200"></div>
          <div class="h-24 rounded-2xl bg-slate-200"></div>
        </div>
      </div>

      <div class="bg-white rounded-3xl h-96"></div>
    </div>

    <!-- ================= Content ================= -->

    <div
      v-else
      class="max-w-6xl mx-auto px-2 py-8 grid lg:grid-cols-3 gap-8"
    >
      <!-- ========================================================= -->
      <!-- LEFT -->
      <!-- ========================================================= -->

      <div class="lg:col-span-2 space-y-4">
        <!-- ================= Property Card ================= -->
    
        <div
          class="bg-white   rounded-md sm overflow-hidden border shadow-sm"
        >
          <img
            :src="property ? getImage(property) : '/image/no-image.png'"
            class=" h-44 w-full object-cover"
          />

          <div class="sm:p-7 p-2">

           
              <div class="f w-full">
                <h2 class="text-lg flex justify-between w-full   font-bold">
                  {{ property?.title }}  
                
                </h2>

                <div
                  class="mt-2 text-sm flex items-center gap-2 text-slate-500"
                >
                 
                    <span class="flex items-center g">
                    <Icon
                    name="heroicons:map-pin"
                    class="w-5 h-5"
                  />
                 
                   
                        {{ property?.location.address }},   {{ property?.location.city }}, {{ property?.location.state }} <br>
                       
                    </span>
                     <span class="font-semibold">₦{{formatMoney(property.pricing.price)}}{{getPriceLabel(property)}} <br>
                    <!-- {{property}} -->
                </span>
                </div>

                       
               
                <div class="flex flex-wrap gap-2 mt-2">
                <div v-for="feature in property.features" :key="feature" class="text-slate-500 flex items-center gap-2 gap-1 px-1 text-sm">
                
                     <div class=" text-black w-1 h-1 bg-black font-bold rounded-full  text-lg"></div>{{feature.label}}
                </div>
                </div>
                
              </div>

             
          
             
            <!-- ================= Stats ================= -->

            <div  v-if="paidAmount !== 0"
              class="grid md:grid-cols-3 gap-5 mt-"
            >
              <div
                class="rounded-2xl bg-slate-50 border p-5"
              >
                <p class="text-slate-500 text-sm">
                  Total Price
                </p>

                <h3
                  class="mt-2 font-bold fraunces text-2xl"
                >
                   ₦{{ formatMoney(convertFromKobo(calculatedTotalPrice)) }}
                </h3>
              </div>

              <div
                class="rounded-2xl bg-green-50 border border-green-200 p-5"
              >
                <p class="text-green-600 text-sm">
                  Paid
                </p>

                <h3
                  class="mt-2 font-bold fraunces text-xl text-green-700"
                >
                  ₦{{ formatMoney(convertFromKobo(paidAmount)) }}
                </h3>
              </div>

              <div
                class="rounded-2xl bg-red-50 border border-red-200 p-5"
              >
                <p class="text-red-600 text-sm">
                  Remaining
                </p>

                <h3
                  class="mt-2 font-bold fraunces text-2xl text-red-700"
                >
                   ₦{{ formatMoney(convertFromKobo(remainingAmount)) }}
                </h3>
              </div>
            </div>

            <!-- ================= Progress ================= -->

            <div  v-if="paidAmount !== 0" class="mt-10">

              <div
                class="flex justify-between mb-3"
              >
                <span
                  class="font-medium text-slate-700"
                >
                  Payment Progress
                </span>

                <span
                  class="font-bold text-indigo-600"
                >
                  {{ currentProgress }}%
                </span>
              </div>

              <div
                class="h-4 rounded-full overflow-hidden bg-slate-200"
              >
                <div
                  class="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-700"
                  :style="{
                    width: currentProgress + '%'
                  }"
                ></div>
              </div>

            </div>

          </div>
        </div>

        <!---- Land Selles-->
         <div v-if="property.type === 'land'">

                <h2 v-if="currentProgress !== 100" class="font-bold text-lg fraunces">
                    Buy Plots
                </h2>

                <p  v-if="currentProgress !== 100"  class="text-sm  text-slate-500">
                    Select how many plots you want to purchase.
                </p>

                <!-- Available Plots Card -->
                <div  v-if="currentProgress !== 100" class="mt-5 rounded-xl border bg-indigo-50 border-indigo-100 p-4">

                    <div    class="grid grid-cols-2 gap-4">

                        <div >
                            <p class="text-xs text-slate-500 uppercase">
                                Available Plots
                            </p>

                            <h3 class="text-3xl font-bold text-indigo-700">
                                {{ property.landDetails.quantity }}
                            </h3>
                        </div>

                        <div class="text-right">
                            <p class="text-xs text-slate-500 uppercase">
                                Plot Size
                            </p>

                            <h3 class="text-xl font-semibold">
                                {{ property.landDetails.size }} sqm
                            </h3>
                        </div>

                    </div>

                </div>

                <!-- Select Plot -->
                <div v-if="!convertFromKobo(paidAmount)" class="mt-6">

                    <label class="block mb-2 font-medium">
                        Number of Plots to Buy
                    </label>

                    <input 
                        v-model.number="selectedPlots"
                        type="number"
                        min="1"
                        :max="property.landDetails.quantity"
                        class="w-full h-12 rounded-lg border px-4"
                    />

                    <input
                        v-model.number="selectedPlots"
                        type="range"
                        min="1"
                        :max="property.landDetails.quantity"
                        class="mt-5 w-full accent-indigo-600"
                    />

                </div>

                <!-- Summary -->
                <div class="mt-6 rounded-xl bg-slate-100 p-5 space-y-3">

                    <div class="flex justify-between">
                        <span>Price Per Plot</span>
                        <strong>₦{{ formatMoney(property.pricing.price) }}</strong>
                    </div>

                    <div class="flex justify-between">
                        <span>Available Plots</span>
                        <strong>{{ property.landDetails.quantity }}</strong>
                    </div>

                    <div class="flex justify-between">
                        <span>Plots Selected</span>
                        <strong>{{ selectedPlots }}</strong>
                    </div>

                    <div class="flex justify-between">
                        <span>Total Land Size</span>
                        <strong>
                            {{ selectedPlots * property.landDetails.size }} sqm
                        </strong>
                    </div>

                    <hr>

                    <div class="flex justify-between text-lg font-bold">
                        <span>Total Price</span>
                        <span class="text-indigo-600">
                            ₦{{ formatMoney(selectedPlots * property.pricing.price) }}
                        </span>
                    </div>

                </div>

            </div> 
            <!-- {{order}}
              {{auth?.user?._id }}   {{ property?.userId?._id}}
                {{auth?.user?._id === property?.userId?._id}} -->
                
               <PropertyOrderStatus v-if="order"
                  :order="order"
                  :is-seller="isSeller"
              />

               
            <div v-if="isBuyer && order?.escrowStatus==='FUNDED'">
               <EscrowCompleted
              v-if="currentProgress === 100"
              :order="order"
              @release="releaseMoney"
              @refund = ""
                />
            

               <!-- @refund="requestRefund" -->
               
            </div>  
           
                  <AdminEscrow  v-if="auth?.user?.roles?.includes('Admin') && order?.escrowStatus === 'RELEASE_PENDING'"
                    :order="order"
                    @close="showReview = false"
                    @release="releaseFunds"
                    @reject="rejectRelease"
                    />

        <!-- ================= Payment ================= -->

        <div  v-if="currentProgress !== 100 && auth?.user?._id !== property?.userId?._id"
          class="bg-white rounded-md border shadow-sm p-4"
        >
          <h2
            class="font-bold fraunces text-lg"
          >
            Choose Amount
          </h2>

          <p
            class="text-slate-500 text-sm  mt-0.5"
          >
            Select a percentage or enter your own payment amount.
          </p>

          <!-- ================= Percentage ================= -->

          <div class="grid grid-cols-5 mt-3 gap-3">

            <button
                v-for="percent in percentages"
                :key="percent"
                @click="selectPercentage(percent)"
                :class="[
                    'h-12 rounded-md border font-semibold transition',
                    selectedPercentage === percent
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white hover:bg-indigo-50'
                ]"
            >

                {{ percent }}%

            </button>

        </div>

          <!-- OR -->

          <div
            class="flex items-center gap-3 my-5"
          >
            <div
              class="flex-1 h-px bg-slate-200"
            ></div>

            <span
              class="text-slate-500"
            >
              OR
            </span>

            <div
              class="flex-1 h-px bg-slate-200"
            ></div>
          </div>

         
           

           
            
           

           

          <label
            class="block font-medium mb-2"
          >
            Custom Amount
          </label>

          <div
            class="relative"
          >
            <span
              class="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-xl"
            >
              ₦
            </span>


                        <input
               
                type="text"
                :value="formattedAmount"
                @input="onAmountInput"
                :min="0"
                :max="convertFromKobo(currentRemainingAmount)"
                placeholder="0"
                class="w-full pl-12 pr-5  h-14 rounded-md border text-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <!-- ================= Slider ================= -->

          <div
            class="mt-8"
          >
         
           <input
                v-model.number="amount"
                type="range"
                :min="0"
                :max="currentRemainingAmount"
                step="1"
                class="w-full accent-indigo-600 h-2"
            />
          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- RIGHT -->
      <!-- ========================================================= -->

     <div>
  <div class="sticky text-sm top-7 bg-white  - ibm-plex-mono border shadow-sm p-4">

    <h2 class="text-xl  fraunces  ">
      Payment Summary
    </h2>

    <p class="text-slate-500  test-sm pt-0.5  ">
     Review before you continue.
    </p>

    <!-- Summary -->

    <div class="mt-4 space-y-5">

      <div class="flex justify-between">
        <span class="text-slate-500">
          Total Property Price
        </span>

        <span class="font-bold fraunces ibm-plex-mono">
          &#8358;{{ formatMoney(convertFromKobo(calculatedTotalPrice)) }}
        </span>
      </div>
 
      <div class="flex justify-between">
        <span class="text-slate-500">
          Already Paid
        </span>

        <span class="font-bold fraunces text-green-600">
           &#8358;{{ formatMoney(convertFromKobo(paidAmount)) }}
        </span>
      </div>

      <div class="flex justify-between">
        <span class="text-slate-500">
          Paying Now
        </span>

        <span class="font-bold text-indigo-600 text-lg">
          ₦{{ formatMoney(amountInput) }}
        </span>
      </div>

      <div class="flex justify-between">
        <span class="text-slate-500">
          Paid After Payment
        </span>

        <span class="font-bold text-green-600">
          ₦{{ formatMoney(convertFromKobo(paidAfterPayment)) }}
        </span>
      </div>

      <div class="flex justify-between">
        <span class="text-slate-500">
          Remaining Balance
        </span>

        <span class="font-bold text-red-600">
          ₦{{ formatMoney(convertFromKobo(remainingAfterPayment)) }}
        </span>
      </div>

    </div>

    <!-- Progress -->

    <div class="mt-5">

      <div class="flex justify-between mb-2">

        <span class="font-semibold">
          Payment Progress
        </span>

        <span class="font-bold text-indigo-600">
          {{ progressAfterPayment }}%
        </span>

      </div>

      <div
        class="w-full h-4 bg-slate-200 rounded-full overflow-hidden"
      >
        <div
          class="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 transition-all duration-700"
          :style="{
            width: progressAfterPayment + '%'
          }"
        />
      </div>

    </div>

    <!-- Status Card -->

      <div v-if="canShowPaymentButtons">
          <div
            class="mt-4 rounded-2xl flex bg-indigo-50 border border-indigo-100 p-2"
          >

            <p class="text-slate-500  text-sm">
              After this payment
            

            <span class="mt-2 text-xl font-bold text-indigo-700">
              {{ progressAfterPayment }}%
            </span>

            
              of this property's total price will have been paid.
            </p>

          </div>

          <!-- Validation -->
          <div >
              <div
                v-if="amountInput > convertFromKobo(remainingAmount)"
                class="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-600"
              >
                Amount cannot exceed the remaining balance.
              </div>
          </div>
          <div
            v-if="amount <= 0 &&  auth?.user?._id !== property?.userId?._id"
            class="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-yellow-700"
          >
            Enter a payment amount to continue.
          </div>
      </div>
    <!-- Button -->
 
     <PaymentRulesModal  v-model="showPaymentRules"  @continue="payNow"/>


      <div v-if="canShowPaymentButtons">
          <button v-if="auth?.user?._id !== property?.userId?._id ||
          order?.escrowStatus === 'PARTIALLY_FUNDED' "
          @click="showPaymentRules = true"
            :disabled="!canPay || processing"
            class="mt-8 w-full h-14 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            <svg
              v-if="processing"
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
              {{ processing ? "Processing..." : "Continue to Payment" }}
            </span>
          </button>
      </div>
     <OrderActions
          :order="order"
          @cancel="cancelOrder"
          @refund="requestRefund"
          @reactivate="reactivateOrder"
          @cancelRefund="cancelRefundRequest"
        />
                

               
  
  </div>
    </div>


    </div> 
    <TransactionsHistory :route="`/payment/property/${property._id}/transactions`"/>


 
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const loading = ref(true)
const plots = ref(1)

// //  definePageMeta({
// //    layout: 'auth',
// //     isPrivateRoute : true
// //    })

const kycRef = ref()
const { pay } = usePaystack();
const auth = useAuth()
const showVerification = ref(true)
const property = ref({})
const order = ref(null)
 const agreedToTerms = ref(false)
// const totalAmount = ref(0)
const paidAmount = ref(0)
const remainingAmount = ref(0)

const amount = ref(0)

const percentages = [10, 25, 50, 75, 100]
const amountInput = ref(0)
const selectedPercentage = ref(null)
const selectedPlots = ref(1)
const processing = ref(false)

const isOwn = ref(false)
const kycType = ref('individual')
const verifiedModel = ref(false)
const showPaymentRules = ref(false)
// const agreedToTerms = ref(false)
/*
|--------------------------------------------------------------------------
| Fetch Property
|--------------------------------------------------------------------------
*/

const { data, pending } = await useAsyncData(
  `property-${route.params.slogan}`,
  async () => {
    const response = await useApiFetch(`/property/${route.params.slogan}`)
    // console.log(response.data);
    
    return response.data
  }
)

/*
|--------------------------------------------------------------------------
| Populate Property
|--------------------------------------------------------------------------
*/
const calculatedTotalPrice = computed(() => {
  // Existing order
  if (order.value) {
    // If not funded, use the current property price
    if (order.value.escrowStatus === "NOT_FUNDED") {
      if (property.value?.type === "land") {
        return (
          Number(property.value.pricing.price) *
          Number(selectedPlots.value) *
          100
        )
      }

      return Number(property.value.pricing.price) * 100
    }

    // Otherwise, use the order's saved total amount
    return Number(order.value.totalAmount)
  }

  // No existing order
  if (property.value?.type === "land") {
    return (
      Number(property.value.pricing.price) *
      Number(selectedPlots.value) *
      100
    )
  }

  return Number(property.value.pricing.price) * 100
})

const formattedAmount = computed(() => {
  return Number(amountInput.value || 0).toLocaleString("en-NG")
})

const canShowPaymentButtons = computed(()=>{
 
  if(order.value){
        
      return  ['PARTIALLY_FUNDED', 'NOT_FUNDED', 'PARTIALLY_FUNDED'].includes(order?.value?.escrowStatus)
    
  }

  return true
})

const canReactivateOrder = computed(() => {
  return (
    order.value &&
    order.value.orderStatus === "CANCELLED"
  )
})
const isSeller = computed(() => {
  return auth?.value?.user?._id === property?.value?.userId?._id;
});


const canCancelOrder = computed(() => {
  if (!order.value) return false

  return [
    "NOT_FUNDED",
    "PARTIALLY_FUNDED",
    "FUNDED"
  ].includes(order.value.escrowStatus)
  &&
  order.value.orderStatus !== "CANCELLED"
})
const isBuyer = computed(() => {
  return auth?.value?.user?._id !== property?.value?.userId?._id;
});
const onAmountInput = (event) => {
  // Keep only digits
  const cleaned = event.target.value.replace(/\D/g, "");

  amountInput.value = cleaned ? Number(cleaned) : 0;

  // Update the input immediately
  event.target.value = cleaned;
};
const getPriceLabel = (item) => {

  const pricing = item?.pricing || {}

  if (item?.type === 'house'   || item?.type === 'hostel' ) {

    if (item?.purpose === 'sale') {

      if (
        pricing.paymentType ===
        'installment'
      ) {
        return '/monthly payment'
      }

      return '/outright'
    }

    if (item?.purpose === 'rent') {

      const unit =
        pricing.rent?.duration?.unit

      return unit
        ? `/${unit}`
        : ''
    }
  }

  if (item?.type === 'land') {

    if (
      pricing.paymentType ===
      'outright'
    ) {

      return item.landDetails?.unit
        ? `/per ${item.landDetails.unit}`
        : ''
    }

    if (
      pricing.paymentType ===
      'installment'
    ) {

      return `/per ${
        item.landDetails?.unit ||
        'plot'
      } /monthly`
    }
  }

  return ''
}
const currentRemainingAmount = computed(() => {

  // Existing order
  if (order.value) {
    if (order.value.escrowStatus === "NOT_FUNDED") {
      return calculatedTotalPrice.value
      
    }
    
    return Number(order.value.remainingAmount || 0)
  }

  // New order
  return calculatedTotalPrice.value

})
const getLocation = (item) => {

  return `${
    item?.location?.state || ''
  }/${
    item?.location?.city || ''
  }`
} 
const getImage = (item) => {

  return (
    item?.media?.files?.[0]?.url ||
    '/image/no-image.png'
  )
}


const openVerification = () => {
  kycRef.value?.startverification()
}

// watchEffect(() => {

//   if (!data.value) return

//   property.value = data.value.data

//   // FIXED
//   order.value = data.value.order || null

//   if (order.value) {

//     totalAmount.value = Number(order.value.totalAmount || 0)

//     // Escrow amount is the amount already paid
//     paidAmount.value = Number(order.value.escrowAmount || 0)

//     remainingAmount.value = Number(order.value.remainingAmount || 0)

//     // If only ₦20,000 remains,
//     // automatically make that the payment amount
//     amount.value = remainingAmount.value

//   } else {


//     if (order.value) {

//         paidAmount.value = Number(order.value.escrowAmount)
//         remainingAmount.value = Number(order.value.remainingAmount)

//     } else {

//         paidAmount.value = 0
//         remainingAmount.value = calculatedTotalPrice.value

//     }

//     paidAmount.value = 0
//     remainingAmount.value = totalAmount.value

//     // default payment
//     amount.value = totalAmount.value
//   }

//   loading.value = false

// })
watch(
  () => data.value,
  (newData) => {
    if (!newData) return

    property.value = newData.data
    order.value = newData.order || null

    if (order.value) {
      paidAmount.value = Number(order.value.escrowAmount)
      remainingAmount.value = Number(order.value.remainingAmount)
    } else {
      paidAmount.value = 0
      remainingAmount.value = calculatedTotalPrice.value
    }

    loading.value = false
  },
  {
    immediate: true
  }
)
const hasOrder = computed(() => !!order.value);

const isFullyPaid = computed(() =>
    order.value?.remainingAmount === 0
);

const isPartiallyPaid = computed(() =>
    order.value &&
    order.value.remainingAmount > 0 &&
    order.value.escrowAmount > 0
);
const pricePerPlot = computed(() => {
  if (property.value?.type !== "land") return 0

  return Number(property.value?.pricing?.price || 0)
})




// watch(selectedPlots, (value) => {

//     if (property.value.type !== "land") return

//     if (value < 1)
//         value = 1

//     if (value > property.value.landDetails.quantity)
//         value = property.value.landDetails.quantity

//     selectedPlots.value = value

//     amount.value =
//         value * Number(property.value.pricing.price)

// })

watch(selectedPlots, (value) => {

    if (property.value.type !== "land") return

    if (!value || value < 1) {
        selectedPlots.value = 1
        return
    }

    if (value > property.value.landDetails.quantity) {
        selectedPlots.value = property.value.landDetails.quantity
    }

})

// const calculatedTotalPrice = computed(() => {

//     // Existing order
//     if (order.value) {
//         return Number(order.value.totalAmount)
//     }

//     // New property
//     if (property.value?.type === "land") {
//         return (
//             Number(property.value.pricing.price) *
//             Number(selectedPlots.value) *
//             100
//         )
//     }

//     return Number(property.value.pricing.price) * 100
// })

/*
|--------------------------------------------------------------------------
| Percentage Button
|--------------------------------------------------------------------------
*/

const selectPercentage = (percent) => {
  selectedPercentage.value = percent

  amount.value = Math.round(
    currentRemainingAmount.value * percent / 100
  )
}
/*
|--------------------------------------------------------------------------
| Validate Amount
|--------------------------------------------------------------------------
*/
// watch(amount, (value) => {

//   value = Number(value)

//   if (isNaN(value)) value = 0

//   if (value < 0) value = 0

//   const max = currentRemainingAmount.value

//   if (value > max)
//     value = max

//   amount.value = value

//   const match = percentages.find(percent =>
//     Math.round(
//       currentRemainingAmount.value * percent / 100
//     ) === value
//   )

//   selectedPercentage.value = match || null

// })

watch(amountInput, value => {
    amount.value = Math.round(Number(value || 0) * 100)
})

watch(amount, value => {
  amountInput.value = Math.round(value / 100)
})

/*
|--------------------------------------------------------------------------
| Computed
|--------------------------------------------------------------------------
*/
const currentProgress = computed(() => {
  // console.log(calculatedTotalPrice.value, "calculatedTotalPrice.value");
  // console.log(paidAmount.value, "paidAmount.value");

  
  if (!calculatedTotalPrice.value) return 0

  return Math.round(
    ((paidAmount.value) / calculatedTotalPrice.value) * 100
  )

})
const paidAfterPayment = computed(() => {

  return paidAmount.value + amount.value

})

// const remainingAfterPayment = computed(() => {

//   return Math.max(
//     calculatedTotalPrice.value -
//     paidAfterPayment.value,
//     0
//   )

// })


const progressAfterPayment = computed(() => {

  if (!calculatedTotalPrice.value) return 0

  return Math.min(
    100,
    Math.round(
      (paidAfterPayment.value / calculatedTotalPrice.value) * 100
    )
  )

})

const remainingAfterPayment = computed(() => {
  return Math.max(
    currentRemainingAmount.value - amount.value,
    0
  )
})

const canPay = computed(() => {
  const amount = Number(amountInput.value) || 0
  const remaining = currentRemainingAmount.value / 100

  return amount > 0 && amount <= remaining
})

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/
const convertFromKobo = (value) => Number(value || 0) / 100
const formatMoney = (value) =>

  (Number(value || 0)).toLocaleString("en-NG")

/*
|--------------------------------------------------------------------------
| Pay
|--------------------------------------------------------------------------
*/

// const payNow = async () =>{
  
//         const verify = await useApiFetch("/payment/property/verify-order", {
//         method: "POST",
//         body: {
//           ref: 'ORD-1783000429876-5165-1783002117982-F60U3X'
//         }
//       });
//       console.log(verify);
      
// }

const updateStatus = async (action, reason) =>{
  try {
     const data  = await useApiFetch(
      `/order/status/${order.value._id}/${action}`,
      {
        method: "POST",
        body:{
          reason
        }
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
const cancelOrder = async ({ reason }) => {
   await updateStatus("cancel", reason)
 

}
const requestRefund = async (reason) => {
 await updateStatus("refund", reason)
 

}



const refreshProperty = async () => {

  try {

    const response = await useApiFetch(
      `/property/${route.params.slogan}`
    )

    property.value = response.data.data

    order.value = response.data.order || null

    if (order.value) {

      // totalAmount.value = Number(order.value.totalAmount || 0)

      paidAmount.value = Number(order.value.escrowAmount || 0)

      remainingAmount.value = Number(order.value.remainingAmount || 0)

      amount.value = remainingAmount.value

    } else {

      paidAmount.value = 0

      remainingAmount.value = calculatedTotalPrice.value

      amount.value = calculatedTotalPrice.value

    }

  } catch (err) {

    console.error(err)

  }

}





const payNow = async () => {
  if (!canPay.value || processing.value) return

  processing.value = true

  try {
    const response = await useApiFetch(
      `/payment/property/${route.params.slogan}`,
      {
        method: "POST",
        body: {
          totalPlot: selectedPlots.value,
          propertyId: property.value._id,
          amount: amountInput.value
        }
      }
    )

    if (!response.success) {
      processing.value = false
      return
    }
;
  
    pay({
      email: auth.value.user.email,
      amount: response.data.data.otherDetails.paymentSummary.totalWithCharges,
      reference: response.data.data.payment.txRef,

      metadata: {
        orderId: response.data.data.order.orderNumber
      },

      async onSuccess(transaction) {
        try {
          const verify = await useApiFetch(
            "/payment/property/verify-order",
            {
              method: "POST",
              body: {
                ref: transaction.reference
              }
            }
          )

         if (verify.success) {
          await refreshProperty()

          const isVerified = await kycRef.value.startverification()

          if (!isVerified) {
            // Modal will already be opened by startverification()
            return
          }

          // User is verified
          window.location.reload()
        }
        } finally {
          processing.value = false
        }
      },

      onCancel() {
        processing.value = false
      }
    })

  } catch (err) {
    console.error(err)
    processing.value = false
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

.ibm-plex-mono {
  font-family: "IBM Plex Mono", monospace;
}



.fraunces{
 font-family: 'Fraunces', serif;
}

</style>