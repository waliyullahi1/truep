<template>
  <div class="relative z-[150] h-16 w-full">

    <!-- NAVBAR -->
    <nav class="border-b bg-white transition-all duration-300">

      <ContainerUser
        :addTopBottomPadding="false"
        class="flex items-center justify-between py-2"
      >

        <!-- LEFT -->
        <div class="flex items-center gap-10">

          <!-- LOGO -->
          <NavigationLogo @logoClicked="handleLogoClick" /> user one

          <!-- DESKTOP LINKS -->
          <div class="hidden items-center gap-3 text-sm font-medium text-gray-600 md:flex">

            <NuxtLink to="/search">
              <p class="cursor-pointer hover:text-primary">
                Properties
              </p>
            </NuxtLink>

            <NuxtLink to="/agent">
              <p class="cursor-pointer hover:text-primary">
                Agents
              </p>
            </NuxtLink>

            <NuxtLink to="/about-us">
              <p class="cursor-pointer  whitespace-nowrap hover:text-primary">
                About Us
              </p>
            </NuxtLink>

            <NuxtLink to="/contact-us">
              <p class="cursor-pointer whitespace-nowrap hover:text-primary">
                Contact Us
              </p>
            </NuxtLink>

            <NuxtLink to="/privacy-policy">
              <p class="cursor-pointer whitespace-nowrap hover:text-primary">
                Privacy Policy
              </p>
            </NuxtLink>

          </div>

        </div>

        <!-- RIGHT -->
        <div class="hidden items-center gap-6 md:flex">

          <!-- ICONS -->
          <div class="flex items-center gap-5">

            <img
              src="/image/icon/notification.svg"
              class="w-5"
              alt="notification"
            />

            <img
              src="/image/icon/messages.svg"
              class="w-5"
              alt="messages"
            />

            <img
              src="/image/icon/question.svg"
              class="w-5"
              alt="help"
            />

          </div>

          <!-- AVATAR -->
          <button
            @click="toggleMoreMenu"
            class="flex items-end"
          >

            <div class="h-10 w-10 overflow-hidden rounded-full border">
              <img
                :src="preview || defaultAvatar"
                class="h-full w-full object-cover"
                alt="avatar"
              />
            </div>

            <div class="relative right-3 h-3 w-3 rounded-full border-2 border-white bg-green-500" />

          </button>

        </div>

        <!-- MOBILE TOGGLE -->
         
        <!-- <NavigationToggle
          :isOpen="menuRevealed"
          @revealMenu="toggleMenu"
        /> -->

      </ContainerUser>
       <div class=" flex justify-end w-full  absolute  top-4 right-2">
          <NavigationToggle
          :isOpen="menuRevealed"
          @revealMenu="toggleMenu"
        />
       </div> 
    </nav>

    <!-- MOBILE MENU -->
    <Transition name="slide">

      <div
        v-if="menuRevealed"
        class="fixed inset-y-0 left-0 z-[200] h-screen w-[70%] max-w-[320px] overflow-y-auto bg-white px-6 py-8 shadow-2xl md:hidden"
      >

        <!-- USER -->
        <div class="mb-10 flex items-center">

          <button
            @click="toggleMoreMenu"
            class="flex items-end"
          >

            <div class="h-10 w-10 overflow-hidden rounded-full border">
              <img
                :src="preview || defaultAvatar"
                class="h-full w-full object-cover"
                alt="avatar"
              />
            </div>

            <div class="relative right-3 h-3 w-3 rounded-full border-2 border-white bg-green-500" />

          </button>

          <div class="leading-tight">

            <p class="text-sm font-semibold">
              {{ auth.user?.firstName }}
            </p>

            <p class="text-sm font-medium">
              {{ auth.user?.roles }}
            </p>

          </div>

        </div>

        <!-- MOBILE LINKS -->
        <div class="flex flex-col gap-7 font-medium text-slate-700">

          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
          >
            <p class="cursor-pointer hover:text-primary">
              {{ link.name }}
            </p>
          </NuxtLink>

        </div>

      </div>

    </Transition>

    <!-- USER DROPDOWN -->
    <div
      v-if="moreMenu"
      class="fixed inset-0 z-[300]"
    >

      <!-- BACKDROP -->
      <div
        class="absolute inset-0 bg-black/20"
        @click="closeMenus"
      />

      <!-- MENU -->
      <div
        class="absolute right-4 top-16 w-64 rounded-xl bg-white shadow-2xl"
      >

        <!-- HEADER -->
        <div class="flex items-end gap-2 border-b p-4">

          <div class="h-10 w-10 overflow-hidden rounded-full border">
            <img
              :src="preview || defaultAvatar"
              class="h-full w-full object-cover"
              alt="avatar"
            />
          </div>

          <div>

            <p class="text-xs font-medium">
              {{ auth.user?.firstName }}
            </p>

            <p class="text-xs font-medium">
              {{ hiddenEmail }}
            </p>

          </div>

        </div>

        <!-- MENU ITEMS -->
        <div class="space-y-3 border-b px-3 py-4">

          <NuxtLink
            v-if="auth.user?.roles === 'user'"
            to="/user/profile/edit"
          >
            <p class="menu-link">
              Upgrade Account
            </p>
          </NuxtLink>

          <NuxtLink
            v-if="auth.user?.roles !== 'user'"
            to="/user/dashboard"
          >
            <p class="menu-link">
              Dashboard
            </p>
          </NuxtLink>

          <NuxtLink to="/user/list/new">
            <p class="menu-link">
              Post Property
            </p>
          </NuxtLink>

          <NuxtLink to="/user/profile/edit">
            <p class="menu-link">
              Profile
            </p>
          </NuxtLink>

          <NuxtLink to="/user/settings">
            <p class="menu-link">
              Settings
            </p>
          </NuxtLink>

        </div>

        <!-- LOGOUT -->
        <div class="px-3 py-4">

          <button @click="handleLogout">
            <p class="menu-link">
              Logout
            </p>
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted
} from 'vue'

