<template>
  <div class="min-h-screen bg-slate-50 py-4">
    <ContainerUser>
      <div class=" gap-8">
        <div class=" bg-white fle flex-col justify-center w-full h-full py-7  rounded-2xl">
            <UiTypographyH3 class=" text-center">Review your new profile</UiTypographyH3>
            <UiTypographyP class=" text-center mt-2">Add missing details to complete your profile. You can update it at any time.</UiTypographyP>

            <div class="  flex justify-center  shadow-md w-full h-full py-10  bg-white">
               <div class=" bg-950  mt-9 w-[70%]">
                <div class=" w-full g flex items-center ">
                    <div class=" flex items-end ">
                         <img src="/image/icon/avatar.svg" alt="">
                         <div class=" w-8 h-8  rounded-full relative flex justify-center items-center  right-9 bg-white border">
                            <img src="/image/icon/cameral.svg" class=" # " alt="">
                         </div>
                         
                    </div>
                    <div class=" relative right-3 space-y-1">
                        <div class=" flex items-center  gap-1">
                            <h3 class="font-semibold text-lg">Habeeb Waliyullahi </h3>
                            <button class=" w-6 h-5 "><img src="/image/icon/edit.svg" class=" w-3" alt=""></button>
                        </div>
                        <div class=" flex items-center  gap-1">
                            <h4 class=" text-md font-medium ">Software Engineer </h4>
                            <button class=" w-6 h-5 "><img src="/image/icon/edit.svg" class=" w-3" alt=""></button>
                        </div>

                        <div class=" pt-3 flex items-center  gap-4 ">
                            <div class=" flex gap-1">
                                <img src="/image/icon/location2.svg"/>
                                <h4 class=" text-sm  font-medium ">Nigeria</h4>
                            </div>
                             <div class="  flex gap-1">
                                <img src="/image/icon/message1.svg"/>
                                <h4 class=" text-sm  font-medium ">Speaks English, French, Yoruba</h4>
                                <img src="/image/icon/edit.svg" class=" w-3" alt="">
                            </div>
                            
                            
                        </div>
                      
                       
                    </div>
                    
                </div>




                <div class=" mt-12  p-5 rounded-xl border border-gray-300 ">
                    <h3 class="font-semibold text-xl">About  </h3> 
                    <p class=" text- mt-3">I am a Software Engineer with over six years of experience in full-stack development and leading product cycle from conception to completion. I guided a team of 5–15 members through 5+ product launches at a recent experience in a high growth technology startup.</p> 
                </div>

                <!-- <div class=" mt-12  p-5 rounded-xl border border-gray-300 ">
                    <h3 class="font-semibold text-xl">Skills and expertise  </h3> 
                    <div class=" mt-4">
                        <button class=" flex gap-3 border rounded-lg text-sm  font-medium  px-4 py-2 ">
                           <img src="/image/icon/plus.svg"/> Add new
                        </button>
                    </div>

                     <div class="  grid grid-cols-3 gap-5 mt-4">
                        <div v-for="item in 7" class=" justify-between items-center flex gap-3 border border-gray-300 rounded-lg text-sm  font-medium  px-4 py-2 ">
                           <div class=" space-y-3">
                              <h3>CSS</h3>
                               <p>Intermidiary</p>
                           </div>

                           <button class=" flex  gap-0.5"> 
                            <div v-for="item in 3" class=" bg-black  w-1 h-1  rounded-full "></div>
                           </button>
                        </div>
                    </div>
                 </div> -->
                 <ProfileSkills/>
                 <!-- <div class=" mt-12 flex justify-between   p-5 rounded-xl border border-gray-300 ">
                    <div>
                      <h3 class="font-semibold text-xl">Work experience  </h3> 
                       <p class=" text-sm te text-gray-600 m3">Add your job history and achievements to give clients insight into your expertise.</p> 
                        <button class=" mt-5 flex gap-3 border rounded-lg text-sm  font-medium  px-4 py-2 ">
                           <img src="/image/icon/plus.svg"/> Add new
                        </button> 

                    </div>
                    <div>
                        <img  src="/image/icon/work_experience_entry.svg"/>
                    </div>
                    
                </div> -->
                <ProfileWorkexperience/>
                <div class=" flex gap-4">
                       
                    <ProfileEducation/>
                   <profileCertificate/>
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
  layout: 'auth'
})

import { ref } from 'vue'






</script>
