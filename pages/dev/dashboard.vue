<template>
  <b-container fluid>
    <top-nav />
    <!-- MODAL COMPONENT START -->
    <modal-template title="Intake">
      <intake-table />
    </modal-template>
    <!-- MODAL COMPONENT END -->
    <b-row>
      <b-col>
        <b-jumbotron v-bind="jumbotron" fluid>
          <b-input-group>
            <b-form-input />
            <b-btn variant="outline-muted">
              <b-icon-search />
              Filter
            </b-btn>
          </b-input-group>
        </b-jumbotron>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
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
        'bg-variant': 'muted'
      },
      rows: [
        {
          details: {
            title: 'Client Name',
            'sub-title': 'From Project 9099909',
            class: 'chevron-right w-25 is-disabled rounded-0'
          },
          intake: {
            title: 'Intake',
            'sub-title': 'Location Urns and count',
            class: 'chevron-right is-complete rounded-0'
          },
          assets: {
            title: 'Scraper',
            'sub-title': 'Where we get all the info and images',
            class: 'chevron-right is-alert rounded-0'
          },
          links: {
            class: 'chevron-right is-disabled rounded-0'
          }
        },
        {
          details: {
            title: 'Client Name',
            'sub-title': 'From Project 9099909',
            class: 'chevron-right w-25 is-disabled rounded-0'
          },
          intake: {
            title: 'Intake',
            'sub-title': 'Location Urns and count',
            class: 'chevron-right is-complete rounded-0'
          },
          assets: {
            title: 'Scraper',
            'sub-title': 'Where we get all the info and images',
            class: 'chevron-right is-alert rounded-0'
          },
          links: {
            class: 'chevron-right is-disabled rounded-0'
          }
        },
        {
          details: {
            title: 'Client Name',
            'sub-title': 'From Project 9099909',
            class: 'chevron-right w-25 is-disabled rounded-0'
          },
          intake: {
            title: 'Intake',
            'sub-title': 'Location Urns and count',
            class: 'chevron-right is-complete rounded-0'
          },
          assets: {
            title: 'Scraper',
            'sub-title': 'Where we get all the info and images',
            class: 'chevron-right is-alert rounded-0'
          },
          links: {
            class: 'chevron-right is-disabled rounded-0'
          }
        }
      ]
    }
  }
}
</script>

<style>

</style>
