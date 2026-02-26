<template>
  <div class=" overflow-x-hidden bg-[#FEFEFE]">
    
    <!-- <UiTypographyH1 color="secondary" class="text-center pt-28 mb-1">United States</UiTypographyH1> -->
    <header class="mt-0 ]    pt-60 hero-section">
      <Container :addTopBottomPadding="false" class="text-white  h-full flex sm:items-end items-center pb-4">
        <div class="lg:w-[70%] space-y-11 md:w-4/5 w-full h-fit">

          <div class="space-y-  s py-2">

           
             <div class="  relative z-10  mt-5     flex j items-center  w-full h-24">
              <p class=" text-white  py- font-inter l   px-2 lg:text-5xl/tight md:text-3xl/tight text-xl/tight sm:text-2xl/tight">
             Connecting you with trusted <br>
land & building professionals 
              </p>
              
            </div>

            
          </div>

      

          
          <div class=" flex justify-center items-center mt-20">
            <input type="text" name="" class=" outline-none rounded-lg  text-black px-4 w-full  bg-white  h-14" id="">
            <div class=" w-fit  ">
              <div class="  relative right-[3rem]  flex justify-center items-center   bg p-2 rounded-lg ">
                <div class="  h-5 w-0.5  focus:border-none outline-none bg-black "></div>
               <select     class=" h-full p-4  text-black *:e shadow-sm border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 focus:shadow-none">
                  
                  <option value="service">Services</option>
                  <option value="property">Properties</option>
                  <option value="profile">Workers</option>
               </select>
               <!-- <img src="@/assets/images/icons/search.svg" alt="" class=" w-4   text-white" srcset=""> -->
             </div>
            </div>
            
          </div>
          <div class=" flex-wrap flex gap-4  ">
             <button  v-for="item in workandservice" class=" flex  bg-white/20 rounded-md gap-4  border  py-2 px-4 border-white text-white ">
            <span>{{item}} </span> <img src="@/assets/images/icons/arrow_right.svg" alt="" srcset="">
          </button>
          </div>
          <div class=" flex w-full  gap-5 ">
            <UiTypographyP class=" whitespace-nowrap">Trusted by:</UiTypographyP>
            <div class=" flex  lg:w-[70%]  pb-10 justify-between items-center">
               <img v-for="value in trustedByLogos" :src="`/image/icon/${value}`" class=" w-16" />
            </div>
          </div>
         
          <!-- <div class="pt-4 sm:flex block sm:space-y-0 space-y-4 sm:space-x-4 hero-fade-up delay-4">
            <UiButtonsPrimary @click="openform">
              <span>Apply Now</span>
            </UiButtonsPrimary>

           
          </div> -->

        </div>
      </Container>
    </header>

      <CategorySlider />
    <!-- // recent property -->
  

    



    
    <!-- hidden this section (what are will do) -->
    
    <!-- recent service and post -->
          <!-- <CategorySlider /> -->
    
    <!-- Simple Process Steps  details here -->
    <section class="   0 reason-choose-us ">
      <Container>
        <div class="   gap-5 ">
         <UiTypographyH2 class=" ">
  <span class="text-5xl leading-snug font-medium">
    Recently  Properties
  </span>
</UiTypographyH2>

<UiTypographyP class="w-1/2 mt-2 mb-7 ">
  By default, we use your location to show properties around you.  
  You can also change your location to explore listings in other areas.
</UiTypographyP>


          

          <div class=" ">
             <PropertyList class=" mt-1" ></PropertyList>
          </div>

        </div>
      </Container>
    </section>

    <!-- You can collect your fund back    -->
    <section >
      <Container>
        <div class="  items-center rounded-lg flex bg-/50 ">
            <div class=" px-3">
              <UiTypographyH2 class="">
              <span class="text-3xl    font-medium">
             <span class=" w-2/5 font-semibold">High-quality work,</span>  <br> or your money back
              </span>
            </UiTypographyH2>
            <UiTypographyP class=" mt-5">
              On Fiverr Pro, you can bring your vision to life risk-free. Every project with vetted Pro freelancers is backed by our money-back guarantee, so you can accomplish any high-stakes project with total confidence.
            </UiTypographyP>
              
            </div>
            <div>
              <img src="/images/civil-servants.jpg" alt="" srcset="">
            </div>
        </div>
      </Container>
    </section>

    <section class="   0 reason-choose-us ">
      <Container>
        <div class="   gap-5 ">
          <UiTypographyH2 class="">
              <span class="text-5xl leading-snug  font-medium">
               Past Projects
              </span>
            </UiTypographyH2>
          <div>

          </div>
          
            <UiTypographyP class="w-1/2 mt-2  ">
   Discover high-quality projects and services successfully delivered by our verified professionals to satisfied clients.
