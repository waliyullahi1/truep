<template>
  <div class="w-full">
    
    <!-- NAVBAR -->
    <nav
      class="transition-all duration-300 py-4 bg-white border-b relative z-50"
    >
   
      <ContainerUser
        :addTopBottomPadding="false"
        class="flex items-center justify-between py-2"
      >
  
        <!-- LEFT -->
        <div class=" flex gap-2 items-center">
          <div class="md:hidden">
              <NavigationToggle
                :isOpen="menuRevealed"
                @revealMenu="toggleMenu"
              />
            </div>
        
          <div class="flex items-center gap-10">
              
            <!-- LOGO -->
            <NavigationLogo @logoClicked="handleLogoClick" />
        
            <!-- DESKTOP MENU -->
            <div
              class="hidden md:flex text-md text-gray-600 font-medium gap-6"
            >

              <NuxtLink
                to="/user/dashboard"
                activeClass="active-link"
              >
                <p class="hover:text-primary cursor-pointer">
                  Dashboard
                </p>
              </NuxtLink>

              <NuxtLink
                to="/user/list"
                activeClass="active-link"
              >
                <p class="hover:text-primary cursor-pointer">
                  List
                </p>
              </NuxtLink>

              <NuxtLink
                to="/user/orders"
                activeClass="active-link"
              >
                <p class="hover:text-primary cursor-pointer">
                  Orders
                </p>
              </NuxtLink>

              <NuxtLink
                to="/user/earnings"
                activeClass="active-link"
              >
                <p class="hover:text-primary cursor-pointer">
                  Earnings
                </p>
              </NuxtLink>

              <NuxtLink
                to="/user/settings"
                activeClass="active-link"
              >
                <p class="hover:text-primary cursor-pointer">
                  Settings
                </p>
              </NuxtLink>

            </div>

          </div>
        </div>
        <!-- RIGHT -->
        <div class="hidden sm:flex gap-8 flex-shrink-0">

          <div class="flex gap-6 items-center">

            <img
              src="/image/icon/notification.svg"
              class="w-5"
            />

            <img
              src="/image/icon/messages.svg"
              class="w-5"
            />

            <img
              src="/image/icon/question.svg"
              class="w-5"
            />

            <!-- PROFILE -->
            <div class="flex items-end">

              <button @click="toggleMoreMenu" 
                 class="flex rounded-full overflow-hidden h-10 w-10"
              > 
                <img :src="avatar  " class=" w-10 bg-black" />
              </button>
              
              <div
                class="relative right-3 border-2 border-white w-3 h-3 rounded-full bg-green-500"
              ></div>

            </div>

          </div>

        </div>

        <!-- MOBILE TOGGLE -->
        

      </ContainerUser>

    </nav>

    <!-- OVERLAY -->
    <Transition name="fade">

      <div
        v-if="menuRevealed"
        @click="menuRevealed = false"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
      ></div>

    </Transition>

    <!-- MOBILE SIDEBAR -->
    <Transition name="slide">

      <div
        v-if="menuRevealed"
        class="fixed top-0 left-0 h-screen w-[70%] overflow-y-auto max-w-[320px] bg-white z-50 md:hidden px-6 py-8 shadow-2xl"
      >

        <!-- HEADER -->
        <div class="flex sm:hidden  items-center  mb-10">
            <div class="flex items-end">

              <div   class="flex rounded-full overflow-hidden h-10 w-10" >
                <img :src="avatar "  />
              </div>
              <div class="relative right-3 border-2 border-white w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div  class=" leading-tight">
              <p class="leading-tight text-sm font-semibold">@waliyullahi</p>
               <p class=" leading-tight text-sm font-medium">Surveyor</p>
            </div>

        </div>

        <!-- MENU LINKS -->
        <div class="flex flex-col gap-7 text-slate-700 font-medium">

          <NuxtLink
            to="/user/dashboard"
            activeClass="active-link"
          >
            <p class="hover:text-primary">
              Dashboard
            </p>
          </NuxtLink>

          <NuxtLink
            to="/user/list"
            activeClass="active-link"
          >
            <p class="hover:text-primary">
              List
            </p>
          </NuxtLink>

          <NuxtLink
            to="/user/orders"
            activeClass="active-link"
          >
            <p class="hover:text-primary">
              Orders
            </p>
          </NuxtLink>

          <NuxtLink
            to="/user/earnings"
            activeClass="active-link"
          >
            <p class="hover:text-primary">
              Earnings
            </p>
          </NuxtLink>

          <NuxtLink
            to="/user/settings"
            activeClass="active-link"
          >
            <p class="hover:text-primary">
              Settings
            </p>
          </NuxtLink>

        

           <button @click="handlelogout" class="text-left  w-fit">
                      <p class=" text-  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer"> Log out</p>
                  </button>

        </div>

      </div>

    </Transition>


    <div v-if="moreMenu" class=" ">
        <div class=" absolute  z-50 bg  h-fit w-60  top-16 sh  rounded-lg right-12 -12    bg-white  shadow-xl ">
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
                  
                 
                
                

                 <div class="">
                   <NuxtLink to="/search" class="">
                      <p class=" text-primary text-sm  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer"> 
                       Switch to User
                         </p>
                   </NuxtLink>
                 </div>
               

                
                </div>

                <div class=" px-2 border-t  border- py-3 space-y-3 mt-1">
                   <div>
                   <button @click="handlelogout" class="">
                      <p class=" text-sm  px-2  duration-500 hover:text-secondary  i  font-medium     te cursor-pointer"> Sign out</p>
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

import { computed } from 'vue'

const moreMenu = ref(false)
const auth = useAuth()
const router = useRouter()
const route = useRoute()
const { $toast } = useNuxtApp()


watch(
  auth,
  (val) => {
    console.log('sellaerAUTH VALUE:', val)
  },
  { immediate: true, deep: true }
)



const avatar = computed(() => {
  return auth.value.user?.avatar || defaultAvatar
})

/* =========================================
   STATES
========================================= */

const menuRevealed = ref(false)
const isScrolled = ref(false)

/* =========================================
   TOGGLE MENU
========================================= */

function toggleMenu() {

  menuRevealed.value = !menuRevealed.value
}
function toggleMoreMenu(){
 
  console.log('ffffaaa');
  
  moreMenu.value = !moreMenu.value
  console.log('menueee');
  

}
/* ========== ===============================
   CLOSE MENU ON ROUTE CHANGE
========================================= */

watch(
  () => route.fullPath,
  () => {
    menuRevealed.value = false
  }
)

/* =========================================
   LOGO CLICK
========================================= */

const handleLogoClick = () => {
  router.push('/')
}

/* =========================================
   SCROLL
========================================= */

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
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* =========================================
   OVERLAY FADE
========================================= */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* =========================================
   SIDEBAR SLIDE
========================================= */

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* =========================================
   ACTIVE LINK
========================================= */

.active-link p {
  color: #b78d46;
  border-bottom: 2px solid #b78d46;
  padding-bottom: 3px;
  font-weight: 600;
}
</style>