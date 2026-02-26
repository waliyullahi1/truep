<script setup>
const props = defineProps({
  item: Object
})

const goTo = () => {
  if (props.item.type === "service")
    navigateTo(`/workers/${props.item.id}`)
  else
    navigateTo(`/property/${props.item.id}`)
}
</script>

<template>
  <div
    @click="goTo"
    class="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden border"
  >
    <!-- image -->
    <div class="relative h-48">
      <img :src="item.image" class="w-full h-full object-cover" />

      <!-- type badge -->
      <span
        class="absolute top-2 left-2 text-xs px-3 py-1 rounded-full font-semibold"
        :class="item.type === 'service'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-green-100 text-green-700'"
      >
        {{ item.type === "service" ? "Service" : "Property" }}
      </span>
    </div>

    <!-- content -->
    <div class="p-4 space-y-2">
      <h3 class="font-semibold text-sm line-clamp-2">
        {{ item.title }}
      </h3>

      <p class="text-xs text-gray-500 line-clamp-2">
        {{ item.description }}
      </p>

      <div class="flex justify-between items-center mt-2">
        <span class="text-sm font-bold text-green-600">
          {{ item.price }}
        </span>

        <span class="text-xs text-gray-400">
          {{ item.location }}
        </span>
      </div>

      <!-- rating only for service -->
      <div v-if="item.rating" class="text-yellow-500 text-xs">
        ⭐ {{ item.rating }}
      </div>
    </div>
  </div>
</template>
