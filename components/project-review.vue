<template>
  <b-card
    no-body
    border-variant="success-1"
  >
    <b-tabs vertical pills card>
      <b-tab>
        <template v-slot:title>
          <tab-title />
        </template>
        <b-container fluid>
          <b-row>
            <b-col>
              <location-details />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <location-amenities />
            </b-col>
          </b-row>
          <location-assets />
        </b-container>
      </b-tab>
      <b-tab>
        <template v-slot:title>
          <tab-title />
        </template>
      </b-tab>
      <b-tab>
        <template v-slot:title>
          <tab-title />
        </template>
      </b-tab>
      <b-tab>
        <template v-slot:title>
          <tab-title />
        </template>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>

</script>

<style lang="scss">
.ov-x-hidden {
  overflow-x: hidden;
}
</style>
