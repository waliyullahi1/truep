<template>
  <footer class="border-t bg-primary text-white border-accent-200 w-full">

    <Container :addTopBottomPadding="false" class="border-t border-accent-200 py-6 sm:flex block items-center justify-between">
    <div class="grid md:grid-cols-4 sm:grid-cols-2  grid-cols-1   gap-4 ">

      <div class="  ">
        <img src="" />
        <p class=" text-[16px] tracking-wide font-bold ">CONTACT INFORMATION</p>
        <div>
          
          <div class="flex mt-4 gap-4">
            <img src="@/assets/images/call.svg" class="w-3" />
             <p class=" text-[15px]"> 090232345678</p>
          </div>

          <div class="flex mt-4 gap-4">
            <img src="@/assets/images/message.svg" class="w-5" />
             <p class=" text-[15px] font-bold"> info@unilorin.com</p>
          </div>

          <div class="flex mt-4 gap-4">
            <img src="@/assets/images/location.svg" class="w-4" />
             <p class=" text-[14px] "> Km 12, Ilorin  Expressway, Ilroin, Kwara.</p>
          </div>

        </div>
      </div>

      <div class="  ">
        
        <p class=" text-[16px] tracking-wide font-bold ">ADMISSIONS</p>
        <div>
          
          <div class="flex mt-4 gap-4">
             <p class=" text-[15px]"> Enquiries can be made from Monday to Friday between the hours of 8am to 5pm. Excluding public holidays.</p>
          </div>

          <div class="flex mt-4 gap-1">
            <img src="@/assets/images/message.svg" class="w-5" />
             <p class=" text-[15px] font-bold"> info@uniilorin.com</p>
          </div>

          

        </div>
      </div>

      <div class="   ">
        
        <p class=" text-[16px] tracking-wide font-bold ">ABOUT US</p>
        <div class="mt-4 space-y-2">
          
          <div class="flex gap-4">
             <p class=" text-[13px]"> FACILITIES</p>
          </div>
          <div class="flex gap-4"> 
             <p class=" text-[13px]">  VISION & MISSION</p>
          </div>
          <div class="flex  gap-4"> 
             <p class=" text-[13px]">  CORE VALUES</p>
          </div>
           <div class="flex4 gap-4"> 
             <p class=" text-[13px]">  LEADERSHIP</p>
          </div>
           <div class="flex  gap-4"> 
             <p class=" text-[13px]">  FAQs</p>
          </div>
          
        
        </div>
      </div>

       <div class="  ">
        
        <p class=" text-[16px] tracking-wide font-bold ">ACADEMICS</p>
        <div class="mt-4 space-y-2">
          
          <div class="flex gap-4">
             <p class=" text-[14px]"> Curriculum</p>
          </div>
          <div class="flex gap-4"> 
             <p class=" text-[14px]"> Library</p>
          </div>
          
           <div class="flex4 gap-4"> 
             <p class=" text-[14px]">  Clubs</p>
          </div>
           <div class="flex  gap-4"> 
             <p class=" text-[14px]">  Electives</p>
          </div>
          
        
        </div>
      </div>



      <div>

      </div>
       <!-- <NavigationLogo class="" />
      <UiTypographyP><span class=" sm:text-base font-medium text-sm">&copy;{{ new Date().getFullYear() }} {{ projectName }}. All rights reserved.</span></UiTypographyP> -->

    </div>
         </Container>
  </footer>
</template>

<script setup>
// Get the public runtime config so project name can be used across components
const config = useRuntimeConfig()
const projectName = config.public.projectName
</script>