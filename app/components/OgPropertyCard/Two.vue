
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

  descrip: {
    type: String,
    default:
      "Find verified properties around your area. Connect with trusted agents and property owners quickly and securely."
  },

  features: {
    type: Array,
    default: () => [
      "Water Supply",
      "Security",
      "Parking",
      "WiFi"
    ]
  }
})
</script>

<template>
  <div class="og-card">

    <!-- Left Image -->
    <div class="image-wrapper">

      <img
        :src="image"
        alt=""
        class="property-image"
      />

      <div class="price-badge">
        {{ price }}
      </div>

    </div>

    <!-- Right Content -->
    <div class="content">

      <div class="website-pill">
        {{ website }}
      </div>

      <h1>
        {{ title }}
      </h1>

      <div class="location">
        📍 {{ location }}
      </div>

      <div class="features">

        <span
          v-for="feature in features"
          :key="feature"
          class="feature"
        >
          {{ feature }}
        </span>

      </div>

      <p class="description">
        {{ descrip.slice(0, 140) }}
      </p>

      <button>
        View Property
      </button>

    </div>

    <!-- Bottom Strip -->
    <div class="bottom-strip"></div>

  </div>
</template>

<style scoped>
.og-card{
  width:1200px;
  height:630px;

  background:#f8f7f5;

  overflow:hidden;

  position:relative;

  display:flex;

  align-items:center;

  padding:0 80px;

  font-family:
    Inter,
    Arial,
    sans-serif;
}

/* ======================
   IMAGE
====================== */
@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Regular.ttf") format("truetype");
}
.image-wrapper{

  width:420px;
  height:420px;

  border-radius:32px;

  overflow:hidden;

  transform:rotate(-6deg);

  flex-shrink:0;

  position:relative;

  background:white;

  box-shadow:
    0 30px 60px rgba(0,0,0,.08);
}

.property-image{

  width:100%;
  height:100%;

  object-fit:cover;

  transform:rotate(6deg) scale(1.1);
}

.price-badge{

  position:absolute;

  top:20px;
  left:20px;

  background:white;

  color:black;

  padding:12px 20px;

  border-radius:999px;

  font-size:20px;

  font-weight:800;

  box-shadow:
    0 10px 20px rgba(0,0,0,.12);
}

/* ======================
   CONTENT
====================== */

.content{

  margin-left:90px;

  max-width:560px;
}

.website-pill{

  display:inline-flex;

  align-items:center;

  justify-content:center;

  padding:10px 22px;

  border-radius:999px;

  background:#e5e5e5;

  color:#555;

  font-size:18px;

  font-weight:600;

  margin-bottom:25px;
}

h1{

  font-size:30px;

  line-height:1.05;

  font-weight:900;

  color:#000;

  margin:0;
}

.location{

  margin-top:20px;

  font-size:22px;

  color:#555;

  font-weight:500;
}

.features{

  display:flex;

  flex-wrap:wrap;

  gap:10px;

  margin-top:22px;
}

.feature{

  padding:10px 16px;

  border-radius:999px;

  background:#ececec;

  color:#444;

  font-size:15px;

  font-weight:600;
}

.description{

  margin-top:24px;

  width:560px;

  font-size:20px;

  line-height:1.5;

  color:#4b5563;
}

button{

  margin-top:30px;

  width:200px;

  height:62px;

  border:none;

  border-radius:999px;

  background:black;

  color:white;

  font-size:20px;

  font-weight:700;

  cursor:pointer;

  box-shadow:
    0 12px 24px rgba(0,0,0,.15);
}

/* ======================
   BOTTOM
====================== */

.bottom-strip{

  position:absolute;

  left:0;
  bottom:0;

  width:100%;

  height:14px;

  background:#ececec;
}
</style>

