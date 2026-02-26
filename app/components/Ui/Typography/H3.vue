<template>
  <h3 :class="[color==='secondary' ? 'text-secondary' : color==='white' ? 'text-white' : color === 'primary' ? 'text-primary': 'text-neutral-800', size==='default' ? 'text-2xl' : 'text-2xl md:text-3xl 2xl:text-4xl']"><slot/></h3>
</template>
<script>
  export default {
    props: {
      color: String,
      size: {
        type: String,
        default: 'default'
      }
    }
  }
</script>