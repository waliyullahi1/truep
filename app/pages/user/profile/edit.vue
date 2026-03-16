<template>
  <div class="min-h-screen bg-slate-50 py-4">
    <ContainerUser>
      <div class=" gap-8">
        <div class=" bg-white fle flex-col justify-center w-full h-full py-7  rounded-2xl">
            <UiTypographyH3 class=" text-center">Update Your Information Profile</UiTypographyH3>
            <UiTypographyP class=" text-center mt-2">Add missing details to complete your profile. You can update it at any time.</UiTypographyP>

            <div class="  flex justify-center  shadow-md w-full h-full py-10  bg-white">
               <div class=" bg-950  mt-9 w-[70%]">
                <div class=" w-full gap-4 flex items-center ">
                
                    <div class=" flex items-end ">
                          <ProfileImage v-model="user.profile_image" />
                         
                    </div>
                    <div class=" relative right- space-y-1">
                        <ProfileEditText v-model="user.name"  placeholder="Add Full Name"/>
                        
                        <ProfileSelectText
                              v-model="user.title"
                              placeholder="Add role"
                              :options="[
                                'Software Engineer',
                                'Surveyor',
                                'Mechanic',
                                'Architect',
                                'Bricklayer',
                                'Agent',
                                'Land Seller'
                              ]"
                            />
                        

                        <div class=" pt-3 flex items-center  gap-4 ">
                            <div class=" flex gap-1">
                                <img src="/image/icon/location2.svg"/>
                                <h4 class=" text-sm  font-medium ">Nigeria</h4>
                            </div>
                            <ProfileLanguage v-model="user.languages"/>
                                                        
                            
                        </div>
                      
                       
                    </div>
                    
                </div>




                <ProfileAbout v-model="user.about" />
                 <ProfileSkills v-model="user.skills"/>
                
                <ProfileWorkexperience v-model="user.workExperience"/>
                <div class="  gap-4">
                       
                    <ProfileEducation  v-model="user.education"/>
                   <profileCertificate v-model="user.certificates"/> 
                </div>
                
                   <button @click="saveProfile" class=" px-6 py-2 bg-black text-white rounded-lg">
                          Save
                      </button>
                



               </div> 
            </div>
        </div>
      </div>
    </ContainerUser>
  </div>
</template>



<script setup>
definePageMeta({
  layout: 'auth'
})

import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const { $toast } = useNuxtApp()

const loading = ref(false)

const user = ref({
  name: '',
  profile_image: '',
  title: null,
  location: {
    country: 'Nigeria',
    state: '',
    city: '',
    address: ''
  },
  languages: [],
  about: '',
  skills: [],
  workExperience: [],
  education: [],
  certificates: []
})

/* =========================
LOAD EXISTING PROFILE
========================= */

onMounted(async () => {
  try {
    const res = await fetch(`${config.public.api_url}/profile/me`, {
      credentials: 'include'
    })

    const data = await res.json()
  console.log(data);
  
    if (data.success) {
      user.value = data.data
      console.log('user', user.value);
      user.name = `${data.firstName} ${data.lastName}`
    }

  } catch (err) {
    console.error(err)
  }
})

/* =========================
SAVE PROFILE
========================= */

async function saveProfile() {
  loading.value = true
  // if(user.value.tittle === null){
  //   user.value.title.remove('tittle') ''
  // }
   if(user.name){
    user.lastName = user.value.name.split(' ')[0]
    user.firstName = user.value.name.split(' ')[1]
    user.middleName = user.value.name.split(' ')[2] || ''
   }
   console.log(user.value.languages, 'sssss');
   
  try {

    const res = await fetch(`${config.public.api_url}/profile/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
       details: user.value
      })
    })

    const data = await res.json()

    if (data.success) {
      $toast.success("Profile updated successfully")
    } else {
      $toast.error(data.message)
    }

  } catch (error) {
    console.error(error)
    $toast.error("Something went wrong")
  }

  loading.value = false
}
</script>
