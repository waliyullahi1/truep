<script setup>

import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from "vue"

import {
  useRouter,
  useRoute
} from "vue-router"



/* =====================================
   ROUTER
===================================== */

const router = useRouter()
const route = useRoute()

const {
  $toast
} = useNuxtApp()



definePageMeta({

  layout:"auth",

  access:"seller",

  sellerOnly:true

})





/* =====================================
   STATE
===================================== */


const filter = ref("all")

const openMenuId = ref(null)



const sampleTransactions = [
  {
    _id: "trx_001",

    type: "purchase",

    amount: 45000000,

    status: "completed",

    paymentMethod: "bank_transfer",

    createdAt: "2026-06-10T10:30:00.000Z",


    property: {
      title: "Luxury 4 Bedroom Duplex",
      location: {
        state: "Edo",
        city: "Benin City"
      }
    },


    user: {
      firstName: "John",
      lastName: "Okafor",
      email: "john.okafor@gmail.com"
    }

  },


  {
    _id: "trx_002",

    type: "rent",

    amount: 1200000,

    status: "completed",

    paymentMethod: "card",

    createdAt: "2026-06-08T14:20:00.000Z",


    property: {
      title: "Modern 3 Bedroom Apartment",
      location: {
        state: "Lagos",
        city: "Lekki"
      }
    },


    user: {
      firstName: "Sarah",
      lastName: "Williams",
      email: "sarah@gmail.com"
    }

  },


  {
    _id: "trx_003",

    type: "inspection",

    amount: 15000,

    status: "pending",

    paymentMethod: "card",

    createdAt: "2026-06-07T09:15:00.000Z",


    property: {
      title: "Residential Land 500sqm",
      location: {
        state: "Abuja",
        city: "Gwarinpa"
      }
    },


    user: {
      firstName: "Michael",
      lastName: "Ade",
      email: "michael.ade@gmail.com"
    }

  },


  {
    _id: "trx_004",

    type: "commission",

    amount: 750000,

    status: "completed",

    paymentMethod: "wallet",

    createdAt: "2026-06-05T16:45:00.000Z",


    property: {
      title: "5 Bedroom Detached House",
      location: {
        state: "Rivers",
        city: "Port Harcourt"
      }
    },


    user: {
      firstName: "David",
      lastName: "James",
      email: "david@gmail.com"
    }

  },


  {
    _id: "trx_005",

    type: "purchase",

    amount: 85000000,

    status: "pending",

    paymentMethod: "bank_transfer",

    createdAt: "2026-06-03T11:10:00.000Z",


    property: {
      title: "Premium Estate Plot",
      location: {
        state: "Ogun",
        city: "Abeokuta"
      }
    },


    user: {
      firstName: "Emeka",
      lastName: "Ibrahim",
      email: "emeka@gmail.com"
    }

  },


  {
    _id: "trx_006",

    type: "refund",

    amount: 300000,

    status: "refunded",

    paymentMethod: "bank_transfer",

    createdAt: "2026-05-30T08:00:00.000Z",


    property: {
      title: "Student Hostel Building",
      location: {
        state: "Osun",
        city: "Ile-Ife"
      }
    },


    user: {
      firstName: "Daniel",
      lastName: "Peter",
      email: "daniel@gmail.com"
    }

  },


  {
    _id: "trx_007",

    type: "rent",

    amount: 650000,

    status: "failed",

    paymentMethod: "card",

    createdAt: "2026-05-28T19:30:00.000Z",


    property: {
      title: "Self Contain Apartment",
      location: {
        state: "Edo",
        city: "Ekpoma"
      }
    },


    user: {
      firstName: "Grace",
      lastName: "Ojo",
      email: "grace@gmail.com"
    }

  }

]



/* =====================================
   FETCH TRANSACTIONS
===================================== */


const { data, pending, error, refresh} = await useAsyncData("transactions",
async()=>{ 
  const res =await useApiFetch("/payment")
  console.log(res);
  
  if(!res.success){
  throw createError({ statusCode: res.status || 500,
 statusMessage: res.message ||
"Failed loading transactions"
   })


}



return JSON.parse(

JSON.stringify(

res.data?.data ||
res.data ||
[]

)

)



},


{

lazy:true,

server:true

}

)








/* =====================================
   COMPUTED
===================================== */


// const transactions = computed(()=>{


// return data.value || []


// })


const transactions = computed(()=>{
  console.log(data.value);
  
  return data.value

})





const filteredTransactions = computed(()=>{


if(filter.value==="all"){

return transactions.value

}



return transactions.value.filter(

item=>item.status===filter.value

)



})







const transactionStatuses = computed(()=>{


return [

"all",

...new Set(

transactions.value.map(

item=>item.status

)

)

]


})







