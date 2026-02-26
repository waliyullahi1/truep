<script setup>
import { ref, computed, watch } from 'vue'

/* ====================== MODEL ====================== */
const props = defineProps({ modelValue: Object })
const emit = defineEmits(['update:modelValue'])

const local = ref({
  mode: 'plot',        // plot | acre | hectare | sqm
  sellByPlot: false,   // show extra plot fields for acre/hectare
  plotSize: 450,       // sqm per plot
  plots: 1,
  acres: 1,
  hectares: 1,
  sqm: '',
  price: '',           // price per plot/acre/hectare/sqm depending on mode
  ...props.modelValue
})

watch(local, () => {
  emit('update:modelValue', local.value)
}, { deep: true })

/* ====================== TOTAL SIZE (sqm) ====================== */
const totalSqm = computed(() => {
  if (local.value.mode === 'plot')
    return local.value.plotSize * local.value.plots
  if ((local.value.mode === 'acre' || local.value.mode === 'hectare') && local.value.sellByPlot)
    return local.value.plotSize * local.value.plots
  if (local.value.mode === 'acre') return local.value.acres * 4047
  if (local.value.mode === 'hectare') return local.value.hectares * 10000
  return Number(local.value.sqm || 0)
})

/* ====================== TOTAL PRICE ====================== */
const totalPrice = computed(() => {
  const p = Number(local.value.price || 0)
  if (local.value.mode === 'plot' || local.value.sellByPlot)
    return local.value.plots * p
  if (local.value.mode === 'acre') return local.value.acres * p
  if (local.value.mode === 'hectare') return local.value.hectares * p
  return totalSqm.value * p
})

/* ====================== MONEY FORMAT ====================== */
const money = (v) => '₦ ' + Number(v || 0).toLocaleString()
</script>

<template>
<div class="card">

  <h2 class="title">Land Size & Price</h2>

  <!-- ================= MODE SELECT ================= -->
  <div class="mode-wrap mt-4">
    <button :class="['mode', local.mode==='plot' && 'active']" @click="local.mode='plot'">By Plot</button>
    <button :class="['mode', local.mode==='acre' && 'active']" @click="local.mode='acre'">By Acre</button>
    <button :class="['mode', local.mode==='hectare' && 'active']" @click="local.mode='hectare'">By Hectare</button>
    <button :class="['mode', local.mode==='sqm' && 'active']" @click="local.mode='sqm'">Custom sqm</button>
  </div>

  <!-- ================= PLOT MODE ================= -->
  <div v-if="local.mode==='plot'" class="grid gap-4 mt-6">
    <div>
      <label>Plot Size</label>
      <select v-model.number="local.plotSize" class="input">
        <option :value="300">Half Plot (300 sqm)</option>
        <option :value="450">Standard Plot (450 sqm)</option>
        <option :value="600">Full Plot (600 sqm)</option>
        <option :value="900">Double Plot (900 sqm)</option>
      </select>
    </div>

    <div>
      <label>Number of Plots</label>
      <input type="number" v-model.number="local.plots" class="input" min="1"/>
    </div>

    <div>
      <label>Price per Plot (₦)</label>
      <input type="number" v-model.number="local.price" class="input" min="0"/>
    </div>
  </div>

  <!-- ================= ACRE / HECTARE MODE ================= -->
  <div v-if="local.mode==='acre' || local.mode==='hectare'" class="grid gap-4 mt-6">

    <!-- Total Acres / Hectares if NOT selling by plot -->
    <div v-if="local.mode==='acre' && !local.sellByPlot">
      <label>Total Acres</label>
      <input type="number" v-model.number="local.acres" class="input" min="1"/>
    </div>

    <div v-if="local.mode==='hectare' && !local.sellByPlot">
      <label>Total Hectares</label>
      <input type="number" v-model.number="local.hectares" class="input" min="1"/>
    </div>

    <!-- Price per Acre/Hectare -->
    <div>
      <label>Price per {{ local.mode==='acre' ? 'Acre' : 'Hectare' }} (₦)</label>
      <input type="number" v-model.number="local.price" class="input" min="0"/>
    </div>

    <!-- Sell by plot switch -->
    <div class="flex items-center gap-2 mt-2">
      <input type="checkbox" v-model="local.sellByPlot" id="sellByPlot"/>
      <label for="sellByPlot">Sell by Plot?</label>
    </div>

    <!-- Show plot inputs if selling by plot -->
    <div v-if="local.sellByPlot" class="grid gap-4 mt-4">
      <div>
        <label>Plot Size (sqm)</label>
        <input type="number" v-model.number="local.plotSize" class="input" min="1"/>
      </div>

      <div>
        <label>Number of Plots</label>
        <input type="number" v-model.number="local.plots" class="input" min="1"/>
      </div>

      <div>
        <label>Price per Plot (₦)</label>
        <input type="number" v-model.number="local.price" class="input" min="0"/>
      </div>
    </div>
  </div>

  <!-- ================= CUSTOM SQM ================= -->
  <div v-if="local.mode==='sqm'" class="grid gap-4 mt-6">
    <div>
      <label>Total Size (sqm)</label>
      <input type="number" v-model.number="local.sqm" class="input" min="1"/>
    </div>
    <div>
      <label>Price per sqm (₦)</label>
      <input type="number" v-model.number="local.price" class="input" min="0"/>
    </div>
  </div>

  <!-- ================= RESULT ================= -->
  <div class="summary mt-6 text-center">
    <p class="text-sm text-gray-500">Total Size</p>
    <h3 class="font-semibold text-lg">{{ totalSqm.toLocaleString() }} sqm</h3>

    <p class="text-sm text-gray-500 mt-2">Total Price</p>
    <h1 class="text-2xl font-bold">{{ money(totalPrice) }}</h1>
  </div>

</div>
</template>

<style scoped>
.card {
  @apply bg-white rounded-2xl shadow p-6 space-y-4;
}
.title { @apply text-lg font-semibold; }
.mode-wrap { @apply flex gap-2; }
.mode { @apply flex-1 border rounded-lg py-2 text-sm cursor-pointer; }
.mode.active { @apply bg-black text-white; }
.input { @apply w-full border rounded-lg px-3 py-2 mt-1; }
.summary h3 { @apply font-semibold; }
.summary h1 { @apply text-2xl font-bold; }
</style>