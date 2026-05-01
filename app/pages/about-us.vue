<template>
  <div class=" overflow-x-hidden bg-[#FEFEFE]">
    
    <!-- <UiTypographyH1 color="secondary" class="text-center pt-28 mb-1">United States</UiTypographyH1> -->
     <div class=" mt-20">
    <Container class="  ">
        <div class=" ">
            <div class=" flex flex-col text-secondary  justify-center items-center">
                <UiTypographyH1 class=" text-secondary font-semibold py- font-inter px-2 lg:text-3xl md:text-3xl/tight text-xl/tight sm:text-2xl/tight">
                Simple, Stress-Free, and Trusted Property Solutions
              </UiTypographyH1>

              <UiTypographyP class="py-4">
                <span class="text-lg">
                  At Abanise, we make buying, renting, and managing properties easy and hassle-free.
                </span>
              </UiTypographyP>
              <UiButtonsPrimary>
                <NuxtLink to="/auth?type=register-page" >Create profile</NuxtLink>
              </UiButtonsPrimary>
            </div>
        </div>
    </Container>
    </div>
     


    
    <!-- Simple Process Steps  details here -->
   
    
    

    <!-- You can collect your fund back    -->
    <section >
      <Container :addTopBottomPadding="false">
      <Count_up></Count_up> 

      <div class=" flex justify-center ">
        <img src="@/assets/images/woman-phone.webp" loading="lazy" class=" w-full sm:w-1/2" alt=" woman with phone"  srcset="">
      </div>
      <h2 class="  text-center text-2xl  text-gray-400 font-medium">FIND OUT WHO WE ARE </h2>
      <div class="  text-gray-400 text-center font-semibold rotate-90 text-4xl">></div>
             
       
      </Container>
    </section>


    <section >
      <Container >
        <div class="  mb-28  space-y-2">
          <UiTypographyH2  class=" text-primary text-center  font-medium "> <span class=" text-xl sm:text-4xl">Discover new and affordable property</span> </UiTypographyH2>
            <UiTypographyH3 class=" text-center"> <span class=" font-semibold mt-6 text-md sm:text-2xl">From hundreds of websites – all in one place!</span></UiTypographyH3> 

        </div>
        
          <div class="relative space-y-20 mx-auto w-[80%]">
  
            <!-- CENTER DIVIDER -->
            <div class="absolute hidden   inset-0 py-20 md:flex ir justify-center pointer-events-none">
              <img
                src="@/assets/images/divider.webp"
                class=" max-w-xs"
              />
            </div>

            <!-- CONTENT -->
            <div
              v-for="(value, index) in services"
              :key="index"
              class="grid grid-cols-1  space-y-11 md:grid-cols-2 items-center md:gap-20 gap-4 mt-10 relative z-10"
            >
              
              <!-- TEXT -->
              <div :class="index % 2 !== 0 ? '' : 'md:order-2 or order-none'">
                <div class="space-y-1">
                  <div class=" flex md:hidden   gap-3 items-center"><div class="   flex justify-center items-center  font-semibold h-9 w-9 rounded-full  bg-secondary text-white">{{value.id}}</div>{{value.title}}</div>
                  <UiTypographyP> {{value.descri}}</UiTypographyP>
                </div>
              </div>

              <!-- IMAGE -->
              <div
                class="w-full flex"
                :class="index % 2 !== 0 ? 'md:order-1  justify-center  md:justify-start' : ' justify-center md:justify-end'"
              >
                <img
                  :src="`/image${value.img}`"
                  class="max-w-full h-auto"
                />
              </div>

            </div>
          </div>
      
      </Container>
    </section>


    <section >
      <Container >
          <div class="  flex justify-end items-end ">
            <img src="@/assets/images/icons/starts.svg" />
          </div>
          <UiTypographyH2  class=" text-primary text-center  font-medium "> <span class=" text-xl sm:text-3xl">Maximise Your Chances: Stay Ahead of the Market.</span> </UiTypographyH2>
            <div class=" py-5 flex justify-center ">
              <UiTypographyP class=" w-full md:w-1/2 text-center"><span class=" text-md">Never miss your dream rental. Create a free Search Agent for instant email notifications on new matching listings, ensuring you’re always first to know.</span></UiTypographyP> 
            </div>



      <div class=" flex items-center gap-7  justify-center r ">
         <img src="@/assets/images/icons/circle_plus.svg" loading="lazy" class="   w-12 2" alt=" woman with phone"  srcset=""/>
        <div>
          <UiButtonsPrimary  class="  font-medium">
             <NuxtLink to="/auth?type=register-page">Become A agent</NuxtLink>
          </UiButtonsPrimary>
        </div>
       
      </div>
      
             
       
      </Container>
    </section>

 


    <section class="    0 reason-choose-us ">
      <Container>
        <div class="   gap-5 ">
           <UiTypographyH2  class=" text-primary text-center  font-medium "> <span class=" text-xl sm:text-3xl">With Abanise, You’re Guaranteed:</span> </UiTypographyH2>
            

          <div class=" mt-4 md:grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-5   ">
           
                <div  v-for="value in who_is_this_for"  class=" space-y-3 rounded-md bg-white cursor-pointer px-2 sm:px-4 py-4 w-full h-full   gap-3 items-center ">
                  <div class=" w-full flex justify-center items-center">
                     <div class="bg-[#f9f9f9] rounded-full w-fit h-fit p-3">
                        <img :src="`/image/icon/${value.image}`" class=" w-10" alt="" srcset="">
                     </div>
                  </div>
                 
                  <UiTypographyH3 class=" text-center">{{value.title}}</UiTypographyH3>
                  <UiTypographyP class=" text-center text-gray-700">{{value.description}}</UiTypographyP>
                </div>
             
           
          </div>
        </div>
      </Container>
    </section>

      <section class="sm:py-10 py-5" >
      <Container >
          
          <UiTypographyH2  class=" text-primary text-center  font-medium "> <span class=" text-xl sm:text-3xl">Who We Are</span> </UiTypographyH2>
            <Aboutus></Aboutus>



      
      
             
       
      </Container>
    </section>

    <section class=" sm:py-10  py-5   0 reason-choose-us ">
      <Container>
        <div class="   gap-5 ">
           <UiTypographyH2  class=" text-primary text-center  font-medium "> <span class=" font-semibold text-2xl sm:text-4xl">Abanise in Numbers</span> </UiTypographyH2>
            

          <div class="  mt-4 md:grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-5   ">
           
                <div  v-for="value in numbers"  class=" space-y-3 rounded-md bg-white cursor-pointer px-2 sm:px-4 py-4 w-full h-full   gap-3 items-center ">
                  <UiTypographyH3 class=" text-center"><span class=" text-secondary font-semibold text-5xl sm:text-8xl">{{value.title}}</span></UiTypographyH3>
                  <UiTypographyP class=" text-center text-lg text-secondary"><span class=" text-xl  md:text-2xl">{{value.descri}}</span></UiTypographyP>
                </div>
             
           
          </div>
        </div>
      </Container>
    </section>


    <section >
      <Container >
          <div class="  flex justify-end items-end ">
            <img src="@/assets/images/icons/wire_circle.svg" />
          </div>
          <UiTypographyH2  class=" text-primary text-center  font-medium "> <span class=" text-xl sm:text-3xl">Are You a Landlord or an Agency? See How We Can Work Together!</span> </UiTypographyH2>
            <div class=" py-5 flex justify-center ">
              <UiTypographyP class=" w-full md:w-2/3 text-center"><span class="  text-md md:text-xl">If you’re a landlord or agency, Rentola can help you reach a larger audience and fill your vacancies faster. Find out how easy it is to add your properties and connect with trusted tenants.</span></UiTypographyP> 
            </div>



      <div class=" flex items-center gap-7  justify-center r ">
         <img src="@/assets/images/icons/starts.svg" loading="lazy" class="  left-0 right-0   w-12 2" alt=" woman with phone"  srcset=""/>
        <div>
          <UiButtonsPrimary  class="  font-medium">
             <NuxtLink to="/auth?type=register-page">Work with us!</NuxtLink> 
          </UiButtonsPrimary>
        </div>
       
      </div>
      
             
       
      </Container>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main'
}) 
import { useRouter } from 'vue-router'
import Count_up from '~/components/Count_up.vue'
import Button from '~/components/Form/Button.vue'

