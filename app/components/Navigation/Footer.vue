<template>
  <footer class="border-t bg-primary text-white border-accent-200 w-full">

    <Container :addTopBottomPadding="false" class="border-t border-accent-200 py-6 sm:flex block items-center justify-between">
    <div class="sm:grid md:flex sm:grid-cols-2  w-full  grid-cols-1  justify-between   gap-4 ">

      <div to="/search"  class="  ">
        <img src="" />
        <p class=" text-[17px] tracking-wide font-medium  "> Buyers & Renters</p>
        <div>
          
          <NuxtLink to="/search"  class="flex mt-4 gap-4">
              <p class=" text-[15px]"> Search rental properties</p>
          </NuxtLink>

          <NuxtLink to="/auth?type=register-page"  class="flex mt-4 gap-4">
          
              <p class=" text-[15px] ">Create search agent</p>
          </NuxtLink>

          <NuxtLink to="/search"  class="flex mt-4 gap-4">
          
              <p class=" text-[14px] "> FAQ</p>
          </NuxtLink>

        </div>
      </div>

      

      <div class="  ">
        
        <p class=" text-[16px] tracking-wide font-medium  ">Landlords & portals</p>
        <div>
          
          <NuxtLink to="/auth" class="flex mt-4 gap-4">
             <p class=" text-[15px]"> Partnerships for portals</p>
          </NuxtLink>
           <NuxtLink to="/auth"  class="flex mt-4 gap-4">
             <p class=" text-[15px]"> Partnerships for landlords</p>
          </NuxtLink>

         

          

        </div>
      </div>

      <div class="   ">
        
        <p class=" text-[17px] tracking-wide font-medium ">About</p>
        <div class="mt-4 space-y-2">
          
          <div class="flex gap-4">
             <NuxtLink to="/about-us" class=" text-[13px]"> About us</NuxtLink>
          </div>
          <div class="flex gap-4"> 
             <NuxtLink  to="/terms-and-conditions" class=" text-[13px]"> Terms and conditions</NuxtLink>
          </div>
          <NuxtLink to="/privacy-policy" class="flex  gap-4"> 
             <p class=" text-[13px]">  Privacy policy</p>
          </NuxtLink>
           <NuxtLink to="/contact-us"  class="flex  gap-4"> 
             <p class=" text-[13px]">  Contact us</p>
          </NuxtLink>
          

          <NuxtLink to="/Privacy-policy" class="flex  gap-4"> 
             <p class=" text-[13px]">  Cookie Settings</p>
          </NuxtLink>
          
        
        </div>
      </div>

       <div class="  ">
        
        <p class=" text-[16px] tracking-wide font-medium  ">Language</p>
        <div class="mt-4 space-y-2">
          
          <div class="flex gap-4">
             <p class=" text-[14px]"> English</p>
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