<template>
  <b-btn
    :disabled="isDisabled"
    size="sm"
    variant="outline-primary"
    pill
    @click="onClick"
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
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isBusy: false
    }
  },
  methods: {
    onClick() {
      // this.isBusy = !this.isBusy
      this.$emit('click')
    }
  }
}
</script>

<style>

</style>