const totalAmount = computed(()=>{


return transactions.value.reduce(

(total,item)=>{

 
 
return total + Number(

item.creditAmount || 0

)


},0


)


})







/* =====================================
   SUMMARY HELPERS
===================================== */


const getTransactionCount=(status)=>{


if(status==="all"){

return transactions?.value?.length

}


return transactions?.value?.filter(

item=>

item.status===status

).length



}









/* =====================================
   FORMATTERS
===================================== */



const formatDate=(date)=>{


if(!date)
return ""



return new Date(date)

.toLocaleDateString(

"en-US",

{

year:"numeric",

month:"short",

day:"numeric"

}

)


}








const formatAmount=(amount)=>{


return (

"₦" +

Number(amount || 0)

.toLocaleString()

)


}







const formatTransactionType=(type)=>{


const types={


purchase:
"Property Purchase",


rent:
"Rent Payment",


inspection:
"Inspection Fee",


commission:
"Agent Commission",


refund:
"Refund"


}



return types[type] || type



}









const paymentClass=(status)=>{


const classes={


completed:
"bg-green-100 text-green-700",


pending:
"bg-yellow-100 text-yellow-700",


failed:
"bg-red-100 text-red-700",


refunded:
"bg-gray-100 text-gray-700"


}



return classes[status] ||

"bg-gray-100 text-gray-600"



}








/* =====================================
   MENU
===================================== */


const toggleMenu=(id)=>{


openMenuId.value =

openMenuId.value===id

?

null

:

id


}





const closeMenu=()=>{


openMenuId.value=null


}








/* =====================================
   ACTIONS
===================================== */


const viewReceipt=(id)=>{


router.push({

path:`/user/transactions/${id}`


})


}







const downloadInvoice=(id)=>{


console.log(

"download invoice",

id

)



$toast.info(

"Invoice download coming soon"

)


}









/* =====================================
   CLICK OUTSIDE
===================================== */


const handleClickOutside=(event)=>{


if(

!event.target.closest(".transaction-menu")

){


closeMenu()

}



}








/* =====================================
   LIFECYCLE
===================================== */


onMounted(()=>{


window.addEventListener(

"click",

handleClickOutside

)


})






onBeforeUnmount(()=>{


window.removeEventListener(

"click",

handleClickOutside

)


})



</script>


