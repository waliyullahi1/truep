<template>
    <div>
        <!-- Hero section contact us -->
        <section class=" bg-[url('/images/gallary1.jpg')] bg-cover bg-no-repeat  ">
            <div class="bg-black/70 pb-10 pt-20 ">
                <Container class="">
                    <div class="md:w-1/2 text-white">
                        <UiTypographyP color="white">
                            <span class=" font-bold">Have questions or need help?</span>
                        </UiTypographyP>
                        <div class=" py-2">
                            <UiTypographyH1 color="white">
                                <span class="  font-bold">Contact Us</span>
                            </UiTypographyH1>
                        </div>
                        
                        

                    </div>
                </Container>
            </div>

        </section>

        <!-- List all the contact details here -->
        <section class="">
            <Container>
                <div
                    class="flex md:flex-row flex-col  items-center justify-center md:space-y-0 space-y-4   md:space-x-10">
                    <div class="md:w-[300px] sm:w-[250px] space-y-4">
                        <!-- phone number list -->
                        <div>
                            <div
                                class=" group border sm:p-8 p-4 flex flex-col space-y-4 w-full  justify-center items-center">
                                <!-- contact card -->
                                <div
                                    class=" rounded-full sm:p-6 p-3  bg-accent-100 group-hover:bg-white flex w-fit items-center">
                                    <img src="@/assets/images/phone-icon.png" class=" w-7" alt="phone Icon">
                                </div>

                                <!-- list of contact details -->
                                <div class=" text-center">
                                    <UiTypographyH3>
                                        <span class=" font-bold">Contact Number</span>
                                    </UiTypographyH3>
                                    <UiTypographyP>
                                        <span class="  text-center font-bold">
                                            +1 (415) 579 1344 <br>
                                            +1 (415) 831 7599
                                        </span>
                                    </UiTypographyP>
                                </div>

                            </div>
                        </div>
                        <!-- email details -->
                        <div>
                            <div class=" border p-8 flex flex-col space-y-4 w-full  justify-center items-center">
                                <!-- contact card -->
                                <div
                                    class=" rounded-full p-6  bg-accent-100 group-hover:bg-white  flex w-fit items-center">
                                    <img src="@/assets/images/mail-icon.png" class=" w-7" alt="phone Icon">
                                </div>

                                <!-- list of contact details -->
                                <div class=" text-center">
                                    <UiTypographyH3>
                                        <span class=" font-bold">Email</span>
                                    </UiTypographyH3>
                                    <UiTypographyP>
                                        <span class="  text-center font-bold">
                                            trademaxproject@gmail.com
                                        </span>
                                    </UiTypographyP>
                                </div>

                            </div>
                        </div>
                        <!-- Address number list -->
                        <div>
                            <div class=" border p-8 flex  flex-col space-y-4 w-full  justify-center items-center">
                                <!-- contact card -->
                                <div
                                    class=" rounded-full p-6  bg-accent-100 group-hover:bg-white   flex w-fit items-center">
                                    <img src="@/assets/images/location.png" class=" w-7" alt="location Icon">
                                </div>

                                <!-- list of contact details -->
                                <div class=" text-center">
                                    <UiTypographyH3>
                                        <span class=" font-bold">Address</span>
                                    </UiTypographyH3>
                                    <UiTypographyP>
                                        <span class="  text-center font-bold">
                                            1423 Broadway, Oakland, CA 94612
                                        </span>
                                    </UiTypographyP>
                                </div>

                            </div>
                        </div>




                    </div>

                    <div class="  w-full shadow-xl  border p-2 md:p-7">
                        <div class=" space-y-3">
                            <div class=" md:px-4 px-2 md:py-2 py-1  w-fit bg-accent-300">
                                <UiTypographyP><span class=" font-semibold text-white">Contact Us</span></UiTypographyP>
                            </div>

                            <UiTypographyH2> <span class=" font-bold">Get In Touch With Us!
                                    </span></UiTypographyH2>

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
