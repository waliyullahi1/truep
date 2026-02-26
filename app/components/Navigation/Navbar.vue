<template>
  <div :class=" fixed ?'fixed': 'static'" class="  z-90 w-full top-0 left-0"> 
   
    <nav
      :class="[
        'transition-all  py-4 bg-white duration-300 border-b',
        // isScrolled
        //   ? 'bg-white text-black border-accent-200 shadow-md'
        //   : 'bg-transparent text-white border-transparent'
      ]"
    >

      <Container :addTopBottomPadding="false" class="flex items-center justify-between py-2">

        <!-- Logo -->
        <NavigationLogo @logoClicked="handleLogoClick" />

        <!-- Desktop Navigation -->
        <div class="hidden  md:flex gap-8 flex-shrink-0">
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
          

          <NuxtLink to="/careers" activeClass="active-link">
            <p class=" text-md hover:text-primary cursor-pointer"> Career </p>
          </NuxtLink>
          <NuxtLink to="/careers" activeClass="active-link">
            <p class=" text-md hover:text-primary cursor-pointer"> Become Member </p>
          </NuxtLink>


           <div class="hidden md:flex gap-8 flex-shrink-0">
          <UiButtonsPrimary >
            Join
          </UiButtonsPrimary>
        </div>

         
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
          <!-- <UiButtonsTertiary @clicked="scrollToSection('pricing')">
            Pricing
          </UiButtonsTertiary>

          <UiButtonsTertiary @clicked="scrollToSection('faqs')">
            FAQs
          </UiButtonsTertiary> -->
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
.active-link p {
  color: #b78d46;
  border-bottom: 2px solid #b78d46;
  padding-bottom: 3px;
  font-weight: 600;
}
</style>
