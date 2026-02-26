<template>
  <div class="card-container">
    <div class="card">
      <!-- Front -->
      <div
        class="card-face front"
        :style="{ background: frontBg, color: frontTextColor }"
      >
      <div class= "flex flex-col items-center justify-center space-y-4"> 
         <img src="@/assets/images/school_icon.svg" class="w-20" alt="school icon" />
       <div><p>{{ title }}</p></div> 
      </div>
     
      </div>

      <!-- Back -->
      <div
        class="card-face back"
        :style="{ background: backBg, color: backTextColor }"
      >
      <div>
         <p class="pb-4">{{ title }}</p>
        <p class=" font-normal text-sm pb-6">{{ description }}</p>
       <UiButtonsTertiary>  <span class="text-white">Apply Now</span></UiButtonsTertiary>
        
      </div>
     
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlipCard",
  props: {
    title: {
      type: String,
      default: "Welcome",
    },
    description: {
      type: String,
      default: "Welcome to our platform!",
    },
    frontBg: {
      type: String,
      default: "#4f46e5", // Indigo
    },
    backBg: {
      type: String,
      default: "#ffffff", // White
    },
    frontTextColor: {
      type: String,
      default: "#ffffff",
    },
    backTextColor: {
      type: String,
      default: "#ffffff",
    },
  },
};
</script>

<style scoped>
.card-container {
  perspective: 1000px;
  width: 100%;
  height: 300px;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.7s ease;
}

.card-container:hover .card {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
}

/* Front */
.front {
  color: white;
}

/* Back */
.back {
  transform: rotateY(180deg);
}
</style>
