<script setup>
import { ref } from 'vue'

const description = ref('')

const toolbar = [
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  ['clean']
]
</script>

<template>
  <div class="p-6 bg-white rounded-xl mt-7 ">
    <h2 class="text-2xl font-normal  mb-1">Description</h2>
    <p class=" mt-1 text-slate-600 md:w-2/3 mb-9">Provide a detailed description of your property, including key features, location benefits, and why it’s a great choice for buyers.</p>

    <ClientOnly>
      <QuillEditor
        v-model:content="description"
        contentType="html"
        theme="snow"
        :toolbar="toolbar"
        class="min-h-[220px]"
      />
    </ClientOnly>
  </div>
</template>