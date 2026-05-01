<template>
  <div class=" overflow-x-hidden bg-[#FEFEFE]">
    
    <!-- <UiTypographyH1 color="secondary" class="text-center pt-28 mb-1">United States</UiTypographyH1> -->
    <header class="mt-0 ]   h-[80vh]    hero-section">
      <Container :addTopBottomPadding="true" class="text-white  h-full flex  items-center pb-4">
        <div class=" flex justify-end flex-col items-center   bgck w-full h-full">

          

           
            
            <h1
            style="text-shadow: 0 6px 8px rgba(0,0,0,.55), 0 12px 18px rgba(0,0,0,.45), 0 18px 28px rgba(0,0,0,.35);"
            class="text-white font-inter px-2 text-center text-3xl  sm:text-5xl/tight   "
            >
            Find your Next Property
            </h1>
          
              <div class="mt-3 w-full sm:w-[80%] md::w-[60%] bg-white rounded-lg shadow-xl p-2 flex flex-col md:flex-row gap-3">

                <input
                  v-model="search"
                  placeholder="Search land, houses, agents..."
                  class="flex-1 px-2 py-1 outline-none text-gray-700"
                />

                <button @click="router.push('/search')"
                  class="  bg-primary text-white px-6 h-fit  py-2 rounded-lg font-medium hover:bg-secondary/80"
                >
                  Search
                </button>

                

              </div>
          
              
         
          <!-- <div class="pt-4 sm:flex block sm:space-y-0 space-y-4 sm:space-x-4 hero-fade-up delay-4">
            <UiButtonsPrimary @click="openform">
              <span>Apply Now</span>
            </UiButtonsPrimary>

           
          </div> -->

        </div>
      </Container>
    </header>


     <section>
        <Container>
          <div class=" text-secondary ">

           <h2 class="  font-semibold text-2xl">Which type of  Property suits your needs?</h2>

             <div class=" flex  overflow-x-auto  gap-5 mt-4">
                

                 <button click="router.push('/search')"  class=" text-lg  gap-3 w-fit h-fit rounded-md p-3  bg-[#f9f9f9] items-center  flex ">
                    <img  src="@/assets/images/icons/house_icon.svg" class=" w-8 text-red-600" alt=" House Icons"/>
                    <p class=" text-[16px]  font-semibold">Houses</p>
                </button>

                 <button @click="router.push('/search')" class=" text-lg  gap-3 w-fit h-fit rounded-md p-3  bg-[#f9f9f9] items-center  flex ">
                    <img  src="@/assets/images/icons/apartment.svg" class=" w-8 text-red-600" alt=" Apartment Icons"/>
                    <p class=" text-[16px]  font-semibold">Apartments</p>
                </button>

                 <button @click="router.push('/search')" class=" text-lg  gap-3 w-fit h-fit rounded-md p-3  bg-[#f9f9f9] items-center  flex ">
                    <img  src="@/assets/images/icons/room_icon.svg" class=" w-8 text-red-600" alt=" Rooms Icons"/>
                    <p class=" text-[16px]  font-semibold">Rooms</p>
                </button>

                 <button @click="router.push('/search')"   class=" text-lg  gap-3 w-fit h-fit rounded-md p-3  bg-[#f9f9f9] items-center  flex ">
                    <img  src="@/assets/images/icons/studios.svg" class=" w-8 text-red-600" alt=" Studio Icons"/>
                    <p class=" text-[16px]  font-semibold">Studios</p>
                </button>

                 <button @click="router.push('/search')" class=" text-lg  gap-3 w-fit h-fit rounded-md p-3  bg-[#f9f9f9] items-center  flex ">
                    <img  src="@/assets/images/icons/graduate_cap.svg" class=" w-8 text-red-600" alt=" graduate Icons"/>
                    <p class=" text-[16px]  whitespace-nowrap  font-semibold">Student apartments</p>
                </button>

                <button  @click="router.push('/search')" class=" text-lg  gap-3 w-fit h-fit rounded-md p-3  bg-[#f9f9f9] items-center  flex ">
                    <img  src="@/assets/images/icons/all-property.svg" class=" w-8 text-red-600" alt=" graduate Icons"/>
                    <p class=" text-[16px]   whitespace-nowrap  font-semibold">All properties</p>
                </button>
             </div>
          </div>
        </Container>
     </section>
     
    <!-- // recent property -->
 
    
    <!-- hidden this section (what are will do) -->
    
    <!-- recent service and post -->
          <!-- <CategorySlider /> -->
    
    <!-- Simple Process Steps  details here -->
    <section class="    0 reason-choose-us ">
      <Container>
        <div class="   gap-5 ">
         <UiTypographyH2 class=" ">
          Latest Properties
         </UiTypographyH2>
          <div class=" ">
            <UiTypographyP class="md:w-1/2 w-full text-gray-600 mt-2 mb-2 ">
            By default, we use your location to show properties around you.  
            You can also change your location to explore listings in other areas.
          </UiTypographyP>

          <div class="  flex justify-end w-full ">
          <NuxtLink to="/search" class=" text-left"><span class=" underline text-right font-semibold  text-sm">See all</span> </NuxtLink>
          </div>
          </div>
          


          

          <div class=" ">
         
             <PropertyList class=" mt-1" ></PropertyList>
          </div>

        </div>
      </Container>
    </section>

    <section class="  bg-[#f9f9f9]  0 reason-choose-us ">
      <Container>
        <div class="   gap-5 ">
        <UiTypographyH2 class=" ">
        Create a free Search Agent
        </UiTypographyH2>
          <div class=" ">
            <UiTypographyP class="md:w-1/2 w-full text-gray-600 mt-2 mb-2 ">
          Let us find your next home. Create a free Search Agent and receive instant email updates for new listings that match your criteria, so you're always first to know.
          </UiTypographyP>

          <div class="  flex justify-end w-full ">
          <UiButtonsPrimary   @click="router.push('/auth?type=register-page')" class="  text-left">Create a Search Agent </UiButtonsPrimary>
          </div>
          </div>
          


          

          

        </div>
      </Container>
    </section>

   

  

    <section class="   0 reason-choose-us ">
      <Container>
        <div class="   gap-5 ">
          <UiTypographyH2 class="">
             
               Popular Cities
              
            </UiTypographyH2>
          <div>

          </div>
          
            <UiTypographyP class="w-1/2 mt-2  ">
               Discover properties in Nigeria's most sought-after locations
          </UiTypographyP> 
          <div>
               
                <Masonry></Masonry>
 
          </div>

        </div>
      </Container>
    </section>

     <section class="    0 reason-choose-us ">
      <Container>
        <div class="   gap-5 ">
           <UiTypographyH2 class=" ">Who Is This For? </UiTypographyH2>
          
            <UiTypographyP class="md:w-1/2 w-full text-gray-600 mt-2 mb-2">
              Whether you're looking to buy, rent, or invest in property, this platform is designed for individuals and families who want a simple, reliable way to find the right home or opportunity.
            </UiTypographyP>

          <div class=" mt-4 md:grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-5   ">
           
                <div  v-for="value in who_is_this_for"  class=" space-y-3 rounded-md bg-white cursor-pointer px-2 sm:px-4 py-4 w-full h-full shadow-md  gap-3 items-center ">
                  <div class=" w-full flex justify-center items-center">
                     <div class="bg-[#f9f9f9] rounded-full w-fit h-fit p-3">
                        <img :src="`/image/${value.image}`" class=" w-10" alt="" srcset="">
                     </div>
                  </div>
                 
                  <UiTypographyH3 class=" text-center">{{value.title}}</UiTypographyH3>
                  <UiTypographyP class=" text-center text-gray-700">{{value.description}}</UiTypographyP>
                </div>
             
           
          </div>
        </div>
      </Container>
    </section>
    
    <!-- What You Can Do -->
    <section class="   bg-gray-100">
     <Container>
      <div>
        <UiTypographyH2 class=" text-center">
             What You Can Do
        </UiTypographyH2>

        <div class="mt-6 flex  justify-center">
          <div  class=" grid md:w-[80%] w-full md:grid-cols-3  sm:grid-cols-2 gap-4">
            <div  v-for="value in whatyoucando"  class=" bg-white cursor-pointer px-2 py-4 w-full h-full shadow-md flex gap-3 items-center ">
              <img :src="`/image/${value.image}`" alt="" class=" w-7 " srcset="">
              <UiTypographyP>{{ value.title }}</UiTypographyP>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center mt-10">
           <UiButtonsPrimary @click="router.push('/auth?type=register-page')">Get Stated </UiButtonsPrimary>
        </div>
       
      </div>
     </Container>
     
    </section>

    <section class="   -100">
     <Container>
      <div class=" md:flex  block items-center  gap-7 ">
        
        <div class="mt-6 flex  justify-center">
          <img src="@/assets/images/hero-image.png" alt="" srcset=""> 
        </div>

        <div>
             <UiTypographyH2 class="  ">
               <span class=" md:text-3xl text-xl font-medium " >
                Get Your Property and Apartment Listed
               </span> 
            </UiTypographyH2>
            <UiTypographyP class=" text-gray-600">Register and get your home listed as a property owner</UiTypographyP>
            <div class="flex items-center justify-center mt-10">
           <UiButtonsPrimary>GET LISTED</UiButtonsPrimary>
           </div>
        </div>
       
       
       
      </div>
     </Container>
     
    </section>
      <section class=" hidden  bg-slate-50 ">
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
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
definePageMeta({
  layout: 'main'
}) 

