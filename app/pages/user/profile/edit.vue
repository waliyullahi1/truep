<template>
  <div class="min-h-screen bg-slate-50 py-4">
    <ContainerUser>
      <div class="gap-8">

        <div class="bg-white flex flex-col justify-center w-full h-full py-7 rounded-2xl">

          <UiTypographyH2 class="text-center">
            Update Your Information Profile
          </UiTypographyH2>

          <UiTypographyP class="text-center mt-1">
            Add missing details to complete your profile.
            You can update it at any time.
          </UiTypographyP>

          <!-- STEPS -->
          <div
            class="grid md:grid-cols-3 sm:grid-cols-2 items-center gap-2 mt-9"
          >

            <button
              v-for="value in steps"
              :key="value.key"
              @click="activeSection = value.key"
              class="w-full rounded-2xl border text-left transition"
            >

              <div
                :class="
                  activeSection === value.key
                    ? 'bg-black text-white'
                    : 'hover:bg-slate-100 text-slate-900'
                "
                class="flex items-center gap-3 py-2 px-4 rounded-2xl transition-all"
              >

                <div
                  :class="
                    activeSection === value.key
                      ? 'bg-white text-black'
                      : 'bg-slate-200 text-slate-700'
                  "
                  class="w-7 h-7 text-xs rounded-xl flex items-center justify-center font-bold"
                >
                  {{ value.key }}
                </div>

                <div>
                  <p class="font-semibold text-sm">
                    {{ value.title }}
                  </p>

                  <p
                    :class="
                      activeSection === value.key
                        ? 'text-slate-300'
                        : 'text-slate-500'
                    "
                    class="text-xs mt-1"
                  >
                    {{ value.des }}
                  </p>
                </div>

              </div>

            </button>

          </div>

          <!-- STEP 1 -->
          <div
            v-if="activeSection === 1"
            class="flex justify-center shadow-md w-full h-full bg-white"
          >

            <div class="w-full max-w-5xl mt-9">

              <div
                class="bg-white rounded-3xl border border-slate-200 sm:p-6 p-3 lg:p-8"
              >

                <!-- HEADER -->
                <div class="flex items-center justify-between mb-8">

                  <div>
                    <h2 class="text-2xl font-bold text-slate-900">
                      Personal Information
                    </h2>

                    <p class="text-slate-500 mt-2">
                      Add your public profile details
                    </p>
                  </div>

                  <div
                    class="hidden md:flex bg-emerald-50 px-4 py-2 rounded-full items-center gap-2"
                  >
                    <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>

                    <span class="text-sm font-medium text-emerald-700">
                      Step 1
                    </span>
                  </div>

                </div>

                <!-- BODY -->
                <div class="flex flex-col lg:flex-row gap-10">

                  <!-- IMAGE -->
                  <div class="justify-center">
                    <ProfileImage v-model="user.profile_image" />
                  </div>

                  <!-- FORM -->
                  <div class="flex-1 space-y-5">

                    <!-- NAME + ROLE -->
                    <div class="grid grid-cols-2 md:grid-cols-2 gap-5">

                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-slate-700"
                        >
                          Full Name
                        </label>

                        <ProfileEditText
                          v-model="user.name"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-slate-700"
                        >
                          Professional Role
                        </label>

                        <ProfileSelectText
                          v-model="user.roles"
                          placeholder="Select profession"
                          :options="[
                            'Property Agent',
                            'Senior Property Agent',
                            'Property Manager',
                            'Broker',
                            'Agency Manager',
                            'Independent Agent',
                            'Surveyor',
                            'Mechanic',
                            'Architect',
                            'Bricklayer',
                            'Agent',
                            'Land Seller'
                          ]"
                        />
                      </div>

                    </div>

                    <!-- STATE + LGA -->
                    <div class="grid grid-cols-2 md:grid-cols-2 gap-5">

                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-slate-700"
                        >
                          State
                        </label>

                        <ProfileSelectText
                          :modelValue="user.location.state"
                          @update:modelValue="onStateChange"
                          placeholder="Select State"
                          :options="stateOptions"
                        />
                      </div>

                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-slate-700"
                        >
                          Local Government
                        </label>

                        <ProfileSelectText
                          v-model="user.location.city"
                          placeholder="Select LGA"
                          :options="lgas"
                        />
                      </div>

                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5" >
 
                   
                        <!-- LANGUAGES -->
                        <div>
                           <label
                            class="block mb-2 text-sm font-medium text-slate-700"
                          >
                            Language Speaking
                          </label>
                          <ProfileLanguage
                            v-model="user.languages"
                          />
                        </div>

                        <!-- EXPERIENCE -->
                        <div>

                          <label
                            class="block mb-2 text-sm font-medium text-slate-700"
                          >
                            Year of Experience
                          </label>

                          <ProfileSelectText
                            v-model="user.yearOfExperience"
                            placeholder="Select Year of Experience"
                            :options="[
                              '0-1 years',
                              '1-3 years',
                              '3-5 years',
                              '5-10 years',
                              '10+ years'
                            ]"
                          />

                          

                        </div>
                     </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-5" >
 
                   
                        <!-- LANGUAGES -->
                        <div>
                           <label
                            class="block mb-2 text-sm font-medium text-slate-700"
                          >
                           Whatsapp Number 
                          </label>
                           <ProfileEditText
                          v-model="user.whatsapp_no"
                          placeholder="Enter whatsapp number"
                        />
                        </div>

                        <!-- EXPERIENCE -->
                        <div>

                          <label
                            class="block mb-2 text-sm font-medium text-slate-700"
                          >
                            Year of Experience
                          </label>

                          <ProfileSelectText
                            v-model="user.yearOfExperience"
                            placeholder="Select Year of Experience"
                            :options="[
                              '0-1 years',
                              '1-3 years',
                              '3-5 years',
                              '5-10 years',
                              '10+ years'
                            ]"
                          />

                          

                        </div>
                     </div>
                     

                  </div>

                </div>

              </div>

              <!-- ABOUT -->
              <ProfileAbout
                v-model="user.about"
                :user="user"
              />

              <!-- SKILLS -->
              <ProfileSkills
                v-model="user.skills"
              />
               <ProfileSocialMedial
                 v-model="user.social_media"
               
              />

              <!-- SAVE -->
              <button
                @click="saveProfile"
                class="px-6 py-2 bg-black text-white rounded-lg"
              >
                {{ loading ? 'Saving...' : 'Save' }}
              </button>

            </div>

          </div>

          <!-- STEP 2 -->
          <div
            v-if="activeSection === 2"
            class="flex justify-center shadow-md w-full h-full py-10 bg-white"
          >

            <div class="w-full max-w-4xl">

              <div
                class="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8"
              >

                <div class="flex items-center justify-between mb-8">

                  <div>
                    <h2 class="text-2xl font-bold text-slate-900">
                      Verification Details
                    </h2>

                    <p class="text-slate-500 mt-2">
                      Click Verify identity to upload your
                      NIN and phone number
                    </p>
                  </div>

                  <div
                    class="hidden md:flex bg-blue-50 px-4 py-2 rounded-full items-center gap-2"
                  >
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>

                    <span class="text-sm font-medium text-blue-700">
                      Step 2
                    </span>
                  </div>

                </div>

                <div class="w-full flex justify-end items-center">

                  <Verifyidentity
                    v-model:isVerify="verification.identity"
                    v-model:isFaceVerify="verification.face"
                  />

                </div>

              </div>

            </div>

          </div>

          <!-- STEP 3 -->
          <div
            v-if="activeSection === 3"
            class="flex justify-center shadow-md w-full h-full py-10 bg-slate-50"
          >

            <div class="w-full max-w-4xl">

              <div
                class="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8"
              >

                <div class="flex items-center justify-between mb-8">

                  <div>

                    <h2 class="text-2xl font-bold text-slate-900">
                      Business Verification
                    </h2>

                    <p class="text-slate-500 mt-2 max-w-2xl leading-relaxed">
                      Verify your business account to increase trust
                      and unlock more professional features.
                    </p>

                  </div>

                  <div
                    class="hidden md:flex bg-blue-50 px-4 py-2 rounded-full items-center gap-2"
                  >
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>

                    <span class="text-sm font-medium text-blue-700">
                      Step 3
                    </span>
                  </div>

                </div>

                <div
                  class="border border-dashed border-slate-300 rounded-3xl p-8 bg-slate-50"
                >

                  <div
                    class="flex flex-col lg:flex-row items-center justify-between gap-6"
                  >

                    <div>

                      <h3 class="text-xl font-bold text-slate-900">
                        Start Business Verification
                      </h3>

                      <p class="text-slate-500 mt-2 max-w-xl">
                        Upload your CAC, business logo,
                        and documents.
                      </p>

                    </div>

                    <div class="shrink-0">

                      <Verifyidentity
                        kycType="business"
                        v-model:isBusinessVerify="verification.business"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </ContainerUser>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  access: 'seller',
  isPrivateRoute : true
})
import {
  ref,
  computed,
  watch,
  onMounted
} from 'vue'

