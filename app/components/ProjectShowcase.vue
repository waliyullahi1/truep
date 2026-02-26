<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const current = ref(0)

const next = () => {
  if (current.value < props.project.images.length - 1) current.value++
}

const prev = () => {
  if (current.value > 0) current.value--
}

const setImage = (i) => (current.value = i)

const emit = defineEmits(["hire"])
const hireWorker = () => emit("hire", props.project)

const stars = computed(() => Math.round(props.project.rating || 0))

/* category colors (automatic styling) */
const categoryColor = (cat) => {
  const map = {
    Survey: "bg-blue-100 text-blue-700",
    Construction: "bg-green-100 text-green-700",
    Furniture: "bg-yellow-100 text-yellow-700",
    Interior: "bg-purple-100 text-purple-700",
    Electrical: "bg-red-100 text-red-700"
  }
  return map[cat] || "bg-gray-100 text-gray-700"
}
</script>

<template>
  <div
    class="bg-white  flex  rounded-3xl shadow-lg border hover:shadow-2xl transition-all duration-300 overflow-hidden group"
  >
    <div class="  w-2/5">

 
        <!-- ================= IMAGE ================= -->
        <div class="relative h-72 overflow-hidden">
        <img
            :src="project.images[current]"
            class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <!-- CATEGORY BADGES -->
        <div class="absolute top-3 left-3 flex gap-2 flex-wrap">
            <span
            v-for="cat in project.categories"
            :key="cat"
            :class="categoryColor(cat)"
            class="text-xs px-3 py-1 rounded-full font-semibold shadow"
            >
            {{ cat }}
            </span>
        </div>

        <!-- arrows -->
        <button
            v-if="project.images.length > 1"
            @click="prev"
            class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-1 rounded-lg shadow"
        >
            ‹
        </button>

        <button
            v-if="project.images.length > 1"
            @click="next"
            class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-1 rounded-lg shadow"
        >
            ›
        </button>
        </div>

        <!-- thumbnails -->
        <div
        v-if="project.images.length > 1"
        class="flex gap-2 p-3 overflow-x-auto"
        >
        <img
            v-for="(img, i) in project.images"
            :key="i"
            :src="img"
            @click="setImage(i)"
            class="h-14 w-20 object-cover rounded-lg cursor-pointer border-2"
            :class="i === current ? 'border-black' : 'border-transparent opacity-60'"
        />
        </div>
  </div>
    <!-- ================= CONTENT ================= -->
    <div class=" w-3/5 p-6 space-y-1">

      <!-- title -->
      <h2 class="text-md font-bold">
        {{ project.title }}
      </h2>

      <!-- description -->
      <p class="text-gray-600 text-sm leading-relaxed">
        {{ project.description.slice(0, 90 ) }}...
      </p>

      <!-- meta grid -->
      <div class="grid grid-cols-2 gap-4 text-sm">

        <div>
          <p class="text-gray-400">Duration</p>
          <p class="font-semibold">{{ project.duration }}</p>
        </div>

        <div>
          <p class="text-gray-400">Budget</p>
          <p class="font-semibold text-green-600">₦{{ project.budget }}</p>
        </div>

        <div>
          <p class="text-gray-400">Location</p>
          <p class="font-semibold">{{ project.location }}</p>
        </div>

        <div>
          <p class="text-gray-400">Completed</p>
          <p class="font-semibold">{{ project.date }}</p>
        </div>
      </div>

      <!-- SKILLS / TOOLS TAGS -->
      <div v-if="project.tools?.length" class="flex flex-wrap gap-2">
        <span
          v-for="tool in project.tools"
          :key="tool"
          class="text-xs bg-gray-100 px-3 py-1 rounded-full"
        >
          {{ tool }}
        </span>
      </div>

      <!-- rating -->
      <div class="flex items-center gap-2 text-yellow-400 text-sm">
        <span v-for="i in 5" :key="i">
          {{ i <= stars ? "★" : "☆" }}
        </span>
        <span class="text-gray-500 text-xs ml-2">
          ({{ project.rating }}/5)
        </span>
      </div>

      <!-- hire button -->
      <button
        @click="hireWorker"
        class="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 hover:scale-[1.02] transition"
      >
        Hire this worker
      </button>
    </div>
  </div>
</template>
