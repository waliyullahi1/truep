<template>
  <div class="property-card">

    <!-- Background Image -->
    <img
      :src="image"
      alt="Property"
      class="property-image"
    />

    <!-- Overlay -->
    <div class="overlay"></div>

    <!-- Price -->
    <div class="price-badge">
      ₦{{ price }}
    </div>

    <!-- Content -->
    <div class="content">

      <div class="tag">
        {{ type }}
      </div>

      <h3 class="title">
        {{ title }}
      </h3>

      <p class="location">
        {{ location }}
      </p>

      <div class="features">

        <div class="feature">
          🛏 {{ bedroom }} Beds
        </div>

        <div class="feature">
          🛁 {{ bathroom }} Baths
        </div>

        <div class="feature">
          📐 {{ size }}
        </div>

      </div>

      <button class="view-btn">
        View Property
      </button>

    </div>

  </div>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  location: String,
  price: String,
  type: String,
  bedroom: Number,
  bathroom: Number,
  size: String
})
</script>

<style scoped>
.property-card {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 520px;
  overflow: hidden;
  border-radius: 24px;
  cursor: pointer;
  background: #f5f5f5;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to top,
      rgba(0,0,0,0.9),
      rgba(0,0,0,0.15),
      rgba(0,0,0,0.05)
    );
}

.price-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #f97316;
  color: white;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 18px;
  z-index: 2;
}

.content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 24px;
  color: white;
  z-index: 2;
}

.tag {
  display: inline-block;
  background: rgba(249,115,22,0.9);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  margin-bottom: 12px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.location {
  color: rgba(255,255,255,0.85);
  margin-bottom: 18px;
}

.features {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.feature {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(10px);
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 14px;
}

.view-btn {
  width: 100%;
  border: none;
  background: #f97316;
  color: white;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}
</style>