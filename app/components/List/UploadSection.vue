<script setup>
const props = defineProps({
  title: String,
  subtitle: String,
  items: Array,
  type: String,
  loadingIndex: String,
  removingIndex: String
})

const emit = defineEmits([
  "upload",
  "remove"
])

function handleChange(e, index) {
  emit("upload", { event: e, index, type: props.type })
}

function handleRemove(index) {
  emit("remove", { index, type: props.type })
}
</script>

<template>
<div class="bg-white p-6 rounded-2xl shadow-sm border">
  <h2 class="text-xl font-semibold">{{ title }}</h2>
  <p class="text-gray-500 text-sm mb-6">{{ subtitle }}</p>

  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

    <div
      v-for="(img,index) in items"
      :key="type + index"
      class="relative group h-44 rounded-xl border border-dashed flex items-center justify-center overflow-hidden bg-gray-50 hover:shadow-md transition"
    >

      <!-- IMAGE -->
      <img
        v-if="img"
        :src="img.url"
        class="w-full h-full object-cover group-hover:scale-105 transition"
      />

      <!-- EMPTY -->
      <div v-else class="text-center">
        <p class="text-sm text-gray-400">Upload</p>
      </div>

      <!-- INPUT -->
      <input
        type="file"
        accept="image/*"
        class="absolute inset-0 opacity-0 cursor-pointer"
        @change="handleChange($event,index)"
        :disabled="loadingIndex === type+'-'+index || removingIndex === type+'-'+index"
      />

      <!-- LOADING -->
      <div
        v-if="loadingIndex === type+'-'+index || removingIndex === type+'-'+index"
        class="absolute inset-0 bg-black/50 flex items-center justify-center"
      >
        <div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>

      <!-- DELETE -->
      <button
        v-if="img && loadingIndex !== type+'-'+index"
        @click.stop="handleRemove(index)"
        class="absolute top-2 right-2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      >
        ✕
      </button>

    </div>

  </div>
</div>
</template>