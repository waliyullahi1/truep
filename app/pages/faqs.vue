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
                                <span class="  font-bold">Frequently Asked Questions</span>
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
                    class=" e md:p-10 p-0 ">
                  
                   <div class=" bg-secondary  w-1/4 h-1  mt-6"> </div>
                  
                    <div class="relative md:w-3/4 w-full mt-4 justify-betwee space-y-6  flex flex-col    ">

                            <div v-for="faq in faqList" :key="faq.id"
                                class="flex justify-between shadow-md  shadow-black text-white p-4 items-start gap-2 sm:gap-5">


                                <div class=" space-y-2">
                                    <UiTypographyP><span class=" md:text-lg">{{ faq.title }}</span></UiTypographyP>
                                    <div :class="faq.showdescription ? ' md:20 h-24 p-4 ' : ' h-0 p-0  overflow-hidden '"
                                        class=" bg-white text-black  duration-500">
                                        <UiTypographyP>
                                            {{ faq.description }}
                                        </UiTypographyP>
                                    </div>
                                </div>
                                <button @click="toggleDescription(faq)" type="button" class=" ">
                                    <UiTypographyH3><span class=" text-white font-bold text-xl  sm:text-2xl"> <strong>{{ faq.showdescription ?
                                        '-' : '+' }}</strong> </span></UiTypographyH3>
                                </button>
                            </div>

                        </div>
                  

                   
                  


                   <div class=" mt-10  p-10  flex flex-col justify-center items-center text-white w-full  bg-primary p">
                        <UiTypographyH2 class=" text-white text-center">Enrol your child today</UiTypographyH2>
                       <div class=" h-0.5 w-20  mb-7 mt-3 bg-white"> </div> 

                        <NuxtLink to="/warning" class=" bg-white px-4 rounded-full py-2 cursor-pointer  font-medium hover:bg-secondary hover:text-white duration-300 text-black ">Apply Now</NuxtLink>
                   </div>
                 </div>
            </Container>
        </section>

        <section>

            

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
        title: 'What curriculum does the school provide?',
        description: 'We run the National British curriculum with a blend of the Nigerian curriculum',
        showdescription: false
    },
    {
        id: 2,
        title: 'Are new pupils required to write any entrance test?',
        description: 'Yes. Pupils coming into Year 1 - Year 6 are required to write an entrance test in English and Mathematics.',
        showdescription: false
    },
    {
        id: 3,
        title: 'Do you provide lunch?',
        description: 'Yes, we provide healthy, nutritious cooked meals for our children. These meals are eaten in a clean, hygienic and expansive dining hall.',
        showdescription: false
    },
    {
        id: 4,
        title: 'Is the School Lunch already a part of the bill?',
        description: 'No. The School Lunch is an optional part of the bill. Parents can decided to waive it or go for it.',
        showdescription: false
    },
    {
        id: 5,
        title: 'Do you provide bus services?',
        description: 'Yes, we provide school bus services to selected routes. Bowine does not own these buses but we monitor, control and scrutinize the bus service providers every school day.',
        showdescription: false
    },
    {
        id: 6,
        title: 'What type of sports does the school offer?',
        description: 'We offer both indoor and outdoor sports. These include football, basketball, lawn tennis, swimming, athletics, taekwando, chess, ballet and more',
        showdescription: false
    },
    {
        id: 7,
        title: 'How do I get the application form?',
        description: 'You can purchase the form by walking into our school or from our website.',
        showdescription: false
    },
      
    {
        id: 8,
        title: 'Does the school use age of child to place them in their appropriate class levels?',
        description: 'Yes we do. Your child has to be a certain age by the 1st of September to be eligible for admission. For example, a child has to be at least 3 years old for admission into Pre-nursery in Preschool and 6 years old for admission into Year 2 in Elementary School.',
        showdescription: false
    },
      {
        id: 9,
        title: 'What educational service does Bowine International School provide?',
        description: 'We provide Pre-school (18 months – 4 years), Elementary School (5years – 10years) and A-Star Academy (for pupils preparing for entrance examinations) Do you provide after school care?',
        showdescription: false
    },
      {
        id: 10,
        title: 'Do you provide after school care?',
        description: 'Yes, we offer after school care based on request. Please contact the school for more information',
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
