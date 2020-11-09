<template>
  <svg
    :width="size"
    :height="size"
    :stroke="color"
    :stroke-width="stroke"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '1em'
    },
    stroke: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default() {
        return 'currentColor'
      }
    }
  }
}
</script>

<style>

</style>
