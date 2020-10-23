<template>
  <div class="d-flex w-100">
    <b-card v-bind="cardAttrs">
      Project Details
      <b-icon-question-circle />
    </b-card>
    <b-card v-bind="cardAttrs">
      Location URLs
      <b-icon-question-circle />
    </b-card>
    <b-card v-bind="cardAttrs">
      Crawl & Scrape
      <b-icon-question-circle />
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardAttrs: {
        class: [
          'text-muted',
          'small',
          'text-uppercase',
          'border-0'
        ],
        style: 'flex: 0 1 25%;'
      }
    }
  }
}
</script>

<style>

</style>
