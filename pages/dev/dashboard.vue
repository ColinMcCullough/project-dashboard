<template>
  <b-container fluid style="max-width: 1400px;">
    <top-nav>
      <b-btn
        variant="outline-success-0"
        to="/dev/dashboard"
        class="mr-2"
      >
        Dev
      </b-btn>
      <b-btn
        variant="outline-success-0"
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
      rows: [
        {
          details: {
            client: 'Client Name',
            projectId: 999909,
            estGoLive: '2020-11-11'
          },
          intake: { isComplete: true },
          assets: {
            isComplete: false,
            isCrawled: true,
            isScraped: true
          }
        },
        {
          details: {
            client: 'Client Name',
            projectId: 999910,
            estGoLive: '2020-11-11'
          },
          intake: { isComplete: true },
          assets: {
            isComplete: false,
            isCrawled: true,
            isScraped: false
          }
        },
        {
          details: {
            client: 'Client Name',
            projectId: 999911,
            estGoLive: '2020-11-11'
          },
          intake: { isComplete: false },
          assets: {
            isComplete: false,
            isCrawled: false,
            isScraped: false
          }
        },
        {
          details: {
            client: 'Client Name',
            projectId: 999909,
            estGoLive: '2020-11-11'
          },
          intake: { isComplete: true },
          assets: {
            isComplete: true,
            isCrawled: true,
            isScraped: true
          }
        },
        {
          details: {
            client: 'Client Name',
            projectId: 999910,
            estGoLive: '2020-11-11'
          },
          intake: { isComplete: true },
          assets: {
            isComplete: false,
            isCrawled: true,
            isScraped: false
          }
        },
        {
          details: {
            client: 'Client Name',
            projectId: 999911,
            estGoLive: '2020-11-11'
          },
          intake: { isComplete: false },
          assets: {
            isComplete: false,
            isCrawled: false,
            isScraped: false
          }
        }
      ]
    }
  }
}
</script>

<style>

</style>
