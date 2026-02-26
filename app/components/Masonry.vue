
<template>
  <div class="p-4">
    <Container>
      <div class="masonry">
        <div
          v-for="image in images"
          :key="image.id"
          class="masonry-item group relative overflow-hidden rounded-xl"
        >
          <!-- IMAGE -->
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full object-cover rounded-xl"
          />

          <!-- OVERLAY -->
          <div
            class="absolute inset-0  
                   group-hover:opacity-100 transition from-black/60 to-transparent duration-300
                   "
          >
            <div class="p-4 flex from-black/50 bg-gradient-to-t to-transparent  flex-col  justify-between h-full  text-white">
              <div class="text-sm -translate-y-10 group-hover:-translate-y-0 duration-200  w-full flex justify-between font-semibold">
                <UiTypographyP ><span class="  text-xs">{{ image.category }}</span></UiTypographyP>
                <img src="/image/icon/message.svg" alt="" class=" group-hover:scale-105 w-5" srcset="">
              </div>
              <div class="  leading-3">
                <p class="   text-xs/4  lea mt-1 text-gray-200">
               <strong>Service :</strong> {{image.service}} 
                  <br>
                <span class=" translate-y-16">By <strong>  {{image.provider}}</strong>  </span>
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup>

const images = [
 
  {
    id: 2,
    src: "/images/land2.jpg",
    alt: "Plumbing work",
    service: "Pipe Installation & Repair",
    provider: "Samuel Plumbing",
    category: "Plumber"
  },
  

 
  {
    id: 6,
    src: "/images/land1.jpg",
    alt: "Carpentry work",
    service: "Woodwork & Roofing",
    provider: "Master Carpenter",
    category: "Carpenter"
  },
  {
    id: 7,
    src: "/images/land2.jpg",
    alt: "Bathroom plumbing",
    service: "Bathroom Plumbing Setup",
    provider: "AquaFix Services",
    category: "Plumber"
  },

  {
    id: 9,
    src: "/images/land2.jpg",
    alt: "Wardrobe furniture",
    service: "Wardrobe & Cabinet Making",
    provider: "Elite Furnish",
    category: "Furniture"
  },
  
  {
    id: 12,
    src: "/images/land2.jpg",
    alt: "Water tank installation",
    service: "Water Tank Installation",
    provider: "FlowMaster",
    category: "Plumber"
  },
  
  {
    id: 18,
    src: "/images/land2.jpg",
    alt: "CCTV installation",
    service: "CCTV & Security Setup",
    provider: "SecureTech",
    category: "Electrician"
  },
  {
    id: 19,
    src: "/images/land1.jpg",
    alt: "Bed frame",
    service: "Bed Frame & Interior Fit",
    provider: "Comfort Wood",
    category: "Furniture"
  },
  {
    id: 20,
    src: "/images/land1.jpg",
    alt: "Wall finishing",
    service: "Decorative Wall Finishing",
    provider: "ArtWalls",
    category: "Painter"
  },

  {
    id: 21,
    src: "/images/land1.jpg",
    alt: "Bathroom tiles",
    service: "Bathroom Tile Installation",
    provider: "TilePro",
    category: "Tiler"
  },
  {
    id: 22,
    src: "/images/land2.jpg",
    alt: "Foundation work",
    service: "Foundation Construction",
    provider: "BuildRight",
    category: "Bricklayer"
  },
  {
    id: 23,
    src: "/images/land1.jpg",
    alt: "Door fixing",
    service: "Door & Frame Installation",
    provider: "FineCraft",
    category: "Carpenter"
  },
  {
    id: 24,
    src: "/images/land2.jpg",
    alt: "Roof repair",
    service: "Roof Maintenance",
    provider: "SafeCover",
    category: "Roofer"
  },
  {
    id: 25,
    src: "/images/land1.jpg",
    alt: "Meter installation",
    service: "Prepaid Meter Installation",
    provider: "PowerLink",
    category: "Electrician"
  },
 
 

  
]


</script>

<style scoped>
.masonry {
  column-count: 4;
  column-gap: 1rem;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}

/* Responsive */
@media (max-width: 1280px) {
  .masonry {
    column-count: 4;
  }
}

@media (max-width: 768px) {
  .masonry {
    column-count: 2;
  }
}

@media (max-width: 480px) {
  .masonry {
    column-count: 1;
  }
}
</style>
