<template>
  <div class="my-20 relative">

    <!-- Image Section -->
    <div class="absolute  hidden md:block z-10 w-3/5 top-2">
      <div
        class=" h-96 rounded-2xl overflow-hidden bg-cover bg-center"
        :style="{ backgroundImage: `url(/images/${image})` }"
      ></div>
    </div>

    <!-- Content Section -->
    <div class="relative  z-10  block sm:flex justify-between items-center pt-9">

      <div
        :style="{ backgroundImage: `url(/images/${image})` }"
        class="md:w-2/5 rounded-xl   md:hidden block h-52 bg-cover w-full">

      </div>
      <div
        
        class="md:w-2/5 rounded-xl   md:block hidden  h-52 bg-cover w-full">

      </div>

      <div class="md:w-3/5 w-full  text-white">
        <div
          class="flex flex-col justify-center space-y-6 p-6 rounded-2xl  h-52  md:h-80"
          :style="{ background: bg }"
        >
          <UiTypographyH2 class="text-white">
            {{ heading }}
          </UiTypographyH2>

          <div class="w-1/3 bg-white h-1 my-2"></div>

          <UiTypographyP>
            {{ description }}
          </UiTypographyP>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    heading: {
      type: String,
      default: "WELCOMING AMBIENCE",
    },
    description: {
      type: String,
      default:
        "Parents are amazed at the quality of content that their children are exposed to. We ensure that children can compete with their peers anywhere around the world.",
    },
    bg: {
      type: String,
      default: "#250372",
    },
    image: {
      type: String,
      default: "0003.png",
    },
  },
};
</script>
