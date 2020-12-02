<template>
  <div>
    <b-table
      :items="items"
    />
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>

</style>
