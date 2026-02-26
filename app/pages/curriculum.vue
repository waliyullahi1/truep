<template>
    <div class=" bg-primary">
        <!-- Hero section contact us -->
        <section class=" bg-[url('/images/gallary0.jpg')]  bg-cover bg-no-repeat bg-center  ">
            <div class="bg-black/70 pb-10 pt-20 ">
                <Container class="">
                    <div class="md:w-1/2 text-white">
                       <!-- <img src="@/assets/images/4T2A1549.png" alt="4T2A1549" srcset=""> -->
                        <div class=" py-2">
                            <UiTypographyH1 color="white">
                                <span class="  font-bold">Curriculum</span>
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
                   <div class=" bg-[url('/images/gallary3.jpg')] w-full mb-4  bg-center bg-cover h-96" ></div>
                   <h2 class="  text-primary  font-bold text-2xl md:text-4xl">Curriculum</h2>
                   <div class=" bg-secondary  w-1/3 h-1  mt-6"> </div>
                   
                   <div class=" mt-10">
                   
                    <UiTypographyP class="mt-4 w-full tracking-wide md:text-lg ">We operate the British National Curriculum with a blend of the Nigerian Curriculum.</UiTypographyP>
                   </div>
                   
                   <div class=" mt-10">
                    <h2 class="  text-primary  font-bold text-xl  tracking-wider md:text-3xl italic"><span class=" ">Preschool/Nursery</span></h2>
                    <UiTypographyP class="mt-4 w-full tracking-wide md:text-lg ">The age range for our early years infant school
                         is 2-5 years. We use the early learning goals which are found in the Early 
                         Years Foundation Stage and the Maria Montessori Approach to
                          guide our modeling of the curriculum. <br> <br>
                          They will be taught through games and play. The areas of learning include:
                        </UiTypographyP>
                   </div>

                   
                   <div class=" mt-10">
                    <UiTypographyP class="mt-4 w-full tracking-wide md:w-3/5">
                        <ul class="list-disc list-inside text-lg space-y-1">
                            <li>Communication</li>
                            <li>Physical Development</li>
                            <li>Personal, emotional and social development</li>
                            <li>Literacy</li>
                            <li>Mathematics</li>
                            <li>Understanding the world</li>
                            <li>Expressive arts and design</li>
                        </ul>
                    </UiTypographyP>
                   </div>

                   <div class=" mt-10">
                    <h2 class="  text-primary  font-bold text-xl  tracking-wider md:text-3xl italic"><span class=" ">Primary School</span></h2>
                    <UiTypographyP class="mt-4 w-full tracking-wide md:text-lg ">Primary  School under the British Curriculum is organized on the basis of 2 key stages: Key Stage 1 (5 – 7 years) and Key Stage 2 (7 – 11 years).  <br> <br>
                        The British Curriculum aims at getting students ready for Standard Attainment Tests (SATS) at the end of Year 2 and Year 6 <br> <br>
                        The subjects under the British primary school curriculum will comprise both the core and non-core subjects namely:
                          
                        </UiTypographyP>
                   </div>

                   
                   <div class=" mt-10">
                    <UiTypographyP class="mt-4 w-full tracking-wide md:w-3/5">
                        <ul class="list-disc list-inside text-lg space-y-1">
                            <li>Literacy</li>
                            <li>Numeracy </li>
                            <li>Science</li>
                            <li>Computing (ICT)</li>
                            <li>Language i.e. French</li>
                            <li>Art & Design</li>
                            <li>Music</li>
                            <li>History</li>
                            <li>Physical Education</li>
                            <li>Geography</li>
                            <li>Design &Technology</li>
                        </ul>
                    </UiTypographyP>
                   </div>

                   <div class=" mt-10">
                    <h2 class="  text-primary  font-bold text-xl  tracking-wider md:text-3xl italic"><span class=" ">Nigerian Curriculum</span></h2>
                    <UiTypographyP class="mt-4 w-full tracking-wide md:text-lg ">
                        The Nigerian Curriculum will be taught in conjunction with the British Curriculum for the primary school. Subjects taught under this curriculum include Social Studies, Geography and Nigerian Languages as electives.
                        </UiTypographyP>
                   </div>
                    <div class=" mt-10">
                    <h2 class="  text-primary  font-bold text-xl  tracking-wider md:text-3xl italic"><span class=" ">Outdoor Learning</span></h2>
                    <UiTypographyP class="mt-4 w-full tracking-wide md:text-lg ">
                        At Bowine International School, we believe that outdoor learning is an important part
                         of a good childhood and also important in rasing standards 
                         within the school. We will embark on a programme to develop exciting outdoor
                          spaces that can be used throughout the school day including an outdoor
                           classroom, raised beds for planting vegetables, willow tunnels, and so much more. 
                           Teachers will use the extensive grounds to integrate outdoor learning within their
                            topic plans right across the curriculum.
                        </UiTypographyP>
                   </div>

                   
                    <div class=" mt-10">
                    <h2 class="  text-primary  font-bold text-xl  tracking-wider md:text-3xl italic"><span class=" ">Sports & Extra Curricular</span></h2>
                    <UiTypographyP class="mt-4 w-full tracking-wide md:text-lg ">
                       There are a wide range of extra curricular activities as well as sports for children of all ages before, during and after school. Details of clubs on offer are sent out at the beginning of each term.
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
const submit = async (e) => {
    e.preventDefault()
    isLoading.value = true
    // Simple contact form: Save data and redirect to forms
    formStore.setFormData({
        fullname: form.value.fullname,
        email: form.value.email,
        phone: form.value.phone,
        message: form.value.message
    })

    setTimeout(() => {
        router.push('/forms')
        isLoading.value = false
    }, 500)
}

const openChat = () => {
    if (window.Tawk_API) {
        window.Tawk_API.maximize();
    }
}
const faqList = ref([
    {
        id: 1,
        title: 'Q1: What is a trademark, and why is it important?',
        description: 'A trademark protects your brand name, logo, or slogan from unauthorized use. It secures your business identity and strengthens customer trust.',
        showdescription: false
    },
    {
        id: 2,
        title: 'Q2: Can I register a trademark in multiple classes?',
        description: 'Yes. You can file a trademark across multiple classes. Our Standard, Deluxe, and Platinum plans support multi-class applications with additional services.',
        showdescription: false
    },
    {
        id: 3,
        title: 'Q3: Do you handle the full trademark registration process?',
        description: 'Absolutely. We take care of everything — from conducting a trademark search to filing your application and managing all USPTO correspondence.',
        showdescription: false
    },
    {
        id: 4,
        title: 'Q4: What are USPTO fees, and are they included in your pricing?',
        description: 'USPTO filing fees are government charges set by the United States Patent and Trademark Office and vary by class. These fees are not included in our service pricing and are paid directly to the USPTO.',
        showdescription: false
    }
])

const toggleDescription = (item) => {
    faqList.value.forEach(faq => {
        if (faq.id !== item.id) {
            faq.showdescription = false     // close all others
        }
    })
    item.showdescription = !item.showdescription
}
</script>