const config = useRuntimeConfig()




const whatyoucando = ref([
  {
    id: 1,
    title: 'Discover verified properties across Nigeria',
    image: 'search.png',
  },
  {
    id: 2,
    title: 'Sign secure digital lease agreements online',
    image: 'file.png'
  },
  {
    id: 3,
    title: 'Measure land size accurately using our map tools',
    image: '/icon/map.svg'
  },
  {
    id: 4,
    title: 'List your land or property for sale or rent',
    image: 'document.png'
  },
  {
    id: 5,
    title: 'Find nearby agents, land sellers, and service providers on the map',
    image: '/icon/doc_search.svg'
  },
  {
    id: 6,
    title: 'Save and manage your favorite properties in one place',
    image: 'hugeicons.png'
  },
  {
    id: 7,
    title: 'Track and manage your property listings ',
    image: 'briefcase.png'
  }
])

const who_is_this_for = ref([
  { 
    image: 'user-multiple.png',
    title: 'For Buyers & Renters',
    description: 'Explore verified land and property listings, compare options, and easily connect with agents or owners to buy, rent, or invest with confidence.'
  },
  { 
    image: 'homee.png',
    title: 'For Property Owners',
    description: 'List your land, houses, or rental properties, reach serious buyers or tenants, and manage inquiries seamlessly from one platform.'
  },
  { 
    image: 'briefcase.png',
    title: 'For Agents',
    description: 'Promote your listings, connect with qualified clients, and close deals faster across land sales, home sales, and rentals.'
  }
])
const categories = [
  'All',
  'Land',
  'House',
  'Flat / Apartment',
  'Duplex'
]
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
  background: linear-gradient(rgba(4, 4, 4, 0.300), rgba(9, 9, 9, 0.1)), url('assets/images/hero.webp');
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.shadow{
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;  }

.cta {
  background: rgba(0, 0, 0, 0.1), url('/images/unilorin_gate.jpg');
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