<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-900">

    <div class="group perspective-1000 w-80 h-48">
      <div
        class="relative w-full h-full transition-transform duration-700 transform-style-preserve group-hover:rotate-y-180"
      >
        <!-- Front Side -->
        <div
          class="absolute inset-0 flex items-center justify-center bg-indigo-600 text-white text-2xl font-bold rounded-xl backface-hidden"
        >
          Welcome 👋
        </div>

        <!-- Back Side -->
        <div
          class="absolute inset-0 flex items-center justify-center bg-white text-gray-800 text-center p-6 rounded-xl rotate-y-180 backface-hidden"
        >
          <p>
            Welcome to our platform!  
            Explore, learn, and enjoy your experience 🚀
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "WelcomeCard"
};
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-preserve {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
