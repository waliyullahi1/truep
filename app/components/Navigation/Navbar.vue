<template>
  <div :class=" fixed ?'fixed': 'static'" class="  z-90 w-full top-0 left-0"> 
   
    <nav
      :class="[
        'transition-all  py-2  bg-white duration-300 border-b',
        // isScrolled
        //   ? 'bg-white text-black border-accent-200 shadow-md'
        //   : 'bg-transparent text-white border-transparent'
      ]"
    >

      <Container :addTopBottomPadding="false" class="flex items-center justify-between py-2">

        <!-- Logo -->
        <NavigationLogo @logoClicked="handleLogoClick" />

        <!-- Desktop Navigation -->
        <div class="hidden  md:flex gap-3 text-sm font-medium  items-center flex-shrink-0">
          <!-- <div class=" group">
            <div class="flex items-center gap-1">
              <p class="f text-sm  cursor-pointer">About Us </p>
              <button class=" text-base font-medium group-hover:rotate-90 duration-150 -rotate-90"><</button>
            </div>
            <div class="  h-0 overflow-hidden  group-hover:h-24  duration-300 ease-in absolute ">
             <NuxtLink to="/vision-and-mission" activeClass="active-link" class=" ">
             <p class=" text-sm py-2 px-2 border-gray-700 border bg-slate-900 w-fi md:text-xs  text-white cursor-pointer">Vision and missions</p>
              </NuxtLink>
               <NuxtLink to="/faqs" activeClass="active-link">
                     <p class=" text-sm py-2 px-2 border-gray-700 border bg-slate-900 w-fi md:text-xs  text-white cursor-pointer">Frequently Asked Questions</p>
             
              </NuxtLink>
            </div>
            
          </div>

          <div class=" group">
            <div class="flex items-center gap-1">
              <p class="f text-sm  cursor-pointer">Admission </p>
              <button class=" text-base font-medium group-hover:rotate-90 duration-300 -rotate-90"><</button>
            </div>
            <div class="  h-0 overflow-hidden  group-hover:h-24  w-28  duration-150 ease-in absolute ">
             <NuxtLink to="/curriculum" activeClass="active-link" class=" ">
             <p class=" text-sm py-2 px-2 border-gray-700 border bg-slate-900 w-fi md:text-xs  text-white cursor-pointer">Curriculum</p>
              </NuxtLink>
               <NuxtLink to="/library" activeClass="active-link">
                     <p class=" text-sm py-2 px-2 border-gray-700 border bg-slate-900 w-fi md:text-xs  text-white cursor-pointer">  Library</p>
             
              </NuxtLink>
               <NuxtLink to="/electives" activeClass="active-link">
                     <p class=" text-sm py-2 px-2 border-gray-700 border bg-slate-900 w-fi md:text-xs  text-white cursor-pointer">  Electives</p>
             
              </NuxtLink>
            </div>
            
          </div> -->
          

          <NuxtLink to="/auth?type=register-page" >
            <p class="   hover:text-primary cursor-pointer"> Projects </p>
          </NuxtLink>
          <NuxtLink to="/search" >
            <p class="  hover:text-primary cursor-pointer"> Properties </p>
          </NuxtLink>
          <NuxtLink to="/search/profile" >
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

         <div class="hidden md:flex gap-8 flex-shrink-0">
          <UiButtonsPrimary  class=" font-medium">
              <NuxtLink to="/auth" >Post Property</NuxtLink>
          </UiButtonsPrimary>
        </div>

        <!-- CTA Button -->
        <!-- <div class="hidden md:flex gap-8 flex-shrink-0">
          <UiButtonsPrimary @click="openform">
            Apply Now
          </UiButtonsPrimary>
        </div> -->

        <!-- Mobile Toggle -->
              <NavigationToggle 
          :isOpen="menuRevealed" 
          @revealMenu="toggleMenu" 
        />


        <!-- Mobile Menu -->
        <div
          v-if="menuRevealed"
            class="flex flex-col items-start gap-6 md:hidden absolute bg-white h-screen top-[4.6rem] left-0 px-6 py-10 w-full"
           >
       

         

          
          
          
          <NuxtLink to="/auth?type=register-page" >
            <p class="   hover:text-primary cursor-pointer"> Projects </p>
          </NuxtLink>
          <NuxtLink to="/auth" >
            <p class="  hover:text-primary cursor-pointer"> Properties </p>
          </NuxtLink>
          <NuxtLink to="/auth" >
            <p class="  hover:text-primary cursor-pointer"> Agents </p>
          </NuxtLink>

          <NuxtLink to="/auth" >
            <p class="  hover:text-primary cursor-pointer"> About Us </p>
          </NuxtLink>

          <NuxtLink to="/auth" >
            <p class="  hover:text-primary cursor-pointer"> Contact Us </p>
          </NuxtLink>


          <NuxtLink to="/auth" >
            <p class="  hover:text-primary cursor-pointer"> Privacy Policy</p>
          </NuxtLink>
        </div>

      </Container>
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
  fixed : {
    type: Boolean,
    default: false
  }
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

</style>
