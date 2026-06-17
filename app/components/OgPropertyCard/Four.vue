<script setup>

defineProps({

  image:{
    type:String,
    default:"/images/hostel.jpg"
  },


  website:{
    type:String,
    default:"abanise.com"
  },


  title:{
    type:String,
    default:"Luxury Student Hostel Near University"
  },


  location:{
    type:String,
    default:"Benin City, Edo State"
  },


  price:{
    type:String,
    default:"₦250,000 / Year"
  },


  type:{
    type:String,
    default:"Hostel"
  },


  features:{
    type:Array,
    default:()=>[
      "WiFi",
      "Security",
      "Water",
      "Parking"
    ]
  }


})

</script>



<template>

<div class="og-card">


  <!-- Background Image -->

  <img
    :src="image"
    class="background-image"
  />



  <!-- Overlay -->

  <div class="overlay"></div>





  <!-- Website -->

  <div class="website">

    {{ website }}

  </div>





  <!-- Price -->

  <div class="price">

    {{ price }}

  </div>






  <!-- Content Card -->


  <div class="info-card">


    <div class="type">

      {{ type }}

    </div>




    <h1>

      {{ title }}

    </h1>





    <p class="location">

      📍 {{ location }}

    </p>





    <div class="features">


      <span
        v-for="item in features"
        :key="item"
      >

        ✓ {{ item }}

      </span>


    </div>



  </div>






  <!-- Footer -->


  <div class="footer">

    <strong>
      Abanise
    </strong>

    <span>
      Verified Property Marketplace
    </span>

  </div>



</div>


</template>








<style scoped>


/* ============================
FIXED OG SIZE
============================ */


.og-card{


 width:1200px;


 height:630px;


 position:relative;


 overflow:hidden;


 font-family:
 Inter,
 Arial,
 sans-serif;


 color:white;


}






/* ============================
BACKGROUND
============================ */


.background-image{


 position:absolute;


 inset:0;


 width:100%;


 height:100%;


 object-fit:cover;


}






.overlay{


 position:absolute;


 inset:0;


 background:
 linear-gradient(
 90deg,
 rgba(0,0,0,.75),
 rgba(0,0,0,.25)
 );


}








/* ============================
WEBSITE
============================ */


.website{


 position:absolute;


 top:45px;


 left:55px;


 background:white;


 color:#111827;


 padding:12px 24px;


 border-radius:999px;


 font-size:22px;


 font-weight:700;


 z-index:2;


}







/* ============================
PRICE
============================ */


.price{


 position:absolute;


 right:55px;


 top:45px;


 background:#7c3aed;


 color:white;


 padding:15px 30px;


 border-radius:999px;


 font-size:30px;


 font-weight:900;


 z-index:2;


}







/* ============================
INFO
============================ */


.info-card{


 position:absolute;


 left:55px;


 bottom:110px;


 width:700px;


 padding:35px;


 border-radius:30px;


 background:
 rgba(255,255,255,.15);


 backdrop-filter:blur(12px);


 border:
 1px solid rgba(255,255,255,.25);



 z-index:2;


}







.type{


 display:inline-flex;


 background:white;


 color:#111827;


 padding:8px 18px;


 border-radius:999px;


 font-size:18px;


 font-weight:700;


 margin-bottom:18px;


}







h1{


 font-size:52px;


 line-height:1.05;


 font-weight:900;


 margin:0;


}







.location{


 font-size:25px;


 margin-top:20px;


 color:#f3f4f6;


}








.features{


 display:flex;


 gap:12px;


 margin-top:25px;


 flex-wrap:wrap;


}






.features span{


 background:white;


 color:#111827;


 padding:10px 18px;


 border-radius:999px;


 font-size:18px;


 font-weight:700;


}







/* ============================
FOOTER
============================ */

@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Regular.ttf") format("truetype");
}
.footer{


 position:absolute;


 bottom:0;


 left:0;


 right:0;


 height:80px;


 background:white;


 color:#111827;


 display:flex;


 align-items:center;


 justify-content:space-between;


 padding:0 55px;


 z-index:3;


}




.footer strong{


 font-size:32px;


}




.footer span{


 font-size:22px;


 color:#6b7280;


}




</style>