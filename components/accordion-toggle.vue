<template>
  <b-row class="mx-2">
    <b-btn
      id="toggle-btn"
      :class="visible ? null : 'collapsed'"
      aria-controls="collapse-4"
      variant="secondary"
      size="md"
      block
      @click="$emit('visible-update', !visible)"
    >
      {{ text }}
      <b-icon v-if="!visible" icon="chevron-down" style="color: white" />
      <b-icon v-else icon="chevron-up" style="color: white" />
    </b-btn>
  </b-row>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default() {
        return ''
      }
    },
    id: {
      type: String,
      default() {
        return ''
      }
    },
    visible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
