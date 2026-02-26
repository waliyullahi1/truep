<template>
    <div class=" overflow-x-hidden">
        <!-- Hero section contact us -->
        <section class=" bg-[url('/image.jpg')] overflow-x-hidden bg-cover bg-no-repeat  ">
            <div class="bg-primary   pb-10 pt-20 ">
                <div class="lg:w-[90%] mx-auto px-2 container">
                    <div class=" lg:grid lg:grid-cols-3 justify-center  md:block  gap-4 text-white">
                        <div class="    items-center ">
                             <div class=" flex items-center  flex-col w-full h-full justify-center    py-2">
                            <UiTypographyH1 color="white">
                                <span class="  text-[#b78d46] font-bold">Careers Opportunities</span>
                            </UiTypographyH1>
                            <UiTypographyP class=" md:text-md   mt-4">At  UNILORIN Nursery and Primary School, we nurture curious minds and build strong values. Join a community where we train children to grow, explore, and lead.</UiTypographyP>
                            </div>
                        </div>
                        <div class=" hidden lg:flex bg-[url('/images/unilorin_gate.jpg')]   bg-center bg-cover  ">
                             <div class=" h-full   bg-primary/50 w-full  bg-center bg-cover ">
                           
                        </div>
                        </div>
                       
                        <div class=" mt-10 block  md:grid grid-cols-2 gap-4 lg:block h-full md:h-full   ">
                         <div class=" bg-[url('@/assets/images/4T2A1549.png')] lg:hidden h-52   md:h-full  flex   bg-center bg-cover  ">
                          <div class=" h-full   bg-primary/50 w-full  bg-center bg-cover ">
                           
                        </div>
                        </div>
                        <div>
                        <div class=" ">

                            
                           <UiTypographyH3 color="white">
                                <span class="text-[#b78d46]  font-bold">Our Vision</span>
                            </UiTypographyH3>

                            <UiTypographyP class="mt-4 w-full tracking-wide md:text-md  ">
                             To challenge and inspire every child to reach their full potential in a caring and loving environment
                           </UiTypographyP>
                        </div>

                         <div class=" mt-6">

                            
                           <UiTypographyH3 color="white">
                                <span class=" text-[#b78d46]  font-bold">Our Mission</span>
                            </UiTypographyH3>

                            <UiTypographyP class="mt-4  md:text-md  w-full text-justify tracking-wide ">
                             To ensure that  UNILORIN Nursery And Primary School pupils adapt and contribute to the ever changing world as well as engage in continuous life long learning by providing a balanced curriculum designed to meet the academic, cultural and social needs of children from diverse backgrounds in our community.
                           </UiTypographyP>
                        </div>
                        <div class=" mt-6">

                            
                           <UiTypographyH3 color="white">
                                <span class=" text-[#b78d46] font-bold">Our Core Values</span>
                            </UiTypographyH3>

                            <UiTypographyP class="mt-4 w-full text-justify tracking-wide md:text-md ">
                            Kindness - Respect - Integrity - Inclusiveness - Excellence
                           </UiTypographyP>
                        </div>
                        </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>

        <!-- List all the contact details here -->
        <section class=" overflow-x-hidden">
            <Container>
                <div
                    class="flex md:flex-row flex-col  items-center justify-center md:space-y-0 space-y-4   md:space-x-10">
                    <div class="md:w-[40%] sm:w-[250px] space-y-4">
                        <UiTypographyH2>
                            <span class=" font-bold">Get In Touch With Us!</span>
                        </UiTypographyH2>
                        <div class="mt-5">
                            <UiTypography3 class=" font-semibold mt-3"> Phone</UiTypography3>
                            <UiTypographyP class="  m"> +234 909 03412385</UiTypographyP>
                        </div>
                         <div class="mt-5">
                            <UiTypography3 class=" font-semibold mt-3"> Email</UiTypography3>
                            <UiTypographyP class="  m">info@unilorin.com</UiTypographyP>
                        </div>
                        <div class="mt-5">
                            <UiTypography3 class=" font-semibold mt-3"> Address</UiTypography3>
                            <UiTypographyP class="  m"> Km 12, Ilorin Expressway, Ilroin, Kwara.</UiTypographyP>
                        </div>
                        
                       
                        <!-- email details -->
                        
                        <!-- Address number list -->
                       




                    </div>

                    <div class="  w-full shadow-xl  border p-2 md:p-7">
                        <div class=" space-y-3">
                            


                            <form action="" class=" md:px-4 px-2 md:pt-4 pt-2 space-y-7">
                                <FormInput v-model:inputValue="form.fullname" label="Full Name" type="text"
                                    :required="true" name="fullname" />

                                <FormInput v-model:inputValue="form.email" label="Email Address" :required="true"
                                    name="email" />

                                <FormInput v-model:inputValue="form.phone" label="Phone Number" :required="true"
                                    type="tel" name="phone" />
                                
                                <FormTextarea v-model:inputValue="form.message" label="Message" :required="true"
                                    name="message" />
                                <UiButtonsPrimary @click="submit" :loading="isLoading" type="submit"><span>Submit</span>
                                </UiButtonsPrimary>
                            </form>

                        </div>
                    </div>
                </div>
            </Container>
        </section>

        <section>

            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d505105.7485473196!2d4.674583!3d8.485896!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103652c2a85b742f%3A0xbf3011af9f61d6ca!2sUniversity%20of%20Ilorin!5e0!3m2!1sen!2sus!4v1768692138792!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>


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
</script>
