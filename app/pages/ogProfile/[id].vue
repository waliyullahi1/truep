<template>

  <div v-if="data">

    <div class="og-card">
    
      <component
        v-if="randomCard"
        :is="randomCard"
      :location=" `${data.location.city || ''}, ${data.location.state || ''}`"
        :avatar=" data.avatar || ''"

        :name="
          `${data?.firstName || ''} ${data?.lastName|| ''}`
        "

        website="abanise.com"

        :role="data?.roles || ''"
       
        :phone="data?.whatsapp_no || ''"

       

        :skills="data?.skills?.map(f => f.name).slice(0,3) || [] "

      />

    </div>

  </div>

</template>


<script setup>



import { ref, watch } from "vue"

import OgProfile1 from "~/components/OgProfile/1.vue"
import OgProfile2 from "~/components/OgProfile/2.vue"
import OgProfile3 from "~/components/OgProfile/3.vue"
import OgProfile4 from "~/components/OgProfile/4.vue"
import OgProfile5 from "~/components/OgProfile/5.vue"
import OgProfile6 from "~/components/OgProfile/6.vue"
import OgProfile7 from "~/components/OgProfile/7.vue"
import OgProfile8 from "~/components/OgProfile/8.vue"
import OgProfile9 from "~/components/OgProfile/9.vue"

const route = useRoute()


const randomCard = ref(null)



const cards = [
  OgProfile1,

  OgProfile3,
  OgProfile4,
  OgProfile5,
  OgProfile6,
  OgProfile7,
   OgProfile8,
   
]



// ============================
// FETCH PROPERTY
// ============================

const { data, pending, error } = await useAsyncData(
  `user-${route.query.id}`,
  async () => {

    const userid = route.params.id

    if (!userid) {
     
      
      return null
    }

   
    
    const res = await useApiFetch(
      `/profile/og/${userid}`
    )

 
    if (!res.success) {
      throw new Error(
        res.message || "Failed"
      )
    }

      console.log(res.data?.data);

    return res.data?.data || null

  },

  {
    server:true,
    lazy:false
  }

)

// ============================
// SELECT TEMPLATE
// ============================
// wait until data is available
onMounted(async()=>{
  randomCard.value =  cards[ Math.floor(  Math.random() * cards.length)]
})



</script>