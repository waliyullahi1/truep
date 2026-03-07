<script setup>
import { ref, computed, watch } from 'vue'

/* ================= PROPS ================= */
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

/* ================= LOCAL STATE ================= */
const local = ref({
  mode: 'plot', // plot | acre | hectare | sqm
  sellByPlot: false,

  plotSize: 450,
  plots: 1,

  acres: 1,
  hectares: 1,

  sqm: 600,

  price: 0
})

/* ================= TOTAL SQM ================= */
const totalSqm = computed(() => {

  if (local.value.mode === 'plot')
    return local.value.plotSize * local.value.plots

  if (
    (local.value.mode === 'acre' || local.value.mode === 'hectare')
    && local.value.sellByPlot
  )
    return local.value.plotSize * local.value.plots

  if (local.value.mode === 'acre')
    return local.value.acres * 4047

  if (local.value.mode === 'hectare')
    return local.value.hectares * 10000

  return Number(local.value.sqm || 0)
})

/* ================= QUANTITY ================= */
const quantity = computed(() => {

  if (local.value.mode === 'plot')
    return local.value.plots

  if (local.value.sellByPlot)
    return local.value.plots

  if (local.value.mode === 'acre')
    return local.value.acres

  if (local.value.mode === 'hectare')
    return local.value.hectares

  return 1
})

/* ================= UNIT SIZE ================= */
const unitSize = computed(() => {

  if (local.value.mode === 'plot')
    return local.value.plotSize

  if (local.value.sellByPlot)
    return local.value.plotSize

  if (local.value.mode === 'acre')
    return 4047

  if (local.value.mode === 'hectare')
    return 10000

  return totalSqm.value
})

/* ================= TOTAL PRICE ================= */
const totalPrice = computed(() => {

  const p = Number(local.value.price || 0)

  if (local.value.mode === 'plot' || local.value.sellByPlot)
    return local.value.plots * p

  if (local.value.mode === 'acre')
    return local.value.acres * p

  if (local.value.mode === 'hectare')
    return local.value.hectares * p

  return totalSqm.value * p
})

/* ================= UPDATE PARENT ================= */
watch(
  [local, totalSqm, totalPrice, quantity, unitSize],
  () => {

    const updatedForm = {

      ...props.modelValue,

      landDetails: {
        ...(props.modelValue.landDetails || {}),

        size: totalSqm.value,
        quantity: quantity.value,
        unitSize: unitSize.value,
        unit: local.value.mode,

        fenced: props.modelValue.landDetails?.fenced ?? false,
        dry: props.modelValue.landDetails?.dry ?? false,
        roadAccess: props.modelValue.landDetails?.roadAccess ?? false
      },

      pricing: {
        ...(props.modelValue.pricing || {}),
        price: totalPrice.value,
        currency: "NGN"
      }

    }

    emit('update:modelValue', updatedForm)

  },
  { deep: true }
)

/* ================= MONEY FORMAT ================= */
const money = (v) => '₦ ' + Number(v || 0).toLocaleString()

</script>
<template>
<div class="card">

  <h2 class="title">Land Size and Pricing</h2>

  <!-- MODE SELECT -->
  <div class="mode-wrap mt-4">
    <button :class="['mode', local.mode==='plot' && 'active']" @click="local.mode='plot'">
      Sell by Plot
    </button>

    <button :class="['mode', local.mode==='acre' && 'active']" @click="local.mode='acre'">
      Sell by Acre
    </button>

    <button :class="['mode', local.mode==='hectare' && 'active']" @click="local.mode='hectare'">
      Sell by Hectare
    </button>

    <button :class="['mode', local.mode==='sqm' && 'active']" @click="local.mode='sqm'">
      Custom Square Meters
    </button>
  </div>

  <!-- PLOT MODE -->
  <div v-if="local.mode==='plot'" class="grid gap-4 mt-6">

    <div>
      <label>Plot Size (sqm)</label>
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

  <!-- ACRE / HECTARE MODE -->
  <div v-if="local.mode==='acre' || local.mode==='hectare'" class="grid gap-4 mt-6">

    <div v-if="local.mode==='acre' && !local.sellByPlot">
      <label>Total Land Area (Acres)</label>
      <input type="number" v-model.number="local.acres" class="input" min="1"/>
    </div>

    <div v-if="local.mode==='hectare' && !local.sellByPlot">
      <label>Total Land Area (Hectares)</label>
      <input type="number" v-model.number="local.hectares" class="input" min="1"/>
    </div>

    <div>
      <label>Price per {{ local.mode==='acre' ? 'Acre' : 'Hectare' }} (₦)</label>
      <input type="number" v-model.number="local.price" class="input" min="0"/>
    </div>

    <div class="flex items-center gap-2 mt-2">
      <input type="checkbox" v-model="local.sellByPlot" id="sellByPlot"/>
      <label for="sellByPlot">Sell Land in Plots</label>
    </div>

    <div v-if="local.sellByPlot" class="grid gap-4 mt-4">

      <div>
        <label>Size of Each Plot (sqm)</label>
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

  <!-- CUSTOM SQM -->
  <div v-if="local.mode==='sqm'" class="grid gap-4 mt-6">

    <div>
      <label>Total Land Area (sqm)</label>
      <input type="number" v-model.number="local.sqm" class="input" min="1"/>
    </div>

    <div>
      <label>Price per Square Meter (₦)</label>
      <input type="number" v-model.number="local.price" class="input" min="0"/>
    </div>

  </div>

  <!-- RESULT -->
  <div class="summary mt-6 text-center">

    <p class="text-sm text-gray-500">Total Land Area</p>
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

.title {
  @apply text-lg font-semibold;
}

.mode-wrap {
  @apply flex gap-2;
}

.mode {
  @apply flex-1 border rounded-lg py-2 text-sm cursor-pointer;
}

.mode.active {
  @apply bg-black text-white;
}

.input {
  @apply w-full border rounded-lg px-3 py-2 mt-1;
}

.summary h3 {
  @apply font-semibold;
}

.summary h1 {
  @apply text-2xl font-bold;
}
</style>