<template>
  <b-container fluid style="max-width: 1400px;">
    <top-nav>
      <b-btn
        variant="outline-success-0"
        pill
        to="/dev/dashboard"
        class="mr-2"
      >
        Dev
      </b-btn>
      <b-btn
        variant="outline-success-0"
        pill
        to="/queues"
        class="mr-2"
      >
        Queues and Jobs
      </b-btn>
      <b-btn
        variant="outline-success-0"
        pill
        to="/dev/asset-scraper"
      >
        Asset Scraper
      </b-btn>
    </top-nav>
    <!-- MODAL COMPONENTS START -->
    <modal-template
      :id="'intake-modal'"
      title="Intake"
    >
      <intake-table />
    </modal-template>
    <modal-template
      :id="'scrape-modal'"
      title="Scraper"
    >
      <project-review />
    </modal-template>
    <!-- MODAL COMPONENTS END -->
    <b-row>
      <b-col>
        <b-jumbotron v-bind="jumbotron" fluid class="mb-0" />
      </b-col>
    </b-row>
    <b-card style="overflow-x: hidden;" class="my-5">
      <b-row>
        <b-col>
          <project-header />
        </b-col>
      </b-row>
      <b-row
        v-for="(project, i) in rows"
        :key="`project-${i}`"
      >
        <b-col>
          <project-row v-bind="{ project }" />
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      jumbotron: {
        header: 'Γειά σου',
        'bg-variant': 'muted'
      },
      rows: [
        {
          details: {
            title: 'Client Name',
            'sub-title': 'From Project 9099909',
            class: 'chevron-right w-25 rounded-0'
          },
          intake: {
            class: 'chevron-right is-alert rounded-0',
            props: {
              isAlert: true
            }
          },
          assets: {
            'sub-title': 'Where we get all the info and images',
            class: 'chevron-right is-disabled rounded-0 text-light'
          },
          links: {
            class: 'chevron-right is-disabled rounded-0'
          }
        },
        {
          details: {
            title: 'Client Name',
            'sub-title': 'From Project 9099909',
            class: 'chevron-right w-25 rounded-0'
          },
          intake: {
            class: 'chevron-right is-complete rounded-0',
            props: {
              isAlert: false
            }
          },
          assets: {
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
            class: 'chevron-right w-25 rounded-0'
          },
          intake: {
            class: 'chevron-right is-complete rounded-0',
            props: {
              isAlert: false
            }
          },
          assets: {
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
