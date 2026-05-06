<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  location: String,
  city: String,
  type: String,
  category: String,
  currentId: String // exclude current property
})

/* ===============================
   STATE
================================ */
const loading = ref(false)
const listings = ref([])

/* ===============================
   FETCH RELATED
================================ */
const fetchRelated = async () => {
  loading.value = true

  try {
    const res = await useApiFetch('/property/all', {
      method: 'GET',
      params: {
        state: props.location || undefined,
        city: props.city || undefined,
        type: props.type || undefined,
        category: props.category || undefined,
        limit: 6
      }
    })

    const data = res?.data?.data || []

    // remove current property
    listings.value = data.filter(p => p._id !== props.currentId)

  } catch (err) {
    console.error('Related fetch error:', err)
  } finally {
    loading.value = false
  }
}

/* ===============================
   WATCH PROPS
================================ */
watch(
  () => [props.location, props.city, props.type, props.category],
  fetchRelated,
  { immediate: true }
)

/* ===============================
   HELPERS
================================ */
const formatPrice = (item) => {
  const price = item?.pricing?.price || 0
  return price.toLocaleString()
}
</script>

<template>
  <div class="mt-10">

    <!-- TITLE -->
    <h2 class="text-lg font-semibold mb-4">
      Related listings in {{ city || location }}
    </h2>

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-10">
      Loading...
    </div>

    <!-- LIST -->
    <div v-else class="grid md:grid-cols-3 gap-6">

      <NuxtLink
        v-for="item in listings"
        :key="item._id"
        :to="`/property/${item.slug}`"
        class="border rounded-xl overflow-hidden hover:shadow-md transition"
      >
        <!-- IMAGE -->
        <div class="relative">
          <img
            :src="item?.media?.files?.[0]?.url || '/image/no-image.png'"
            class="h-40 w-full object-cover"
          />

          <!-- arrows fake UI -->
          <button class="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">
            ‹
          </button>

          <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">
            ›
          </button>
        </div>

        <!-- CONTENT -->
        <div class="p-4 text-sm">

          <div class="flex justify-between items-start">
            <h3 class="font-medium leading-tight">
              {{ item.title }}
            </h3>

            <button class="text-gray-400 hover:text-red-500">
              ♥
            </button>
          </div>

          <p class="text-gray-500 text-xs mt-1">
            {{ item.location?.address }}, {{ item.location?.city }}
          </p>

          <p class="font-semibold mt-2 text-primary">
            {{ formatPrice(item) }} ₦ / month
          </p>

        </div>
      </NuxtLink>

    </div>

    <!-- BUTTON -->
    <div class="flex justify-center mt-6">
      <NuxtLink
        :to="`/search/${location}/${city}/${type}/${category}`"
        class="bg-secondary hover:bg-primary text-white px-6 py-3 rounded-lg"
      >
        View more related listings
      </NuxtLink>
    </div>

  </div>
</template>