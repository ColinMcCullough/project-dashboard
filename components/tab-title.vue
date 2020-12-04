<template>
  <div>
    <h5 class="w-100 text-truncate">
      <b-icon-building />
      {{ title }}
    </h5>
    <div class="d-flex mb-1 align-items-center">
      <b-badge variant="error" class="rounded px-1 mr-1">
        3
      </b-badge>
      /
      <b-badge variant="success" class="rounded px-1 ml-1">
        5
      </b-badge>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    fields: {
      type: Array,
      default () {
        return [
          {
            label: 'Completed',
            count: 14,
            variant: 'success'
          },
          {
            label: 'Suggested',
            count: 35,
            variant: 'warning'
          },
          {
            label: 'Required',
            count: 4,
            variant: 'error'
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
