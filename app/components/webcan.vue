<template>
  <div class="p-4">
    <Container>
      <div class="grid">
        <div
          v-for="image in images"
          :key="image.id"
          :class="['card', image.layout]"
        >
          <!-- IMAGE -->
          <img
            :src="image.src"
            :alt="image.alt"
          />

          <!-- OVERLAY -->
          <div class="overlay">
            <div class=" flex h-full   items-end  text-white">
              <p>{{}}</p>

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
    id: 1,
    src: "/image/abuja.png",
    state: "Abuja"
  },
  {
    id: 2,
    src: "/image/lagos.png",
   state: "Lagos"
  },
  {
    id: 3,
    src: "/image/ibadan.png",
    state: "ibadan",
  },
  {
    id: 4,
    src: "/image/ph.png",
     state: "Port-Harcourt",
   
  },
  {
    id: 5,
    src: "/image/osun.png",
    state: "Osun",

  }
];
</script>

<style scoped>
/* GRID LAYOUT */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 16px;
}

/* CARD */
.card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

/* IMAGE */
.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.65), transparent);


}

.card:hover .overlay {
  opacity: 10;
}

/* CONTENT */
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  color: white;
}

/* LAYOUT VARIANTS */
.tall {
  grid-row: span 2;
}

.wide {
  grid-column: span 2;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 180px;
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>