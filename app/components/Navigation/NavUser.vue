<template>
  <div  class="   w-full "> 
   
    <nav
      :class="[
        'transition-all  py-4 bg-white duration-300 border-b',
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
                <NuxtLink to="/user/dashboard" activeClass="active-link">
                   <p class="  hover:text-primary cursor-pointer"> Dashboard </p>
                </NuxtLink>
                 <NuxtLink to="/user/list" activeClass="active-link">
                   <p class="  hover:text-primary cursor-pointer"> List </p>
                </NuxtLink>
                <NuxtLink to="/careers" activeClass="active-link">
                   <p class="  hover:text-primary cursor-pointer"> Orders </p>
                </NuxtLink>
                <NuxtLink to="/careers" activeClass="active-link">
                   <p class=" text-md hover:text-primary cursor-pointer"> Earnings </p>
                </NuxtLink>
                <NuxtLink to="/careers" activeClass="active-link">
                   <p class=" text-md hover:text-primary cursor-pointer"> Settings </p>
                </NuxtLink>
            </div>
         </div>
        

        <!-- Desktop Navigation -->
        <div class="hidden  md:flex gap-8 flex-shrink-0">
        
          <div class=" flex gap-6">
            <img src="/image/icon/notification.svg" alt=""  class=" text-gray-600  w-5">
            <img src="/image/icon/messages.svg" alt=""  class=" text-gray-600  w-5">
            <img src="/image/icon/question.svg" alt=""  class=" text-gray-600  w-5">
            <div class="flex  items-end">
              <div class="  flex  rounded-full overflow-hidden gap-4    h-10 w-10">
                 <img src="/image/profile.webp"/>
              </div>
              <div class="  relative right-3 border-2 border-white w-3 h-3 rounded-full   bg-green-500"> </div>
            </div>
          </div>
         


       

         
        </div>

       
       <NavigationToggle 
       :isOpen="menuRevealed" 
         @revealMenu="toggleMenu" 
        />


        <!-- Mobile Menu -->
        <div
          v-if="menuRevealed"
          class="flex flex-col items-start gap-6 md:hidden absolute bg-white h-screen top-[4.6rem] left-0 px-6 py-10 w-full"
        >
         
          <div class=" group">
            <div  @click="toggleAbout" class="flex items-center gap-1">
              <p class="f text-sm  cursor-pointer">About Us </p>
              <button :class="menuAbout ? '-rotate-90' : 'rotate-90'" class=" text-base font-medium  duration-150 "><</button>
            </div>
            <div     :class="menuAbout ? ' h-16' : 'h-0'"  class="   overflow-hidden    duration-300 ease-in  ">
           <NuxtLink to="/vision-and-mission" activeClass="active-link" class=" ">
              <button @click="toggleMenu "><p class=" text-sm py-2 px-2   w-fi md:text-xs   cursor-pointer">Vision and missions</p></button> 
              </NuxtLink> <br>
               <NuxtLink to="/faqs" activeClass="active-link">
                   <button @click="toggleMenu ">  <p  class=" text-sm py-2 px-2  w-fi md:text-xs  cursor-pointer">Frequently Asked Questions</p></button> 
             
              </NuxtLink>
            </div>
            
          </div>

          <div class=" group">
            <div  @click="toggleadmission" class="flex items-center gap-1">
              <p class="f text-sm  cursor-pointer">Admission  </p>
              <button :class="admissionMenu ? '-rotate-90' : 'rotate-90'" class=" text-base font-medium  duration-150 "><</button>
            </div>
            <div     :class="admissionMenu ? ' h-16' : 'h-0'"  class="   overflow-hidden    duration-300 ease-in  ">
           <NuxtLink to="/curriculum" activeClass="active-link" class=" ">
              <button @click="toggleMenu "><p class=" text-sm py-2 px-2   w-fi md:text-xs   cursor-pointer">Curriculum</p></button> 
              </NuxtLink> <br> 
               <NuxtLink to="/library" activeClass="active-link">
                   <button @click="toggleMenu ">  <p  class=" text-sm py-2 px-2  w-fi md:text-xs  cursor-pointer">Library</p></button> 
             
              </NuxtLink><br>
              <NuxtLink to="/electives" activeClass="active-link">
                   <button @click="toggleMenu ">  <p  class=" text-sm py-2 px-2  w-fi md:text-xs  cursor-pointer">Electives</p></button> 

              </NuxtLink>
            </div>
            
          </div>

          
          
          

          <NuxtLink to="/careers" activeClass="active-link">
            <p class=" text-sm cursor-pointer"> Career </p>
          </NuxtLink>

          <NuxtLink to="/contact-us" activeClass="active-link">
            <p class="  text-sm cursor-pointer">Contact us</p>
          </NuxtLink>
        </div>

      </ContainerUser>
    </nav>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// States
const menuRevealed = ref(false)
const isScrolled = ref(false)
const menuAbout = ref(false)
const admissionMenu = ref(false)

//Poppins
defineProps({
 
})
// Toggle mobile menu
function toggleMenu() {
  menuRevealed.value = !menuRevealed.value
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

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
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
