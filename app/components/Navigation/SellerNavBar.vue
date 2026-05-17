<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted
} from 'vue'

import {
  useRouter,
  useRoute
} from 'vue-router'

import { useRuntimeConfig } from '#app'

/* =========================================
   COMPOSABLES
========================================= */

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const auth = useAuth()

const { $toast } = useNuxtApp()

/* =========================================
   CONSTANTS
========================================= */

const defaultAvatar = '/image/icon/avatar.svg'

const navLinks = [
  {
    name: 'Dashboard',
    to: '/user/dashboard'
  },
  {
    name: 'List',
    to: '/user/list'
  },
  {
    name: 'Orders',
    to: '/user/orders'
  },
  {
    name: 'Earnings',
    to: '/user/earnings'
  },
  {
    name: 'Settings',
    to: '/user/settings'
  }
]

/* =========================================
   STATE
========================================= */

const menuRevealed = ref(false)
const moreMenu = ref(false)
const isScrolled = ref(false)

/* =========================================
   COMPUTED
========================================= */

const avatar = computed(() => {
  return auth.value.user?.avatar || defaultAvatar
})

const username = computed(() => {
  return auth.value.user?.firstName || 'User'
})

const userRole = computed(() => {
  return auth.value.user?.roles || 'User'
})

/* =========================================
   METHODS
========================================= */

const closeMenus = () => {
  menuRevealed.value = false
  moreMenu.value = false
}

const toggleMenu = () => {

  menuRevealed.value = !menuRevealed.value

  // close dropdown if sidebar opens
  if (menuRevealed.value) {
    moreMenu.value = false
  }

}

const toggleMoreMenu = () => {

  moreMenu.value = !moreMenu.value

  // close mobile sidebar if dropdown opens
  if (moreMenu.value) {
    menuRevealed.value = false
  }

}

const handleLogoClick = () => {
  router.push('/')
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

/* =========================================
   LOGOUT
========================================= */

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

    // reset auth state
    auth.value.user = null
    auth.value.authenticated = false
    auth.value.checked = false
    auth.value.serverError = false

    closeMenus()

    $toast.success(
      data.message || 'Logout successful'
    )

    router.push('/')

  } catch (error) {

    $toast.error(
      error.message || 'Something went wrong'
    )

  }

}

/* =========================================
   WATCHERS
========================================= */

watch(
  () => route.fullPath,
  () => {
    closeMenus()
  }
)

/* =========================================
   LIFECYCLE
========================================= */

onMounted(() => {
  window.addEventListener(
    'scroll',
    handleScroll
  )
})

onUnmounted(() => {
  window.removeEventListener(
    'scroll',
    handleScroll
  )
})
</script>

