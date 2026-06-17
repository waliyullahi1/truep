<script setup>
defineProps({

  image: {
    type: String,
    default: "/images/property.jpg"
  },

  logo: {
    type: String,
    default: "/images/abanise.png"
  },

  price: {
    type: String,
    default: "₦200,000/year"
  },


  website: {
    type: String,
    default: "abanise.com"
  },


  title: {
    type: String,
    default: "Abanise Property"
  },


  descrip: {
    type: String,
    default:
      "Find verified properties around you. Connect with trusted agents and property owners quickly and securely."
  },


  bottomTitle: {
    type: String,
    default: "Find Verified Hostels & Properties"
  },


  features: {
    type: Array,
    default: () => []
  }

})
</script>


<template>

<div class="og-card">


  <!-- Background -->
  <div class="background"></div>


  <!-- Accent -->
  <div class="top-line"></div>



  <div class="content">


    <!-- IMAGE -->

    <div class="image-wrapper">


      <div class="image-card">


        <img
          :src="image"
          class="property-image"
        />



        <!-- logo -->

        <div class="logo-box">

          <img
            :src="logo"
            class="logo-image"
          />

        </div>



      </div>


    </div>





    <!-- TEXT -->

    <div class="text-content">


      <div class="website">

        {{ website }}

      </div>




      <h1 class="title">

        {{ title }}

      </h1>





      <div class="price">

        {{ price }}

      </div>





      <p class="description">

        {{ descrip.slice(0,180) }}

      </p>





      <div class="features">


        <span
          v-for="item in features"
          :key="item"
          class="feature"
        >

          ✓ {{ item }}

        </span>


      </div>





      <div class="button">

        Visit Website

      </div>



    </div>



  </div>






  <!-- FOOTER -->


  <div class="footer">


    <div class="footer-domain">

      {{ website }}

    </div>



    <div class="footer-title">

      {{ bottomTitle }}

    </div>



  </div>



</div>


</template>





<style scoped>


/* ==========================
ROOT OG SIZE
========================== */


.og-card{

  width:1200px;

  height:630px;

  position:relative;

  overflow:hidden;

  background:white;

  font-family:
  Inter,
  Arial,
  sans-serif;

}





/* ==========================
BACKGROUND
========================== */


.background{

 position:absolute;

 inset:0;


 background:

 radial-gradient(
 circle at top right,
 rgba(109,40,217,.15),
 transparent 35%
 ),


 radial-gradient(
 circle at bottom left,
 rgba(109,40,217,.08),
 transparent 40%
 ),


 white;

}





.top-line{

 height:8px;

 width:100%;

 background:#6d28d9;

}







/* ==========================
MAIN
========================== */


.content{


 height:532px;


 display:flex;


 align-items:center;


 gap:70px;


 padding:0 70px;


 position:relative;


 z-index:2;


}





/* ==========================
IMAGE
========================== */


.image-wrapper{

 flex-shrink:0;

}





.image-card{


 width:360px;

 height:360px;


 border-radius:35px;


 overflow:hidden;


 position:relative;


 box-shadow:
 0 30px 70px rgba(0,0,0,.15);


 background:white;


}





.property-image{


 width:100%;


 height:100%;


 object-fit:cover;


}






.logo-box{


 position:absolute;


 left:20px;


 bottom:20px;


 width:95px;


 height:95px;


 background:white;


 border-radius:22px;


 padding:12px;


 display:flex;


 align-items:center;


 justify-content:center;


 box-shadow:
 0 10px 30px rgba(0,0,0,.15);


}




.logo-image{


 width:100%;


 height:100%;


 object-fit:contain;


}









/* ==========================
TEXT
========================== */


.text-content{


 flex:1;


}




.website{


 display:inline-flex;


 background:#f3f4f6;


 color:#374151;


 padding:10px 20px;


 border-radius:999px;


 font-size:20px;


 margin-bottom:20px;


}





.title{


 font-size:38px;


 line-height:1.15;


 font-weight:900;


 color:#111827;


 width:560px;


 margin:0;


}




.price{


 margin-top:18px;


 display:inline-flex;


 background:#6d28d9;


 color:white;


 padding:12px 25px;


 border-radius:999px;


 font-size:28px;


 font-weight:900;


}






.description{


 margin-top:20px;


 width:560px;


 color:#4b5563;


 font-size:22px;


 line-height:1.45;


}






.features{


 display:flex;


 gap:10px;


 flex-wrap:wrap;


 margin-top:18px;


}





.feature{


 background:#f3f4f6;


 color:#374151;


 padding:8px 16px;


 border-radius:999px;


 font-size:18px;


 font-weight:600;


}







.button{


 margin-top:25px;


 width:220px;


 height:60px;


 border-radius:999px;


 background:#111827;


 color:white;


 display:flex;


 align-items:center;


 justify-content:center;


 font-size:21px;


 font-weight:700;


}


@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Regular.ttf") format("truetype");
}




/* ==========================
FOOTER
========================== */


.footer{


 position:absolute;


 bottom:0;


 left:0;


 right:0;


 height:90px;


 background:#f8fafc;


 border-top:1px solid #e5e7eb;


 display:flex;


 align-items:center;


 justify-content:space-between;


 padding:0 40px;


}





.footer-domain{


 font-size:22px;


 color:#6b7280;


 font-weight:600;


}




.footer-title{


 font-size:30px;


 font-weight:900;


 color:#111827;


}




</style>