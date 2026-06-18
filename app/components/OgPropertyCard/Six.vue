
<script setup>

const props = defineProps({

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
    default:"Modern 3 Bedroom Apartment For Rent"
  },

  location:{
    type:String,
    default:"Ilorin, Kwara State"
  },

  price:{
    type:String,
    default:"₦1,200,000 / Year"
  },

  propertyType:{
    type:String,
    default:"Apartment"
  },
  user:{
    type: Object,
    default:{
        firstName: "waliu",
        lastName:'Soliu',
        avatar: "",
    }
  },

  features:{
    type:Array,
    default:()=>[
      "Security",
      "Water",
      "Parking",
      "WiFi"
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

  <div class="overlay"></div>

  <div class="glass-frame"></div>

  <!-- Top Bar -->

  <div class="top-bar">

    <div class="property-type">
      {{ propertyType }}
    </div>

    <div class="site-pill">
      {{ website }}
    </div>

  </div>

  <!-- Main Content -->

  <div class="content">

    <div class="title-wrap">

      <h1>
        {{ title }}
      </h1>

    </div>

    <div class="location">

      📍 {{ location }}

    </div>

    <div class="features">

      <span
        v-for="item in features.slice(0,4)"
        :key="item"
      >
        {{ item }}
      </span>

    </div>

  </div>

  <!-- Price Card -->

  <div class="price-card">

    {{ price }}

  </div>

  <!-- Bottom CTA -->

  <div class="bottom-panel">

    <div class="brand">

      <div class="logo">
        <img v-if="user?.avatar" :src="user?.avatar" alt="" srcset="">
        <span v-else >{{ user?.firstName[0] }}</span> 
      </div>

      <div>

        <strong>
           {{user?.firstName}}  {{user?.lastName}}
        </strong>

        <small>
          Verified Property Marketplace
        </small>

      </div>

    </div>

    <div class="cta">

      View Property

    </div>

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
  Inter,
  Arial,
  sans-serif;

}

/* Dark Overlay */

.overlay{

  position:absolute;
  inset:0;

  background:
  linear-gradient(
    120deg,
    rgba(0,0,0,.88) 0%,
    rgba(0,0,0,.50) 40%,
    rgba(0,0,0,.15) 100%
  );

}

/* Rounded Frame */

.glass-frame{

  position:absolute;

  top:35px;
  left:35px;
  right:35px;
  bottom:35px;

  border-radius:45px;

  border:2px solid rgba(255,255,255,.12);

}

/* Top */

.top-bar{

  position:absolute;

  top:45px;
  left:55px;
  right:55px;

  display:flex;
  justify-content:space-between;

  z-index:5;

}

.property-type{

  padding:14px 28px;

  border-radius:999px;

  background:rgba(255,255,255,.12);

  backdrop-filter:blur(15px);

  color:white;

  font-size:20px;
  font-weight:700;

}

.site-pill{

  padding:14px 28px;

  border-radius:999px;

  background:white;

  color:#111827;

  font-size:20px;
  font-weight:800;

}

/* Main Content */

.content{

  position:absolute;

  left:70px;
  top:140px;

  width:720px;

  z-index:5;

}

.title-wrap{

  max-width:700px;

}

h1{

  margin:0;

  color:white;

  font-size:50px;

  line-height:1;

  font-weight:900;

  text-shadow:
  0 8px 25px rgba(0,0,0,.4);

}

.location{

  margin-top:25px;

  color:white;

  font-size:18px;

  font-weight:600;

}

.features{

  margin-top:30px;

  display:flex;

  flex-wrap:wrap;

  gap:12px;

}

.features span{

  padding:12px 20px;

  border-radius:999px;

  background:rgba(255,255,255,.14);

  border:1px solid rgba(255,255,255,.15);

  backdrop-filter:blur(15px);

  color:white;

  font-size:17px;

  font-weight:600;

}

/* Price */

.price-card{

  position:absolute;

  right:70px;
  top:120px;

  z-index:5;

  padding:18px 35px;

  border-radius:22px;

  background:#fbbf24;

  color:#111827;

  font-size:24px;

  font-weight:900;

  box-shadow:
  0 15px 40px rgba(0,0,0,.35);

}

/* Bottom */

.bottom-panel{

  position:absolute;

  left:55px;
  right:55px;
  bottom:55px;

  height:95px;

  background:white;

  border-radius:999px;

  display:flex;

  justify-content:space-between;

  align-items:center;

  padding:0 12px 0 18px;

  z-index:5;

}

.brand{

  display:flex;

  align-items:center;

  gap:16px;

}

.logo{

  width:68px;
  height:68px;

  border-radius:50%;

  background:#16a34a;

  color:white;

  display:flex;

  justify-content:center;
  align-items:center;

  font-size:34px;
  font-weight:900;

}

.brand strong{

  display:block;

  font-size:24px;

  color:#111827;

}

.brand small{

  color:#6b7280;

  font-size:15px;

}

.cta{

  height:72px;

  padding:0 40px;

  display:flex;

  align-items:center;

  border-radius:999px;

  background:#fbbf24;

  color:#111827;

  font-size:22px;

  font-weight:800;

}

</style>
```
