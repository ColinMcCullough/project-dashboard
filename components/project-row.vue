<template>
  <div class="d-flex w-100 justify-content-evenly">
    <b-card v-bind="details">
      <status-btn :text="'Refetch Project Details'">
        <template v-slot:btn-icon>
          <b-icon icon="arrow-counterclockwise" />
        </template>
      </status-btn>
    </b-card>
    <b-card v-bind="intake">
      <status-btn
        v-b-modal.modal-template
        :text="'Edit Locations'"
      >
        <template v-slot:btn-icon>
          <b-icon icon="pencil-fill" />
        </template>
      </status-btn>
    </b-card>
    <div class="spacer" />
    <b-card v-bind="links" no-body>
      <div class="d-flex flex-column">
        <status-btn :text="'Run'" />
        <status-btn :text="'View'" />
      </div>
    </b-card>
    <b-card v-bind="assets">
      <b-btn-group size="sm" class="w-100">
        <status-btn :text="'Run'" />
        <status-btn :text="'View'" />
      </b-btn-group>
    </b-card>
    <b-card class="flex-grow-1">
      Ready for Client?
      <!-- <submit-btn :text="'Go'">
        <template v-slot:btn-icon>
          <b-icon icon="arrow" />
        </template>
      </submit-btn> -->
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: {
        title: 'Client Name',
        'sub-title': 'From Project 9099909',
        class: 'chevron-right w-25'
      },
      intake: {
        title: 'Intake',
        'sub-title': 'Location Urns and count',
        class: 'chevron-right'
      },
      assets: {
        title: 'Scraper',
        'sub-title': 'Where we get all the info and images',
        class: 'chevron-right'
      },
      links: {
        class: 'chevron-right'
      }
    }
  }
}
</script>

<style lang="scss">
.chevron-right {
  position: relative;
  &::after {
    position: absolute;
    height: 100%;
    right: 100%;
    border: 1px solid red;
    content: '';
  }
}
</style>
