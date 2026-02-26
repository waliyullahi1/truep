<template>
  <div class="relative w-full max-w-4xl mx-auto p-5">
    <!-- Slider container -->
    <div class="overflow-hidden">
      <div
        class="flex"
        :style="{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: transitioning ? 'transform 0.5s ease' : 'none'
        }"
        @transitionend="onTransitionEnd"
      >
        <!-- Clone last item at start -->
        <div
          class="flex-none w-full p-6 space-y-3 rounded-lg shadow-md "
        >
          <p class="text-gray-800 text-base leading-relaxed">
            {{ reviewsList[reviewsList.length - 1].text }}
          </p>
          <h3 class="text-gray-900 font-semibold">
            {{ reviewsList[reviewsList.length - 1].name }}
          </h3>
          <div class="flex items-center gap-2">
            <div class="text-yellow-500 text-xl">
              <span v-for="n in 5" :key="n">
                {{ n <= Math.round(reviewsList[reviewsList.length - 1].rating) ? '★' : '☆' }}
              </span>
            </div>
            <span class="text-gray-700 font-medium">
              {{ reviewsList[reviewsList.length - 1].rating }}/5
            </span>
          </div>
        </div>

        <!-- Real items -->
        <div
          v-for="(review, index) in reviewsList"
          :key="index"
          class="flex-none w-full p-6 space-y-3 rounded-lg shadow-md bg-gray-100"
        >
          <p class="text-gray-800 text-base leading-relaxed">{{ review.text }}</p>
          <h3 class="text-gray-900 font-semibold">{{ review.name }}</h3>
          <div class="flex items-center gap-2">
            <div class="text-yellow-500 text-xl">
              <span v-for="n in 5" :key="n">
                {{ n <= Math.round(review.rating) ? '★' : '☆' }}
              </span>
            </div>
            <span class="text-gray-700 font-medium">{{ review.rating }}/5</span>
          </div>
        </div>

        <!-- Clone first item at end -->
        <div
          class="flex-none w-full p-6 space-y-3 rounded-lg shadow-md bg-gray-100"
        >
          <p class="text-gray-800 text-base leading-relaxed">{{ reviewsList[0].text }}</p>
          <h3 class="text-gray-900 font-semibold">{{ reviewsList[0].name }}</h3>
          <div class="flex items-center gap-2">
            <div class="text-yellow-500 text-xl">
              <span v-for="n in 5" :key="n">
                {{ n <= Math.round(reviewsList[0].rating) ? '★' : '☆' }}
              </span>
            </div>
            <span class="text-gray-700 font-medium">{{ reviewsList[0].rating }}/5</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation buttons -->
    <button
      class="absolute top-1/2 -translate-y-1/2 left-2 bg-gray-800 text-white p-2 rounded-full shadow"
      @click="prevSlide"
    >
      ‹
    </button>
    <button
      class="absolute top-1/2 -translate-y-1/2 right-2 bg-gray-800 text-white p-2 rounded-full shadow"
      @click="nextSlide"
    >
      ›
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const reviewsList = ref([
  {
    text: "My experience with Trademax was outstanding. As a first-time business owner, I wasn’t familiar with the trademark process, but their team walked me through everything with clarity and professionalism. Because of their support, my brand is now properly secured.",
    name: "Sam Martinez",
    rating: 4.9
  },
  {
    text: "The Trademax Platinum package truly impressed me. They didn’t just file my trademark—they also handled ongoing monitoring and provided renewal reminders to keep everything on track. Their personalized guidance and legal insight gave me complete confidence that my intellectual property was well protected.",
    name: "Jessica Lee",
    rating: 5
  },
  {
    text: "I went with Trademax because of their strong reputation for dependable service, and they definitely lived up to it. Their team was knowledgeable, patient, and made the trademark process easy to understand. Their quick and effective response to a USPTO office action helped my application get approved without delays.",
    name: "Michael Brown",
    rating: 4.5
  },

  // NEW REVIEWS
  {
    text: "Trademax provided exceptional service from start to finish. They carefully reviewed my documents and made sure everything met USPTO standards. Their communication was always clear and timely, making the entire process stress-free.",
    name: "Ava Thompson",
    rating: 4.8
  },
  {
    text: "I was impressed by how thorough and organized the Trademax team was. They conducted a detailed search for potential conflicts before filing and kept me updated throughout the process. Their professionalism gave me full confidence in my trademark protection.",
    name: "Daniel Carter",
    rating: 5
  },
  {
    text: "From the moment I contacted Trademax, I felt supported. They simplified the legal steps and ensured I understood what to expect. Their guidance helped my trademark get approved smoothly. I highly recommend their services to any business owner.",
    name: "Emily Johnson",
    rating: 4.7
  }
]);

// Start at 1 (first real item)
const currentIndex = ref(1);
const transitioning = ref(true);

const nextSlide = () => {
  if (!transitioning.value) return;
  transitioning.value = true;
  currentIndex.value++;
};

const prevSlide = () => {
  if (!transitioning.value) return;
  transitioning.value = true;
  currentIndex.value--;
};

const onTransitionEnd = () => {
  // Disable transition temporarily
  transitioning.value = false;

  if (currentIndex.value === 0) {
    // Jump to last real item
    currentIndex.value = reviewsList.value.length;
  } else if (currentIndex.value === reviewsList.value.length + 1) {
    // Jump to first real item
    currentIndex.value = 1;
  }

  // Force reflow
  void document.body.offsetHeight;

  // Re-enable transition
  transitioning.value = true;
};
</script>

<style scoped>
/* Optional: smooth text and layout */
</style>
