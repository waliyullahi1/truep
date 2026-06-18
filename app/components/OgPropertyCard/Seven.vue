<script setup>

defineProps({

  image:{
    type:String,
    default:"/images/property.jpg"
  },

  website:{
    type:String,
    default:"abanise.com"
  },

  title:{
    type:String,
    default:"Luxury 3 Bedroom Apartment"
  },

  location:{
    type:String,
    default:"Abuja, Nigeria"
  },

  price:{
    type:String,
    default:"₦5,000,000 / Year"
  },

  propertyType:{
    type:String,
    default:"Apartment"
  },

  user:{
    type:Object,
    default:()=>({
      firstName:"Waliu",
      lastName:"Agent",
      avatar:""
    })
  },

  features:{
    type:Array,
    default:()=>[
      "3 Bedrooms",
      "2 Bathrooms",
      "Parking",
      "Security"
    ]
  }

})

</script>


<template>

<div
class="og-card"
:style="{
 backgroundImage:`url(${image})`
}"
>


<div class="dark"></div>


<div class="top">




<div class="type">
{{propertyType}}
</div>


</div>



<div class="body">


<h1>
{{title}}
</h1>


<div class="location">
📍 {{location}}
</div>



<div class="features">

<span
v-for="f in features.slice(0,4)"
:key="f"
>
{{f}}
</span>

</div>


</div>



<div class="price">

{{price}}

</div>



<div class="agent">


<div class="avatar">

<img
v-if="user?.avatar"
:src="user.avatar"
/>

<span v-else>
{{user?.firstName?.[0]}}
</span>


</div>



<div>

<h3>
{{user.firstName}} {{user.lastName}}
</h3>


<p>
Verified Property Agent
</p>

</div>



<button>
View Property
</button>


</div>



</div>


</template>



<style scoped>


.og-card{

width:1200px;
height:630px;

position:relative;

overflow:hidden;

background-size:cover;
background-position:center;

font-family:
Arial,
sans-serif;

}



/* image overlay */

.dark{

position:absolute;
inset:0;

background:
linear-gradient(
180deg,
rgba(0,0,0,.25),
rgba(0,0,0,.85)
);

}



/* top */

.top{

position:absolute;

top:50px;
left:60px;
right:60px;

display:flex;
justify-content:space-between;

z-index:2;

}



.logo-text{

font-size:34px;

font-weight:900;

color:white;

letter-spacing:3px;

}



.type{

background:white;

color:#111827;

padding:14px 30px;

border-radius:50px;

font-weight:800;

font-size:20px;

}



/* body */


.body{

position:absolute;

left:70px;

bottom:210px;

width:700px;

z-index:2;

}



h1{

font-size:58px;

line-height:1;

color:white;

margin:0;

font-weight:900;

}



.location{

margin-top:25px;

font-size:22px;

color:white;

}



.features{

display:flex;

gap:12px;

margin-top:30px;

}


.features span{

padding:12px 22px;

background:
rgba(255,255,255,.15);

border-radius:50px;

color:white;

font-size:17px;

backdrop-filter:blur(10px);

}



/* price */


.price{

position:absolute;

right:70px;

top:150px;

z-index:2;


background:#22c55e;

color:white;


padding:25px 40px;


font-size:30px;

font-weight:900;


border-radius:25px;


box-shadow:
0 20px 50px rgba(0,0,0,.4);

}




/* agent */


.agent{

position:absolute;

left:55px;

right:55px;

bottom:45px;


height:110px;


background:white;


border-radius:30px;


display:flex;

align-items:center;


padding:0 25px;


gap:20px;


z-index:3;

}



.avatar{

width:75px;

height:75px;


border-radius:50%;


overflow:hidden;


background:#16a34a;


display:flex;

justify-content:center;

align-items:center;


color:white;

font-size:35px;

font-weight:900;

}



.avatar img{

width:100%;
height:100%;

object-fit:cover;

}



.agent h3{

margin:0;

font-size:25px;

color:#111827;

}



.agent p{

margin:5px 0 0;

color:#6b7280;

font-size:16px;

}



button{


margin-left:auto;


background:#111827;


color:white;


border:none;


padding:20px 45px;


border-radius:50px;


font-size:20px;


font-weight:800;


}


</style>