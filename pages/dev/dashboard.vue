<template>
  <b-container fluid style="max-width: 1400px;">
    <top-nav :show="true">
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
        to="/dev/asset-scraper"
      >
        Asset Scraper
      </b-btn>
      <template v-slot:secondary-nav>
        <div class="align-self-center d-flex mb-0 align-items-center">
          <b-input-group>
            <b-form-input />
            <b-btn variant="outline-success-1" size="sm">
              <b-icon-x-circle />
            </b-btn>
          </b-input-group>
          <b-form-radio-group />
        </div>
      </template>
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
      <b-table
        :fields="fields"
        :items="rows"
      >
        <!-- <template v-slot:cell(data)="data"> -->
        <!-- {{ data.item.data }} -->
        <!-- <project-row :project="data.item.data" /> -->
        <!-- <project-row v-bind="data.item.data.details" /> -->
        <!-- </template> -->
      </b-table>
      <b-row>
        <b-col>
          <project-header />
        </b-col>
      </b-row>
      <!-- <b-row
        v-for="(project, i) in rows"
        :key="`project-${i}`"
      >
        <b-col>
          <project-row v-bind="{ project }" />
        </b-col>
      </b-row> -->
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: 'client', sortable: true },
        { key: 'projectId', sortable: true },
        { key: 'age', sortable: true },
        { key: 'estGoLive', sortable: true },
        { key: 'intakeIsComplete', sortable: true },
        { key: 'assetsIsComplete', sortable: true },
        { key: 'assetsIsCrawled', sortable: true },
        { key: 'assetsIsScraped', sortable: true },
        { key: 'view' }
      ],
      rows: [
        {
          client: 'Client Name',
          projectId: 999909,
          estGoLive: '2020-11-11',
          intakeIsComplete: true,
          assetsIsComplete: false,
          assetsIsCrawled: true,
          assetsIsScraped: true
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

// details: {
//   client: 'Client Name',
//   projectId: 999909,
//   estGoLive: '2020-11-11'
// },
// intake: { isComplete: true },
// assets: {
//   isComplete: false,
//   isCrawled: true,
//   isScraped: true
// }
<style>

</style>
