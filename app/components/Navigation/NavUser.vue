


<template>
  <div  class=" h-16  z-150 relative    w-full "> 
   
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
                    <p></p>     
                  </div>
               
               </div>

              
                <div class=" px-2 border-t  border- py-3 space-y-3 mt-1">
                   <div>
                   <NuxtLink to="/profile" class="">
                      <p class=" text-sm  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer">  Upgrade Account</p>
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
                   <NuxtLink to="/profile" class="">
                      <p class=" text-sm  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer"> 
                       Setting
                         </p>
                   </NuxtLink>
                 </div>
               

                
                </div>

                <div class=" px-2 border-t  border- py-3 space-y-3 mt-1">
                   <div>
                   <NuxtLink to="/profile" class="">
                      <p class=" text-sm  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer"> log out</p>
                  </NuxtLink>
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

const config = useRuntimeConfig()
const router = useRouter()
const route = useRoute()
const preview = ref('')
// States
const menuRevealed = ref(false)
const isScrolled = ref(false)
const menuAbout = ref(false)
const admissionMenu = ref(false)
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

function toggleAbout() {
  menuAbout.value = !menuAbout.value
}

function toggleadmission() {
  admissionMenu.value = !admissionMenu.value
}

// Scroll detection
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
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

