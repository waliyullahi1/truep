<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'auth' })

/* ======================
   SECTION SWITCH (NOT SCROLL)
====================== */
const activeSection = ref('location')

/* ======================
   FORM DATA
====================== */
const form = ref({
  state: '',
  city: '',
  address: '',

  description: '',
  fenced: false,
  roadAccess: false,
  dry: false,

  size: '',
  price: '',
  purpose: 'Sell'
})

/* ======================
   COMPLETION CHECKS
====================== */
function isCompleted(section) {
  if (section === 'location')
    return form.value.state && form.value.city && form.value.address

  if (section === 'features')
    return (
      form.value.fenced ||
      form.value.roadAccess ||
      form.value.dry ||
      form.value.description
    )

  if (section === 'size')
    return form.value.size && form.value.price

  return false
}
</script>

<template>
<div class="max-w-5xl mx-auto flex gap-6">

  <!-- Sidebar Tabs -->
  <div class="w-1/5 bg-gray-100 p-5 space-y-4 rounded shadow">

    <div
      @click="activeSection='location'"
      class="tab"
      :class="{ active: activeSection==='location' }"
    >
      Location
      <span v-if="isCompleted('location')">✅</span>
    </div>

    <div
      @click="activeSection='features'"
      class="tab"
      :class="{ active: activeSection==='features' }"
    >
      Features
      <span v-if="isCompleted('features')">✅</span>
    </div>

    <div
      @click="activeSection='size'"
      class="tab"
      :class="{ active: activeSection==='size' }"
    >
      Size
      <span v-if="isCompleted('size')">✅</span>
    </div>

  </div>


  <!-- RIGHT CONTENT -->
  <div class="w-4/5">

    <!-- LOCATION -->
    <div v-if="activeSection==='location'" class="card">
      <h2 class="section-title">Location</h2>

      <ListStateLGASelector
        v-model:selectedState="form.state"
        v-model:selectedLGA="form.city"
      />

      <input
        v-model="form.address"
        placeholder="Land Address / Landmark"
        class="input mt-3"
      />
    </div>


    <!-- FEATURES -->
    <div v-if="activeSection==='features'" class="card">
      <h2 class="section-title">Land Features</h2>

      <div class="grid grid-cols-2 gap-4">
        <label><input type="checkbox" v-model="form.fenced"/> Fenced</label>
        <label><input type="checkbox" v-model="form.roadAccess"/> Road Access</label>
        <label><input type="checkbox" v-model="form.dry"/> Dry Land</label>
      </div>

      <textarea
        v-model="form.description"
        class="input mt-3 h-28"
        placeholder="Description..."
      />
    </div>


    <!-- SIZE -->
    <div v-if="activeSection==='size'" class="card">
      <h2 class="section-title">Size & Price</h2>

      <input v-model="form.size" class="input mb-3" placeholder="Land Size"/>
      <input v-model="form.price" class="input mb-3" placeholder="Price (NGN)"/>

      <select v-model="form.purpose" class="input">
        <option>Sell Land</option>
        <option>Sell House</option>
        <option>Rent House</option>
      </select>
    </div>

  </div>
</div>
</template>

<style scoped>
.input {
  @apply w-full border rounded-lg px-4 py-2 text-sm;
}

.section-title {
  @apply text-lg font-semibold mb-3;
}

.card {
  @apply bg-white p-5 rounded shadow;
}

.tab {
  @apply p-3 cursor-pointer flex justify-between rounded bg-white;
}

.tab.active {
  @apply bg-black text-white;
}
</style>