<template>
  <div class=" overflow-x-hidden bg-[#FEFEFE]">
    

    


<!-- HERO SECTION -->
<section class="relative mt-7 min-h-[90vh] overflow-hidden">

  <!-- Background -->
  <div
    class="absolute inset-0 bg-cover bg-center"
    style="background-image:url('/images/hero.jpg')"
  >
    <div class="absolute inset-0 bg-black/60"></div>
  </div>

  <Container class="relative z-10">

    <div
      class="min-h-[90vh] flex flex-col justify-center items-center text-center"
    >

      <span
        class="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm mb-1"
      >
        🇳🇬 Nigeria's Trusted Property Marketplace
      </span>

      <h1
        class="text-4xl  sm:text-6xl font-bold text-white max-w-4xl"
      >
        Find Your Dream Property
        Across Nigeria
      </h1>

      <p
        class="sm:mt-6 mt-3 text-white/90 text-lg max-w-2xl"
      >
        Discover verified properties, connect with trusted agents,
        and buy, rent, or sell with confidence.
      </p>

      <!-- Search -->
      <div
        class="bg-white sm:mt-6 mt-3 rounded-lg shadow-2xl p-1 sm:p-3 flex  gap-3 w-full max-w-5xl"
      >
        <input
          v-model="search"
          placeholder="Search property, location, agent..."
          class=" w-full  px-4 sm:py-3 py-1 outline-none"
        />

        <button
          @click="router.push('/search')"
          class="bg-primary flex justify-center items-center sm:px-8 px-4 sm:py-3 py-1 rounded-lg text-white font-semibold"
        >
        <Icon name="lucide:search"  class="text-white flex sm:hidden text-xl"/>
         <span  class=" hidden sm:flex"> Search</span> 
        </button>
      </div>

      <!-- Stats -->
      <div
        class="grid grid-cols-3 gap-10 mt-14 text-white"
      >
        <div>
          <h3 class="text-3xl font-bold">15K+</h3>
          <p>Properties</p>
        </div>

        <div>
          <h3 class="text-3xl font-bold">5K+</h3>
          <p>Agents</p>
        </div>

        <div>
          <h3 class="text-3xl font-bold">25K+</h3>
          <p>Customers</p>
        </div>
      </div>

    </div>

  </Container>

</section>





<section class="sm:py-20 py-10 bg-gradient-to-b from-white to-slate-50">
  <Container>
    <!-- Heading -->
    <div class="text-center max-w-3xl mx-auto">
      <span
        class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm"
      >
        Why Choose Abanise
      </span>

      <h2
        class="mt-4 text-3xl md:text-5xl font-bold text-slate-900 leading-tight"
      >
        The Smarter Way To Find
        <span class="text-primary">Property In Nigeria</span>
      </h2>

      <p class="mt-4 text-slate-600  text-lg">
        We make property search simple, transparent, and secure by connecting
        buyers, renters, landlords, and agents on one trusted platform.
      </p>
    </div>

    <!-- Features -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

      <!-- Card -->
      <div
        class="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      >
        <div
          class="absolute top-0 right-0 h-24 w-24 rounded-full bg-green-100 blur-2xl opacity-70"
        ></div>

        <div
          class="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center"
        >
          <Icon
            name="lucide:badge-check"
            class="text-green-600 text-2xl"
          />
        </div>

        <h3 class="mt-6 text-xl font-semibold text-slate-900">
          Verified Listings
        </h3>

        <p class="mt-3 text-slate-600 leading-relaxed">
          Browse verified properties with accurate information, photos, and
          trusted sellers.
        </p>
      </div>

      <!-- Card -->
      <div
        class="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      >
        <div
          class="absolute top-0 right-0 h-24 w-24 rounded-full bg-blue-100 blur-2xl opacity-70"
        ></div>

        <div
          class="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center"
        >
          <Icon
            name="lucide:users"
            class="text-blue-600 text-2xl"
          />
        </div>

        <h3 class="mt-6 text-xl font-semibold text-slate-900">
          Trusted Agents
        </h3>

        <p class="mt-3 text-slate-600 leading-relaxed">
          Connect directly with trusted property agents and professionals across
          Nigeria.
        </p>
      </div>

      <!-- Card -->
      <div
        class="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      >
        <div
          class="absolute top-0 right-0 h-24 w-24 rounded-full bg-purple-100 blur-2xl opacity-70"
        ></div>

        <div
          class="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center"
        >
          <Icon
            name="lucide:map-pinned"
            class="text-purple-600 text-2xl"
          />
        </div>

        <h3 class="mt-6 text-xl font-semibold text-slate-900">
          Smart Location Search
        </h3>

        <p class="mt-3 text-slate-600 leading-relaxed">
          Discover homes, apartments, and land near your preferred location
          with ease.
        </p>
      </div>

      <!-- Card -->
      <div
        class="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      >
        <div
          class="absolute top-0 right-0 h-24 w-24 rounded-full bg-amber-100 blur-2xl opacity-70"
        ></div>

        <div
          class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center"
        >
          <Icon
            name="lucide:shield-check"
            class="text-amber-600 text-2xl"
          />
        </div>

        <h3 class="mt-6 text-xl font-semibold text-slate-900">
          Secure Experience
        </h3>

        <p class="mt-3 text-slate-600 leading-relaxed">
          Designed to help users avoid scams and interact with confidence when
          renting or buying.
        </p>
      </div>
    </div>

    <!-- Bottom CTA -->
   
  </Container>
</section>

    <section class="  bg-[#f9f9f9]  0 reason-choose-us ">
      <Container>
        <div class="   gap-5 ">
           <span
          class="inline-flex px-4 py-2 rounded-full bg-black/10 text-sm mb-4"
        >
          Join Abanise Today
        </span>
        <UiTypographyH2 class=" ">
         Find, Rent, Buy & List Properties
          All In One Place
        </UiTypographyH2>
          <div class=" ">
            <UiTypographyP class="md:w-1/2 w-full text-gray-600 mt-2 mb-2 ">
           Create a free account to save properties, receive alerts,
          manage listings, and connect directly with trusted agents
          and property owners.
          </UiTypographyP>

          <div class="  flex gap-4 justify-end w-full ">
          <UiButtonsPrimary   @click="router.push('/auth?type=register-page')" class="  text-left"> Create Free Account</UiButtonsPrimary>
          <UiButtonsPrimary   @click="router.push('/auth?type=register-page')" class="  text-left">  Login </UiButtonsPrimary>
          </div>
          </div>
          


          

          

        </div>
      </Container>
    </section>







     <section>
        <Container>
          <div class="  text-primary ">

           <h2 class="  font-semibold text-2xl">Which type of  Property suits your needs?</h2>

             <div class=" flex  overflow-x-auto  gap-5 mt-4">
                <DiscoverMore/>
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
 


    <section class="py-16 bg-green-50 border-t border-green-100">
  <Container>
    <div class="max-w-4xl mx-auto text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
        <Icon
          name="logos:whatsapp-icon"
          class="text-4xl"
        />
      </div>

      <h2 class="text-3xl font-bold mb-3">
        Join Our WhatsApp Community
      </h2>

      <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
        Get instant property updates, new listings, investment opportunities,
        hostel vacancies, and exclusive deals directly on WhatsApp.
      </p>

      <a
        href="https://chat.whatsapp.com/YOUR_COMMUNITY_LINK"
        target="_blank"
        class="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition"
      >
        <Icon
          name="logos:whatsapp-icon"
          class="text-2xl"
        />
        Join Community
      </a>
    </div>
  </Container>
</section>


   


    

 <NavigationFooter />
       
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