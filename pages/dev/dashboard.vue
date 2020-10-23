<template>
  <b-container fluid>
    <!-- MODAL COMPONENT START -->
    <modal-template title="Test Title">
      <intake-table />
    </modal-template>
    <!-- MODAL COMPONENT END -->
    <b-row>
      <b-col>
        <b-jumbotron v-bind="jumbotron" fluid />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <project-row />
        <project-row />
        <project-row />
        <project-row />
        <project-row />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      jumbotron: {
        header: 'Hi there',
        lead: 'Hello',
        'bg-variant': 'success-0'
      }
    }
  }
}
</script>

<style>

</style>
