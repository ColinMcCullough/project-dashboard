<template>
  <div>
    <div class="d-flex mb-2">
      <b-badge
        v-for="(status, i) in fields"
        :key="`location-status-group-${i}`"
        :variant="`${status.variant}-20`"
        class="pr-3"
      >
        <span :class="`bg-${status.variant}-60`" class="text-center font-weight-bold mr-2 px-2 rounded text-light">
          {{ status.count }}
        </span>
        {{ status.label }}
      </b-badge>
    </div>
    <h4 class="w-100 text-truncate">
      {{ title }}
    </h4>
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
