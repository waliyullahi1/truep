<template>
  <div class="mt-12 p-5 rounded-xl border border-gray-300">

    <!-- HEADER -->
    <div class="flex items-center justify-between">
      <h3 class="font-semibold text-xl">About</h3>

      <button v-if="!editing" @click="editing = true">
        <img src="/image/icon/edit.svg" class="w-3" />
      </button>
    </div>

    <!-- VIEW MODE -->
    <div v-if="!editing" class="mt-3">

      <p
        v-if="modelValue"
        class="text-sm leading-relaxed"
      >
        {{ modelValue }}
      </p>

      <p
        v-else
        class="text-gray-400 italic text-sm"
      >
        Add description about yourself
      </p>

    </div>


    <!-- EDIT MODE -->
    <div v-else class="mt-3 space-y-3">

      <textarea
        v-model="localValue"
        rows="4"
        class="w-full border rounded p-2 text-sm"
        placeholder="Tell people about yourself..."
      ></textarea>

      <div class="flex gap-2 justify-end">

        <button
          @click="cancel"
          class="px-3 py-1 border rounded text-sm"
        >
          Cancel
        </button>

        <button
          @click="save"
          class="px-3 py-1 bg-black text-white rounded text-sm"
        >
          Save
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const editing = ref(false)
const localValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  localValue.value = val
})

const save = () => {
  emit('update:modelValue', localValue.value)
  editing.value = false
}

const cancel = () => {
  localValue.value = props.modelValue
  editing.value = false
}
</script>