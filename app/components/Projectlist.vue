<template>
  <div :class="projectlist?' flex':'flrx hidden'" class="fixed  bg-black/65 h-full z-90 w-full top-0 left-0 flex justify-center items-center">
    <div class="w-11/12 md:w-1/2 bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
     <div class=" fixed da">
      <button @click="toggletemplate" class="  relative bottom-9 right-5 mt-4   bg-red-700 text-white text-xs ab  h-6 w-6 rounded-full ">X</button>
     </div> 
      <!-- Warning -->
      <p class="text-red-600 font-semibold text-center mb-4">
        Warning: This website is a student project created by the 2024/2025
        Primary Education students of the University of Ilorin.  
        It is not an official university website. Please beware of fraud.
      </p>

      <!-- Project Info -->
      <p class="text-gray-700 text-center mb-6">
        This project was created as part of a school assignment by the students listed below.
      </p>

      <!-- Participants -->
      <div class="grid grid-cols-1 items-center justify-center sm:grid-cols-2 gap-4">
        <div
          v-for="(student, index) in participants"
          :key="index"
          class="border flex  flex-col items-center justify-center rounded-lg p-4  gap-4"
        >
        <div class="   w-32 h-32  overflow-hidden rounded-full   flex-shrink-0 mr-4">
           <img
            :src="student.photo"
            alt="Student photo"
            class=" rounded-full object-cover border"
          />
        </div>
         

          <div >
             <p class="font-semibold ">
              Matric No: {{ student.matric }}
            </p>
            <p class="text-sm text-gray-600">{{ student.name }}</p>
            <p :class=" student.paid ? 'text-green-600 hidden' : 'text-red-600'"> Not Paid</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Faqs from '~/pages/faqs.vue';
const projectlist = ref(true)
    
     const  participants= [
        {
          name: "Abdulwaheed Waliyullahi",
          matric: "24/25OY011",
          photo: "/images/waliu.jpg",
          paid:true
        },
        {
          name: "Dosunmu  Boluwatife",
          matric: "24/25OY038",
          photo: "/images/38.png",
          paid:true
        },
         {
          name: "Mukadam  Badmos Imam",
          matric: "24/25OY057",
          photo: "/images/157.jpg",
          paid:true
        },
        {
          name: "Nurudeen  Mujeebah Opeyemi",
          matric: "24/25OY059",
          photo: "/images/59.jpg",
          paid:true
        },
      
        {
          name: "Otitoju Eunice Mercy",
          matric: "24/25OY072",
          photo: "/images/172.jpg",
          paid:true
        },
        {
          name: "Oyerinde Deborah ",
          matric: "24/25OY073",
          photo: "/images/173.jpg",
          paid:true
        },
                {
          name: "Okanlawon Fayidat Oyindamola ",
          matric: "22/25OY073",
          photo: "/images/1fayidah.jpg",
          paid:true
        },
         {
          name: "Soliu Nusirah Adeoye",
          matric: "24/25OY078",
          photo: "/images/78.jpg",
          paid:true
        },
          {
          name: "Sulyman suliyah oluwakemi ",
          matric: "24/25OY079",
          photo: "/images/79.jpg",
          paid:true
        },
         {
          name: "Taiwo abiodun Emmanuel ",
          matric: "24/25OY080",
          photo: "/images/80.jpg",
          paid:true
        },
                  {
          name: "Taofeeq Aishat Ttilope ",
          matric: "24/25OY081",
          photo: "/images/81.jpg",
          paid:true
        },
        {
          name: "Umar Fatimat Adeshewa ",
          matric: "24/25OY082",
          photo: "/images/82.jpg",
          paid:true
        },

        {
          name: "Unachukwu Ifeoma Precious ",
          matric: "24/25OY083",
          photo: "/images/83.jpg",
          paid:true
        },
                {                                                                                                                                                                                                                          
          name: "Usman Aminat Bisola ",
          matric: "24/25OY084",
          photo: "/images/184.jpg",
          paid:true
        },
         {
          name: "Yusuf Haneefat Adeshewa ",
          matric: "24/25OY085",
          photo: "/images/85.jpg",
          paid:true
        },
        {
          name: "Yusuf Rukayat Morenikeji  ",
          matric: "24/25OY086",
          photo: "/images/86.jpg",
          paid:true
        },
        

      ]

 const toggletemplate = ()=>{
projectlist.value = !projectlist.value
 }

</script>

<style scoped>
/* Optional: Add custom styles here if needed */
</style>
