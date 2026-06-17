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
    default:"Modern Hostel Apartment Near University"
  },

  location:{
    type:String,
    default:"Benin City, Edo State"
  },

  price:{
    type:String,
    default:"₦250,000 / Year"
  },


  propertyType:{
    type:String,
    default:"Student Hostel"
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


  <!-- IMAGE -->

  <div class="image-side">


    <img
      :src="image"
      class="property-image"
    />


    <div class="image-overlay"></div>



    <div class="website">

      {{ website }}

    </div>




    <div class="price">

      {{ price }}

    </div>


  </div>







  <!-- CONTENT -->

  <div class="content-side">


    <div class="type">

      {{ propertyType }}

    </div>




    <h1>

      {{ title }}

    </h1>




    <div class="location">

      📍 {{ location }}

    </div>




    <div class="line"></div>





    <div class="features">


      <span
        v-for="item in features"
        :key="item"
      >

      ✓ {{ item }}

      </span>


    </div>





    <div class="brand">


      <div class="logo">

        A

      </div>


      <div>

        <strong>
          Abanise
        </strong>

        <small>
          Verified Property Marketplace
        </small>

      </div>


    </div>



  </div>


</div>


</template>





<style scoped>


/* ======================
OG SIZE
====================== */


.og-card{

width:1200px;

height:630px;

display:flex;

background:white;

overflow:hidden;

font-family:
Inter,
Arial,
sans-serif;

}





/* ======================
IMAGE
====================== */


.image-side{


width:58%;


height:100%;


position:relative;


}





.property-image{


width:100%;


height:100%;


object-fit:cover;


}





.image-overlay{


position:absolute;


inset:0;


background:
linear-gradient(
180deg,
transparent 40%,
rgba(0,0,0,.45)
);


}





.website{


position:absolute;


top:45px;


left:45px;


background:white;


color:#111827;


padding:12px 25px;


border-radius:999px;


font-size:22px;


font-weight:700;


}





.price{


position:absolute;


bottom:45px;


left:45px;


background:#7c3aed;


color:white;


padding:16px 30px;


border-radius:18px;


font-size:32px;


font-weight:900;


}






/* ======================
CONTENT
====================== */


.content-side{


width:42%;


padding:55px;


display:flex;


flex-direction:column;


justify-content:center;


}






.type{


display:inline-flex;


width:max-content;


padding:10px 18px;


border-radius:999px;


background:#ede9fe;


color:#6d28d9;


font-size:18px;


font-weight:800;


margin-bottom:25px;


}

@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Regular.ttf") format("truetype");
}



h1{


font-size:32px;


line-height:1.08;


font-weight:900;


color:#111827;


margin:0;


}





.location{


font-size:24px;


color:#6b7280;


margin-top:22px;


}





.line{


height:5px;


width:80px;


background:#111827;


border-radius:999px;


margin:30px 0;


}






.features{


display:flex;


flex-wrap:wrap;


gap:12px;


}





.features span{


background:#f3f4f6;


padding:10px 16px;


border-radius:999px;


font-size:17px;


font-weight:700;


color:#374151;


}






/* ======================
BRAND
====================== */


.brand{


display:flex;


align-items:center;


gap:15px;


margin-top:45px;


}




.logo{


width:60px;


height:60px;


border-radius:18px;


background:#7c3aed;


color:white;


display:flex;


align-items:center;


justify-content:center;


font-size:35px;


font-weight:900;


}





.brand strong{


display:block;


font-size:26px;


color:#111827;


}





.brand small{


font-size:16px;


color:#6b7280;


}





</style>