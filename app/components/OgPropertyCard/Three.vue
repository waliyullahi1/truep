<script setup>

defineProps({

  image: {
    type: String,
    default: "/images/hostel.jpg"
  },


  website: {
    type: String,
    default: "abanise.com"
  },


  title: {
    type: String,
    default: "MIXED HOSTEL FOR RENT NEAR EKSU EKITI"
  },


  location: {
    type: String,
    default: "Ado-Ekiti, Ekiti State"
  },


  price: {
    type: String,
    default: "₦250,000 / Session"
  },


  features: {
    type:Array,
    default:()=>[
      "Verified Listing",
      "Student Friendly",
      "Secure Area"
    ]
  },


  buttonText:{
    type:String,
    default:"View Property"
  }

})

</script>



<template>

<div class="og-card">


  <!-- IMAGE -->

  <div class="image-side">


    <img
      :src="image"
      alt="property"
    />



    <!-- PRICE -->

    <div class="price-badge">

      {{ price }}

    </div>


  </div>






  <!-- CONTENT -->


  <div class="content-side">


    <!-- WEBSITE -->

    <div class="website-pill">

      {{ website }}

    </div>





    <!-- TITLE -->


    <h1>

      {{ title }}

    </h1>






    <!-- LOCATION -->


    <p class="location">

      📍 {{ location }}

    </p>






    <div class="divider"></div>






    <!-- FEATURES -->


    <div class="features">


      <div
        v-for="item in features"
        :key="item"
        class="feature"
      >

        ✓ {{ item }}

      </div>


    </div>






    <!-- BUTTON -->


    <div class="cta">

      {{ buttonText }}

    </div>




  </div>





</div>


</template>







<style scoped>


/* =================================
OG SIZE
================================= */


.og-card{

  width:1200px;

  height:630px;


  display:flex;


  overflow:hidden;


  background:#f5f5f5;


  font-family:
  Inter,
  Arial,
  sans-serif;


}






/* =================================
IMAGE
================================= */


.image-side{


  width:52%;


  height:100%;


  position:relative;


}





.image-side img{


  width:100%;


  height:100%;


  object-fit:cover;


}





.price-badge{


  position:absolute;


  top:30px;


  left:30px;



  background:white;


  padding:14px 28px;


  border-radius:999px;



  font-size:28px;


  font-weight:900;


  color:#111;



  box-shadow:
  0 15px 35px rgba(0,0,0,.15);



}







/* =================================
CONTENT
================================= */


.content-side{


  flex:1;


  background:white;


  padding:70px 60px;


  display:flex;


  flex-direction:column;


  justify-content:center;


}







.website-pill{


  width:max-content;



  background:#f3f4f6;



  padding:10px 20px;



  border-radius:999px;



  color:#555;



  font-size:20px;



  margin-bottom:25px;



}








h1{


  font-size:42px;



  line-height:1.08;



  font-weight:900;



  color:#111827;



  margin:0;



}







.location{


  margin-top:20px;



  font-size:24px;



  color:#6b7280;



}







.divider{


  width:90px;



  height:6px;



  background:#111;



  border-radius:999px;



  margin:30px 0;



}








.features{


  display:flex;



  flex-wrap:wrap;



  gap:14px;



}


@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Regular.ttf") format("truetype");
}




.feature{


  background:#f3f4f6;



  padding:12px 20px;



  border-radius:999px;



  font-size:18px;



  font-weight:700;



  color:#374151;



}







.cta{


  margin-top:40px;



  width:230px;



  height:65px;



  background:#111827;



  color:white;



  border-radius:999px;



  display:flex;



  align-items:center;



  justify-content:center;



  font-size:23px;



  font-weight:800;



}





</style>