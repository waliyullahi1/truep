<script setup>
import { computed } from "vue"

/* ================= PROPS ================= */
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(["update:modelValue"])

/* ================= DEFAULT LAND ================= */
const defaultLand = {
  unit: "plot",
  size: 450,
  quantity: 1,
  totalSqm: 450,
  sellByPlot: false
}

/* ================= LAND DETAILS ================= */
const landDetails = computed({
  get() {
    return {
      ...defaultLand,
      ...(props.modelValue.landDetails || {})
    }
  },
  set(val) {
    emit("update:modelValue", {
      ...props.modelValue,
      landDetails: val
    })
  }
})

/* ================= PRICE SEPARATE ================= */
const price = computed({
  get: () => props.modelValue.pricing?.price || 0,
  set(val) {
    emit("update:modelValue", {
      ...props.modelValue,
      pricing: {
        ...props.modelValue.pricing,
        price: val
      }
    })
  }
})

/* ================= MODE ================= */
const mode = computed({
  get: () => landDetails.value.unit,
  set(val) {
    landDetails.value = {
      ...defaultLand,
      unit: val
    }
  }
})

/* ================= CORE FIELDS ================= */
const plotSize = computed({
  get: () => landDetails.value.size,
  set(val) {
    update({ size: val })
  }
})

const quantity = computed({
  get: () => landDetails.value.quantity,
  set(val) {
    update({ quantity: val })
  }
})

const sellByPlot = computed({
  get: () => landDetails.value.sellByPlot,
  set(val) {
    update({ sellByPlot: val })
  }
})

/* ================= EXTRA FIELDS ================= */
const plots = computed({
  get: () => quantity.value,
  set: (val) => update({ quantity: val })
})

const acres = computed({
  get: () => quantity.value,
  set: (val) => update({ quantity: val })
})

const hectares = computed({
  get: () => quantity.value,
  set: (val) => update({ quantity: val })
})

const sqm = computed({
  get: () => landDetails.value.totalSqm,
  set: (val) => {
    landDetails.value = {
      ...landDetails.value,
      totalSqm: val,
      size: val,
      quantity: 1,
      unit: "sqm"
    }
  }
})

/* ================= UPDATE HELPER ================= */
function update(changes) {
  const updated = {
    ...landDetails.value,
    ...changes
  }
  updated.totalSqm = computeSqm(updated)
  landDetails.value = updated
}

/* ================= SQM CALC ================= */
function computeSqm(data) {
  if (data.sellByPlot) return data.size * data.quantity
  if (data.unit === "plot") return data.size * data.quantity
  if (data.unit === "acre") return data.quantity * 4047
  if (data.unit === "hectare") return data.quantity * 10000
  if (data.unit === "sqm") return data.totalSqm || data.size
  return 0
}

/* ================= TOTALS ================= */
const totalSqm = computed(() => computeSqm(landDetails.value))
const totalPrice = computed(() => {
  if (sellByPlot.value || mode.value === "plot") return quantity.value * price.value
  if (mode.value === "sqm") return totalSqm.value * price.value
  return quantity.value * price.value
})

/* ================= MONEY FORMAT ================= */
const money = (v) => "₦ " + Number(v || 0).toLocaleString()
</script>

<template>
<div class="card">
  <h2 class="title">Land Size and Pricing</h2>

  <!-- MODE SELECT -->
  <div class="mode-wrap mt-4">
    <button :class="['mode', mode==='plot' && 'active']" @click="mode='plot'">Sell by Plot</button>
    <button :class="['mode', mode==='acre' && 'active']" @click="mode='acre'">Sell by Acre</button>
    <button :class="['mode', mode==='hectare' && 'active']" @click="mode='hectare'">Sell by Hectare</button>
    <button :class="['mode', mode==='sqm' && 'active']" @click="mode='sqm'">Custom SQM</button>
  </div>

  <!-- PLOT MODE -->
  <div v-if="mode==='plot'" class="grid gap-4 mt-6">
    <div>
      <label>Plot Size (sqm)</label>
      <select v-model.number="plotSize" class="input">
        <option :value="300">Half Plot (300 sqm)</option>
        <option :value="450">Standard Plot (450 sqm)</option>
        <option :value="600">Full Plot (600 sqm)</option>
        <option :value="900">Double Plot (900 sqm)</option>
      </select>
    </div>
    <div>
      <label>Number of Plots</label>
      <input type="number" v-model.number="plots" class="input" min="1"/>
    </div>
    <div>
      <label>Price per Plot (₦)</label>
      <input type="number" v-model.number="price" class="input" min="0"/>
    </div>
  </div>

  <!-- ACRE / HECTARE -->
  <div v-if="mode==='acre' || mode==='hectare'" class="grid gap-4 mt-6">
    <div v-if="mode==='acre' && !sellByPlot">
      <label>Total Land Area (Acres)</label>
      <input type="number" v-model.number="acres" class="input" min="1"/>
    </div>
    <div v-if="mode==='hectare' && !sellByPlot">
      <label>Total Land Area (Hectares)</label>
      <input type="number" v-model.number="hectares" class="input" min="1"/>
    </div>
    <div>
      <label>Price per {{ mode==='acre' ? 'Acre' : 'Hectare' }} (₦)</label>
      <input type="number" v-model.number="price" class="input" min="0"/>
    </div>

    <div class="flex items-center gap-2 mt-2">
      <input type="checkbox" v-model="sellByPlot" id="sellByPlot"/>
      <label for="sellByPlot">Sell Land in Plots</label>
    </div>

    <div v-if="sellByPlot" class="grid gap-4 mt-4">
      <div>
        <label>Size of Each Plot (sqm)</label>
        <input type="number" v-model.number="plotSize" class="input" min="1"/>
      </div>
      <div>
        <label>Number of Plots</label>
        <input type="number" v-model.number="plots" class="input" min="1"/>
      </div>
      <div>
        <label>Price per Plot (₦)</label>
        <input type="number" v-model.number="price" class="input" min="0"/>
      </div>
    </div>
  </div>

  <!-- CUSTOM SQM -->
  <div v-if="mode==='sqm'" class="grid gap-4 mt-6">
    <div>
      <label>Total Land Area (sqm)</label>
      <input type="number" v-model.number="sqm" class="input" min="1"/>
    </div>
    <div>
      <label>Price per Square Meter (₦)</label>
      <input type="number" v-model.number="price" class="input" min="0"/>
    </div>
  </div>

  <!-- SUMMARY -->
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
.title { @apply text-lg font-semibold; }
.mode-wrap { @apply flex gap-2; }
.mode { @apply flex-1 border rounded-lg py-2 text-sm cursor-pointer; }
.mode.active { @apply bg-black text-white; }
.input { @apply w-full border rounded-lg px-3 py-2 mt-1; }
.summary h3 { @apply font-semibold; }
.summary h1 { @apply text-2xl font-bold; }
</style>