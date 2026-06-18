<template>

  <div v-if="data">
    {{ data }}
    <div class="og-card">

      <component
        v-if="randomCard"
        :is="randomCard"
        :propertyType="data?.category"
        :image="
          data?.media?.files?.[0]?.url ||
          '/images/property.jpg'
        "
       :user="data?.userId"
        :price="
          `${data?.pricing?.price || ''}/${data?.pricing?.paymentType || ''}`
        "

        website="abanise.com"

        :title="data?.title || ''"
        :location = "`${data?.location.state}, ${data?.location.city}, ${data?.location.address}`"
        :descrip="data?.description || ''"

        :bottomTitle="data?.title || ''"

        :features="
          data?.features?.map(f => f.label) || []
        "

      />

    </div>

  </div>

</template>


<script setup>



import { ref, watch } from "vue"

import OgPropertyCardOne from "~/components/OgPropertyCard/One.vue"
import OgPropertyCardTwo from "~/components/OgPropertyCard/Two.vue"
import OgPropertyCardThree from "~/components/OgPropertyCard/Three.vue"
import OgPropertyCardFour from "~/components/OgPropertyCard/Four.vue"
import OgPropertyCardFive from "~/components/OgPropertyCard/Five.vue"
import OgPropertyCardSix from "~/components/OgPropertyCard/Six.vue"
import OgPropertyCardSeven from "~/components/OgPropertyCard/Seven.vue"

const route = useRoute()


const randomCard = ref(null)



const cards = [
  OgPropertyCardOne,
  OgPropertyCardTwo,
  OgPropertyCardThree,
  OgPropertyCardFour,
  OgPropertyCardFive,
  OgPropertyCardSix,
  OgPropertyCardSeven,
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
      `/property/og/${propertyId}`
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