<template>
  <div class="min-h-screen bg-gray-50 py-8">
      <!-- <OverlayMaintanance />  -->
    <ContainerUser>

      <!-- =========================
           PAGE HEADER
      ========================== -->
      <div
        class="
          mb-8
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1
            class="
              text-2xl
              font-semibold
              text-gray-800
            "
          >
            Payment History
          </h1>

          <p
            class="
              mt-1
              text-sm
              text-gray-500
            "
          >
            View all your property payments and financial activities
          </p>
        </div>
      </div>

      <!-- =========================
           SUMMARY CARDS
      ========================== -->
      <div
        class="
          mb-8
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        <!-- Total Transactions -->
        <div class="rounded-xl border bg-white p-5">
          <p class="text-sm text-gray-500">
            Total Transactions
          </p>

          <h3 class="mt-2 text-2xl font-semibold">
            {{ transactions.length }}
          </h3>
        </div>

        <!-- Completed -->
        <div class="rounded-xl border bg-white p-5">
          <p class="text-sm text-gray-500">
            Completed
          </p>

          <h3
            class="
              mt-2
              text-2xl
              font-semibold
              text-green-600
            "
          >
            {{ getTransactionCount('SUCCESS') }}
          </h3>
        </div>

        <!-- Pending -->
        <div class="rounded-xl border bg-white p-5">
          <p class="text-sm text-gray-500">
            Pending
          </p>

          <h3
            class="
              mt-2
              text-2xl
              font-semibold
              text-yellow-600
            "
          >
            {{ getTransactionCount('pending') }}
          </h3>
        </div>

        <!-- Total Amount -->
        <div class="rounded-xl border bg-white p-5">
          <p class="text-sm text-gray-500">
            Total Amount
          </p>

          <h3 class="mt-2 text-2xl font-semibold">
            {{ formatAmount(totalAmount/100) }}
          </h3>
        </div>
      </div>

      <!-- =========================
           FILTER TABS
      ========================== -->
      <div
        class="
          mb-6
          flex
          gap-6
          overflow-x-auto
          border-b
          text-sm
          font-medium
          text-gray-500
        "
      >
        <button
          v-for="status in transactionStatuses"
          :key="status"
          @click="filter = status"
          class="
            relative
            whitespace-nowrap
            pb-3
            capitalize
          "
          :class="filter === status ? 'text-black' : ''"
        >
          {{ status }}

          <span
            v-if="filter === status"
            class="
              absolute
              bottom-0
              left-0
              h-[2px]
              w-full
              bg-black
            "
          />
        </button>
      </div>

      <!-- =========================
           TABLE CONTAINER
      ========================== -->
      <div
        class="
          overflow-x-auto
          rounded-xl
          border
          bg-white
        "
      >
        <div class="min-w-[1100px]">

          <!-- TABLE HEADER -->
          <div
            class="
              grid
              grid-cols-12
              gap-4
              border-b
              px-6
              py-4
              text-xs
              font-semibold
              uppercase
              text-gray-500
            "
          >
            <div class="col-span-2">Date</div>
            <div class="col-span-3">Property</div>
            <div class="col-span-1">Method</div>
            <div class="col-span-3">Reference</div>
            <div class="col-span-1">Amount</div>
            <div class="col-span-1">Status</div>
            <div class="col-span-1">Action</div>
          </div>

          <!-- ERROR -->
          <div
            v-if="error"
            class="p-10"
          >
            <NetworkError
              :error="error"
              @retry="refresh"
            />
          </div>

          <!-- LOADING -->
          <div
            v-else-if="pending"
            class="divide-y"
          >
            <div
              v-for="i in 6"
              :key="i"
              class="
                grid
                grid-cols-12
                gap-4
                px-6
                py-6
                animate-pulse
              "
            >
              <div class="col-span-2">
                <div class="h-4 w-24 rounded bg-gray-200" />
              </div>

              <div class="col-span-3 space-y-2">
                <div class="h-4 w-40 rounded bg-gray-200" />
                <div class="h-3 w-24 rounded bg-gray-100" />
              </div>

              <div class="col-span-2">
                <div class="h-4 w-24 rounded bg-gray-200" />
              </div>

              <div class="col-span-2">
                <div class="h-4 w-28 rounded bg-gray-200" />
              </div>

              <div class="col-span-1">
                <div class="h-4 w-16 rounded bg-gray-200" />
              </div>

              <div class="col-span-1">
                <div class="h-6 w-20 rounded-full bg-gray-200" />
              </div>

              <div class="col-span-1">
                <div class="h-8 w-8 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>

          <!-- EMPTY -->
          <div
            v-else-if="!filteredTransactions.length"
            class="
              py-20
              text-center
              text-gray-400
            "
          >
            <div class="mb-3 text-4xl">
              💳
            </div>

            <p>
              No transaction found
            </p>
          </div>
          
          <!-- TRANSACTIONS -->
          <div
          
            class="divide-y"
          >
            <div
              v-for="transaction in filteredTransactions"
              :key="transaction._id"
              class="
                relative
                grid
                grid-cols-12
                items-center
                gap-4
                px-6
                py-5
                transition
                hover:bg-gray-50
              "
            >
              <!-- Date -->
              <div class="col-span-2 text-sm text-gray-600">
                {{ formatDate(transaction.createdAt) }}
              </div>

              <!-- Property -->
              <div class="col-span-3">
                <p class="line-clamp-1 font-medium text-gray-800">
                  {{ transaction.property?.title }}
                </p>

                <p class="mt-1 text-xs text-gray-400">
                  {{ transaction.property?.location?.city }}
                </p>
              </div>

              <!-- Transaction Type -->
              <div class="col-span-1 text-sm text-gray-600">
                {{ formatTransactionType(transaction.paymentMethod) }}
              </div>

              <!-- Customer -->
              <div class="col-span-3">
                

                <p class="text-xs text-gray-400">
                  {{ transaction.txRef }}
                </p>
              </div>

              <!-- Amount -->
              <div class="col-span-1 text-sm font-semibold">
                {{ formatAmount(transaction.amount/100) }}
              </div>

              <!-- Status -->
              <div class="col-span-1">
                <span
                  class="
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium
                  "
                  :class="paymentClass(transaction.status)"
                >
                  {{ transaction.status }}
                </span>
              </div>

              <!-- Action -->
              <div class="relative col-span-1">
                <button
                  @click.stop="toggleMenu(transaction._id)"
                  class="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    hover:bg-gray-200
                  "
                >
                  ⋮
                </button>

                <div
                  v-if="openMenuId === transaction._id"
                  class="
                    absolute
                    right-0
                    top-10
                    z-50
                    w-44
                    rounded-lg
                    border
                    bg-white
                    shadow-xl
                  "
                >
                  <button
                    class="
                      block
                      w-full
                      px-4
                      py-3
                      text-left
                      text-sm
                      hover:bg-gray-100
                    "
                  >
                    View Receipt
                  </button>

                  <button
                    class="
                      block
                      w-full
                      px-4
                      py-3
                      text-left
                      text-sm
                      hover:bg-gray-100
                    "
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </ContainerUser>
  </div>
</template>