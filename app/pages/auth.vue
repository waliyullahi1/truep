<script setup>
definePageMeta({
  layout: 'main',
  fixed: false
})

import { ref, watch } from 'vue'
import { useRouter, useRoute } from '#app'

const router = useRouter()
const route = useRoute()

const email = ref('')
const ispassword = ref(false)
const password = ref('')
const loading = ref(false)

const resetpassword = ref(false)
const isregisterpage = ref(false)


/* =========================
   LOGIN
========================= */


/* =========================
   HANDLE QUERY → STATE
========================= */
const syncFromQuery = () => {
  resetpassword.value = route.query.forgetpage === 'true'
  isregisterpage.value = route.query.type === 'register-page'
}

syncFromQuery()


/* =========================
   REMOVE FORGET PAGE
========================= */
const handleforgetPage = () => {
  
  
  const newQuery = { ...route.query }
  delete newQuery.forgetpage
  router.replace({ query: newQuery })
}


/* =========================
   CHANGE LOGIN/REGISTER
========================= */
const handlechangepage = () => {
  const newQuery = { ...route.query }

  newQuery.type =
    newQuery.type === 'register-page'
      ? 'login-page'
      : 'register-page'

  router.replace({ query: newQuery })
}

const showforgetPage = () => {
  const newQuery = { ...route.query }

  newQuery.forgetpage = 'true'

  router.replace({ query: newQuery })
}


/* =========================
   EMAIL STEP
// ========================= */
// const SubmiteEmail = () => {
//   ispassword.value = true
// }


/* =========================
   WATCH QUERY CHANGES
========================= */
watch(
  () => route.query,
  syncFromQuery,
  { deep: true }
)
</script>

<template>
  <div class="min-h-screen  bg-[url('/images/hero.jpg')] bg-no-repeat  bg-cover fr bg-gray-50 ">
    <div v-if="resetpassword" >
     <Forgetpage @close="handleforgetPage" />
    </div>
    
    <div class=" w-full min-h-screen    pb-6 l  px-4 bg-black/80 ">

    
      <Container class=" flex justify-center ">
      <div v-if="!isregisterpage" class="w-full max-w-md  bg-white rounded-sm shadow-lg p-8">

        <!-- Title -->
        <p class="text-xl font-semibold   ">
        Sign in to your account
        </p>
        <p class=" mb-8 text-gray-600 text-sm">
          Don’t have an account?  
          
          <button @click="handlechangepage" class=" text-left  underline cursor-pointer  hover:text-primary text-sm ">
                Join here
              </button>
        </p>

        <!-- Form -->
        <form  class="space-y-7">

          <!-- Email -->
          <div >
            <FormInput type="email" :usePlaceholder=true  label="username or email">
                <template #prefix>
                <img src="/image/icon/person.svg" alt="" srcset="">
                </template>
            </FormInput>
          </div>

          <!-- passwords -->
          <div  class="">
            <FormInput type="password"  class=" "  label="Password"></FormInput>
          </div>
          

          <!-- Password -->
          

          <!-- Button -->
          <div >
            <div class="">
              <button :disabled="loading" @click="SubmiteEmail" class="w-full bg-slate-800 text-white py-2  text-sm  font-medium hover:bg-slate-600 rounded-sm transition disabled:opacity-60" >
                {{ loading ? 'Logging in...' : 'Continue' }}
              </button>
            </div>

          
            
              
                  <div class=" flex justify-end w-full ">
                    <button type="button" @click="showforgetPage" class=" text-left text-sm text-blue-600">
                      Forgot password?
                    </button>
                  </div>
            </div> 
          <div>

          
          <div class=" p">
              <div class=" w-full flex justify-center -top-1.5 relative">
                  <UiTypographyP class=" text-center h-1 px-3 w-fit bg-white r">  <span class=" bg-white h-6 w-20 "> or</span> </UiTypographyP>
              </div>
              <div class=" w-full  h-[1px] bg-slate-300"></div>
          </div>
            <button
            
              class="w-full bg-blue-600 gap-3 flex justify-center items-center mt-4 px-5 text-white py-2 rounded-sm font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
              <img src="/image/icon/gmail.svg" class=" w-6" alt="">
              <p class=" text-sm">Google</p>
            </button>
          </div>  
        </form>

      

        <!-- Links -->
        <div class="text-center text-sm mt-2 space-y-2">
          <p>
            Don't have account?
            <button @click="handlechangepage" class="text-blue-600 font-semibold">
              Sign up
            </button>
          </p>
        </div>

      </div>

       <div v-if="isregisterpage" class="w-full max-w-md  bg-white rounded-sm shadow-lg p-8">

        <!-- Title -->
        <p class="text-xl font-semibold   ">
        Create a new account
        </p>
        <p class=" mb-8 text-gray-600 text-sm">
          Already have an account? 
          
          <button @click="handlechangepage" class=" text-left  underline cursor-pointer  hover:text-primary text-sm ">
                Sign in
              </button>
        </p>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-7">

          <!-- Email -->
          <div >
            <FormInput type="email" :usePlaceholder=true  label="username or email">
                <template #prefix>
                <img src="/image/icon/person.svg" alt="" srcset="">
                </template>
            </FormInput>
          </div>

          <!-- passwords -->
          <div  class="">
            <FormInput type="password"  class=" "  label="Password"></FormInput>
          </div>
          

          <!-- Password -->
          

          <!-- Button -->
          <div >
            <div  class="">
              <button :disabled="loading" @click="SubmiteEmail" class="w-full bg-slate-800 text-white py-2  text-sm  font-medium hover:bg-slate-600 rounded-sm transition disabled:opacity-60" >
                {{ loading ? 'Logging in...' : 'Sign in' }}
              </button>
            </div>
           
          
            
              
                  
            </div> 
          <div>

          
          <div class=" p">
              <div class=" w-full flex justify-center -top-1.5 relative">
                  <UiTypographyP class=" text-center h-1 px-3 w-fit bg-white r">  <span class=" bg-white h-6 w-20 "> or</span> </UiTypographyP>
              </div>
              <div class=" w-full  h-[1px] bg-slate-300"></div>
          </div>
            <button
            
              class="w-full bg-blue-600 gap-3 flex justify-center items-center mt-6 px-5 text-white py-2 rounded-sm font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
              <img src="/image/icon/gmail.svg" class=" w-6" alt="">
              <p class=" text-sm">Google</p>
            </button>
          </div>  
        </form>

      

        <!-- Links -->
        <div class=" text-sm mt-2 space-y-2">
          <div class="  flex  text-[12px] mt-1  justify-end w-full ">
                    By joining, you agree to the Fiverr Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.
            </div>
        </div>

      </div>
      </Container>

    </div>
  </div>
</template>
