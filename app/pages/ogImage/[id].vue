<template>

  <div v-if="data">

  

    <component
      v-if="randomCard"
      :is="randomCard"

      :image="
        data?.media?.files?.[0]?.url ||
        '/images/property.jpg'
      "

      :price="
        `${data?.pricing?.price || ''}/${data?.pricing?.paymentType || ''}`
      "

      website="abanise.com"

      :title="data?.title || ''"

      :descrip="data?.description || ''"

      :bottomTitle="data?.title || ''"

      :features="
        data?.features?.map(f => f.label) || []
      "

    />

  </div>

</template>


<script setup>



import { ref, watch } from "vue"

import OgPropertyCardOne from "~/components/OgPropertyCard/One.vue"
import OgPropertyCardTwo from "~/components/OgPropertyCard/Two.vue"
import OgPropertyCardThree from "~/components/OgPropertyCard/Three.vue"
import OgPropertyCardFour from "~/components/OgPropertyCard/Four.vue"
import OgPropertyCardFive from "~/components/OgPropertyCard/Five.vue"



const route = useRoute()


const randomCard = ref(null)



const cards = [
  OgPropertyCardOne,
  OgPropertyCardTwo,
  OgPropertyCardThree,
  OgPropertyCardFour,
  OgPropertyCardFive
]



// ============================
// FETCH PROPERTY
// ============================

const { data, pending, error } = await useAsyncData(
  `property-${route.query.id}`,
  async () => {

    const propertyId = route.params.id

    if (!propertyId) {
      console.log(propertyId);
      
      return null
    }


    const res = await useApiFetch(
      `/property/${propertyId}`
    )


    if (!res.success) {
      throw new Error(
        res.message || "Failed"
      )
    }


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

const setTemplate = ()=>{


  const savedTemplate =
    data.value?.ogimage?.previews_template



  if(savedTemplate){


    const existingCard =
      cards.find(
        card => card.name === savedTemplate
      )


    if(existingCard){

      randomCard.value = existingCard
      return

    }

  }



  randomCard.value =
    cards[
      Math.floor(
        Math.random() * cards.length
      )
    ]

}



// wait until data is available
watch(
  data,
  (value)=>{

    if(value){
      setTemplate()
    }

  },
  {
    immediate:true
  }
)


</script>