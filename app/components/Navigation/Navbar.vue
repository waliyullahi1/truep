<script setup>
import { ref,  watch } from "vue"

import {useRouter, useRoute} from "vue-router"


const router = useRouter()
const route = useRoute()



/* =========================
   PROPS
========================= */

defineProps({
  fixed:{
    type:Boolean,
    default:false
  }
})



/* =========================
   STATE
========================= */

const menuOpen = ref(false)



/* =========================
   NAV LINKS
========================= */


const navLinks = [

  {
    name:"Properties",
    to:"/search"
  },

  {
    name:"Agents",
    to:"/agent"
  },

  {
    name:"About Us",
    to:"/about-us"
  },

  {
    name:"Contact Us",
    to:"/contact-us"
  },

  {
    name:"Privacy Policy",
    to:"/privacy-policy"
  }

]



/* =========================
   METHODS
========================= */


const toggleMenu = ()=>{

  menuOpen.value = !menuOpen.value

}



const closeMenu = ()=>{

  menuOpen.value = false

}



const handleLogoClick = ()=>{

  router.push("/")

}




watch(
  ()=>route.fullPath,
  ()=>{
    closeMenu()
  }
)


</script>





<template>
  <div :class="fixed ? 'fixed top-0 left-0' : 'static'" class="z-[150] w-full" >

    <!-- ==================================
         NAVBAR
    =================================== -->
    <nav class=" bg-white  border-b transition-all duration-300  " >
      <Container :addTopBottomPadding="false" class=" flex items-center justify-between  py-3 ">

        <!-- ======================
             LOGO
        ======================= -->
        <NavigationLogo  @logoClicked="handleLogoClick"/>

        <!-- ======================
             DESKTOP NAVIGATION
        ======================= -->
        <div class="hidden md:flex  items-center   gap-5 text-sm font-medium  "   >
          <NuxtLink  v-for="link in navLinks" :key="link.to" :to="link.to"
            class="  transition  hover:text-primary "
            :class="{
              'text-primary font-semibold':
                route.path === link.to
            }"
          >
            {{ link.name }}
          </NuxtLink>
        </div>

        <!-- ======================
             DESKTOP ACTIONS
        ======================= -->
        <div  class="  hidden  md:flex items-center gap-3 ">

          <!-- Post Property -->
          <UiButtonsPrimary class="font-medium">
            <NuxtLink  to="/user/list/new" >
              Post Property
            </NuxtLink>
          </UiButtonsPrimary>

          <!-- Login -->
          <UiButtonsPrimary class="font-medium">
            <NuxtLink to="/auth?type=login-page" >
              Login
            </NuxtLink>
          </UiButtonsPrimary>

        </div>

        <!-- ======================
             MOBILE TOGGLE
        ======================= -->
        <div class="md:hidden">
          <NavigationToggle
            :isOpen="menuOpen"
            @revealMenu="toggleMenu"
          />
        </div>

      </Container>
    </nav>

    <!-- ==================================
         MOBILE OVERLAY
    =================================== -->
    <Transition name="fade">
      <div  v-if="menuOpen"  class="  fixed inset-0  z-[140]   bg-black/40 backdrop-blur-sm    md:hidden "  @click="closeMenu" />
    </Transition>

    <!-- ==================================
         MOBILE MENU
    =================================== -->
    <Transition name="slide">
      <div v-if="menuOpen" class=" fixed top-[4.5rem]  left-0  z-[150] h-screen  w-full bg-white   px-6   py-6  shadow-xl  md:hidden " >

        <div class="  flex flex-col gap-5  text-base  font-medium   " >

          <!-- Mobile Links -->
          <NuxtLink v-for="link in navLinks"  :key="link.to"
            :to="link.to" class="transition hover:text-primary "
            @click="closeMenu"
          >
            {{ link.name }}
          </NuxtLink>

          <!-- Divider -->
          <div class="pt-4 border-t">

            <!-- Post Property -->
            <UiButtonsPrimary class="w-full font-medium" >
              <NuxtLink to="/user/list/new" @click="closeMenu" >
                Post Property
              </NuxtLink>
            </UiButtonsPrimary>

          </div>

          <!-- Login -->
          <UiButtonsPrimary class="w-full font-medium" >
            <NuxtLink to="/auth/login" @click="closeMenu"  >
              Login
            </NuxtLink>
          </UiButtonsPrimary>

        </div>

      </div>
    </Transition>

  </div>
</template>




<style scoped>


.fade-enter-active,
.fade-leave-active{

transition:opacity .3s ease;

}


.fade-enter-from,
.fade-leave-to{

opacity:0;

}





.slide-enter-active,
.slide-leave-active{

transition:transform .3s ease;

}



.slide-enter-from,
.slide-leave-to{

transform:translateY(-20px);
opacity:0;

}



</style>