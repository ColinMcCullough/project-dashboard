<template>
  <b-container fluid style="max-width: 1400px; margin-top: 130px;">
    <top-nav :show="true">
      <b-btn
        variant="outline-success-0"
        to="/dev/dashboard"
        size="sm"
        class="mr-2"
      >
        Dev
      </b-btn>
      <b-btn
        variant="outline-success-0"
        to="/queues"
        size="sm"
        class="mr-2"
      >
        Queues and Jobs
      </b-btn>
      <b-btn
        variant="outline-success-0"
        size="sm"
        to="/dev/asset-scraper"
      >
        Asset Scraper
      </b-btn>
      <template v-slot:secondary-nav>
        <div class="d-flex mb-0 align-items-center justify-content-between w-100">
          <b-input-group size="sm" prepend="Sort By" class="mr-2">
            <b-form-select v-model="sortBy" :options="fields" />
            <b-form-select v-model="sortDir" :options="['asc', 'desc', 'last']" />
          </b-input-group>
          <b-input-group size="sm" prepend="Search">
            <b-form-input v-model="filter" placeholder="Search" />
            <b-btn variant="outline-success-1" size="sm">
              <b-icon-x-circle />
            </b-btn>
          </b-input-group>
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
        :items="projects"
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
      {{ projects }}
    </b-card>
  </b-container>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const projects = await $axios.$get('api/v1/projects')
    return { projects }
  },
  data() {
    return {
      sortBy: null,
      sortDir: 'asc',
      filter: '',
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
