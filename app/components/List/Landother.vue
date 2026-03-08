<script setup>
import { computed } from "vue";

/* ================= PROPS ================= */
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["update:modelValue"]);

/* ================= LAND DETAILS (SYNC WITH PARENT) ================= */
const landDetails = computed({
  get() {
    return props.modelValue.landDetails || {
      unit: "plot",
      size: 450,
      quantity: 1,
      acres: 1,
      hectares: 1,
      sqm: 600,
      price: 0,
      sellByPlot: false
    };
  },
  set(val) {
    emit("update:modelValue", { ...props.modelValue, landDetails: val });
  }
});

/* ================= COMPUTED FIELDS ================= */
const mode = computed({
  get: () => landDetails.value.unit,
  set(val) {
    landDetails.value = { ...landDetails.value, unit: val };
  }
});

const plotSize = computed({
  get: () => landDetails.value.size,
  set(val) { landDetails.value = { ...landDetails.value, size: val }; }
});

const plots = computed({
  get: () => landDetails.value.quantity,
  set(val) { landDetails.value = { ...landDetails.value, quantity: val }; }
});

const acres = computed({
  get: () => landDetails.value.acres,
  set(val) { landDetails.value = { ...landDetails.value, acres: val }; }
});

const hectares = computed({
  get: () => landDetails.value.hectares,
  set(val) { landDetails.value = { ...landDetails.value, hectares: val }; }
});

const sqm = computed({
  get: () => landDetails.value.sqm,
  set(val) { landDetails.value = { ...landDetails.value, sqm: val }; }
});

const price = computed({
  get: () => landDetails.value.price,
  set(val) { landDetails.value = { ...landDetails.value, price: val }; }
});

const sellByPlot = computed({
  get: () => landDetails.value.sellByPlot,
  set(val) { landDetails.value = { ...landDetails.value, sellByPlot: val }; }
});

/* ================= TOTAL COMPUTED ================= */
const totalSqm = computed(() => {
  if (mode.value === "plot" || (["acre","hectare"].includes(mode.value) && sellByPlot.value))
    return plotSize.value * plots.value;
  
  if (mode.value === "acre")
    return acres.value * 4047;
  
  if (mode.value === "hectare")
    return hectares.value * 10000;
  
  return sqm.value;
});

const totalPrice = computed(() => {
  if (mode.value === "plot" || sellByPlot.value)
    return plots.value * price.value;

  if (mode.value === "acre")
    return acres.value * price.value;

  if (mode.value === "hectare")
    return hectares.value * price.value;

  return sqm.value * price.value;
});

/* ================= MONEY FORMAT ================= */
const money = (v) => '₦ ' + Number(v || 0).toLocaleString();
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