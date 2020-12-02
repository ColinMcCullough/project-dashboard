<template>
  <div>
    <div class="d-flex mb-2">
      <b-badge
        v-for="(status, i) in fields"
        :key="`location-status-group-${i}`"
        :variant="`${status.variant}-20`"
        class="pl-0 rounded pr-3 mr-2"
      >
        <span :class="`bg-${status.variant}-60`" class="font-weight-bold rounded text-light pl-1 mr-1">
          {{ status.count }}
        </span>
        {{ status.label }}
      </b-badge>
    </div>
    <h5 class="w-100 text-truncate text-light">
      {{ title }}
    </h5>
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