import { useRuntimeConfig } from '#app'
import loadstates from '@/data/nigeria-states.js'

const config = useRuntimeConfig()
const { $toast } = useNuxtApp()

/* =========================================================
   STATE
========================================================= */

const loading = ref(false)
const activeSection = ref(1)

/* =========================================================
   VERIFICATION
========================================================= */

const verification = ref({
  identity: false,
  face: false,
  business: false
})

/* =========================================================
   USER
========================================================= */

const user = ref({
  firstName: '',
  middleName: '',
  lastName: '',
  name: '',

  profile_image: '',

  roles: '',
  role: 'user',

  yearOfExperience: '',

  location: {
    country: 'Nigeria',
    state: '',
    city: '',
    address: ''
  },
  whatsapp_no: '',

  languages: [],
  about: '',
  skills: [],

  company: {
    shopName: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    latitude: null,
    longitude: null
  },
   social_media: {
    tiktok: '',
    facebook: '',
    instagram: '',
    whatsapp: '',
    youtube: '',

  },

  workExperience: [],
  education: [],
  certificates: []
})

/* =========================================================
   STEPS
========================================================= */

const steps = ref([
  {
    key: 1,
    title: 'Personal Information',
    des: 'Basic account details'
  },

  {
    key: 2,
    title: 'Identity Verification',
    des: 'Face & NIN verification'
  },

  {
    key: 3,
    title: 'Business Verification',
    des: 'Company & CAC details'
  }
])

