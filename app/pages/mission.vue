<script setup>
import { ref } from 'vue'

const description = ref(`
<p>qwfw we fwen wefgyeg wefg efweg</p>
<p>dvtweh8fw wye</p>
<ol>
  <li class="ql-indent-0">wefywetf</li>
  <li class="ql-indent-1">nested number</li>
  <li class="ql-indent-2">deep nested number</li>
</ol>
<ul>
  <li class="ql-indent-0">ehfwei</li>
  <li class="ql-indent-1">fuhweud</li>
  <li class="ql-indent-2">rfu9fguigs</li>
  <li class="ql-indent-3">fdydgu</li>
</ul>
`)
</script>

<template>
  <div
    class=" max-w-none  prose-p:my-0 prose-ul:mt-2  prose-li:-my-0      prose-p:leading-tight prose-ol:mt-4  prose quill-prose"
    v-html="description"
  />
</template>

<style scoped>
  h1{}
</style>