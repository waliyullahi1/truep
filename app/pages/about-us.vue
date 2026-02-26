<template>
  <div class=" overflow-x-hidden bg-[#FEFEFE]">
    
    <!-- <UiTypographyH1 color="secondary" class="text-center pt-28 mb-1">United States</UiTypographyH1> -->
     <div class=" mt-20">
    <Container class="  ">
        <div class="  rounded-lg h-[25rem] bg-[url('/images/civil-servants.jpg')]  w-full bg-slate-800">
            <div class="bg-gradient-to-r space-y-5 flex justify-center flex-col p-8 from-black/80 to-transparent  h-full">
            <h1 class=" text -white     font-semibold  py- font-inter l   px-2 lg:text-6xl md:text-3xl/tight text-xl/tight sm:text-2xl/tight">
            About Us <br>  
            </h1>

              <UiTypographyP class=" w-1/2 text-2xl text-white"><span class="text-lg">Find the right work for you, with great clients, at the world’s work marketplace.</span></UiTypographyP>
              <UiButtonsPrimary>Create profile</UiButtonsPrimary>
            </div>
        </div>
    </Container>
    </div>
     


    
    <!-- Simple Process Steps  details here -->
   
    
    

    <!-- You can collect your fund back    -->
    <section >
      <Container>
       
             
        <div class=" mt-16 r justify-center items-center rounded-lg flex bg-/50 ">
            <div class=" w-1/2 px-3">
               
             <UiTypographyH2 class=" ">
           <span class="text-5xl  font-medium">
          WHO WE ARE
         </span>
         
         </UiTypographyH2>

                <div class=" mt-5"> 
                     <UiButtonsTertiary class=" mt-5">Find Work</UiButtonsTertiary>  
                    </div>
                   
            </div>
            <div class=" w-1/2  flex rounded-md overflow-hidden">
              <img src="/image/indro.jpg" alt="" srcset="">
            </div>
        </div>
      </Container>
    </section>


        <section >
      <Container>
         <UiTypographyH3 class=" ">
               <span class="text-4xl leading-snug font-medium">
                Explore the different ways to earn
               </span>
               </UiTypographyH3>
             
        <div class=" mt-16 r justify-center items-center rounded-lg flex bg-/50 ">
             <div class=" w-1/2  flex rounded-md overflow-hidden">
              <img src="/image/second-how.avif" alt="" srcset="">
            </div>
            <div class=" w-1/2 px-3">
        <div>      
            <UiTypographyH2 class=" "><span class="text-2xl  font-medium">How payments work</span></UiTypographyH2>
            <UiTypographyP class=" mt-1">Whether you’re paid hourly or on a fixed-price contract, all the work you complete comes with payment protection.</UiTypographyP>
        </div>

        <div>      
            <UiTypographyH2 class=" "><span class="text-2xl  font-medium">All in one place</span></UiTypographyH2>
            <UiTypographyP class=" mt-1">Invoice clients and track your earnings on Upwork for a simple and streamlined process..</UiTypographyP>
        </div>
        <div>      
            <UiTypographyH2 class=" "><span class="text-2xl  font-medium">Choose how you get paid</span></UiTypographyH2>
            <UiTypographyP class=" mt-1">Use what works best for you—including direct deposit, PayPal, Payoneer, wire transfer, and more.</UiTypographyP>
        </div>
          <div class=" mt-4">      
            <UiTypographyH2 class=" "><span class="text-2xl  font-medium">No fees until you complete your work</span></UiTypographyH2>
            <UiTypographyP class=" mt-1">You’ll pay a 10% freelancer service fee on what you earn on Upwork.</UiTypographyP>
        </div>
        <UiButtonsSecondary class=" mt-7">Learn more about service fees</UiButtonsSecondary> 
                   
            </div>
           
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

const howitwork = ref([
   {
    id: 1,
    title: 'Create your profile (it’s free)',
    desc : 'An eye-catching title and client-focused overview help us match you to the work you want. Include your work history, your skills, and your photo. Add more, like an introduction video, to create a profile that really stands out.',
    image: 'note.svg',
  },
     {
    id: 2,
    title: 'Explore ways to earn',
    desc : 'Work and earn in different ways. Bid for jobs. Pitch your projects. Discuss your in-demand skills with our recruiters so they can find opportunities aligned with your passions and career goals. Do all three. Create a predictable pipeline and build your network.',
     image: 'note_search.svg',
  },
  {
    id: 3,
    title: 'Get paid securely',
    desc: 'Choose how you get paid. Our fixed-price protection releases client payments at project milestones. Hourly protection bills clients every week. However you work, our service fees are the same. Spend less time chasing, more earning.',
    image: 'security.svg',
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