/* =========================================================
   NORMALIZE
========================================================= */

const normalize = (value = '') =>
  value.toString().trim().toLowerCase()

/* =========================================================
   STATE OPTIONS
========================================================= */

const stateOptions = computed(() =>
  loadstates.map(state => state.name)
)

/* =========================================================
   LGAS
========================================================= */

const lgas = computed(() => {

  const currentState =
    user.value.location?.state

  // preserve saved city
  if (!currentState) {

    return user.value.location.city
      ? [user.value.location.city]
      : []
  }

  const selectedState = loadstates.find(
    state =>
      normalize(state.name) ===
      normalize(currentState)
  )

  // preserve city if state not found
  if (!selectedState) {

    return user.value.location.city
      ? [user.value.location.city]
      : []
  }

  return selectedState.lgas || []
})

/* =========================================================
   HANDLE STATE CHANGE
========================================================= */

const onStateChange = (value) => {

  const oldState = user.value.location.state

  user.value.location.state = value

  // reset city ONLY when user changes state
  if (
    oldState &&
    normalize(oldState) !== normalize(value)
  ) {
    user.value.location.city = ''
  }
}

/* =========================================================
   AUTO NAVIGATION
========================================================= */


/* =========================================================
   LOAD PROFILE
========================================================= */

const loadProfile = async () => {

  try {

    loading.value = true

    const res = await fetch(
      `${config.public.api_url}/profile/me`,
      {
        credentials: 'include'
      }
    )

    const data = await res.json()


    if (!data.success) return

    // SAFE MERGE
    user.value = {
      ...user.value,
      ...data.data,

      location: {
        ...user.value.location,
        ...(data.data.location || {})
      },

      company: {
        ...user.value.company,
        ...(data.data.company || {})
      }
    }

    // FULL NAME
    user.value.name = [
      data.data.firstName,
      data.data.lastName
    ]
      .filter(Boolean)
      .join(' ')

    

  } catch (err) {

    console.log(err)

    $toast.error('Failed to load profile')

  } finally {

    loading.value = false
  }
}

/* =========================================================
   LOAD VERIFICATION
========================================================= */

const loadVerification = async () => {

  try {

    const res = await useApiFetch('/kyc', {
      method: 'GET'
    })

    if (!res.success) return

    const data = res.data?.data

    if (!data) return

    verification.value.identity =
      !!data.nin &&
      !!data.phone &&
      !!data.ninImage

    verification.value.face =
      !!data.faceImage

    verification.value.business =
      !!data.business?.name

  } catch (error) {

    console.log(error)
  }
}

/* =========================================================
   SAVE PROFILE
========================================================= */
const generateOgImage = async () => {

  useApiFetch("/profile/upload-og", {
    method: "POST",
    
  })

  // continue immediately (no waiting)
}
const saveProfile = async () => {

  try {

    loading.value = true

    // SPLIT NAME
    if (user.value.name) {

      const names = user.value.name
        .trim()
        .split(' ')

      user.value.firstName = names[0] || ''
      user.value.lastName = names[1] || ''
      user.value.middleName = names[2] || ''
    }

    // REQUEST
    const res = await fetch(
      `${config.public.api_url}/profile/update`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        credentials: 'include',

        body: JSON.stringify({
          details: user.value
        })
      }
    )

    const data = await res.json()

    // console.log('SAVE:', data)
   
    if (!data.success) {

      $toast.error(
        data.message || 'Failed to update'
      )

      return
    }

    $toast.success(
      'Profile updated successfully'
    )
     await generateOgImage()
     await new Promise(resolve => setTimeout(resolve, 6000))
    

    activeSection.value = 2
    
  } catch (error) {

    console.log(error)

    $toast.error('Something went wrong')

  } finally {

    loading.value = false
  }
}

/* =========================================================
   INIT
========================================================= */

onMounted(async () => {

  await Promise.all([
    loadProfile(),
    loadVerification()
  ])
})
</script>