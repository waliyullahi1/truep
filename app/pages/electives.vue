<template>
    <div class=" bg-primary">
        <!-- Hero section contact us -->
        <section class=" bg-[url('/images/gallary9.jpg')]  bg-cover bg-no-repeat bg-center  ">
            <div class="bg-black/70 pb-10 pt-20 ">
                <Container class="">
                    <div class="md:w-1/2 text-white">
                       <!-- <img src="@/assets/images/4T2A1549.png" alt="4T2A1549" srcset=""> -->
                        <div class=" py-2">
                            <UiTypographyH1 color="white">
                                <span class="  font-bold">Electives</span>
                            </UiTypographyH1>
                        </div>
                       
                       

                    </div>
                </Container>
            </div>

        </section>

        <!-- List all the contact details here -->
        <section class=" ">
            <Container>
                <div
                    class=" bg-white md:p-10 p-2 ">
                   <div class=" bg-[url(@/assets/images/sport2-3-scaled.jpg)] w-full mb-4  bg-center bg-cover h-96" ></div>
                   <h2 class="  text-primary  font-bold text-2xl md:text-4xl">Electives</h2>
                   <div class=" bg-secondary  w-1/3 h-1  mt-6"> </div>
                   
                   <div class=" mt-10">
                   
                    <UiTypographyP class="mt-4 w-full tracking-wide md:text-lg ">We offer various electives to ensure that our curriculum is rich and well grounded to make our pupils both academically and socially sound. 
                       
                        </UiTypographyP>
                   </div>
                   
                   <div class=" mt-10">
                    <h2 class="  text-primary  font-bold text-xl  tracking-wider md:text-3xl italic"><span class=" ">Our electives include:</span></h2>
                    
                   </div>

                   
                   <div class=" mt-10">
                    <UiTypographyP class="mt-4 w-full tracking-wide md:w-3/5">
                        <ul class="list-disc list-inside text-lg space-y-1">
                            <li>Ballet</li>
                            <li>Story Time </li>
                            <li>Art & Craft</li>
                            <li>Science Club</li>
                            <li>Dance Club</li>
                            <li>Local Languages </li>
                            <li>Robotics </li>
                             <li>Chess Club </li>
                              <li>Basketball  </li>
                               <li>Football Academy </li>
                                <li>Swimming Club </li>
                                 <li>Microsoft Academy </li>
                                  <li>Music </li>
                        </ul>
                    </UiTypographyP>
                   </div>

                   
                 

                   
                   

                   
                   

                   
                  


                   <div class=" mt-10  p-10  flex flex-col justify-center items-center text-white w-full  bg-primary p">
                        <UiTypographyH2 class=" text-white text-center">Enrol your child today</UiTypographyH2>
                       <div class=" h-0.5 w-20  mb-7 mt-3 bg-white"> </div> 

                        <NuxtLink to="/warning" class=" bg-white px-4 rounded-full py-2 cursor-pointer  font-medium hover:bg-secondary hover:text-white duration-300 text-black ">Apply Now</NuxtLink>
                   </div>
                 </div>
            </Container>
        </section>

        


    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFormStore } from '@/stores/formStore'
import { useRouter } from 'vue-router'

const formStore = useFormStore()
const form = formStore.form
const isLoading = ref(false)
const router = useRouter()

// SAVE FORM ON SUBMIT


</script>
