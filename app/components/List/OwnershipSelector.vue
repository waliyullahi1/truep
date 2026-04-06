<template>
  <div class="w-full max-w-3xl mx-auto space-y-8">
  <div class=" hi">
     <Phoneverification></Phoneverification>
  </div>
  <div class="border p-5 rounded-xl ">
    <!-- HEADER -->
    <div class=" p-5 rounded-xl ">
    <img src="/image/icon/icon-identity.svg" class="w-16 mb-4" />
      <h2 class="text-xl font-semibold">Identity Verification</h2>
      <p class="text-gray-500 text-sm mt-1">
        Fill in the correct details to verify your ownership or agency rights. 
      </p>
    </div>

    <!-- ROLE SELECT -->
    <div class=" pt-5">
      <label class="block text-sm font-semibold mb-3">
        Who are you?
      </label>
    
      <div class=" space-y-4 gap-4">

        <!-- OWNER -->
        <div class=" cursor-pointer"  @click="selectRole('owner')" >
          <div class="flex items-start gap-3">
            <input type="radio" value="owner" :checked="form.role === 'owner'" class=" mt-3 w-5" />
            <div>
              <p class="font-medium text-base">Property Owner</p>
              <p class="text-xs text-gray-500">
                You personally own this property
              </p>
            </div>
          </div>
        </div>

        <!-- AGENT -->
        <div class=" cursor-pointer"  @click="selectRole('agent')">
          <div class="flex items-start gap-3">
            <input type="radio" value="agent" :checked="form.role === 'agent'" class=" mt-3 w-5" />
            <div>
              <p class="font-medium text-base">Real Estate Agent</p>
              <p class="text-xs text-gray-500">
                You are listing for the owner
              </p>
            </div>
          </div>
        </div>

               <div class="flex justify-end mt-5"> 
                  <button   @click="back" class="btn-primary">Verify</button>
               </div>
      
      </div>
    </div>
  </div>
<!-- OWNER SECTION -->
<div v-if="form.role === 'owner'" class="space-y-5 border p-5 rounded-xl">

  <h3 class="font-semibold text-lg">Owner Verification</h3>

  <div class="space-y-2">
    <label class="label">Valid ID</label>
    <input type="file" @change="handleFile($event, 'owner.id')" class="input" />
    <p class="hint">National ID, Driver’s License, or Passport</p>
  </div>

  <div class="space-y-2">
    <label class="label">Property Document</label>
    <input type="file" @change="handleFile($event, 'owner.propertyDoc')" class="input" />
    <p class="hint">C of O, Deed of Assignment, etc.</p>
  </div>

</div> 

<!-- AGENT SECTION -->
<!-- <div v-if="form.role === 'agent'" class="space-y-5 border p-5 rounded-xl">

  <h3 class="font-semibold text-lg">Agent Verification</h3>

  <div class="space-y-2">
    <label class="label">Company Name</label>
    <input v-model="form.agent.companyName" type="text" class="input" />
  </div>

  <div class="space-y-2">
    <label class="label">CAC Number</label>
    <input v-model="form.agent.cacNumber" type="text" class="input" />
  </div>

  <div class="space-y-2">
    <label class="label">CAC Certificate</label>
    <input type="file" @change="handleFile($event, 'agent.cacCert')" class="input" />
  </div>

  <div class="space-y-2">
    <label class="label">Authorization Letter</label>
    <input type="file" @change="handleFile($event, 'agent.authLetter')" class="input" />
    <p class="hint">Signed by property owner</p>
  </div>

</div> -->

<!-- STATUS
<div
  class="p-4 rounded-lg text-sm flex items-center justify-between"
  :class="isValid ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'"
>
  <span>
    {{ isValid ? 'Ready for submission' : 'Please complete all required fields' }}
  </span>

  <span class="text-lg">
    {{ isValid ? '✔' : '⚠' }}
  </span>
</div>
 -->

  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const form = reactive({
  role: '',
  owner: {
    id: null,
    propertyDoc: null
  },
  agent: {
    companyName: '',
    cacNumber: '',
    cacCert: null,
    authLetter: null
  }
})

const selectRole = (role) => {
  form.role = role
}

const handleFile = (e, path) => {
  const file = e.target.files[0]
  if (!file) return

  const keys = path.split('.')
  let target = form

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      target[key] = file
    } else {
      target = target[key]
    }
  })
}

const isValid = computed(() => {
  if (form.role === 'owner') {
    return form.owner.id && form.owner.propertyDoc
  }

  if (form.role === 'agent') {
    return (
      form.agent.companyName &&
      form.agent.cacNumber &&
      form.agent.cacCert &&
      form.agent.authLetter
    )
  }

  return false
})

watch(form, () => {
  emit('update:modelValue', form)
}, { deep: true })

const cardClass = (type) => {
  return [
    'cursor-pointer border rounded-xl p-4 transition shadow-sm',
    form.role === type
      ? 'border-blue-500 bg-blue-50 shadow-md'
      : 'border-gray-200 hover:border-gray-400'
  ]
}
</script>

<style scoped>
.input {
  @apply w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.label {
  @apply text-sm font-medium;
}
.btn-primary{
  @apply bg-black text-white px-6 py-2 rounded-lg;
}
.btn-secondary{
  @apply border px-6 py-2 rounded-lg;
} 
.hint {
  @apply text-xs text-gray-400;
}
</style>
