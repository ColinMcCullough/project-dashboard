<template>
  <div class="d-flex w-100 bg-primary-70 px-5">
    <b-card :class="cardClass" style="flex: 0 1 25%;" no-body>
      <span class="d-flex align-items-center h-100 justify-content-center">
        Project Details
        <b-icon-question-circle class="ml-2" />
      </span>
    </b-card>
    <b-card :class="cardClass" style="flex: 1 1 35%;" no-body>
      <span class="d-flex align-items-center h-100 justify-content-center">
        Add Location URLs
        <b-icon-question-circle class="ml-2" />
      </span>
    </b-card>
    <b-card :class="cardClass" style="flex: 1 1 35%;" no-body>
      <span class="d-flex align-items-center h-100 justify-content-center">
        Review Results
        <b-icon-question-circle class="ml-2" />
      </span>
    </b-card>
    <b-card :class="cardClass" style="flex: 0 1 25%;" no-body>
      <span class="d-flex align-items-center h-100 justify-content-center">
        Release to Client
        <b-icon-question-circle class="ml-2" />
      </span>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cardClass: [
        'text-gray-10',
        'small',
        'text-uppercase',
        'd-flex',
        'border-0',
        'custom-padding',
        'bg-primary-70'
      ]
    }
  }
}
</script>

<style lang="scss">
.custom-padding {
  padding: 0.25em 0;
}
.chevron-down {
  clip-path: polygon(100% 0%, 100% 75%, 50% 100%, 0% 75%, 0% 0%);
}
</style>