import { useRouter, useRoute } from 'vue-router'
import { useRuntimeConfig } from '#app'

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const auth = useAuth()

const { $toast } = useNuxtApp()

/*
|--------------------------------------------------------------------------
| CONSTANTS
|--------------------------------------------------------------------------
*/

const defaultAvatar = '/image/icon/avatar.svg'

const navLinks = [
  {
    name: 'Properties',
    to: '/search'
  },
  {
    name: 'Agents',
    to: '/agent'
  },
  {
    name: 'About Us',
    to: '/about-us'
  },
  {
    name: 'Contact Us',
    to: '/contact-us'
  },
  {
    name: 'Privacy Policy',
    to: '/privacy-policy'
  }
]

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

const preview = ref('')
const menuRevealed = ref(false)
const moreMenu = ref(false)
const isScrolled = ref(false)

/*
|--------------------------------------------------------------------------
| COMPUTED
|--------------------------------------------------------------------------
*/

const hiddenEmail = computed(() => {

  const email = auth.value?.user?.email

  if (!email) return 'none'

  const [name, domain] = email.split('@')

  const visible = name.slice(0, 4)

  const hidden = '*'.repeat(
    Math.max(name.length - 4, 5)
  )

  return `${visible}${hidden}@${domain}`

})

/*
|--------------------------------------------------------------------------
| METHODS
|--------------------------------------------------------------------------
*/

const toggleMenu = () => {

  menuRevealed.value = !menuRevealed.value

  // close dropdown when mobile menu closes
  if (!menuRevealed.value) {
    moreMenu.value = false
  }

}

const toggleMoreMenu = () => {
  moreMenu.value = !moreMenu.value
}

const closeMenus = () => {
  menuRevealed.value = false
  moreMenu.value = false
}

const handleLogoClick = () => {
  router.push('/')
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

const handleLogout = async () => {

  try {

    const response = await fetch(
      `${config.public.api_url}/auth/logout`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return $toast.error(
        data.message || 'Logout failed'
      )
    }

    auth.value.user = null
    auth.value.authenticated = false
    auth.value.checked = false
    auth.value.serverError = false

    $toast.success(
      data.message || 'Logout successful'
    )
    console.log(auth.value);
    
    closeMenus()

    // router.push('/')

  } catch (error) {

    $toast.error(
      error.message || 'Something went wrong'
    )

  }

}

/*
|--------------------------------------------------------------------------
| FETCH AVATAR
|--------------------------------------------------------------------------
*/

const fetchAvatar = async () => {

  try {

    const res = await fetch(
      `${config.public.api_url}/profile/avatar`,
      {
        credentials: 'include'
      }
    )

    const data = await res.json()

    if (data.success && data.avatar) {
      preview.value = data.avatar
    }

  } catch (error) {
    console.error(error)
  }

}

/*
|--------------------------------------------------------------------------
| WATCH ROUTE
|--------------------------------------------------------------------------
*/

watch(
  () => route.fullPath,
  () => {
    closeMenus()
  }
)

/*
|--------------------------------------------------------------------------
| LIFECYCLE
|--------------------------------------------------------------------------
*/

onMounted(() => {

  window.addEventListener(
    'scroll',
    handleScroll
  )

  fetchAvatar()

})

onUnmounted(() => {

  window.removeEventListener(
    'scroll',
    handleScroll
  )

})
</script>
<style scoped>
.menu-link {
  @apply cursor-pointer rounded-lg px-2 py-2 text-sm font-medium transition duration-300 hover:bg-gray-100 hover:text-secondary;
}
</style>