const config = useRuntimeConfig()
const projectName = config.public.projectName
const router = useRouter()

const openChat = () => {

}

const services = ref([
  {
    id:1,
    title: 'We collect 1510433 listings from the entire internet, just for you',
    descri: 'We use smart technology to gather rental listings from thousands of trusted property websites across the whole world in real-time. This means you get access to thousands of rental options without having to visit each site individually',
    img : "/data-collect.webp"
  },

    {
    id:2,
    title: 'Browse all listings in one place',
    descri: 'Once we gather the listings, we present them on our Search Page. You’ll only see the most relevant, verified properties, and you can use filters to refine your search to match your exact needs.',
    img : "/phones.webp"
  },

    {
    id:3,
    title: 'Contact landlords directly',
    descri: 'If you find a property you like, you can contact landlords directly. We made this process as smooth and convenient as possible.',
     img : "/search-map.webp"
  }
])

const numbers = ref([
  {
    id:1,
    title: '1m',
    descri: 'We helped 1m user to find a new home',
    img : "/data-collect.webp"
  },

    {
    id:1,
    title: '32m',
    descri: 'We hosted 32m properties for rent',
    img : "/data-collect.webp"
  },
    {
    id:1,
    title: '30',
    descri: 'We have 20 years of experience',
    img : "/data-collect.webp"
  },

  
])

const who_is_this_for = ref([
  { 
    image: 'big_verify.svg',
    title: 'Verified Listings',
    description: 'We ensure you see only accurate and up-to-date properties. Our dedicated team rigorously reviews reported listings and cross-references data from thousands of sources daily, guaranteeing the highest possible accuracy.'
  },
  { 
    image: 'big-plus.svg',
    title: 'Safety and Transparency',
    description: 'Your peace of mind is our priority. We are committed to fostering a secure and trustworthy environment through clear communication, protecting your data, and maintaining honest processes throughout your rental journey.'
  },
  { 
    image: 'earth.svg',
    title: 'Global Reach',
    description: 'Discover your next home, anywhere in the world. With Rentola, you gain access to a truly global selection, spanning 36 countries and featuring over 1 million properties. We make finding your next home simple, no matter where you are.'
  }
])
</script>

<style>
header {
  background: linear-gradient(rgba(31, 31, 31, 0.838), rgba(41, 41, 41, 0.7)), url('/images/hero.jpg');
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}



.cta {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/unilorin_gate.jpg');
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
}

.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #b78d46;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #9e7636;
}
</style>