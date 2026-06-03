<template>
  <div class="flex md:hidden" >
    <div @click="$emit('revealMenu')" class="w-5">
      <div
        :class="isOpen 
          ? 'transition transform rotate-45 w-6 bg-primary' 
          : 'transition w-6 bg-primary'"
        class="block cursor-pointer"
        style="height: 3px;"
      ></div>

      <div
        :class="isOpen 
          ? 'transition transform -rotate-45 w-6 -mt-0.5 bg-primary' 
          : 'transition w-6 mt-1.5 bg-primary'"
        class="block cursor-pointer"
        style="height: 3px;"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean
  }
}
</script>
