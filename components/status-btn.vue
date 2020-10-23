<template>
  <b-btn
    size="sm"
    variant="outline-primary"
    pill
    @click="isBusy = !isBusy"
  >
    <b-spinner v-if="isBusy" small />
    <slot v-else name="btn-icon">
      <b-icon icon="check" />
    </slot>
    {{ text }}
  </b-btn>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Click'
    }
  },
  data() {
    return {
      isBusy: false
    }
  }
}
</script>

<style>

</style>