</UiTypographyP> 
          <div>
               
    <Masonry></Masonry>
 
          </div>

        </div>
      </Container>
    </section>
    
    <!-- What You Can Do -->
    <section class="  bg-gray-100">
     <Container>
      <div>
        <UiTypographyH3>
         
          <span class="text-5xl leading-snug  font-medium">
               What You Can Do
              </span>
        </UiTypographyH3>

        <div class="mt-6 flex  justify-center">
          <div  class=" grid w-[80%] grid-cols-3  gap-4">
            <div  v-for="value in whatyoucando"  class=" bg-white cursor-pointer px-2 py-4 w-full h-full shadow-md flex gap-3 items-center ">
              <img :src="`/image/icon/${value.image}`" alt="" srcset="">
              <UiTypographyP>{{ value.title }}</UiTypographyP>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center mt-10">
           <UiButtonsPrimary>Learn More</UiButtonsPrimary>
        </div>
       
      </div>
     </Container>
     
    </section>
      <section class="  bg-slate-50 ">
     <Container>
      <div>
        <UiTypographyH3>
         
          <span class="text-4xl leading-snug  font-medium">
              Customers are saying
              </span>
        </UiTypographyH3>
        <UiTypographyP class=" w-1/2 mt-2">
          Hear from tenants, landlords, and agents who've made renting, listing, and managing property easier with our platform.
        </UiTypographyP>

        <Review></Review>
      </div>
     </Container>

    </section>   
 





   


    


       
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from '~/components/Form/Button.vue'

definePageMeta({
  layout: 'main'
}) 

const config = useRuntimeConfig()
const projectName = config.public.projectName
const router = useRouter()

const openChat = () => {

}
const openform = () => {
  
  
  router.push('/warning')
}
 const workandservice = ref([
  'Architecture & Interior Design', 'Survey', 'Land Agent', ' Bryclayer', 'etc'
 ])

const whatyoucando = ref([
   {
    id: 1,
    title: 'Discover verified properties in  Nigeria',
    image: 'survey.svg',
  },
  {
    id: 2,
    title: 'Sign digital lease agreements',
    image: 'arch.svg'
  },
   {
    id: 2,
    title: 'Use our location System to measure your land   for sell ',
    image: 'arch.svg'
  },
     {
    id: 2,
    title: 'Use our location System to measure your land   for sell ',
    image: 'arch.svg'
  },
       {
    id: 2,
    title: 'use  our map system to find land seller, agent, and works  ',
    image: 'arch.svg'
  },
         {
    id: 2,
    title: 'Save all your proprty with us  using  our map system',
    image: 'arch.svg'
  }, 
           {
    id: 2,
    title: 'Save all your proprty with us  using  our map system',
    image: 'arch.svg'
  }, 
   {
    id: 3,
    title: 'Secure rent payments & transaction history',
    image: 'arch.svg'
  },

    {
    id: 4,
    title: 'List and market your property easily',
    image: 'arch.svg'
  },
      {
    id: 5,
    title: 'Become a sub-agent',
    image: 'arch.svg'
  },
        {
    id: 5,
    title: 'List and market your property easily',
    image: 'arch.svg'
  },

])

const trustedByLogos = ref([
  
  'google.svg',
  'meta.svg',
  'netflix.svg',
  'paynoor.svg',
  'p&q.svg',
])

const serviceoffer = ref([
  
 { 
  title:'Land Seller',
  image: 'landlord.svg'

 },
  
 { 
  title:'Agent land/rent', 
  image: 'survey.svg'

 },
  { 
  title:'Surveyor', 
  image: 'survey.svg'

 },
   { 
  title:'Arctechecture', 
  image: 'arch.svg'

 },
 { 
  title:'Landlord', 
  image: 'landlord.svg'

 },
 
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