<script setup>

import { ref } from 'vue'

const auth = useAuth()
const { $toast } = useNuxtApp()

const loading = ref(false)
const asBook = ref(false)
const fullName = ref('')
const phone = ref('')
const email = ref('')
const inspectionDate = ref('')
const message = ref('')
const showBookingModal = ref(false)
const inspectionTime = ref('')
const emit = defineEmits(['close'])
const otpverify = ref(false)

const props = defineProps({
  propertyId: {
    type: String,
    required: true
  },
  property:{
    type: String,
    required: true
  }
})

const cancelPage = () => {
  emit('close')
}

const handlePhoneInput = (value) => {
  console.log(' waliu soliu  ', value);
  phone.value =  phone.value.replace(/\D/g, '') 
  console.log(phone.value);
  
  return String(value)
    .replace(/\D/g, '') // remove non-digits
    .slice(0, 11) // limit to 11 digits
}

const isBook = async () => {

    
    
  if(!auth.value.authenticated){
   
    return
  }

  try {

   const response = await useApiFetch(`/inspection/existing/${props.propertyId}`,{ method: 'GET' })

   asBook.value = Boolean(response?.data?.IsBooked)
    
    // If useApiFetch already returns JSON:
   
     
   
   

  } catch (err) {
    $toast.error(
      err?.message || 'Something went wrong'
    )
  } finally {
    loading.value = false
  }
}

 console.log(props.property);
 
const chatWithUs = () => {
  const propertyTitle = props.property?.title || ''
  const propertyUrl = window.location.href

  const message = `Hello Abanise Marketplace. I am interested in ${propertyTitle}, ${propertyUrl}`

  const whatsappUrl = `https://wa.me/2348070956301?text=${encodeURIComponent(message)}`

  window.open(whatsappUrl, '_blank')
}

isBook()
const submitForm = async () => {
  if (!auth.value?.user?.firstName) {
    if (!fullName.value || !email.value || !phone.value) {
      $toast.error('Please complete all required fields')
      return
    }
  }

  if (!inspectionDate.value) {
    $toast.error('Please select an inspection date')
    return
  }
  if (!inspectionDate.value || !inspectionTime.value) {
  $toast.error('Please select date and time')
  return
}

  loading.value = true

  try {
    const response = await useApiFetch(
      `/inspection/${props.propertyId}`,
      {
        method: 'POST',
       body: {
        fullName: fullName.value,
        email: email.value,
        phone: phone.value,
        inspectionDate: inspectionDate.value,
        inspectionTime: inspectionTime.value,
        message: message.value
      }
      }
    )

    // If useApiFetch already returns JSON:
    const data = response
   
    
       if (!response?.success) {
         if (response.status === 403) {
         
         otpverify.value = true
         loading.value = false
          $toast.success(
      data.message || 'Inspection booked successfully'
    )
         return
      }
      
      throw createError({
        statusCode: 500,
        statusMessage: response?.message || 'Failed to fetch properties'
      })
    }
    $toast.success(
      data.message || 'Inspection booked successfully'
    )

    showBookingModal.value = false
    cancelPage()

  } catch (err) {
    $toast.error(
      err?.message || 'Something went wrong'
    )
  } finally {
    loading.value = false
  }
}
const closeOtpModal = async () => {
  otpverify.value = false


    await submitForm()

}
</script>
<template>
  <div>


    
    
   <div class=" sm:flex-row flex-col  flex lg:flex-col  gap  gap-2">

    <UiButtonsPrimary :disabled="asBook" @click="!asBook && (showBookingModal = true)" >
      <div class=" flex  items-center gap-1">

       <Icon  :name="asBook ? 'heroicons:check-circle' : 'heroicons:calendar-days'"  class="w-5 h-5" /> 
        {{ asBook ? 'Request Sent' : 'Book for Inspection' }}
       </div>
    </UiButtonsPrimary>
      
    <UiButtonsPrimary @click="chatWithUs">
           <div class=" flex  items-center gap-1">
            <Icon  name="heroicons:chat-bubble-left-right" class="w-5 h-5"/> 
            Chat about this property
            </div>
    </UiButtonsPrimary>
  </div>
  <div v-if="showBookingModal"  class="fixed top- inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-1 sm:p-4">
  <div class="w-full max-w-md  mt-6  overflow-y-scroll  h-[85vh] bg-white rounded-2xl shadow-xl o" >

   
    <!-- Header -->
    <div class="p-5 border-b">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-xl font-bold">
            Book Inspection
          </h2>

          <p class="text-sm text-gray-500 mt-1">
            Takes less than a minute.
          </p>
        </div>

        <button
          @click="showBookingModal = false"
          class="text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Form -->
    <form
      @submit.prevent="submitForm"
      class="sm:p-5 p-2 space-y-4"
    >
     
      <!-- Guest fields -->
     
        <FormInput v-if="!auth.user?.firstName"
          label="Full Name"
          :usePlaceholder="true"
          v-model:inputValue="fullName"
        />

        <FormInput v-if="!auth.user?.email"
          label="Email"
          type="email"
          :usePlaceholder="true"
          v-model:inputValue="email"
        />
        
            <FormInput
      v-if="!auth.user?.phone"
      label="Phone Number"
      :usePlaceholder="true"
      :phoneOnly="true"
       v-model:inputValue="phone"
     
    />
          
     

      <!-- Date -->
      <div>
        <label
          class="block text-sm font-medium mb-2"
        >
          Inspection Date
        </label>

        <input
          v-model="inspectionDate"
          type="date"
          class="w-full h-12 border rounded-xl px-4"
        />
      </div>

      <!-- Time -->
      <div>
        <label
          class="block text-sm font-medium mb-2"
        >
          Preferred Time
        </label>

        <input
          v-model="inspectionTime"
          type="time"
          class="w-full h-12 border rounded-xl px-4"
        />
      </div>

      <!-- Note -->
      <div>
        <label
          class="block text-sm font-medium mb-2"
        >
          Note (Optional)
        </label>

        <textarea
          v-model="message"
          rows="3"
          class="w-full border rounded-xl p-3"
          placeholder="Any special request?"
        />
      </div>

      <!-- Small notice -->
      <div
        class="bg-blue-50 text-blue-700 text-xs rounded-xl p-3"
      >
        We will contact you to confirm the appointment.
      </div>

      <!-- Button -->
      <button
        :disabled="loading"
        class="w-full h-12 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50"
      >
        {{
          loading
            ? "Booking..."
            : "Book Inspection"
        }}
      </button>

    </form>
  </div>
</div>
<div v-if="otpverify" class="fixed w-full bg-black/50 inset-0  z-90 flex justify-center items-center"><AuthEmailVerifcation :redirect="false" :email="email"    @close="closeOtpModal"/></div>
  </div>


  
</template>