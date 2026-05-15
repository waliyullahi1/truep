


<template>
  <div  class=" h-16  z-[150] relative    w-full "> 
   
    <nav
      :class="[
        'transition-all   bg-white  overflow-hidden  py- bg-hite duration-300 border-b',
        // isScrolled
        //   ? 'bg-white text-black border-accent-200 shadow-md'
        //   : 'bg-transparent text-white border-transparent'
      ]"
    >

      <ContainerUser :addTopBottomPadding="false" class="flex items-center justify-between py-2">

        <!-- Logo -->
         <div class=" flex items-center gap-10">
             <NavigationLogo @logoClicked="handleLogoClick" />
            <div class=" text-md text-gray-600 font-medium flex gap-6"> 
               
               
               
                
            </div>
         </div>

         <div class="hidden  md:flex gap-3 text-sm font-medium  items-center flex-shrink-0">
        
          <NuxtLink to="/auth?type=register-page" >
            <p class="   hover:text-primary hidden cursor-pointer"> Projects </p>
          </NuxtLink>
          <NuxtLink to="/search" >
            <p class="  hover:text-primary cursor-pointer"> Properties </p>
          </NuxtLink>
          <NuxtLink to="/agent" >
            <p class="  hover:text-primary cursor-pointer"> Agents </p>
          </NuxtLink>

          <NuxtLink to="/about-us" >
            <p class="  hover:text-primary cursor-pointer"> About Us </p>
          </NuxtLink>

          <NuxtLink to="/contact-us" >
            <p class="  hover:text-primary cursor-pointer"> Contact Us </p>
          </NuxtLink>


          <NuxtLink to="/privacy-policy">
            <p class="    hover:text-primary cursor-pointer"> Privacy Policy</p>
          </NuxtLink>


          

         
        </div>
        

        <!-- Desktop Navigation -->
        <div class="hidden  md:flex gap-8 flex-nk-0">
        
          <div class=" flex  overflow-hidden  gap-6">
            <img src="/image/icon/notification.svg" alt=""  class=" text-gray-600  w-5">
            <img src="/image/icon/messages.svg" alt=""  class=" text-gray-600  w-5">
            <img src="/image/icon/question.svg" alt=""  class=" text-gray-600  w-5">
            <button @click="toggleMoreMenu" class="flex items-end group">

              <div class="flex rounded-full overflow-hidden h-10 w-10 border transition group-hover:scale-105">
                <img
                  :src="preview || defaultAvatar"
                  class="w-full h-full object-cover"
                />
              </div>

              <div class="relative right-3 border-2 border-white w-3 h-3 rounded-full bg-green-500"></div>

            </button>
              
          
          </div>


         


       

         
        </div>

       
       <NavigationToggle 
       :isOpen="menuRevealed" 
         @revealMenu="toggleMenu" 
        />
        <Transition name="slide">

      <div
        v-if="menuRevealed"
        class="fixed  z-[150]  top-6 left-0 h-screen w-[70%] overflow-y-auto max-w-[320px] bg-white  md:hidden px-6 py-8 shadow-2xl"
      >

        <!-- HEADER -->
        <div class="flex sm:hidden  items-center  mb-10">
           <button @click="toggleMoreMenu" class="flex items-end group">

              <div class="flex rounded-full overflow-hidden h-10 w-10 border transition group-hover:scale-105">
                <img
                  :src="preview || defaultAvatar"
                  class="w-full h-full object-cover"
                />
              </div>

              <div class="relative right-3 border-2 border-white w-3 h-3 rounded-full bg-green-500"></div>

            </button>
            <div  class=" leading-tight">
              <p class="leading-tight text-sm font-semibold">@{{ auth.user.firstName }}</p>
               <p class=" leading-tight text-sm font-medium">{{ auth.user.roles }}</p>
            </div>

        </div>

        <!-- MENU LINKS -->
        <div class="flex flex-col gap-7 text-slate-700 font-medium">
          
        
           <NuxtLink to="/auth?type=register-page" >
            <p class="   hover:text-primary hidden cursor-pointer"> Projects </p>
          </NuxtLink>
          <NuxtLink to="/search" >
            <p class="  hover:text-primary cursor-pointer"> Properties </p>
          </NuxtLink>
          <NuxtLink to="/agent" >
            <p class="  hover:text-primary cursor-pointer"> Agents </p>
          </NuxtLink>

          <NuxtLink to="/about-us" >
            <p class="  hover:text-primary cursor-pointer"> About Us </p>
          </NuxtLink>

          <NuxtLink to="/contact-us" >
            <p class="  hover:text-primary cursor-pointer"> Contact Us </p>
          </NuxtLink>


          <NuxtLink to="/privacy-policy">
            <p class="    hover:text-primary cursor-pointer"> Privacy Policy</p>
          </NuxtLink>


         

         

         

        </div>

      </div>

    </Transition>

        <!-- Mobile Menu -->
      
      </ContainerUser>
    </nav>
    <div v-if="moreMenu" class=" ">
        <div class=" absolute  bg  h-64 w-60  top-16 sh  rounded-lg right-12 -12    bg-white  shadow-xl ">
              <div >
                 <div class="flex  p-3 items-end">
                 <button @click="toggleMoreMenu" class="flex items-end group">

                    <div class="flex rounded-full overflow-hidden h-10 w-10 border transition group-hover:scale-105">
                      <img
                        :src="preview || defaultAvatar"
                        class="w-full h-full object-cover"
                      />
                    </div>

                    <div class="relative right-3 border-2 border-white w-3 h-3 rounded-full bg-green-500"></div>

                  </button>
                  <div>
                     <p class="  text-xs font-medium">@{{auth.user.firstName}}</p>   
                    <p class="  text-xs font-medium">{{hiddenEmail}}</p>
                       
                  </div>
               
               </div>

              
                <div class=" px-2 border-t  border- py-3 space-y-3 mt-1">
                   <div v-if=" auth.user.roles === 'user'">
                    <NuxtLink to="/user/profile/edit" class="">
                        <p class=" text-sm  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer">  Upgrade Account</p>
                    </NuxtLink>
                 </div>
                  <div v-if=" auth.user.roles !== 'user'">
                    <NuxtLink to="/user/dashboard" class="">
                        <p class=" text-sm  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer">  Dashborad </p>
                    </NuxtLink>
                 </div>
                
                 <div>
                   <NuxtLink to="/user/list/new" class="">
                      <p class=" text-sm  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer">   Post property </p>
                  </NuxtLink>
                 </div>
                 <div class="">
                   <NuxtLink to="/user/profile/edit" class="">
                      <p class=" text-sm  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer"> 
                        Profile 
                         </p>
                   </NuxtLink>
                 </div>

                 <div class="">
                   <NuxtLink to="/user/settings" class="">
                      <p class=" text-sm  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer"> 
                       Setting
                         </p>
                   </NuxtLink>
                 </div>
               

                
                </div>

                <div class=" px-2 border-t  border- py-3 space-y-3 mt-1">
                   <div>
                   <button @click="handlelogout" class="">
                      <p class=" text-sm  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer"> log out</p>
                  </button>
                 </div>
                
                 
                
               

                
                </div>
              </div>
            </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const defaultAvatar = '/image/icon/avatar.svg'