<template>

  <div class="w-full">

    <!-- ====================================
         NAVBAR
    ===================================== -->

    <nav
      class="relative z-50 border-b bg-white py-4 transition-all duration-300"
    >

      <ContainerUser
        :addTopBottomPadding="false"
        class="flex items-center justify-between py-2"
      >

        <!-- LEFT -->
        <div class="flex items-center gap-3">

          <!-- MOBILE TOGGLE -->
          <div class="md:hidden">

            <NavigationToggle
              :isOpen="menuRevealed"
              @revealMenu="toggleMenu"
            />

          </div>

          <!-- LOGO + DESKTOP NAV -->
          <div class="flex items-center gap-10">

            <!-- LOGO -->
            <NavigationLogo
              @logoClicked="handleLogoClick"
            />

            <!-- DESKTOP LINKS -->
            <div
              class="hidden items-center gap-6 text-md font-medium text-gray-600 md:flex"
            >

              <NuxtLink
                v-for="link in navLinks"
                :key="link.to"
                :to="link.to"
                activeClass="active-link"
              >

                <p class="cursor-pointer hover:text-primary">
                  {{ link.name }}
                </p>

              </NuxtLink>

            </div>

          </div>

        </div>

        <!-- RIGHT -->
        <div class="hidden flex-shrink-0 sm:flex">

          <div class="flex items-center gap-6">

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

            <!-- PROFILE -->
            <button
              @click="toggleMoreMenu"
              class="flex items-end"
            >

              <div
                class="h-10 w-10 overflow-hidden rounded-full"
              >

                <img
                  :src="avatar"
                  class="h-full w-full object-cover"
                  alt="profile"
                />

              </div>

              <div
                class="relative right-3 h-3 w-3 rounded-full border-2 border-white bg-green-500"
              />

            </button>

          </div>

        </div>

      </ContainerUser>

    </nav>

    <!-- ====================================
         MOBILE OVERLAY
    ===================================== -->

    <Transition name="fade">

      <div
        v-if="menuRevealed"
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        @click="closeMenus"
      />

    </Transition>

    <!-- ====================================
         MOBILE SIDEBAR
    ===================================== -->

    <Transition name="slide">

      <div
        v-if="menuRevealed"
        class="fixed left-0 top-0 z-50 h-screen w-[70%] max-w-[320px] overflow-y-auto bg-white px-6 py-8 shadow-2xl md:hidden"
      >

        <!-- USER -->
        <div class="mb-10 flex items-center">

          <div class="flex items-end">

            <div
              class="h-10 w-10 overflow-hidden rounded-full"
            >

              <img
                :src="avatar"
                class="h-full w-full object-cover"
                alt="profile"
              />

            </div>

            <div
              class="relative right-3 h-3 w-3 rounded-full border-2 border-white bg-green-500"
            />

          </div>

          <div class="leading-tight">

            <p class="text-sm font-semibold">
              {{ '@' + username }}
            </p>

            <p class="text-sm font-medium">
              {{ userRole }}
            </p>

          </div>

        </div>

        <!-- MOBILE LINKS -->
        <div
          class="flex flex-col gap-7 font-medium text-slate-700"
        >

          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            activeClass="active-link"
          >

            <p class="hover:text-primary">
              {{ link.name }}
            </p>

          </NuxtLink>

          <!-- LOGOUT -->
          <button
            @click="handleLogout"
            class="w-fit text-left"
          >

            <p
              class="cursor-pointer px-2 font-medium duration-300 hover:text-secondary"
            >
              Logout
            </p>

          </button>

        </div>

      </div>

    </Transition>

    <!-- ====================================
         PROFILE DROPDOWN
    ===================================== -->

    <div
      v-if="moreMenu"
      class="fixed inset-0 z-[100]"
    >

      <!-- BACKDROP -->
      <div
        class="absolute inset-0"
        @click="closeMenus"
      />

      <!-- MENU -->
      <div
        class="absolute right-6 top-20 z-[110] w-60 rounded-xl bg-white shadow-2xl"
      >

        <!-- HEADER -->
        <div
          class="flex items-center gap-3 border-b p-4"
        >

          <div
            class="h-10 w-10 overflow-hidden rounded-full border"
          >

            <img
              :src="avatar"
              class="h-full w-full object-cover"
              alt="profile"
            />

          </div>

          <div>

            <p class="text-sm font-semibold">
              {{ '@' + username }}
            </p>

            <p class="text-xs text-gray-500">
              {{ userRole }}
            </p>

          </div>

        </div>

        <!-- MENU ITEMS -->
        <div class="space-y-3 px-3 py-4">

          <NuxtLink to="/search">

            <p class="menu-link text-primary">
              Switch to User
            </p>

          </NuxtLink>

        </div>

        <!-- FOOTER -->
        <div
          class="border-t px-3 py-4"
        >

          <button @click="handleLogout">

            <p class="menu-link">
              Sign out
            </p>

          </button>

        </div>

      </div>

    </div>

  </div>

</template>

<style scoped>

/* =========================================
   OVERLAY
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
   SIDEBAR
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

/* =========================================
   MENU LINK
========================================= */

.menu-link {
  @apply cursor-pointer rounded-lg px-2 py-2 text-sm font-medium transition duration-300 hover:bg-gray-100 hover:text-secondary;
}

</style>