import { useRuntimeConfig } from '#app'
const { $toast } = useNuxtApp()
const config = useRuntimeConfig()
const router = useRouter()
const route = useRoute()
const preview = ref('')
const auth = useAuth()

// States
const menuRevealed = ref(false)
const isScrolled = ref(false)

const moreMenu = ref(false)
//Poppins
defineProps({
 
})
// Toggle mobile menu
function toggleMenu() {
  menuRevealed.value = !menuRevealed.value
}

const toggleMoreMenu = () => {
  moreMenu.value = !moreMenu.value
}
// Auto-close menu when route changes
watch(route, () => {
  menuRevealed.value = false
})

// Other functions...
const handleLogoClick = () => {
  
  
  router.push('/')
}

const hiddenEmail = computed(() => {
  if(!auth?.value?.user?.email) return 'none'
  const [name, domain] = auth.value?.user?.email?.split('@')
  
  // keep first 4 characters
  const visiblePart = name.slice(0, 4)

  // replace remaining with *****
  const hiddenPart = '*'.repeat(Math.max(name.length - 4, 5))

  return `${visiblePart}${hiddenPart}@${domain}`
})


// Scroll detection
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const handlelogout = async () => {
  try {
    const response = await fetch(`${config.public.api_url}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    const data = await response.json()

    if (!response.ok) {
      $toast.error(data.message || 'Login failed')
      return
    }
    
     auth.value.user =  null
    auth.value.authenticated = false
    auth.value.checked = false
    auth.value.serverError = false
    /* SUCCESS */

    $toast.success(data.message || 'logout successful')
    
    
    setTimeout(() => {
      console.log('otp processed');
       router.push('/')
    }, 800)

  } catch (err) {
    
    loginloading.value = false
    $toast.error(err.message || 'An error occurred')
  } finally {
    loginloading.value = false
  }
}

onMounted(async () => {
  
  window.addEventListener('scroll', handleScroll)
   try {

    const res = await fetch(`${config.public.api_url}/profile/avatar`, {
      credentials: 'include'
    })

    const data = await res.json()

    if (data.success && data.avatar) {
      preview.value = data.avatar
    }

  } catch (err) {
    console.error(err)
  }
})


onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<style>
.active-link p {
  color: #b78d46;
  border-bottom: 2px solid #b78d46;
  padding-bottom: 3px;
  font-weight: 600;
}
</style>

